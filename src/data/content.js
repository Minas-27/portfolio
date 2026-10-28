/* ═══════════════════════════════════════════
   Site Content - Single source of truth
   TODO: markers preserved for Abraham to fill
   ═══════════════════════════════════════════ */

import profilePhotoImg from '../assets/profile-photo.webp';
import hultOnCampusImg from '../assets/hult-on-campus.webp';
import cobuildHackathonImg from '../assets/cobuild-hackathon.webp';
import faydaCobuildPrize from '../assets/projects/fayda-cobuild-prize.webp';
import faydaHultBahirdar from '../assets/projects/fayda-hult-bahirdar.webp';
import faydaHultSeven from '../assets/projects/fayda-hult-seven-teams.webp';
import devquestImg from '../assets/devquest.webp';
import iteamsInnovationImg from '../assets/iteams-innovation.webp';
import wellnessImg from '../assets/wellness.webp';
import upkeepCover from '../assets/projects/upkeep-cover.webp';
import upkeepScan from '../assets/projects/upkeep-scan.webp';
import upkeepExplain from '../assets/projects/upkeep-explain.webp';
import ethioPackages from '../assets/projects/ethio-dev-kit-packages.webp';
import hireaiIcon from '../assets/projects/hireai-icon.webp';
import addisIcon from '../assets/projects/addis-360-icon.webp';
import dagaServiceClass from '../assets/projects/daga-service-class.webp';
import hireaiInterview from '../assets/projects/hireai-interview.webp';
import addisSplash from '../assets/projects/addis-360-splash.webp';
import hakiDevice from '../assets/projects/haki-device.webp';
import hakiMounted from '../assets/projects/haki-mounted.webp';
import hakiFront from '../assets/projects/haki-front-panel.webp';
import hakiInternals from '../assets/projects/haki-internals.webp';
import hakiReadings from '../assets/projects/haki-tv-readings.webp';
import hakiRelay from '../assets/projects/haki-relay-wiring.webp';
import hakiCnc from '../assets/projects/haki-cnc.webp';
import hultLogo from '../assets/logos/hult-prize.png';
import oneYoungWorldLogo from '../assets/logos/one-young-world.png';
import anthropicLogo from '../assets/logos/anthropic.svg';

export const personalInfo = {
  name: 'Abraham Addisu',
  email: 'abrahamaddisu217@gmail.com',
  telegram: 'https://t.me/abroid0',
  location: 'Ethiopia · Working remotely worldwide',
  linkedin: 'https://linkedin.com/in/abraham-addisu',
  github: 'https://github.com/Minas-27',
  upwork: 'https://www.upwork.com/freelancers/~0142f1cf79221e6871',
  roles: [
    'Mobile & Full Stack Engineer',
    'Android Engineer (Kotlin & Compose)',
    'Flutter Developer',
  ],
  education: 'B.Sc. in Software Engineering, Bahir Dar University, expected 2027.',
  valueProp:
    'I build mobile apps people rely on, Android and Flutter, from the first screen to the store listing. Healthcare, insurance and transport, built for markets where a stable connection is not a given.',
  // The first line of valueProp, for the hero.
  tagline: 'I build mobile apps people rely on, Android and Flutter, from the first screen to the store listing.',
  resumes: {
    // Bump the version when the PDF changes, otherwise browsers and the
    // CDN keep serving the cached old one from the same filename.
    main: '/assets/abraham_addisu_resume.pdf?v=2026-10-28',
  },
  profilePhoto: profilePhotoImg,
  // Short on purpose: the page says who, the detail lives in the CV and the chat.
  about: [
    'Mobile engineer shipping production Android and Flutter apps for over two years. Full Stack Engineer at Medco Technology Solutions, and maintainer of ethio_dev_kit and upkeep on pub.dev.',
  ],
};

/* Section headings and intros, word for word as they were written.
   The layout decides case and size; the words live here. */
