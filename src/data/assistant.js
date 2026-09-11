/* ═══════════════════════════════════════════════════════════════
   Local site assistant: no API, no network, no cost.

   Every answer below is written by hand. The assistant can only
   ever say these exact words, so it cannot invent, exaggerate or
   hallucinate anything. That is the whole point.

   BEFORE ADDING AN ANSWER, CHECK IT AGAINST MASTER_STORY_CONTEXT.md.

   NEVER ADD:
   - G's name, employer, or anything identifying about her
   - Medco client names, unless Medco clears it
   - Salary, rates, or any financial figure
   - Numbers that aren't already confirmed in the master file

   The accuracy rules that matter most:
   - amharic_stt WRAPS an existing engine. He did not build speech
     recognition and did not train a model.
   - FaydaHealth was built and pitched, never deployed.
   - Hult Prize: campus winner, and top 8 of 600+ nationally.
     Never "Hult Prize winner".
   ═══════════════════════════════════════════════════════════════ */

export const GREETING =
  "Ask me about Abraham, what he builds, what he's shipped, how he got here. Every answer is written by him, so if I don't have something I'll say so rather than make it up.";

export const FALLBACK =
  "I don't have an answer written for that one. I only know what Abraham has put here, and I'd rather say so than make something up.\n\nThe best route is email: abrahamaddisu217@gmail.com. Or try one of the suggestions below.";

export const SUGGESTIONS = [
  'What does he build?',
  'Is he available for work?',
  'What is he proudest of?',
  'What has gone wrong for him?',
  'Can any of this be verified?',
  'Kotlin or Flutter?',
];

/* Display labels, shown as the source chip under each answer, so a
   visitor can see which part of his data the reply came from. */
export const LABELS = {
  who: 'Profile',
  build: 'What he does',
  skills: 'Stack',
  medco: 'Experience · Medco',
  clients: 'Confidentiality',
  daga: 'Projects · Daga Taxi',
  ethiodevkit: 'Open source · ethio_dev_kit',
  stt: 'Open source · amharic_stt',
  fayda: 'Projects · FaydaHealth',
  hult: 'Competitions',
  haki: 'Projects · HAKI',
  projects: 'Projects',
  education: 'Education',
  brainbite: 'Experience · BrainBite',
  hire: 'Availability',
  contact: 'Contact',
  story: 'Background',
  g: 'Confidentiality',
  ethiopia: 'Ethiopian localisation',
  ai: 'On AI tools',
  bot: 'About this assistant',
  proud: 'Reflection',
  enjoy: 'Reflection',
  learn: 'Reflection',
  mobile: 'Mobile engineering',
  payments: 'Payments',
  miniapps: 'Telebirr Mini Apps',
  events: 'Community',
  timezone: 'Remote & time zones',
  relocate: 'Relocation',
  start: 'Availability',
  language: 'Languages',
  backend: 'Backend',
  kotlinflutter: 'Native vs cross-platform',
  testing: 'Testing & release',
  design: 'Design & UI',
  hardest: 'Hardest project',
  failure: 'What went wrong',
  junior: 'Experience level',
  references: 'Proof & references',
  code: 'Source code',
  why: 'Why engineering',
  next: 'What is next',
  bahirdar: 'Where he is',
  team: 'Working in teams',
  security: 'Security & sensitive data',
  ai_build: 'Building with AI',
  site: 'About this site',
  rates: 'Rates',
  process: 'How he works',
  offline: 'Offline-first',
  resume: 'Resume',
};

