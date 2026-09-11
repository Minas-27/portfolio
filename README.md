# Abraham Addisu - Portfolio

Personal portfolio website for **Abraham Addisu**, a Full Stack Engineer building healthcare, insurance and logistics systems for Ethiopian users, with a mobile focus in Kotlin, Jetpack Compose and Flutter.

## Overview
This portfolio showcases my professional experience, open-source projects, certifications, and freelance work. It is built with a focus on performance, responsive design, and smooth animations.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Vanilla CSS (Custom Design System with Light/Dark Mode)
- **Animations:** Framer Motion
- **Icons:** Lucide React & React Icons
- **Deployment:** Vercel

## Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Minas-27/portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` to view the site in your browser.

## Site assistant

A small **local** assistant in the corner of the page. No API, no network
request, no key, no cost — it's a keyword matcher over a set of answers written
by hand in `src/data/assistant.js`.

**Why local rather than an LLM:** it can only ever say the exact words in that
file, so it cannot invent, exaggerate or hallucinate anything. Below its match
threshold it says "I don't have an answer written for that" and points at email.
For a portfolio whose whole point is not overstating things, that guarantee is
worth more than fluent answers.

**To add or change an answer:** edit `ENTRIES` in `src/data/assistant.js`. Each
entry is `{ id, keywords, answer }` — `keywords` can be single words or phrases
(phrases score higher). Check any new answer against `MASTER_STORY_CONTEXT.md`
first. The file header lists what must never go in: G's identity, Medco client
names, salary, and any number that isn't already confirmed.

## License
© 2026 Abraham Addisu. All rights reserved.
