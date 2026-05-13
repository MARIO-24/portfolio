import { useRef, useCallback, useEffect } from 'react';

/* ── Joystick virtual ── */
function Joystick({ joystickRef }) {
  const baseRef  = useRef();
  const knobRef  = useRef();
  const touchId  = useRef(null);
  const RADIUS   = 44; // max desplazamiento del knob en px

  const reset = useCallback(() => {
    touchId.current = null;
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(-50%, -50%)';
    }
    if (joystickRef) joystickRef.current = { x: 0, y: 0 };
  }, [joystickRef]);

  const move = useCallback((clientX, clientY) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > RADIUS) { dx = dx / dist * RADIUS; dy = dy / dist * RADIUS; }
    if (knobRef.current) {
      knobRef.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    }
    // normalizar a [-1, 1]
    if (joystickRef) joystickRef.current = { x: dx / RADIUS, y: dy / RADIUS };
  }, [joystickRef]);

  useEffect(() => {
    const base = baseRef.current;
    if (!base) return;

    const onStart = (e) => {
      if (touchId.current !== null) return;
      const t = e.changedTouches[0];
      touchId.current = t.identifier;
      move(t.clientX, t.clientY);
    };
    const onMove = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === touchId.current) { move(t.clientX, t.clientY); break; }
      }
    };
    const onEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === touchId.current) { reset(); break; }
      }
    };

    base.addEventListener('touchstart',  onStart, { passive: true });
    base.addEventListener('touchmove',   onMove,  { passive: true });
    base.addEventListener('touchend',    onEnd,   { passive: true });
    base.addEventListener('touchcancel', onEnd,   { passive: true });
    return () => {
      base.removeEventListener('touchstart',  onStart);
      base.removeEventListener('touchmove',   onMove);
      base.removeEventListener('touchend',    onEnd);
      base.removeEventListener('touchcancel', onEnd);
    };
  }, [move, reset]);

  return (
    <div className="joystick-wrap">
      <div ref={baseRef} className="joystick-base">
        <div ref={knobRef} className="joystick-knob" />
      </div>
    </div>
  );
}

export function HUD({ dark, lang, data, onLangToggle, onDarkToggle, isMobile, joystickRef, musicOn, onMusicToggle, muted }) {
  const musicActive = musicOn && !muted;
  return (
    <>
      {/* Título arriba centro */}
      <div className="hud-title">
        RufitoDeveloper — Portfolio
      </div>

      {/* Botones arriba derecha — solo emoji en móvil */}
      <div className="hud-controls">
        <button className="hud-btn" onClick={onDarkToggle} title={dark ? data.ui.darkOn : data.ui.darkOff}>
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
              <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
          {!isMobile && <span style={{marginLeft:6}}>{dark ? data.ui.darkOn : data.ui.darkOff}</span>}
        </button>
        <button className="hud-btn" onClick={onLangToggle} title={data.ui.langToggle}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button
          className={`hud-btn${!musicActive ? ' hud-btn--muted' : ''}`}
          onClick={onMusicToggle}
          title={musicActive ? (lang === 'es' ? 'Pausar música' : 'Pause music') : (lang === 'es' ? 'Reproducir música' : 'Play music')}
        >
          {musicActive ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
              <line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          )}
          {!isMobile && <span style={{marginLeft:6}}>{musicActive ? (lang === 'es' ? 'Música' : 'Music') : (lang === 'es' ? 'Sin música' : 'No music')}</span>}
        </button>
        {isMobile && (
          <button
            className="hud-btn"
            title={data.ui.exitBtn}
            onClick={() => {
              window.location.href = new URL('../', window.location.href).href;
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span style={{marginLeft:4}}>{data.ui.exitBtn}</span>
          </button>
        )}
      </div>

      {/* Desktop: hint WASD */}
      {!isMobile && (
        <div className="hud">
          <span className="hud-key">W</span>
          <span className="hud-key">A</span>
          <span className="hud-key">S</span>
          <span className="hud-key">D</span>
          <span className="hud-label" style={{ marginLeft: 4 }}>
            {lang === 'es' ? 'mover personaje' : 'move character'}
          </span>
          <span className="hud-divider" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{opacity:0.7}}>
            <rect x="6" y="3" width="12" height="18" rx="6"/>
            <line x1="12" y1="7" x2="12" y2="11"/>
          </svg>
          <span className="hud-label">
            {lang === 'es' ? 'click en objetos para interactuar' : 'click objects to interact'}
          </span>
        </div>
      )}

      {/* Móvil: joystick izquierdo + botón E derecho */}
      {isMobile && <Joystick joystickRef={joystickRef} />}
      {isMobile && (
        <button
          className="joystick-e"
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', bubbles: true }));
            setTimeout(() => {
              window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE', bubbles: true }));
            }, 80);
          }}
        >
          E
        </button>
      )}
    </>
  );
}
