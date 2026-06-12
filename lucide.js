/* MyDope Off — socle commun (nav, profil, logo) */
window.LUCIDE = (function () {

  const KEY = 'ctc_v6';

  function user() {
    try { return (JSON.parse(localStorage.getItem(KEY)) || {}).user || null; }
    catch (e) { return null; }
  }

  function qs() {
    const u = user();
    if (!u || !u.name) return '';
    return '?name=' + encodeURIComponent(u.name) + '&region=' + (u.region || 'BE') + (u.age ? '&age=' + u.age : '');
  }

  function link(href) {
    const q = qs();
    if (!q) return href;
    const i = href.indexOf('#');
    return i === -1 ? href + q : href.slice(0, i) + q + href.slice(i);
  }

  /* Logo MyDope Off : symbole "power / off" — couper la boucle. */
  function logoSVG(size, mono) {
    size = size || 32;
    const ring = mono ? '#fff' : '#2563EB';
    const bar  = mono ? '#fff' : '#0F172A';
    return '<svg viewBox="0 0 48 48" width="' + size + '" height="' + size + '" fill="none" aria-label="MyDope Off">' +
      '<path d="M15.2 13.6a14 14 0 1 0 17.6 0" stroke="' + ring + '" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="24" y1="6" x2="24" y2="22" stroke="' + bar + '" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* Icône d'app : tuile bleue dégradée + symbole power blanc */
  function appIcon(size) {
    size = size || 56;
    return '<span style="display:inline-flex;align-items:center;justify-content:center;width:' + size + 'px;height:' + size + 'px;border-radius:' + Math.round(size * .28) + 'px;background:linear-gradient(140deg,#2563EB,#1D4ED8);box-shadow:0 6px 18px rgba(37,99,235,.28);">' +
      logoSVG(Math.round(size * .56), true) + '</span>';
  }

  /* Marque texte simple — pas de logo SVG */
  function wordmark() {
    return '<span style="font-family:var(--disp,Manrope,sans-serif);font-weight:800;letter-spacing:-.02em;color:#0F172A;white-space:nowrap;">MyDope <b style="color:#2563EB;font-weight:800;">Off</b></span>';
  }

  /* Navigation — ordre : Accueil, Suivi, Substances, Protocoles, RDR */
  const NAV = [
    { k: 'index', href: 'index.html', label: 'Accueil',
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { k: 'suivi', href: 'suivi.html', label: 'Suivi conso',
      icon: '<path d="M22 7L13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>' },
    { k: 'psychochecker', href: 'psychochecker.html', label: 'Substances',
      icon: '<path d="M11 11m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
    { k: 'fiches', href: 'fiches.html', label: 'Protocoles',
      icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
    { k: 'rdr', href: 'rdr.html', label: 'RDR',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' }
  ];

  function renderNav(active) {
    return '<nav class="bottom-nav">' + NAV.map(n =>
      '<a class="bn-item' + (n.k === active ? ' active on' : '') + '" href="' + link(n.href) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + n.icon + '</svg>' +
      '<span>' + n.label + '</span></a>').join('') + '</nav>';
  }

  function init(opts) {
    opts = opts || {};

    document.querySelectorAll('[data-logo]').forEach(el => {
      el.innerHTML = logoSVG(parseInt(el.getAttribute('data-logo')) || 32, el.hasAttribute('data-mono'));
    });
    document.querySelectorAll('[data-appicon]').forEach(el => {
      el.innerHTML = appIcon(parseInt(el.getAttribute('data-appicon')) || 56);
    });
    document.querySelectorAll('[data-wordmark]').forEach(el => { el.innerHTML = wordmark(); });

    const nav = document.querySelector('[data-nav]');
    if (nav) nav.outerHTML = renderNav(opts.page || '');

    document.querySelectorAll('[data-go]').forEach(a => {
      a.setAttribute('href', link(a.getAttribute('data-go')));
    });

    document.querySelectorAll('[data-back]').forEach(b => {
      b.addEventListener('click', () => { location.href = link('index.html'); });
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  return { user, qs, link, logoSVG, appIcon, wordmark, renderNav, init };
})();
