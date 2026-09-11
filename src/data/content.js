/* ═══════════════════════════════════════════
   Site Content - Single source of truth
   TODO: markers preserved for Abraham to fill
   ═══════════════════════════════════════════ */

import profilePhotoImg from '../assets/profile-photo.png';
import hultOnCampusImg from '../assets/hult-on-campus.png';
import cobuildHackathonImg from '../assets/cobuild-hackathon.png';
import devquestImg from '../assets/devquest.png';
import iteamsInnovationImg from '../assets/iteams-innovation.png';
import wellnessImg from '../assets/wellness.jpg';

export const personalInfo = {
  name: 'Abraham Addisu',
  email: 'abrahamaddisu217@gmail.com',
  telegram: 'https://t.me/abroid0',
  location: 'Ethiopia · Working remotely worldwide',
  linkedin: 'https://linkedin.com/in/abraham-addisu',
  github: 'https://github.com/Minas-27',
  upwork: 'https://www.upwork.com/freelancers/~0142f1cf79221e6871',
  roles: [
    'Mobile App Developer',
    'Android Engineer (Kotlin & Compose)',
    'Flutter Developer',
    'Full Stack Engineer',
  ],
  valueProp:
    'I build mobile apps people rely on, Android and Flutter, from the first screen to the store listing and the maintenance nobody talks about. Healthcare, insurance and transport, built for markets where a stable connection is not a given.',
  resumes: {
    // Bump the version when the PDF changes, otherwise browsers and the
    // CDN keep serving the cached old one from the same filename.
    main: '/assets/abraham_addisu_resume.pdf?v=2026-09',
  },
  profilePhoto: profilePhotoImg, 
};

export const upworkProfile = personalInfo.upwork;

