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
    if (isMobile) {
      const base = window.location.href.replace(/\/[^/]*$/, '/');
      window.open(base + iframe.dataset.src, '_blank', 'noopener');
      return;
    }
    if (!loaded) { iframe.src = iframe.dataset.src; loaded = true; }
    overlay.classList.add('visible');
    overlay.removeAttribute('aria-hidden');
    btn.classList.add('active');
    if (icon)  { icon.className = 'fa-solid fa-xmark'; }
    if (label) label.textContent = 'Salir';
    document.body.style.overflow = 'hidden';
    if (navMain) navMain.classList.remove('open');
  }

  function close3D() {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    btn.classList.remove('active');
    if (icon)  { icon.className = 'fa-solid fa-cube'; }
    if (label) label.textContent = 'Vista 3D';
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
