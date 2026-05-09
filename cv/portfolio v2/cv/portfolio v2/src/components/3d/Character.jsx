import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Character({ charRef, dark, lang, outfit, walkT }) {
  const bodyGroup  = useRef();
  const leftLegRef  = useRef();
  const rightLegRef = useRef();
  const leftArmRef  = useRef();
  const rightArmRef = useRef();

  const skin   = '#d4a06a';
  const skinD  = '#c0935e';
  const hair   = '#1a0e06';

  // Paleta de outfits: [camiseta, pantalón]
  const outfitPalette = [
    [dark ? '#2a4a8a' : '#4a7fd4', dark ? '#5a3a1a' : '#8b5e2a'],  // 0 azul/marrón (default ES)
    [dark ? '#2a7a3a' : '#3dba5a', dark ? '#3a4a1a' : '#6a8a2a'],  // 1 verde/oliva
    [dark ? '#8a1a1a' : '#c0392b', dark ? '#4a1a1a' : '#7a2a2a'],  // 2 rojo/granate
    [dark ? '#6a2a8a' : '#8e44ad', dark ? '#3a1a4a' : '#5a2a7a'],  // 3 morado
    [dark ? '#8a5a1a' : '#e67e22', dark ? '#3a2a10' : '#6a4a18'],  // 4 naranja/marrón
    [dark ? '#1a1a1a' : '#2c2c2c', dark ? '#111'   : '#1a1a1a'],   // 5 negro
    [dark ? '#aaaaaa' : '#ecf0f1', dark ? '#666'   : '#95a5a6'],   // 6 blanco/gris
    [dark ? '#8a7a10' : '#f1c40f', dark ? '#3a3010' : '#7a6010'],  // 7 amarillo
  ];
  const [shirt, pants] = outfitPalette[outfit ?? 0];
  const shoes  = '#111111';
  const hp     = shirt;
  const hpPad  = '#0d0d0d';

  useFrame(() => {
    const t = walkT.current;
    const swing = Math.sin(t) * 0.3;
    if (leftLegRef.current)  leftLegRef.current.rotation.x  =  swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
    if (leftArmRef.current)  leftArmRef.current.rotation.x  = -swing * 0.5;
    if (rightArmRef.current) rightArmRef.current.rotation.x =  swing * 0.5;
  });

  return (
    <group ref={charRef} position={[0, 0, 0]}>
      {/* Sombra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.32, 20]} />
        <meshBasicMaterial color="black" transparent opacity={0.18} />
      </mesh>

      <group ref={bodyGroup}>

        {/* PIERNAS */}
        <group ref={leftLegRef} position={[-0.12, 0.68, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <boxGeometry args={[0.18, 0.34, 0.18]} />
            <meshStandardMaterial color={pants} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.44, 0]} castShadow>
            <boxGeometry args={[0.15, 0.28, 0.15]} />
            <meshStandardMaterial color={pants} roughness={0.9} />
          </mesh>
          <mesh position={[0.01, -0.64, 0.03]} castShadow>
            <boxGeometry args={[0.17, 0.12, 0.26]} />
            <meshStandardMaterial color={shoes} roughness={0.8} />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[0.12, 0.68, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <boxGeometry args={[0.18, 0.34, 0.18]} />
            <meshStandardMaterial color={pants} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.44, 0]} castShadow>
            <boxGeometry args={[0.15, 0.28, 0.15]} />
            <meshStandardMaterial color={pants} roughness={0.9} />
          </mesh>
          <mesh position={[0.01, -0.64, 0.03]} castShadow>
            <boxGeometry args={[0.17, 0.12, 0.26]} />
            <meshStandardMaterial color={shoes} roughness={0.8} />
          </mesh>
        </group>

        {/* TORSO */}
        <mesh position={[0, 1.06, 0]} castShadow>
          <boxGeometry args={[0.50, 0.66, 0.30]} />
          <meshStandardMaterial color={shirt} roughness={0.85} />
        </mesh>
        {/* Cinturon */}
        <mesh position={[0, 0.74, 0]}>
          <boxGeometry args={[0.48, 0.07, 0.30]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
        </mesh>
        {/* Cuello */}
        <mesh position={[0, 1.42, 0]} castShadow>
          <boxGeometry args={[0.16, 0.10, 0.17]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>

        {/* BRAZOS */}
        <group ref={leftArmRef} position={[-0.31, 1.28, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <boxGeometry args={[0.16, 0.38, 0.16]} />
            <meshStandardMaterial color={shirt} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.41, 0]} castShadow>
            <boxGeometry args={[0.13, 0.26, 0.13]} />
            <meshStandardMaterial color={skin} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.58, 0.01]} castShadow>
            <boxGeometry args={[0.14, 0.10, 0.16]} />
            <meshStandardMaterial color={skin} roughness={0.8} />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.31, 1.28, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <boxGeometry args={[0.16, 0.38, 0.16]} />
            <meshStandardMaterial color={shirt} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.41, 0]} castShadow>
            <boxGeometry args={[0.13, 0.26, 0.13]} />
            <meshStandardMaterial color={skin} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.58, 0.01]} castShadow>
            <boxGeometry args={[0.14, 0.10, 0.16]} />
            <meshStandardMaterial color={skin} roughness={0.8} />
          </mesh>
        </group>

        {/* CABEZA */}
        <mesh position={[0, 1.72, 0]} castShadow>
          <boxGeometry args={[0.44, 0.44, 0.40]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>
        {/* Mandibula */}
        <mesh position={[0, 1.52, 0]}>
          <boxGeometry args={[0.36, 0.08, 0.34]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>

        {/* PELO */}
        {/* Base superior */}
        <mesh position={[0, 1.96, 0]} castShadow>
          <boxGeometry args={[0.46, 0.08, 0.42]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Volumen despeinado */}
        <mesh position={[-0.04, 2.04, -0.02]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.36]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Flequillo */}
        <mesh position={[-0.05, 1.93, 0.21]} castShadow>
          <boxGeometry args={[0.28, 0.09, 0.06]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[0.1, 1.90, 0.22]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.05]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Lateral izquierdo */}
        <mesh position={[-0.235, 1.78, -0.01]} castShadow>
          <boxGeometry args={[0.04, 0.22, 0.36]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Lateral derecho */}
        <mesh position={[0.235, 1.78, -0.01]} castShadow>
          <boxGeometry args={[0.04, 0.22, 0.36]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Nuca */}
        <mesh position={[0, 1.80, -0.22]} castShadow>
          <boxGeometry args={[0.44, 0.28, 0.04]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>

        {/* CEJAS */}
        <mesh position={[-0.12, 1.81, 0.21]}>
          <boxGeometry args={[0.10, 0.03, 0.01]} />
          <meshBasicMaterial color={hair} />
        </mesh>
        <mesh position={[0.12, 1.81, 0.21]}>
          <boxGeometry args={[0.10, 0.03, 0.01]} />
          <meshBasicMaterial color={hair} />
        </mesh>

        {/* OJOS - perfectamente simetricos */}
        {[-0.12, 0.12].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 1.74, 0.21]}>
              <boxGeometry args={[0.09, 0.08, 0.01]} />
              <meshBasicMaterial color="#e8e8e8" />
            </mesh>
            <mesh position={[x, 1.73, 0.215]}>
              <boxGeometry args={[0.055, 0.062, 0.01]} />
              <meshBasicMaterial color="#3a7a3a" />
            </mesh>
            <mesh position={[x + (i === 0 ? 0.02 : -0.02), 1.748, 0.22]}>
              <boxGeometry args={[0.016, 0.016, 0.01]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}

        {/* NARIZ */}
        <mesh position={[0, 1.69, 0.213]}>
          <boxGeometry args={[0.05, 0.04, 0.02]} />
          <meshStandardMaterial color={skinD} roughness={0.8} />
        </mesh>

        {/* BOCA */}
        <mesh position={[0, 1.634, 0.212]}>
          <boxGeometry args={[0.10, 0.028, 0.01]} />
          <meshBasicMaterial color="#7a2e2a" />
        </mesh>

        {/* BARBA */}
        {/* Bigote */}
        <mesh position={[0, 1.656, 0.212]}>
          <boxGeometry args={[0.18, 0.05, 0.01]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        {/* Barba zona inferior + patillas */}
        <mesh position={[0, 1.578, 0.190]}>
          <boxGeometry args={[0.34, 0.14, 0.04]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>

        {/* AURICULARES GAMING */}
        {/* Banda superior */}
        <mesh position={[0, 2.10, 0]} castShadow>
          <boxGeometry args={[0.54, 0.07, 0.07]} />
          <meshStandardMaterial color={hp} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Acolchado central banda */}
        <mesh position={[0, 2.06, 0]}>
          <boxGeometry args={[0.28, 0.045, 0.11]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>
        {/* Brazo izquierdo */}
        <mesh position={[-0.268, 1.945, 0]} castShadow>
          <boxGeometry args={[0.05, 0.32, 0.05]} />
          <meshStandardMaterial color={hp} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Brazo derecho */}
        <mesh position={[0.268, 1.945, 0]} castShadow>
          <boxGeometry args={[0.05, 0.32, 0.05]} />
          <meshStandardMaterial color={hp} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Copa izquierda */}
        <mesh position={[-0.295, 1.74, 0]} castShadow>
          <boxGeometry args={[0.08, 0.22, 0.22]} />
          <meshStandardMaterial color={hp} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Almohadilla izquierda */}
        <mesh position={[-0.31, 1.74, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.18]} />
          <meshStandardMaterial color={hpPad} roughness={0.95} />
        </mesh>
        {/* Copa derecha */}
        <mesh position={[0.295, 1.74, 0]} castShadow>
          <boxGeometry args={[0.08, 0.22, 0.22]} />
          <meshStandardMaterial color={hp} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Almohadilla derecha */}
        <mesh position={[0.31, 1.74, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.18]} />
          <meshStandardMaterial color={hpPad} roughness={0.95} />
        </mesh>

      </group>
    </group>
  );
}