import { Interactive } from './Interactive';

export function Bed({ position, rotation = [0, 0, 0], dark, label, onInteract }) {
  const frame    = dark ? '#4a2e10' : '#8b6040';
  const frame2   = dark ? '#3a2010' : '#7a5030';
  const mattress = dark ? '#2a2040' : '#f0ede6';
  const pillow   = dark ? '#3040a0' : '#c8d8f0';
  const blanket  = dark ? '#3a2060' : '#7B68EE';
  const blanket2 = dark ? '#2e1850' : '#6a58de';

  return (
    <group position={position} rotation={rotation}>
      <Interactive label={label} onInteract={onInteract}>
        <group>
          {/* Cabecero */}
          <mesh position={[0, 1.0, -0.9]} castShadow>
            <boxGeometry args={[2.2, 1.4, 0.12]} />
            <meshStandardMaterial color={frame} roughness={0.8} />
          </mesh>
          {/* Detalle cabecero */}
          {[-0.5, 0, 0.5].map((x, i) => (
            <mesh key={i} position={[x, 0.95, -0.83]} castShadow>
              <boxGeometry args={[0.06, 1.1, 0.04]} />
              <meshStandardMaterial color={frame2} />
            </mesh>
          ))}

          {/* Marco cama */}
          <mesh position={[0, 0.3, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.3, 2.4]} />
            <meshStandardMaterial color={frame} roughness={0.8} />
          </mesh>
          {/* Patas */}
          {[[-0.95, 0.1, -0.75], [0.95, 0.1, -0.75], [-0.95, 0.1, 1.0], [0.95, 0.1, 1.0]].map((p, i) => (
            <mesh key={i} position={p} castShadow>
              <boxGeometry args={[0.1, 0.22, 0.1]} />
              <meshStandardMaterial color={frame2} />
            </mesh>
          ))}

          {/* Colchon */}
          <mesh position={[0, 0.52, 0.2]} castShadow>
            <boxGeometry args={[2.0, 0.18, 2.2]} />
            <meshStandardMaterial color={mattress} roughness={0.9} />
          </mesh>

          {/* Manta */}
          <mesh position={[0, 0.63, 0.6]} castShadow>
            <boxGeometry args={[2.0, 0.06, 1.4]} />
            <meshStandardMaterial color={blanket} roughness={1} />
          </mesh>
          <mesh position={[0, 0.65, -0.18]} castShadow>
            <boxGeometry args={[2.0, 0.06, 0.06]} />
            <meshStandardMaterial color={blanket2} />
          </mesh>

          {/* Almohada */}
          <mesh position={[0, 0.62, -0.6]} castShadow>
            <boxGeometry args={[1.7, 0.12, 0.5]} />
            <meshStandardMaterial color={pillow} roughness={0.95} />
          </mesh>

          {/* Mesita de noche 1 - junto al cabecero */}
          <mesh position={[-1.4, 0.38, -0.5]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.6, 0.55]} />
            <meshStandardMaterial color={frame} roughness={0.8} />
          </mesh>
          <mesh position={[-1.4, 0.3, -0.225]}>
            <boxGeometry args={[0.45, 0.16, 0.04]} />
            <meshStandardMaterial color={frame2} />
          </mesh>
          <mesh position={[-1.4, 0.3, -0.21]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#888" metalness={0.7} />
          </mesh>

          {/* Lampara - base */}
          <mesh position={[-1.4, 0.72, -0.5]}>
            <cylinderGeometry args={[0.055, 0.065, 0.06, 10]} />
            <meshStandardMaterial color={frame2} metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Lampara - varilla */}
          <mesh position={[-1.4, 0.88, -0.5]}>
            <cylinderGeometry args={[0.012, 0.012, 0.28, 6]} />
            <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Lampara - pantalla */}
          <mesh position={[-1.4, 1.06, -0.5]}>
            <cylinderGeometry args={[0.13, 0.065, 0.18, 12, 1, true]} />
            <meshStandardMaterial color={dark ? '#f0e0a0' : '#e0d090'} side={2} roughness={0.9} />
          </mesh>
          {/* Bombilla interior */}
          <mesh position={[-1.4, 1.01, -0.5]}>
            <sphereGeometry args={[0.04, 8, 6]} />
            <meshStandardMaterial
              color={dark ? '#ffe090' : '#ddd'}
              emissive={dark ? '#ffcc33' : '#ccc'}
              emissiveIntensity={dark ? 2.5 : 0}
            />
          </mesh>
          {/* Luz de lampara - solo modo oscuro */}
          {dark && <pointLight position={[-1.4, 0.95, -0.5]} intensity={1.8} color="#ffdd88" distance={3.5} decay={2} />}
        </group>
      </Interactive>

      {/* Mesita 2 - fuera del Interactive, no activa la cama */}
      <mesh position={[1.4, 0.38, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.6, 0.55]} />
        <meshStandardMaterial color={frame} roughness={0.8} />
      </mesh>
      <mesh position={[1.4, 0.3, -0.225]}>
        <boxGeometry args={[0.45, 0.16, 0.04]} />
        <meshStandardMaterial color={frame2} />
      </mesh>
      <mesh position={[1.4, 0.3, -0.21]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#888" metalness={0.7} />
      </mesh>
    </group>
  );
}