export const services = [
  {
    title: 'Android & Flutter Apps, End to End',
    description: 'Native Android in Kotlin and Jetpack Compose, or Flutter when one codebase has to serve both platforms. Architecture, Figma-to-code, Firebase, Play Store release and the maintenance afterwards, which is usually the longer half.',
  },
  {
    title: 'Healthcare & Insurance Mobile Systems',
    description: 'Client-facing apps for claims, underwriting, motor insurance and payments, wired into backend systems that were already running before I arrived. This is the day job, and most of the difficulty is understanding the workflow rather than writing the screen.',
  },
  {
    title: 'Real-Time & Location Features',
    description: 'Live tracking, ride-matching and driver dispatch with Socket.io and FusedLocationProviderClient running in a foreground service. Proven in a ride-hailing platform carrying real passengers and drivers, not a demo.',
  },
  {
    title: 'Payment & Messaging Integrations',
    description: 'Live payment and SMS rails in a platform that moves real money daily, Chapa and AfroMessage in my case, but the work is the same anywhere: failure states, retries, reconciliation, and the support calls when the gateway says one thing and the app says another. Local providers are usually the part nobody has documented.',
  },
  {
    title: 'Super App Mini Apps',
    description: 'Mini Apps let you reach users inside a platform they already have, instead of persuading them to install something new. I have built in that model and worked with Macle, the development environment behind a national telecom super app, the same pattern as WeChat, Grab or Line, and a route most teams have never shipped against.',
  },
  {
    title: 'Offline-First & Deep Localisation',
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

export const skills = [
  // Backend & data
  'REST APIs', 'API Integration', 'JSON-RPC', 'Firebase', 'SQLite', 'Room', 'Socket.io / Real-time Systems',
  // Payments & local platforms
  'Chapa (payments)', 'AfroMessage (SMS)', 'Super App Mini Apps', 'Macle',
  // Mobile
  'Kotlin', 'Java', 'Jetpack Compose', 'Android SDK', 'Flutter', 'Dart', 'MVVM', 'Coroutines & Flow',
  'FusedLocationProviderClient', 'Offline-first Architecture',
  // Systems
  'Embedded Systems (C++)', 'Sensors & Microcontrollers',
  // Practice
  'Git / CI-CD', 'Clean Architecture', 'Code Review', 'UI Implementation',
  'AI-assisted Development (Claude, Gemini, Codex)',
];

export const experiences = [
  {
    title: 'ASIP Fellow',
    company: 'Doubleyou Centre',
    date: 'Sep 2026 - Present',
    location: 'Remote, Pan-African',
    description:
      'Selected for the inaugural cohort of the African Student Impact Program, a Pan-African fellowship for students and young professionals turning education and skills into practical impact. It started in September 2026, so there is nothing to report from it yet beyond selection.',
  },
  {
    title: 'Full Stack Engineer',
    company: 'Medco Technology Solutions',
    date: 'Apr 2026 - Present',
    location: 'Addis Ababa, now remote',
    description:
      'Building and maintaining web and mobile applications for healthcare and insurance clients. Architecting frontend and backend together, translating product requirements into production features, code review and CI/CD.',
  },
  {
    title: 'Software Engineer, Internship',
    company: 'Medco Technology Solutions',
    date: 'Feb 2026 - Apr 2026',
    location: 'Addis Ababa',
    description:
      'Joined unpaid, became paid within the first month, offered the full-time role by the third. Worked across the full lifecycle from requirement analysis to deployment on client applications in healthcare and insurance, including Odoo ERP integrations and mobile development.',
  },
  {
    title: 'Freelance Full Stack & Mobile Engineer',
    company: 'Self-employed',
    date: 'Jun 2025 - Present',
    location: 'Bahir Dar, Ethiopia',
    description:
      'Technical partner for non-technical founders and traditional service companies digitising manual operations. Featured work: a complete ride-hailing ecosystem for a regional transport client, passenger and driver apps, system architecture and database design, Chapa payments and AfroMessage SMS integration, QA and Play Store deployment. They moved from manual dispatching to a working digital platform.',
  },
  {
    title: 'Mobile App Developer',
    company: 'Daga Meter Taxi PLC (Client Project)',
    date: 'Oct 2025 - Present',
    location: '',
    description:
      'Designed and deployed a production ride-hailing system, launched publicly on Google Play as Daga Taxi (passenger + driver apps). Built real-time ride tracking using Google Maps, a Socket.io-based driver dispatch connection, and FusedLocationProviderClient with a foreground service for background location updates. Integrated Firebase Auth, Chapa payments, AfroMessage SMS and FCM push notifications. Owned the full release cycle.',
  },
  {
    title: 'iOS Flutter Developer Intern',
    company: 'BrainBite (EdTech, Netherlands)',
    date: 'Nov 2025 - Jan 2026',
    location: 'Remote',
    description:
      'Built cross-platform Flutter features for a children\u0027s educational platform. Integrated ElevenLabs AI voice synthesis and collaborated asynchronously across time zones.',
  },
  {
    title: 'Embedded Systems Developer',
    company: 'BiTec, Bahir Dar University',
    date: 'Dec 2024 - Oct 2025',
    location: 'Bahir Dar',
    description:
      'Built HAKI, a real-time power monitoring system, with three teammates at the university incubation centre. ZMPT101B, ACS712 and AHT20 sensors, TFT display, SD-card logging. Its first load was the centre\'s own smart TV: it ran for over a month measuring exactly what a television draws. Shown at conferences and entered into university and incubation-centre competitions.',
  },
];

export const projects = [
  {
    title: 'Daga Taxi',
    role: 'Lead Android Developer',
    description:
      'Production ride-hailing system for Daga Meter Taxi PLC: passenger & driver apps, live on Google Play. Google Maps live tracking, Socket.io-based driver dispatch, Chapa payments, AfroMessage SMS, Firebase Auth and FCM push notifications.',
    tags: ['Kotlin', 'Firebase', 'Google Maps API', 'Socket.io', 'Chapa', 'AfroMessage'],
    status: 'Live',
    link: 'https://play.google.com/store/apps/details?id=com.dagaride.passenger',
  },
  {
    title: 'ethio_dev_kit',
    role: 'Creator & Maintainer',
    description:
      'Open-source 5-package Flutter/Dart toolkit for Ethiopian developers, live on pub.dev, MIT licensed: ethio_calendar (Gregorian↔Ethiopian date conversion), ethiopic_typography (bilingual theming), ethio_validators (phone/currency/Fayda ID format validation), amharic_stt (Amharic speech-to-text support, wrapping an existing speech engine so Amharic works inside Flutter), ethio_holidays (dynamically computed Ethiopian holidays).',
    tags: ['Flutter', 'Dart', 'Open Source', 'pub.dev'],
    status: 'Live',
    link: 'https://pub.dev/publishers/abroid.dev',
  },
  {
    title: 'HireAI - Bilingual AI Recruitment Platform',
    role: 'Lead AI App Developer',
    description:
      'AI-driven hiring platform supporting English and Amharic; candidates can interview in their native language. Replaces manual CV screening with transparent, LLM-based evaluations and a scoring audit trail for recruiters. Handles bilingual audio/text processing and complex app state.',
    tags: ['AI', 'NLP', 'API Integration', 'Mobile App Development'],
    status: 'Live',
    link: 'https://github.com/Minas-27/HireAI',
  },
  {
    title: 'FaydaHealth: Unified Medical History on Fayda ID',
    role: 'Developer, team of four (Nova Tech)',
    description:
      'Health record concept designed to unify fragmented medical histories against Ethiopia\'s national Fayda ID, with AI-assisted preliminary triage and an Amharic chatbot demonstrated in the pitch build. A student project: built and pitched, not deployed. 2nd place at the CoBuild Ethiopia AI Hackathon 2025, Hult Prize campus winner, and one of the top 8 teams of 600+ at the Ethiopian national final.',
    tags: ['AI', 'Kotlin', 'API Integration', 'UI Design'],
    status: 'Live',
    link: 'https://www.linkedin.com/posts/abraham-addisu_cobuildabrethiopiaabraiabrhackathonabr2025-activity-7402093729572126720-lDga?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
  },
  {
    title: 'Addis 360',
    role: 'Creator & Lead Engineer',
    description:
      'Offline-first civic directory app for Addis Ababa: 100% offline local persistence layer, bilingual Amharic/English smart search, zero-latency filtering, maps integration.',
    tags: ['Kotlin', 'Room', 'Google Maps', 'Offline-first'],
    status: 'Live',
    link: 'https://github.com/Minas-27/Addis-360',
  },
  {
    title: 'Custom Odoo ERP Mobile Inventory Scanner',
    role: 'Lead Flutter Developer',
    description:
      'Mobile-first inventory management app replacing manual warehouse paper logs; integrates directly with Odoo ERP via JSON-RPC, letting warehouse staff scan products and update stock levels in real time.',
    tags: ['Flutter', 'Dart', 'JSON', 'API Integration'],
    status: 'Live',
    link: 'https://github.com/Minas-27/Mobile-Inventory-Scanner',
  },
  {
    title: 'Abroid Scan - Offline OCR Text Recognition App',
    role: 'Lead Flutter Developer',
    description:
      'High-performance productivity app for instant, fully offline Optical Character Recognition; extracts text from live camera feed or gallery images with no internet connection required, using on-device ML.',
    tags: ['Flutter', 'Dart', 'Mobile App Development', 'UI Design'],
    status: 'Live',
    link: 'https://github.com/Minas-27/Abroid-Scan',
  },
  {
    title: 'BrainBite',
    role: 'iOS Flutter Developer Intern',
    description:
      'Cross-platform Flutter features for a children\'s EdTech platform (Netherlands), ElevenLabs AI voice integration, multilingual/localized UX.',
    tags: ['Flutter', 'Dart', 'AI', 'EdTech'],
    status: 'Live',
    link: 'https://www.linkedin.com/posts/brainbite_brainbite-brainbiters-activity-7405622544046858240-RO4a?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
  },
  {
    title: 'Abroid Recall - Telegram Archive & Journal App',
    role: 'Android Developer',
    description:
      'Native Android productivity app that transforms unstructured Telegram Saved Messages into an organized, searchable archive and daily journal. Built with Kotlin + Jetpack Compose, Clean Architecture and MVVM; integrates TDLib for Telegram API access and Room for fast offline media/document access. Material 3 UI, in-app media playback, advanced local search.',
    tags: ['Kotlin', 'Jetpack Compose', 'SQLite', 'Telegram API'],
    status: 'Live',
    link: 'https://github.com/Minas-27/Abroid-Recall',
  },
  {
    title: 'HAKI: Real-Time Power Monitor',
    role: 'Embedded Systems Developer, team of four',
    description:
      'Sensors reading voltage, current, power, temperature and humidity into a microcontroller, live on a TFT screen and logged to SD. Built at the university incubation centre; its first load was the centre\'s own smart TV, which it measured continuously for over a month.',
    tags: ['C++', 'Embedded Systems', 'IoT', 'Sensors'],
    status: 'Live',
    link: 'https://www.linkedin.com/posts/abraham-addisu_hakitechnologies-bitec-embeddeddevice-activity-7351646391879815168-LpYe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
    linkNote: null,
  },
];

export const certifications = [
  { title: 'Hult Prize 2026: Ethiopia National Finalist', issuer: 'Hult Prize Foundation', date: 'Jun 2026', detail: 'Top 8 of 600+ university teams', credentialId: '99956319-0b92-47d7-bacc-ce05e78a7a79', link: 'https://credsverse.com/credentials/99956319-0b92-47d7-bacc-ce05e78a7a79' },
  { title: 'Hult Prize 2026: On-Campus Competition Winner', issuer: 'Hult Prize Foundation', date: 'Feb 2026', detail: 'Bahir Dar University, with Nova Tech', image: hultOnCampusImg },
  { title: 'CoBuild Ethiopia AI Hackathon 2025: 2nd Place', issuer: 'Entrepreneurship Development Institute (EDI), Ethiopia', date: 'Nov 2025', detail: 'FaydaHealth', image: cobuildHackathonImg },
  { title: 'Global and Planetary Security', issuer: 'One Young World Academy', date: 'Sep 2026', detail: '', credentialId: 'e35919ff-5879-4604-8eb3-910d64775ca1', link: 'https://www.credly.com/badges/e35919ff-5879-4604-8eb3-910d64775ca1/public_url' },
  { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', date: 'Jul 2026', detail: '', credentialId: 'temjhtidhwvc', link: 'https://verify.skilljar.com/c/temjhtidhwvc' },
  { title: 'Claude 101', issuer: 'Anthropic', date: 'Jul 2026', detail: '', credentialId: 'kdsopyqbbuqf', link: 'https://verify.skilljar.com/c/kdsopyqbbuqf' },
  { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Jul 2026', detail: '', credentialId: 'bngf5pd9g4r4', link: 'https://verify.skilljar.com/c/bngf5pd9g4r4' },
  { title: 'AI Literacy', issuer: 'IBM SkillsBuild', date: 'Jun 2026', detail: '', credentialId: 'fb9f64ea-30bc-4cd0-b125-dd93e2accc65', link: 'https://www.credly.com/earner/earned/badge/fb9f64ea-30bc-4cd0-b125-dd93e2accc65' },
  { title: 'Data Literacy', issuer: 'IBM SkillsBuild', date: 'Jun 2026', detail: '', credentialId: '0526c23b-5f34-4e27-9784-c40df29c5171', link: 'https://www.credly.com/earner/earned/badge/0526c23b-5f34-4e27-9784-c40df29c5171' },
  { title: 'Wellness Hackathon 2026', issuer: 'ALX Ethiopia', date: 'Jun 2026', detail: 'Participant', image: wellnessImg },
  { title: 'DevQuest 2025: International Hackathon', issuer: 'SLIIT', date: '2025', detail: 'Participant', image: devquestImg },
  { title: 'Innovation to Impact Program', issuer: 'Bahir Dar i-Teams (Cambridge)', date: '2025', detail: '', image: iteamsInnovationImg },
  { title: 'Android Developer Fundamentals', issuer: 'Udacity', date: '2024', detail: '', link: 'https://www.udacity.com/certificate/e/9d69360e-4b69-11ef-bcf0-e39f654c5c13' },
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
