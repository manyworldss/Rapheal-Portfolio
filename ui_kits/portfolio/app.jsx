/* ============================================================
   Portfolio, data + panel content + composition.
   Technical Support · Systems · AI Quality Assurance.
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'reach', code: 'CS-01', title: 'Reach', year: '2025',
    disciplines: ['Human Factors', 'Clinical Systems', 'Full-Stack'],
    thumb: null,
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
        'Medical trust: the message has to be unambiguous and complete.',
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
