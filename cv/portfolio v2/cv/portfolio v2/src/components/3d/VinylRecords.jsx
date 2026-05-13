import { useTexture } from '@react-three/drei';
import vinilo1Url from '../../assets/vinilo1.jpg';
import vinilo2Url from '../../assets/vinilo2.jpg';

function VinylSleeve({ position, rotY, texture, discLabelColor, showDisc = false }) {
  const SIZE = 0.42;
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[SIZE + 0.02, 0.015, SIZE + 0.02]} />
        <meshStandardMaterial color="#888" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[SIZE, 0.001, SIZE]} />
        <meshStandardMaterial map={texture} roughness={0.6} metalness={0.0} />
      </mesh>
      {showDisc && (
        <>
          <mesh position={[SIZE * 0.5 + 0.06, -0.001, 0]} receiveShadow>
            <cylinderGeometry args={[0.188, 0.188, 0.006, 48]} />
            <meshStandardMaterial color="#0d0d16" roughness={0.05} metalness={0.72} />
          </mesh>
          <mesh position={[SIZE * 0.5 + 0.06, 0.005, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.003, 24]} />
            <meshStandardMaterial color={discLabelColor} roughness={0.5} />
          </mesh>
          <mesh position={[SIZE * 0.5 + 0.06, 0.007, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.005, 10]} />
            <meshStandardMaterial color="#111" roughness={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

export function VinylRecords({ position = [0, 0, 0] }) {
  const [tex1, tex2] = useTexture([vinilo1Url, vinilo2Url]);

  [tex1, tex2].forEach(t => {
    t.center.set(0.5, 0.5);
    t.rotation = -Math.PI / 2;
    t.needsUpdate = true;
  });

  return (
    <group position={position}>
      <VinylSleeve position={[0, 0.007, 0]} rotY={0.25} texture={tex1} discLabelColor="#8b1a1a" showDisc />
      <VinylSleeve position={[0, 0.003, 0.58]} rotY={-0.18} texture={tex2} discLabelColor="#c0302a" />
    </group>
  );
}
