/* STAR WAPPAS — JavaScript + animaciones GSAP */

// ════════════════════════════════════════════════
// UTILIDADES GENERALES (sin dependencia de GSAP)
// ════════════════════════════════════════════════

// Header: sólido al hacer scroll
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Menú móvil
const hamburger     = document.querySelector('.header__hamburger');
const mobileNav     = document.getElementById('mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileClose   = document.querySelector('.mobile-nav__close');

function abrirMenu() {
  mobileNav?.classList.add('open');
  mobileOverlay?.classList.add('open');
  hamburger?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cerrarMenu() {
  mobileNav?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  hamburger?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', abrirMenu);
mobileClose?.addEventListener('click', cerrarMenu);
mobileOverlay?.addEventListener('click', cerrarMenu);
document.querySelectorAll('#mobile-nav a').forEach(a => a.addEventListener('click', cerrarMenu));

// Nav activa según URL
const rutaActual = window.location.pathname;
document.querySelectorAll('.header__nav a, .mobile-nav__links a').forEach(a => {
  const href = a.getAttribute('href') || '';
  if (href === '/' || href === '/index.html') {
    if (rutaActual === '/' || rutaActual === '/index.html') a.classList.add('active');
  } else if (href.length > 1 && rutaActual.startsWith(href.replace('index.html', ''))) {
    a.classList.add('active');
  }
});

// Smooth scroll en anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const dest = document.getElementById(a.getAttribute('href').slice(1));
    if (dest) { e.preventDefault(); dest.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ════════════════════════════════════════════════
// GSAP — todo lo que sigue requiere la librería
// ════════════════════════════════════════════════
if (typeof gsap !== 'undefined') {

gsap.registerPlugin(ScrollTrigger);

// ── Cursor personalizado (solo en dispositivos con ratón) ────
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor    = document.createElement('div');
  const cursorDot = document.createElement('div');
  cursor.className    = 'sw-cursor';
  cursorDot.className = 'sw-cursor__dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  // El cursor aparece solo cuando el ratón entra en la ventana
  document.addEventListener('mouseenter', () => cursor.classList.add('ready'));

  document.addEventListener('mousemove', e => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(cursor,    { x: e.clientX, y: e.clientY, duration: 0.4,  ease: 'power3.out' });
  });

  // Cursor grande al pasar sobre elementos interactivos
  document.querySelectorAll('a, button, .destino-card, .trat-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('sw-cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('sw-cursor--hover'));
  });
}

// ════════════════════════════════════════════════
// ANIMACIÓN HERO
// ════════════════════════════════════════════════

// Separar el título en líneas para el efecto "wipe desde abajo"
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
  const lines = heroTitle.innerHTML.split('<br>');
  heroTitle.innerHTML = lines.map(line =>
    `<div class="hero-line-wrap"><span class="hero-line-inner">${line.trim()}</span></div>`
  ).join('');
}

const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
heroTL
  .from('.hero__eyebrow',      { opacity: 0, x: -50, duration: 1.1 }, 0.2)
  .from('.hero-line-inner',    { yPercent: 110, duration: 1.25, stagger: 0.18 }, 0.45)
  .from('.hero__sub',          { opacity: 0, y: 32, duration: 1 }, 1.0)
  .from('.hero__actions .btn', { opacity: 0, y: 22, stagger: 0.16, duration: 0.85 }, 1.35)
  .from('.hero__scroll',       { opacity: 0, y: 10, duration: 0.7 }, 2.0);

// Círculos decorativos: rotación continua y flotación
gsap.to('.hero__deco--a', {
  rotation: 360, duration: 90, repeat: -1, ease: 'none',
  transformOrigin: 'center center'
});
gsap.to('.hero__deco--b', {
  rotation: -360, duration: 60, repeat: -1, ease: 'none',
  transformOrigin: 'center center'
});
gsap.to('.hero__deco--c', {
  y: -28, duration: 6, repeat: -1, yoyo: true, ease: 'power1.inOut'
});

// ════════════════════════════════════════════════
// ANIMACIONES AL HACER SCROLL
// ════════════════════════════════════════════════

