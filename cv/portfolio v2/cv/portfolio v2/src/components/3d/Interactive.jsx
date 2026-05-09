import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/** Wrapper interactivo reutilizable para objetos 3D */
export function Interactive({ children, label, onInteract, hoverScale = 1.04 }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const target = hovered ? hoverScale : 1;
    const s = groupRef.current.scale;
    s.x += (target - s.x) * 0.12;
    s.y += (target - s.y) * 0.12;
    s.z += (target - s.z) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => { e.stopPropagation(); onInteract(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {children}
      {hovered && (
        <Html center position={[0, 2.6, 0]} style={{ pointerEvents: 'none' }}>
          <div className="hint-label">{label}</div>
        </Html>
      )}
    </group>
  );
}
