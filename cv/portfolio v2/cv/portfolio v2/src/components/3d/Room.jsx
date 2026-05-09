import * as THREE from 'three';

export function Room({ dark }) {
  const floorColor    = dark ? '#2c1f10' : '#9b7040';
  const wallColor     = dark ? '#1a1a2e' : '#f0ebe0';
  const wallSide      = dark ? '#181828' : '#e8e0d0';
  const ceilColor     = dark ? '#12121f' : '#f5f2ed';
  const skirtColor    = dark ? '#3a2810' : '#b8966a';
  const rugColor      = dark ? '#2d2050' : '#8b4a9a';
  const rugColor2     = dark ? '#1e1638' : '#6b3478';

  return (
    <group>
      {/* Suelo */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[11, 9]} />
        <meshStandardMaterial color={floorColor} roughness={0.9} />
      </mesh>

      {/* Tablones del suelo (decorativos) */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={i} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 0]}>
          <planeGeometry args={[0.05, 9]} />
          <meshStandardMaterial color={dark ? '#1e1408' : '#7a5530'} />
        </mesh>
      ))}

      {/* Alfombra — zona central de la habitacion */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color={rugColor} roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <planeGeometry args={[4.4, 3.4]} />
        <meshStandardMaterial color={rugColor2} roughness={1} />
      </mesh>

      {/* Pared trasera */}
      <mesh receiveShadow position={[0, 2.2, -4.5]}>
        <boxGeometry args={[11, 4.4, 0.12]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {/* Pared izquierda */}
      <mesh receiveShadow position={[-5.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9, 4.4, 0.12]} />
        <meshStandardMaterial color={wallSide} roughness={0.95} />
      </mesh>

      {/* Rodapié trasero */}
      <mesh position={[0, 0.06, -4.44]}>
        <boxGeometry args={[11, 0.12, 0.06]} />
        <meshStandardMaterial color={skirtColor} />
      </mesh>
      {/* Rodapié izquierdo */}
      <mesh position={[-5.44, 0.06, 0]}>
        <boxGeometry args={[0.06, 0.12, 9]} />
        <meshStandardMaterial color={skirtColor} />
      </mesh>
      {/* ===== VENTANA (pared trasera) ===== */}
      {/* Hueco / exterior — cielo o noche */}
      <mesh position={[2.0, 2.4, -4.46]}>
        <boxGeometry args={[1.82, 1.62, 0.04]} />
        <meshStandardMaterial
          color={dark ? '#0a0d2a' : '#87ceeb'}
          emissive={dark ? '#0d1440' : '#b8dfff'}
          emissiveIntensity={dark ? 0.6 : 1.0}
          roughness={0.0}
        />
      </mesh>
      {/* Estrellas (modo oscuro) */}
      {dark && [[0.4, 0.5], [-0.3, 0.6], [0.7, 0.1], [-0.6, 0.3], [0.1, -0.2], [-0.2, -0.5], [0.55, -0.3]].map(([ox, oy], i) => (
        <mesh key={i} position={[2.0 + ox * 0.7, 2.4 + oy * 0.65, -4.44]}>
          <boxGeometry args={[0.028, 0.028, 0.001]} />
          <meshBasicMaterial color="#fffbe6" />
        </mesh>
      ))}
      {/* Nubes simples (modo claro) */}
      {!dark && [[0.3, 0.3], [-0.4, 0.1], [0.6, -0.2]].map(([ox, oy], i) => (
        <mesh key={i} position={[2.0 + ox * 0.6, 2.4 + oy * 0.5, -4.44]} scale={[1, 0.5, 1]}>
          <boxGeometry args={[0.3 - i * 0.05, 0.14, 0.001]} />
          <meshBasicMaterial color="rgba(255,255,255,0.85)" />
        </mesh>
      ))}
      {/* Marco exterior (canto de la pared) */}
      <mesh position={[2.0, 2.4, -4.42]}>
        <boxGeometry args={[1.90, 1.72, 0.06]} />
        <meshStandardMaterial color={dark ? '#2a2a3a' : '#d4c8a0'} />
      </mesh>
      {/* Cristal con reflejo */}
      <mesh position={[2.0, 2.4, -4.38]}>
        <boxGeometry args={[1.80, 1.60, 0.01]} />
        <meshStandardMaterial
          color={dark ? '#0d1640' : '#c8e8ff'}
          transparent
          opacity={0.28}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
      {/* Parteluces — cruz interior */}
      <mesh position={[2.0, 2.4, -4.37]}>
        <boxGeometry args={[0.055, 1.60, 0.03]} />
        <meshStandardMaterial color={dark ? '#aaa' : '#fff'} />
      </mesh>
      <mesh position={[2.0, 2.4, -4.37]}>
        <boxGeometry args={[1.80, 0.055, 0.03]} />
        <meshStandardMaterial color={dark ? '#aaa' : '#fff'} />
      </mesh>
      {/* Alféizar (repisa inferior) */}
      <mesh position={[2.0, 1.56, -4.28]} castShadow>
        <boxGeometry args={[1.98, 0.07, 0.18]} />
        <meshStandardMaterial color={dark ? '#3a3a4a' : '#e0d8c0'} roughness={0.6} />
      </mesh>

      {/* Bombilla de techo nocturna — cuelga del techo, solo visible en modo oscuro */}
      {/* Cable */}
      <mesh position={[0, 3.8, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.1, 6]} />
        <meshStandardMaterial color={dark ? '#555' : '#bbb'} />
      </mesh>
      {/* Casquillo */}
      <mesh position={[0, 3.22, 0]}>
        <cylinderGeometry args={[0.055, 0.045, 0.1, 10]} />
        <meshStandardMaterial color={dark ? '#888' : '#ccc'} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Bombilla */}
      <mesh position={[0, 3.08, 0]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial
          color={dark ? '#ffe8b0' : '#eee'}
          emissive={dark ? '#ffaa33' : '#ddd'}
          emissiveIntensity={dark ? 2.5 : 0}
          roughness={0.1}
        />
      </mesh>

      {/* ===== LAMPARA DE PIE (esquina trasera-izquierda) ===== */}
      {/* Base redonda — plato inferior */}
      <mesh position={[-4.7, 0.04, -3.7]} castShadow receiveShadow>
        <cylinderGeometry args={[0.30, 0.32, 0.08, 24]} />
        <meshStandardMaterial color={dark ? '#1a1a1a' : '#888'} roughness={0.3} metalness={0.85} />
      </mesh>
      {/* Base — disco intermedio más estrecho */}
      <mesh position={[-4.7, 0.10, -3.7]}>
        <cylinderGeometry args={[0.14, 0.28, 0.06, 20]} />
        <meshStandardMaterial color={dark ? '#252525' : '#aaa'} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Base — cuello */}
      <mesh position={[-4.7, 0.16, -3.7]}>
        <cylinderGeometry args={[0.04, 0.14, 0.08, 16]} />
        <meshStandardMaterial color={dark ? '#333' : '#bbb'} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Poste inferior */}
      <mesh position={[-4.7, 0.75, -3.7]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 1.10, 10]} />
        <meshStandardMaterial color={dark ? '#555' : '#c0c0c0'} roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Nudo decorativo central */}
      <mesh position={[-4.7, 1.30, -3.7]}>
        <cylinderGeometry args={[0.034, 0.022, 0.10, 14]} />
        <meshStandardMaterial color={dark ? '#666' : '#d0d0d0'} roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Poste superior */}
      <mesh position={[-4.7, 1.85, -3.7]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 1.00, 10]} />
        <meshStandardMaterial color={dark ? '#555' : '#c0c0c0'} roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Casquillo porta-bombilla */}
      <mesh position={[-4.7, 2.37, -3.7]}>
        <cylinderGeometry args={[0.038, 0.026, 0.14, 12]} />
        <meshStandardMaterial color={dark ? '#666' : '#d0d0d0'} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Bombilla Edison — cuerpo */}
      <mesh position={[-4.7, 2.22, -3.7]}>
        <sphereGeometry args={[0.075, 14, 10]} />
        <meshStandardMaterial
          color={dark ? '#fffde8' : '#f0f0e8'}
          emissive={dark ? '#ffdd44' : '#ddd'}
          emissiveIntensity={dark ? 4.0 : 0}
          roughness={0.04} transparent opacity={0.92}
        />
      </mesh>
      {/* Filamento (línea fina dentro de la bombilla) */}
      <mesh position={[-4.7, 2.22, -3.7]}>
        <cylinderGeometry args={[0.004, 0.004, 0.06, 4]} />
        <meshStandardMaterial
          color={dark ? '#ff9900' : '#ccc'}
          emissive={dark ? '#ff6600' : '#999'}
          emissiveIntensity={dark ? 3.0 : 0}
        />
      </mesh>
      {/* Cono volteado — exterior dorado */}
      <mesh position={[-4.7, 2.40, -3.7]}>
        <cylinderGeometry args={[0.082, 0.38, 0.34, 24, 1, true]} />
        <meshStandardMaterial
          color={dark ? '#6a4a10' : '#c8a840'}
          emissive={dark ? '#2a1a04' : '#000'}
          emissiveIntensity={dark ? 0.5 : 0}
          side={2} roughness={0.8}
        />
      </mesh>
      {/* Cono volteado — interior blanco cálido */}
      <mesh position={[-4.7, 2.40, -3.7]}>
        <cylinderGeometry args={[0.074, 0.37, 0.33, 12, 1, true]} />
        <meshStandardMaterial
          color={dark ? '#fff8d0' : '#fffff8'}
          emissive={dark ? '#ffeebb' : '#fffce0'}
          emissiveIntensity={dark ? 1.4 : 0.06}
          side={1} roughness={1}
        />
      </mesh>
      {/* Aro inferior del cono */}
      <mesh position={[-4.7, 2.225, -3.7]}>
        <cylinderGeometry args={[0.386, 0.386, 0.018, 12]} />
        <meshStandardMaterial color={dark ? '#555' : '#c0c0c0'} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Aro superior del cono */}
      <mesh position={[-4.7, 2.573, -3.7]}>
        <cylinderGeometry args={[0.086, 0.086, 0.018, 8]} />
        <meshStandardMaterial color={dark ? '#555' : '#c0c0c0'} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Tapa plana superior */}
      <mesh position={[-4.7, 2.582, -3.7]}>
        <cylinderGeometry args={[0.085, 0.085, 0.012, 8]} />
        <meshStandardMaterial color={dark ? '#6a4a10' : '#c8a840'} roughness={0.7} />
      </mesh>
      {/* Luz única para la lámpara (antes eran 3, ahora 1 más intensa) */}
      {dark && (
        <pointLight position={[-4.7, 1.8, -3.7]} intensity={14} distance={10.0} color="#ffcc66" decay={1.5} castShadow={false} />
      )}

      {/* ===== PERCHERO DE PARED (pared izq, separado del armario) ===== */}
      {/* Tablón horizontal de madera */}
      <mesh position={[-5.43, 2.60, 0.60]}>
        <boxGeometry args={[0.07, 0.14, 0.80]} />
        <meshStandardMaterial color={dark ? '#4a3018' : '#9a7040'} roughness={0.85} />
      </mesh>
      {/* Tornillos de fijación */}
      {[0.28, 0.92].map((z, i) => (
        <mesh key={i} position={[-5.41, 2.60, z]}>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 8]} />
          <meshStandardMaterial color={dark ? '#888' : '#bbb'} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Ganchos */}
      {[0.32, 0.60, 0.88].map((z, i) => (
        <group key={i}>
          <mesh position={[-5.23, 2.60, z]}>
            <boxGeometry args={[0.30, 0.025, 0.025]} />
            <meshStandardMaterial color={dark ? '#777' : '#c0b080'} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-5.08, 2.68, z]}>
            <boxGeometry args={[0.025, 0.18, 0.025]} />
            <meshStandardMaterial color={dark ? '#777' : '#c0b080'} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-5.08, 2.78, z]}>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshStandardMaterial color={dark ? '#888' : '#d0c090'} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

    </group>
  );
}
