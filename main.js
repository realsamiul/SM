// ── SCROLL REVEAL ──
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
})();

// ── NAV ACTIVE + SCROLL BLEND ──
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 80
      ? 'rgba(245,242,236,0.92)'
      : 'transparent';
    nav.style.backdropFilter = window.scrollY > 80 ? 'blur(12px)' : 'none';
    nav.style.mixBlendMode = window.scrollY > 80 ? 'normal' : 'multiply';
    nav.style.transition = 'background 0.3s, backdrop-filter 0.3s';
  }, { passive: true });
})();

// ── MARQUEE DUPLICATE ──
(function () {
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });
})();
