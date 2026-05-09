import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Room } from './Room';
import { Character } from './Character';
import { DesktopPC } from './DesktopPC';
import { Laptop } from './Laptop';
import { Bookshelf } from './Bookshelf';
import { Bed } from './Bed';
import { Wardrobe } from './Wardrobe';
import { MobilePhone } from './MobilePhone';
import { LightSwitch } from './LightSwitch';
import { Interactive } from './Interactive';

const CHAR_R = 0.45;

// Cajas de colision AABB [xMin, xMax, zMin, zMax] — habitacion 11x9
const OBSTACLES = [
  [-6,    6,    -5.0, -4.45], // pared trasera
  [-6,   -5.45, -5.0,  5.0 ], // pared izquierda
  [-1.8,  0.8,  -4.35, -3.0], // mesa PC sobremesa (centrada)
  [-0.9,  0.5,  -2.85, -2.15], // silla
  [-1.6, -0.3,   2.0,   3.6 ], // portatil en el suelo
  [ 3.9,  5.9,  -4.3,  -3.7], // estanteria
  [-5.5, -4.35, -2.2,  -0.2], // armario
  [ 3.4,  5.4,  -0.8,   1.4], // cama (rotada 90°, empujada al borde)
  [ 4.7,  5.3,  -1.4,  -0.8], // mesilla 1 (cabecero)
  [ 4.7,  5.3,   1.4,   2.0], // mesilla 2 (pie)
  [ 0.85, 1.45, -3.2,  -2.7 ], // papelera
  [-5.1,  -4.3, -4.1,  -3.3 ], // lampara retro
];

function checkCollision(x, z) {
  return OBSTACLES.some(
    ([xMin, xMax, zMin, zMax]) =>
      x + CHAR_R > xMin && x - CHAR_R < xMax &&
      z + CHAR_R > zMin && z - CHAR_R < zMax
  );
}

// Iconos SVG pequeños para los hints de teclado "E"
const S16 = (paths) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', flexShrink: 0 }}>
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
);
const ICO = {
  monitor: S16(['M2 3h20v14H2z','M8 21h8','M12 17v4']),
  user:    S16(['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']),
  wrench:  S16(['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z']),
  hanger:  S16(['M20.38 19H3.62a1 1 0 0 1-.75-1.67L12 8','M12 8V5','M12 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z']),
  info:    S16(['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z','M12 16v-4','M12 8h.01']),
  send:    S16(['M22 2L11 13','M22 2L15 22l-4-9-9-4 20-7z']),
  sun:     S16(['M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z','M12 1v2','M12 21v2','M4.22 4.22l1.42 1.42','M18.36 18.36l1.42 1.42','M1 12h2','M21 12h2','M4.22 19.78l1.42-1.42','M18.36 5.64l1.42-1.42']),
  globe:   S16(['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z','M2 12h20','M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z']),
};

// Indicador flotante "Pulsa E" sobre el personaje cuando está cerca de un objeto
function NearHint({ charPos, zones, modalOpen }) {
  const groupRef = useRef();
  const [zone, setZone] = useState(null);
  const prevLabel = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = charPos.current.x;
      groupRef.current.position.z = charPos.current.z;
    }
    let nearest = null;
    let bestDist = Infinity;
    if (!modalOpen) {
      for (const z of zones.current) {
        const dx = charPos.current.x - z.pos[0];
        const dz = charPos.current.z - z.pos[2];
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < z.range && d < bestDist) { bestDist = d; nearest = z; }
      }
    }
    const next = nearest ? nearest.label : null;
    if (next !== prevLabel.current) {
      prevLabel.current = next;
      setZone(nearest || null);
    }
  });

  return (
    <group ref={groupRef} position={[0, 2.2, 0]}>
      {zone && (
        <Html center distanceFactor={8}>
          <div className="hint-e"><span className="hint-e-key">E</span>{zone.icon} {zone.label}</div>
        </Html>
      )}
    </group>
  );
}

