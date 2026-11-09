import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Asset, DigitalTwinScanMode, RobotTelemetry } from '../types';
import { Asset3DObject } from './Asset3DObject';
import { Rover3D } from './Rover3D';

interface MiningTunnelSceneProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  scanMode: DigitalTwinScanMode;
  onSelectAsset: (asset: Asset) => void;
  telemetry: RobotTelemetry;
  showPointCloud: boolean;
  showTunnelArches: boolean;
  activeFilter: string;
}

export const MiningTunnelScene: React.FC<MiningTunnelSceneProps> = ({
  assets,
  selectedAsset,
  scanMode,
  onSelectAsset,
  telemetry,
  showPointCloud = true,
  showTunnelArches = true,
  activeFilter = 'all',
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Filter assets based on active filter button
  const filteredAssets = useMemo(() => {
    if (activeFilter === 'all') return assets;
    return assets.filter(a => a.classType === activeFilter);
  }, [assets, activeFilter]);

  // Generate dense 3D point cloud particles (simulating 3D LiDAR point cloud of mine stope)
  const [pointPositions, pointColors] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorNormal = new THREE.Color('#00D9FF');
    const colorGround = new THREE.Color('#1677FF');
    const colorCeiling = new THREE.Color('#7957FF');
    const colorChange = new THREE.Color('#EF4444');

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Tunnel bounds: x: -16 to +16, y: 0 to 4.5, z: -35 to 5
      const angle = (Math.random() - 0.5) * Math.PI * 0.9;
      const radius = 6.0 + (Math.random() - 0.5) * 1.2;
      const z = (Math.random() - 0.5) * 45 - 12;

      // Tunnel arch cross-section
      const x = Math.sin(angle) * radius;
      const y = Math.max(0, Math.cos(angle) * radius - 1.5);

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      let c = colorNormal;
      if (y < 0.2) c = colorGround;
      else if (y > 3.5) c = colorCeiling;

      // If in change detection mode, add small clusters of red deformation particles
      if (scanMode === 'changes' && (Math.abs(x - (-8)) < 1.5 && Math.abs(z - (-12)) < 1.5)) {
        c = colorChange;
      }

      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;
    }

    return [positions, colors];
  }, [scanMode]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      // Subtle pulse to simulate continuous lidar sweep noise
      pointsRef.current.rotation.y = Math.sin(Date.now() / 5000) * 0.01;
    }
  });

  return (
    <>
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} castShadow />
      <pointLight position={[0, 4, -10]} intensity={1.5} color="#00D9FF" distance={25} />
      <pointLight position={[0, 4, -25]} intensity={1.2} color="#1677FF" distance={25} />
      <pointLight position={[-10, 2, -15]} intensity={0.8} color="#FF9F43" distance={15} />

      {/* Orbit Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        maxDistance={50}
        minDistance={2}
        maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
      />

      {/* Tunnel Floor (Rocky Bed / Pathway Base) */}
      <mesh position={[0, -0.05, -15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[36, 65, 32, 32]} />
        <meshStandardMaterial
          color="#071B33"
          roughness={0.9}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Floor Grid (Spatial coordinate reference) */}
      <gridHelper
        args={[60, 60, '#00D9FF', '#133560']}
        position={[0, 0.01, -15]}
      />

      {/* Haulage Railway Tracks on Main Pathway */}
      <group position={[0, 0.04, -15]}>
        {/* Left rail */}
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 55]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Right rail */}
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 55]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Structural Steel Rib Tunnel Arches */}
      {showTunnelArches && (
        <group>
          {[-30, -25, -20, -15, -10, -5, 0].map((zPos, idx) => (
            <group key={idx} position={[0, 0, zPos]}>
              <mesh position={[0, 2.5, 0]}>
                <torusGeometry args={[5.2, 0.12, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* Rock Bolt Anchors */}
              <mesh position={[0, 5.15, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
                <meshStandardMaterial color="#FACC15" metalness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Point Cloud Particles (LiDAR Simulation) */}
      {showPointCloud && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pointPositions.length / 3}
              array={pointPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={pointColors.length / 3}
              array={pointColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.07}
            vertexColors
            transparent
            opacity={0.75}
            sizeAttenuation
          />
        </points>
      )}

      {/* Semantic 3D Assets in Tunnel */}
      {filteredAssets.map((asset) => (
        <Asset3DObject
          key={asset.id}
          asset={asset}
          isSelected={selectedAsset?.id === asset.id}
          scanMode={scanMode}
          onSelect={onSelectAsset}
        />
      ))}

      {/* Active Inspection Rover in 3D Space */}
      <Rover3D
        position={[
          telemetry.position.x || -2.4,
          telemetry.position.y || 0.35,
          telemetry.position.z || -10.8
        ]}
        headingDeg={telemetry.position.headingDeg || 34.5}
        scanning={true}
      />
    </>
  );
};

