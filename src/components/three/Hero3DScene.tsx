import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#C9A227";
const GOLD_DEEP = "#6b5a1a";

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

type MouseRef = ReturnType<typeof useRef<{ x: number; y: number }>>;

function useMousePosition(): MouseRef {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return mouse;
}

/* ------------------------------------------------------------------ */
/* Floating geometric shapes                                          */
/* ------------------------------------------------------------------ */

function FloatingShapes({
  reduce,
  mouse,
}: {
  reduce: boolean;
  mouse: MouseRef;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const tx = mouse.current.x * 0.3;
    const ty = mouse.current.y * 0.2;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      tx,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -ty,
      0.05,
    );
    if (!reduce) {
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  const speed = reduce ? 0 : 1.5;
  const rot = reduce ? 0 : 0.5;
  const intensity = reduce ? 0 : 1.1;

  return (
    <group ref={group}>
      {/* Hero distorted sphere */}
      <Float speed={speed} rotationIntensity={rot} floatIntensity={intensity}>
        <mesh position={[2.4, 0.2, -0.5]} scale={1.35}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color={GOLD}
            metalness={0.85}
            roughness={0.18}
            distort={reduce ? 0 : 0.32}
            speed={reduce ? 0 : 1.6}
          />
        </mesh>
      </Float>

      {/* Octahedron */}
      <Float speed={speed * 1.2} rotationIntensity={rot} floatIntensity={intensity}>
        <mesh position={[-2.2, 1.5, -1.6]} scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.12} flatShading />
        </mesh>
      </Float>

      {/* Torus */}
      <Float speed={speed * 0.9} rotationIntensity={rot} floatIntensity={intensity}>
        <mesh position={[3.4, -1.1, -1.8]} rotation={[0.6, 0.2, 0]}>
          <torusGeometry args={[0.55, 0.18, 24, 80]} />
          <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.08} />
        </mesh>
      </Float>

      {/* Small icosahedron */}
      <Float speed={speed * 1.4} rotationIntensity={rot * 1.2} floatIntensity={intensity}>
        <mesh position={[-3.0, -0.7, -1.2]} scale={0.45}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.3} flatShading />
        </mesh>
      </Float>

      {/* Wireframe cube accent */}
      <Float speed={speed * 1.1} rotationIntensity={rot * 1.4} floatIntensity={intensity}>
        <mesh position={[1.4, 1.9, -2.2]} scale={0.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={GOLD} metalness={0.4} roughness={0.4} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Background dust / particles                                        */
/* ------------------------------------------------------------------ */

function Particles({ count = 220 }: { count?: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  return (
    <points geometry={geometry}>
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

/* ------------------------------------------------------------------ */
/* Scene                                                              */
/* ------------------------------------------------------------------ */

function SceneContent({ reduce, mouse }: { reduce: boolean; mouse: MouseRef }) {
  return (
    <>
      <ambientLight intensity={0.16} />
      <spotLight
        position={[6, 8, 4]}
        angle={0.35}
        penumbra={1}
        intensity={2.6}
        color={GOLD}
      />
      <pointLight position={[-6, -2, -4]} intensity={1.1} color={GOLD_DEEP} />

      <FloatingShapes reduce={reduce} mouse={mouse} />
      <Particles />

      <ContactShadows
        position={[0, -2.3, -0.5]}
        opacity={0.45}
        scale={16}
        blur={2.6}
        far={4.5}
        color="#000000"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.4} position={[0, 3, 4]} scale={[7, 2, 1]} color={GOLD} />
        <Lightformer intensity={0.7} position={[-5, -1, 2]} scale={[3, 4, 1]} color="#ffffff" />
        <Lightformer intensity={0.5} position={[5, 2, -3]} scale={[3, 3, 1]} color="#3a3a3a" />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                   */
/* ------------------------------------------------------------------ */

export function Hero3DScene() {
  const reduce = usePrefersReducedMotion();
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent reduce={reduce} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
