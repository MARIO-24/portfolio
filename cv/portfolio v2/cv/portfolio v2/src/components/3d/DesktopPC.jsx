import { Interactive } from './Interactive';

export function DesktopPC({ position, dark, label, onInteract }) {
  const wood  = dark ? '#4a2e10' : '#7a5530';
  const wood2 = dark ? '#3a2210' : '#6a4520';
  const tower = dark ? '#1a1a2e' : '#2a2a3a';
  const scrn  = dark ? '#0a1830' : '#0d1f40';
  const scrn2 = dark ? '#1a3a8a' : '#2a5cdd';
  const kb    = dark ? '#222' : '#333';

  return (
    <Interactive label={label} onInteract={onInteract}>
      <group position={position}>
        {/* Mesa */}
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.1, 1.1]} />
          <meshStandardMaterial color={wood} roughness={0.85} />
        </mesh>
        {/* Borde mesa */}
        <mesh position={[0, 0.755, 0.5]} castShadow>
          <boxGeometry args={[2.8, 0.05, 0.04]} />
          <meshStandardMaterial color={wood2} />
        </mesh>
        {/* Patas */}
        {[[-1.25, 0.375, -0.42], [1.25, 0.375, -0.42], [-1.25, 0.375, 0.42], [1.25, 0.375, 0.42]].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <boxGeometry args={[0.06, 0.75, 0.06]} />
            <meshStandardMaterial color={wood2} />
          </mesh>
        ))}

        {/* Torre PC */}
        <mesh position={[-1.0, 1.2, 0.1]} castShadow>
          <boxGeometry args={[0.35, 0.75, 0.5]} />
          <meshStandardMaterial color={tower} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Botón encendido */}
        <mesh position={[-0.82, 1.45, 0.36]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
        </mesh>

        {/* Soporte monitor */}
        <mesh position={[0.2, 0.92, 0]} castShadow>
          <boxGeometry args={[0.08, 0.28, 0.08]} />
          <meshStandardMaterial color={tower} />
        </mesh>
        <mesh position={[0.2, 0.82, 0]} castShadow>
          <boxGeometry args={[0.38, 0.04, 0.28]} />
          <meshStandardMaterial color={tower} />
        </mesh>

        {/* Monitor (carcasa) */}
        <mesh position={[0.2, 1.45, 0.02]} castShadow>
          <boxGeometry args={[1.4, 0.88, 0.07]} />
          <meshStandardMaterial color={tower} roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Pantalla */}
        <mesh position={[0.2, 1.45, 0.065]}>
          <boxGeometry args={[1.28, 0.76, 0.01]} />
          <meshStandardMaterial color={scrn} emissive={scrn2} emissiveIntensity={0.55} />
        </mesh>
        {/* Código falso en pantalla */}
        {[0.25, 0.1, -0.05, -0.2].map((y, i) => (
          <mesh key={i} position={[-0.1 + i * 0.05, 1.45 + y, 0.07]}>
            <boxGeometry args={[0.3 - i * 0.04, 0.015, 0.001]} />
            <meshBasicMaterial color={dark ? '#44ff88' : '#88ffcc'} />
          </mesh>
        ))}

        {/* Teclado */}
        <mesh position={[0.2, 0.84, 0.3]} castShadow>
          <boxGeometry args={[0.9, 0.025, 0.28]} />
          <meshStandardMaterial color={kb} />
        </mesh>
        {/* Teclas (decorativas) */}
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 8 }, (_, col) => (
            <mesh key={`${row}-${col}`} position={[-0.28 + col * 0.08, 0.855, 0.22 + row * 0.07]}>
              <boxGeometry args={[0.065, 0.01, 0.055]} />
              <meshStandardMaterial color={dark ? '#333' : '#444'} />
            </mesh>
          ))
        )}

        {/* Ratón */}
        <mesh position={[0.82, 0.84, 0.3]} castShadow>
          <boxGeometry args={[0.1, 0.028, 0.15]} />
          <meshStandardMaterial color={kb} />
        </mesh>

        {/* Silla de oficina */}
        {/* Asiento */}
        <mesh position={[0.2, 0.58, 1.0]} castShadow>
          <boxGeometry args={[0.6, 0.06, 0.58]} />
          <meshStandardMaterial color={dark ? '#1a1a2a' : '#2a2a3a'} roughness={0.8} />
        </mesh>
        {/* Respaldo */}
        <mesh position={[0.2, 0.92, 1.32]} castShadow>
          <boxGeometry args={[0.56, 0.62, 0.06]} />
          <meshStandardMaterial color={dark ? '#1a1a2a' : '#2a2a3a'} roughness={0.8} />
        </mesh>
        {/* Poste central */}
        <mesh position={[0.2, 0.26, 1.0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.52, 8]} />
          <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Base estrella (5 patas) */}
        {[0, 1, 2, 3, 4].map(i => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[0.2 + Math.cos(angle) * 0.28, 0.04, 1.0 + Math.sin(angle) * 0.28]} rotation={[0, -angle, 0]} castShadow>
              <boxGeometry args={[0.56, 0.04, 0.06]} />
              <meshStandardMaterial color="#444" metalness={0.5} roughness={0.5} />
            </mesh>
          );
        })}

        {/* Papelera — pegada al lateral derecho del escritorio */}
        <mesh position={[1.65, 0.24, 0.55]} castShadow>
          <cylinderGeometry args={[0.17, 0.13, 0.48, 12]} />
          <meshStandardMaterial color={dark ? '#222' : '#4a4a4a'} roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Aro superior papelera */}
        <mesh position={[1.65, 0.49, 0.55]}>
          <torusGeometry args={[0.17, 0.012, 8, 20]} />
          <meshStandardMaterial color={dark ? '#333' : '#666'} metalness={0.6} />
        </mesh>
        {/* Papel arrugado dentro */}
        <mesh position={[1.65, 0.45, 0.55]} scale={[1, 0.65, 1]}>
          <sphereGeometry args={[0.1, 6, 5]} />
          <meshStandardMaterial color={dark ? '#ccc' : '#eee'} roughness={1} />
        </mesh>
      </group>
    </Interactive>
  );
}
