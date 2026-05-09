import { Interactive } from './Interactive';

export function MobilePhone({ position, rotation, dark, label, onInteract }) {
  const body   = dark ? '#1a1a2a' : '#111';
  const screen = dark ? '#0a1830' : '#0d1f40';
  const glow   = dark ? '#4488ff' : '#66aaff';
  const btn    = dark ? '#222' : '#333';

  return (
    <Interactive label={label} onInteract={onInteract} hoverScale={1.08}>
      <group position={position} rotation={rotation}>
        {/* Cuerpo */}
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.58, 0.05]} />
          <meshStandardMaterial color={body} roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Pantalla */}
        <mesh position={[0, 0, 0.027]}>
          <boxGeometry args={[0.24, 0.52, 0.005]} />
          <meshStandardMaterial color={screen} emissive={glow} emissiveIntensity={0.5} />
        </mesh>
        {/* Notch/cámara */}
        <mesh position={[0, 0.22, 0.033]}>
          <cylinderGeometry args={[0.018, 0.018, 0.005, 12]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Botón home */}
        <mesh position={[0, -0.24, 0.028]}>
          <cylinderGeometry args={[0.025, 0.025, 0.005, 16]} />
          <meshStandardMaterial color={btn} />
        </mesh>
        {/* Botón lateral */}
        <mesh position={[0.142, 0.1, 0]}>
          <boxGeometry args={[0.01, 0.1, 0.02]} />
          <meshStandardMaterial color={btn} />
        </mesh>
        {/* Grid de apps en la pantalla */}
        {[[-0.06, 0.06], [0.06, 0.06], [-0.06, -0.04], [0.06, -0.04], [-0.06, -0.14], [0.06, -0.14]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.033]}>
            <boxGeometry args={[0.055, 0.055, 0.001]} />
            <meshBasicMaterial color={['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c'][i]} />
          </mesh>
        ))}
      </group>
    </Interactive>
  );
}
