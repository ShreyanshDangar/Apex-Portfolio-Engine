import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';
const COLORS = {
  primary: '#8a65ff',
  secondary: '#38bdf8',
  accent: '#c084fc',
  highlight: '#60a5fa',
  success: '#10b981'
};
function ResumeDocument({ position, scale = 1 }) {
  const meshRef = useRef();
  const linesRef = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    meshRef.current.rotation.x = Math.cos(t * 0.15) * 0.08;
  });
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.2, 0);
    shape.lineTo(1.2, 1.6);
    shape.lineTo(0, 1.6);
    shape.closePath();
    const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Document base */}
        <mesh geometry={geometry}>
          <meshStandardMaterial color="#1a1a2e" transparent opacity={0.9} />
          <Edges color={COLORS.secondary} threshold={15} lineWidth={1} />
        </mesh>
        {/* Text lines - representing resume content */}
        {[0.12, 0.28, 0.44, 0.60, 0.76, 0.92, 1.08, 1.24, 1.40].map((y, i) => (
          <mesh key={i} position={[0.1, y, 0.05]}>
            <boxGeometry args={[i === 0 ? 0.6 : (0.3 + Math.random() * 0.6), 0.04, 0.01]} />
            <meshStandardMaterial
              color={i === 0 ? COLORS.secondary : '#4a4a6a'}
              emissive={i === 0 ? COLORS.secondary : '#2a2a4a'}
              emissiveIntensity={i === 0 ? 0.4 : 0.1}
            />
          </mesh>
        ))}
        {/* Label */}
        <mesh position={[0.6, -0.15, 0.05]}>
          <planeGeometry args={[0.8, 0.12]} />
          <meshBasicMaterial color={COLORS.secondary} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
function PortfolioDocument({ position, scale = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.06;
  });
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.4, 0);
    shape.lineTo(1.4, 1.8);
    shape.lineTo(0, 1.8);
    shape.closePath();
    const extrudeSettings = { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.5}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Document base with gradient effect */}
        <mesh geometry={geometry}>
          <meshStandardMaterial color={COLORS.primary} transparent opacity={0.2} />
          <Edges color={COLORS.primary} threshold={15} lineWidth={1.5} />
        </mesh>
        {/* Profile section */}
        <mesh position={[0.25, 1.45, 0.08]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.5} />
        </mesh>
        {/* Name placeholder */}
        <mesh position={[0.75, 1.5, 0.08]}>
          <boxGeometry args={[0.7, 0.08, 0.01]} />
          <meshStandardMaterial color={COLORS.accent} emissive={COLORS.accent} emissiveIntensity={0.4} />
        </mesh>
        {/* Title placeholder */}
        <mesh position={[0.65, 1.35, 0.08]}>
          <boxGeometry args={[0.5, 0.05, 0.01]} />
          <meshStandardMaterial color={COLORS.secondary} emissive={COLORS.secondary} emissiveIntensity={0.3} />
        </mesh>
        {/* Skills tags */}
        {[0, 0.25, 0.5, 0.72].map((x, i) => (
          <mesh key={i} position={[0.12 + x, 1.1, 0.08]}>
            <boxGeometry args={[0.2, 0.08, 0.01]} />
            <meshStandardMaterial
              color={[COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.highlight][i]}
              emissive={[COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.highlight][i]}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        {/* Experience section bars */}
        <mesh position={[0.55, 0.85, 0.08]}>
          <boxGeometry args={[0.9, 0.06, 0.01]} />
          <meshStandardMaterial color={COLORS.success} emissive={COLORS.success} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.45, 0.7, 0.08]}>
          <boxGeometry args={[0.7, 0.04, 0.01]} />
          <meshStandardMaterial color={COLORS.highlight} emissive={COLORS.highlight} emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.55, 0.55, 0.08]}>
          <boxGeometry args={[0.9, 0.04, 0.01]} />
          <meshStandardMaterial color={COLORS.highlight} emissive={COLORS.highlight} emissiveIntensity={0.2} />
        </mesh>
        {/* Projects section */}
        <mesh position={[0.35, 0.35, 0.08]}>
          <boxGeometry args={[0.5, 0.15, 0.01]} />
          <meshStandardMaterial color={COLORS.primary} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.95, 0.35, 0.08]}>
          <boxGeometry args={[0.5, 0.15, 0.01]} />
          <meshStandardMaterial color={COLORS.accent} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