export const sectionCopy = {
  projects: {
    label: 'Projects',
    title: 'Selected Work',
    subtitle: 'Apps that shipped and packages people install. Open one for the full story.',
    more: 'More work',
  },
  about: { label: 'About', title: 'Who I Am', skills: 'Core Skills' },
  services: {
    label: 'Services',
    title: 'What I Can Deliver',
    subtitle: 'I start with the problem, not the code, and own it from planning to deployment.',
    process: 'How I Work',
    pricing: {
      title: 'How I Price',
      note: 'There is no rate card. The number comes from the scope.',
      points: [
        {
          title: 'Scope and features',
          body: 'Each project is priced from what it has to do. The features, the platforms, and how much already exists all change the work, so they change the price.',
        },
        {
          title: 'You decide',
          body: 'You get the scope written out, what is included and what is not, and a price for that scope. Nothing starts until you have chosen.',
        },
        {
          title: 'Plain language',
          body: 'If you are not technical, the scope is explained so you can follow it. You should understand what you are paying for before you say yes.',
        },
      ],
    },
    cta: {
      rated: '5-star rated on Upwork,',
      profile: 'View Profile',
      ask: 'Have a project in mind?',
      talk: "Let's talk",
    },
  },
  experience: { label: 'Experience', title: "Where I've Worked" },
  certifications: {
    label: 'Recognition',
    title: 'The receipts',
    subtitle: 'Competitions, programmes, and the credentials behind them.',
  },
  contact: {
    label: 'Contact',
    title: "Let's build your next app",
    // The closing headline: the second part is set in the accent.
    band: ["Let's build", 'your next app'],
    subtitle: 'Open to freelance projects. Have a project in mind? Let\'s talk.',
  },
};

export const upworkProfile = personalInfo.upwork;

export const services = [
  {
    title: 'Android & Flutter Apps, End to End',
    short: 'Android & Flutter',
    summary: 'Kotlin and Compose, or Flutter for both platforms. Architecture to Play Store, then the maintenance.',
    description: 'Native Android in Kotlin and Jetpack Compose, or Flutter when one codebase has to serve both platforms. Architecture, Figma-to-code, Firebase, Play Store release, and maintenance after it ships.',
  },
  {
    title: 'Healthcare & Insurance Mobile Systems',
    short: 'Healthcare & Insurance',
    summary: 'Claims, underwriting and payment apps wired into systems that were already running.',
    description: 'Client-facing apps for claims, underwriting, motor insurance and payments, wired into backend systems that were already running before I arrived. This is the day job, and most of the difficulty is understanding the workflow rather than writing the screen.',
  },
  {
    title: 'Real-Time & Location Features',
    short: 'Real-Time & Location',
    summary: 'Live tracking and driver dispatch, proven on a ride-hailing platform with real passengers.',
    description: 'Live tracking, ride-matching and driver dispatch with Socket.io and FusedLocationProviderClient running in a foreground service. Proven in a ride-hailing platform carrying real passengers and drivers, not a demo.',
  },
  {
    title: 'Payment & Messaging Integrations',
    short: 'Payments & Messaging',
    summary: 'Chapa payments and AfroMessage SMS in a platform that moves real money daily.',
    description: 'Live payment and SMS rails in a platform that moves real money daily, Chapa and AfroMessage in my case, but the work is the same anywhere: failure states, retries, reconciliation, and the support calls when the gateway says one thing and the app says another. Local providers are usually the part nobody has documented.',
  },
  {
    title: 'Super App Mini Apps',
    short: 'Super App Mini Apps',
    summary: 'Mini Apps that reach users inside a super app they already have, built with Macle.',
    description: 'Mini Apps let you reach users inside a platform they already have, instead of persuading them to install something new. I have built in that model and worked with Macle, the development environment behind a national telecom super app, the same pattern as WeChat, Grab or Line, and a route most teams have never shipped against.',
  },
  {
    title: 'Offline-First & Deep Localisation',
    short: 'Offline-First & Localisation',
    summary: 'Apps that work offline and get a market right. Open-sourced for Ethiopia as ethio_dev_kit.',
    description: 'Apps that work with the connection switched off, and that get a market right rather than merely translated: a second calendar system, a non-Latin script, local phone and currency formats, regional address data. I open-sourced my version of that for Ethiopia as ethio_dev_kit, the same problems exist across most markets outside the US and EU.',
  },
];

