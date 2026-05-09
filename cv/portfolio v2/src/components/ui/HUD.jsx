// Botón de D-pad: dispara KeyboardEvent para que GameScene lo reciba igual que teclado físico
function DPadBtn({ code, label, className }) {
  const fire = (type) =>
    window.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
  return (
    <button
      className={'dpad-btn ' + className}
      onPointerDown={(e) => { e.preventDefault(); fire('keydown'); }}
      onPointerUp={(e)   => { e.preventDefault(); fire('keyup'); }}
      onPointerLeave={(e) => { e.preventDefault(); fire('keyup'); }}
      onPointerCancel={(e) => { e.preventDefault(); fire('keyup'); }}
    >
      {label}
    </button>
  );
}

export function HUD({ dark, lang, data, onLangToggle, onDarkToggle, isMobile }) {
  const fireE = (type) =>
    window.dispatchEvent(new KeyboardEvent(type, { code: 'KeyE', bubbles: true }));

  return (
    <>
      {/* Título arriba centro */}
      <div className="hud-title">
        {isMobile ? 'Rufito Dev' : 'RufitoDeveloper — Portfolio'}
      </div>

      {/* Botones arriba derecha */}
      <div className="hud-controls">
        <button className="hud-btn" onClick={onDarkToggle}>
          {dark ? '☀️' : '🌙'}
        </button>
        <button className="hud-btn" onClick={onLangToggle}>
          {data.ui.langToggle}
        </button>
      </div>

      {isMobile ? (
        /* ── D-PAD MÓVIL ── */
        <>
          <div className="dpad-wrap" style={{ touchAction: 'none' }}>
            <DPadBtn code="ArrowUp"    label="↑" className="dpad-up" />
            <DPadBtn code="ArrowLeft"  label="←" className="dpad-left" />
            <DPadBtn code="ArrowDown"  label="↓" className="dpad-down" />
            <DPadBtn code="ArrowRight" label="→" className="dpad-right" />
          </div>
          <button
            className="dpad-e"
            onPointerDown={(e) => { e.preventDefault(); fireE('keydown'); }}
            onPointerUp={(e)   => { e.preventDefault(); fireE('keyup'); }}
            onPointerLeave={(e) => { e.preventDefault(); fireE('keyup'); }}
            onPointerCancel={(e) => { e.preventDefault(); fireE('keyup'); }}
          >
            E<br />
            <span className="dpad-e-label">{lang === 'es' ? 'usar' : 'use'}</span>
          </button>
        </>
      ) : (
        /* ── HUD TECLADO ESCRITORIO ── */
        <div className="hud">
          <span className="hud-key">W</span>
          <span className="hud-key">A</span>
          <span className="hud-key">S</span>
          <span className="hud-key">D</span>
          <span className="hud-label" style={{ marginLeft: 4 }}>
            {lang === 'es' ? 'mover' : 'move'}
          </span>
          <span className="hud-divider" />
          <span className="hud-key">E</span>
          <span className="hud-label">
            {lang === 'es' ? 'interactuar' : 'interact'}
          </span>
        </div>
      )}
    </>
  );
}
