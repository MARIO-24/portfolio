import { Interactive } from './Interactive';

export function LightSwitch({ position, dark, on, label, onInteract }) {
  const plate = dark ? '#ddd' : '#f5f5f0';
  const lever = on ? '#eee' : '#666';
  const glow  = on ? '#ffe066' : 'transparent';

  return (
    <Interactive label={label} onInteract={onInteract} hoverScale={1.1}>
      <group position={position}>
        {/* Placa */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.2, 0.025]} />
          <meshStandardMaterial color={plate} roughness={0.5} />
        </mesh>
        {/* Palanca */}
        <mesh position={[0, on ? 0.03 : -0.03, 0.02]}>
          <boxGeometry args={[0.04, 0.09, 0.025]} />
          <meshStandardMaterial color={lever} />
        </mesh>
        {/* Indicador luminoso */}
        <mesh position={[0, -0.06, 0.026]}>
          <cylinderGeometry args={[0.01, 0.01, 0.008, 8]} />
          <meshStandardMaterial color={on ? '#00ff88' : '#333'} emissive={on ? '#00ff88' : '#000'} emissiveIntensity={on ? 1 : 0} />
        </mesh>
      </group>
    </Interactive>
  );
}
