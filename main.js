// ── SCROLL REVEAL (observes .reveal elements)
(function() {
  const revealElements = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('up');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  };
  revealElements();
  // if you add dynamic content later, call revealElements() again
})();

// ── TITLE LINE ANIMATION (ensures .title-line starts invisible and animates)
// Already handled by CSS, but force a repaint if needed
(function() {
  const lines = document.querySelectorAll('.title-line');
  lines.forEach(line => {
    // Force a reflow to ensure animation plays
    void line.offsetHeight;
  });
})();

// ── VIDEO HOVER (play/pause on mouseenter/leave for .project-media)
(function() {
  const medias = document.querySelectorAll('.project-media');
  medias.forEach(media => {
    const video = media.querySelector('video');
    if (!video) return;
    media.addEventListener('mouseenter', () => {
      video.play().catch(e => console.log('Autoplay blocked:', e));
    });
    media.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
    // ensure video does not autoplay on load
    video.pause();
  });
})();

// ── MARQUEE DUPLICATION (for seamless infinite scroll)
(function() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });
})();

// ── NAV BACKGROUND & ACTIVE LINK
(function() {
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
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(245,242,236,0.92)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.mixBlendMode = 'normal';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.mixBlendMode = 'multiply';
    }
    nav.style.transition = 'background 0.3s, backdrop-filter 0.3s';
  }, { passive: true });
})();