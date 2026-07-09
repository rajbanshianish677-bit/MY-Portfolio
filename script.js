const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero terminal keeps its content in HTML for crawlers; JS only reveals it.
const typeLine = document.getElementById('typeLine');
const restBlock = document.getElementById('termRest');
const fullText = '> scanning identity... access granted';
let typeIndex = 0;

function revealTerminalRest() {
  restBlock.classList.add('is-visible');
  restBlock.removeAttribute('aria-hidden');
}

function typeChar() {
  if (typeIndex <= fullText.length) {
    typeLine.textContent = fullText.slice(0, typeIndex);
    typeIndex += 1;
    window.setTimeout(typeChar, 28);
    return;
  }

  revealTerminalRest();
}

if (typeLine && restBlock) {
  if (prefersReducedMotion) {
    typeLine.textContent = fullText;
    revealTerminalRest();
  } else {
    window.setTimeout(typeChar, 500);
  }
}

const bars = document.querySelectorAll('.bar-fill');

function fillBar(bar) {
  bar.style.width = `${bar.dataset.width}%`;
}

if (bars.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    bars.forEach(fillBar);
  } else {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillBar(entry.target);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach((bar) => barObserver.observe(bar));
  }
}

// Mobile navigation state lives in CSS; JS only toggles state and ARIA.
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('primaryNav');

function closeNav() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '> message queued - connect a backend or mail service to deliver it.';
  });
}
