import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

/* ------------------------------------------------------------------ */
/* Torus-knot companion                                                */
/* ------------------------------------------------------------------ */

function Knot({ reduce }: { reduce: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current || reduce) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.25;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  return (
    <Float
      speed={reduce ? 0 : 1}
      rotationIntensity={reduce ? 0 : 0.3}
      floatIntensity={reduce ? 0 : 0.8}
    >
      <mesh ref={mesh} position={[1.7, -0.9, -0.4]} scale={0.42}>
        <torusKnotGeometry args={[1, 0.32, 96, 20]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.8}
          roughness={0.18}
          emissive={GOLD}
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/* Particles                                                           */
/* ------------------------------------------------------------------ */

function Particles({ reduce }: { reduce: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color={GOLD}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Richer 3D accent for the CTA section: a floating distorted gold sphere
 * accompanied by a slow torus-knot and drifting dust particles.
 */
export function Section3DAccent({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} frameloop={reduce ? "demand" : "always"} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <spotLight position={[4, 6, 3]} angle={0.4} penumbra={1} intensity={2.2} color={GOLD} />
          <DistortSphere reduce={reduce} />
          <Knot reduce={reduce} />
          <Particles reduce={reduce} />
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={1.3} position={[0, 2, 3]} scale={[5, 2, 1]} color={GOLD} />
            <Lightformer intensity={0.5} position={[-4, -1, 1]} scale={[2, 3, 1]} color="#ffffff" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