/* Short question forms, used for the "related" chips after an answer. */
export const PROMPTS = {
  who: 'Who is he?',
  build: 'What does he build?',
  skills: 'What is his stack?',
  medco: 'What did he do at Medco?',
  clients: 'Who are the clients?',
  daga: 'Tell me about Daga Taxi',
  ethiodevkit: 'What is ethio_dev_kit?',
  stt: 'Did he build Amharic speech-to-text?',
  fayda: 'Tell me about FaydaHealth',
  hult: 'Did he win the Hult Prize?',
  haki: 'What is HAKI?',
  projects: 'What else has he built?',
  education: 'Is he still a student?',
  brainbite: 'What did he do in the Netherlands?',
  hire: 'Is he available for work?',
  contact: 'How do I reach him?',
  story: 'How did he get started?',
  g: 'Who is G?',
  ethiopia: 'Why Ethiopian localisation?',
  ai: 'Does he use AI?',
  bot: 'Are you a bot?',
  proud: 'What is he proudest of?',
  enjoy: 'What does he enjoy building?',
  learn: 'What has he learned?',
  mobile: 'What mobile work has he done?',
  payments: 'What payment work has he done?',
  miniapps: 'Has he built Mini Apps?',
  events: 'Does he go to events?',
  timezone: 'What time zone is he in?',
  relocate: 'Would he relocate?',
  start: 'How soon could he start?',
  language: 'What languages does he speak?',
  backend: 'Does he do backend?',
  kotlinflutter: 'Kotlin or Flutter?',
  testing: 'How does he handle testing and release?',
  design: 'Does he do design?',
  hardest: 'What was his hardest project?',
  failure: 'What has gone wrong for him?',
  junior: 'Is he experienced enough?',
  references: 'Can any of this be verified?',
  code: 'Can I see his code?',
  why: 'Why software engineering?',
  next: 'What is he doing next?',
  bahirdar: 'Where is he based?',
  team: 'Does he work in teams?',
  security: 'How does he handle sensitive data?',
  ai_build: 'Can he build AI features?',
  site: 'Who built this site?',
  rates: 'What does he charge?',
  process: 'How does he work?',
  offline: 'Can he build for poor connectivity?',
  resume: 'Can I see his CV?',
};

