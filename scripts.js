/* ─────────────────────────────────────────────
   DARK / LIGHT MODE
───────────────────────────────────────────── */
(function () {
  const html      = document.documentElement;
  const btn       = document.getElementById('theme-toggle');
  const icon      = document.getElementById('theme-icon');
  const DARK  = 'dark';
  const LIGHT = 'light';

  function applyTheme(theme) {
    html.dataset.theme = theme;
    if (icon) {
      icon.className = theme === DARK ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }

  // Restore persisted preference
  let saved;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  applyTheme(saved === LIGHT ? LIGHT : DARK);

  if (btn) {
    btn.addEventListener('click', () => {
      applyTheme(html.dataset.theme === DARK ? LIGHT : DARK);
    });
  }
})();

/* ─────────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────────── */
(function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navMain    = document.getElementById('nav-main');
  if (!menuToggle || !navMain) return;

  menuToggle.addEventListener('click', () => {
    navMain.classList.toggle('open');
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMain.contains(e.target) && !menuToggle.contains(e.target)) {
      navMain.classList.remove('open');
    }
  });
})();

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (nav buttons)
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const navMain = document.getElementById('nav-main');

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (navMain) navMain.classList.remove('open');
    });
  });
});

/* ─────────────────────────────────────────────
   I18N — LANGUAGE SYSTEM
───────────────────────────────────────────── */
(function () {
  const TRANSLATIONS = {
    es: {
      'nav.about': 'Sobre mí',
      'nav.projects': 'Proyectos',
      'nav.skills': 'Habilidades',
      'nav.contact': 'Contacto',
      'hero.badge': 'Disponible para trabajar',
      'hero.title': 'Hola, soy <span class="gradient-text">Mario</span><br>Desarrollador Frontend &amp; Móvil',
      'hero.sub': 'Construyo interfaces que se sienten bien, aplicaciones que funcionan de verdad y código del que me siento orgulloso. Especializado en React, Flutter y diseño UI/UX.',
      'hero.btn1': 'Ver proyectos',
      'hero.btn2': 'Hablemos',
      'about.label': 'Sobre mí',
      'about.title': '¿Quién soy?',
      'about.p1': 'Soy estudiante de <strong>Desarrollo de Aplicaciones Multiplataforma</strong> con foco en frontend, diseño web y apps móviles. Me gusta que las cosas estén bien hechas: interfaces claras, código limpio y experiencias que de verdad funcionan.',
      'about.p2': 'Trabajo principalmente con <strong>React</strong>, <strong>Flutter</strong> y <strong>Dart</strong>. También integro backends con <strong>Firebase</strong> y tengo experiencia en <strong>Java</strong>, <strong>Kotlin</strong> y <strong>Python</strong>.',
      'about.p3': 'Aprendo rápido, me engancho con los retos técnicos y busco un equipo donde seguir creciendo y aportar de verdad.',
      'about.cv': 'Descargar CV',
      'stats.projects': 'Proyectos destacados',
      'stats.tech': 'Tecnologías',
      'stats.degree': 'Titulación',
      'stats.commitment': 'Compromiso',
      'projects.label': 'Proyectos',
      'projects.title': 'Lo que he construido',
      'projects.github': 'Ver en GitHub',
      'proj.horus.desc': 'App de fitness con IA. Genera rutinas personalizadas con Google Gemini y un chatbot entrenador personal 24/7. Firebase Auth, Firestore y Storage.',
      'proj.camilo.desc': 'App web con mascota virtual interactiva. React + Firebase con autenticación, perfil de usuario y mecánicas de cuidado en tiempo real.',
      'projects.more.title': '¿Quieres ver más?',
      'projects.more.sub': 'Todos mis repositorios y experimentos están en GitHub. Hay más de lo que parece.',
      'projects.all': 'Todos los proyectos',
      'skills.title': 'Tecnologías',
      'skills.frameworks': 'Herramientas &amp; Frameworks',
      'skills.languages': 'Lenguajes',
      'contact.label': 'Contacto',
      'contact.title': 'Hablemos',
      'contact.intro': 'Si tienes un proyecto en mente, una oferta de trabajo o simplemente quieres hablar de tecnología, escríbeme. Suelo responder en menos de 24 horas.',
      'form.name': 'Nombre',
      'form.name.ph': 'Francisco',
      'form.lastname': 'Apellidos',
      'form.lastname.ph': 'Sánchez',
      'form.email': 'Email',
      'form.message': 'Mensaje',
      'form.message.ph': 'Cuéntame tu proyecto o idea...',
      'form.send': 'Enviar mensaje',
      'btn3d.label': 'Vista 3D',
    },
    en: {
      'nav.about': 'About me',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      'hero.badge': 'Available for work',
      'hero.title': 'Hi, I\'m <span class="gradient-text">Mario</span><br>Frontend &amp; Mobile Developer',
      'hero.sub': 'I build interfaces that feel right, apps that actually work, and code I\'m proud of. Specialized in React, Flutter and UI/UX design.',
      'hero.btn1': 'View projects',
      'hero.btn2': "Let's talk",
      'about.label': 'About me',
      'about.title': 'Who am I?',
      'about.p1': 'I\'m a <strong>Cross-Platform Application Development</strong> student focused on frontend, web design, and mobile apps. I like things done right: clean interfaces, clean code, and experiences that truly work.',
      'about.p2': 'I mainly work with <strong>React</strong>, <strong>Flutter</strong> and <strong>Dart</strong>. I also integrate backends with <strong>Firebase</strong> and have experience in <strong>Java</strong>, <strong>Kotlin</strong> and <strong>Python</strong>.',
      'about.p3': 'I learn fast, I get hooked on technical challenges, and I\'m looking for a team where I can keep growing and make a real contribution.',
      'about.cv': 'Download CV',
      'stats.projects': 'Featured projects',
      'stats.tech': 'Technologies',
      'stats.degree': 'Degree',
      'stats.commitment': 'Commitment',
      'projects.label': 'Projects',
      'projects.title': 'What I\'ve built',
      'projects.github': 'View on GitHub',
      'proj.horus.desc': 'AI-powered fitness app. Generates personalized routines with Google Gemini and a 24/7 personal trainer chatbot. Firebase Auth, Firestore and Storage.',
      'proj.camilo.desc': 'Web app with an interactive virtual pet. React + Firebase with authentication, user profiles and real-time care mechanics.',
      'projects.more.title': 'Want to see more?',
      'projects.more.sub': 'All my repositories and experiments are on GitHub. There\'s more than meets the eye.',
      'projects.all': 'All projects',
      'skills.title': 'Technologies',
      'skills.frameworks': 'Tools &amp; Frameworks',
      'skills.languages': 'Languages',
      'contact.label': 'Contact',
      'contact.title': "Let's talk",
      'contact.intro': 'If you have a project in mind, a job offer, or just want to talk tech, write to me. I usually reply within 24 hours.',
      'form.name': 'First name',
      'form.name.ph': 'Francisco',
      'form.lastname': 'Last name',
      'form.lastname.ph': 'Sánchez',
      'form.email': 'Email',
      'form.message': 'Message',
      'form.message.ph': 'Tell me about your project or idea...',
      'form.send': 'Send message',
      'btn3d.label': '3D View',
      'btn3d.exit': 'Exit 3D',
    }
  };

  function applyLang(lang) {
    try { localStorage.setItem('lang', lang); } catch (_) {}
    const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

    // data-i18n elements (innerHTML for those with HTML, textContent otherwise)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) {
        // Use innerHTML for keys that may contain HTML tags
        if (/<[a-z]/i.test(t[key])) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update lang label button text
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = lang === 'es' ? 'EN' : 'ES';

    // Update html lang attribute
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }

  // Restore persisted lang
  let currentLang;
  try { currentLang = localStorage.getItem('lang') || 'es'; } catch (_) { currentLang = 'es'; }
  applyLang(currentLang);

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      let cur;
      try { cur = localStorage.getItem('lang') || 'es'; } catch (_) { cur = 'es'; }
      const next = cur === 'es' ? 'en' : 'es';
      applyLang(next);
    });
  }

  // Expose globally so the 3D toggle can read current lang
  window._getLang = function () {
    try { return localStorage.getItem('lang') || 'es'; } catch (_) { return 'es'; }
  };
})();

