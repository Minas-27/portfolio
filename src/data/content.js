/* ═══════════════════════════════════════════
   Site Content - Single source of truth
   TODO: markers preserved for Abraham to fill
   ═══════════════════════════════════════════ */

import profilePhotoImg from '../assets/profile-photo.png';
import hultOnCampusImg from '../assets/hult-on-campus.png';
import cobuildHackathonImg from '../assets/cobuild-hackathon.png';
import devquestImg from '../assets/devquest.png';
import iteamsInnovationImg from '../assets/iteams-innovation.png';

export const personalInfo = {
  name: 'Abraham Addisu',
  email: 'abrahamaddisu217@gmail.com',
  phone: '+251-963048258',
  location: 'Addis Ababa, Ethiopia',
  linkedin: 'https://linkedin.com/in/abraham-addisu',
  github: 'https://github.com/Minas-27',
  upwork: 'https://www.upwork.com/freelancers/~0142f1cf79221e6871',
  roles: [
    'Android Engineer',
    'Mobile App Developer',
    'Flutter Developer',
    'Full Stack Engineer',
  ],
  valueProp:
    'Turning complex requirements into polished mobile experiences - from architecture to playstore publishing.',
  resumes: {
    main: '/assets/abraham_addisu_resume.pdf',
  },
  profilePhoto: profilePhotoImg, 
};

export const skills = [
  'Android App Development',
  'Mobile App Development',
  'Kotlin',
  'Java',
  'Flutter',
  'Dart',
  'Jetpack Compose',
  'JetPack',
  'Android Studio',
  'Firebase',
  'SQLite',
  'Room',
  'REST APIs',
  'API Integration',
  'MVVM',
  'Coroutines & Flow',
  'Socket.io / Real-time Systems',
  'FusedLocationProviderClient',
  'Embedded Systems (C++)',
  'Git/CI-CD',
  'User Interface Design',
  'Clear Communicator',
  'Detail Oriented',
  'AI-assisted Development (Claude, Gemini, Codex)',
];

export const currentlyLearning = ['Dagger2', 'RxJava', 'Realm'];

export const experiences = [
  {
    title: 'Full Stack Engineer (Mobile App Focus)',
    company: 'Medco Technology Solutions',
    date: 'Apr 2026 – Present',
    location: 'Addis Ababa (On-site)',
    description:
      'Building client-facing medical and insurance Android apps with Kotlin and Jetpack Compose, conducting code reviews, and maintaining CI/CD pipelines. Contributed to enterprise projects across ERP integrations, national health-tech platforms, and insurance-sector mobile products (Nyala Insurance, Awash Insurance, Ethiopian Insurance Corporation) - specific project details are confidential.',
  },
  {
    title: 'Mobile App Developer',
    company: 'Daga Meter Taxi PLC (Client Project)',
    date: 'Sep 2025 – Jan 2026',
    location: '',
    description:
      'Designed and deployed a production ride-hailing system, launched publicly on Google Play under the brand Abay and Tana Ride (passenger + driver apps). Built real-time ride tracking using Google Maps, a Socket.io-based driver dispatch connection, and FusedLocationProviderClient with a foreground service for background location updates. Integrated Firebase Auth, payment gateway, and FCM push notifications. Owned the full release cycle.',
  },
  {
    title: 'iOS Flutter Developer Intern',
    company: 'BrainBite (EdTech, Netherlands)',
    date: 'Oct 2025 – Jan 2026',
    location: 'Remote',
    description:
      'Built cross-platform Flutter features for a children\u0027s educational platform. Integrated ElevenLabs AI voice synthesis and collaborated asynchronously across time zones.',
  },
  {
    title: 'Android Developer (Self-Employed)',
    company: '',
    date: 'Jul 2024 – Present',
    location: 'Bahir Dar (Hybrid)',
    description:
      'Built multiple production apps using MVVM, Firebase, and Room. Created Addis 360 and an Odoo ERP mobile inventory scanner via JSON-RPC.',
  },
  {
    title: 'Embedded Systems Developer',
    company: 'BiTec, Bahir Dar University',
    date: 'Dec 2024 – Oct 2025',
    location: 'Bahir Dar',
    description:
      'Built HAKI, a real-time power monitoring system using ZMPT101B, ACS712, and AHT20 sensors with TFT display and SD-card logging.',
  },
];