export const ENTRIES = [
  {
    id: 'who',
    keywords: ['who', 'about', 'yourself', 'introduce', 'bio', 'background', 'abraham', 'tell me about him'],
    answer:
      "Abraham Addisu builds mobile apps, Android in Kotlin and Jetpack Compose, and Flutter. He's a Full Stack Engineer with a mobile focus at Medco Technology Solutions in Ethiopia, and at the same time a final-year Software Engineering student at Bahir Dar Institute of Technology. He graduates in 2027.\n\nMost of his work lands in healthcare, insurance and transport. He's back in Bahir Dar for his final year and kept the Medco job remotely.",
  },
  {
    id: 'build',
    keywords: ['build', 'builds', 'do', 'does', 'work on', 'speciali', 'focus', 'expertise', 'what kind of'],
    answer:
      "Mobile apps, mostly. Android with Kotlin and Jetpack Compose, or Flutter when one codebase has to cover both platforms, architecture through to the Play Store listing and the maintenance afterwards.\n\nWithin that, three areas keep coming up. Healthcare and insurance: claims, underwriting, motor insurance, payments. That's the day job at Medco. Real-time and location: live tracking and driver dispatch, proven in a ride-hailing platform carrying real passengers. And Ethiopian localisation: the calendar, Amharic typography, phone and currency validation, most of it open-sourced.\n\nThere's backend work behind all of it, but the thing he actually builds is the app.",
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'tech', 'stack', 'language', 'languages', 'framework', 'tools', 'technologies'],
    answer:
      "Kotlin, Java, Jetpack Compose and the Android SDK. Flutter and Dart. MVVM, Coroutines and Flow, Clean Architecture.\n\nOn the backend side: REST APIs, JSON-RPC, Firebase, SQLite, Room, Socket.io and real-time systems, offline-first architecture.\n\nAlso embedded systems in C++ with sensors and microcontrollers, from a hardware project in third year. Plus Git, CI/CD and code review.",
  },
  {
    id: 'medco',
    keywords: ['medco', 'job', 'current', 'employer', 'company', 'where does he work', 'full time', 'employed'],
    answer:
      "He's a Full Stack Engineer at Medco Technology Solutions, and has been there since February 2026.\n\nHe joined as an intern, it became paid within the first month, and he was offered the full-time role by the third. The work is healthcare and insurance software, claims, underwriting, motor insurance, payments, localisation, plus code reviews and CI/CD.\n\nHe's continuing there remotely while he finishes his degree.",
  },
  {
    id: 'clients',
    keywords: ['client', 'clients', 'customers', 'who are the clients', 'which companies', 'which clients'],
    answer:
      "He doesn't name Medco's clients, and that's deliberate rather than modesty. If you're considering working with him on something sensitive, that discretion is the useful signal.\n\nWhat he can say is the shape of it: enterprise work across ERP integrations, national health-tech platforms, and insurance-sector products.",
  },
  {
    id: 'daga',
    keywords: ['daga', 'taxi', 'ride', 'hailing', 'ridehailing', 'uber', 'driver', 'transport'],
    answer:
      "Daga Taxi, a production ride-hailing platform for Daga Meter Taxi PLC in Bahir Dar. Passenger app, driver app, backend. It's live on Google Play.\n\nGoogle Maps live tracking, Socket.io driver dispatch, background location with a foreground service, Firebase Auth, payment gateway, push notifications.\n\nA classmate brought the client and they built it together, starting October 2025. He still supports it, it's the project that taught him delivering is about a third of the way in, not the finish line.",
  },
  {
    id: 'ethiodevkit',
    keywords: ['ethio_dev_kit', 'ethio dev kit', 'ethiodevkit', 'package', 'packages', 'open source', 'opensource', 'pub.dev', 'pubdev', 'library'],
    answer:
      "ethio_dev_kit, an open-source Flutter/Dart toolkit for Ethiopian developers. Five packages, MIT licensed, published under his own verified publisher at pub.dev/publishers/abroid.dev.\n\nethio_calendar for Gregorian↔Ethiopian date conversion, ethiopic_typography for bilingual theming, ethio_validators for phone, currency and Fayda ID formats, amharic_stt, and ethio_holidays.\n\nHe'd say none of it is clever engineering. It's work somebody had to do, and until someone does it every app built here starts at a disadvantage nobody wrote down.",
  },
  {
    id: 'stt',
    keywords: ['amharic_stt', 'speech', 'stt', 'voice', 'speech to text', 'recognition', 'transcription'],
    answer:
      "Worth being exact about this one: amharic_stt is a wrapper around an existing speech engine, so that Amharic works properly inside a Flutter app.\n\nHe did not build speech recognition and did not train a model. Making an existing engine actually usable for Amharic developers is the useful part, and it's a different claim from having built one.",
  },
  {
    id: 'fayda',
    keywords: ['fayda', 'faydahealth', 'health record', 'medical', 'nova tech', 'novatech', 'health tech', 'healthcare project'],
    answer:
      "FaydaHealth: one unified medical history per person, keyed to their Fayda ID, with AI-assisted preliminary triage and an Amharic chatbot demonstrated in the pitch build.\n\nThe problem: your medical history sits wherever you were last treated, joined to nothing. Arrive somewhere unconscious and the people treating you are working blind. Ethiopia already has a national identity layer, so the record can hang off it.\n\nBuilt by four people under the name Nova Tech, Abraham, Ruth, Tewodros and Yonatan. Second place at the CoBuild Ethiopia AI Hackathon, then the Hult Prize campus win, then top 8 of 600+ teams at the national final.\n\nTo be clear about the size: it's a student project, built and pitched. It isn't integrated with anything and nobody has been treated using it.",
  },
  {
    id: 'hult',
    keywords: ['hult', 'prize', 'competition', 'competitions', 'hackathon', 'cobuild', 'award', 'awards', 'won', 'win'],
    answer:
      "One project carried into three rooms over about a year, all with the same four people.\n\nSecond place at the CoBuild Ethiopia AI Hackathon 2025. Then the Hult Prize campus round at Bahir Dar University in February 2026, which they won, over Google Meet, without any of them being in the room. Then the Hult Prize Ethiopia National Finals in Addis on 25 April 2026: 600+ teams entered, 30 made the finals, 8 reached the final pitching round, and they were one of the 8.\n\nThey didn't win it. Kokeb Academy from Addis Ababa University did. Ruth pitched at that final and was, by his account, extraordinary.\n\nHe's careful with the wording: campus winner, and one of eight out of six hundred. Not \"Hult Prize winner\".",
  },
  {
    id: 'haki',
    keywords: ['haki', 'hardware', 'embedded', 'power monitor', 'iot', 'sensor', 'sensors', 'device', 'pcb', 'electronics'],
    answer:
      "HAKI, a real-time power monitoring device built by four of them at the BiTec incubation centre in third year. Sensors for voltage, current, power, temperature and humidity, a microcontroller, a small screen, SD-card logging.\n\nIt went from breadboard to a custom PCB to a full SolidWorks design, 3D printed and CNC machined.\n\nThe first thing it ever measured was the incubation centre's own smart TV, plugged straight into the device, for over a month. It was shown at two conferences, including one where he didn't know there was a programme, was told on the spot to present, and did it with no preparation in a Manchester United jersey.\n\nIt was still running when he left Bahir Dar for Addis. He doesn't know its status now. The project was fine; he's the one who left.",
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'portfolio', 'other work', 'what else', 'hireai', 'addis 360', 'addis360', 'abroid scan', 'abroid recall', 'odoo', 'inventory', 'ocr'],
    answer:
      "Beyond the main ones: HireAI, a bilingual recruitment platform where candidates interview in Amharic or English, whichever they think in. Addis 360, an offline-first civic directory that works with the connection switched off entirely. Abroid Scan, fully offline on-device OCR. Abroid Recall, which turns Telegram saved messages into a searchable archive. And an Odoo ERP mobile inventory scanner that replaced a warehouse's paper logbook.\n\nThat last one is his favourite kind of work, no AI, nothing novel, just the boring version applied to something nobody had automated yet.",
  },
  {
    id: 'education',
    keywords: ['study', 'student', 'university', 'degree', 'education', 'bahir dar', 'school', 'graduate', 'graduation', 'college'],
    answer:
      "He's in his final year of Software Engineering at Bahir Dar Institute of Technology, Bahir Dar University. It's a five-year programme and he graduates in 2027.\n\nHe's doing it alongside a full-time engineering job, which he'd tell you is less impressive than it sounds, mostly it means work made him understand what half his courses were actually for.",
  },
  {
    id: 'brainbite',
    keywords: ['brainbite', 'netherlands', 'international', 'remote intern', 'europe', 'abroad'],
    answer:
      "Three months as a remote iOS/Flutter Developer Intern at BrainBite, an EdTech company in the Netherlands, from November 2025 to January 2026. Flutter plus some native Swift on a children's learning platform.\n\nHe's careful not to call himself an iOS developer, he wrote some native Swift inside a mostly-Flutter codebase, which is a smaller claim.\n\nWhat he says he actually learned there wasn't Flutter. It was how to write what you'd done, what you were stuck on and what you'd do next, before anyone asked.",
  },
  {
    id: 'hire',
    keywords: ['hire', 'hiring', 'available', 'availability', 'freelance', 'work with', 'contract', 'project enquiry', 'quote', 'cost', 'rates', 'price', 'budget'],
    answer:
      "Yes, for the right thing. He's employed full-time at Medco and finishing his degree, so his time is genuinely limited and he'd rather say that up front than waste yours.\n\nThe work he takes on is mobile: Android and Flutter, ideally something where the app matters to whoever uses it. He's rated 5.0 on Upwork.\n\nFor anything concrete (scope, timeline, rates) email him directly at abrahamaddisu217@gmail.com.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'telegram', 'get in touch', 'message', 'connect', 'dm'],
    answer:
      "Email is best: abrahamaddisu217@gmail.com\n\nTelegram: t.me/abroid0\nLinkedIn: linkedin.com/in/abraham-addisu\nGitHub: github.com/Minas-27\nPackages: pub.dev/publishers/abroid.dev\n\nHe reads everything, though he's a student with a full-time job, so give him a day.",
  },
  {
    id: 'story',
    keywords: ['story', 'start', 'started', 'began', 'journey', 'how did he', 'career', 'reposts', 'two reposts', 'first'],
    answer:
      "It starts smaller than people expect.\n\nMarch 2025, the library at Bahir Dar. He saw a photo of a piece of paper in the student union group, a list of campus services with prices, shared as a document photo nobody could read on a phone. So he built a small Android app that made it readable.\n\nTwo people reposted it. Not two thousand. Two.\n\nOne of them started a conversation that, eleven months later, led to the recommendation that got him into Medco. In between: a year of trying six things and finishing almost none, an internship he had to turn down because he couldn't afford it, and a move to Addis where he shared a room with his cousin for seven months.\n\nHe's written the whole thing out publicly, including the parts that didn't work.",
  },
  {
    id: 'g',
    keywords: ['who is g', 'the person', 'who reposted', 'her name', 'mentor', 'she'],
    answer:
      "He keeps her anonymous on purpose and calls her G everywhere, so I'll leave it there.\n\nThe useful part isn't who she is anyway. It's that she replied to a student with a tiny project, and kept replying for a long stretch when nothing came of it.",
  },
  {
    id: 'ethiopia',
    keywords: ['ethiopia', 'ethiopian', 'amharic', 'calendar', 'localisation', 'localization', 'local', 'africa', 'language support'],
    answer:
      "This is the part of his work he thinks is most under-rated.\n\nMost software quietly assumes the Gregorian calendar. Ethiopia doesn't use it. That sounds like a formatting problem until you follow it through a real system, date pickers show the wrong year, reports group by the wrong month, anything calculating an age or a policy period is silently wrong for every Ethiopian user.\n\nSame with Amharic typography, phone validation, currency, holidays, address formats. Translated and localised are different things, and plenty of apps ship the first thinking they've done the second.\n\nMost of what he's learned about it is open-sourced in ethio_dev_kit.",
  },
  {
    id: 'ai',
    keywords: ['ai', 'claude', 'gpt', 'copilot', 'llm', 'artificial intelligence', 'chatgpt', 'use ai'],
    answer:
      "He uses AI tools daily and would rather say so plainly than pretend otherwise.\n\nGood for: getting moving on something unfamiliar, catching things he'd miss at the end of a long day, explaining a codebase he didn't write.\n\nNot a substitute for understanding what he shipped, anything he can't explain to a senior engineer doesn't go in, regardless of where it came from.\n\nHe wouldn't call himself an AI engineer or researcher. He's an honest user of the tools.",
  },
  {
    id: 'bot',
    keywords: ['are you ai', 'are you a bot', 'chatgpt bot', 'who are you', 'what are you', 'real person'],
    answer:
      "I'm not an AI, and I'm not Abraham. I'm a small local script on this page with a set of answers he wrote by hand.\n\nThat means I can't invent anything about him, I can only repeat what's written. When I don't have an answer, I say so, which is the whole reason it works this way.",
  },
  {
    id: 'proud',
    keywords: ['proud', 'proudest', 'best work', 'favourite', 'favorite', 'biggest achievement', 'most proud', 'highlight'],
    answer:
      "He'd probably say two things, and neither is the one people expect.\n\nDaga Taxi, because it's the only thing he's built that real strangers depend on. Drivers earn from it. Passengers get home on it. It's live, it's messy, and he still gets called when something needs changing.\n\nAnd the Odoo inventory scanner, which replaced a warehouse's paper logbook. No AI, nothing novel, nothing he could give a talk about, but the gap between writing stock on a clipboard and having it already updated is the entire value of software.\n\nHe's less attached to the awards than you'd think. Second place at a hackathon is a nice line; a driver finishing a shift is a different feeling.",
  },
  {
    id: 'enjoy',
    keywords: ['enjoy', 'enjoys', 'like', 'likes', 'love', 'loves', 'passion', 'fun', 'interesting', 'prefer'],
    answer:
      "Mobile, mostly. There's something about building a thing that ends up in someone's hand, that they open on a bus, that he's never got tired of.\n\nWithin that, the part he likes best is the unglamorous half: making an app work when the connection drops, making Amharic render properly, making a date picker show the right year. Nobody notices when it's right, which he seems to find satisfying rather than annoying.\n\nThe part he likes least, by his own admission, is anything that only exists in a slide deck.",
  },
  {
    id: 'learn',
    keywords: ['learn', 'learned', 'learning', 'lesson', 'taught', 'advice', 'tip', 'mistake', 'wrong'],
    answer:
      "The one he repeats most came from a classmate, not a mentor: grab the opportunity first, decide afterwards, because you can't know what a thing leads to until you're already inside it.\n\nHe doesn't follow it absolutely, he turned down an internship once because he genuinely couldn't afford it, and he'd do that again. But most of the time what stops people isn't that they've weighed something up. It's that they can't see far enough ahead to be sure, and they've decided being sure comes first.\n\nHis version: he doesn't believe in being certain. He believes in trying.",
  },
  {
    id: 'mobile',
    keywords: ['mobile', 'android', 'flutter', 'kotlin', 'app', 'apps', 'ios', 'play store', 'jetpack', 'compose', 'dart'],
    answer:
      "Mobile is the centre of what he does. Native Android in Kotlin and Jetpack Compose, or Flutter when one codebase has to cover both platforms.\n\nHe's shipped to the Play Store and maintained what he shipped, which he'd say is the part most portfolios skip. Daga Taxi has a passenger app and a driver app both live. ethio_dev_kit is Flutter. The Odoo scanner is Flutter. BrainBite was Flutter with some native Swift.\n\nOn iOS specifically he's careful: he's written native Swift inside a mostly-Flutter codebase. That's a smaller claim than calling himself an iOS developer, and he'd rather make the smaller one.",
  },
  {
    id: 'payments',
    keywords: ['payment', 'payments', 'chapa', 'sms', 'afromessage', 'gateway', 'fintech', 'money', 'transaction', 'billing'],
    answer:
      "Direct, shipped experience: Chapa for payments and AfroMessage for SMS, both running inside the Daga Taxi platform, real money moving between real people every day, not a sandbox.\n\nThe interesting part was never the happy path. It was the failure states, the retries, the reconciliation, and the support calls when the gateway says one thing and the app says another. That work transfers to any provider; the names change, the problems don't.",
  },
  {
    id: 'miniapps',
    keywords: ['mini app', 'miniapp', 'mini apps', 'miniapps', 'telebirr', 'macle', 'superapp', 'super app', 'wechat', 'grab', 'embedded app'],
    answer:
      "Yes, he has built in the Mini App model and worked with Macle, the development environment behind a national telecom super app.\n\nIt's the same pattern as WeChat, Grab or Line: your product runs inside an app the user already has, so there's nothing to install and payment and identity often come for free.\n\nHe'd call it familiarity rather than deep specialism, and he'd say so before you had to ask. But most mobile developers have never shipped against a super app at all, and in a lot of markets that is now the shortest route to users.",
  },
  {
    id: 'events',
    keywords: ['event', 'events', 'network', 'networking', 'community', 'meetup', 'conference', 'founders day', 'people', 'ecosystem', 'speak', 'speaking'],
    answer:
      "More than he used to. He spent a long time building things and posting them and not much else, and he's been deliberately fixing that.\n\nMost recently Founders' Day, run by weVentureHub in Addis, sessions on founder mindset, digital marketing and new media, and a lot of conversations with people actually building things here. He wrote it up afterwards and ended up in conversation with several of the speakers.\n\nHe's also presented his own work in public more than once, including a hardware showcase at EAI ICAST that he had about ten minutes' notice for.",
  },
  {
    id: 'timezone',
    keywords: ['time zone', 'timezone', 'overlap', 'working hours', 'hours', 'remote', 'async', 'utc', 'eat'],
    answer:
      "He's in Ethiopia, which is EAT, UTC+3. That's a comfortable overlap with Europe, the Gulf and most of Africa, and it means an early start catches the US east coast.\n\nHe already works remotely for Medco, and before that did three months remote for a company in the Netherlands, so working across time zones isn't new. What he learned from that is that remote work is mostly a writing job: if nobody can see you working, your written updates are the only evidence that you are.",
  },
  {
    id: 'relocate',
    keywords: ['relocate', 'relocation', 'move', 'visa', 'sponsor', 'onsite', 'on-site', 'travel', 'abroad'],
    answer:
      "That's a real conversation rather than something I should answer for him. He's finishing his final year in Bahir Dar and graduates in 2027, which shapes what's possible before then.\n\nEmail him at abrahamaddisu217@gmail.com with what you have in mind and he'll give you a straight answer.",
  },
  {
    id: 'start',
    keywords: ['start', 'availability', 'when can he', 'notice', 'capacity', 'how soon', 'free', 'busy'],
    answer:
      "He's employed full-time at Medco and in his final year of university, so his honest answer is: limited, and it depends what you need.\n\nHe'd rather tell you that up front than take something on and be slow at it. If you have a scope and a timeline, email him and he'll say yes or no quickly.",
  },
  {
    id: 'language',
    keywords: ['english', 'amharic', 'language', 'speak', 'communicate', 'communication'],
    answer:
      "English and Amharic, both fluently. He writes and works in English day to day, including three months with a Dutch team where everything was async and written.\n\nAmharic matters technically as well as personally here: it's why he built Amharic typography and speech support into ethio_dev_kit, and why he could build a hiring tool where candidates interview in whichever language they actually think in.\n\nOn communication generally, he'd say it isn't a natural strength, so he made it a checklist instead of a personality: ask when you don't understand, show what you've reached, confirm before implementing, point out gaps, bring an option rather than just a problem.",
  },
  {
    id: 'backend',
    keywords: ['backend', 'back-end', 'server', 'database', 'api', 'node', 'full stack', 'fullstack', 'web'],
    answer:
      "Yes, though he'd describe himself as mobile-first rather than backend-first, and he'd say so before you found out.\n\nIn practice: REST APIs and JSON-RPC integrations, Firebase, SQLite and Room locally, Socket.io for real-time, and the backend behind the Daga Taxi platform. At Medco the job title is Full Stack Engineer with a mobile focus, which is an accurate description of the split.\n\nThe honest version: he can build and reason about the whole stack, and the layer he's fastest and most opinionated in is the app.",
  },
  {
    id: 'kotlinflutter',
    keywords: ['kotlin or flutter', 'flutter or kotlin', 'prefer', 'native or cross', 'cross-platform', 'which better', 'versus', 'vs'],
    answer:
      "Depends what the product needs, and he's not religious about it.\n\nNative Android with Kotlin and Jetpack Compose when the app leans on platform capability, background work or performance. Daga Taxi is native for that reason: live location in a foreground service is not where you want to be fighting an abstraction.\n\nFlutter when one codebase has to serve both platforms and the budget doesn't stretch to two. He'd tell you cross-platform is a tradeoff rather than a free win, and that knowing when to open the native escape hatch is more of the skill than knowing what's inside it.",
  },
  {
    id: 'testing',
    keywords: ['test', 'testing', 'ci', 'cd', 'ci/cd', 'pipeline', 'quality', 'qa', 'deploy', 'release'],
    answer:
      "Part of the day job at Medco: code reviews and maintaining CI/CD pipelines alongside the feature work.\n\nOn release specifically, he's owned full cycles rather than handing off at merge, including Play Store listings, versioning, staged rollout and what happens after. He'd say that last part is the half most portfolios skip, and it's where you learn what you actually built.",
  },
  {
    id: 'design',
    keywords: ['design', 'ui', 'ux', 'figma', 'designer', 'visual', 'interface'],
    answer:
      "He implements design well rather than originating it. Figma to pixel-accurate responsive UI is routine, and he pays attention to the parts that are easy to get wrong: type that has to work in two scripts, layouts that survive a longer translation, states when the network is gone.\n\nIf you need a product designer he isn't one. If you have designs and need them built properly, that's squarely his work.",
  },
  {
    id: 'hardest',
    keywords: ['hardest project', 'hardest', 'most difficult', 'difficult', 'challenge', 'toughest', 'complex', 'struggle', 'biggest challenge'],
    answer:
      "Daga Taxi, and not for the reason you'd expect.\n\nThe technical part was demanding but tractable: live tracking, dispatch, payments. What was genuinely hard was that the code was finished months before the product could launch, because everything on the client's side that has to exist before a ride-hailing service can take one real trip wasn't ready.\n\nHe'd say that taught him the thing university doesn't: at university, done means it works. In client work, done means it works and everything around it is ready, and you control almost none of that second part.",
  },
  {
    id: 'failure',
    keywords: ['went wrong', 'gone wrong', 'fail', 'failure', 'failed', 'mistake', 'mistakes', 'wrong', 'regret', 'worst', 'didnt work', "didn't work", 'setback'],
    answer:
      "A few, and he writes about them openly rather than hiding them.\n\nHe moved to Addis, joined a company, and left after about a week because it wasn't the work he'd moved cities for. He spent a stretch of late 2025 doing classes, a client project and a remote internship at once, and he describes that as an expensive way of collecting data about himself rather than as discipline. He built a hardware project with a custom PCB and machined case that he then left behind when he moved, and he doesn't know its status now.\n\nHis framing on that last one is worth repeating: the project was fine, he's the one who left.",
  },
  {
    id: 'junior',
    keywords: ['junior', 'experience', 'years', 'senior', 'enough', 'too young', 'student still', 'level'],
    answer:
      "Fair question, and he'd rather meet it head on than dress it up.\n\nHe's early career. He's also shipped a ride-hailing platform that carries real passengers, published five packages other developers can install, and works full-time on healthcare and insurance software while finishing a degree.\n\nWhat he doesn't claim: leading teams, managing people, or a decade of architecture decisions. The record is real, verifiable and specific, and it's the size it is. That's the whole point of how this site is written.",
  },
  {
    id: 'references',
    keywords: ['reference', 'references', 'recommendation', 'testimonial', 'vouch', 'proof', 'verify', 'reviews'],
    answer:
      "Most of it is checkable without asking anyone.\n\nDaga Taxi is live on Google Play. The packages are on pub.dev under a verified publisher tied to this domain. The certifications on this page carry credential IDs and verification links. There's a client testimonial on his Upwork profile, and he's rated 5.0.\n\nFor a named reference from Medco or a client, email him and he'll arrange it.",
  },
  {
    id: 'code',
    keywords: ['his github', 'see his code', 'see code', 'source code', 'code', 'source', 'github', 'repo', 'repository', 'sample code', 'portfolio code'],
    answer:
      "github.com/Minas-27, and the packages are at pub.dev/publishers/abroid.dev.\n\nWhat's public: ethio_dev_kit, Addis 360, the Odoo inventory scanner, Abroid Scan, Abroid Recall, HireAI. What isn't: anything belonging to Medco or to clients, which stays private for obvious reasons.",
  },
  {
    id: 'why',
    keywords: ['why software', 'why engineering', 'why programming', 'why code', 'motivation', 'passion', 'get into'],
    answer:
      "The honest version is that he didn't decide, he discovered it.\n\nIn third year he tried frontend, ethical hacking, Android, several languages, hardware, product ideas and entrepreneurship programmes, and finished almost none of it. He'd say you can't think your way to what you like, you can only build things and pay attention to how you felt while building them.\n\nWhat stuck was mobile. He's in his final year now and still wouldn't claim to know exactly what kind of engineer he wants to be, he's just stopped treating that as something to solve before he's allowed to start.",
  },
  {
    id: 'next',
    keywords: ['next', 'future', 'plans', 'goal', 'goals', 'ambition', 'after graduation', 'five years'],
    answer:
      "Finish the degree in 2027 while keeping the Medco work going remotely. Keep maintaining Daga Taxi and ethio_dev_kit. He's also in the inaugural cohort of ASIP, a Pan-African fellowship, which started in September 2026.\n\nBeyond that he'd tell you he doesn't have a five-year plan and is suspicious of people who present one. The closest thing to a method he has came from a classmate: grab the opportunity first, decide afterwards, because you can't know what a thing leads to until you're already inside it.",
  },
  {
    id: 'bahirdar',
    keywords: ['where is he based', 'where based', 'based', 'bahir dar', 'addis', 'where from', 'hometown', 'campus', 'country', 'city'],
    answer:
      "Bahir Dar, in the Amhara region, where he studies at Bahir Dar Institute of Technology.\n\nHe spent seven months in Addis Ababa in 2026 for his degree's internship semester, which is where the Medco job started, and returned to Bahir Dar in September 2026 for his final year while keeping the job remotely.",
  },
  {
    id: 'team',
    keywords: ['team', 'teams', 'collaborate', 'alone', 'solo', 'work with others', 'agile', 'scrum'],
    answer:
      "Both, and he's explicit about which projects were which.\n\nDaga Taxi was built with a classmate who brought the client. FaydaHealth was four people, Nova Tech. HAKI was four people at the incubation centre. At Medco he works with cross-functional teams, does code reviews, and sits in client meetings gathering requirements.\n\nHe credits collaborators by name rather than absorbing their work into his own record, which tells you something about how he works with people.",
  },
  {
    id: 'security',
    keywords: ['security', 'secure', 'privacy', 'data protection', 'gdpr', 'compliance', 'sensitive'],
    answer:
      "He works daily on healthcare and insurance software, which is about as sensitive as data gets, and he's careful with it in ways you can see on this page: he won't name Medco's clients, and there's no client data in any screenshot.\n\nHe doesn't claim to be a security specialist. He explored ethical hacking once in third year and it went nowhere, and he'd tell you that rather than let it sit on a skills list.",
  },
  {
    id: 'ai_build',
    keywords: ['ai features', 'build ai', 'llm', 'chatbot', 'machine learning', 'integrate ai', 'ai product'],
    answer:
      "Practical AI integration rather than model research, and he's precise about the difference.\n\nHireAI evaluates bilingual interviews with an LLM and keeps a scoring audit trail. FaydaHealth demonstrated AI-assisted preliminary triage and an Amharic chatbot in its pitch build.\n\nWhat he does not claim: training models, AI research, or the title AI engineer. The Amharic speech-to-text in his package wraps an existing engine, and he says so every time it comes up.",
  },
  {
    id: 'site',
    keywords: ['this site', 'this website', 'built this', 'portfolio built', 'stack of site', 'made this'],
    answer:
      "He did. React and Vite, hand-written CSS, Framer Motion for the transitions.\n\nTwo details worth noticing: the phone in the header isn't a mockup, it renders from the same project data as the rest of the page. And the Ethiopian date inside it is computed live, which is the same problem his ethio_calendar package exists to solve. The site demonstrates the work rather than describing it.",
  },
  {
    id: 'rates',
    keywords: ['rate', 'rates', 'cost', 'price', 'pricing', 'charge', 'budget', 'how much', 'salary', 'fee'],
    answer:
      "He doesn't publish rates, and I wouldn't be the right place to find them anyway.\n\nEmail him with the scope and timeline and he'll come back with something specific rather than a number pulled from the air.",
  },
  {
    id: 'process',
    keywords: ['process', 'how do you work', 'methodology', 'approach', 'steps', 'workflow', 'engagement'],
    answer:
      "Discovery and requirements, architecture, build, test, deploy, then post-launch support, and he treats that last step as part of the job rather than an afterthought.\n\nThe part he'd emphasise is the first one. Most difficulty in real software isn't technical, it's understanding what the person in front of you actually needs, which is frequently not what they said and occasionally not what they think. He learned that in rooms where he was the youngest person and understood the least.",
  },
  {
    id: 'offline',
    keywords: ['offline apps', 'build offline', 'works offline', 'offline', 'connectivity', 'slow internet', 'poor connection', 'low bandwidth', 'emerging market', 'no internet'],
    answer:
      "This is one of the areas he'd actively put himself forward for.\n\nHe built a civic directory for Addis Ababa that works with the connection switched off entirely: local persistence, bilingual search, filtering with no latency because nothing waits on a server. The insight he took from it is that offline is the normal case and online is the bonus, which is the opposite of how most tutorials teach you to build.\n\nIf you're shipping into a market where a stable connection isn't a given, that assumption is worth more than any framework choice.",
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download', 'pdf'],
    answer:
      "There's a Download Resume button in the hero section at the top of this page.",
  },
];
