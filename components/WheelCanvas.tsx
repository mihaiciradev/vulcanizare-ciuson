"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// =============================================================
//  3D WHEEL — INITIAL POSE
//  Tweak these to dial in how the wheel sits before the user
//  drags or scrolls. Values are in radians.
//  Quick reference:  π   = 180°    π/2 = 90°
//                    π/4 = 45°     π/6 = 30°    π/12 = 15°
//  Or write in degrees:  (deg) => (deg * Math.PI) / 180
// =============================================================
const deg = (d: number) => (d * Math.PI) / 180;

// NOTE on this model: the wheel's axle sits along the Y axis by default,
// so the face only points at the camera when PITCH is near ±90°.
//   PITCH = -90  → rim/face toward camera (front view)
//   PITCH =   0  → face up (top view)
//   PITCH =  90  → back of the wheel toward camera
// If the wrong side shows up (i.e. the back instead of the rim), flip the
// sign of PITCH to deg(90).
const INITIAL_PITCH = deg(-90);  // X-axis: -90 = rim faces camera; moving away exposes tread
const INITIAL_YAW   = deg(35);   // Y-axis: stronger turn for 3/4 perspective
const INITIAL_ROLL  = deg(0);    // Z-axis: spin like a clock (0 = neutral)

// Scroll rotation strength — set any to 0 to disable that axis
const SCROLL_YAW_SPEED   = 0.0015; // primary: turn left↔right as you scroll
const SCROLL_PITCH_SPEED = 0.0004; // slight wobble forward/back
const SCROLL_ROLL_SPEED  = 0;      // disabled — no clock-style spin
// =============================================================

export default function WheelCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const wheelRef = useRef<THREE.Group | null>(null);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const targetRotationX = useRef(INITIAL_PITCH);
  const targetRotationY = useRef(INITIAL_YAW);
  const targetRotationZ = useRef(INITIAL_ROLL);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;
    renderer.setClearColor(0x1a1a1a, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Professional Lighting Setup - Brighter for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Main key light (warm orange accent)
    const keyLight = new THREE.DirectionalLight(0xff6633, 1.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    // Fill light (cool white) - increased for brightness
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-4, 3, 5);
    scene.add(fillLight);

    // Back light for separation - increased
    const backLight = new THREE.DirectionalLight(0x4488ff, 0.7);
    backLight.position.set(0, -2, -8);
    scene.add(backLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "/offroad_truck_wheel.glb",
      (gltf) => {
        const wheel = gltf.scene;
        wheel.scale.set(3.5, 3.5, 3.5);
        wheel.rotation.x = INITIAL_PITCH;
        wheel.rotation.y = INITIAL_YAW;
        wheel.rotation.z = INITIAL_ROLL;
        scene.add(wheel);
        wheelRef.current = wheel;

        // Optimize materials — shadows disabled (no shadow surface anyway)
        wheel.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            if (child.material) {
              child.material.envMapIntensity = 1;
            }
          }
        });
      },
      undefined,
      (error) => console.error("Error loading wheel:", error)
    );

    // Scroll-based rotation: feed scroll delta into yaw (primary) + pitch (slight)
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      targetRotationY.current += delta * SCROLL_YAW_SPEED;
      targetRotationX.current += delta * SCROLL_PITCH_SPEED;
      targetRotationZ.current += delta * SCROLL_ROLL_SPEED;
    };

    // Mouse drag rotation (desktop only) - actual click + drag
    const canvasEl = renderer.domElement;
    const handlePointerDown = (e: PointerEvent) => {
      if (isMobile) return;
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      canvasEl.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !wheelRef.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      targetRotationY.current += dx * 0.01;
      targetRotationX.current += dy * 0.01;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      try { canvasEl.releasePointerCapture(e.pointerId); } catch {}
    };

    // Pause rendering when canvas is offscreen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(containerRef.current);

    // Animation loop — skip render work when offscreen
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (wheelRef.current && !isMobile) {
        // Smooth interpolation toward drag + scroll targets
        wheelRef.current.rotation.y +=
          (targetRotationY.current - wheelRef.current.rotation.y) * 0.08;
        wheelRef.current.rotation.x +=
          (targetRotationX.current - wheelRef.current.rotation.x) * 0.08;
        wheelRef.current.rotation.z +=
          (targetRotationZ.current - wheelRef.current.rotation.z) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    canvasEl.addEventListener("pointerdown", handlePointerDown);
    canvasEl.addEventListener("pointermove", handlePointerMove);
    canvasEl.addEventListener("pointerup", handlePointerUp);
    canvasEl.addEventListener("pointercancel", handlePointerUp);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("pointerdown", handlePointerDown);
      canvasEl.removeEventListener("pointermove", handlePointerMove);
      canvasEl.removeEventListener("pointerup", handlePointerUp);
      canvasEl.removeEventListener("pointercancel", handlePointerUp);
      cancelAnimationFrame(animationId);
      visibilityObserver.disconnect();
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange/5 to-transparent rounded-2xl">
        <div className="text-text-muted text-center">
          <p className="text-sm">3D Model - Scroll to rotate</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
  );
}