function AIParticles({ startPos, endPos, count = 12 }) {
  const particlesRef = useRef([]);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      delay: i * 0.3,
      speed: 0.4 + Math.random() * 0.3,
      offset: (Math.random() - 0.5) * 0.8,
      offsetY: (Math.random() - 0.5) * 0.6,
      size: 0.04 + Math.random() * 0.04
    }));
  }, [count]);
  return (
    <group>
      {particles.map((p, i) => (
        <AIParticle
          key={i}
          startPos={startPos}
          endPos={endPos}
          delay={p.delay}
          speed={p.speed}
          offset={p.offset}
          offsetY={p.offsetY}
          size={p.size}
        />
      ))}
    </group>
  );
}
function AIParticle({ startPos, endPos, delay, speed, offset, offsetY, size }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed + delay) % 3) / 3;
    const midX = (startPos[0] + endPos[0]) / 2;
    const midY = (startPos[1] + endPos[1]) / 2 + 1.5;
    const midZ = (startPos[2] + endPos[2]) / 2 + offset;
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * startPos[0] + 2 * oneMinusT * t * midX + t * t * endPos[0];
    const y = oneMinusT * oneMinusT * startPos[1] + 2 * oneMinusT * t * midY + t * t * endPos[1] + offsetY;
    const z = oneMinusT * oneMinusT * startPos[2] + 2 * oneMinusT * t * midZ + t * t * endPos[2];
    meshRef.current.position.set(x, y, z);
    const scale = Math.sin(t * Math.PI) * 1.5 + 0.5;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={COLORS.accent}
        emissive={COLORS.accent}
        emissiveIntensity={0.8}
        transparent
      />
    </mesh>
  );
}
function FlowArrow({ position }) {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Arrow body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.04]} />
          <meshStandardMaterial
            color={COLORS.accent}
            emissive={COLORS.accent}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Arrow head */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.2, 0.08, 0.04]} />
          <meshStandardMaterial
            color={COLORS.accent}
            emissive={COLORS.accent}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.2, 0.08, 0.04]} />
          <meshStandardMaterial
            color={COLORS.accent}
            emissive={COLORS.accent}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}
function FloatingAccent({ position, color, size = 0.3, speed = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size]} />
        <meshStandardMaterial color={color} transparent opacity={0.15} />
        <Edges color={color} threshold={15} />
      </mesh>
    </Float>
  );
}
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color={COLORS.primary} />
      <pointLight position={[-10, -5, 5]} intensity={0.4} color={COLORS.secondary} />
      <pointLight position={[0, 5, -5]} intensity={0.3} color={COLORS.accent} />
      {/* Resume input document - left side */}
      <ResumeDocument position={[-3.8, 0.2, -2]} scale={0.85} />
      {/* Portfolio output document - right side */}
      <PortfolioDocument position={[2.5, -0.2, -2]} scale={0.9} />
      {/* AI transformation flow */}
      <AIParticles
        startPos={[-2.5, 0.8, -1.5]}
        endPos={[2, 0.5, -1.5]}
        count={10}
      />
      {/* Flow arrow in center */}
      <FlowArrow position={[0, 0.8, -1]} />
      {/* Background accents for depth */}
      <FloatingAccent position={[-5, 2, -5]} color={COLORS.secondary} size={0.4} speed={0.8} />
      <FloatingAccent position={[5, -2, -6]} color={COLORS.accent} size={0.35} speed={1.2} />
      <FloatingAccent position={[-4, -2.5, -4]} color={COLORS.primary} size={0.3} speed={0.9} />
      <FloatingAccent position={[4.5, 2.5, -5]} color={COLORS.highlight} size={0.25} speed={1.1} />
    </>
  );
}
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}