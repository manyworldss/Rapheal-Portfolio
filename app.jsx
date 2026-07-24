/* ============================================================
   Editorial Archive v2 — data + panel contents + composition.
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'celio', code: 'C-01', title: 'Celio', year: '2025',
    disciplines: ['UX Research', 'Product Design'],
    thumb: './assets/work/celio-landing.png',
    hero: './assets/work/celio-landing.png',
    summary: 'A consumer health e-card reimagined around a single question: in the moment that matters, can someone find what they need without thinking?',
    detail: 'Celio is an offline-first platform tackling the cognitive load of international travel for Celiacs. It combines a 12-language Translation Card with text-to-speech audio and native Apple/Google Wallet export, an on-device local LLM assistant (Sage AI) for private offline queries, and interactive establishment maps.',
    meta: [
      { k: 'Role', v: 'UX Researcher · Designer · Full-Stack Developer' },
      { k: 'Stack', v: 'Django, Alpine.js, WebLLM, Web Speech API, Wallet Passes APIs' },
      { k: 'Timeline', v: '9 months' },
    ],
  },
  {
    id: 'reach', code: 'RE-05', title: 'Reach', year: '2025',
    disciplines: ['UX Research', 'Human Factors', 'Full-Stack'],
    thumb: './assets/work/reach-card.jpg',
    hero: './assets/work/reach-card.jpg',
    summary: 'A caseload and outcome-tracking platform for rehab therapists treating upper-extremity motor recovery after stroke, built so a clinician can see in seconds who needs attention and whether a patient is on track.',
    detail: 'Designed around the clinician’s glance: recovery trajectories against expected ranges, assigned programs with adherence, and remote monitoring status in one view, so attention lands where it matters first.',
    meta: [
      { k: 'Role', v: 'UX Research · Human Factors · Full-Stack' },
      { k: 'Context', v: 'Clinical rehabilitation · stroke recovery' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'prox', code: 'PX-04', title: 'Prox', year: '2025', contain: true,
    disciplines: ['UX Designer', 'Contract'],
    thumb: './assets/work/prox-deals.png',
    hero: './assets/work/prox-deals.png',
    summary: 'An unsolicited onboarding redesign that the team adopted as their first-time user experience direction. They then brought me on to see it through.',
    detail: 'Led the full redesign across 14 screens, focused on reducing mobile friction, improving feature comprehension, and driving first-time activation. Now running A/B tests, event tracking, and post-activation surveys to measure how the changes hold up on retention.',
    meta: [
      { k: 'Role', v: 'UX Designer · Contract' },
      { k: 'Scope', v: '14 screens · iOS onboarding' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'materialiq', code: 'MQ-06', title: 'MaterialIQ', year: '2026', beta: true, page: 'materialsiq.html',
    disciplines: ['Chrome Extension', 'Full-Stack'],
    thumb: './assets/work/materialiq-card.jpg',
    hero: './assets/work/materialiq-card.jpg',
    summary: 'I built an AI browser extension to break down retail product specs in real time, scoring material quality, estimated durability, and actual value right inside the shopping cart.',
    detail: 'I designed it to cut through marketing fluff while shopping: it parses fabric blends directly from the page, evaluates real material substance versus brand markup, and surfaces a clear verdict right where you decide.',
    meta: [
      { k: 'Role', v: 'Design · Full-Stack' },
      { k: 'Context', v: 'Browser extension · AI' },
      { k: 'Year', v: '2026' },
    ],
  },
];

function AboutContent() {
  return (
    <div>
      <PanelTitle index="A">About</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          Having built full-stack applications from the ground up, I can speak the language of engineering
          while using a psychology background to advocate for the human on the other side of the screen.
        </p>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I'm formalizing that intersection through an accelerated B.S./M.S. in Human Factors Psychology at
          Embry-Riddle, pointed at high-stakes environments: reducing cognitive load, eliminating use-errors,
          and building trust in the systems that define our future.
        </p>
      </div>
      <div style={{ marginTop:'2rem', borderTop:'var(--hair) solid var(--border)', paddingTop:'1.5rem' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.5rem' }}>Education</div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-sm)', color:'var(--text-muted)', lineHeight:1.6 }}>
          B.S./M.S. Human Factors Psychology<br/>Embry-Riddle Aeronautical University · Accelerated Program
        </p>
      </div>
      <div style={{ marginTop:'2rem', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
        {[['Movement','Soccer','Running','Hiking'],['Creative','Painting','Culinary','Simulations'],['Reading','Dune','Hyperion','Atomic Habits']].map((g)=>(
          <div key={g[0]}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent-2)', marginBottom:'0.7rem' }}>{g[0]}</div>
            {g.slice(1).map((x)=> <div key={x} style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)', padding:'0.15rem 0' }}>{x}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent() {
  const roles = [
    {
      title: 'UX Designer', org: 'Prox · Contract',
      body: "Sent an unsolicited onboarding redesign to the team. They adopted it as the product's first-time user experience direction and brought me on to see it through. Led the full redesign across 14 screens, focused on reducing mobile friction, improving feature comprehension, and driving first-time activation. Running A/B tests, event tracking, and post-activation surveys to measure how the changes hold up on retention.",
    },
    {
      title: 'AI Evaluation Specialist', org: 'Handshake AI · Contract',
      body: 'Contracted by a leading AI research lab to evaluate LLM-generated outputs for quality, accuracy, and alignment with UX principles. Reviewed and scored 500+ outputs, returning structured feedback to directly improve model iteration cycles.',
    },
    {
      title: 'Software Engineer (UX)', org: 'Wazzle AI',
      body: 'Led mixed-methods research combining behavioral analytics and support ticket analysis to identify product gaps, driving an 18% increase in conversion. Translated ambiguous feedback into testable hypotheses and shipped iterative UX improvements via A/B testing.',
    },
    {
      title: 'Technical Support Engineer', org: 'Greenville County',
      body: 'Redesigned and automated the employee onboarding experience, cutting device setup time by rewriting legacy workflows. Built documentation systems that reduced cognitive overhead for support staff and standardized procedures across the department.',
    },
  ];
  return (
    <div>
      <PanelTitle index="E">Experience</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {roles.map((r, i) => (
          <div key={r.title} style={{ padding:'1.6rem 0', borderTop: i ? 'var(--hair) solid var(--border)' : 'none' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem', flexWrap:'wrap', marginBottom:'0.8rem' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-h3)', color:'var(--text-strong)', margin:0 }}>{r.title}</h3>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)' }}>{r.org}</span>
            </div>
            <p style={{ margin:0, fontSize:'var(--text-sm)', lineHeight:'var(--leading-sm)', color:'var(--text-muted)' }}>{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    ['Email', 'raphealsuber@gmail.com', 'mailto:raphealsuber@gmail.com'],
    ['LinkedIn', 'in/raphealsuber', 'https://www.linkedin.com/in/raphealsuber/'],
    ['GitHub', 'manyworldss', 'https://github.com/manyworldss'],
  ];
  return (
    <div>
      <PanelTitle index="C">Contact</PanelTitle>
      <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', marginBottom:'2rem', maxWidth:'40ch' }}>
        Open to UX research, product design, and human factors roles. Let's talk about the work.
      </p>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {links.map(([l,v,h],i)=>(
          <a key={l} data-hot href={h} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'1.3rem 0', borderTop:'var(--hair) solid var(--border)', borderBottom: i===links.length-1?'var(--hair) solid var(--border)':'none' }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h2)', color:'var(--text-strong)' }}>{l}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--text-faint)' }}>{v} →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [panel, setPanel] = useAppState(null);
  const onOpen = (id) => {
    if (id === 'about' || id === 'contact' || id === 'experience') setPanel(id);
    else if (id === 'work') { const w = document.querySelector('#work'); if (w) scrollTo({ top: w.offsetTop - 20, behavior: 'smooth' }); }
  };
  return (
    <React.Fragment>
      <Cursor />
      <IntroCurtain />
      <Nav onOpen={onOpen} />
      <main id="top">
        <Hero onOpen={onOpen} />
        <Projects items={WORK} />
        <FieldNote />
        <Collection />
        <Footer onOpen={onOpen} />
      </main>
      <Panel open={panel === 'about'} onClose={() => setPanel(null)}><AboutContent /></Panel>
      <Panel open={panel === 'experience'} onClose={() => setPanel(null)}><ExperienceContent /></Panel>
      <Panel open={panel === 'contact'} onClose={() => setPanel(null)}><ContactContent /></Panel>
      <div className="vignette" aria-hidden="true"></div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
