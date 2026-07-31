// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal for cards / timeline items / edu cards
const revealTargets = document.querySelectorAll(
  '.project-card, .skill-group'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Move the pulse dot along the ECG path once it has drawn in
const pulsePath = document.getElementById('pulsePath');
const pulseDot = document.getElementById('pulseDot');

if (pulsePath && pulseDot && !prefersReducedMotion) {
  const pathLength = pulsePath.getTotalLength();
  const peakPoint = pulsePath.getPointAtLength(pathLength * 0.27);
  pulseDot.setAttribute('cx', peakPoint.x);
  pulseDot.setAttribute('cy', peakPoint.y);
}

// Project photo/video galleries: auto-detect missing files, wire up prev/next + dots
function initGalleries() {
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const track = gallery.querySelector('.gallery-track');
    const dotsWrap = gallery.querySelector('.gallery-dots');
    const prevBtn = gallery.querySelector('.gallery-nav.prev');
    const nextBtn = gallery.querySelector('.gallery-nav.next');
    const allMedia = Array.from(track.querySelectorAll('img, video'));
    let index = 0;
    let pending = allMedia.length;

    function checkMedia(el) {
      pending -= 1;
      if (el.tagName === 'IMG' && el.naturalWidth === 0) el.dataset.broken = '1';
      if (el.tagName === 'VIDEO' && (el.error || el.readyState === 0)) el.dataset.broken = '1';
      if (pending === 0) finalize();
    }

    function finalize() {
      allMedia.forEach((el) => {
        if (el.dataset.broken === '1') el.remove();
      });
      const validMedia = Array.from(track.querySelectorAll('img, video'));

      if (validMedia.length === 0) {
        gallery.classList.add('is-empty');
        return;
      }

      const showControls = validMedia.length > 1;

      if (showControls && dotsWrap) {
        validMedia.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
          dot.setAttribute('aria-label', `Lihat item ${i + 1}`);
          dot.addEventListener('click', () => goTo(i));
          dotsWrap.appendChild(dot);
        });
      }

      function updateOverlayVisibility() {
        const currentIsVideo = validMedia[index].tagName === 'VIDEO';
        // Native video controls sit where our arrows/dots would — hide those while a video is showing
        if (prevBtn) prevBtn.style.display = showControls && !currentIsVideo ? '' : 'none';
        if (nextBtn) nextBtn.style.display = showControls && !currentIsVideo ? '' : 'none';
        if (dotsWrap) dotsWrap.style.display = showControls && !currentIsVideo ? '' : 'none';
      }

      function goTo(i) {
        index = (i + validMedia.length) % validMedia.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        validMedia.forEach((el, di) => {
          if (el.tagName === 'VIDEO' && di !== index) el.pause();
        });
        if (dotsWrap) {
          dotsWrap.querySelectorAll('.gallery-dot').forEach((d, di) => {
            d.classList.toggle('is-active', di === index);
          });
        }
        updateOverlayVisibility();
      }

      if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
      updateOverlayVisibility();
    }

    if (allMedia.length === 0) {
      gallery.classList.add('is-empty');
      return;
    }

    allMedia.forEach((el) => {
      if (el.tagName === 'IMG') {
        if (el.complete) {
          checkMedia(el);
        } else {
          el.addEventListener('load', () => checkMedia(el));
          el.addEventListener('error', () => checkMedia(el));
        }
      } else if (el.tagName === 'VIDEO') {
        el.addEventListener('loadedmetadata', () => checkMedia(el));
        el.addEventListener('error', () => checkMedia(el));
        // Force the browser to attempt loading metadata now
        el.load();
      }
    });
  });
}

initGalleries();
