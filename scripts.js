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
    if (!loaded) { iframe.src = src3d; loaded = true; }
    overlay.classList.add('visible');
    overlay.removeAttribute('aria-hidden');
    btn.classList.add('active');
    if (icon)  { icon.className = 'fa-solid fa-xmark'; }
    document.body.style.overflow = 'hidden';
    if (navMain) navMain.classList.remove('open');
  }

  function close3D() {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    btn.classList.remove('active');
    if (icon)  { icon.className = 'fa-solid fa-cube'; }
    document.body.style.overflow = '';
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