/* ─────────────────────────────────────────────
   VISTA 3D TOGGLE
───────────────────────────────────────────── */
(function () {
  const btn      = document.getElementById('toggle-3d');
  const overlay  = document.getElementById('overlay-3d');
  const closeBtn = document.getElementById('close-3d');
  const iframe   = document.getElementById('iframe-3d');
  const navMain  = document.getElementById('nav-main');
  if (!btn || !overlay) return;

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 800;
  const label    = btn.querySelector('.btn-3d-label');
  const icon     = btn.querySelector('.btn-3d-icon i');
  let loaded = false;

  function open3D() {
    const langVal  = (window._getLang ? window._getLang() : 'es');
    const themeVal = (() => { try { return localStorage.getItem('theme') || 'dark'; } catch (_) { return 'dark'; } })();
    const src3d    = iframe.dataset.src + '?lang=' + langVal + '&theme=' + themeVal;
    if (isMobile) {
      const base = window.location.href.replace(/\/[^/]*$/, '/');
      window.open(base + src3d, '_blank', 'noopener');
      return;
    }
    const wasLoaded = loaded;
    if (!loaded) { iframe.src = src3d; loaded = true; }
    overlay.classList.add('visible');
    overlay.removeAttribute('aria-hidden');
    btn.classList.add('active');
    if (icon)  { icon.className = 'fa-solid fa-xmark'; }
    document.body.style.overflow = 'hidden';
    if (navMain) navMain.classList.remove('open');
    // Si el iframe ya estaba cargado, enviar START_MUSIC directamente
    // Si es primera carga, el handler de IFRAME_READY lo enviará cuando esté listo
    if (wasLoaded) {
      setTimeout(() => {
        try { iframe.contentWindow?.postMessage({ type: 'START_MUSIC' }, '*'); } catch(_) {}
      }, 50);
    }
  }

  function close3D() {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    btn.classList.remove('active');
    if (icon)  { icon.className = 'fa-solid fa-cube'; }
    document.body.style.overflow = '';
    // Parar la música del iframe al salir
    try { iframe.contentWindow?.postMessage({ type: 'STOP_MUSIC' }, '*'); } catch(_) {}
  }

  btn.addEventListener('click', () => {
    overlay.classList.contains('visible') ? close3D() : open3D();
  });
  if (closeBtn) closeBtn.addEventListener('click', close3D);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) close3D();
  });
})();

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   CARRUSEL — HERRAMIENTAS
───────────────────────────────────────────── */
(function () {
  'use strict';
  window.addEventListener('load', function () {
    const container = document.getElementById('herramientas-carousel');
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    if (!track) return;

    const orig = track.innerHTML;
    track.innerHTML = orig + orig + orig + orig; // 4 copies → no visible duplicates even on wide screens

    const shift = track.scrollWidth / 4;
    track.style.setProperty('--shift', shift + 'px');
    track.style.animation = 'slide 10s linear infinite';

    container.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    container.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        track.style.setProperty('--shift', (track.scrollWidth / 4) + 'px');
      }, 200);
    });
  });
})();

