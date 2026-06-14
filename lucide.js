/* MyDope Off — socle commun (nav, profil, logo, i18n) */
window.LUCIDE = (function () {

  const KEY = 'ctc_v6';
  const LANG_KEY = 'mydopeoff_lang';
  const LANGS = ['fr', 'en', 'es', 'de'];
  const LANG_NAMES = { fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch' };

  /* ============================================================
     I18N — dictionnaire du "cadre" (UI partagée).
     Pour traduire le contenu (fiches) plus tard : remplir
     window.LUCIDE_FICHES_I18N (voir docs en bas) — aucune
     modification d'architecture nécessaire.
     ============================================================ */
  const DICT = {
    // Navigation
    'nav.home':        { fr: 'Accueil',      en: 'Home',        es: 'Inicio',       de: 'Start' },
    'nav.tracking':    { fr: 'Suivi conso',  en: 'Tracking',    es: 'Seguimiento',  de: 'Tracking' },
    'nav.substances':  { fr: 'Substances',   en: 'Substances',  es: 'Sustancias',   de: 'Substanzen' },
    'nav.protocols':   { fr: 'Protocoles',   en: 'Protocols',   es: 'Protocolos',   de: 'Protokolle' },
    'nav.rdr':         { fr: 'RDR',          en: 'Harm red.',   es: 'RdD',          de: 'Risiko' },
    // Commun
    'common.back':     { fr: 'Accueil',      en: 'Home',        es: 'Inicio',       de: 'Start' },
    'common.back_prev':{ fr: 'Retour',       en: 'Back',        es: 'Atrás',        de: 'Zurück' },
    'common.close':    { fr: 'Fermer',       en: 'Close',       es: 'Cerrar',       de: 'Schließen' },
    'common.save':     { fr: 'Enregistrer',  en: 'Save',        es: 'Guardar',      de: 'Speichern' },
    'common.cancel':   { fr: 'Annuler',      en: 'Cancel',      es: 'Cancelar',     de: 'Abbrechen' },
    'common.add':      { fr: 'Ajouter',      en: 'Add',         es: 'Añadir',       de: 'Hinzufügen' },
    'common.delete':   { fr: 'Supprimer',    en: 'Delete',      es: 'Eliminar',     de: 'Löschen' },
    'common.search':   { fr: 'Rechercher…',  en: 'Search…',     es: 'Buscar…',      de: 'Suchen…' },
    'common.language': { fr: 'Langue',       en: 'Language',    es: 'Idioma',       de: 'Sprache' },
    // Accueil
    'home.intro':      { fr: "Ici, tu n'es pas un dossier : tu gardes les commandes. MyDope Off t'aide à comprendre les substances, mesurer ta consommation et couper la boucle quand tu le décides — sans jugement, sans compte, tout reste sur ton appareil.",
                         en: "Here you're not a case file — you stay in control. MyDope Off helps you understand substances, track your use and break the loop when you decide — no judgement, no account, everything stays on your device.",
                         es: "Aquí no eres un expediente: tú tienes el control. MyDope Off te ayuda a entender las sustancias, medir tu consumo y romper el ciclo cuando tú decidas — sin juicios, sin cuenta, todo se queda en tu dispositivo.",
                         de: "Hier bist du keine Akte — du behältst die Kontrolle. MyDope Off hilft dir, Substanzen zu verstehen, deinen Konsum zu erfassen und den Kreislauf zu durchbrechen, wenn du willst — ohne Urteil, ohne Konto, alles bleibt auf deinem Gerät." },
    'home.spaces':     { fr: 'Les 5 espaces', en: 'The 5 spaces', es: 'Los 5 espacios', de: 'Die 5 Bereiche' },
    'home.welcome':    { fr: 'Bienvenue',    en: 'Welcome',     es: 'Bienvenido',   de: 'Willkommen' },
    'home.welcome_sub':{ fr: 'Commence par tenir ton journal dans Suivi conso.',
                         en: 'Start by keeping your journal in Tracking.',
                         es: 'Empieza llevando tu diario en Seguimiento.',
                         de: 'Beginne mit deinem Tagebuch im Tracking.' },
    'home.tile_track': { fr: 'Journal, coûts, détection, objectifs',
                         en: 'Journal, costs, detection, goals',
                         es: 'Diario, costes, detección, objetivos',
                         de: 'Tagebuch, Kosten, Nachweis, Ziele' },
    'home.tile_subs':  { fr: '270 fiches, interactions, risques',
                         en: '270 substances, interactions, risks',
                         es: '270 fichas, interacciones, riesgos',
                         de: '270 Substanzen, Wechselwirkungen, Risiken' },
    'home.tile_proto': { fr: 'Exercices et jeux anti-craving',
                         en: 'Anti-craving exercises and games',
                         es: 'Ejercicios y juegos anti-craving',
                         de: 'Anti-Craving-Übungen und -Spiele' },
    'home.tile_rdr':   { fr: 'Urgences, centres, conseils',
                         en: 'Emergencies, centres, advice',
                         es: 'Urgencias, centros, consejos',
                         de: 'Notfälle, Zentren, Ratschläge' },
    'home.edit_info':  { fr: 'Modifier mes infos', en: 'Edit my info', es: 'Editar mis datos', de: 'Meine Daten ändern' },
    'home.support':    { fr: 'Soutenir le projet', en: 'Support the project', es: 'Apoyar el proyecto', de: 'Projekt unterstützen' },
    'home.guide_link': { fr: 'Guide d\'utilisation', en: 'User guide', es: 'Guía de uso', de: 'Anleitung' },
    // Suivi
    'track.title':     { fr: 'Suivi conso',  en: 'Tracking',    es: 'Seguimiento',  de: 'Tracking' },
    'track.tab_board': { fr: 'Tableau',      en: 'Board',       es: 'Tablero',      de: 'Übersicht' },
    'track.tab_journal':{ fr: 'Journal',     en: 'Journal',     es: 'Diario',       de: 'Tagebuch' },
    'track.tab_costs': { fr: 'Coûts',        en: 'Costs',       es: 'Costes',       de: 'Kosten' },
    'track.tab_goals': { fr: 'Objectifs',    en: 'Goals',       es: 'Objetivos',    de: 'Ziele' },
    // RDR / interactions génériques
    'inter.title':     { fr: "Vérificateur d'interactions", en: 'Interaction checker', es: 'Verificador de interacciones', de: 'Wechselwirkungs-Check' },
    'inter.analyze':   { fr: 'Analyser les interactions', en: 'Check interactions', es: 'Analizar interacciones', de: 'Wechselwirkungen prüfen' }
  };

  function lang() {
    let l = null;
    try { l = localStorage.getItem(LANG_KEY); } catch (e) {}
    if (l && LANGS.indexOf(l) !== -1) return l;
    const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : 'fr';
  }

  function setLang(l) {
    if (LANGS.indexOf(l) === -1) return;
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    applyI18n();
    document.documentElement.setAttribute('lang', l);
    // notifier les pages qui ont du contenu dynamique à re-rendre
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  function t(keyOrObj, vars) {
    const l = lang();
    let s;
    if (keyOrObj && typeof keyOrObj === 'object') {
      // objet {fr,en,es,de} fourni directement
      s = keyOrObj[l] || keyOrObj.fr || '';
    } else {
      const entry = DICT[keyOrObj];
      s = entry ? (entry[l] || entry.fr) : keyOrObj;
    }
    if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }

  /* Traduit tous les éléments porteurs d'attributs i18n */
  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (DICT[k]) el.textContent = t(k);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.getAttribute('data-i18n-html');
      if (DICT[k]) el.innerHTML = t(k);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const k = el.getAttribute('data-i18n-ph');
      if (DICT[k]) el.setAttribute('placeholder', t(k));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const k = el.getAttribute('data-i18n-aria');
      if (DICT[k]) el.setAttribute('aria-label', t(k));
    });
    // re-render nav (libellés traduits)
    const navEl = document.querySelector('.bottom-nav');
    if (navEl && navEl.getAttribute('data-page') !== null) {
      navEl.outerHTML = renderNav(navEl.getAttribute('data-page') || '');
    }
  }

  /* Sélecteur de langue : remplit tout [data-langselect] */
  function renderLangSelect() {
    document.querySelectorAll('[data-langselect]').forEach(host => {
      const cur = lang();
      host.innerHTML = '<div class="lang-select" style="display:inline-flex;gap:4px;background:var(--soft,#F1F5F9);padding:4px;border-radius:11px;">' +
        LANGS.map(l => '<button type="button" data-setlang="' + l + '" style="border:none;cursor:pointer;font-family:var(--disp,Manrope,sans-serif);font-weight:700;font-size:12px;padding:6px 11px;border-radius:8px;background:' +
          (l === cur ? '#fff' : 'transparent') + ';color:' + (l === cur ? '#2563EB' : '#64748B') +
          (l === cur ? ';box-shadow:0 1px 3px rgba(15,23,42,.08)' : '') + ';">' + l.toUpperCase() + '</button>').join('') +
        '</div>';
      host.querySelectorAll('[data-setlang]').forEach(b => {
        b.addEventListener('click', () => { setLang(b.getAttribute('data-setlang')); renderLangSelect(); });
      });
    });
  }

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

  function logoSVG(size, mono) {
    size = size || 32;
    const ring = mono ? '#fff' : '#2563EB';
    const bar  = mono ? '#fff' : '#0F172A';
    return '<svg viewBox="0 0 48 48" width="' + size + '" height="' + size + '" fill="none" aria-label="MyDope Off">' +
      '<path d="M15.2 13.6a14 14 0 1 0 17.6 0" stroke="' + ring + '" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="24" y1="6" x2="24" y2="22" stroke="' + bar + '" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  function appIcon(size) {
    size = size || 56;
    return '<span style="display:inline-flex;align-items:center;justify-content:center;width:' + size + 'px;height:' + size + 'px;border-radius:' + Math.round(size * .28) + 'px;background:linear-gradient(140deg,#2563EB,#1D4ED8);box-shadow:0 6px 18px rgba(37,99,235,.28);">' +
      logoSVG(Math.round(size * .56), true) + '</span>';
  }

  function wordmark() {
    return '<span style="font-family:var(--disp,Manrope,sans-serif);font-weight:800;letter-spacing:-.02em;color:#0F172A;white-space:nowrap;">MyDope <b style="color:#2563EB;font-weight:800;">Off</b></span>';
  }

  /* Navigation — libellés via clés i18n */
  const NAV = [
    { k: 'index', href: 'index.html', tkey: 'nav.home',
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { k: 'suivi', href: 'suivi.html', tkey: 'nav.tracking',
      icon: '<path d="M22 7L13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>' },
    { k: 'psychochecker', href: 'psychochecker.html', tkey: 'nav.substances',
      icon: '<path d="M11 11m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
    { k: 'fiches', href: 'fiches.html', tkey: 'nav.protocols',
      icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
    { k: 'rdr', href: 'rdr.html', tkey: 'nav.rdr',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' }
  ];

  function renderNav(active) {
    return '<nav class="bottom-nav" data-page="' + (active || '') + '">' + NAV.map(n =>
      '<a class="bn-item' + (n.k === active ? ' active on' : '') + '" href="' + link(n.href) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + n.icon + '</svg>' +
      '<span>' + t(n.tkey) + '</span></a>').join('') + '</nav>';
  }

  function init(opts) {
    opts = opts || {};
    document.documentElement.setAttribute('lang', lang());

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
      b.addEventListener('click', () => {
        if (window.history.length > 1 && document.referrer && document.referrer.indexOf(location.origin) === 0) {
          window.history.back();
        } else {
          location.href = link('index.html');
        }
      });
    });

    applyI18n();
    renderLangSelect();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  return { user, qs, link, logoSVG, appIcon, wordmark, renderNav, init,
           t, lang, setLang, applyI18n, renderLangSelect, LANGS, LANG_NAMES, DICT };
})();
