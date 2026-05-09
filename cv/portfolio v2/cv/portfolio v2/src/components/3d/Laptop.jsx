import { Interactive } from './Interactive';

export function Laptop({ position, rotation, dark, label, onInteract }) {
  const body     = dark ? '#2a2a3a' : '#c0c0c0';
  const screen   = dark ? '#0a1830' : '#0d1f40';
  const scrnGlow = dark ? '#3366ff' : '#4488ff';

  return (
    <Interactive label={label} onInteract={onInteract} position={position} rotation={rotation}>
      <group>

        {/* === Caos de papeles en el suelo === */}

        {/* Documento 1 */}
        <mesh position={[0.5, 0.003, 0.35]} rotation={[-Math.PI / 2, 0, 0.45]} receiveShadow>
          <boxGeometry args={[0.38, 0.28, 0.004]} />
          <meshStandardMaterial color={dark ? '#d8d0b8' : '#f5f0e0'} roughness={1} />
        </mesh>
        {[0.08, 0.02, -0.04, -0.1].map((y, i) => (
          <mesh key={i} position={[0.48, 0.008, 0.37 + y * 0.5]} rotation={[-Math.PI / 2, 0, 0.45]}>
            <boxGeometry args={[0.26 - i * 0.02, 0.003, 0.001]} />
            <meshBasicMaterial color={dark ? '#888' : '#aaa'} />
          </mesh>
        ))}
        {/* Documento 2 */}
        <mesh position={[0.38, 0.004, 0.55]} rotation={[-Math.PI / 2, 0, -0.25]} receiveShadow>
          <boxGeometry args={[0.36, 0.26, 0.004]} />
          <meshStandardMaterial color={dark ? '#ccc8b0' : '#ede8d5'} roughness={1} />
        </mesh>
        {/* Documento 3 — más alejado */}
        <mesh position={[-0.55, 0.003, 0.7]} rotation={[-Math.PI / 2, 0, 1.1]} receiveShadow>
          <boxGeometry args={[0.34, 0.24, 0.004]} />
          <meshStandardMaterial color={dark ? '#d0cbb0' : '#f0ebe0'} roughness={1} />
        </mesh>
        {/* Bola de papel 1 */}
        <mesh position={[-0.3, 0.055, -0.5]} scale={[1.0, 0.7, 0.85]}>
          <sphereGeometry args={[0.07, 6, 5]} />
          <meshStandardMaterial color={dark ? '#ccc' : '#eee'} roughness={1} />
        </mesh>
        {/* Bola de papel 2 */}
        <mesh position={[0.75, 0.05, 0.15]} scale={[0.9, 0.65, 1.0]}>
          <sphereGeometry args={[0.065, 6, 5]} />
          <meshStandardMaterial color={dark ? '#c8c5b5' : '#e8e5d5'} roughness={1} />
        </mesh>
        {/* Bola de papel 3 — pequeña */}
        <mesh position={[-0.15, 0.04, 0.8]} scale={[1.0, 0.6, 0.9]}>
          <sphereGeometry args={[0.05, 5, 4]} />
          <meshStandardMaterial color={dark ? '#bbb' : '#ddd'} roughness={1} />
        </mesh>
        {/* Lápiz */}
        <mesh position={[0.7, 0.008, 0.22]} rotation={[0, -0.55, 0]} castShadow>
          <boxGeometry args={[0.06, 0.016, 0.72]} />
          <meshStandardMaterial color="#f0d030" roughness={0.6} />
        </mesh>
        {/* Punta del lápiz */}
        <mesh position={[0.7 + Math.sin(0.55) * 0.38, 0.008, 0.22 - Math.cos(0.55) * 0.38]} rotation={[0, -0.55, 0]}>
          <boxGeometry args={[0.06, 0.016, 0.06]} />
          <meshStandardMaterial color="#e8a060" />
        </mesh>

        {/* Base portátil */}
        <mesh position={[0, 0.028, 0.05]} castShadow>
          <boxGeometry args={[1.1, 0.055, 0.72]} />
          <meshStandardMaterial color={body} roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Teclado (base) */}
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <mesh key={`${row}-${col}`} position={[-0.42 + col * 0.09, 0.060, -0.12 + row * 0.09]}>
              <boxGeometry args={[0.075, 0.01, 0.07]} />
              <meshStandardMaterial color={dark ? '#1a1a2a' : '#888'} />
            </mesh>
          ))
        )}

        {/* Pantalla (tapa abierta ~105°) */}
        <group position={[0, 0.055, -0.31]} rotation={[-Math.PI * 0.35, 0, 0]}>
          {/* Carcasa tapa */}
          <mesh position={[0, 0.38, 0]} castShadow>
            <boxGeometry args={[1.1, 0.72, 0.045]} />
            <meshStandardMaterial color={body} roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Pantalla */}
          <mesh position={[0, 0.38, 0.025]}>
            <boxGeometry args={[1.0, 0.63, 0.01]} />
            <meshStandardMaterial color={screen} emissive={scrnGlow} emissiveIntensity={0.5} />
          </mesh>
          {/* Texto en pantalla */}
          {[0.18, 0.08, -0.02, -0.12].map((y, i) => (
            <mesh key={i} position={[-0.2 + i * 0.06, 0.38 + y, 0.032]}>
              <boxGeometry args={[0.25 - i * 0.02, 0.012, 0.001]} />
              <meshBasicMaterial color={dark ? '#66aaff' : '#aaddff'} />
            </mesh>
          ))}
          {/* Webcam */}
          <mesh position={[0, 0.72, 0.025]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>

        {/* Trackpad */}
        <mesh position={[0, 0.061, 0.22]}>
          <boxGeometry args={[0.34, 0.008, 0.22]} />
          <meshStandardMaterial color={dark ? '#1e1e2e' : '#aaa'} />
        </mesh>
      </group>
    </Interactive>
  );
}
