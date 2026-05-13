import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Tocadiscos procedural ──
 *  - Base de madera oscura con chasis metálico
 *  - Plato giratorio (spinning cuando musicOn=true)
 *  - Disco de vinilo con surcos + etiqueta central de color
 *  - Brazo fonocaptor que se mueve sobre el disco
 *  Posición sugerida: [-3.8, 0, 3.6] (esquina delantera izquierda)
 */
export function Turntable({ position = [0, 0, 0], rotation = [0, 0, 0], dark, musicOn }) {
  const recordRef = useRef();
  const armRef    = useRef();

  // El disco gira ~33 RPM cuando musicOn; frena suavemente cuando se apaga
  const spinRef = useRef(0); // velocidad angular actual

  useFrame((_, delta) => {
    if (!recordRef.current || !armRef.current) return;

    // Acelerar / decelerar el disco
    const targetSpeed = musicOn ? 3.46 : 0; // rad/s ≈ 33RPM = 3.46 rad/s
    spinRef.current += (targetSpeed - spinRef.current) * Math.min(1, delta * 1.2);
    recordRef.current.rotation.y -= spinRef.current * delta;

    // Brazo se mueve suavemente hacia la posición "reproduciendo" o "levantado"
    // Desde esquina trasera-izquierda: -PI/4 apunta al disco, +0.55 aparcado
    const targetArmY = musicOn ? -Math.PI / 4 : 0.55;
    armRef.current.rotation.y += (targetArmY - armRef.current.rotation.y) * Math.min(1, delta * 1.5);
  });

  // Colores según tema
  const colBase    = dark ? '#5c3a1e' : '#8b5a2b'; // madera cálida tipo nogal
  const colChasis  = dark ? '#3a2510' : '#6b4422'; // chasis madera oscura
  const colPlatter = dark ? '#2a2a3a' : '#383848'; // plato metálico
  const colVinyl   = '#111118'; // negro vinilo real
  const colGroove  = '#888890'; // surcos gris normal
  const colLabel   = musicOn ? '#c94040' : '#444';
  const colArm     = dark ? '#aac0e8' : '#b09060';
  const colButton  = musicOn ? '#40c060' : '#603030';

  return (
    <group position={position} rotation={rotation}>

      {/* ── Cuerpo / base de madera ── */}
      <mesh position={[0, 0.065, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.13, 0.72]} />
        <meshStandardMaterial color={colBase} roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Chasis superior (panel metálico ligeramente elevado) */}
      <mesh position={[0, 0.135, 0]}>
        <boxGeometry args={[0.84, 0.012, 0.68]} />
        <meshStandardMaterial color={colChasis} roughness={0.25} metalness={0.4} />
      </mesh>

      {/* ── Plato del tocadiscos ── */}
      <mesh position={[-0.08, 0.152, 0.02]}>
        <cylinderGeometry args={[0.295, 0.295, 0.022, 40]} />
        <meshStandardMaterial color={colPlatter} roughness={0.3} metalness={0.55} />
      </mesh>

      {/* ── Disco de vinilo (gira) ── */}
      <group ref={recordRef} position={[-0.08, 0.166, 0.02]}>
        {/* Cuerpo principal del vinilo */}
        <mesh>
          <cylinderGeometry args={[0.272, 0.272, 0.01, 48]} />
          <meshStandardMaterial color={colVinyl} roughness={0.08} metalness={0.55} />
        </mesh>

        {/* Surcos del vinilo — anillos concéntricos tumbados sobre el disco */}
        {[0.24, 0.21, 0.18, 0.15, 0.12].map((r, i) => (
          <mesh key={i} position={[0, 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.003, 6, 48]} />
            <meshStandardMaterial color={colGroove} roughness={0.12} metalness={0.3} />
          </mesh>
        ))}

        {/* Marca radial blanca — hace visible la rotación */}
        <mesh position={[0.13, 0.007, 0]}>
          <boxGeometry args={[0.22, 0.002, 0.007]} />
          <meshStandardMaterial color="#dde0f0" roughness={0.1} metalness={0.7} />
        </mesh>

        {/* Etiqueta central (color según estado) */}
        <mesh position={[0, 0.006, 0]}>
          <cylinderGeometry args={[0.068, 0.068, 0.003, 24]} />
          <meshStandardMaterial color={colLabel} roughness={0.55} metalness={0.1} />
        </mesh>
        {/* Agujero central del disco */}
        <mesh position={[0, 0.008, 0]}>
          <cylinderGeometry args={[0.009, 0.009, 0.006, 10]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
      </group>

      {/* Eje / spindle */}
      <mesh position={[-0.08, 0.196, 0.02]}>
        <cylinderGeometry args={[0.007, 0.007, 0.06, 8]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.9} roughness={0.08} />
      </mesh>

      {/* ── Brazo fonocaptor ── */}
      {/* Pivote en esquina TRASERA-IZQUIERDA — diagonal hacia el disco */}
      <mesh position={[-0.38, 0.162, -0.28]}>
        <cylinderGeometry args={[0.022, 0.022, 0.032, 12]} />
        <meshStandardMaterial color={colArm} metalness={0.75} roughness={0.18} />
      </mesh>
      <group ref={armRef} position={[-0.38, 0.172, -0.28]}>
        {/* Tubo principal — apunta en +X en reposo, -PI/4 Y lleva al disco */}
        <mesh position={[0.21, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.007, 0.005, 0.42, 8]} />
          <meshStandardMaterial color={colArm} metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Cabezal fonocaptor */}
        <mesh position={[0.38, -0.010, 0]}>
          <boxGeometry args={[0.028, 0.014, 0.038]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Aguja */}
        <mesh position={[0.38, -0.025, 0]} rotation={[0, 0, -0.20]}>
          <cylinderGeometry args={[0.0015, 0.0008, 0.030, 6]} />
          <meshStandardMaterial color="#cccccc" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Contrapeso trasero */}
        <mesh position={[-0.08, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.03, 10]} />
          <meshStandardMaterial color={colArm} metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* ── Panel de botones (esquina frontal derecha) ── */}
      {/* Botón on/off — se ilumina en verde cuando musicOn */}
      <mesh position={[0.32, 0.145, -0.26]}>
        <cylinderGeometry args={[0.018, 0.018, 0.018, 12]} />
        <meshStandardMaterial
          color={colButton}
          emissive={colButton}
          emissiveIntensity={musicOn ? 0.9 : 0.15}
          roughness={0.3}
        />
      </mesh>
      {/* Botón velocidad (decorativo, gris) */}
      <mesh position={[0.28, 0.145, -0.26]}>
        <cylinderGeometry args={[0.012, 0.012, 0.015, 10]} />
        <meshStandardMaterial color="#555" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* ── Caja hitbox invisible para interacción (click en el objeto) ── */}
      <mesh position={[0, 0.2, 0]} visible={false}>
        <boxGeometry args={[0.88, 0.28, 0.72]} />
      </mesh>
    </group>
  );
}
