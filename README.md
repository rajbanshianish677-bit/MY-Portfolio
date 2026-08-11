# Anish Rajbanshi — Portfolio

A personal portfolio website with a hacker-terminal aesthetic, built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — just open it in a browser.

**Live Site:** [anishrajbanshi.com.np](https://anishrajbanshi.com.np)

**Live look:** green-phosphor CRT terminal theme (JetBrains Mono throughout), an animated **Matrix rain** canvas background, scanline + vignette overlays, a boot-up typing terminal, scroll-triggered skill bars, and command-prompt styling on every section (`root@anish:~$ ./whoami`).

## Sections

- **Hero** — animated terminal card that "boots up" with a typing effect revealing name, role, and status
- **About Me** — bio + a terminal-style `whoami` info block (`$ cat /etc/profile`)
- **Academic Background** — education timeline (BSc (Hons) Computing, Lincoln International College, Nepal)
- **Skills & Tools** — categorized skill bars for Cybersecurity, Networking, Operating Systems, and Programming & Web, framed as `#!/bin/skills` scripts
- **Projects** — case-file style cards, including:
  - Cisco Packet Tracer Network
  - Linux Architecture Study
  - Operating System Scheduling
  - Network Traffic Analysis
  - Python University Management System
  - Tic-Tac-Toe with Minimax AI
- **Currently Learning** — active focus areas with pulsing status indicators
- **Goals** — roadmap-style checklist of long-term goals
- **My Journey** — system-log-style timeline (`$ tail -f /var/log/journey.log`)
- **Beyond Technology** — personal interests outside tech
- **Get In Touch** — contact links (email, LinkedIn, GitHub, Instagram) and a working message form

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (CSS variables) for theming, CSS grid/flexbox layouts, CRT scanline/vignette overlays, glow animations
- **Vanilla JavaScript** — Matrix rain canvas renderer, typing effect, `IntersectionObserver` for scroll-triggered skill bar animation and scroll-spy nav, mobile nav toggle, smooth scroll, form handling

No external JS libraries or frameworks are used. Fonts are loaded from Google Fonts.

## Features

- **Matrix rain background** — canvas-based falling-character rain in phosphor green; pauses when the tab is hidden and is disabled entirely for users who prefer reduced motion
- **CRT terminal aesthetic** — scanline overlay, vignette, text glow, and terminal-chrome window with traffic-light dots
- Fully responsive layout with a mobile nav toggle
- Respects `prefers-reduced-motion` for accessibility
- Animated hero terminal with typewriter effect
- Skill proficiency bars that animate into view on scroll
- Scroll-spy navigation with active-section highlighting and a scroll progress bar
- Smooth in-page scrolling via `data-scroll` attributes
- Contact form with per-field validation and submission feedback, wired to Formspree
- **SEO & AEO Optimized** — Includes rich structured data (JSON-LD), Open Graph metadata, semantic HTML, and an Answer Engine Optimization (AEO) FAQ section.
- **AI-Ready** — Provides `llms.txt` and `robots.txt` for well-behaved crawlers and AI bots.

## Getting Started

This is a static site — no build tools or dependencies required.

```bash
git clone https://github.com/rajbanshianish677-bit/MY-Portfolio.git
cd MY-Portfolio
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
4. Your site will be live at `https://rajbanshianish677-bit.github.io/MY-Portfolio/`

## To-Do / Future Improvements

- Add project links/repos to each case file card
- Add a light "day mode" theme toggle

## Contact

- **Email:** rajbanshianish677@gmail.com
- **LinkedIn:** [linkedin.com/in/anish-rajbanshi](https://www.linkedin.com/in/anish-rajbanshi-0b28783b6/)
- **GitHub:** [github.com/rajbanshianish677-bit](https://github.com/rajbanshianish677-bit)

---

_Built with HTML, CSS & JS. Session terminated safely._
