import { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { portfolioData } from './data/portfolioData';
import { GameScene } from './components/3d/GameScene';
import { Modal } from './components/ui/Modal';
import { HUD } from './components/ui/HUD';
import './App.css';

function App() {
  const [lang, setLang] = useState('es');
  const [dark, setDark] = useState(false);
  const [outfit, setOutfit] = useState(0);
  const [modal, setModal] = useState({ open: true, type: 'presentation' });
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 800 || /Mobi|Android/i.test(navigator.userAgent)
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800 || /Mobi|Android/i.test(navigator.userAgent));
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const data = portfolioData[lang];

  const openModal = useCallback((type) => {
    setModal({ open: true, type });
  }, []);

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'es' ? 'en' : 'es'));
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => !d);
  }, []);

  const toggleOutfit = useCallback(() => {
    setOutfit((o) => (o + 1) % 8);
  }, []);

  const joystickRef  = useRef({ x: 0, y: 0 });
  const interactRef  = useRef(null); // GameScene escribe aquí su handler de E

  return (
    <div className={'app' + (dark ? ' dark' : '')}>
      <Canvas
        shadows={!isMobile}
        camera={{ position: [6, isMobile ? 7 : 9, isMobile ? 7 : 9], fov: isMobile ? 65 : 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
        style={{ width: '100vw', height: '100vh', touchAction: 'none' }}
      >
        <GameScene
          dark={dark}
          lang={lang}
          outfit={outfit}
          onInteract={openModal}
          onLangToggle={toggleLang}
          onDarkToggle={toggleDark}
          onOutfitToggle={toggleOutfit}
          onClose={closeModal}
          modalOpen={modal.open}
          uiData={data.ui}
          isMobile={isMobile}
          joystickRef={joystickRef}
          interactRef={interactRef}
        />
      </Canvas>

      {modal.open && (
        <Modal
          type={modal.type}
          data={data}
          dark={dark}
          onClose={closeModal}
        />
      )}

      <HUD dark={dark} lang={lang} data={data} onLangToggle={toggleLang} onDarkToggle={toggleDark} isMobile={isMobile} joystickRef={joystickRef} onInteract={() => interactRef.current?.()} />
    </div>
  );
}

export default App;