// Función helper para animaciones de entrada estándar
function fadeUp(selector, trigger, options = {}) {
  const defaults = { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' };
  gsap.from(selector, {
    scrollTrigger: {
      trigger: trigger || selector,
      start: 'top 82%',
      ...( options.triggerOpts || {} )
    },
    ...defaults,
    ...options,
    triggerOpts: undefined
  });
}

// ── Franja de claims ─────────────────────────────────────────
gsap.from('.claims__item', {
  scrollTrigger: { trigger: '.claims', start: 'top 92%' },
  opacity: 0, x: -35, stagger: 0.1, duration: 0.75, ease: 'power2.out'
});

// ── Concepto ─────────────────────────────────────────────────
gsap.from(['.concepto .deco-line', '.concepto .section-head__label', '.concepto .section-head__title'], {
  scrollTrigger: { trigger: '.concepto', start: 'top 80%' },
  opacity: 0, y: 35, stagger: 0.12, duration: 1, ease: 'power3.out'
});
gsap.from('.concepto__quote', {
  scrollTrigger: { trigger: '.concepto__quote', start: 'top 84%' },
  opacity: 0, x: -24, duration: 1.1, ease: 'power2.out'
});
gsap.from('.concepto__text', {
  scrollTrigger: { trigger: '.concepto__text', start: 'top 84%' },
  opacity: 0, y: 22, stagger: 0.14, duration: 0.85, ease: 'power2.out'
});
gsap.from('.pilar', {
  scrollTrigger: { trigger: '.pilares', start: 'top 84%' },
  opacity: 0, y: 28, stagger: 0.1, duration: 0.75, ease: 'power2.out'
});
gsap.from('.concepto__visual', {
  scrollTrigger: { trigger: '.concepto__grid', start: 'top 75%' },
  opacity: 0, x: 80, duration: 1.4, ease: 'power3.out'
});

// Contador del badge "+40 años"
const badgeNum = document.querySelector('.concepto__badge span:first-child');
if (badgeNum) {
  ScrollTrigger.create({
    trigger: '.concepto__badge',
    start: 'top 88%',
    once: true,
    onEnter: () => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 40, duration: 2, ease: 'power2.out',
        onUpdate: () => { badgeNum.textContent = '+' + Math.floor(obj.v); }
      });
    }
  });
}

// ── Sección Destinos ─────────────────────────────────────────
gsap.from('.destinos .section-head__label, .destinos .section-head__title, .destinos .section-head__subtitle', {
  scrollTrigger: { trigger: '.destinos .section-head', start: 'top 84%' },
  opacity: 0, y: 30, stagger: 0.12, duration: 1, ease: 'power3.out'
});
gsap.from('.destino-card', {
  scrollTrigger: { trigger: '.destinos__grid', start: 'top 82%' },
  opacity: 0, y: 55, stagger: { amount: 0.8, from: 'start' },
  duration: 1, ease: 'power3.out'
});

// ── Tratamientos destacados ───────────────────────────────────
gsap.from('.tratamientos-home .section-head__label, .tratamientos-home .section-head__title, .tratamientos-home .section-head__subtitle', {
  scrollTrigger: { trigger: '.tratamientos-home .section-head', start: 'top 84%' },
  opacity: 0, y: 30, stagger: 0.12, duration: 1, ease: 'power3.out'
});
gsap.from('.trat-card', {
  scrollTrigger: { trigger: '.tratamientos-grid', start: 'top 84%' },
  opacity: 0, y: 44, stagger: 0.13,
  duration: 0.9, ease: 'power3.out'
});
gsap.from('.tratamientos-home__footer .btn', {
  scrollTrigger: { trigger: '.tratamientos-home__footer', start: 'top 88%' },
  opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power2.out'
});

// Efecto tilt 3D en las tarjetas de tratamiento (solo desktop)
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.trat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rotY =  ((e.clientX - r.left)  / r.width  - 0.5) * 14;
      const rotX = -((e.clientY - r.top)   / r.height - 0.5) * 14;
      gsap.to(card, {
        rotateX: rotX, rotateY: rotY,
        transformPerspective: 900,
        duration: 0.45, ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.65, ease: 'elastic.out(1, 0.6)'
      });
    });
  });
}

