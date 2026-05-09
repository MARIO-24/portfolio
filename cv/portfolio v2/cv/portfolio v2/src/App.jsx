import { useState, useCallback, useEffect, useRef, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { portfolioData } from './data/portfolioData';
import { GameScene } from './components/3d/GameScene';
import { Modal } from './components/ui/Modal';
import { HUD } from './components/ui/HUD';
import './App.css';

// ── Detección WebGL ──
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}

// ── Error Boundary ──
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color:'#fff', background:'#0f0f1a', width:'100vw', height:'100vh',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:'1rem', padding:'2rem', textAlign:'center', fontFamily:'sans-serif' }}>
          <div style={{ fontSize:'3rem' }}>⚠️</div>
          <div style={{ fontSize:'1.2rem', fontWeight:'700' }}>Error al cargar el portfolio 3D</div>
          <div style={{ fontSize:'0.9rem', color:'#aaa', maxWidth:'320px' }}>
            {String(this.state.error?.message || this.state.error)}
          </div>
          <button onClick={() => window.location.reload()}
            style={{ marginTop:'1rem', padding:'10px 24px', borderRadius:'50px',
              background:'#6c63ff', color:'#fff', border:'none', fontWeight:'700', cursor:'pointer' }}>
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [lang, setLang] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get('lang') === 'en') return 'en';
      if (p.get('lang') === 'es') return 'es';
      return localStorage.getItem('lang') || 'es';
    } catch { return 'es'; }
  });
  const [dark, setDark] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get('theme') === 'dark') return true;
      if (p.get('theme') === 'light') return false;
      return localStorage.getItem('theme') === 'dark';
    } catch { return false; }
  });
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
    setLang((l) => {
      const next = l === 'es' ? 'en' : 'es';
      try { localStorage.setItem('lang', next); } catch (_) {}
      return next;
    });
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (_) {}
      return next;
    });
  }, []);

  const toggleOutfit = useCallback(() => {
    setOutfit((o) => (o + 1) % 8);
  }, []);

  const joystickRef  = useRef({ x: 0, y: 0 });

  if (!hasWebGL()) {
    return (
      <div style={{ color:'#fff', background:'#0f0f1a', width:'100vw', height:'100vh',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:'1rem', padding:'2rem', textAlign:'center', fontFamily:'sans-serif' }}>
        <div style={{ fontSize:'3rem' }}>🖥️</div>
        <div style={{ fontSize:'1.2rem', fontWeight:'700' }}>WebGL no disponible</div>
        <div style={{ fontSize:'0.9rem', color:'#aaa', maxWidth:'320px' }}>
          Tu navegador no soporta WebGL. Prueba con Chrome o Firefox.
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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

      <HUD dark={dark} lang={lang} data={data} onLangToggle={toggleLang} onDarkToggle={toggleDark} isMobile={isMobile} joystickRef={joystickRef} />
    </div>
    </ErrorBoundary>
  );
}

export default App;