import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { Asset, DigitalTwinScanMode } from '../types';

interface Asset3DObjectProps {
  asset: Asset;
  isSelected: boolean;
  scanMode: DigitalTwinScanMode;
  onSelect: (asset: Asset) => void;
}

export const Asset3DObject: React.FC<Asset3DObjectProps> = ({
  asset,
  isSelected,
  scanMode,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);

  // Compute color based on scanMode & classType
  let objectColor = '#94A3B8'; // default grey
  let emissiveColor = '#000000';
  let emissiveIntensity = 0.1;

  if (scanMode === 'changes') {
    if (asset.hasGeometricChange) {
      if ((asset.changeDetails?.displacementMm || 0) > 20) {
        objectColor = '#EF4444'; // Red: significant displacement
        emissiveColor = '#EF4444';
        emissiveIntensity = 0.5;
      } else {
        objectColor = '#FF9F43'; // Orange: review required
        emissiveColor = '#FF9F43';
        emissiveIntensity = 0.4;
      }
    } else {
      objectColor = '#10B981'; // Green: normal, no change
      emissiveColor = '#10B981';
      emissiveIntensity = 0.15;
    }
  } else {
    // Normal semantic class color coding
    switch (asset.classType) {
      case 'pillar':
        objectColor = '#EF4444'; // Red: Pillars
        break;
      case 'equipment':
        objectColor = '#3B82F6'; // Blue: Equipment
        break;
      case 'pipe':
        objectColor = '#FACC15'; // Yellow: Pipes
        break;
      case 'fence':
        objectColor = '#A855F7'; // Purple: Fences
        break;
      case 'pathway':
        objectColor = '#10B981'; // Green: Pathways
        break;
      case 'human':
        objectColor = '#F97316'; // Orange: Humans
        break;
      default:
        objectColor = '#94A3B8'; // Grey: Unknown
    }
    if (isSelected || hovered) {
      emissiveColor = '#00D9FF';
      emissiveIntensity = 0.6;
    }
  }

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(asset);
  };

  const renderGeometry = () => {
    switch (asset.classType) {
      case 'pillar': {
        const radius = asset.dimensions.radius || 0.45;
        const height = asset.dimensions.height || 3.2;
        return (
          <group position={asset.position}>
            <mesh
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <cylinderGeometry args={[radius, radius, height, 18]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                metalness={0.2}
                roughness={0.6}
                wireframe={false}
              />
            </mesh>
            {/* Top & Base concrete footing rings */}
            <mesh position={[0, height / 2, 0]}>
              <cylinderGeometry args={[radius * 1.25, radius * 1.1, 0.15, 18]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[0, -height / 2, 0]}>
              <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.2, 18]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          </group>
        );
      }

      case 'pipe': {
        const radius = asset.dimensions.radius || 0.18;
        const length = asset.dimensions.length || 35.0;
        return (
          <group position={asset.position} rotation={[0, 0, Math.PI / 2]}>
            <mesh
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <cylinderGeometry args={[radius, radius, length, 16]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      }

      case 'equipment': {
        const w = asset.dimensions.width || 2.4;
        const h = asset.dimensions.height || 2.2;
        const d = asset.dimensions.depth || 3.5;
        return (
          <group position={asset.position}>
            <mesh
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
            {/* Additional industrial detailing (exhaust / drill head) */}
            <mesh position={[0, h / 2 + 0.3, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.6, 12]} />
              <meshStandardMaterial color="#64748B" />
            </mesh>
          </group>
        );
      }

      case 'fence': {
        const w = asset.dimensions.width || 0.1;
        const h = asset.dimensions.height || 1.8;
        const d = asset.dimensions.depth || 8.0;
        return (
          <group position={asset.position}>
            <mesh
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                transparent
                opacity={0.75}
                wireframe={false}
              />
            </mesh>
          </group>
        );
      }

      case 'pathway': {
        const w = asset.dimensions.width || 5.0;
        const l = asset.dimensions.length || 60.0;
        return (
          <group position={asset.position}>
            <mesh
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <boxGeometry args={[w, 0.05, l]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                roughness={0.9}
              />
            </mesh>
          </group>
        );
      }

      case 'human': {
        const h = asset.dimensions.height || 1.8;
        return (
          <group position={asset.position}>
            {/* Torso */}
            <mesh
              position={[0, 0, 0]}
              onClick={handleClick}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
              onPointerOut={() => setHovered(false)}
            >
              <capsuleGeometry args={[0.22, 0.7, 8, 16]} />
              <meshStandardMaterial
                color={objectColor}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
              />
            </mesh>
            {/* Hardhat / Head */}
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#FACC15" metalness={0.4} />
            </mesh>
          </group>
        );
      }

      default:
        return (
          <mesh position={asset.position} onClick={handleClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={objectColor} />
          </mesh>
        );
    }
  };

  return (
    <group>
      {renderGeometry()}

      {/* Floating 3D Badge on hover or selection */}
      {(hovered || isSelected) && (
        <Html
          position={[
            asset.position[0],
            asset.position[1] + (asset.dimensions.height ? asset.dimensions.height / 2 + 0.6 : 1.2),
            asset.position[2]
          ]}
          center
          distanceFactor={18}
        >
          <div
            onClick={handleClick}
            className={`cursor-pointer px-2.5 py-1 rounded shadow-2xl text-[11px] font-mono font-semibold transition-all duration-200 border whitespace-nowrap backdrop-blur-md ${
              isSelected
                ? 'bg-cyan-500 text-navy-950 border-white scale-110 shadow-cyan-500/50'
                : 'bg-navy-900/90 text-cyan-300 border-cyan-500/60 hover:scale-105'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: objectColor }}
              />
              <span>{asset.id}</span>
              <span className="opacity-70 text-[9px]">({asset.classType})</span>
              {asset.hasGeometricChange && (
                <span className="px-1 py-0.2 rounded bg-red-500/80 text-[8px] text-white">
                  Δ {asset.changeDetails?.displacementMm}mm
                </span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

