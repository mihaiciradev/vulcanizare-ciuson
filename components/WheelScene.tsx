"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const MODEL_URL = "/models/wheel.glb";

const deg = (d: number) => (d * Math.PI) / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Share of the scroll during which the wheel rolls across. The rest lets the offer settle. */
const ROLL_END = 0.8;

type Props = {
  /** 0 at the top of the hero, 1 when the hero has been scrolled through. */
  progress: MotionValue<number>;
  /** The photo frame. Its bottom edge is the road the wheel stands on. */
  anchor: RefObject<HTMLElement>;
  /** Written every frame: how much of the frame the wheel has uncovered, 0 to 1. */
  reveal: MotionValue<number>;
  onFail: () => void;
};

/** Drop from above, two soft rebounds, a squash on every landing. */
const INTRO_MS = 1700;
const IMPACTS = [0.38, 0.68, 0.84];

/** Height above the road (in radii) during the intro, u from 0 to 1. Gravity-shaped arcs. */
function dropHeight(u: number, startHeight: number) {
  if (u < IMPACTS[0]) {
    const s = u / IMPACTS[0];
    return startHeight * (1 - s * s); // falls from rest, speeding up
  }
  const arc = (from: number, to: number, peak: number) => {
    const s = (u - from) / (to - from);
    return peak * 4 * s * (1 - s); // smooth at the top, like a real hop
  };
  if (u < IMPACTS[1]) return arc(IMPACTS[0], IMPACTS[1], 0.2);
  if (u < IMPACTS[2]) return arc(IMPACTS[1], IMPACTS[2], 0.05);
  return 0;
}

/** Squash after each landing: rises from zero at contact, peaks quickly, eases out. */
function squashAmount(u: number) {
  const strengths = [0.11, 0.05, 0.02];
  return IMPACTS.reduce((sum, at, i) => {
    const d = (u - at) / 0.035;
    return d <= 0 ? sum : sum + strengths[i] * d * Math.exp(1 - d);
  }, 0);
}

function makeShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(0,0,0,0.6)");
  g.addColorStop(0.5, "rgba(0,0,0,0.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function WheelScene({ progress, anchor, reveal, onFail }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const failRef = useRef(onFail);
  failRef.current = onFail;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      failRef.current();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-5, 6, 8);
    const rim = new THREE.DirectionalLight(0xe80d13, 4);
    rim.position.set(6, 2, -4);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.5), key, rim);

    // body: sits on the contact point and squashes on impact, so the squash grows from the road.
    // pivot: wheel centre + viewing angle. spin: rolling about the axle (local X).
    const body = new THREE.Group();
    const pivot = new THREE.Group();
    const spin = new THREE.Group();
    body.add(pivot);
    pivot.add(spin);
    scene.add(body);
    pivot.visible = false;

    const shadowTexture = makeShadowTexture();
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMaterial);
    shadow.visible = false;
    scene.add(shadow);

    let modelRadius = 1;
    let ready = false;
    let introStart = 0;
    let disposed = false;
    let dirty = true;

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        // The axle runs along X, so the radius is half of the larger of Y and Z.
        modelRadius = Math.max(size.y, size.z) / 2;
        spin.add(model);
        pivot.visible = true;
        shadow.visible = true;

        // Compile shaders and upload textures off screen before the drop,
        // so the first animated frames do not stutter.
        renderer.compile(scene, camera);
        body.position.set(1000, 0, 0);
        renderer.render(scene, camera);
        requestAnimationFrame(() => {
          introStart = performance.now();
          ready = true;
          dirty = true;
        });
      },
      undefined,
      () => {
        if (!disposed) failRef.current();
      },
    );

    let width = 1;
    let height = 1;
    let halfH = 1;
    let halfW = 1;

    const resize = () => {
      width = Math.max(mount.clientWidth, 1);
      height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      halfH = Math.tan(deg(camera.fov / 2)) * camera.position.z;
      halfW = halfH * camera.aspect;
      dirty = true;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const toWorldX = (px: number) => (px / width - 0.5) * 2 * halfW;
    const toWorldY = (py: number) => -(py / height - 0.5) * 2 * halfH;
    const toWorldLen = (px: number) => (px / height) * 2 * halfH;

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    visibility.observe(mount);

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    let smooth = progress.get();
    let lastX: number | null = null;
    let rollAngle = 0;
    let last = "";
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible || !ready) return;

      const now = performance.now();
      smooth += (progress.get() - smooth) * 0.14;
      const p = smooth;
      tilt.x += (pointer.x - tilt.x) * 0.06;
      tilt.y += (pointer.y - tilt.y) * 0.06;

      const frameRect = anchor.current?.getBoundingClientRect();
      if (!frameRect || frameRect.height === 0) return;
      const mountRect = mount.getBoundingClientRect();
      const left = frameRect.left - mountRect.left;
      const right = frameRect.right - mountRect.left;
      const ground = frameRect.bottom - mountRect.top - 3; // stands on the road line
      const desktop = width >= 768;

      const r = desktop
        ? Math.min(frameRect.height * 0.34, height * 0.22)
        : Math.min(frameRect.width * 0.24, frameRect.height * 0.36);
      const restX = left + r * 1.25;

      // Scroll: roll right along the road and off the screen.
      // On mobile the hero is not pinned, so wait until the photo is well in view before rolling.
      const m = easeInOutCubic(clamp01(desktop ? p / ROLL_END : (p - 0.1) / 0.38));
      const x = lerp(restX, width + r * 1.6, m);

      // The frame is uncovered behind the wheel: nothing at rest, everything once it leaves the frame.
      reveal.set(clamp01((x - restX) / (right - restX)));

      // Intro: drops in from above the screen, two soft rebounds, squash on each landing.
      const t = clamp01((now - introStart) / INTRO_MS);
      const startHeight = (ground + r * 0.5) / r; // starts fully above the top of the stage
      const hop = dropHeight(t, startHeight) * r;
      const squash = squashAmount(t);
      const flash =
        7 * Math.exp(-(((t - IMPACTS[0]) / 0.05) ** 2)) + 2.5 * Math.exp(-(((t - IMPACTS[1]) / 0.05) ** 2));
      rim.intensity = 4 + flash;

      const yaw = 62 + tilt.x * 10;
      const pitch = 6 + tilt.y * 5;

      // Rolling without slipping: every pixel travelled turns the wheel by 1 / radius.
      if (lastX !== null) rollAngle += (x - lastX) / r;
      lastX = x;

      const radius = toWorldLen(r);
      body.position.set(toWorldX(x), toWorldY(ground - hop), 0);
      body.scale.set(1 + squash * 0.6, 1 - squash, 1 + squash * 0.6);
      pivot.position.set(0, radius, 0);
      pivot.rotation.set(deg(pitch), deg(yaw), 0);
      pivot.scale.setScalar(radius / modelRadius);
      spin.rotation.x = rollAngle;

      const lift = clamp01(hop / (r * 2));
      shadow.position.set(toWorldX(x) + radius * 0.05, toWorldY(ground), -radius * 0.2);
      shadow.scale.set(radius * 2.4 * (1 - lift * 0.5), radius * 0.45 * (1 - lift * 0.5), 1);
      shadowMaterial.opacity = 1 - lift * 0.8;

      const signature = [x, hop, r, yaw, pitch, flash, ground, squash * 100].map((v) => v.toFixed(2)).join("|");
      if (signature === last && !dirty) return;
      last = signature;
      dirty = false;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          if (!material) return;
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) value.dispose();
          });
          material.dispose();
        });
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress, anchor, reveal]);

  return <div ref={mountRef} className="h-full w-full" />;
}
