/* STAR WAPPAS — Componentes compartidos (header + footer)
   Se incluye en todas las páginas interiores.
   El index.html principal tiene header/footer inline propio. */

(function () {

  const WA = "https://wa.me/34699769980?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20mi%20diagn%C3%B3stico%20gratuito.";

  const NAV = [
    ['/facial/',           'Facial'],
    ['/corporal/',         'Corporal'],
    ['/depilacion/',       'Depilación'],
    ['/masajes/',          'Masajes'],
    ['/destinos/',         'Destinos'],
    ['/mas-tratamientos/', 'Más Tratamientos'],
    ['/sobre-nosotras/',   'Sobre nosotras'],
    ['/blog/',             'Blog'],
    ['/contacto.html',     'Contacto'],
  ];

  const path = window.location.pathname;

  function navItems() {
    return NAV.map(([href, label]) => {
      const isActive = (href === '/' && path === '/')
        || (href !== '/' && path.startsWith(href));
      return `<li><a href="${href}"${isActive ? ' class="active"' : ''}>${label}</a></li>`;
    }).join('');
  }

  const IG_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
  const FB_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;

  // ── HEADER ─────────────────────────────────────────────────
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="container header__inner">
        <a href="/" class="header__logo" aria-label="Star Wappas — Inicio">
          <img src="/img/logo.png" alt="Star Wappas" width="240" height="68">
        </a>
        <nav class="header__nav" aria-label="Navegación principal">
          <ul>${navItems()}</ul>
        </nav>
        <a href="${WA}" class="btn btn--primary header__cta" target="_blank" rel="noopener">Diagnóstico gratuito</a>
        <button class="header__hamburger" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }

  // ── MENÚ MÓVIL ─────────────────────────────────────────────
  const mobileNavEl = document.getElementById('mobile-nav');
  if (mobileNavEl) {
    mobileNavEl.innerHTML = `
      <button class="mobile-nav__close" aria-label="Cerrar menú">✕</button>
      <div class="mobile-nav__links">
        <ul>${navItems()}</ul>
      </div>
      <div class="mobile-nav__contact">
        <p>📍 C/ de Les Flors, 40-52 · El Vendrell</p>
        <p>📞 <a href="tel:+34977181948">977 18 19 48</a> · <a href="tel:+34699769980">699 76 99 80</a></p>
        <br>
        <a href="${WA}" class="btn btn--primary" target="_blank" rel="noopener" style="width:100%;justify-content:center;">
          Reservar diagnóstico gratuito
        </a>
      </div>`;
  }

  // ── FOOTER ─────────────────────────────────────────────────
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="container">
        <div class="footer__main">
          <div class="footer__brand">
            <img src="/img/logo.png" alt="Star Wappas" width="240" height="68">
            <p>Tu centro de estética familiar en El Vendrell. Estética emocional para personas reales. Belleza que va más allá de la superficie.</p>
            <div class="footer__social">
              <a href="https://www.instagram.com/star_wappas/" target="_blank" rel="noopener" aria-label="Instagram">${IG_SVG}</a>
              <a href="https://www.facebook.com/star_wappas/" target="_blank" rel="noopener" aria-label="Facebook">${FB_SVG}</a>
            </div>
          </div>
          <div class="footer__col">
            <h4>Tratamientos</h4>
            <ul>
              <li><a href="/facial/">Faciales</a></li>
              <li><a href="/corporal/">Corporales</a></li>
              <li><a href="/depilacion/">Depilación</a></li>
              <li><a href="/masajes/">Masajes</a></li>
              <li><a href="/mas-tratamientos/">Más Tratamientos</a></li>
              <li><a href="/belleza-masculina.html">Belleza Masculina</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>El centro</h4>
            <ul>
              <li><a href="/sobre-nosotras/">Sobre nosotras</a></li>
              <li><a href="/destinos/">Los 6 Destinos</a></li>
              <li><a href="/colaboradores.html">Colaboradores</a></li>
              <li><a href="/contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Contacto</h4>
            <div class="footer__contact-data">
              <strong>Dirección</strong>
              <p>C/ de Les Flors, 40-52<br>43700 El Vendrell, Tarragona</p>
              <strong>Teléfonos</strong>
              <p><a href="tel:+34977181948">977 18 19 48</a><br><a href="tel:+34699769980">699 76 99 80</a></p>
              <strong>Horario</strong>
              <p>Lun–Vie 9:00–21:00h<br>Sáb 9:00–14:00h</p>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© 2026 Star Wappas · Todos los derechos reservados</p>
          <nav aria-label="Legal">
            <a href="/aviso-legal.html">Aviso legal</a>
            <a href="/privacidad.html">Privacidad</a>
            <a href="/cookies.html">Cookies</a>
          </nav>
        </div>
      </div>`;
  }

  // ── BOTÓN FLOTANTE WHATSAPP ────────────────────────────────────
  const waBtn = document.createElement('a');
  waBtn.href = WA;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.className = 'wa-float';
  waBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
  waBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
  document.body.appendChild(waBtn);

})();
