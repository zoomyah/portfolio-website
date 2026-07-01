import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#C9A227";

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Knot                                                                */
/* ------------------------------------------------------------------ */

function Knot({
  color,
  reduce,
  speed,
}: {
  color: string;
  reduce: boolean;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current || reduce) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.3, 128, 24]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.18}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export interface TorusKnot3DProps {
  className?: string;
  color?: string;
  speed?: number;
}

/**
 * Slowly rotating gold torus-knot — a strong, calm visual accent for
 * section headers and CTA areas.
 */
export function TorusKnot3D({
  className = "",
  color = GOLD,
  speed = 0.5,
}: TorusKnot3DProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reduce ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <spotLight
            position={[4, 6, 3]}
            angle={0.4}
            penumbra={1}
            intensity={2}
            color={color}
          />
          <pointLight position={[-4, -2, 2]} intensity={0.8} color="#6b5a1a" />
          <Knot color={color} reduce={reduce} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  );
}
