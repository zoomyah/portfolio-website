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
/* Globe                                                               */
/* ------------------------------------------------------------------ */

function Globe({
  color,
  opacity,
  reduce,
  speed,
}: {
  color: string;
  opacity: number;
  reduce: boolean;
  speed: number;
}) {
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduce) return;
    const t = state.clock.elapsedTime * speed;
    if (inner.current) inner.current.rotation.y = t;
    if (outer.current) {
      outer.current.rotation.y = -t * 0.6;
      outer.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh ref={inner} scale={0.9}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity * 0.45}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export interface WireframeGlobeProps {
  className?: string;
  color?: string;
  opacity?: number;
  speed?: number;
}

/**
 * Slowly rotating gold wireframe globe — a calm technical accent suited
 * to About / Services / Contact backgrounds. No lighting required.
 */
export function WireframeGlobe({
  className = "",
  color = GOLD,
  opacity = 0.45,
  speed = 0.12,
}: WireframeGlobeProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reduce ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Globe color={color} opacity={opacity} reduce={reduce} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  );
}