export const processSteps = [
  'Discovery & Requirements',
  'Architecture & Design Handoff',
  'Build',
  'Test',
  'Deploy',
  'Post-Launch Support'
];

export const skillGroups = [
  {
    label: 'Mobile',
    items: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDK', 'Flutter', 'Dart', 'MVVM', 'Coroutines & Flow',
      'FusedLocationProviderClient', 'Offline-first Architecture'],
  },
  {
    label: 'Backend & data',
    items: ['REST APIs', 'API Integration', 'JSON-RPC', 'Firebase', 'SQLite', 'Room', 'Socket.io / Real-time Systems'],
  },
  {
    label: 'Payments & local platforms',
    items: ['Chapa (payments)', 'AfroMessage (SMS)', 'Super App Mini Apps', 'Macle'],
  },
  {
    label: 'Practice',
    items: ['Git / CI-CD', 'Clean Architecture', 'Code Review', 'UI Implementation',
      'AI-assisted Development (Claude, Gemini, Codex)'],
  },
  { label: 'Systems', items: ['Embedded Systems (C++)', 'Sensors & Microcontrollers'] },
];

export const skills = skillGroups.flatMap((g) => g.items);

/* Mirrors LinkedIn. Roles at the same company sit next to each other;
   the Experience section groups them under one heading. */