export function GameScene({ dark, lang, outfit, onInteract, onLangToggle, onDarkToggle, onOutfitToggle, onClose, modalOpen, uiData, isMobile, joystickRef }) {
  const keys = useRef({});
  const charPos = useRef(new THREE.Vector3(0, 0, 0));
  const charRotY = useRef(0);
  const charRef = useRef();
  const walkT = useRef(0);
  const zonesRef = useRef([]);
  const eHandlerRef = useRef(null);
  const modalOpenRef = useRef(false);
  const onCloseRef = useRef(null);
  // Cached vectors — evitan allocar new THREE.Vector3 cada frame (causa GC parones)
  const _camTarget = useRef(new THREE.Vector3());
  const _lookAt    = useRef(new THREE.Vector3());
  modalOpenRef.current = modalOpen;
  onCloseRef.current = onClose;

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
      if (e.code === 'KeyE') {
        if (modalOpenRef.current) {
          onCloseRef.current?.();
        } else if (eHandlerRef.current) {
          eHandlerRef.current();
        }
      }
    };
    const up = (e) => { keys.current[e.code] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Zonas de interaccion — se actualizan en cada render para tener acciones frescas
  zonesRef.current = [
    { pos: [-0.5, 0, -3.5], range: 2.2, label: uiData.objects.pc,       icon: ICO.monitor, action: () => onInteract('projects') },
    { pos: [-1.0, 0,  2.8], range: 1.8, label: uiData.objects.laptop,   icon: ICO.user,    action: () => onInteract('personal') },
    { pos: [ 4.5, 0, -4.0], range: 2.0, label: uiData.objects.shelf,    icon: ICO.wrench,  action: () => onInteract('tools') },
    { pos: [-5.0, 0, -1.2], range: 2.0, label: uiData.objects.wardrobe, icon: ICO.hanger,  action: onOutfitToggle },
    { pos: [ 4.5, 0,  0.3], range: 1.7, label: uiData.objects.bed,      icon: ICO.info,    action: () => onInteract('presentation') },
    { pos: [ 5.0, 0,  1.7], range: 1.4, label: uiData.objects.mobile,   icon: ICO.send,    action: () => onInteract('social') },
    { pos: [-5.35, 1.3, 0.5], range: 1.8, label: uiData.objects.light,  icon: ICO.sun,     action: onDarkToggle },
    { pos: [-5.35, 1.3, 2.0], range: 1.8, label: uiData.objects.poster, icon: ICO.globe,   action: onLangToggle },
  ];

  // Manejador de tecla E — siempre fresco
  eHandlerRef.current = () => {
    let best = null, bestDist = Infinity;
    for (const z of zonesRef.current) {
      const dx = charPos.current.x - z.pos[0];
      const dz = charPos.current.z - z.pos[2];
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < z.range && d < bestDist) { bestDist = d; best = z; }
    }
    if (best) best.action();
  };

  useFrame(({ camera }, delta) => {
    const k = keys.current;
    let dx = 0, dz = 0;
    if (k['KeyW'] || k['ArrowUp'])    dz -= 1;
    if (k['KeyS'] || k['ArrowDown'])  dz += 1;
    if (k['KeyA'] || k['ArrowLeft'])  dx -= 1;
    if (k['KeyD'] || k['ArrowRight']) dx += 1;

    // Joystick móvil — zona muerta del 12%
    if (joystickRef) {
      const { x: jx, y: jy } = joystickRef.current;
      const dead = 0.12;
      if (Math.abs(jx) > dead) dx += jx;
      if (Math.abs(jy) > dead) dz += jy;
    }

    const moving = dx !== 0 || dz !== 0;
    if (moving) {
      const len = Math.sqrt(dx * dx + dz * dz);
      dx /= len; dz /= len;
      const speed = 3.5;
      const nextX = Math.max(-5.0, Math.min(5.0, charPos.current.x + dx * speed * delta));
      if (!checkCollision(nextX, charPos.current.z)) charPos.current.x = nextX;
      const nextZ = Math.max(-4.0, Math.min(3.8, charPos.current.z + dz * speed * delta));
      if (!checkCollision(charPos.current.x, nextZ)) charPos.current.z = nextZ;
      charRotY.current = Math.atan2(dx, dz);
      walkT.current += delta * 8;
    }

    if (charRef.current) {
      charRef.current.position.lerp(charPos.current, 0.18);
      charRef.current.rotation.y += (charRotY.current - charRef.current.rotation.y) * 0.2;
    }

    _camTarget.current.set(
      charPos.current.x + 5,
      charPos.current.y + 9,
      charPos.current.z + 8
    );
    camera.position.lerp(_camTarget.current, 0.04);
    _lookAt.current.set(charPos.current.x, charPos.current.y + 1, charPos.current.z);
    camera.lookAt(_lookAt.current);
  });

  const lightColor      = dark ? '#aabbff' : '#fffbe6';
  const ambientIntensity = dark ? 0.52 : 0.35;
  const dirIntensity    = dark ? 0.75 : 0.7;
  const pointIntensity  = dark ? 1.0  : 1.2;

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      {/* Una sola luz con sombras — shadow map 1024 (mitad de VRAM) */}
      <directionalLight
        position={[4, 10, 6]}
        intensity={dirIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      {/* Luz de ambiente cálida — sin sombras */}
      <pointLight position={[0, 3.6, 0]} intensity={pointIntensity} color={lightColor} />
      {/* Luz ventana — solo en modo claro */}
      {!dark && <pointLight position={[2.0, 2.4, -3.8]} intensity={0.6} color="#d4eeff" />}
      {/* Modo oscuro: luz cálida general */}
      {dark && <pointLight position={[0, 2.0, 0]} intensity={1.8} color="#ffcc77" distance={12} decay={1.5} />}

      <Room dark={dark} />
      <Character charRef={charRef} dark={dark} lang={lang} outfit={outfit} walkT={walkT} />
      <NearHint charPos={charPos} zones={zonesRef} modalOpen={modalOpen} />

      {/* Ordenador sobremesa — centrado en la pared trasera */}
      <DesktopPC
        position={[-0.5, 0, -3.5]}
        dark={dark}
        label={uiData.objects.pc}
        onInteract={() => onInteract('projects')}
      />

      {/* Portatil — en el suelo, lateral izquierdo de la alfombra, mirando hacia la cama */}
      <Laptop
        position={[-1.0, 0, 2.8]}
        rotation={[0, Math.PI / 2, 0]}
        dark={dark}
        label={uiData.objects.laptop}
        onInteract={() => onInteract('personal')}
      />

      {/* Estanteria — esquina trasera derecha */}
      <Bookshelf
        position={[4.5, 0, -4.0]}
        dark={dark}
        label={uiData.objects.shelf}
        onInteract={() => onInteract('tools')}
      />

      {/* Armario — pared izquierda, puertas hacia la habitacion */}
      <group position={[-5.0, 0, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <Wardrobe
          position={[0, 0, 0]}
          dark={dark}
          outfit={outfit}
          label={uiData.objects.wardrobe}
          onInteract={onOutfitToggle}
        />
      </group>

      {/* Cama — rotada 90°, cabecero contra el borde derecho */}
      <Bed
        position={[4.5, 0, 0.3]}
        rotation={[0, -Math.PI / 2, 0]}
        dark={dark}
        label={uiData.objects.bed}
        onInteract={() => onInteract('presentation')}
      />

      {/* Movil — tumbado en la segunda mesita */}
      <MobilePhone
        position={[5.0, 0.71, 1.7]}
        rotation={[-Math.PI / 2, Math.PI, Math.PI / 2]}
        dark={dark}
        label={uiData.objects.mobile}
        onInteract={() => onInteract('social')}
      />

      {/* Interruptor — pared izquierda */}
      <group position={[-5.35, 1.3, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <LightSwitch
          position={[0, 0, 0]}
          dark={dark}
          on={!dark}
          label={uiData.objects.light}
          onInteract={onDarkToggle}
        />
      </group>

      {/* Poster mapamundi — geometría real + hover animation + click */}
      <group position={[-5.44, 2.20, 2.50]}>
        <Interactive
          label={uiData.objects.poster}
          onInteract={onLangToggle}
          hoverScale={1.04}
          labelOffset={[1.3, 0.6, 0]}
        >
          {/* Marco de madera */}
          <mesh>
            <boxGeometry args={[0.05, 0.96, 1.50]} />
            <meshStandardMaterial color={dark ? '#2a1e10' : '#5a3a18'} roughness={0.8} />
          </mesh>
          {/* Fondo — océano azul */}
          <mesh position={[0.03, 0, 0]}>
            <boxGeometry args={[0.04, 0.86, 1.40]} />
            <meshStandardMaterial color={'#2255aa'} roughness={0.9} emissive={'#1a3a7a'} emissiveIntensity={0.6} />
          </mesh>
          {/* Continente Europa/África */}
          <mesh position={[0.055, 0.02, 0.15]}>
            <boxGeometry args={[0.04, 0.38, 0.22]} />
            <meshStandardMaterial color={'#3a9a28'} roughness={0.9} emissive={'#1a5a10'} emissiveIntensity={0.5} />
          </mesh>
          {/* Continente América */}
          <mesh position={[0.055, -0.04, -0.30]}>
            <boxGeometry args={[0.04, 0.42, 0.18]} />
            <meshStandardMaterial color={'#3a9a28'} roughness={0.9} emissive={'#1a5a10'} emissiveIntensity={0.5} />
          </mesh>
          {/* Continente Asia */}
          <mesh position={[0.055, 0.10, 0.40]}>
            <boxGeometry args={[0.04, 0.24, 0.34]} />
            <meshStandardMaterial color={'#3a9a28'} roughness={0.9} emissive={'#1a5a10'} emissiveIntensity={0.5} />
          </mesh>
          {/* Continente Oceanía */}
          <mesh position={[0.055, -0.22, 0.55]}>
            <boxGeometry args={[0.04, 0.12, 0.14]} />
            <meshStandardMaterial color={'#3a9a28'} roughness={0.9} emissive={'#1a5a10'} emissiveIntensity={0.5} />
          </mesh>
        </Interactive>
      </group>
    </>
  );
}
