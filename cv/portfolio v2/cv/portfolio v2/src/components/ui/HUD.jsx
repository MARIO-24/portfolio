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
      {/* Botón E (interactuar / cerrar modal) */}
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
    </div>
  );
}

export function HUD({ dark, lang, data, onLangToggle, onDarkToggle, isMobile, joystickRef }) {
  return (
    <>
      {/* Título arriba centro */}
      <div className="hud-title">
        RufitoDeveloper — Portfolio
      </div>

      {/* Botones arriba derecha — solo emoji en móvil */}
      <div className="hud-controls">
        <button className="hud-btn" onClick={onDarkToggle} title={dark ? 'Modo Claro' : 'Modo Oscuro'}>
          {isMobile ? (dark ? '☀️' : '🌙') : (dark ? '☀️ Modo Claro' : '🌙 Modo Oscuro')}
        </button>
        <button className="hud-btn" onClick={onLangToggle} title={data.ui.langToggle}>
          {isMobile ? (lang === 'es' ? '🇬🇧' : '🇪🇸') : data.ui.langToggle}
        </button>
        {isMobile && (
          <button
            className="hud-btn"
            title="Salir del portfolio 3D"
            onClick={() => {
              window.location.href = new URL('../', window.location.href).href;
            }}
          >
            🚪
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
          <span style={{ fontSize: '0.85rem' }}>🖱️</span>
          <span className="hud-label">
            {lang === 'es' ? 'click en objetos para interactuar' : 'click objects to interact'}
          </span>
        </div>
      )}

      {/* Móvil: joystick */}
      {isMobile && <Joystick joystickRef={joystickRef} />}
    </>
  );
}