export const experiences = [
  {
    title: 'Software Development Lead',
    type: 'Part-time',
    summary: 'Leading the software track of ASIP\'s Develop and Test month. The live build is the African Impact Hall of Fame.',
    company: 'Doubleyou Centre',
    date: 'Oct 2026 - Present',
    location: 'Remote, Africa',
    description:
      'Software Development Lead for October 2026 at the African Student Impact Program, Doubleyou Centre\'s pan-African fellowship of student builders from more than 18 African countries. I set the software direction for our Develop and Test month with the founder and the leadership team. The live build is the African Impact Hall of Fame; Labari and GLOVE stay on the programme roadmap.',
    points: [
      'Leading the software track across a cohort drawn from West, East, Northern, and Southern Africa',
      'Building with fellows, not only reviewing them at the deadline',
      'Holding the work to real claims: what we show in public has to be what we have actually built',
    ],
  },
  {
    title: 'ASIP Fellow',
    summary: 'Inaugural cohort of the African Student Impact Program.',
    company: 'Doubleyou Centre',
    date: 'Sep 2026 - Present',
    location: 'Remote, Africa',
    description:
      'Selected as a Fellow in the inaugural cohort of the African Student Impact Program (ASIP), a Pan-African fellowship of students and young professionals turning education, skills, and ideas into practical impact. Leadership sessions, collaborative work, mentorship, and conversations with changemakers across Africa, contributing a perspective from Ethiopia.',
  },
  {
    title: 'Full Stack Engineer',
    type: 'Full-time',
    summary: 'Web and mobile apps for healthcare and insurance clients.',
    company: 'Medco Technology Solutions',
    date: 'Apr 2026 - Present',
    location: 'Addis Ababa on-site, remote since Sep 2026',
    description:
      'Developing and optimising scalable web and mobile applications for healthcare and insurance clients. Architecting frontend and backend together with cross-functional teams, translating complex product requirements into production-ready features, code review and CI/CD.',
  },
  {
    title: 'Software Engineer',
    type: 'Internship',
    summary: 'Unpaid to paid within a month, full-time offer by the third.',
    company: 'Medco Technology Solutions',
    date: 'Feb 2026 - Apr 2026',
    location: 'Addis Ababa',
    description:
      'Joined unpaid, became paid within the first month, offered the full-time role by the third. Worked across the full lifecycle from requirement analysis to testing and deployment on client applications in healthcare and insurance, including Odoo ERP integrations and mobile development.',
  },
  {
    title: 'Freelance Full Stack & Mobile Engineer',
    summary: 'Technical partner for founders digitising manual operations. Featured: the Daga Taxi ride-hailing platform.',
    company: 'Self-employed',
    date: 'Jun 2025 - Present',
    location: 'Bahir Dar, Ethiopia · Hybrid',
    description:
      'Technical partner for non-technical founders and traditional service companies digitising manual operations. Featured work: a regional transport client ran entirely on manual dispatching, so I architected and built a complete ride-hailing ecosystem, passenger and driver apps, launched on Google Play as Daga Taxi. System architecture and database design, real-time tracking and driver dispatch, Chapa payments and AfroMessage SMS, QA and Play Store deployment. They moved from manual dispatching to a working digital platform.',
  },
  {
    title: 'Dala Studio Campus Ambassador',
    type: 'Part-time',
    summary: 'Selected by Gebeya to support the student developer community on campus.',
    company: 'Gebeya Inc.',
    date: 'Apr 2026 - Jun 2026',
    location: 'Ethiopia · Hybrid',
    description:
      'Selected as a Dala Studio Campus Ambassador by Gebeya: engaging with the student developer community, sharing resources and supporting initiatives on campus.',
  },
  {
    title: 'iOS Flutter Developer',
    type: 'Internship',
    summary: 'Flutter features for a children\'s learning platform, with ElevenLabs voice.',
    company: 'BrainBite',
    date: 'Oct 2025 - Jan 2026',
    location: 'Netherlands · Remote',
    description:
      'Built cross-platform Flutter features for BrainBite, an EdTech platform focused on personalised learning for children. Integrated ElevenLabs AI voice synthesis and collaborated asynchronously across time zones.',
  },
  {
    title: 'Embedded Systems Developer',
    summary: 'Built HAKI, a real-time power monitor, with three teammates.',
    company: 'BiTec, Bahir Dar University',
    date: 'Dec 2024 - Oct 2025',
    location: 'Bahir Dar · On-site',
    description:
      'Built HAKI, a real-time power monitoring system, with three teammates at the university incubation centre. ZMPT101B, ACS712 and AHT20 sensors, TFT display, SD-card logging. Its first load was the centre\'s own smart TV: it ran for over a month measuring exactly what a television draws. Shown at conferences and entered into university and incubation-centre competitions.',
  },
];

