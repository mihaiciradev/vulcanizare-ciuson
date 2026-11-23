"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const deg = (d: number) => (d * Math.PI) / 180;

type Props = {
  progress: MotionValue<number>;
  onFail: () => void;
};

export default function WheelScene({ progress, onFail }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const failRef = useRef(onFail);
  failRef.current = onFail;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      failRef.current();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-6, 4, 7);
    const rim = new THREE.DirectionalLight(0xe80d13, 3.2);
    rim.position.set(7, 1.5, -2);
    const fill = new THREE.DirectionalLight(0xf5f3ef, 0.8);
    fill.position.set(0, -5, 5);
    scene.add(key, rim, fill);

    const pivot = new THREE.Group();
    scene.add(pivot);

    const amplitude = window.matchMedia("(max-width: 767px)").matches ? 0.5 : 1;

    let disposed = false;
    new GLTFLoader().load(
      "/offroad_truck_wheel.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        const holder = new THREE.Group();
        holder.add(model);
        holder.scale.setScalar(4.2 / Math.max(size.x, size.y, size.z));
        pivot.add(holder);
      },
      undefined,
      () => {
        if (!disposed) failRef.current();
      },
    );

    let visible = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(mount);

    const resize = () => {
      const width = mount.clientWidth;
      const height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let current = progress.get();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      current += (progress.get() - current) * 0.1;
      pivot.rotation.x = deg(-90 + 55 * current * amplitude);
      pivot.rotation.y = deg(35 + 150 * current * amplitude);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => material?.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress]);

  return <div ref={mountRef} className="h-full w-full" />;
}
