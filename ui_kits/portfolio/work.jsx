/* ============================================================
   Case-study records. Rapheal's core 4 case studies.
   Spine: Problem · Constraints · Approach · Outcome · Lessons.
   Contains live URLs, repo links, videos, screenshot galleries,
   insight cards, and stack metadata.
   ============================================================ */
const WORK = [
  {
    id: 'reach', code: 'CS-01', title: 'Reach', year: '2025',
    disciplines: ['Human Factors', 'Clinical Systems', 'Full-Stack'],
    thumb: '../../assets/work/reach-card.jpg',
    hero: '../../Rapheal-Portfolio/images/reach_hero.jpg',
    liveUrl: 'https://reach-health.up.railway.app/',
    blurb: 'A clinician-facing platform for stroke motor recovery that unifies standardized outcome measures with home-program adherence tracking, built so a therapist can see who is off-track and who needs attention in seconds.',
    sections: {
      'Problem': 'Rehab therapists carry large caseloads and monitor recovery across many patients at once. Standardized outcome measures (FMA-UE, ARAT, Box & Blocks) are documented inconsistently because capture is slow and scores end up scattered across disconnected systems. Existing tools bury the signal; trajectories, adherence, and remote-monitoring status live in separate views, so deciding who needs attention first means reconstructing each patient by hand under time pressure.',
      'Constraints': [
        'Clinicians read the interface between appointments, in seconds, not minutes.',
        'Recovery data is noisy and non-linear; a single session tells you little.',
        'Patient-safety domain: an interface that hides a declining patient is a use-error, not a design nitpick.',
        'Built solo, full-stack, on an accelerated timeline.',
      ],
      'Approach': 'Shaped by structured feedback sessions with three occupational therapists across outpatient, home health, and telehealth settings. Applied human-factors principles, severity-banded patient routing and a 60% adherence-auditing threshold, to reduce clinician cognitive load and flag stalled home programs early. Information architecture is ordered by clinical urgency, so attention lands where it matters first.',
      'Outcome': 'A working platform where a therapist can scan a caseload and identify off-track patients at a glance, with drill-down into per-patient trajectories and program adherence. Validated against the clinical review workflow it replaces.',
      'Lessons Learned': 'In a safety-adjacent tool, the hard problem is not visualization, it is deciding what to omit. Every element competing for the clinician’s attention costs a fraction of a second on every patient, every day. Restraint is the feature.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Domain', v: 'Clinical rehabilitation · stroke recovery' },
      { k: 'Research', v: '3 occupational therapists · outpatient, home health, telehealth' },
      { k: 'Status', v: 'Live Prototype & Active Validation' },
    ],
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'],
    insights: [
      { title: '1. Outcome-Driven Severity', desc: 'FMA-UE scores automatically segment patients into Mild, Moderate, or Severe baseline programs. The clinician logs an assessment, and the system assigns the appropriate program.' },
      { title: '2. Broad, Banded Pathways', desc: 'Within each severity band, pathways fit real life: occupation-based daily living, fine motor dexterity, return to work, left neglect, and shoulder protection.' },
      { title: '3. Adherence as an Early Warning', desc: 'Reach tracks active reps, mental practice, and assisted tasks. When adherence drops below 60%, it surfaces the patient as a stalled home program before a wasted visit.' }
    ],
    gallery: [
      { src: '../../Rapheal-Portfolio/images/reach_program.jpg', caption: 'Reach Programs and Pathways: FMA-UE scores route patients into severity-banded programs' },
      { src: '../../Rapheal-Portfolio/images/reach_caseload.png', caption: 'Caseload overview: Severity-banded patient routing and adherence tracking' },
      { src: '../../Rapheal-Portfolio/images/reach_outcomes.png', caption: 'Detailed patient trajectory and outcome measures' }
    ],
  },
  {
    id: 'celio', code: 'CS-02', title: 'Celio', year: '2025',
    disciplines: ['Human Factors', 'Accessibility', 'Full-Stack'],
    thumb: '../../assets/work/celio-landing.png',
    hero: '../../Rapheal-Portfolio/images/celio_live_hero.png',
    liveUrl: 'https://celioapp.up.railway.app',
    blurb: 'A digital passport app that helps celiac travelers communicate dietary restrictions across a language barrier, shaped by two years of user research into a tool people trust in the moment that matters.',
    sections: {
      'Problem': 'For someone with Celiac disease, communicating dietary needs abroad is a safety decision made across a language barrier, often under social pressure. "I don\'t trust the translation app to understand my severity. I don\'t trust the waiter\'s preference." Getting it wrong has real medical consequences, and generic translation tools are not trusted in the moment that matters.',
      'Constraints': [
        'The critical interaction happens in seconds, in person, across a language barrier.',
        'Medical trust: the message has to be unambiguous, complete, and verifiable.',
        'Accessibility-first: it has to work offline without cell service in remote areas.',
        'Lives on the phone the traveler already carries; native wallet passes for zero-latency access.',
      ],
      'Approach': 'Grounded in two years of user research, 10+ qualitative interviews and 100+ people with Celiac disease surveyed. Built an offline-first platform featuring a 12-language Translation Card with text-to-speech audio, native Apple/Google Wallet export, an on-device local LLM assistant (Sage AI) via WebLLM for private queries, and interactive establishment maps.',
      'Outcome': 'A deployed app sustaining 50+ active users across 3+ countries via TestFlight, reducing high-stakes dining exchanges down to one clear artifact the traveler can display or speak aloud.',
      'Lessons Learned': 'Designing for a high-stakes moment means designing for worst-case conditions, not the sunny-day demo. Stressed, non-native, in-person context is the real spec, and only sustained user research surfaces what that context demands.',
    },
    meta: [
      { k: 'Role', v: 'Systems Researcher · Full-Stack Development' },
      { k: 'Research', v: '10+ interviews · 100+ surveyed · 2 years' },
      { k: 'Users', v: '50+ active · 3+ countries · TestFlight' },
      { k: 'Status', v: 'Live Deployed Platform' },
    ],
    stack: ['Django', 'Alpine.js', 'WebLLM', 'Web Speech API', 'PassKit'],
    insights: [
      { title: '1. The Translation Card', desc: 'Translates allergy profiles into 12 languages with local text-to-speech audio and native Apple & Google Wallet integration.' },
      { title: '2. Sage AI (Local LLM)', desc: 'An on-device AI assistant running entirely in-browser via WebLLM, allowing travelers to query local safety guides offline with 0% server latency.' },
      { title: '3. Interactive Local Maps', desc: 'Offers client-side geolocation filtering for 100% Gluten-Free spots, groceries, and vetted restaurants without requiring active cell connection.' }
    ],
    gallery: [
      { src: '../../Rapheal-Portfolio/images/HighResCelioHero-PurpleCard.png', caption: 'Digital Passport Card with native wallet export and local TTS' },
      { src: '../../Rapheal-Portfolio/images/celio_live_sage.png', caption: 'Sage AI: On-device WebLLM safety assistant running offline' },
      { src: '../../Rapheal-Portfolio/images/Travel Guides .png', caption: 'Local restaurant and grocery safety guides' }
    ],
  },
  {
    id: 'materialsiq', code: 'CS-03', title: 'MaterialIQ', year: '2025',
    disciplines: ['Browser Extension', 'FastAPI', 'Full-Stack'],
    thumb: '../../assets/work/materialiq-card.jpg',
    hero: '../../Rapheal-Portfolio/images/materialsIQ/hero.png',
    liveUrl: 'https://materialiq.app',
    repoUrl: 'https://github.com/manyworldss/MaterialsQ',
    blurb: 'An AI-powered browser extension that analyzes product quality, material composition, and value for money in real time while shopping online.',
    sections: {
      'Problem': 'Consumers spend hundreds of dollars on products assuming high quality, often struggling to understand material blends, construction details, and fair pricing. E-commerce sites obfuscate material breakdowns, relying on brand perception and high prices to imply durability. Without objective data, price is falsely equated with quality.',
      'Constraints': [
        'Must parse unstructured e-commerce product descriptions in real time directly within the browser DOM.',
        'Low-latency inference and clear rule-based scoring engines so users understand score derivation.',
        'Must degrade gracefully when site layouts break extraction rules.',
      ],
      'Approach': 'Developed an AI-powered Chrome extension backed by FastAPI. The system extracts fiber composition and fabric weight to calculate a Material Quality Score, infers a Durability Estimate from construction cues, and computes an objective Value Score to determine if an item is worth its asking price.',
      'Outcome': 'Launched MaterialIQ (Beta) on the Chrome Web Store with Skimlinks integration, providing shoppers with instant, transparent scoring directly in their shopping carts to remove purchasing uncertainty.',
      'Lessons Learned': 'Building consumer trust requires extreme transparency in algorithmic scoring. Users do not trust a black-box "Quality Score"; they need to see the exact fiber breakdowns and rule-based logic that drove the calculation.',
    },
    meta: [
      { k: 'Role', v: 'Systems Engineer · Full-Stack Developer' },
      { k: 'Domain', v: 'E-commerce analysis · Natural language parsing' },
      { k: 'Tech', v: 'Chrome Extension API (Manifest V3) · FastAPI · Skimlinks' },
      { k: 'Status', v: 'Beta on Chrome Web Store' },
    ],
    stack: ['Manifest V3', 'FastAPI', 'Python', 'React', 'Chrome Extension API'],
    insights: [
      { title: '1. Unstructured Web DOM', desc: 'Parses complex e-commerce product pages to extract hidden fiber breakdowns regardless of site layout variations.' },
      { title: '2. Low Latency Inference', desc: 'Delivers fiber analysis, durability scoring, and price evaluation instantly within the user cart.' },
      { title: '3. Transparent Scoring', desc: 'Replaces black-box quality numbers with transparent, rule-based fiber logic.' }
    ],
  },
  {
    id: 'prox', code: 'PX-04', title: 'Prox', year: '2025',
    disciplines: ['Onboarding UX', 'iOS', 'Capacitor'],
    thumb: '../../assets/work/prox-deals.png',
    hero: '../../Rapheal-Portfolio/images/prox/08-deals-ready.png',
    video: '../../Rapheal-Portfolio/images/prox/onboarding-walkthrough.mp4',
    blurb: 'A complete redesign of the first-time user experience for an iOS grocery-savings app, addressing a strict 3–5 minute data-loading constraint.',
    sections: {
      'Problem': 'On first sign-up, Prox must gather real-time price data for local stores in the user\'s area, which takes 3 to 5 minutes. The original flow threw a static loading spinner, appearing broken to new users and resulting in high drop-off rates before seeing value.',
      'Constraints': [
        'The 3–5 minute data pull is unavoidable and must happen in real time.',
        'Runs on Capacitor for iOS, requiring designs that account for cross-platform quirks while feeling native.',
        'Permission prompts must be deferred until value is established.',
      ],
      'Approach': 'Worked directly with the founder and engineering team to design two distinct onboarding strategies. The "Honest" approach tells users what is happening, shows real-time progress, and gives permission to leave while data loads (sending a push notification when ready). The "Exclusivity" approach reframes the wait as a reserved queue spot with founding member cards and referral incentives.',
      'Outcome': 'Delivered an end-to-end 14-screen onboarding redesign. Implemented interactive features like a potential savings slider, deferred location permissions to build trust incrementally, and a tangible payoff screen when deals are ready. The company shipped the Honest approach.',
      'Lessons Learned': 'You cannot always engineer away friction, but you can design how users perceive it. Giving users context, progress indicators, and an explanation for the wait turns frustration into anticipation.',
    },
    meta: [
      { k: 'Role', v: 'UX Designer · Contractor' },
      { k: 'Context', v: 'Prox · iOS Grocery Savings Application' },
      { k: 'Deliverables', v: '14-screen onboarding flow · Interactive prototypes · Capacitor iOS' },
      { k: 'Period', v: 'Apr 2024 – Jul 2024' },
    ],
    stack: ['iOS', 'Capacitor', 'Figma', 'A/B Testing'],
    comparisons: [
      { label: 'Honest (Chosen)', src: '../../Rapheal-Portfolio/images/prox/05-building-prox-honest.png', desc: 'Transparent setup framing that explains the live price pull and gives users permission to leave while data loads.' },
      { label: 'Exclusivity', src: '../../Rapheal-Portfolio/images/prox/06-early-access.png', desc: 'Invite-only queue framing with founding member spots, live countdown, and referral incentives.' }
    ],
    gallery: [
      { src: '../../Rapheal-Portfolio/images/prox/01-choose-stores.png', caption: 'Store selection: 16 branded retailers with search and grouping', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/02-food-preferences.png', caption: 'Food preferences: dietary filters personalizing deal prioritization', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/03-feature-reveal.png', caption: 'Feature cards: swipeable cards showing real product screens', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/04-savings-preview.png', caption: 'Savings preview: interactive slider tied to actual spend', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/09-location.png', caption: 'Location permission: re-sequenced after sign-up when value is clear', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/07-founding-member.png', caption: 'Founding Member: payoff screen for the exclusivity path', isMobile: true },
      { src: '../../Rapheal-Portfolio/images/prox/08-deals-ready.png', caption: 'Deals Ready: reveal moment with deal count up and confetti', isMobile: true }
    ],
  },
];

Object.assign(window, { WORK });