export const projects = [
  {
    title: 'upkeep',
    summary: 'Tells you the truth about a Flutter project\'s dependency health. Live on pub.dev.',
    featured: true,
    role: 'Creator & Maintainer',
    description:
      'Open-source command-line tool that tells you the truth about a Flutter or Dart project\'s health. pub get warns about packages marked discontinued, but most abandoned packages are never marked, they just stop. upkeep scan reports discontinued, incompatible and abandoned dependencies with the evidence behind every verdict, and checks Gradle, AGP and JDK versions against Google\'s published Android requirements. upkeep fix --apply makes only the changes it can justify, verifies them with pub get, and restores every file if that fails. Also runs as a GitHub Action. Live on pub.dev, MIT licensed.',
    tags: ['Dart', 'CLI', 'Developer Tools', 'Open Source', 'pub.dev'],
    status: 'Live',
    link: 'https://upkeep.abroid.dev',
    // Screenshots of the live site, 2x. `device` picks the frame they sit in.
    images: [
      { src: upkeepCover, alt: 'upkeep website: Your dependencies are dying. Know first. Fix fast.', device: 'browser', url: 'upkeep.abroid.dev' },
      { src: upkeepScan, alt: 'upkeep scan output: discontinued, at-risk and SDK-blocked packages, plus an Android build check', device: 'browser', url: 'upkeep.abroid.dev' },
      { src: upkeepExplain, alt: 'upkeep explain: the verdict for a package and the pub.dev facts behind it', device: 'browser', url: 'upkeep.abroid.dev' },
    ],
  },
  {
    title: 'Daga Taxi',
    summary: 'Production ride-hailing system: passenger and driver apps, live on Google Play.',
    featured: true,
    role: 'Lead Android Developer',
    description:
      'Production ride-hailing system for Daga Meter Taxi PLC: passenger & driver apps, live on Google Play. Google Maps live tracking, Socket.io-based driver dispatch, Chapa payments, AfroMessage SMS, Firebase Auth and FCM push notifications.',
    tags: ['Kotlin', 'Firebase', 'Google Maps API', 'Socket.io', 'Chapa', 'AfroMessage'],
    status: 'Live',
    link: 'https://play.google.com/store/apps/details?id=com.dagaride.passenger',
    images: [
      { src: dagaServiceClass, alt: 'Daga Taxi passenger app: choose Normal or VIP taxi, then confirm and find a driver', device: 'phone', w: 591, h: 1280 },
    ],
  },
  {
    title: 'ethio_dev_kit',
    summary: 'Six-package Flutter toolkit for Ethiopian developers. Live on pub.dev.',
    featured: true,
    role: 'Creator & Maintainer',
    description:
      'Open-source 6-package Flutter/Dart toolkit for Ethiopian developers, live on pub.dev, MIT licensed: ethio_calendar (Gregorian↔Ethiopian date conversion), ethiopic_typography (bilingual theming), ethio_validators (phone/currency/Fayda ID format validation), amharic_stt (Amharic speech-to-text support, wrapping an existing speech engine so Amharic works inside Flutter), ethio_holidays (dynamically computed Ethiopian holidays), ethio_address (Region → Zone → Woreda data with cascading picker widgets).',
    tags: ['Flutter', 'Dart', 'Open Source', 'pub.dev'],
    status: 'Live',
    link: 'https://pub.dev/publishers/abroid.dev',
    images: [
      { src: ethioPackages, alt: 'pub.dev listing of the ethio_dev_kit packages: ethio_calendar, ethiopic_typography, ethio_validators, amharic_stt', device: 'browser', url: 'pub.dev/publishers/abroid.dev' },
    ],
  },
  {
    title: 'HireAI - Bilingual AI Recruitment Platform',
    summary: 'AI hiring platform where candidates interview in English or Amharic.',
    featured: true,
    role: 'Lead AI App Developer',
    description:
      'AI-driven hiring platform supporting English and Amharic; candidates can interview in their native language. Replaces manual CV screening with transparent, LLM-based evaluations and a scoring audit trail for recruiters. Handles bilingual audio/text processing and complex app state.',
    tags: ['Flutter', 'Dart', 'Google Gemini', 'ElevenLabs', 'Voiceflow', 'Addis AI'],
    status: 'Open source',
    link: 'https://github.com/Minas-27/HireAI',
    icon: hireaiIcon,
    images: [
      { src: hireaiInterview, alt: 'HireAI: an AI interview in Amharic, the interviewer speaking and a hold-to-speak button', device: 'phone', w: 576, h: 1280 },
    ],
  },
  {
    title: 'FaydaHealth: Unified Medical History on Fayda ID',
    summary: 'Health records on Fayda ID, pitched with Nova Tech. CoBuild 2nd place, Hult Prize campus winner, top 8 of 600+ at the Ethiopia national final.',
    featured: true,
    role: 'Developer, team of four (Nova Tech)',
    description:
      'A team of four, Nova Tech, took FaydaHealth through three rounds. 2nd place at the CoBuild Ethiopia AI Hackathon 2025. Hult Prize on-campus winner at Bahir Dar University. Then one of the top 8 of 600+ teams at the Hult Prize Ethiopia national final.\n\nThe idea is one medical history per person, keyed to Ethiopia\'s national Fayda ID, with AI-assisted preliminary triage and an Amharic chatbot in the pitch build. Built and pitched, not deployed.',
    tags: ['AI', 'Kotlin', 'API Integration', 'UI Design'],
    status: 'Pitched', // built and pitched, never deployed
    link: 'https://www.linkedin.com/posts/abraham-addisu_cobuildabrethiopiaabraiabrhackathonabr2025-activity-7402093729572126720-lDga?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
    images: [
      { src: faydaCobuildPrize, alt: 'Abraham Addisu with the CoBuild Ethiopia AI Hackathon trophy and 2nd place certificate', device: 'proof', w: 337, h: 576 },
      { src: faydaHultBahirdar, alt: 'Hult Prize Ethiopia 2026, Bahir Dar University: Nova Tech (FaydaHealth), Ruth Gizat, Abraham Addisu, Tewodros Gebeyaw and Yonatan Aysheshim', device: 'proof', w: 1024, h: 724 },
      { src: faydaHultSeven, alt: 'Hult Prize Ethiopia 2026 poster of the seven on-campus winning teams, ahead of the national competition on 25 April', device: 'proof', w: 1024, h: 724 },
    ],
  },
  {
    title: 'Addis 360',
    summary: 'Offline-first civic directory for Addis Ababa with bilingual search.',
    featured: true,
    role: 'Creator & Lead Engineer',
    description:
      'Offline-first civic directory app for Addis Ababa: 100% offline local persistence layer, bilingual Amharic/English smart search, zero-latency filtering, maps integration.',
    tags: ['Kotlin', 'Room', 'Google Maps', 'Offline-first'],
    status: 'Open source',
    link: 'https://github.com/Minas-27/Addis-360',
    icon: addisIcon,
    images: [
      { src: addisSplash, alt: 'Addis 360 launch screen: Your City, One Tap Away', device: 'phone', w: 591, h: 1280 },
    ],
  },
  {
    title: 'Custom Odoo ERP Mobile Inventory Scanner',
    summary: 'Warehouse scanner app that updates Odoo ERP stock in real time.',
    role: 'Lead Flutter Developer',
    description:
      'Mobile-first inventory management app replacing manual warehouse paper logs; integrates directly with Odoo ERP via JSON-RPC, letting warehouse staff scan products and update stock levels in real time.',
    tags: ['Flutter', 'Dart', 'JSON', 'API Integration'],
    status: 'Open source',
    link: 'https://github.com/Minas-27/Mobile-Inventory-Scanner',
  },
  {
    title: 'Abroid Scan - Offline OCR Text Recognition App',
    summary: 'Fully offline text recognition from the camera or gallery.',
    role: 'Lead Flutter Developer',
    description:
      'High-performance productivity app for instant, fully offline Optical Character Recognition; extracts text from live camera feed or gallery images with no internet connection required, using on-device ML.',
    tags: ['Flutter', 'Dart', 'Mobile App Development', 'UI Design'],
    status: 'Open source',
    link: 'https://github.com/Minas-27/Abroid-Scan',
  },
  {
    title: 'Abroid Recall - Telegram Archive & Journal App',
    summary: 'Turns Telegram Saved Messages into a searchable archive and journal.',
    role: 'Android Developer',
    description:
      'Native Android productivity app that transforms unstructured Telegram Saved Messages into an organized, searchable archive and daily journal. Built with Kotlin + Jetpack Compose, Clean Architecture and MVVM; integrates TDLib for Telegram API access and Room for fast offline media/document access. Material 3 UI, in-app media playback, advanced local search.',
    tags: ['Kotlin', 'Jetpack Compose', 'SQLite', 'Telegram API'],
    status: 'Private',
    // Repo is private (404 publicly); restore the link if it is made public.
    link: null,
  },
  {
    title: 'HAKI: Real-Time Power Monitor',
    summary: 'Sensor-based power monitor that measured a smart TV for over a month.',
    featured: true,
    images: [
      { src: hakiDevice, alt: 'HAKI power monitor: the finished unit with its socket, switch, display and power cable', device: 'photo', w: 720, h: 1280 },
      { src: hakiMounted, alt: 'HAKI mounted on the wall with its display lit', device: 'photo', w: 1600, h: 1191 },
      { src: hakiReadings, alt: 'Power Monitoring Data, TvOn: HAKI power readings from the smart TV over time', device: 'photo', w: 1280, h: 612 },
      { src: hakiFront, alt: 'The HAKI enclosure front panel', device: 'photo', w: 1600, h: 1193 },
      { src: hakiInternals, alt: 'Inside HAKI: wiring and sensor modules', device: 'photo', w: 1600, h: 1194 },
      { src: hakiRelay, alt: 'HAKI wiring with a relay module during assembly', device: 'photo', w: 1200, h: 1600 },
      { src: hakiCnc, alt: 'Enclosure panels being cut on a CNC router', device: 'photo', w: 1600, h: 1200 },
    ],
    role: 'Embedded Systems Developer, team of four',
    description:
      'Sensors reading voltage, current, power, temperature and humidity into a microcontroller, live on a TFT screen and logged to SD. Built at the university incubation centre; its first load was the centre\'s own smart TV, which it measured continuously for over a month.',
    tags: ['C++', 'Embedded Systems', 'IoT', 'Sensors'],
    status: 'Live',
    link: 'https://www.linkedin.com/posts/abraham-addisu_hakitechnologies-bitec-embeddeddevice-activity-7351646391879815168-LpYe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
    linkNote: null,
  },
];

