import { useEffect } from 'react';

/* ── Iconos SVG profesionales (estilo Lucide/Heroicons, stroke) ── */
const S = ({ d, w = 20, h = 20, vb = '0 0 24 24', fill = 'none', sw = '2' }) => (
  <svg viewBox={vb} width={w} height={h} fill={fill} stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const UI_ICONS = {
  /* modal titles */
  projects: <S d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />,
  personal: <S d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} />,
  tools:    <S d={['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z']} />,
  social:   <S d={['M22 2L11 13', 'M22 2L15 22l-4-9-9-4 20-7z']} />,
  /* personal card labels */
  user:     <S d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} />,
  briefcase:<S d={['M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2']} />,
  calendar: <S d={['M8 2v4', 'M16 2v4', 'M3 10h18', 'M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z']} />,
  mail:     <S d={['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6']} />,
  pin:      <S d={['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z']} fill="currentColor" />,
  /* tools section headers */
  laptop:   <S d={['M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9', 'M2 16h20', 'M12 20h.01']} />,
  settings: <S d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.22-1.78a6 6 0 0 0 .07-.79v-.86a6 6 0 0 0-.07-.79l1.7-1.33a.4.4 0 0 0 .1-.52l-1.62-2.8a.4.4 0 0 0-.49-.18l-2.01.81a6.1 6.1 0 0 0-1.37-.79l-.3-2.14A.39.39 0 0 0 14 3h-3.24a.39.39 0 0 0-.39.33l-.31 2.14c-.49.2-.94.47-1.37.79l-2-.81a.4.4 0 0 0-.49.18L4.58 8.23a.39.39 0 0 0 .1.52l1.7 1.33a6.1 6.1 0 0 0-.08.79v.86a6 6 0 0 0 .07.79L4.67 14a.4.4 0 0 0-.1.52l1.62 2.8c.1.18.3.24.49.18l2-.81c.43.32.88.59 1.37.79l.31 2.14c.05.19.22.33.4.33H14c.18 0 .35-.14.39-.33l.31-2.14c.49-.2.94-.47 1.37-.79l2.01.81c.18.07.38 0 .49-.18l1.61-2.8a.4.4 0 0 0-.09-.52l-1.67-1.32z" />,
  code:     <S d={['M16 18l6-6-6-6', 'M8 6L2 12l6 6']} />,
};

const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  ),
  infojobs: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
};

/* ── Helper para label con icono SVG ── */
function Label({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7 }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}


