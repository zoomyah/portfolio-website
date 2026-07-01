import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
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

type ShapeKind = "torus" | "octahedron" | "icosahedron" | "box" | "distort";
const KINDS: ShapeKind[] = ["torus", "octahedron", "icosahedron", "box", "distort"];

interface ShapeProps {
  kind: ShapeKind;
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  reduce: boolean;
}

function Shape({ kind, position, scale, color, speed, reduce }: ShapeProps) {
  const rot = reduce ? 0 : 0.5;
  const intensity = reduce ? 0 : 1;
  return (
    <Float speed={speed} rotationIntensity={rot} floatIntensity={intensity}>
      <group position={position} scale={scale}>
        {kind === "torus" && (
          <mesh rotation={[0.6, 0.2, 0]}>
            <torusGeometry args={[0.55, 0.18, 24, 64]} />
            <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} emissive={color} emissiveIntensity={0.08} />
          </mesh>
        )}
        {kind === "octahedron" && (
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.12} flatShading emissive={color} emissiveIntensity={0.08} />
          </mesh>
        )}
        {kind === "icosahedron" && (
          <mesh>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} flatShading emissive={color} emissiveIntensity={0.08} />
          </mesh>
        )}
        {kind === "box" && (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} wireframe />
          </mesh>
        )}
        {kind === "distort" && (
          <mesh>
            <icosahedronGeometry args={[1, 4]} />
            <MeshDistortMaterial color={color} metalness={0.8} roughness={0.2} distort={reduce ? 0 : 0.3} speed={reduce ? 0 : 1.4} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function ShapesGroup({
  count,
  color,
  scale,
  speed,
  reduce,
}: {
  count: number;
  color: string;
  scale: number;
  speed: number;
  reduce: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || reduce) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const shapes = useMemo(() => {
    const arr: ShapeProps[] = [];
    for (let i = 0; i < count; i++) {
      const kind = KINDS[i % KINDS.length];
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.4 + (i % 3) * 0.7;
      arr.push({
        kind,
        position: [
          Math.cos(angle) * radius,
          (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.5),
          Math.sin(angle) * radius - 2,
        ],
        scale: scale * (0.4 + (i % 4) * 0.15),
        speed: speed * (0.8 + (i % 3) * 0.2),
        color,
        reduce,
      });
    }
    return arr;
  }, [count, scale, speed, color, reduce]);

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </group>
  );
}

export interface FloatingShapesProps {
  className?: string;
  count?: number;
  color?: string;
  scale?: number;
  speed?: number;
}

/**
 * Generic decorative field of floating gold shapes (torus, octahedron,
 * icosahedron, wireframe box, distorted sphere). Self-contained Canvas,
 * pointer-events disabled. Place inside a `relative isolate` container.
 */
export function FloatingShapes({
  className = "",
  count = 5,
  color = GOLD,
  scale = 1,
  speed = 1.2,
}: FloatingShapesProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reduce ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <spotLight position={[6, 8, 4]} angle={0.4} penumbra={1} intensity={2} color={color} />
          <pointLight position={[-6, -2, -4]} intensity={0.8} color="#6b5a1a" />
          <ShapesGroup count={count} color={color} scale={scale} speed={speed} reduce={reduce} />
        </Suspense>
      </Canvas>
    </div>
  );
}
