import { Interactive } from './Interactive';

const BOOK_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#34495e'];

export function Bookshelf({ position, dark, label, onInteract }) {
  const wood  = dark ? '#4a2e10' : '#8b6040';
  const wood2 = dark ? '#3a2010' : '#7a5030';

  const shelves = [-0.2, 0.65, 1.5];
  const booksPerShelf = [6, 7, 6];

  return (
    <Interactive label={label} onInteract={onInteract}>
      <group position={position}>
        {/* Panel lateral izquierdo */}
        <mesh position={[-0.6, 1.1, 0]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.5]} />
          <meshStandardMaterial color={wood} roughness={0.8} />
        </mesh>
        {/* Panel lateral derecho */}
        <mesh position={[0.6, 1.1, 0]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.5]} />
          <meshStandardMaterial color={wood} roughness={0.8} />
        </mesh>
        {/* Panel trasero */}
        <mesh position={[0, 1.1, -0.21]} castShadow>
          <boxGeometry args={[1.2, 2.2, 0.06]} />
          <meshStandardMaterial color={wood2} roughness={0.9} />
        </mesh>
        {/* Panel superior */}
        <mesh position={[0, 2.22, 0]} castShadow>
          <boxGeometry args={[1.28, 0.08, 0.5]} />
          <meshStandardMaterial color={wood} roughness={0.8} />
        </mesh>
        {/* Panel inferior */}
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.28, 0.08, 0.5]} />
          <meshStandardMaterial color={wood} roughness={0.8} />
        </mesh>

        {/* Estantes intermedios */}
        {shelves.map((y, i) => (
          <mesh key={i} position={[0, y + 0.04, 0]} castShadow>
            <boxGeometry args={[1.2, 0.06, 0.5]} />
            <meshStandardMaterial color={wood} roughness={0.8} />
          </mesh>
        ))}

        {/* Libros en cada estante */}
        {shelves.map((y, si) =>
          Array.from({ length: booksPerShelf[si] }, (_, bi) => {
            const w = 0.1 + (bi % 3) * 0.02;
            const h = 0.38 + (bi % 4) * 0.06;
            const startX = -0.5;
            const x = startX + bi * 0.15;
            const color = BOOK_COLORS[(si * 7 + bi) % BOOK_COLORS.length];
            return (
              <group key={`${si}-${bi}`} position={[x, y + 0.04 + h / 2 + 0.03, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[w, h, 0.34]} />
                  <meshStandardMaterial color={color} roughness={0.7} />
                </mesh>
                {/* Lomo del libro */}
                <mesh position={[w / 2 + 0.001, 0, 0]}>
                  <boxGeometry args={[0.005, h, 0.34]} />
                  <meshStandardMaterial color="#000" opacity={0.15} transparent />
                </mesh>
              </group>
            );
          })
        )}

        {/* Objeto decorativo top: pequeño trofeo */}
        <mesh position={[0, 2.38, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.12, 0.22, 8]} />
          <meshStandardMaterial color={dark ? '#aa8800' : '#ffd700'} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.56, 0]} castShadow>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color={dark ? '#aa8800' : '#ffd700'} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Interactive>
  );
}
