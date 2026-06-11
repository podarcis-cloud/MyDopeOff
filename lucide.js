/* ============================================================
   LUCIDE — Socle partagé (navigation, profil, logo)
   ============================================================ */
window.LUCIDE = (function () {
  const KEY = 'ctc_v6';

  function user() {
    try { return (JSON.parse(localStorage.getItem(KEY)) || {}).user || null; }
    catch (e) { return null; }
  }
  function qs() {
    const u = user();
    if (!u || !u.name) return '';
    return '?name=' + encodeURIComponent(u.name) +
           '&region=' + encodeURIComponent(u.region || 'BE') +
           (u.age ? '&age=' + encodeURIComponent(u.age) : '');
  }
  function link(href) { return href + qs(); }

  /* Logo œil + L (vectoriel, lisible à 24px) */
  function logoSVG(size, mono) {
    const s = size || 34;
    const iris = mono ? '#fff' : '#2563EB';
    const ink  = mono ? '#fff' : '#0F172A';
    const pupil= mono ? '#2563EB' : '#0F172A';
    return `<svg viewBox="0 0 48 48" width="${s}" height="${s}" fill="none" aria-label="Lucide" role="img">
      <path d="M5 24c5.5-8.4 12.8-12.6 19-12.6S37.5 15.6 43 24c-5.5 8.4-12.8 12.6-19 12.6S10.5 32.4 5 24Z"
            stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="24" r="8.4" fill="${iris}"/>
      <circle cx="24" cy="24" r="3.6" fill="${pupil}"/>
      <circle cx="26.4" cy="21.4" r="1.5" fill="#fff" opacity=".9"/>
      <path d="M20.2 18.2v11.6h6" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" opacity=".0"/>
    </svg>`;
  }
  function appIcon(size) {
    const s = size || 34;
    return `<span style="display:inline-flex;width:${s}px;height:${s}px;border-radius:${Math.round(s*0.28)}px;
      background:#EFF4FF;align-items:center;justify-content:center;flex:0 0 auto;">${logoSVG(Math.round(s*0.74))}</span>`;
  }

  /* Onglets de la barre inférieure */
  const NAV = [
    { page:'index',         href:'index.html',         label:'Accueil',     icon:'M3 11.2 12 4l9 7.2M5 9.6V19a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1V9.6' },
    { page:'fiches',        href:'fiches.html',        label:'Exercices',   icon:'M21 12h-4l-3 8-4-16-3 8H3' },
    { page:'psychochecker', href:'psychochecker.html', label:'Substances',  icon:'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM20 20l-5.4-5.4' },
    { page:'suivi',         href:'suivi.html',         label:'Suivi',       icon:'M3 17l5.5-5.5 3.5 3.5L21 6M21 6h-4M21 6v4' },
    { page:'rdr',           href:'rdr.html',           label:'RDR',         icon:'M12 21s7-3.7 7-9.3V5.6L12 3 5 5.6v6.1C5 17.3 12 21 12 21Z' }
  ];

  function renderNav(active) {
    const items = NAV.map(n =>
      `<a class="bn-item${n.page===active?' on':''}" href="${link(n.href)}">
         <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="${n.icon}"/></svg>
         <span>${n.label}</span>
       </a>`).join('');
    return `<nav class="bottom-nav">${items}</nav>`;
  }

  function init(opts) {
    opts = opts || {};
    // Logos
    document.querySelectorAll('[data-logo]').forEach(el => {
      el.innerHTML = logoSVG(parseInt(el.dataset.logo) || 34, el.hasAttribute('data-mono'));
    });
    document.querySelectorAll('[data-appicon]').forEach(el => {
      el.outerHTML = appIcon(parseInt(el.dataset.appicon) || 34);
    });
    // Barre de navigation
    const navMount = document.querySelector('[data-nav]');
    if (navMount) navMount.outerHTML = renderNav(opts.page || document.body.dataset.page || '');
    // Liens internes à compléter avec le profil
    document.querySelectorAll('a[data-go]').forEach(a => { a.href = link(a.dataset.go); });
    // Boutons retour → accueil
    document.querySelectorAll('[data-back]').forEach(b => {
      b.addEventListener('click', () => { location.href = link('index.html'); });
    });
    // Service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  return { user, qs, link, logoSVG, appIcon, renderNav, init };
})();
