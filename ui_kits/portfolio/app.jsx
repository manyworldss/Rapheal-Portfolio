/* ============================================================
   Portfolio, data + panel content + composition.
   Technical Support · Systems · AI Quality Assurance.
   Apple / Linear / Stripe register: 5 engineering headings
   Problem · Constraints · Approach · Outcome · Lessons Learned
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'reach', code: 'CS-01', title: 'Reach', year: '2025',
    disciplines: ['Human Factors', 'Clinical Systems', 'Full-Stack'],
    thumb: '../../assets/work/reach-card.jpg',
    hero: '../../assets/work/reach-card.jpg',
    blurb: 'A clinician-facing platform for stroke motor recovery that unifies standardized outcome measures with home-program adherence tracking, built so a therapist can see who is off-track and who needs attention in seconds.',
    sections: {
      'Problem': 'Rehab therapists carry large caseloads and monitor recovery across many patients at once. Existing tools bury the signal, trajectories, adherence, and remote-monitoring status live in separate views, so deciding who needs attention first means reconstructing each patient by hand under time pressure.',
      'Constraints': [
        'Clinicians read the interface between appointments, in seconds, not minutes.',
        'Recovery data is noisy and non-linear; a single session tells you little.',
        'Patient-safety domain, an interface that hides a declining patient is a use-error, not a design nitpick.',
        'Built solo, full-stack, on a student timeline.',
      ],
      'Approach': 'Shaped by structured feedback sessions with three occupational therapists across outpatient, home health, and telehealth settings. Applied human-factors principles, severity-banded patient routing and a 60% adherence-auditing threshold, to reduce clinician cognitive load and flag stalled home programs early. Information architecture is ordered by clinical urgency, so attention lands where it matters first.',
      'Outcome': 'A working platform where a therapist can scan a caseload and identify off-track patients at a glance, with drill-down into per-patient trajectories and program adherence. Validated against the review workflow it replaces.',
      'Lessons Learned': 'In a safety-adjacent tool, the hard problem is not visualization, it is deciding what to omit. Every element competing for the clinician’s attention costs a fraction of a second on every patient, every day. Restraint is the feature.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Domain', v: 'Clinical rehabilitation · stroke recovery' },
      { k: 'Research', v: '3 occupational therapists · outpatient, home health, telehealth' },
      { k: 'Status', v: 'Prototype, in validation' },
    ],
  },
  {
    id: 'celio', code: 'CS-02', title: 'Celio', year: '2025',
    disciplines: ['Human Factors', 'Accessibility', 'Full-Stack'],
    thumb: '../../assets/work/celio-landing.png',
    hero: '../../assets/work/celio-landing.png',
    blurb: 'A digital passport app that helps celiac travelers communicate dietary restrictions across a language barrier, shaped by two years of user research into a tool people trust in the moment that matters.',
    sections: {
      'Problem': 'For someone with Celiac disease, communicating dietary needs abroad is a safety decision made across a language barrier, often under social pressure. Getting it wrong has real medical consequences, and generic translation tools are not trusted in the moment that matters.',
      'Constraints': [
        'The critical interaction happens in seconds, in person, across a language barrier.',
        'Medical trust; the message has to be unambiguous and complete.',
        'Accessibility-first, it has to work for the widest range of users and contexts.',
        'It lives on the phone the traveler already carries, nothing to install in the moment.',
      ],
      'Approach': 'Grounded in two years of user research, 10+ qualitative interviews and 100+ people with Celiac disease surveyed, translated into accessibility-focused communication features. Shipped 4–5 features in direct response to user feedback via TestFlight, including recently added voice-to-text, iterating on what people actually reached for under pressure.',
      'Outcome': 'A deployed app sustaining 50+ active users across 3+ countries via TestFlight, the whole high-stakes exchange reduced to one artifact the traveler can show or speak aloud.',
      'Lessons Learned': 'Designing for a high-stakes moment means designing for the worst conditions, not the demo. Stressed, non-native, in-person context is the real spec, and only sustained user research surfaces what that context actually demands.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Research', v: '10+ interviews · 100+ surveyed · 2 years' },
      { k: 'Users', v: '50+ active · 3+ countries · TestFlight' },
      { k: 'Live', v: 'celioapp.up.railway.app' },
    ],
  },
  {
    id: 'handshake', code: 'CS-03', title: 'AI Quality Assurance', year: '2026',
    disciplines: ['AI Quality Assurance', 'Structured Evaluation', 'Human Factors'],
    thumb: '../../assets/work/north-star-hero.png',
    hero: '../../assets/work/north-star-hero.png',
    blurb: 'Structured quality evaluation of AI-generated frontend components for a leading AI research lab, building the bug taxonomy a 12-person team scored against.',
    sections: {
      'Problem': 'At volume, evaluating AI-generated frontend output drifts. Reviewers apply a generalized rubric inconsistently, defects slip through, and the feedback that reaches model iteration is noisy. QA needs structure that holds up across a whole team without fatigue.',
      'Constraints': [
        'Reviewer judgment must stay consistent across thousands of outputs, without drift or fatigue.',
        'Scoring has to be structured enough to feed directly into model iteration.',
        'The taxonomy has to be specific enough to separate UI defects, functional issues, and edge cases.',
      ],
      'Approach': 'Evaluated 3,000+ AI-generated frontend components with rubric-based rating and structured QA methods. Built a bug taxonomy tailored to UI defects, functional issues, and edge cases that replaced the generalized rubric previously in use, and drove its adoption across a 12-person evaluation team.',
      'Outcome': 'Identified that 40–50% of evaluated outputs carried defects or inconsistencies, surfacing recurring gaps back into model-reliability work. The taxonomy was adopted team-wide as the shared scoring standard.',
      'Lessons Learned': 'At scale, the leverage is not the individual rating, it is the shared vocabulary. A precise taxonomy is what makes a whole team’s judgment consistent, and consistent judgment is what makes the feedback usable.',
    },
    meta: [
      { k: 'Role', v: 'AI Evaluation Specialist · Contract' },
      { k: 'Context', v: 'Leading AI research lab · via Handshake AI' },
      { k: 'Scope', v: '3,000+ frontend components evaluated · 12-person team' },
      { k: 'Year', v: '2025–2026' },
    ],
  },
  {
    id: 'materialsiq', code: 'CS-04', title: 'MaterialIQ', year: '2025',
    disciplines: ['AI Quality Analysis', 'Browser Extension', 'FastAPI'],
    thumb: '../../assets/work/materialiq-card.jpg',
    hero: '../../assets/work/materialiq-card.jpg',
    blurb: 'An AI-powered browser extension that analyzes product quality, material composition, and value for money in real time while shopping online.',
    sections: {
      'Problem': 'Consumers spend hundreds of dollars on products assuming high quality, often struggling to understand material blends, construction details, and fair pricing. Without objective data, price is often falsely equated with durability.',
      'Constraints': [
        'Must parse unstructured e-commerce product descriptions in real time directly within the browser.',
        'Low-latency inference and clear rule-based scoring engines so users understand score derivation.',
        'Must degrade gracefully when site layouts break extraction rules.',
      ],
      'Approach': 'Developed an AI-powered Chrome extension backed by FastAPI. The system extracts fiber composition and fabric weight to calculate a Material Quality Score, infers a Durability Estimate from construction cues, and computes an objective Value Score to determine if an item is worth its asking price.',
      'Outcome': 'Launched MaterialIQ (Beta) on the Chrome Web Store with Skimlinks integration, providing shoppers with instant, transparent scoring directly in their shopping carts to remove purchasing uncertainty.',
      'Lessons Learned': 'Building consumer trust requires extreme transparency in algorithmic scoring. Users do not trust a black-box "Quality Score"; they need to see the exact fiber breakdowns and rule-based logic that drove the calculation.',
    },
    meta: [
      { k: 'Role', v: 'AI Quality Analysis · Chrome Extension · Full-Stack' },
      { k: 'Domain', v: 'E-commerce quality scoring · Natural language parsing' },
      { k: 'Tech', v: 'Chrome Extension API · FastAPI · Skimlinks' },
      { k: 'Status', v: 'Beta on Chrome Web Store' },
    ],
  },
  {
    id: 'prox', code: 'CS-05', title: 'Prox', year: '2025',
    disciplines: ['Onboarding UX', 'iOS', 'Capacitor'],
    thumb: '../../assets/work/prox-deals.png',
    hero: '../../assets/work/prox-deals.png',
    blurb: 'A complete redesign of the first-time user experience for an iOS grocery-savings app, addressing a strict 3–5 minute data-loading constraint.',
    sections: {
      'Problem': 'On first sign-up, the app must gather real-time price data for local stores, which takes 3 to 5 minutes. The original flow threw a static loading spinner, appearing broken to new users and resulting in high drop-off rates before seeing value.',
      'Constraints': [
        'The 3–5 minute data pull is unavoidable and must happen in real time.',
        'Runs on Capacitor for iOS, requiring designs that account for cross-platform quirks while feeling native.',
        'Permission prompts must be deferred until value is established.',
      ],
      'Approach': 'Shifted the psychological framing of the wait. Instead of a forced pause, designed an upfront preferences flow (store selection, dietary needs) that masks the initial loading time and makes the wait feel personalized and productive. Introduced an "honest" transparent setup framework that gave users permission to leave while data loaded.',
      'Outcome': 'Delivered an end-to-end 14-screen onboarding redesign. Implemented interactive features like a potential savings slider, deferred location permissions to build trust incrementally, and a tangible payoff screen when deals are ready.',
      'Lessons Learned': 'You cannot always engineer away friction, but you can design how users perceive it. Giving users context, progress indicators, and an explanation for the wait turns frustration into anticipation.',
    },
    meta: [
      { k: 'Role', v: 'UX Designer · Contract' },
      { k: 'Context', v: 'Prox · iOS Grocery Savings Application' },
      { k: 'Deliverables', v: '14-screen onboarding flow · Interactive prototypes · Capacitor iOS' },
      { k: 'Period', v: 'Apr 2024 – Jul 2024' },
    ],
  },
  {
    id: 'illumi', code: 'CS-06', title: 'iLLumi', year: '2024',
    disciplines: ['Enterprise SaaS', 'Contract Analytics', 'Information Architecture'],
    thumb: '../../assets/work/illumi-analytics.png',
    hero: '../../assets/work/illumi-analytics.png',
    blurb: 'An analytics product whose data was rich and whose interface was overwhelming, re-architected around key user decision paths to transform complex contract data into actionable clarity.',
    sections: {
      'Problem': 'Enterprise contract management platforms generate deep telemetry, but presenting raw data tables causes high cognitive fatigue for compliance officers tracking renewal deadlines and liability risks across thousands of vendor agreements.',
      'Constraints': [
        'High-density information must remain scannable without hiding critical contract clauses.',
        'Compliance workflows require immediate visibility into expiring terms and liability thresholds.',
        'Design must integrate into legacy enterprise dashboards.',
      ],
      'Approach': 'Re-architected analytics views around the decisions users were actually trying to make. Grouped, sequenced, and de-emphasized until the dashboard read like a sentence instead of a spreadsheet — fewer things on screen, more meaning per glance.',
      'Outcome': 'Reduced user task completion time and compliance oversight anxiety, establishing a clear visual hierarchy for contract lifecycle management.',
      'Lessons Learned': 'Information density is not the problem, un-sequenced density is. When complex data is ordered by decision priority, users process complex states effortlessly.',
    },
    meta: [
      { k: 'Role', v: 'Information Architecture · Systems Design' },
      { k: 'Domain', v: 'Enterprise SaaS · Contract Analytics & Compliance' },
      { k: 'Scope', v: 'Contract lifecycle tracking · Risk dashboards' },
      { k: 'Year', v: '2024' },
    ],
  },
];

function AboutContent() {
  return (
    <div>
      <PanelTitle index="About">Support, systems, and the people who use them.</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I'm a technical support and systems professional. I troubleshoot enterprise SaaS platforms,
          partner with engineering to run down complex defects, and document the fix so the next
          person doesn't have to ask. The dev background, Python, SQL, AWS, Salesforce, lets me go a
          layer deeper than the ticket.
        </p>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I'm finishing an accelerated B.S./M.S. in Human Factors Psychology at Embry-Riddle. It's the
          lens I'll move fully into once the degree is done, reducing cognitive load, eliminating
          use-error, and making high-stakes systems safer to operate, and it already shapes how I
          approach support and QA today.
        </p>
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    ['Email', 'raphealsuberusca@gmail.com', 'mailto:raphealsuberusca@gmail.com'],
    ['LinkedIn', 'in/raphealsuber', 'https://www.linkedin.com/in/raphealsuber/'],
    ['GitHub', 'manyworldss', 'https://github.com/manyworldss'],
  ];
  return (
    <div>
      <PanelTitle index="Contact">Let's talk.</PanelTitle>
      <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', marginBottom:'2rem', maxWidth:'42ch' }}>
        Open to roles in technical support, technical operations, AI quality assurance, and enterprise SaaS support. Based in Greenville, SC.
      </p>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {links.map(([l,v,h],i)=>(
          <a key={l} data-hot href={h} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'1.2rem 0', borderTop:'var(--hair) solid var(--border)', borderBottom: i===links.length-1?'var(--hair) solid var(--border)':'none' }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h3)', color:'var(--text-strong)' }}>{l}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--text-faint)' }}>{v} →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [openCase, setOpenCase] = useAppState(null);
  const [panel, setPanel] = useAppState(null);
  const onOpen = (id) => {
    if (id === 'about' || id === 'contact') setPanel(id);
    else if (id === 'work') { const w = document.querySelector('#work'); if (w) scrollTo({ top: w.offsetTop - 40, behavior: 'smooth' }); }
    else setOpenCase(WORK.find((w) => w.id === id));
  };
  return (
    <React.Fragment>
      <BlueprintBg />
      <ScrollProgress />
      <Nav onOpen={onOpen} />
      <main id="top" style={{ position:'relative', zIndex:1 }}>
        <Hero onOpen={onOpen} />
        <CaseStudies items={WORK} onOpen={onOpen} />
        <Footer onOpen={onOpen} />
      </main>
      <CaseOverlay item={openCase} onClose={() => setOpenCase(null)} />
      <Panel open={panel === 'about'} onClose={() => setPanel(null)}><AboutContent /></Panel>
      <Panel open={panel === 'contact'} onClose={() => setPanel(null)}><ContactContent /></Panel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