export const issuerLogos = {
  'Hult Prize Foundation': hultLogo,
  'One Young World Academy': oneYoungWorldLogo,
  Anthropic: anthropicLogo,
};

export const certifications = [
  { title: 'Hult Prize 2026: Ethiopia National Finalist', issuer: 'Hult Prize Foundation', date: 'Jun 2026', detail: 'FaydaHealth, with Nova Tech. Top 8 of 600+ university teams', credentialId: '99956319-0b92-47d7-bacc-ce05e78a7a79', link: 'https://credsverse.com/credentials/99956319-0b92-47d7-bacc-ce05e78a7a79' },
  { title: 'Hult Prize 2026: On-Campus Competition Winner', issuer: 'Hult Prize Foundation', date: 'Feb 2026', detail: 'FaydaHealth, Bahir Dar University, with Nova Tech', image: hultOnCampusImg },
  { title: 'CoBuild Ethiopia AI Hackathon 2025: 2nd Place', issuer: 'Entrepreneurship Development Institute (EDI), Ethiopia', date: 'Nov 2025', detail: 'FaydaHealth', image: cobuildHackathonImg },
  { title: 'Global and Planetary Security', issuer: 'One Young World Academy', date: 'Sep 2026', detail: '', credentialId: 'e35919ff-5879-4604-8eb3-910d64775ca1', link: 'https://www.credly.com/badges/e35919ff-5879-4604-8eb3-910d64775ca1/public_url' },
  { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Jul 2026', detail: '', credentialId: 'bngf5pd9g4r4', link: 'https://verify.skilljar.com/c/bngf5pd9g4r4' },
  { title: 'Wellness Hackathon 2026', issuer: 'ALX Ethiopia', date: 'Jun 2026', detail: 'Participant', image: wellnessImg },
  { title: 'DevQuest 2025: International Hackathon', issuer: 'SLIIT', date: '2025', detail: 'Participant', image: devquestImg },
  { title: 'Innovation to Impact Program', issuer: 'Bahir Dar i-Teams (Cambridge)', date: '2025', detail: '', image: iteamsInnovationImg },
];

export const freelanceRecord = {
  rating: '5.0',
  projectName: 'Flutter Developer Needed for Inventory Scanner MVP (Barcode/QR + Clean Architecture)',
  clientQuote:
    'Abraham exceeded my expectations on this project. He was professional, easy to communicate with, and delivered high-quality work on time. His attention to detail and commitment really stood out.',
  endorsedTags: [
    'Reliable',
    'Clear Communicator',
    'Accountable for Outcomes',
    'Detail Oriented',
    'Professional',
  ],
  profileUrl: 'https://www.upwork.com/freelancers/~0142f1cf79221e6871',
};