export const projects = [
  {
    title: 'Abay and Tana Ride',
    role: 'Lead Android Developer',
    description:
      'Production ride-hailing system for Daga Meter Taxi PLC: passenger & driver apps, live on Google Play. Google Maps live tracking, Socket.io-based driver dispatch, payment gateway integration, Firebase Auth, FCM push notifications.',
    tags: ['Kotlin', 'Firebase', 'Google Maps API', 'Socket.io', 'Payment Gateway Integration'],
    status: 'Live',
    link: 'https://play.google.com/store/apps/details?id=com.dagaride.passenger',
  },
  {
    title: 'ethio_dev_kit',
    role: 'Creator & Maintainer',
    description:
      'Open-source 5-package Flutter/Dart toolkit for Ethiopian developers, live on pub.dev, MIT licensed: ethio_calendar (Gregorian↔Ethiopian date conversion), ethiopic_typography (bilingual theming), ethio_validators (phone/currency/Fayda ID format validation), amharic_stt (on-device Amharic speech-to-text), ethio_holidays (dynamically computed Ethiopian holidays).',
    tags: ['Flutter', 'Dart', 'Open Source', 'pub.dev'],
    status: 'Live',
    link: 'https://github.com/Minas-27/ethio_dev_kit',
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
    title: 'FaydaHealth - AI-Powered Health Record System',
    role: 'Lead Developer & AI Integrator',
    description:
      'Award-winning health record system integrating Ethiopia\'s national Fayda ID to unify fragmented medical histories. Includes AI-driven preliminary diagnostics and a localized Amharic AI chatbot for accessibility. Secured 2nd Place at CoBuild Ethiopia AI Hackathon 2025.',
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
    title: 'HAKI Power Monitor',
    role: 'Embedded Systems Developer',
    description:
      'Real-time power monitoring system: ZMPT101B/ACS712/AHT20 sensors, TFT display, SD-card logging.',
    tags: ['C++', 'Embedded Systems', 'IoT', 'Sensors'],
    status: 'Live',
    link: 'https://www.linkedin.com/posts/abraham-addisu_hakitechnologies-bitec-embeddeddevice-activity-7351646391879815168-LpYe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFThwF0BWrohJRWKElATtOS8yq3FnorcHPY',
    linkNote: null,
  },
];

export const certifications = [
  { title: 'Hult Prize 2026 - Ethiopia National Finalist', issuer: 'Hult Prize Foundation', detail: 'Top 8 of 600+ university teams', link: 'https://credsverse.com/credentials/99956319-0b92-47d7-bacc-ce05e78a7a79' },
  { title: 'Hult Prize 2026 - On-Campus Competition Winner', issuer: 'Bahir Dar University', detail: '', image: hultOnCampusImg },
  { title: 'CoBuild Ethiopia AI Hackathon 2025 - 2nd Place', issuer: 'CoBuild Ethiopia', detail: 'FaydaHealth', image: cobuildHackathonImg },
  { title: 'AI Literacy', issuer: 'IBM SkillsBuild', detail: '', link: 'https://www.credly.com/earner/earned/badge/fb9f64ea-30bc-4cd0-b125-dd93e2accc65' },
  { title: 'Data Literacy', issuer: 'IBM SkillsBuild', detail: '', link: 'https://www.credly.com/earner/earned/badge/0526c23b-5f34-4e27-9784-c40df29c5171' },
  { title: 'Claude 101', issuer: 'Anthropic', detail: '', link: 'https://verify.skilljar.com/c/kdsopyqbbuqf' },
  { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', detail: '', link: 'https://verify.skilljar.com/c/temjhtidhwvc' },
  { title: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', detail: '', link: 'https://verify.skilljar.com/c/bngf5pd9g4r4' },
  { title: 'Android Developer Fundamentals', issuer: 'Udacity', detail: '', link: 'https://www.udacity.com/certificate/e/9d69360e-4b69-11ef-bcf0-e39f654c5c13' },
  { title: 'DevQuest 2025 - International Hackathon Participant', issuer: 'SLIIT', detail: '', image: devquestImg },
  { title: 'Innovation to Impact Program', issuer: 'Bahir Dar i-Teams (Cambridge)', detail: '', image: iteamsInnovationImg },
];

export const freelanceRecord = {
  rating: '5.0',
  completedProjects: 1,
  projectName: 'Flutter Developer Needed for Inventory Scanner MVP (Barcode/QR + Clean Architecture)',
  projectDate: 'Apr 21, 2026 - Apr 22, 2026',
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
