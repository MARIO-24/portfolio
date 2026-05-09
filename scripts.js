const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ─── TOGGLE VISTA 3D ───
(function () {
    const btn     = document.getElementById('toggle-3d');
    const overlay = document.getElementById('overlay-3d');
    const closeBtn = document.getElementById('close-3d');
    const iframe  = document.getElementById('iframe-3d');
    let loaded = false;

    function open3D() {
        // Carga el iframe la primera vez (lazy load)
        if (!loaded) {
            iframe.src = iframe.dataset.src;
            loaded = true;
        }
        overlay.classList.add('visible');
        overlay.removeAttribute('aria-hidden');
        btn.classList.add('active');
        btn.textContent = '✕ Vista Normal';
        document.body.style.overflow = 'hidden';
        navLinks.classList.remove('active');
    }

    function close3D() {
        overlay.classList.remove('visible');
        overlay.setAttribute('aria-hidden', 'true');
        btn.classList.remove('active');
        btn.textContent = '🎮 Vista 3D';
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        overlay.classList.contains('visible') ? close3D() : open3D();
    });
    closeBtn.addEventListener('click', close3D);

    // Escape cierra el overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('visible')) close3D();
    });
})();



const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        navLinks.classList.remove('active');
    });
});

function toggleSocial() {
    const socialMenu = document.getElementById('social-menu');
    socialMenu.style.display =
        socialMenu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
    const socialBtn = document.querySelector('.social-btn');
    const socialMenu = document.getElementById('social-menu');

    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }

    if (!socialBtn.contains(e.target)) {
        socialMenu.style.display = 'none';
    }
});

// ---------
// CARRUSEL
// ---------
(function () {
  'use strict';

  window.addEventListener('load', function () {
    const container = document.getElementById('herramientas-carousel');
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    if (!track) return;

    track.innerHTML += track.innerHTML;

    const shift = track.scrollWidth / 2;
    track.style.setProperty('--shift', shift + 'px');

    track.style.animation = 'slide 12s linear infinite';

    container.addEventListener('mouseenter', () =>
      track.style.animationPlayState = 'paused'
    );
    container.addEventListener('mouseleave', () =>
      track.style.animationPlayState = 'running'
    );

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        track.style.setProperty('--shift', (track.scrollWidth / 2) + 'px');
      }, 200);
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const msg = document.getElementById("form-msg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        msg.textContent = "";
        msg.style.color = "red";

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const gmail = document.getElementById("gmail").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (nombre.length < 3 || !soloLetras.test(nombre)) {
            msg.textContent = "El nombre debe tener más de 2 caracteres y sin números.";
            return;
        }

        if (apellidos.length < 3 || !soloLetras.test(apellidos)) {
            msg.textContent = "Los apellidos deben tener más de 2 caracteres y sin números.";
            return;
        }

        const correoValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!correoValido.test(gmail)) {
            msg.textContent = "Introduce un correo de Gmail válido.";
            return;
        }

        const palabras = mensaje.split(/\s+/).filter(w => w.length > 0);
        if (palabras.length < 3) {
            msg.textContent = "El mensaje debe contener mínimo 3 palabras.";
            return;
        }

        const params = { nombre, apellidos, gmail, mensaje };

        msg.style.color = "blue";
        msg.textContent = "Enviando mensaje...";

        emailjs
            .send("service_6qtleol", "template_1dh3ier", params)
            .then(() => {
                msg.style.color = "green";
                msg.textContent = "¡Mensaje enviado correctamente!";
                form.reset();
            })
            .catch((error) => {
                msg.style.color = "red";
                msg.textContent = "Error al enviar el mensaje. Inténtalo más tarde.";
                console.error("EmailJS Error:", error);
            });
    });
});



(function () {
  'use strict';

  window.addEventListener('load', function () {
    const container = document.getElementById('lenguajes-carousel');
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    if (!track) return;

    track.innerHTML += track.innerHTML;

    const shift = track.scrollWidth / 2;
    track.style.setProperty('--shift', shift + 'px');

    track.style.animation = 'slide 12s linear infinite';

    container.addEventListener('mouseenter', () =>
      track.style.animationPlayState = 'paused'
    );
    container.addEventListener('mouseleave', () =>
      track.style.animationPlayState = 'running'
    );

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        track.style.setProperty('--shift', (track.scrollWidth / 2) + 'px');
      }, 200);
    });
  });
})();
