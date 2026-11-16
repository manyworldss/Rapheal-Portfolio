/* Canonical project records. Screenshot paths are bundled by build-standalone.js. */
const WORK = [
  {
    "id": "reach",
    "code": "CS-01",
    "title": "Reach",
    "year": "2025",
    "disciplines": [
      "Human Factors",
      "Clinical Systems",
      "Full-Stack"
    ],
    "thumb": "../../assets/work/reach-card.jpg",
    "hero": "../../Rapheal-Portfolio/images/reach_hero.png",
    "liveUrl": "https://reach-health.up.railway.app/",
    "caseStudyUrl": "reach.html",
    "blurb": "A clinician-facing platform for stroke motor recovery that unifies standardized outcome measures with home-program adherence tracking, built so a therapist can see who is off-track and who needs attention in seconds.",
    "sections": {
      "Problem": "Rehab therapists carry large caseloads and monitor recovery across many patients at once. Standardized outcome measures (FMA-UE, ARAT, Box & Blocks) are documented inconsistently because capture is slow and scores end up scattered across disconnected systems. Existing tools bury the signal; trajectories, adherence, and remote-monitoring status live in separate views, so deciding who needs attention first means reconstructing each patient by hand under time pressure.",
      "Constraints": [
        "Clinicians read the interface between appointments, in seconds, not minutes.",
        "Recovery data is noisy and non-linear; a single session tells you little.",
        "Patient-safety domain: an interface that hides a declining patient is a use-error, not a design nitpick.",
        "Built solo, full-stack, on an accelerated timeline."
      ],
      "Approach": "Shaped by structured feedback sessions with three occupational therapists across outpatient, home health, and telehealth settings. Applied human-factors principles, severity-banded patient routing and a 60% adherence-auditing threshold, to reduce clinician cognitive load and flag stalled home programs early. Information architecture is ordered by clinical urgency, so attention lands where it matters first. Monitoring features are grounded in the 2026 Remote Therapeutic Monitoring billing codes used by clinics.",
      "Outcome": "A working platform where a therapist can scan a caseload and identify off-track patients at a glance, with drill-down into per-patient trajectories and program adherence. Validated against the clinical review workflow it replaces.",
      "Lessons Learned": "In a safety-adjacent tool, the hard problem is not visualization, it is deciding what to omit. Every element competing for the clinician’s attention costs a fraction of a second on every patient, every day. Restraint is the feature."
    },
    "meta": [
      {
        "k": "Role",
        "v": "Human Factors · Research · Full-Stack Development"
      },
      {
        "k": "Domain",
        "v": "Clinical rehabilitation · stroke recovery"
      },
      {
        "k": "Research",
        "v": "3 occupational therapists · outpatient, home health, telehealth"
      },
      {
        "k": "Status",
        "v": "Live Prototype & Active Validation"
      }
    ],
    "stack": [
      "React",
      "TypeScript",
      "Supabase"
    ],
    "insights": [
      {
        "title": "1. Outcome-Driven Severity",
        "desc": "FMA-UE scores automatically segment patients into Mild, Moderate, or Severe baseline programs. The clinician logs an assessment, and the system assigns the appropriate program."
      },
      {
        "title": "2. Broad, Banded Pathways",
        "desc": "Within each severity band, pathways fit real life: occupation-based daily living, fine motor dexterity, return to work, left neglect, and shoulder protection."
      },
      {
        "title": "3. Adherence as an Early Warning",
        "desc": "Reach tracks active reps, mental practice, and assisted tasks. When adherence drops below 60%, it surfaces the patient as a stalled home program before a wasted visit."
      }
    ],
    "gallery": [
      {
        "src": "../../Rapheal-Portfolio/images/reach_program.png",
        "caption": "Reach Programs and Pathways: FMA-UE scores route patients into severity-banded programs"
      },
      {
        "src": "../../Rapheal-Portfolio/images/reach_caseload.png",
        "caption": "Caseload overview: Severity-banded patient routing and adherence tracking"
      },
      {
        "src": "../../Rapheal-Portfolio/images/reach_outcomes.png",
        "caption": "Detailed patient trajectory and outcome measures"
      }
    ]
  },
  {
    "id": "celio",
    "code": "CS-02",
    "title": "Celio",
    "year": "2026",
    "disciplines": [
      "iOS",
      "Accessibility",
      "Human Factors"
    ],
    "thumb": "../../assets/work/celio-ios-site.png",
    "hero": "../../assets/work/celio-ios-site.png",
    "liveUrl": "https://manyworldss.github.io/Celio/",
    "liveLabel": "Marketing website",
    "repoUrl": "https://github.com/manyworldss/Celio",
    "caseStudyUrl": "celio.html",
    "blurb": "An offline iPhone app that helps people with celiac disease explain their needs to the person cooking their food, in their language, and hear back. No account. Less friction at the table.",
    "sections": {
      "Problem": "Explaining celiac disease across a language barrier is more than translating a sentence. The person preparing the food needs to understand the restriction and cross-contact, while the person asking needs a clear way to hear back. That exchange happens at restaurants, dinner parties, and on delivery orders.",
      "Constraints": [
        "Work offline, without an account or a reliable connection.",
        "Keep the dietary message readable when a phone is handed to someone else.",
        "Make room for a reply, rather than treating communication as a one-way card.",
        "Keep the public website focused on explaining the iOS product."
      ],
      "Approach": "Ran 10+ interviews and surveyed 100+ people with celiac disease about dining barriers while traveling. Built a native iOS app in Swift and SwiftUI from those findings, then iterated on beta feedback. The current direction centers on presenting a clear dietary card, choosing the other person’s language, and supporting a two-way exchange. The marketing site explains that focused experience before someone installs the app.",
      "Outcome": "The native iOS app is in TestFlight with 50+ beta users across 3+ countries, with an App Store release coming soon. The public repository now contains a lightweight static marketing site. The former Django version is preserved under the django-web-app-final tag.",
      "Lessons Learned": "A focused communication aid is easier to explain and use than a collection of travel features. The central design question is whether two people can understand one another in the moment they need to."
    },
    "meta": [
      {
        "k": "Role",
        "v": "Product design · Research · Development"
      },
      {
        "k": "Research",
        "v": "10+ interviews · 100+ people surveyed"
      },
      {
        "k": "Beta",
        "v": "50+ users · 3+ countries"
      },
      {
        "k": "Product",
        "v": "iPhone app · Offline · No account"
      },
      {
        "k": "Status",
        "v": "TestFlight · App Store release coming soon"
      },
      {
        "k": "Public repository",
        "v": "Static marketing website"
      }
    ],
    "stack": [
      "Swift",
      "SwiftUI",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "insights": [
      {
        "title": "01 / Explain",
        "desc": "A dietary card makes the restriction and cross-contact needs visible to the person preparing the meal."
      },
      {
        "title": "02 / Exchange",
        "desc": "The interaction makes room for the other person to reply, completing the conversation."
      },
      {
        "title": "03 / Stay available",
        "desc": "Offline access and no account keep the tool ready when connectivity is limited."
      }
    ],
    "gallery": [
      {
        "src": "../../assets/work/celio-ios-site.png",
        "caption": "Current Celio marketing website: iPhone positioning and home-screen mockup."
      },
      {
        "src": "../../assets/work/celio-ios-exchange.png",
        "caption": "The marketing site’s exchange section: a walkthrough of the two-way interaction."
      }
    ]
  },
  {
    "id": "birk",
    "code": "CS-03",
    "title": "Birk Aerosystems",
    "year": "2026",
    "disciplines": [
      "Human Factors",
      "Workflow Design",
      "Automation"
    ],
    "blurb": "A local audit automation tool for aerospace quality teams. A guided three-step workflow turns shipping, receiving, and quality logs into monthly and year-to-date Excel reports.",
    "repoUrl": "https://github.com/manyworldss/birk-internal-tool",
    "caseStudyUrl": "birk.html",
    "sections": {
      "Problem": "Monthly audit preparation required quality staff to reconcile more than 9,000 rows of shipping, receiving, and RMA-NCR logs. Misspelled supplier names, mixed-unit quantities, and historical spreadsheets made the work slow and difficult to check.",
      "Constraints": [
        "No in-house software developers to maintain a server or troubleshoot terminal commands.",
        "Keep source files read-only and preserve existing Excel formulas, charts, and historical months.",
        "Support California and Florida sites with an entirely local workflow.",
        "Make exceptions visible where staff already work: inside Excel."
      ],
      "Approach": "Designed a guided three-step interface in plain English. A deterministic rules engine normalizes names, parses quantities, and calculates customer and supplier quality and on-time delivery metrics. Staff can review before-and-after figures, update an existing YTD workbook, or build a fresh report from a master template.",
      "Outcome": "Built a tool that turns 9,000+ log rows into audit reports in seconds for 12 staff across two sites. The local workflow records corrections in a human-readable Excel tab, giving staff a way to review the automation in their familiar workbook.",
      "Lessons Learned": "Automation has to make sense to the person who inherits it. Plain-language steps, visible exceptions, and preservation of familiar spreadsheets matter as much as processing speed."
    },
    "meta": [
      {
        "k": "Role",
        "v": "Engineering Intern, Aerospace Interiors"
      },
      {
        "k": "Focus",
        "v": "Monthly and YTD audit reporting"
      },
      {
        "k": "Environment",
        "v": "Local Windows workflow · Excel"
      },
      {
        "k": "Media",
        "v": "Project photos and screenshots to be added"
      },
      {
        "k": "Period",
        "v": "Oct. 2026 – Present"
      },
      {
        "k": "Team",
        "v": "12 staff · 2 sites"
      }
    ],
    "stack": [
      "Python",
      "PowerShell",
      "Excel"
    ],
    "insights": [
      {
        "title": "01 / Guide",
        "desc": "Three steps explain what happens and why, without requiring command-line knowledge."
      },
      {
        "title": "02 / Preserve",
        "desc": "Read-only source handling and targeted workbook updates protect formulas and historical records."
      },
      {
        "title": "03 / Review",
        "desc": "Exceptions appear in an Excel Outliers tab instead of a separate technical log."
      }
    ],
    "photoSlots": [
      "Guided workflow / overview",
      "Before-and-after workbook review",
      "Exception reporting / Outliers tab"
    ]
  },
  {
    "id": "prox",
    "code": "PX-04",
    "title": "Prox",
    "year": "2026",
    "disciplines": [
      "Onboarding UX",
      "iOS",
      "Capacitor"
    ],
    "thumb": "../../assets/work/prox-deals.png",
    "hero": "../../Rapheal-Portfolio/images/prox/08-deals-ready.png",
    "video": "../../Rapheal-Portfolio/images/prox/onboarding-walkthrough.mp4",
    "caseStudyUrl": "prox.html",
    "blurb": "A complete redesign of the first-time user experience for an iOS grocery-savings app, addressing a strict 3–5 minute data-loading constraint.",
    "sections": {
      "Problem": "On first sign-up, Prox must gather real-time price data for local stores in the user's area, which takes 3 to 5 minutes. The original flow threw a static loading spinner, appearing broken to new users and resulting in high drop-off rates before seeing value.",
      "Constraints": [
        "The 3–5 minute data pull is unavoidable and must happen in real time.",
        "Runs on Capacitor for iOS, requiring designs that account for cross-platform quirks while feeling native.",
        "Permission prompts must be deferred until value is established."
      ],
      "Approach": "Worked directly with the founder and engineering team to design two distinct onboarding strategies. The \"Honest\" approach tells users what is happening, shows real-time progress, and gives permission to leave while data loads (sending a push notification when ready). The \"Exclusivity\" approach reframes the wait as a reserved queue spot with founding member cards and referral incentives. Research included interviews, in-app and email surveys, and A/B tests with 250–300 monthly users.",
      "Outcome": "Rebuilt onboarding with 65% drop-off into a 12-screen flow. Sign-ups rose 30–40%, and 500+ users were onboarded. Shipped SwiftUI features and extended the iOS design system, translating Figma designs into production code. The company shipped the Honest approach.",
      "Lessons Learned": "You cannot always engineer away friction, but you can design how users perceive it. Giving users context, progress indicators, and an explanation for the wait turns frustration into anticipation."
    },
    "meta": [
      {
        "k": "Role",
        "v": "UX Engineer · Contractor"
      },
      {
        "k": "Context",
        "v": "Prox · iOS Grocery Savings Application"
      },
      {
        "k": "Deliverables",
        "v": "12-screen onboarding flow · SwiftUI features · iOS design system"
      },
      {
        "k": "Period",
        "v": "Apr. 2026 – June 2026"
      }
    ],
    "stack": [
      "iOS",
      "Capacitor",
      "Figma",
      "A/B Testing"
    ],
    "comparisons": [
      {
        "label": "Honest (Chosen)",
        "src": "../../Rapheal-Portfolio/images/prox/05-building-prox-honest.png",
        "desc": "Transparent setup framing that explains the live price pull and gives users permission to leave while data loads."
      },
      {
        "label": "Exclusivity",
        "src": "../../Rapheal-Portfolio/images/prox/06-early-access.png",
        "desc": "Invite-only queue framing with founding member spots, live countdown, and referral incentives."
      }
    ],
    "gallery": [
      {
        "src": "../../Rapheal-Portfolio/images/prox/01-choose-stores.png",
        "caption": "Store selection: 16 branded retailers with search and grouping",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/02-food-preferences.png",
        "caption": "Food preferences: dietary filters personalizing deal prioritization",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/03-feature-reveal.png",
        "caption": "Feature cards: swipeable cards showing real product screens",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/04-savings-preview.png",
        "caption": "Savings preview: interactive slider tied to actual spend",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/09-location.png",
        "caption": "Location permission: re-sequenced after sign-up when value is clear",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/07-founding-member.png",
        "caption": "Founding Member: payoff screen for the exclusivity path",
        "isMobile": true
      },
      {
        "src": "../../Rapheal-Portfolio/images/prox/08-deals-ready.png",
        "caption": "Deals Ready: reveal moment with deal count up and confetti",
        "isMobile": true
      }
    ]
  },
  {
    "id": "runa",
    "code": "NEXT-05",
    "title": "Runa",
    "year": "Upcoming",
    "upcoming": true,
    "disciplines": [
      "Upcoming Project"
    ],
    "blurb": "The next project. A place for the story, process, and visuals as they become ready to share.",
    "sections": {
      "Approach": "Runa is upcoming. Project details and visuals will be added here."
    },
    "meta": [
      {
        "k": "Status",
        "v": "Upcoming"
      },
      {
        "k": "Details",
        "v": "Coming soon"
      }
    ],
    "photoSlots": [
      "Runa / project preview"
    ]
  }
];
Object.assign(window, { WORK });
