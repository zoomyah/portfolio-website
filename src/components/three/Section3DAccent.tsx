import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#C9A227";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function DistortSphere({ reduce }: { reduce: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current && !reduce) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={reduce ? 0 : 1.2} rotationIntensity={reduce ? 0 : 0.4} floatIntensity={reduce ? 0 : 1.4}>
      <mesh ref={mesh} scale={1.1}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color={GOLD}
          metalness={0.7}
          roughness={0.25}
          distort={reduce ? 0 : 0.28}
          speed={reduce ? 0 : 1.3}
        />
      </mesh>
    </Float>
  );
}

/**
 * Lightweight 3D accent: a single floating distorted gold sphere.
 * Used as a subtle decorative background element in section backgrounds.
 */
export function Section3DAccent({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <spotLight position={[4, 6, 3]} angle={0.4} penumbra={1} intensity={2.2} color={GOLD} />
          <DistortSphere reduce={reduce} />
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={1.3} position={[0, 2, 3]} scale={[5, 2, 1]} color={GOLD} />
            <Lightformer intensity={0.5} position={[-4, -1, 1]} scale={[2, 3, 1]} color="#ffffff" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
