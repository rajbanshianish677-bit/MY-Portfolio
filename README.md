# Anish Rajbanshi — Portfolio

A personal portfolio website with a cybersecurity/terminal-inspired aesthetic, built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — just open it in a browser.

**Live look:** dark terminal theme, monospace/sans type pairing (JetBrains Mono + Inter), animated typing effect, scroll-triggered skill bars, and a circuit-grid background.

## Sections

- **Hero** — animated terminal card that "boots up" with a typing effect revealing name, role, and status
- **About Me** — bio + a terminal-style `whoami` info block
- **Academic Background** — education timeline (BSc (Hons) Computing, Lincoln International College, Nepal)
- **Skills & Tools** — categorized skill bars for Cybersecurity, Networking, Operating Systems, and Programming & Web
- **Projects** — case-file style cards, including:
  - Cisco Packet Tracer Network
  - Linux Architecture Study
  - Operating System Scheduling
  - Network Traffic Analysis
  - Python University Management System
  - Tic-Tac-Toe with Minimax AI
- **Currently Learning** — active focus areas
- **Goals** — roadmap-style checklist of long-term goals
- **My Journey** — system-log-style timeline of milestones
- **Beyond Technology** — personal interests outside tech
- **Get In Touch** — contact links (email, LinkedIn, GitHub, Instagram) and a message form

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (CSS variables) for theming, CSS grid/flexbox layouts, animations
- **Vanilla JavaScript** — typing effect, `IntersectionObserver` for scroll-triggered skill bar animation, mobile nav toggle, smooth scroll, form handling

No external JS libraries or frameworks are used. Fonts are loaded from Google Fonts.

## Features

- Fully responsive layout with a mobile nav toggle
- Respects `prefers-reduced-motion` for accessibility
- Animated hero terminal with typewriter effect
- Skill proficiency bars that animate into view on scroll
- Smooth in-page scrolling via `data-scroll` attributes
- Contact form with client-side status feedback (not yet wired to a backend/mail service)

## Getting Started

This is a static site — no build tools or dependencies required.

```bash
git clone https://github.com/rajbanshianish677-bit/<repo-name>.git
cd <repo-name>
```

Then just open `index.html` in your browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## Deployment

Works out of the box with any static hosting provider, e.g. GitHub Pages, Netlify, or Vercel. For GitHub Pages:

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set the source branch to `main` (root)
4. Your site will be live at `https://rajbanshianish677-bit.github.io/<repo-name>/`

## To-Do / Future Improvements

- Connect the contact form to a real backend or email service (e.g. Formspree, EmailJS)
- Add project links/repos to each case file card
- Possibly split CSS/JS into separate files for maintainability

## Contact

- **Email:** rajbanshianish677@gmail.com
- **LinkedIn:** [linkedin.com/in/anish-rajbanshi](https://www.linkedin.com/in/anish-rajbanshi-0b28783b6/)
- **GitHub:** [github.com/rajbanshianish677-bit](https://github.com/rajbanshianish677-bit)

---

*Built with HTML, CSS & JS. Session terminated safely.*