export function Modal({ type, data, dark, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderContent = () => {
    switch (type) {
      case 'presentation':
        return <PresentationContent data={data} onClose={onClose} />;
      case 'projects':
        return <ProjectsContent data={data} onClose={onClose} />;
      case 'personal':
        return <PersonalContent data={data} onClose={onClose} />;
      case 'tools':
        return <ToolsContent data={data} onClose={onClose} />;
      case 'social':
        return <SocialContent data={data} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label={data.ui.close}>✕</button>
        {renderContent()}
      </div>
    </div>
  );
}

function PresentationContent({ data, onClose }) {
  const d = data.presentation;
  return (
    <>
      <img src={d.avatar} alt="Mario" className="pres-avatar" onError={e => { e.target.style.display='none'; }} />
      <div className="modal-title">{d.title}</div>
      <p className="pres-text">{d.text}</p>
      <button className="cv-btn" style={{ marginTop: 20 }} onClick={onClose}>
        {data.ui.explore} →
      </button>
    </>
  );
}

function ProjectsContent({ data }) {
  return (
    <>
      <div className="modal-title" style={{display:'flex',alignItems:'center',gap:'10px'}}>
        {UI_ICONS.projects}{data.ui.sections.projects}
      </div>
      <div className="projects-grid">
        {data.projects.map((p, i) => (
          <div key={i} className="project-card">
            <img
              src={p.img}
              alt={p.nombre}
              className="project-img"
              onError={e => { e.target.src = 'https://placehold.co/110x75/1a1a2e/fff?text=Project'; }}
            />
            <div className="project-info">
              <div className="project-name">{p.nombre}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-link">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                {data.ui.viewOnGitHub}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PersonalContent({ data }) {
  const p = data.personal;
  const ui = data.ui;
  return (
    <>
      <div className="modal-title" style={{display:'flex',alignItems:'center',gap:'10px'}}>
        {UI_ICONS.personal}{ui.sections.personal}
      </div>
      <div className="personal-grid">
        <div className="personal-card">
          <div className="personal-card-label"><S d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} w={14} h={14}/>{ui.personalLabels.nombre}</div>
          <div className="personal-card-value">{p.nombre}</div>
        </div>
        <div className="personal-card">
          <div className="personal-card-label"><S d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} w={14} h={14}/>{ui.personalLabels.apellidos}</div>
          <div className="personal-card-value">{p.apellidos}</div>
        </div>
        <div className="personal-card personal-card--full">
          <div className="personal-card-label"><S d={['M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z','M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2']} w={14} h={14}/>{ui.personalLabels.rol}</div>
          <div className="personal-card-value">{p.rol}</div>
        </div>
        <div className="personal-card">
          <div className="personal-card-label"><S d={['M8 2v4','M16 2v4','M3 10h18','M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z']} w={14} h={14}/>{ui.personalLabels.nacimiento}</div>
          <div className="personal-card-value">{p.nacimiento}</div>
        </div>
        <div className="personal-card personal-card--full">
          <div className="personal-card-label"><S d={['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z','M22 6l-10 7L2 6']} w={14} h={14}/>{ui.personalLabels.email}</div>
          <div className="personal-card-value">
            <a href={`mailto:${p.email}`} className="personal-email-link">{p.email}</a>
          </div>
        </div>
        <div className="personal-card">
          <div className="personal-card-label"><S d={['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z','M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z']} w={14} h={14} fill="currentColor"/>{ui.personalLabels.ubicacion}</div>
          <div className="personal-card-value">{p.ubicacion}</div>
        </div>
      </div>
      <a href={p.cv} download className="cv-btn">
        {ui.download}
      </a>
    </>
  );
}

function ToolsContent({ data }) {
  const tools = data.tools;
  const ui = data.ui;
  return (
    <>
      <div className="modal-title" style={{display:'flex',alignItems:'center',gap:'10px'}}>
        {UI_ICONS.tools}{ui.sections.tools}
      </div>

      <div className="tools-section">
        <div className="tools-section-title" style={{display:'flex',alignItems:'center',gap:'7px'}}><S d={['M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9','M2 16h20','M12 20h.01']} w={16} h={16}/>{ui.toolsLabels.ides}</div>
        <div className="tools-grid">
          {tools.ides.map((t, i) => (
            <div key={i} className="tool-chip">
              <img src={t.img} alt={t.name} onError={e => { e.target.style.display='none'; }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>

      <div className="tools-section">
        <div className="tools-section-title" style={{display:'flex',alignItems:'center',gap:'7px'}}><S d={['M16 18l6-6-6-6','M8 6L2 12l6 6']} w={16} h={16}/>{ui.toolsLabels.frameworks}</div>
        <div className="tools-grid">
          {tools.frameworks.map((t, i) => (
            <div key={i} className="tool-chip">
              <img src={t.img} alt={t.name} onError={e => { e.target.style.display='none'; }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>

      <div className="tools-section">
        <div className="tools-section-title" style={{display:'flex',alignItems:'center',gap:'7px'}}><S d="M10 20l4-16M4 9l6 6-6 6M20 15l-6-6 6-6" w={16} h={16}/>{ui.toolsLabels.languages}</div>
        <div className="tools-grid">
          {tools.languages.map((t, i) => (
            <div key={i} className="tool-chip">
              <img src={t.img} alt={t.name} onError={e => { e.target.style.display='none'; }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SocialContent({ data }) {
  const ui = data.ui;
  return (
    <>
      <div className="modal-title" style={{display:'flex',alignItems:'center',gap:'10px'}}>
        {UI_ICONS.social}{ui.sections.social}
      </div>
      <div className="social-grid">
        {data.social.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            style={{ background: s.bg, color: s.color }}
          >
            <span className="social-icon">{ICONS[s.icon]}</span>
            <span className="social-name">{s.nombre}</span>
          </a>
        ))}
      </div>
    </>
  );
}