// ── Equipo ───────────────────────────────────────────────────
gsap.from('.equipo .section-head__label, .equipo .section-head__title, .equipo .section-head__subtitle', {
  scrollTrigger: { trigger: '.equipo .section-head', start: 'top 84%' },
  opacity: 0, y: 30, stagger: 0.12, duration: 1, ease: 'power3.out'
});
gsap.from('.profesional', {
  scrollTrigger: { trigger: '.equipo__grid', start: 'top 82%' },
  opacity: 0, y: 55, scale: 0.97,
  stagger: 0.22, duration: 1.1, ease: 'power3.out'
});

// ── Testimonios ──────────────────────────────────────────────
gsap.from('.testimonios .section-head__title', {
  scrollTrigger: { trigger: '.testimonios .section-head', start: 'top 84%' },
  opacity: 0, y: 30, duration: 1, ease: 'power3.out'
});
gsap.from('.testimonio', {
  scrollTrigger: { trigger: '.testimonios__grid', start: 'top 84%' },
  opacity: 0, y: 42, stagger: 0.16,
  duration: 0.9, ease: 'power3.out'
});

// ── CTA central ──────────────────────────────────────────────
gsap.from('.cta-central__title, .cta-central__sub, .cta-central__actions, .cta-central__tel', {
  scrollTrigger: { trigger: '.cta-central', start: 'top 80%' },
  opacity: 0, y: 32, stagger: 0.15,
  duration: 0.95, ease: 'power3.out'
});

// ── Instagram ────────────────────────────────────────────────
gsap.from('.instagram .section-head__title', {
  scrollTrigger: { trigger: '.instagram .section-head', start: 'top 84%' },
  opacity: 0, y: 25, duration: 0.9, ease: 'power3.out'
});
gsap.from('.instagram__item', {
  scrollTrigger: { trigger: '.instagram__grid', start: 'top 88%' },
  opacity: 0, scale: 0.8,
  stagger: { amount: 0.6, from: 'start' },
  duration: 0.65, ease: 'back.out(1.5)'
});

// ── Footer ───────────────────────────────────────────────────
gsap.from('.footer__brand, .footer__col', {
  scrollTrigger: { trigger: '#site-footer', start: 'top 88%' },
  opacity: 0, y: 28, stagger: 0.1,
  duration: 0.8, ease: 'power2.out'
});

// ════════════════════════════════════════════════
// ANIMACIONES PÁGINAS INTERIORES
// ════════════════════════════════════════════════

// ── Page hero (páginas de tratamiento, destinos, etc.) ────────
// Solo actúa si existe .page-hero (no en el home, que tiene su propio hero)
const pageHero = document.querySelector('.page-hero');
if (pageHero) {
  // Dividir el título en líneas para el efecto wipe
  const pageHeroTitle = pageHero.querySelector('.page-hero__title');
  if (pageHeroTitle) {
    const lines = pageHeroTitle.innerHTML.split(/<br\s*\/?>/i);
    pageHeroTitle.innerHTML = lines.map(line =>
      `<div class="hero-line-wrap"><span class="hero-line-inner">${line.trim()}</span></div>`
    ).join('');
  }

  // Timeline de entrada secuencial, igual que el hero del home
  const pageHeroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
  pageHeroTL
    .from('.breadcrumb',            { opacity: 0, y: -16, duration: 0.7, ease: 'power2.out' }, 0.1)
    .from('.page-hero__label',      { opacity: 0, x: -40, duration: 0.9 }, 0.25)
    .from('.page-hero .hero-line-inner', { yPercent: 110, duration: 1.15, stagger: 0.17 }, 0.4)
    .from('.page-hero__desc',       { opacity: 0, y: 30, duration: 1 }, 0.95);
}

