import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
/* Particles                                                           */
/* ------------------------------------------------------------------ */

interface ParticlesProps {
  count: number;
  size: number;
  area: [number, number, number];
  color: string;
  opacity: number;
  reduce: boolean;
}

function Particles({ count, size, area, color, opacity, reduce }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * area[2];
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count, area]);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.4 - scroll * 0.0015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export interface ParticleFieldProps {
  className?: string;
  count?: number;
  size?: number;
  area?: [number, number, number];
  color?: string;
  opacity?: number;
  /** Render fixed to the viewport (page-level background) instead of absolute. */
  fixed?: boolean;
}

/**
 * Slow-drifting golden dust particles. Used as a subtle decorative
 * background for whole pages or individual sections.
 */
export function ParticleField({
  className = "",
  count = 260,
  size = 0.04,
  area = [22, 14, 10],
  color = GOLD,
  opacity = 0.5,
  fixed = false,
}: ParticleFieldProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      className={`pointer-events-none inset-0 ${
        fixed ? "fixed z-[-1]" : "absolute -z-10"
      } ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reduce ? "demand" : "always"}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <Particles
            count={count}
            size={size}
            area={area}
            color={color}
            opacity={opacity}
            reduce={reduce}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
