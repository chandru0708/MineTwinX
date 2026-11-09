import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface Rover3DProps {
  position?: [number, number, number];
  headingDeg?: number;
  scanning?: boolean;
}

export const Rover3D: React.FC<Rover3DProps> = ({
  position = [0, 0.35, 0],
  headingDeg = 0,
  scanning = true,
}) => {
  const lidarRef = useRef<THREE.Group>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);
  const roverGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (lidarRef.current) {
      lidarRef.current.rotation.y += delta * 6; // Spin LiDAR 10 Hz
    }
    if (scanRingRef.current && scanning) {
      scanRingRef.current.rotation.z += delta * 1.5;
      const s = 1 + Math.sin(Date.now() / 400) * 0.15;
      scanRingRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={roverGroupRef} position={position} rotation={[0, (headingDeg * Math.PI) / 180, 0]}>
      {/* Rover Main Chassis */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[1.2, 0.35, 1.8]} />
        <meshStandardMaterial color="#0B2545" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rugged Aluminum Top Plate */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[1.0, 0.05, 1.6]} />
        <meshStandardMaterial color="#1677FF" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Protective Roll-cage Bars */}
      <mesh position={[0.45, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#FACC15" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.45, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#FACC15" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 4 Heavy-Duty All-Terrain Wheels */}
      {/* Front Left */}
      <mesh position={[-0.65, 0.1, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      {/* Front Right */}
      <mesh position={[0.65, 0.1, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      {/* Rear Left */}
      <mesh position={[-0.65, 0.1, -0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      {/* Rear Right */}
      <mesh position={[0.65, 0.1, -0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>

      {/* Sensor Mast */}
      <mesh position={[0, 0.55, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
        <meshStandardMaterial color="#374151" metalness={0.8} />
      </mesh>

      {/* Rotating LiDAR Dome (Livox / Velodyne style) */}
      <group ref={lidarRef} position={[0, 0.8, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 24]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.6} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1677FF" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Forward RGB Vision Camera */}
      <mesh position={[0, 0.45, 0.82]}>
        <boxGeometry args={[0.18, 0.12, 0.14]} />
        <meshStandardMaterial color="#1F2937" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.45, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <meshStandardMaterial color="#00C9A7" emissive="#00C9A7" emissiveIntensity={0.8} />
      </mesh>

      {/* Scanning Cone Effect */}
      {scanning && (
        <group position={[0, 0.8, 0.2]}>
          <mesh ref={scanRingRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 3.2, 32]} />
            <meshBasicMaterial color="#00D9FF" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Floating Status Tag in 3D scene */}
      <Html position={[0, 1.25, 0]} center distanceFactor={14}>
        <div className="px-2 py-0.5 rounded bg-navy-950/90 border border-cyan-400/80 text-[10px] font-mono text-cyan-300 font-bold whitespace-nowrap shadow-lg flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          MineTwin-X Rover [Active SLAM]
        </div>
      </Html>
    </group>
  );
};

