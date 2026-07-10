/* ============================================================
   ANISH RAJBANSHI PORTFOLIO — script.js
   UI/UX Audit Pass — All changes commented with [FIX] tags
   ============================================================ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================================================================
   HERO TERMINAL TYPEWRITER
   Hero terminal content lives in HTML for crawlers; JS only reveals it.
   ================================================================ */
const typeLine  = document.getElementById('typeLine');
const restBlock = document.getElementById('termRest');
const fullText  = '> scanning identity... access granted';
let typeIndex   = 0;

function revealTerminalRest() {
  if (!restBlock) return;
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

/* ================================================================
   SKILL BAR ANIMATION (IntersectionObserver)
   ================================================================ */
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

/* ================================================================
   [FIX M6] SCROLL PROGRESS BAR
   Updates a CSS width on a fixed top bar to show reading progress.
   ================================================================ */
const scrollProgressEl = document.getElementById('scrollProgress');

if (scrollProgressEl) {
  function updateScrollProgress() {
    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const docHeight    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressEl.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress(); // Initialise on load
}

/* ================================================================
   [FIX H1/M1] SCROLL SPY — highlights active nav link
   Uses IntersectionObserver to detect which section is most visible.
   ================================================================ */
const navLinks   = document.getElementById('primaryNav');
const allNavLinks = navLinks ? navLinks.querySelectorAll('a[data-section]') : [];

// Map section IDs to their nav anchor
const sectionMap = {};
allNavLinks.forEach((link) => {
  const id = link.dataset.section;
  if (id) sectionMap[id] = link;
});

// Collect all sections that have a nav counterpart
const spySections = Array.from(document.querySelectorAll('section[id]')).filter(
  (s) => sectionMap[s.id]
);

let activeSectionId = null;

function setActiveNav(id) {
  if (id === activeSectionId) return;
  activeSectionId = id;
  allNavLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.section === id);
    // ARIA: mark the active link for screen readers
    link.setAttribute('aria-current', link.dataset.section === id ? 'true' : 'false');
  });
}

if (spySections.length && 'IntersectionObserver' in window) {
  // Track which sections are currently visible
  const visibleSections = new Set();

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSections.add(entry.target.id);
      } else {
        visibleSections.delete(entry.target.id);
      }
    });

    // Pick the section that appears earliest in DOM order among visible ones
    for (const section of spySections) {
      if (visibleSections.has(section.id)) {
        setActiveNav(section.id);
        return;
      }
    }
  }, {
    // rootMargin: activate when section top is within upper 30% of viewport
    rootMargin: '-10% 0px -60% 0px',
    threshold: 0,
  });

  spySections.forEach((s) => spyObserver.observe(s));
}

/* ================================================================
   MOBILE NAVIGATION
   ================================================================ */
const navToggle = document.getElementById('navToggle');
const navIcon   = document.getElementById('navIcon');

function closeNav() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  if (navIcon) navIcon.textContent = '☰';
}

if (navToggle && navLinks) {
  // Toggle open/closed on button click
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent immediately re-closing via document listener
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (navIcon) navIcon.textContent = isOpen ? '✕' : '☰';
  });

  // [FIX H7] Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  // [FIX H7] Close when user clicks outside the nav
  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  // Close nav when a nav link is clicked (single-page navigation)
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

/* ================================================================
   [FIX M11] BACK-TO-TOP BUTTON
   Appears once user scrolls past the hero (~300px), smooth-scrolls to top.
   ================================================================ */
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  function handleBackToTopVisibility() {
    const shouldShow = window.scrollY > 300;
    backToTopBtn.classList.toggle('is-visible', shouldShow);
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  handleBackToTopVisibility(); // Set initial state

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  });
}

/* ================================================================
   [FIX H4/C2] CONTACT FORM — validation + submission feedback
   ================================================================ */
const form       = document.getElementById('contactForm');
const statusEl   = document.getElementById('formStatus');
const submitBtn  = document.getElementById('submitBtn');

// Per-field validation messages
const fieldRules = {
  fname:  { el: null, errorEl: null, validate: (v) => v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).' },
  femail: { el: null, errorEl: null, validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.' },
  fmsg:   { el: null, errorEl: null, validate: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
};

// Resolve field elements after DOM ready
Object.keys(fieldRules).forEach((id) => {
  fieldRules[id].el      = document.getElementById(id);
  fieldRules[id].errorEl = document.getElementById(`${id}-error`);
});

function showFieldError(id, message) {
  const rule = fieldRules[id];
  if (!rule || !rule.errorEl) return;
  rule.errorEl.textContent = message;
  if (rule.el) rule.el.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function clearFieldError(id) {
  showFieldError(id, '');
}

function validateField(id) {
  const rule = fieldRules[id];
  if (!rule || !rule.el) return true;
  const error = rule.validate(rule.el.value);
  showFieldError(id, error);
  return error === '';
}

// [FIX H4] Validate each field on blur (after user leaves the field)
Object.keys(fieldRules).forEach((id) => {
  const rule = fieldRules[id];
  if (rule.el) {
    rule.el.addEventListener('blur', () => validateField(id));
    // Clear error as user types (real-time recovery)
    rule.el.addEventListener('input', () => {
      if (rule.errorEl && rule.errorEl.textContent) {
        validateField(id);
      }
    });
  }
});

if (form && statusEl && submitBtn) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate all fields before submitting
    const allValid = Object.keys(fieldRules).map(validateField).every(Boolean);
    if (!allValid) {
      // Focus the first invalid field
      const firstInvalidId = Object.keys(fieldRules).find((id) => {
        const rule = fieldRules[id];
        return rule.errorEl && rule.errorEl.textContent !== '';
      });
      if (firstInvalidId && fieldRules[firstInvalidId].el) {
        fieldRules[firstInvalidId].el.focus();
      }
      return;
    }

    // Disable form during submission
    submitBtn.disabled   = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent  = '> initializing connection...';
    statusEl.classList.remove('is-error');

    // [FIX C2] Clear message explains the form has no backend yet
    setTimeout(() => {
      statusEl.textContent =
        '> message queued — connect a backend or mail service to deliver it.';
      submitBtn.disabled   = false;
      submitBtn.textContent = 'Send Message';
      form.reset();
      // Clear any residual error messages after reset
      Object.keys(fieldRules).forEach(clearFieldError);
    }, 1200);
  });
}
