# PROMPT TO GIVE YOUR AGENT (Claude Code or similar coding agent)

Copy everything below into your agent.

---

You are an expert frontend engineer and product designer. Build me a brand-new personal portfolio website from scratch — do not reuse any code from a previous version. This is a real professional portfolio for a real software engineer, so every fact below is true; do not invent stats, testimonials, client names, or numbers that aren't listed here.

## WHO THIS IS FOR

**Abraham Addisu** — Android Engineer & Mobile App Developer (Kotlin, Jetpack Compose, Flutter)
Addis Ababa, Ethiopia · abrahamaddisu217@gmail.com · +251-963048258
linkedin.com/in/abraham-addisu

Currently a Full Stack Engineer (Android focus) at Medco Technology Solutions, pursuing a B.Sc. in Software Engineering at Bahir Dar University (2023–2027). 2+ years building production mobile apps — native Android and Flutter — plus embedded systems background and an active open-source project.

## TECH STACK (use this — it's proven and gives smooth transitions)

- **React 18 + Vite** for the build
- **Framer Motion** for page/section transitions, scroll-reveal animations, and micro-interactions — this is the key library for the "very smooth transitions" requirement. Use it for: staggered fade/slide-ins on scroll (via `react-intersection-observer` or Framer's `whileInView`), smooth page/section transitions, hover states on cards and buttons, and an animated route/section change if using client-side routing.
- **react-scroll** for smooth anchor scrolling between sections (single-page layout)
- Plain CSS with CSS variables for theming (no heavy UI kit — keep it custom so it doesn't look templated)
- Deployable as a static site (Firebase Hosting, Vercel, or Netlify — ask me which before deploying)

## DESIGN DIRECTION

Soft, clean, calm — not flashy or corporate. Specifically:
- Generous whitespace, soft shadows (no hard drop-shadows), rounded corners (12–20px radius range)
- A muted, cohesive color palette: pick one confident accent color (e.g. a soft indigo/teal) against a near-white or near-black base — avoid neon gradients or overly saturated colors
- Typography: one clean sans-serif for body (e.g. Inter, Manrope, or similar variable font), slightly larger line-height for readability
- Subtle grain/gradient backgrounds are fine if soft; avoid busy patterns
- Every interactive element (buttons, cards, nav links) gets a smooth, understated hover transition (200–350ms ease) — no jarring snaps
- Section transitions on scroll should feel like content gently rising/fading into place, not sliding aggressively
- Fully responsive: mobile-first, test at 375px, 768px, 1024px, 1440px
- Optional but nice: light/dark mode toggle, persisted via local state (not localStorage — use in-memory/session state per artifact constraints if this is built as an artifact; if it's a real deployed site outside artifacts, localStorage is fine there)

## SITE STRUCTURE / SECTIONS

### 1. Hero
- Name, a rotating/typing-effect subtitle cycling through role titles: "Android Engineer", "Mobile App Developer", "Flutter Developer", "Full Stack Engineer"
- One-line value prop (write this fresh, don't copy word-for-word from resume)
- Primary CTA: "Contact Me" (mailto) and "Download Resume" (I'll provide the PDF — build it as a downloadable link with a placeholder file name `abraham_addisu_resume.pdf`, and structure the code so it's trivial for me to swap in either my **Android Developer** resume or **Mobile App Developer** resume depending on who's viewing/what I'm applying to — a simple toggle or two labeled download buttons is fine)
- Links to LinkedIn, GitHub, Upwork, and email. Upwork profile: `https://www.upwork.com/freelancers/~0142f1cf79221e6871` (5.0-star rated freelancer, Android & Flutter development, endorsed for Reliability, Clear Communication, Accountability, Detail Orientation, and Professionalism). GitHub account is linked to Upwork under the handle "Abreham Addisu Ashebir" — use placeholder `href="#"` marked `TODO: confirm exact github.com URL` since the profile page doesn't expose the raw link

### 2. About
- Short narrative: 2+ years hands-on building production mobile apps (native Android + cross-platform Flutter), currently full-time at Medco Technology Solutions building client-facing medical/insurance apps, pursuing B.Sc. Software Engineering at Bahir Dar University
- Emphasize the "requirements → architecture → implementation → deployment" mindset — this person cares about doing the thinking before writing code
- A row of skill tags/pills: Kotlin, Jetpack Compose, Flutter/Dart, Coroutines & Flow, Firebase, REST APIs, MVVM, Room, Socket.io / real-time systems, FusedLocationProviderClient, Embedded Systems (C++), Git/CI-CD, AI-assisted development (Claude, Gemini, Codex)

### 3. Experience (timeline layout)
In reverse-chronological order:
- **Full Stack Engineer (Android Focus)** — Medco Technology Solutions, Apr 2026–Present, Addis Ababa (On-site) — client-facing medical/insurance Android apps, Kotlin + Jetpack Compose, code reviews, CI/CD. Also contributed to a broader range of enterprise engagements at Medco spanning ERP system integrations, a national-level healthcare platform initiative connected to Ethiopia's Ministry of Health, and mobile products for major insurance providers (Nyala Insurance, Awash Insurance, Ethiopian Insurance Corporation). Keep this at the sector/scope level only — do not invent specific feature details, screenshots, or client-facing specifics for these, since they're confidential; a single sentence like "Contributed to enterprise projects across ERP integrations, national health-tech platforms, and insurance-sector mobile products (Nyala, Awash, Ethiopian Insurance Corporation) — specific project details are confidential" is enough.
- **Mobile App Developer, Daga Meter Taxi PLC (Client Project)** — Sep 2025–Jan 2026 — designed and deployed a production ride-hailing system, launched publicly on Google Play under the brand **Abay and Tana Ride** (passenger + driver apps); built real-time ride tracking using Google Maps, a Socket.io-based driver dispatch connection, and FusedLocationProviderClient with a foreground service for background location updates; Firebase Auth, payment gateway integration, FCM push notifications; owned the full release cycle
- **iOS Flutter Developer Intern** — BrainBite (EdTech, Netherlands, remote), Oct 2025–Jan 2026 — cross-platform Flutter features for a children's educational platform, ElevenLabs AI voice integration, async collaboration across time zones
- **Android Developer (Self-Employed)** — Jul 2024–Present, Bahir Dar (Hybrid) — multiple production apps, MVVM, Firebase, Room; built Addis 360; built an Odoo ERP mobile inventory scanner via JSON-RPC
- **Embedded Systems Developer** — BiTec, Bahir Dar University, Dec 2024–Oct 2025 — built HAKI, a real-time power monitoring system (ZMPT101B, ACS712, AHT20 sensors, TFT display, SD-card logging)

### 4. Projects (card grid, this is the centerpiece)
Use real details, structured with: title, one-line role, description, tech tags, and a link if one exists (mark clearly `TODO: add link` where I haven't given you one yet — do not invent a URL):

1. **Abay and Tana Ride** — Production ride-hailing system for Daga Meter Taxi PLC: passenger & driver apps, live on Google Play. Google Maps live tracking, Socket.io-based driver dispatch, payment gateway integration, Firebase Auth, FCM push notifications. Role: Lead Android Developer. Tags: Kotlin, Firebase, Google Maps API, Socket.io, Payment Gateway Integration. *(TODO: paste direct Play Store link — findable via [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=1986412612005994496))*
2. **Addis 360** — Offline-first civic directory app for Addis Ababa: 100% offline local persistence layer, bilingual Amharic/English smart search, zero-latency filtering, maps integration. Role: Creator & Lead Engineer. *(TODO: GitHub/Play Store link)*
3. **ethio_dev_kit** — Open-source 5-package Flutter/Dart toolkit for Ethiopian developers, live on pub.dev, MIT licensed: `ethio_calendar` (Gregorian↔Ethiopian date conversion), `ethiopic_typography` (bilingual theming), `ethio_validators` (phone/currency/Fayda ID format validation), `amharic_stt` (on-device Amharic speech-to-text), `ethio_holidays` (dynamically computed Ethiopian holidays). Role: Creator & Maintainer. *(TODO: pub.dev + GitHub links — I'll supply all five package links)*
4. **HireAI — Bilingual AI Recruitment Platform** — AI-driven hiring platform supporting English and Amharic; candidates can interview in their native language. Replaces manual CV screening with transparent, LLM-based evaluations and a scoring audit trail for recruiters. Handles bilingual audio/text processing and complex app state. Role: Lead AI App Developer. Tags: AI, NLP, API Integration, Mobile App Development. Live: [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=2046123811171459072)
5. **FaydaHealth — AI-Powered Health Record System** — Award-winning health record system integrating Ethiopia's national Fayda ID to unify fragmented medical histories. Includes AI-driven preliminary diagnostics and a localized Amharic AI chatbot for accessibility. Secured 2nd Place at CoBuild Ethiopia AI Hackathon 2025. Role: Lead Developer & AI Integrator. Tags: AI, Kotlin, API Integration, UI Design. Live: [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=2046116849510187008)
6. **Abroid Scan — Offline OCR Text Recognition App** — High-performance productivity app for instant, fully offline Optical Character Recognition; extracts text from live camera feed or gallery images with no internet connection required, using on-device ML. Role: Lead Flutter Developer. Tags: Flutter, Dart, Mobile App Development, UI Design. Live: [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=2046131114654277632)
7. **Custom Odoo ERP Mobile Inventory Scanner** — Mobile-first inventory management app replacing manual warehouse paper logs; integrates directly with Odoo ERP via JSON-RPC, letting warehouse staff scan products and update stock levels in real time. Role: Lead Flutter Developer. Tags: Flutter, Dart, JSON, API Integration. Live: [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=2045579936766205952)
8. **Abroid Recall — Telegram Archive & Journal App** — Native Android productivity app that transforms unstructured Telegram Saved Messages into an organized, searchable archive and daily journal. Built with Kotlin + Jetpack Compose, Clean Architecture and MVVM; integrates TDLib for Telegram API access and Room for fast offline media/document access. Material 3 UI, in-app media playback, advanced local search. Role: Android Developer. Tags: Kotlin, Jetpack Compose, SQLite, Telegram API. Live: [Upwork portfolio entry](https://www.upwork.com/freelancers/~0142f1cf79221e6871?viewMode=1&p=2046127036952322048)
9. **BrainBite** — Cross-platform Flutter features for a children's EdTech platform (Netherlands), ElevenLabs AI voice integration, multilingual/localized UX. Role: iOS Flutter Developer Intern. *(no public link — internal client project)*
10. **HAKI Power Monitor** — Real-time power monitoring system: ZMPT101B/ACS712/AHT20 sensors, TFT display, SD-card logging. Role: Embedded Systems Developer. *(no public link)*

Each card: status badge if relevant (Live / In Development / Deployed), tags as small pills, and a "my role" line — keep this pattern, it reads well to recruiters. The Upwork portfolio-entry links above are real, working URLs (each opens that specific project's detail modal directly) — use them as-is rather than as TODOs.

### 5. Certifications & Awards
Structure this as a clean grid or list, each with an icon, title, issuer, and a "View credential" link — mark every credential URL as a `TODO:` placeholder for me to paste in real Credly/credential links:
- Hult Prize 2026 — Ethiopia National Finalist (top 8 of 600+ university teams)
- Hult Prize 2026 — On-Campus Competition Winner (Bahir Dar University)
- CoBuild Ethiopia AI Hackathon 2025 — 2nd Place (FaydaHealth)
- IBM SkillsBuild — AI Literacy
- IBM SkillsBuild — Data Literacy
- **Anthropic** — Claude 101
- **Anthropic** — Introduction to Claude Cowork
- **Anthropic** — AI Fluency Framework & Foundations
- Udacity — Android Developer Fundamentals
- DevQuest 2025 — International Hackathon Participant (SLIIT)
- Bahir Dar i-Teams: Innovation to Impact Program (Cambridge)

### 5.5 Freelance Track Record (small callout, not a full section)
A compact, low-key strip — not a big "Testimonials" section — placed near Certifications or the end of About. This is real, verified data from Upwork, so it's fine to include now (unlike the earlier "don't fabricate testimonials" rule, which was about *not having* real ones yet):
- 5.0 rating on Upwork, 1 completed project (Flutter Developer — Inventory Scanner MVP, Apr 2026)
- One short paraphrased client line — do not quote verbatim, restate in your own words: the client found Abraham professional, easy to communicate with, detail-oriented, and delivered high-quality work on time
- Client-endorsed tags as small pills: Reliable, Clear Communicator, Accountable for Outcomes, Detail Oriented, Professional
- Small link: "View on Upwork" → `https://www.upwork.com/freelancers/~0142f1cf79221e6871`

### 6. Contact / Footer
- Email, LinkedIn, phone (optional to display publicly — ask me), a simple "Open to remote opportunities" note
- Footer with quick links back to sections and a small line like "Built with React, Vite & Framer Motion"

## ADDITIONAL THINGS WORTH ADDING (your call, but I recommend these)

- **A resume switcher, not just one download button**: since I have two tailored resumes (Android Developer-focused vs. general Mobile App Developer), give me two clearly labeled download buttons or a small toggle, so whoever's viewing gets the right one for the role they're hiring for.
- **A "Currently learning" or "Growing into" mini-section**: I'm honestly building depth in Dagger2, RxJava, and Realm right now. A small, low-key "currently deepening" tag list (not a full section) shows growth mindset without overclaiming skills I don't fully have yet — this reads well to technical recruiters who respect honesty over inflated skill lists.
- **Open Graph / meta tags** so the link looks good when shared on LinkedIn or WhatsApp (title, description, a preview image).
- **Accessibility basics**: semantic HTML, alt text on all images, sufficient color contrast, keyboard-navigable nav and buttons.
- **Fast load**: lazy-load project/certificate images, keep bundle lean, no unnecessary large libraries beyond what's listed above.
- **A favicon and page title** that aren't the Vite default.
- Do NOT add client logos or usage statistics, and do NOT build out a full "Testimonials" section — that content doesn't exist yet. The one small Freelance Track Record callout in section 5.5 is the only exception, since it's real, verified Upwork data.

## WHAT I'LL PROVIDE AFTER YOU BUILD IT
- Real links for GitHub, pub.dev packages, Play Store listing, and credential URLs (wherever you've marked `TODO:`)
- Certificate images/screenshots to drop into the assets folder
- Final resume PDFs (Android Developer version + Mobile App Developer version)
- A profile photo

Build the full site now with clearly marked `TODO:` placeholders wherever a real link or asset is missing — don't block on asking me first, just flag them inline in the code/content so I can find and fill them in easily afterward.
