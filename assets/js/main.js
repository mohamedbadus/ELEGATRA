/* ═══════════════════════════════════════════════════════════
   ELEGATRA — interaction

   GSAP, ScrollTrigger and Lenis are enhancements loaded from a
   CDN. Every one of them is optional: if a script fails to load
   the page falls back to IntersectionObserver reveals and the
   browser's own scrolling, and nothing below throws.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !calm && typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';

  if (hasST) window.gsap.registerPlugin(window.ScrollTrigger);

  /* ── the dimmer ─────────────────────────────────────────
     One control writes --lum. The stylesheet re-exposes every
     photograph from it, so dragging this actually re-lights
     the page rather than fading a decorative overlay.        */
  var rail = document.getElementById('dim');
  var read = document.getElementById('dimread');
  var MAX_LUMENS = 3000;

  function setLight(pct) {
    root.style.setProperty('--lum', (pct / 100).toFixed(3));
    if (!read) return;
    read.innerHTML = '<b>' + pct + '%</b><i>' +
      Math.round(pct / 100 * MAX_LUMENS).toLocaleString('en-US') + ' lm</i>';
  }

  if (rail) {
    setLight(Number(rail.value));
    rail.addEventListener('input', function () {
      setLight(Number(rail.value));
      document.body.classList.add('dim-touched');
    });
    // the hint gives up on its own if nobody touches it
    setTimeout(function () { document.body.classList.add('dim-touched'); }, 9000);
  }

  /* ── masthead state ─────────────────────────────────── */
  var scrolled = false;
  function onScroll() {
    var past = window.scrollY > 24;
    if (past === scrolled) return;
    scrolled = past;
    document.body.classList.toggle('scrolled', past);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobilenav');

  function closeMenu() {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.hidden = open;
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── smooth scroll (Lenis) ──────────────────────────── */
  var lenis = null;
  if (!calm && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });

    if (hasST) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }

    // in-page links have to go through Lenis or they jump
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        lenis.scrollTo(target, { offset: id === '#top' ? 0 : -60 });
      });
    });
  }

  /* ── reveals ────────────────────────────────────────── */
  var targets = document.querySelectorAll('[data-reveal]');

  if (calm || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    // stagger siblings so a grid lights up in order, not all at once
    var seen = new Map();
    targets.forEach(function (el) {
      var n = seen.get(el.parentNode) || 0;
      seen.set(el.parentNode, n + 1);
      el.style.setProperty('--rd', (n * 95) + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── parallax on the two full-bleed photographs ─────── */
  if (hasST) {
    [['.hero__img', '.hero', -9], ['.band__img', '.band', -13]].forEach(function (cfg) {
      var img = document.querySelector(cfg[0]);
      var box = document.querySelector(cfg[1]);
      if (!img || !box) return;
      window.gsap.to(img, {
        yPercent: cfg[2],
        ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ── footer year ────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
