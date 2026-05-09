export function HUD({ dark, lang, data, onLangToggle, onDarkToggle }) {
  return (
    <>
      {/* Título arriba centro */}
      <div className="hud-title">
        RufitoDeveloper — Portfolio
      </div>

      {/* Botones arriba derecha */}
      <div className="hud-controls">
        <button className="hud-btn" onClick={onDarkToggle}>
          {dark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
        <button className="hud-btn" onClick={onLangToggle}>
          {data.ui.langToggle}
        </button>
      </div>

      {/* Controles abajo */}
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
    </>
  );
}