// ── Detalle de tratamiento ────────────────────────────────────
if (document.querySelector('.trat-detail__grid')) {
  gsap.from('.trat-detail__visual', {
    scrollTrigger: { trigger: '.trat-detail__grid', start: 'top 80%' },
    opacity: 0, x: -60, duration: 1.3, ease: 'power3.out'
  });
  gsap.from('.trat-detail__body > .trat-block', {
    scrollTrigger: { trigger: '.trat-detail__body', start: 'top 80%' },
    opacity: 0, y: 36, stagger: 0.18, duration: 0.9, ease: 'power3.out'
  });
  gsap.from('.trat-stat', {
    scrollTrigger: { trigger: '.trat-stats', start: 'top 88%' },
    opacity: 0, y: 28, scale: 0.93, stagger: 0.14, duration: 0.8, ease: 'back.out(1.5)'
  });
  gsap.from('.trat-detail__nav .btn', {
    scrollTrigger: { trigger: '.trat-detail__nav', start: 'top 92%' },
    opacity: 0, y: 20, stagger: 0.15, duration: 0.75, ease: 'power2.out'
  });
}

// ── CTA inline ────────────────────────────────────────────────
gsap.from('.cta-inline__title', {
  scrollTrigger: { trigger: '.cta-inline', start: 'top 82%' },
  opacity: 0, y: 30, duration: 1, ease: 'power3.out'
});
gsap.from('.cta-inline__sub, .cta-inline__actions', {
  scrollTrigger: { trigger: '.cta-inline', start: 'top 80%' },
  opacity: 0, y: 20, stagger: 0.15, duration: 0.85, ease: 'power2.out', delay: 0.2
});

// ── Historia / Sobre nosotras ─────────────────────────────────
gsap.from('.historia__text', {
  scrollTrigger: { trigger: '.historia__grid', start: 'top 82%' },
  opacity: 0, x: -40, duration: 1.1, ease: 'power3.out'
});
gsap.from('.historia__visual', {
  scrollTrigger: { trigger: '.historia__grid', start: 'top 80%' },
  opacity: 0, x: 40, duration: 1.2, ease: 'power3.out'
});
gsap.from('.historia__quote', {
  scrollTrigger: { trigger: '.historia__quote', start: 'top 86%' },
  opacity: 0, x: -20, duration: 0.9, ease: 'power2.out'
});

// ── Pilares ───────────────────────────────────────────────────
gsap.from('.pilar', {
  scrollTrigger: { trigger: '.pilares', start: 'top 84%' },
  opacity: 0, y: 28, stagger: 0.1, duration: 0.75, ease: 'power2.out'
});

// ── Página de contacto ────────────────────────────────────────
gsap.from('.contacto-dato', {
  scrollTrigger: { trigger: '.contacto-grid', start: 'top 84%' },
  opacity: 0, y: 24, stagger: 0.12, duration: 0.8, ease: 'power2.out'
});
gsap.from('.contacto-form', {
  scrollTrigger: { trigger: '.contacto-form', start: 'top 82%' },
  opacity: 0, x: 40, duration: 1.1, ease: 'power3.out'
});

} // fin bloque GSAP

// ════════════════════════════════════════════════
// ACORDEONES EN PÁGINAS DE TRATAMIENTO
// ════════════════════════════════════════════════
(function () {
  const body = document.querySelector('.trat-detail__body');
  if (!body) return;
  const blocks = Array.from(body.querySelectorAll('.trat-block'));
  if (blocks.length < 2) return;

  blocks.forEach((block, i) => {
    const label = block.querySelector('.trat-block__label');
    if (!label) return;

    // Envolver el contenido (todo menos el label) en .trat-block__body
    const wrapper = document.createElement('div');
    wrapper.className = 'trat-block__body';
    Array.from(block.children).forEach(child => {
      if (child !== label) wrapper.appendChild(child);
    });
    block.appendChild(wrapper);

    // Botón +
    const btn = document.createElement('span');
    btn.className = 'trat-block__toggle';
    btn.setAttribute('aria-hidden', 'true');
    btn.textContent = '+';
    label.appendChild(btn);

    // El primero empieza abierto, el resto cerrados
    if (i === 0) {
      block.classList.add('acordeon-open');
      wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
    } else {
      wrapper.style.maxHeight = '0';
    }

    label.addEventListener('click', () => {
      const isOpen = block.classList.contains('acordeon-open');
      block.classList.toggle('acordeon-open', !isOpen);
      wrapper.style.maxHeight = isOpen ? '0' : wrapper.scrollHeight + 'px';
    });
  });
})();
