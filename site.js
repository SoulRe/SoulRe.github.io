/*! site.js — sprite, stable nav, contact footer everywhere, languages move, robust filters, sidebar, transitions, GSAP. */
(function () {
  "use strict";
  var d = document, w = window;
  var hasGsap = typeof w.gsap !== "undefined";
  var reduced = w.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ON_PROJECTS = d.body.dataset.page === "projects";
  var ON_HOME = d.body.dataset.page === "home";
  var ON_EXPERIENCE = d.body.dataset.page === "experience";

  /* Contact tiles on EVERY page */
  var CONTACT_ON_ALL_PAGES = true;

  var icon = function (n, cls) {
    return '<svg class="' + (cls || "mz-icon") + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>';
  };

  /* ---------- Embedded sprite (icons.svg stays master over http) ---------- */
  var SPRITE = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g></symbol>' +
    '<symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.6 14.2A8.5 8.5 0 0 1 9.8 3.4a8.5 8.5 0 1 0 10.8 10.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 5h16l-6 7v6l-4 2v-8L4 5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 2c.8 4.9 3.1 7.2 8 8-4.9.8-7.2 3.1-8 8-.8-4.9-3.1-7.2-8-8 4.9-.8 7.2-3.1 8-8z" fill="currentColor"/></symbol>' +
    '<symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 21h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-award" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9.2 13.4L7.5 21l4.5-2.6L16.5 21l-1.7-7.6"/></g></symbol>' +
    '<symbol id="i-grad" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11.5V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-4.5"/><path d="M22 9v6"/></g></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7.5l9 6 9-6"/></g></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-github" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></symbol>' +
    '<symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></symbol>' +
    '<symbol id="i-cloud" viewBox="0 0 24 24"><path d="M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17.8 8.6 4.6 4.6 0 0 1 17.5 19H6.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-network" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 7.8l4.8 8.5M18 7.8l-4.8 8.5"/></g></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.6-3 8.1-7 9.5-4-1.4-7-4.9-7-9.5V6l7-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-server" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01M11 7.5h3M11 16.5h3"/></g></symbol>' +
    '<symbol id="i-briefcase" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V8M3 13h18"/></g></symbol>' +
    '<symbol id="i-terminal" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12.5 15H17"/></g></symbol>' +
    '<symbol id="i-database" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></g></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18"/></g></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></g></symbol>' +
    '<symbol id="i-cpu" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10.5" y="10.5" width="3" height="3"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></g></symbol>' +
    '<symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-folder" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4.2a1 1 0 0 1 .8.4L11.6 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h7l5 5v13H6zM13 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2L4.5 13.5h6L9.5 22 18.5 10H12L13 2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-wifi" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10.5 10.5 0 0 1 13 0M8.7 16a5.8 5.8 0 0 1 6.6 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></g></symbol>' +
    '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11.5L12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-route" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c6 0 6-12 10-12"/></g></symbol>' +
    '<symbol id="i-box" viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/></g></symbol>' +
    '</svg>';

  function injectSprite() {
    var host = d.createElement("div");
    host.id = "mz-sprite";
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    host.innerHTML = SPRITE;
    d.body.insertBefore(host, d.body.firstChild);
    rewriteUses();
    if (location.protocol !== "file:") {
      fetch("icons.svg").then(function (r) { return r.ok ? r.text() : ""; }).then(function (txt) {
        if (txt && txt.indexOf("<symbol") > -1) { host.innerHTML = txt; rewriteUses(); }
      }).catch(function () {});
    }
  }
  function rewriteUses() {
    d.querySelectorAll('use[href*="icons.svg#"]').forEach(function (u) {
      u.setAttribute("href", "#" + u.getAttribute("href").split("#")[1]);
    });
  }

  /* ---------- Tokens + site-wide patches + responsive safety net ---------- */
  var TOKEN_CSS =
    ":root{--bg:#070b12;--bg2:#0b1120;--panel:#0f1726;--line:rgba(148,163,184,.14);--ink:#e8eef7;--mut:#8fa1b8;--acc:#38bdf8;--acc2:#818cf8;--amber:#fbbf24}" +
    "[data-theme=\"light\"]{--bg:#f5f8fc;--bg2:#ffffff;--panel:#ffffff;--line:rgba(15,23,42,.14);--ink:#0b1526;--mut:#46566e;--acc:#0369a1;--acc2:#4f46e5;--amber:#b45309}" +
    "[data-theme=\"light\"] .cat.cloud{color:#0369a1;border-color:rgba(3,105,161,.45)}" +
    "[data-theme=\"light\"] .cat.networking{color:#4f46e5;border-color:rgba(79,70,229,.45)}" +
    "[data-theme=\"light\"] .cat.security{color:#b45309;border-color:rgba(180,83,9,.45)}" +
    "[data-theme=\"light\"] .cat.systems{color:#047857;border-color:rgba(4,120,87,.45)}" +
    "[data-theme=\"light\"] .cat.work{color:#be185d;border-color:rgba(190,24,93,.45)}" +
    "[data-theme=\"light\"] .mz-toggle{background:rgba(255,255,255,.92);color:#0b1526;border-color:rgba(15,23,42,.22)}" +
    ":where(a,button):focus-visible{outline:2px solid var(--acc,#38bdf8);outline-offset:2px;border-radius:6px}" +
    "html,body{overflow-x:clip;max-width:100%}" +
    /* spacing scale */
    "main>section.wrap{padding:88px 26px 0}" +
    "main>section:not(.wrap){padding-top:88px}" +
    ".hero.wrap,.pj-hero.wrap,.xp-hero.wrap,.ct-hero.wrap{padding:88px 26px 0}" +
    ".wrap.pj-layout,.wrap.xp-layout,.wrap.ct-layout{padding:64px 26px 24px}" +
    ".marquee{margin-top:56px}" +
    ".sec-head{margin-bottom:36px}" +
    ".filters{margin-bottom:32px}" +
    ".pj-grid{grid-template-columns:1fr;gap:24px}" +
    ".pc-foot{margin-top:20px;padding-top:18px}" +
    ".xp-section,.ct-section{margin-bottom:64px}" +
    ".site-foot{margin-top:96px;padding:44px 0 112px}" +
    /* counters / typography */
    ".hm b span,.stat b span{font:inherit;color:inherit;letter-spacing:inherit;text-transform:none}" +
    ".hm b em{font-size:.5em}" +
    ".card p,.xp-card p,.xp-card ul li,.pc-sum,.pc-points li,.cc-note,.sub,.sec-head p,.past-card p,.chip-console{line-height:1.7}" +
    ".sec-head h2{line-height:1.22;margin:14px 0 14px}" +
    ".hero h1,.xp-hero h1,.ct-hero h1,.pj-hero h1{line-height:1.1}" +
    ".xp-card{gap:14px}" +
    ".xp-card .xp-org{flex:0 0 auto}" +
    ".xp-card>p:not(.xp-org){flex:1 1 auto}" +
    /* nav: stable sequence + highlight only */
    ".site-head nav{align-items:center;gap:18px}" +
    ".nav-sep{color:var(--mut);opacity:.5;padding:0 4px;user-select:none;font:500 13.5px/1 var(--sans)}" +
    ".site-head nav a.is-here{color:var(--acc);font-weight:600}" +
    /* category tags = clickable filters */
    ".pj-card .cat{cursor:pointer;transition:transform .2s,border-color .2s}" +
    ".pj-card .cat:hover{transform:translateY(-2px);border-color:currentColor}" +
    /* contact tiles */
    ".site-foot .wrap{flex-direction:column;align-items:stretch;gap:26px}" +
    ".foot-row{display:flex;justify-content:space-between;gap:22px;flex-wrap:wrap;align-items:center}" +
    ".mz-contact{display:grid;grid-template-columns:1.35fr 1fr 1fr 1fr;gap:14px}" +
    ".mc-tile{display:flex;flex-direction:column;gap:12px;align-items:stretch;padding:18px;border:1px solid var(--line);border-radius:14px;background:var(--panel);text-decoration:none;transition:border-color .2s,transform .2s}" +
    ".mc-tile:hover{border-color:var(--acc);transform:translateY(-2px)}" +
    ".mc-head{display:flex;gap:10px;align-items:center}" +
    ".mc-tile .mc-ic{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:color-mix(in srgb,var(--acc) 12%,transparent);color:var(--acc);flex:none}" +
    ".mc-tile .mc-ic svg{width:17px;height:17px}" +
    ".mc-tile b{font:700 10.5px/1.4 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}" +
    ".mc-tile span{font:600 13px/1.45 var(--sans);color:var(--ink);overflow-wrap:anywhere}" +
    ".mc-tile .mc-go{margin-left:auto;color:var(--mut);display:grid;place-items:center}" +
    ".mc-tile:hover .mc-go{color:var(--acc)}" +
    ".mc-tile .mc-go svg{width:14px;height:14px}" +
    /* theme-aware loaders */
    "#pt-overlay{position:fixed;inset:0;z-index:190;pointer-events:none;display:flex;opacity:0;visibility:hidden}" +
    "#pt-overlay .pt-panel{flex:1;background:linear-gradient(180deg,var(--bg2),var(--panel));border-right:1px solid var(--line);transform:scaleY(0)}" +
    "#pt-overlay .pt-panel:last-child{border-right:0}" +
    "#pt-overlay .pt-label{position:absolute;inset:0;display:grid;place-items:center;font:700 12px/1 ui-monospace,Menlo,monospace;letter-spacing:.22em;color:var(--acc);text-transform:uppercase;opacity:0}" +
    "[data-theme=\"light\"] #boot{background:#eef2f7}" +
    "[data-theme=\"light\"] .boot-box{color:#46566e}" +
    "[data-theme=\"light\"] .boot-box .ok{color:#047857}" +
    "[data-theme=\"light\"] .boot-bar{background:rgba(15,23,42,.12)}" +
    /* ---------- responsive safety net (every page) ---------- */
    "@media (max-width:980px){" +
      ".hero-grid,.now-grid,.chip-groups,.xp-teaser{grid-template-columns:1fr}" +
      ".pj-layout,.xp-layout,.ct-layout{grid-template-columns:1fr}" +
      ".rail{display:none}" +
      ".site-head nav{display:none}" +
      ".wrap{padding:0 18px}" +
      ".hero.wrap,.pj-hero.wrap,.xp-hero.wrap,.ct-hero.wrap,main>section.wrap{padding-left:18px;padding-right:18px}" +
      ".wrap.pj-layout,.wrap.xp-layout,.wrap.ct-layout{padding-left:18px;padding-right:18px}" +
      ".portrait{width:min(320px,86vw)}" +
      ".p-badge.b1{left:10px}" +
      ".p-badge.b2{left:auto;right:10px}" +
      ".mz-contact{grid-template-columns:1fr 1fr}" +
    "}" +
    "@media (max-width:560px){" +
      ".mz-contact{grid-template-columns:1fr}" +
      ".card,.chip-group,.xp-card,.past-card,.pj-card{padding:22px}" +
      ".site-head .wrap{gap:12px}" +
      ".cv-btn{padding:8px 11px;font-size:12px}" +
      ".portrait-ring{inset:-10px}" +
      ".mc-tile{padding:14px}" +
      ".hero-cta .btn{width:100%;justify-content:center}" +
    "}";

  var DRAWER_CSS =
    ".mz-toggle{position:fixed;left:18px;bottom:18px;z-index:90;display:flex;gap:9px;align-items:center;padding:11px 18px;border-radius:999px;border:1px solid rgba(148,163,184,.3);background:rgba(10,16,26,.85);color:#e2e8f0;backdrop-filter:blur(10px);cursor:pointer;font:600 13px/1 system-ui,sans-serif;letter-spacing:.02em;transition:transform .25s,border-color .25s,color .25s}" +
    ".mz-toggle:hover{transform:translateY(-2px);border-color:#38bdf8;color:#38bdf8}" +
    ".mz-icon{width:16px;height:16px;flex:none}" +
    ".mz-overlay{position:fixed;inset:0;z-index:95;background:rgba(2,6,12,.62);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .35s}" +
    ".mz-overlay.open{opacity:1;pointer-events:auto}" +
    ".mz-drawer{position:fixed;top:0;right:0;bottom:0;z-index:96;width:min(370px,92vw);display:flex;flex-direction:column;background:#0d1420;color:#e2e8f0;border-left:1px solid rgba(148,163,184,.16);transform:translateX(103%);transition:transform .5s cubic-bezier(.22,1,.36,1);box-shadow:-20px 0 60px rgba(0,0,0,.45)}" +
    ".mz-drawer.open{transform:translateX(0)}" +
    ".mz-d-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid rgba(148,163,184,.14)}" +
    ".mz-d-kicker{font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.22em;text-transform:uppercase;color:#38bdf8}" +
    ".mz-d-close{background:none;border:0;color:#94a3b8;cursor:pointer;padding:6px;border-radius:8px;transition:color .2s,background .2s}" +
    ".mz-d-close:hover{color:#fff;background:rgba(148,163,184,.12)}" +
    ".mz-d-nav{flex:1;overflow-y:auto;padding:14px 14px 20px}" +
    ".mz-d-all{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:4px 0 14px;padding:12px 14px;border-radius:12px;border:1px solid rgba(56,189,248,.35);color:#38bdf8;font:600 13px/1 system-ui,sans-serif;text-decoration:none;transition:background .2s}" +
    ".mz-d-all:hover{background:rgba(56,189,248,.1)}" +
    ".mz-d-list{list-style:none;margin:0;padding:0}" +
    ".mz-d-list a{display:grid;grid-template-columns:30px 1fr;gap:4px 12px;padding:11px 12px;border-radius:12px;text-decoration:none;color:#cbd5e1;transition:background .2s,color .2s}" +
    ".mz-d-list a:hover{background:rgba(148,163,184,.09);color:#fff}" +
    ".mz-d-list .num{grid-row:span 2;font:700 11px/1.6 ui-monospace,Menlo,monospace;color:#475569}" +
    ".mz-d-list .t{font:600 13.5px/1.35 system-ui,sans-serif}" +
    ".mz-d-list .cats{font:500 11px/1.4 ui-monospace,Menlo,monospace;color:#64748b;letter-spacing:.04em}" +
    ".mz-d-foot{display:flex;gap:10px;flex-wrap:wrap;padding:16px 22px;border-top:1px solid rgba(148,163,184,.14)}" +
    ".mz-d-foot a{display:flex;align-items:center;gap:7px;color:#94a3b8;text-decoration:none;font:600 12px/1 system-ui,sans-serif;padding:8px 12px;border:1px solid rgba(148,163,184,.2);border-radius:999px;transition:color .2s,border-color .2s}" +
    ".mz-d-foot a:hover{color:#38bdf8;border-color:#38bdf8}" +
    "body.mz-lock{overflow:hidden}";

  var PROJECTS = [
    { id: "multi-region-network",   n: "01", t: "Multi-Region Network & Cloud Infrastructure", cats: ["cloud", "networking", "work"] },
    { id: "secure-iam-access",      n: "02", t: "Secure IAM Access Framework",                 cats: ["security", "cloud"] },
    { id: "scalable-web-app",       n: "03", t: "Scalable Web Application Infrastructure",     cats: ["cloud"] },
    { id: "managed-serverless",     n: "04", t: "Managed & Serverless Deployment",             cats: ["cloud"] },
    { id: "agentless-ec2",          n: "05", t: "Agentless EC2 Management & Automation",       cats: ["cloud", "systems"] },
    { id: "global-static-delivery", n: "06", t: "Global Static Content Delivery",              cats: ["cloud", "networking"] },
    { id: "shared-storage",         n: "07", t: "Shared Storage & Data Transfer",              cats: ["cloud", "systems"] },
    { id: "hybrid-connectivity",    n: "08", t: "Multi-VPC & Hybrid Connectivity",             cats: ["networking", "cloud"] },
    { id: "network-firewall",       n: "09", t: "Perimeter Security — Network Firewall",       cats: ["security", "networking"] },
    { id: "home-lab-ad",            n: "10", t: "Home Lab — Active Directory & Smart Home",    cats: ["systems"] },
    { id: "hybrid-cloud-capstone",  n: "11", t: "Hybrid Cloud Capstone — NTI",                 cats: ["cloud", "networking", "work"] }
  ];

  function injectStyles() {
    var st = d.createElement("style");
    st.textContent = TOKEN_CSS + DRAWER_CSS;
    d.head.appendChild(st);
  }

  /* ---------- stable header + highlight only ---------- */
  var NAV_SPEC = [
    { label: "Who I am now", hash: "now" },
    { label: "Tech stack",   hash: "skills" },
    { label: "Contact",      hash: "contact" },
    { sep: true },
    { label: "Projects & Docs", page: "projects.html" },
    { label: "Experience",      page: "experience.html" },
    { label: "Certificates",    page: "certificates.html" }
  ];
  function norm(p) { return p.replace(/index\.html$/, "").replace(/\/$/, "") || "/"; }
  function isCurrentPage(page) {
    try { return norm(new URL(page, location.href).pathname) === norm(location.pathname); } catch (e) { return false; }
  }
  function buildNav() {
    var nav = d.querySelector(".site-head nav");
    if (!nav) return;
    nav.textContent = "";
    NAV_SPEC.forEach(function (item) {
      if (item.sep) {
        var s = d.createElement("span");
        s.className = "nav-sep"; s.setAttribute("aria-hidden", "true"); s.textContent = "|";
        nav.appendChild(s); return;
      }
      var a = d.createElement("a");
      a.textContent = item.label;
      if (item.hash) {
        a.href = ON_HOME ? "#" + item.hash : "index.html#" + item.hash;
        a.dataset.spy = item.hash;
      } else {
        a.href = item.page;
        if (isCurrentPage(item.page)) { a.setAttribute("aria-current", "page"); a.classList.add("is-here"); }
      }
      nav.appendChild(a);
    });
  }
  function navSpy() {
    if (!ON_HOME || !hasGsap || reduced || !w.ScrollTrigger) return;
    d.querySelectorAll(".site-head nav a[data-spy]").forEach(function (a) {
      var t = d.getElementById(a.dataset.spy);
      if (!t) return;
      ScrollTrigger.create({ trigger: t, start: "top 60%", end: "bottom 60%",
        onToggle: function (self) { a.classList.toggle("is-here", self.isActive); } });
    });
  }

  /* ---------- contact footer on EVERY page ---------- */
  function buildContactFoot() {
    if (!CONTACT_ON_ALL_PAGES && !ON_HOME) return;
    var wrap = d.querySelector(".site-foot .wrap");
    if (!wrap || wrap.querySelector(".mz-contact")) return;
    var row = d.createElement("div"); row.className = "foot-row";
    while (wrap.firstChild) row.appendChild(wrap.firstChild);
    var go = icon("arrow-up-right", "x");
    var c = d.createElement("div"); c.className = "mz-contact";
    c.innerHTML =
      '<a class="mc-tile" href="mailto:mohamed.h.af.zaki@gmail.com"><span class="mc-head"><span class="mc-ic">' + icon("mail") + '</span><b>Email</b><span class="mc-go">' + go + '</span></span><span>mohamed.h.af.zaki@gmail.com</span></a>' +
      '<a class="mc-tile" href="tel:+201551301048"><span class="mc-head"><span class="mc-ic">' + icon("phone") + '</span><b>Phone</b><span class="mc-go">' + go + '</span></span><span>+20 155 130 1048</span></a>' +
      '<a class="mc-tile" href="https://linkedin.com/in/mohamed-hany-zaki" target="_blank" rel="noopener"><span class="mc-head"><span class="mc-ic">' + icon("linkedin") + '</span><b>LinkedIn</b><span class="mc-go">' + go + '</span></span><span>mohamed-hany-zaki</span></a>' +
      '<a class="mc-tile" href="https://github.com/SoulRe" target="_blank" rel="noopener"><span class="mc-head"><span class="mc-ic">' + icon("github") + '</span><b>GitHub</b><span class="mc-go">' + go + '</span></span><span>github.com/SoulRe</span></a>';
    wrap.appendChild(c);
    wrap.appendChild(row);
  }

  /* ---------- languages: live on the main page, removed from experience ---------- */
  function moveLanguages() {
    if (ON_HOME) {
      var old = d.getElementById("langRow");
      if (old) old.remove();
      if (d.getElementById("langBand")) return;
      var st = d.createElement("style");
      st.textContent =
        ".lang-band{margin-top:88px;padding:40px 26px 0;border-top:1px solid var(--line)}" +
        ".lang-band .group-title{margin:0 0 14px}" +
        ".lang-band + .site-foot{margin-top:56px}" +
        "@media (max-width:980px){.lang-band{margin-top:64px;padding-left:18px;padding-right:18px}}";
      d.head.appendChild(st);
      var band = d.createElement("section");
      band.id = "langBand";
      band.className = "lang-band wrap";
      band.innerHTML =
        '<p class="group-title c-pro"><svg class="icon"><use href="#i-globe"></use></svg> Languages</p>' +
        '<ul class="mchips"><li class="mchip c-pro">English — Fluent</li><li class="mchip c-pro">Arabic — Native</li></ul>';
      var foot = d.querySelector(".site-foot");
      (foot ? foot.parentNode : d.body).insertBefore(band, foot || null);
    } else if (ON_EXPERIENCE) {
      var sec = d.getElementById("languages");
      if (sec) sec.remove();
      d.querySelectorAll('.rail-list a[href="#languages"]').forEach(function (a) {
        var li = a.closest("li"); if (li) li.remove();
      });
    }
  }

  function buildDrawer() {
    var items = PROJECTS.map(function (p) {
      var href = ON_PROJECTS ? "#" + p.id : "projects.html#" + p.id;
      return '<li><a class="mz-d-link" href="' + href + '" data-target="' + p.id + '">' +
        '<span class="num">' + p.n + '</span><span class="t">' + p.t + '</span>' +
        '<span class="cats">' + p.cats.join(" · ") + '</span></a></li>';
    }).join("");
    var wrap = d.createElement("div");
    wrap.innerHTML =
      '<button class="mz-toggle" id="mzToggle" aria-label="Open projects sidebar">' + icon("folder") + "<span>Projects</span></button>" +
      '<div class="mz-overlay" id="mzOverlay"></div>' +
      '<aside class="mz-drawer" id="mzDrawer" aria-hidden="true" aria-label="Projects sidebar">' +
        '<div class="mz-d-head"><span class="mz-d-kicker">Projects &amp; Docs</span>' +
        '<button class="mz-d-close" id="mzClose" aria-label="Close sidebar">' + icon("close") + "</button></div>" +
        '<nav class="mz-d-nav"><a class="mz-d-all" href="projects.html">View all projects &amp; docs ' + icon("arrow-right") + "</a>" +
        '<ol class="mz-d-list">' + items + "</ol></nav>" +
        '<div class="mz-d-foot">' +
        '<a href="certificates.html">' + icon("award") + "Certificates</a>" +
        '<a href="https://github.com/SoulRe" target="_blank" rel="noopener">' + icon("github") + "GitHub</a>" +
        '<a href="https://linkedin.com/in/mohamed-hany-zaki" target="_blank" rel="noopener">' + icon("linkedin") + "LinkedIn</a></div>" +
      "</aside>";
    d.body.appendChild(wrap);
    var drawer = d.getElementById("mzDrawer"), overlay = d.getElementById("mzOverlay");
    function open()  { drawer.classList.add("open"); overlay.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); d.body.classList.add("mz-lock"); staggerIn(); }
    function close() { drawer.classList.remove("open"); overlay.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); d.body.classList.remove("mz-lock"); }
    function staggerIn() {
      if (!hasGsap || reduced) return;
      gsap.fromTo(".mz-d-list a, .mz-d-all", { x: 24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .45, ease: "power3.out", stagger: .035, overwrite: true });
    }
    d.getElementById("mzToggle").addEventListener("click", open);
    d.getElementById("mzClose").addEventListener("click", close);
    overlay.addEventListener("click", close);
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    d.querySelectorAll("[data-open-drawer]").forEach(function (b) { b.addEventListener("click", open); });
    d.querySelectorAll(".mz-d-link").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (!ON_PROJECTS) return;
        e.preventDefault(); close();
        var el = d.getElementById(a.dataset.target);
        if (el && hasGsap && !reduced && w.ScrollToPlugin) gsap.to(w, { duration: .8, ease: "power2.inOut", scrollTo: { y: el, offsetY: 86 } });
        else if (el) el.scrollIntoView();
      });
    });
  }

  function buildTheme() {
    d.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var saved = localStorage.getItem("mz-theme");
      if (saved) d.documentElement.dataset.theme = saved;
      var sync = function () {
        var t = d.documentElement.dataset.theme === "light" ? "moon" : "sun";
        btn.querySelectorAll("use[data-theme-icon]").forEach(function (u) { u.setAttribute("href", "#i-" + t); });
      };
      sync();
      btn.addEventListener("click", function () {
        var next = d.documentElement.dataset.theme === "light" ? "dark" : "light";
        d.documentElement.dataset.theme = next;
        localStorage.setItem("mz-theme", next);
        sync();
      });
    });
  }

  /* ---------- ROBUST filters: no Flip, no leftover transforms, no displaced cards ---------- */
  function initFilters() {
    var grid = d.querySelector("[data-project-grid]");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".pj-card"));
    cards.forEach(function (c) {
      c.style.position = ""; c.style.transform = ""; c.style.left = "";
      c.style.top = ""; c.style.width = ""; c.style.height = "";
    });
    var btns = Array.prototype.slice.call(d.querySelectorAll("[data-filter]"));
    function matches(c, f) { return f === "all" || c.dataset.cats.split(" ").indexOf(f) > -1; }
    btns.forEach(function (btn) {
      var f = btn.dataset.filter, b = btn.querySelector("b");
      if (b) b.textContent = f === "all" ? cards.length : cards.filter(function (c) { return matches(c, f); }).length;
      btn.addEventListener("click", function () { apply(f, btn); });
    });
    function apply(f, btn) {
      btns.forEach(function (x) {
        x.classList.toggle("is-active", x === btn);
        x.setAttribute("aria-pressed", x === btn ? "true" : "false");
      });
      var shown = [];
      cards.forEach(function (c) {
        var show = matches(c, f);
        c.classList.toggle("is-out", !show);
        if (show) shown.push(c);
      });
      if (hasGsap && !reduced) {
        gsap.killTweensOf(cards);
        gsap.fromTo(shown, { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: .45, stagger: .05, ease: "power2.out", clearProps: "transform" });
      }
      if (w.ScrollTrigger) ScrollTrigger.refresh();
    }
    /* clicking a category tag on a card filters by it */
    grid.addEventListener("click", function (e) {
      var cat = e.target.closest && e.target.closest(".cat");
      if (!cat) return;
      var btn = d.querySelector('[data-filter="' + cat.textContent.trim().toLowerCase() + '"]');
      if (!btn) return;
      btn.click();
      var bar = d.querySelector(".filters");
      if (bar && hasGsap && w.ScrollToPlugin && !reduced) gsap.to(w, { duration: .6, ease: "power2.inOut", scrollTo: { y: bar, offsetY: 90 } });
    });
  }

  function initTransitions() {
    if (!hasGsap || reduced) return;
    var ov = d.createElement("div");
    ov.id = "pt-overlay";
    ov.innerHTML = '<div class="pt-panel"></div><div class="pt-panel"></div><div class="pt-panel"></div><div class="pt-panel"></div><div class="pt-panel"></div><span class="pt-label"></span>';
    d.body.appendChild(ov);
    var panels = ov.querySelectorAll(".pt-panel"), label = ov.querySelector(".pt-label");
    var navigating = false;
    function isCrossPage(a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return false;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
      if (a.hasAttribute("download") || a.target === "_blank" || a.hasAttribute("data-pt-none")) return false;
      var abs; try { abs = new URL(href, location.href); } catch (e) { return false; }
      if (abs.origin !== location.origin) return false;
      return norm(abs.pathname) !== norm(location.pathname);
    }
    if (!d.getElementById("boot")) {
      gsap.set(ov, { autoAlpha: 1, pointerEvents: "all" });
      gsap.set(panels, { scaleY: 1, transformOrigin: "top" });
      gsap.to(panels, { scaleY: 0, duration: .6, ease: "power3.inOut", stagger: .07, delay: .1,
        onComplete: function () { gsap.set(ov, { autoAlpha: 0, pointerEvents: "none" }); } });
    }
    d.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || !isCrossPage(a) || navigating) return;
      e.preventDefault();
      navigating = true;
      var name = (a.getAttribute("href").split("#")[0] || "index.html").split("/").pop() || "index.html";
      label.textContent = "$ opening " + name;
      gsap.set(ov, { autoAlpha: 1, pointerEvents: "all" });
      gsap.to(label, { opacity: 1, duration: .3, delay: .25 });
      gsap.fromTo(panels, { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: .5, ease: "power3.inOut", stagger: .06,
          onComplete: function () { w.location.href = a.getAttribute("href"); } });
    });
  }

  function animations() {
    var boot = d.getElementById("boot");
    if (!hasGsap) { if (boot) boot.remove(); return; }
    if (w.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (w.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);
    if (reduced) { if (boot) boot.remove(); return; }
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (boot) {
      gsap.set(boot, { display: "flex" });
      tl.from(".boot-line", { autoAlpha: 0, x: -14, duration: .35, stagger: .22 })
        .fromTo(".boot-bar span", { scaleX: 0 }, { scaleX: 1, duration: .7, ease: "power2.inOut", transformOrigin: "left" }, "-=.15")
        .to(boot, { yPercent: -100, duration: .75, ease: "expo.inOut", delay: .15 })
        .add(function () { boot.remove(); if (w.ScrollTrigger) ScrollTrigger.refresh(); });
    }
    tl.from(".site-head", { y: -26, autoAlpha: 0, duration: .7 }, "-=.55")
      .from("[data-intro]", { y: 34, autoAlpha: 0, duration: .85, stagger: .1 }, "-=.4");
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.from(el, { y: 30, autoAlpha: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 87%", once: true }, clearProps: "transform" });
    });
    gsap.utils.toArray("[data-stagger]").forEach(function (el) {
      gsap.from(el.children, { y: 14, autoAlpha: 0, duration: .5, stagger: .05, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }, clearProps: "transform" });
    });
    gsap.utils.toArray("[data-counter]").forEach(function (el) {
      var target = parseFloat(el.dataset.counter), suf = el.dataset.suffix || "";
      var o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: function () { el.textContent = Math.round(o.v) + suf; } });
    });
    gsap.utils.toArray("[data-marquee]").forEach(function (el) {
      gsap.to(el.querySelector("[data-marquee-track]"), { xPercent: -50, ease: "none", duration: 24, repeat: -1 });
    });
    gsap.utils.toArray("[data-tl-line]").forEach(function (line) {
      gsap.to(line, { scaleY: 1, ease: "none",
        scrollTrigger: { trigger: line.closest(".tl"), start: "top 65%", end: "bottom 55%", scrub: .4 } });
    });
    if (w.ScrollTrigger) {
      d.querySelectorAll(".rail-list a").forEach(function (a) {
        var target = d.getElementById(a.getAttribute("href").slice(1));
        if (!target) return;
        ScrollTrigger.create({ trigger: target, start: "top 55%", end: "bottom 55%",
          onToggle: function (self) { if (self.isActive) {
            d.querySelectorAll(".rail-list a").forEach(function (x) { x.classList.remove("is-active"); });
            a.classList.add("is-active");
          } } });
      });
      if (d.querySelector("[data-rail-progress]")) {
        gsap.to("[data-rail-progress]", { scaleY: 1, ease: "none",
          scrollTrigger: { trigger: d.body, start: "top top", end: "bottom bottom", scrub: .3 } });
      }
    }
    d.querySelectorAll('.rail-list a, [data-scrollto]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").split("#")[1], el = id && d.getElementById(id);
        if (!el) return;
        e.preventDefault();
        if (w.ScrollToPlugin) gsap.to(w, { duration: .8, ease: "power2.inOut", scrollTo: { y: el, offsetY: 86 } });
        else el.scrollIntoView();
      });
    });
  }

  d.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    injectSprite();
    buildNav();
    buildContactFoot();
    moveLanguages();
    buildDrawer();
    buildTheme();
    initFilters();
    initTransitions();
    animations();
    navSpy();
  });
})();