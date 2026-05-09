import { useState, useCallback } from 'react';
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

  return (
    <div className={'app' + (dark ? ' dark' : '')}>
      <Canvas
        shadows
        camera={{ position: [6, 9, 9], fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
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

      <HUD dark={dark} lang={lang} data={data} onLangToggle={toggleLang} onDarkToggle={toggleDark} />
    </div>
  );
}

export default App;