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
    "blurb": "A platform I built to help occupational therapists track stroke recovery, review home exercise adherence, and identify patients who may need additional attention.",
    "sections": {
      "Problem": "Occupational therapists often manage several patients at once. Standardized assessments such as the FMA-UE, ARAT, and Box & Blocks can be difficult to document consistently, and home exercise data may live somewhere else entirely. I wanted to bring that information together so therapists could spend less time piecing together a patient’s progress.",
      "Constraints": [
        "Therapists may only have a few seconds to review the interface between appointments.",
        "Recovery data is noisy and non-linear; a single session tells you little.",
        "The interface needs to make declining patient progress easy to identify.",
        "I built the prototype independently on a short timeline."
      ],
      "Approach": "I worked with three occupational therapists across outpatient, home health, and telehealth settings. Their feedback helped me organize patients by severity and clinical urgency. I also added a flag for home program adherence below 60% and incorporated remote therapeutic monitoring features based on the 2026 billing codes.",
      "Outcome": "I built a working prototype with a caseload overview, individual recovery histories, and home program adherence tracking. I used clinician feedback to evaluate how the interface fits their existing workflow.",
      "Lessons Learned": "Working with occupational therapists changed how I approached Reach. I initially focused on presenting recovery data, but I realized that clinicians also needed help determining which patients required their attention first."
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
        "title": "2. Recovery pathways",
        "desc": "Programs include daily living, fine motor skills, return to work, left neglect, and shoulder protection."
      },
      {
        "title": "3. Adherence as an Early Warning",
        "desc": "Reach tracks exercise repetitions, mental practice, and assisted tasks. Adherence below 60% flags a patient for review."
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
    "blurb": "An offline iPhone app that helps people with celiac disease explain their dietary needs in another language and get a response from the person preparing their food.",
    "sections": {
      "Problem": "Explaining celiac disease in another language can be difficult, especially when the person preparing your food is unfamiliar with cross-contact. A translation card can explain what you cannot eat, but it leaves you with another problem: how do you understand the response? I wanted Celio to help with that part of the conversation as well.",
      "Constraints": [
        "Work offline, without an account or a reliable connection.",
        "Keep the dietary message readable when a phone is handed to someone else.",
        "Allow the other person to respond in their language.",
        "Keep the public website focused on explaining the iOS product."
      ],
      "Approach": "I interviewed more than 10 people and surveyed over 100 people with celiac disease about their experiences dining while traveling. I built the iOS app in Swift and SwiftUI and used beta feedback to refine it. The main interaction is now a dietary card followed by a two-way exchange in the other person’s language.",
      "Outcome": "I moved the project from Django to a native iPhone app. The public repository now hosts the marketing website, and the original web app is available under the django-web-app-final tag.",
      "Lessons Learned": "I spent a great deal of time exploring what Celio could become. I eventually decided to focus on the conversation between the person with celiac disease and the person preparing their food, rather than trying to build an entire travel app."
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
        "desc": "The person preparing the food can respond rather than simply read the card."
      },
      {
        "title": "03 / Offline access",
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
    "blurb": "An internal Windows tool I built to automate monthly and year-to-date quality reporting from aerospace shipping, receiving, and quality logs.",
    "repoUrl": "https://github.com/manyworldss/birk-internal-tool",
    "caseStudyUrl": "birk.html",
    "sections": {
      "Problem": "The quality team had to review more than 9,000 rows of shipping, receiving, and RMA-NCR data for monthly audits. Supplier names were sometimes misspelled, quantities used different units, and historical spreadsheets had to be maintained. Much of the work involved checking and correcting data manually.",
      "Constraints": [
        "No in-house software developers to maintain a server or troubleshoot terminal commands.",
        "Keep source files read-only and preserve existing Excel formulas, charts, and historical months.",
        "Support California and Florida sites with an entirely local workflow.",
        "Show exceptions in Excel so staff can review them."
      ],
      "Approach": "I built a three-step workflow that normalizes supplier names, parses quantities, and calculates customer and supplier quality and on-time delivery metrics. Staff can compare the figures before updating an existing year-to-date workbook or generating a new report from a template. I also added an Excel tab for exceptions that require review.",
      "Outcome": "The tool can process more than 9,000 rows and generate audit reports in seconds. It was built for 12 staff across two sites, using their existing Excel workflow. Staff can review corrections directly in the workbook.",
      "Lessons Learned": "One of my biggest considerations was how the team would maintain this software without a dedicated developer. It needed to be easy to run, and if something went wrong, the staff needed to understand why."
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
        "title": "01 / Three-step workflow",
        "desc": "Three steps explain what happens and why, without requiring command-line knowledge."
      },
      {
        "title": "02 / Protect existing workbooks",
        "desc": "Read-only source handling and targeted workbook updates protect formulas and historical records."
      },
      {
        "title": "03 / Review exceptions",
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
    "code": "CS-04",
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
    "blurb": "I redesigned the onboarding experience for an iOS grocery-savings app that needs three to five minutes to gather local prices when someone signs up.",
    "sections": {
      "Problem": "Prox needs three to five minutes to gather local grocery prices during sign-up. The original onboarding flow showed a loading spinner without much explanation, and many new users left before seeing their first deals.",
      "Constraints": [
        "The 3–5 minute data pull is unavoidable and must happen in real time.",
        "The app runs on Capacitor for iOS, so designs need to account for its limitations.",
        "Permission prompts must be deferred until value is established."
      ],
      "Approach": "I worked with the founder and engineering team on two approaches. The first explained the wait, showed progress, and let users leave while the app gathered prices. The second used an early-access queue, founding member cards, and referrals. Interviews, surveys, and A/B testing with 250–300 monthly users informed the work.",
      "Outcome": "I redesigned the onboarding into a 12-screen flow. The previous flow had a 65% drop-off rate; sign-ups rose 30–40%, and more than 500 users were onboarded. I also implemented SwiftUI features and contributed to the iOS design system. The company shipped the honest approach.",
      "Lessons Learned": "The three-to-five-minute wait was something we had to work around. I think the honest approach was the right decision because users could understand what the app was doing and leave instead of sitting through a loading screen."
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
        "desc": "Shows progress while prices load and lets users leave and receive a notification when their deals are ready."
      },
      {
        "label": "Exclusivity",
        "src": "../../Rapheal-Portfolio/images/prox/06-early-access.png",
        "desc": "An early-access queue with founding member spots, a countdown, and referral incentives."
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
    "code": "CS-05",
    "title": "Runa",
    "year": "In progress",
    "upcoming": true,
    "disciplines": [
      "macOS",
      "Writing",
      "Human-Centered Design"
    ],
    "blurb": "A Mac app I am exploring to help people organize their thoughts, write in their own voice, and manage their time and priorities.",
    "sections": {
      "Problem": "Runa started with a problem I had myself. I wanted help organizing my thoughts and writing more efficiently without losing my own voice. I am now exploring how that same idea could extend to managing my time and priorities.",
      "Constraints": [
        "No outside data collection or tracking, ever.",
        "No screen monitoring, keystroke logging, browser history, or tracking of other applications.",
        "Personalization is limited to information the user gives Runa and activity inside Runa.",
        "Any in-app behavioral data must be transparent, controllable, and useful to the user.",
        "No diagnosis or claims of treating ADHD."
      ],
      "Approach": "I am exploring a native Mac app that learns from writing samples and helps with outlining, editing, tasks, and reminders. I want the person using it to remain responsible for the ideas and writing. I am still working through the design, so these are planned features rather than released functionality."
    },
    "meta": [
      {
        "k": "Status",
        "v": "In progress · Concept and product direction"
      },
      {
        "k": "Platform",
        "v": "Native Mac companion"
      },
      {
        "k": "Focus",
        "v": "Writing · Priorities · Intentional use of time"
      },
      {
        "k": "Data boundary",
        "v": "User-provided information and activity inside Runa only"
      }
    ],
    "photoSlots": [
      "Runa / writing experience",
      "Runa / priorities and workload"
    ],
    "status": "In progress",
    "insights": [
      {
        "title": "01 / Keep the author in charge",
        "desc": "Learn from writing examples and offer scaffolding while leaving the creative and intellectual work to the person."
      },
      {
        "title": "02 / Tasks and priorities",
        "desc": "Explore how tasks, reminders, and workload information can help people decide what to work on next."
      },
      {
        "title": "03 / Keep boundaries visible",
        "desc": "No outside tracking. Any in-app behavioral data must be transparent, controllable, and useful."
      }
    ]
  }
];
Object.assign(window, { WORK });
