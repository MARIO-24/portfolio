import { Interactive } from './Interactive';

export function Wardrobe({ position, dark, outfit, label, onInteract }) {
  const body    = dark ? '#3a2a18' : '#c2a870';
  const door    = dark ? '#4a3520' : '#d4b880';
  const handle  = dark ? '#888' : '#b8860b';
  const trim    = dark ? '#2a1e10' : '#a08040';

  // Muestra el color del outfit actual como tira de color en la puerta
  const outfitColors = ['#4a7fd4','#c0392b','#8e44ad','#e67e22','#1a1a1a','#ecf0f1','#f1c40f','#16a085'];
  const swatchColor  = outfitColors[outfit ?? 0];

  return (
    <Interactive label={label} onInteract={onInteract}>
      <group position={position}>
        {/* Cuerpo armario */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 2.5, 0.65]} />
          <meshStandardMaterial color={body} roughness={0.8} />
        </mesh>

        {/* Puerta izquierda */}
        <mesh position={[-0.46, 1.25, 0.34]} castShadow>
          <boxGeometry args={[0.86, 2.38, 0.06]} />
          <meshStandardMaterial color={door} roughness={0.7} />
        </mesh>
        {/* Puerta derecha */}
        <mesh position={[0.46, 1.25, 0.34]} castShadow>
          <boxGeometry args={[0.86, 2.38, 0.06]} />
          <meshStandardMaterial color={door} roughness={0.7} />
        </mesh>

        {/* Molduras puertas */}
        {[-0.46, 0.46].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 1.25, 0.38]}>
              <boxGeometry args={[0.72, 2.1, 0.02]} />
              <meshStandardMaterial color={trim} />
            </mesh>
            <mesh position={[x, 1.6, 0.38]}>
              <boxGeometry args={[0.72, 0.02, 0.02]} />
              <meshStandardMaterial color={body} />
            </mesh>
          </group>
        ))}

        {/* Tiradores */}
        <mesh position={[-0.08, 1.25, 0.39]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.12, 8]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial color={handle} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.08, 1.25, 0.39]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.12, 8]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial color={handle} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Tapa superior */}
        <mesh position={[0, 2.54, 0]} castShadow>
          <boxGeometry args={[1.84, 0.06, 0.68]} />
          <meshStandardMaterial color={trim} roughness={0.7} />
        </mesh>

        {/* Base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[1.84, 0.1, 0.68]} />
          <meshStandardMaterial color={trim} roughness={0.7} />
        </mesh>



      </group>
    </Interactive>
  );
}
