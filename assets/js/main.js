/* ═══════════════════════════════════════════════════════════
   ELEGATRA — interaction
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── the dimmer ─────────────────────────────────────────
     One control writes --lum; the stylesheet does the rest. */
  var rail = document.getElementById('dim');
  var read = document.getElementById('dimread');

  function setLight(pct) {
    root.style.setProperty('--lum', (pct / 100).toFixed(3));
    read.value = pct + '%';
  }

  if (rail) {
    setLight(Number(rail.value));
    rail.addEventListener('input', function () {
      setLight(Number(rail.value));
    });
  }

  /* ── masthead state ─────────────────────────────────── */
  var scrolled = false;
  function onScroll() {
    var past = window.scrollY > 24;
    if (past !== scrolled) {
      scrolled = past;
      document.body.classList.toggle('scrolled', past);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobilenav');

  function closeMenu() {
    if (!burger) return;
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

  /* ── scroll reveal ──────────────────────────────────── */
  var targets = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || calm.matches) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    // stagger siblings so a grid lights up in order, not all at once
    var seen = new Map();
    targets.forEach(function (el) {
      var n = seen.get(el.parentNode) || 0;
      seen.set(el.parentNode, n + 1);
      el.style.setProperty('--rd', (n * 90) + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── footer year ────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
