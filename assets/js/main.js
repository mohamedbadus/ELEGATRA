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
     One control writes --lum. The stylesheet re-exposes every photograph
     from it, so dragging this re-lights the page rather than fading a
     decorative overlay. Three things make it behave like real hardware:

       1. a gamma curve, because light output is not linear in dial
          position — a straight mapping puts all the visible change in
          the bottom third, which is what a cheap dimmer feels like;
       2. filament inertia, eased on a frame loop, warming faster than it
          cools, so the glow lingers on the way down;
       3. a colour temperature that falls with the output, which the
          readout states in kelvin alongside the lumens.            */
  var rail = document.getElementById('dim');
  var read = document.getElementById('dimread');

  var GAMMA = 1.6;          // dial position -> light output
  var MAX_LUMENS = 3000;    // a large chandelier, all lamps up
  var K_LOW = 1800, K_HIGH = 2700;

  var target = 0, shown = 0, frame = null;

  function output(pct) { return Math.pow(pct / 100, GAMMA); }

  function label(lum) {
    if (!read) return;
    read.innerHTML =
      '<b>' + Math.round(Math.pow(lum, 1 / GAMMA) * 100) + '%</b>' +
      '<i>' + Math.round(lum * MAX_LUMENS).toLocaleString('en-US') + ' lm</i>' +
      '<i>' + (Math.round((K_LOW + lum * (K_HIGH - K_LOW)) / 50) * 50)
                .toLocaleString('en-US') + ' K</i>';
  }

  function paint(lum) {
    root.style.setProperty('--lum', lum.toFixed(4));
    label(lum);
  }

  function tick() {
    var gap = target - shown;
    if (Math.abs(gap) < 0.0008) {
      shown = target; paint(shown); frame = null; return;
    }
    // heats quicker than it cools, so the glow hangs on coming down
    shown += gap * (gap > 0 ? 0.22 : 0.11);
    paint(shown);
    frame = requestAnimationFrame(tick);
  }

  if (rail) {
    target = shown = output(Number(rail.value));
    paint(shown);

    rail.addEventListener('input', function () {
      target = output(Number(rail.value));
      if (calm) { shown = target; paint(shown); }
      else if (!frame) frame = requestAnimationFrame(tick);
      document.body.classList.add('dim-touched');
    });

    // The hint has done its job the moment the reader engages with the page —
    // past the hero it just floats over the content, so retire it on the first
    // scroll, the first drag, or after a few seconds of nobody biting.
    var retire = function () { document.body.classList.add('dim-touched'); };
    window.addEventListener('scroll', function onFirst() {
      if (window.scrollY < 80) return;
      retire();
      window.removeEventListener('scroll', onFirst);
    }, { passive: true });
    setTimeout(retire, 9000);
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
    // Only hide them once we know the observer is about to run.
    root.classList.add('reveal-ready');

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

  /* ── which section am I in? ─────────────────────────
     A one-page site with a fixed nav should say where you are; without it
     the four links are decoration.                                      */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var seenNow = new Set();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) seenNow.add(e.target); else seenNow.delete(e.target);
      });
      // the topmost section currently crossing the band wins
      var current = sections.filter(function (el) { return seenNow.has(el); })[0];
      links.forEach(function (a) {
        a.classList.toggle('is-current',
          !!current && a.getAttribute('href') === '#' + current.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (el) { spy.observe(el); });
  }

  /* ── parallax on the two full-bleed photographs ─────── */
  if (hasST) {
    [['.hero__pan', '.hero', -9], ['.band__pan', '.band', -13]].forEach(function (cfg) {
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