/* ─────────────────────────────────────────────
   CARRUSEL — LENGUAJES
───────────────────────────────────────────── */
(function () {
  'use strict';
  window.addEventListener('load', function () {
    const container = document.getElementById('lenguajes-carousel');
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    if (!track) return;

    const orig = track.innerHTML;
    track.innerHTML = orig + orig + orig + orig; // 4 copies

    const shift = track.scrollWidth / 4;
    track.style.setProperty('--shift', shift + 'px');
    track.style.animation = 'slide 12s linear infinite';

    container.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    container.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        track.style.setProperty('--shift', (track.scrollWidth / 4) + 'px');
      }, 200);
    });
  });
})();

/* ─────────────────────────────────────────────
   FORMULARIO DE CONTACTO (EmailJS)
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-msg');
  if (!form || !msg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.style.color = 'var(--accent-2)';

    const nombre    = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const gmail     = document.getElementById('gmail').value.trim();
    const mensaje   = document.getElementById('mensaje').value.trim();

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre.length < 3 || !soloLetras.test(nombre)) {
      msg.textContent = 'El nombre debe tener más de 2 caracteres y sin números.';
      return;
    }
    if (apellidos.length < 3 || !soloLetras.test(apellidos)) {
      msg.textContent = 'Los apellidos deben tener más de 2 caracteres y sin números.';
      return;
    }
    const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoValido.test(gmail)) {
      msg.textContent = 'Introduce un correo electrónico válido.';
      return;
    }
    const palabras = mensaje.split(/\s+/).filter(w => w.length > 0);
    if (palabras.length < 3) {
      msg.textContent = 'El mensaje debe contener mínimo 3 palabras.';
      return;
    }

    msg.style.color = 'var(--accent)';
    msg.textContent = 'Enviando mensaje...';

    emailjs
      .send('service_6qtleol', 'template_1dh3ier', { nombre, apellidos, gmail, mensaje })
      .then(() => {
        msg.style.color = '#22c55e';
        msg.textContent = '¡Mensaje enviado correctamente!';
        form.reset();
      })
      .catch((error) => {
        msg.style.color = 'var(--accent-2)';
        msg.textContent = 'Error al enviar el mensaje. Inténtalo más tarde.';
        console.error('EmailJS Error:', error);
      });
  });
});

/* ─────────────────────────────────────────────
   HERO PHOTO — CLICK PARTICLES + SOUND
───────────────────────────────────────────── */
(function () {
  const img = document.getElementById('hero-img');
  if (!img) return;

  const BUBBLE_COLORS = [
    'rgba(99,179,255,0.75)', 'rgba(140,100,255,0.75)',
    'rgba(80,220,200,0.75)', 'rgba(180,130,255,0.7)',
    'rgba(100,200,255,0.7)'
  ];

  /* ── Audio ── */
  let audioCtx    = null;
  let thunderBuf  = null;   // decoded PCM del trueno real
  let lastSoundTime = 0;
  const SOUND_COOLDOWN = 350;

  // Mute
  let muted = localStorage.getItem('soundMuted') === 'true';
  const muteBtn  = document.getElementById('mute-toggle');
  const muteIcon = document.getElementById('mute-icon');
  function applyMuteUI() {
    if (muted) {
      muteBtn.classList.add('muted');
      muteIcon.className = 'fa-solid fa-volume-xmark';
    } else {
      muteBtn.classList.remove('muted');
      muteIcon.className = 'fa-solid fa-volume-high';
    }
  }
  applyMuteUI();
  muteBtn.addEventListener('click', () => {
    muted = !muted;
    localStorage.setItem('soundMuted', muted);
    applyMuteUI();
    // Sincronizar mute con el iframe 3D
    const iframe3d = document.getElementById('iframe-3d');
    try { iframe3d?.contentWindow?.postMessage({ type: 'MUTE_SYNC', muted }, '*'); } catch(_) {}
  });

  // Sincronizar cuando el iframe 3D cambia el mute o notifica que está listo
  window.addEventListener('message', (e) => {
    const { type, muted: iframeMuted } = e.data || {};
    if (type === 'MUTE_SYNC' && typeof iframeMuted === 'boolean') {
      // El 3D cambió el mute — actualizar UI del 2D
      muted = iframeMuted;
      localStorage.setItem('soundMuted', muted);
      applyMuteUI();
    }
    if (type === 'IFRAME_READY') {
      // El iframe acaba de montar — enviar START_MUSIC si el overlay está visible
      if (overlay.classList.contains('visible')) {
        try { iframe.contentWindow?.postMessage({ type: 'START_MUSIC' }, '*'); } catch(_) {}
      }
    }
  });

  function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  // Precarga y decodifica thunder.mp3 en cuanto el usuario hace cualquier gesto
  function loadThunder() {
    if (thunderBuf) return;
    try {
      const ctx = getCtx();
      fetch('sounds/thunder.mp3')
        .then(r => r.arrayBuffer())
        .then(ab => ctx.decodeAudioData(ab))
        .then(decoded => { thunderBuf = decoded; })
        .catch(() => {});
    } catch (e) {}
  }
  document.addEventListener('click', loadThunder, { once: true });
  document.addEventListener('touchstart', loadThunder, { once: true });

  function playBubbleSound() {
    if (muted) return;
    if (Date.now() - lastSoundTime < SOUND_COOLDOWN) return;
    lastSoundTime = Date.now();
    try {
      const ctx = getCtx();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          const freq = 380 + Math.random() * 500;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * 1.6, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.22);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
          osc.start();
          osc.stop(ctx.currentTime + 0.28);
        }, i * 55);
      }
    } catch (e) {}
  }

  function playThunderSound() {
    if (muted) return;
    if (Date.now() - lastSoundTime < SOUND_COOLDOWN) return;
    lastSoundTime = Date.now();
    try {
      const ctx = getCtx();
      if (!thunderBuf) { loadThunder(); return; }

      // Recorta a 3 segundos y baja el volumen
      const TRIM   = 3.0;
      const sr     = thunderBuf.sampleRate;
      const frames = Math.min(thunderBuf.length, Math.floor(sr * TRIM));
      const trimBuf = ctx.createBuffer(thunderBuf.numberOfChannels, frames, sr);
      for (let ch = 0; ch < thunderBuf.numberOfChannels; ch++) {
        trimBuf.copyToChannel(thunderBuf.getChannelData(ch).slice(0, frames), ch);
      }

      const src  = ctx.createBufferSource();
      src.buffer = trimBuf;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);           // volumen reducido
      gain.gain.setValueAtTime(0.28, ctx.currentTime + 2.4);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3); // fade-out al final
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch (e) {}
  }

  /* ── Burbujas (modo claro) ── */
  function spawnBubbles(cx, cy) {
    const mobile = window.innerWidth < 600;
    const COUNT   = mobile ? 8  : 18;
    const maxSize = mobile ? 14 : 24;
    const spread  = mobile ? window.innerWidth * 0.14 : Math.min(85, window.innerWidth * 0.22);
    const vw = window.innerWidth;

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'bubble-particle';
      const size = 7 + Math.random() * maxSize;
      const xOff = (Math.random() - 0.5) * spread * 2;
      const left = Math.max(4, Math.min(vw - size - 4, cx + xOff - size / 2));
      const rise = cy * (0.85 + Math.random() * 0.35);
      const dur  = 1.8 + Math.random() * 0.9;
      const delay = Math.random() * 0.35;
      el.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}px;
        top:${cy - size / 2}px;
        background:${BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]};
        border:1.5px solid rgba(255,255,255,0.35);
        backdrop-filter:blur(2px);
        --rise:-${rise}px;
        --dur:${dur}s;
        animation-delay:${delay}s;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }

  /* ── Rayos (modo oscuro) ── */
  function lightningPoints(startX, startY, endY) {
    const pts  = [{ x: startX, y: startY }];
    const segs = 9 + Math.floor(Math.random() * 6);
    const stepH = (endY - startY) / segs;
    const maxDev = Math.min(50, window.innerWidth * 0.10);
    let x = startX;
    for (let i = 1; i <= segs; i++) {
      const dev = Math.min(maxDev, 8 + (i / segs) * 44);
      x += (Math.random() - 0.5) * dev * 2;
      x = Math.max(10, Math.min(window.innerWidth - 10, x));
      pts.push({ x, y: startY + stepH * i });
    }
    return pts;
  }

  function ptsToD(pts) {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  }

  function makeBolt(svg, pts, stroke, width, filterId) {
    const ns = 'http://www.w3.org/2000/svg';
    const p  = document.createElementNS(ns, 'path');
    p.setAttribute('d', ptsToD(pts));
    p.setAttribute('stroke', stroke);
    p.setAttribute('stroke-width', String(width));
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    if (filterId) p.setAttribute('filter', `url(#${filterId})`);
    svg.appendChild(p);
  }

  function spawnLightning(cx, cy) {
    const ns     = 'http://www.w3.org/2000/svg';
    const mobile = window.innerWidth < 600;
    const COUNT  = mobile ? 2 : 4;
    const startSpread = mobile ? 20 : 60;
    const endY   = window.innerHeight + 30;
    const blurSD = mobile ? '2' : '5';

    for (let b = 0; b < COUNT; b++) {
      const bDelay = b * 85 + Math.random() * 40;
      setTimeout(() => {
        const svg = document.createElementNS(ns, 'svg');
        svg.classList.add('lightning-svg');
        const dur = 0.55 + Math.random() * 0.35;
        svg.style.setProperty('--dur', `${dur}s`);
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);

        // Filtro de glow (márgenes reducidos en móvil para no desbordar)
        const filterId = `lf${Date.now()}${b}`;
        const defs = document.createElementNS(ns, 'defs');
        const filt = document.createElementNS(ns, 'filter');
        filt.setAttribute('id', filterId);
        filt.setAttribute('x', '-20%'); filt.setAttribute('y', '-5%');
        filt.setAttribute('width', '140%'); filt.setAttribute('height', '110%');
        const blur = document.createElementNS(ns, 'feGaussianBlur');
        blur.setAttribute('in', 'SourceGraphic');
        blur.setAttribute('stdDeviation', blurSD);
        filt.appendChild(blur); defs.appendChild(filt); svg.appendChild(defs);

        // Rayo principal
        const rawSX  = cx + (Math.random() - 0.5) * startSpread;
        const startX = Math.max(10, Math.min(window.innerWidth - 10, rawSX));
        const mainPts = lightningPoints(startX, cy, endY);
        makeBolt(svg, mainPts, '#9966ff', mobile ? 7  : 12, filterId);
        makeBolt(svg, mainPts, '#c4aaff', mobile ? 3  : 5,  filterId);
        makeBolt(svg, mainPts, '#ffffff', mobile ? 1.5 : 2.5, null);
        makeBolt(svg, mainPts, '#eee8ff', 1, null);

        // Rama (siempre 1 en escritorio, 50% en móvil)
        if (!mobile || Math.random() > 0.5) {
          const fi   = Math.floor(mainPts.length * 0.3 + Math.random() * mainPts.length * 0.4);
          const from = mainPts[fi];
          const brPts = lightningPoints(from.x, from.y, from.y + (endY - from.y) * (0.25 + Math.random() * 0.4));
          makeBolt(svg, brPts, '#7744dd', mobile ? 4 : 7, filterId);
          makeBolt(svg, brPts, 'rgba(210,195,255,0.8)', 1.5, null);
        }

        document.body.appendChild(svg);
        svg.addEventListener('animationend', () => svg.remove());
      }, bDelay);
    }
  }

  /* ── Click handler ── */
  img.addEventListener('click', () => {
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const isDark = document.documentElement.dataset.theme !== 'light';
    if (isDark) {
      spawnLightning(cx, cy);
      playThunderSound();
    } else {
      spawnBubbles(cx, cy);
      playBubbleSound();
    }
  });
})();
