/* ============================================================
   Editorial Archive — app composition & data.
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'celio', code: 'C-01', title: 'Celio', year: '2025',
    disciplines: ['UX Research', 'Product Design', 'B2C'],
    thumb: './assets/work/celio-card.png',
    hero: './assets/work/celio-landing.png',
    summary: 'A consumer health e-card reimagined around a single question: in the moment that matters, can someone find what they need without thinking?',
    detail: 'Research surfaced where the existing card created hesitation and ambiguity. The redesign stripped the interface to its load-bearing parts, rebuilt the information hierarchy around real moments of use, and pushed everything non-essential out of the way — clarity as the primary feature.',
    meta: [
      { k: 'Role', v: 'UX Research · Product Design' },
      { k: 'Context', v: 'Consumer health · B2C' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'north-star', code: 'NS-02', title: 'North Star', year: '2025',
    disciplines: ['AI Evaluation', 'Human Factors'],
    thumb: './assets/work/north-star-hero.png',
    hero: './assets/work/north-star-hero.png',
    summary: 'A human-factors-driven platform for evaluating AI model outputs — built to make judgment legible, consistent, and fast at scale.',
    detail: 'Designed the evaluation surface so reviewers could score hundreds of outputs without drift or fatigue: structured rubrics, low-friction input, and an information architecture that keeps the relevant context in view. The work sits at the seam between cognitive ergonomics and model iteration.',
    meta: [
      { k: 'Role', v: 'Human Factors · Product' },
      { k: 'Context', v: 'AI model evaluation' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'illumi', code: 'IL-03', title: 'Illumi', year: '2024',
    disciplines: ['Information Architecture', 'B2B'],
    thumb: './assets/work/illumi-analytics.png',
    hero: './assets/work/illumi-analytics.png',
    summary: 'An analytics product whose data was rich and whose interface was overwhelming. The job was structure — turning a wall of numbers into a path.',
    detail: 'Re-architected the analytics views around the decisions users were actually trying to make. Grouped, sequenced, and de-emphasized until the dashboard read like a sentence instead of a spreadsheet — fewer things on screen, more meaning per glance.',
    meta: [
      { k: 'Role', v: 'Information Architecture' },
      { k: 'Context', v: 'B2B analytics' },
      { k: 'Year', v: '2024' },
    ],
  },
  {
    id: 'prox', code: 'PX-04', title: 'Prox', year: '2025',
    disciplines: ['Onboarding UX', 'iOS', 'Product Design'],
    thumb: './assets/work/prox-deals.png?v=2',
    hero: './assets/work/prox-deals.png?v=2',
    summary: 'An unsolicited onboarding redesign that the team adopted as their first-time user experience direction — then brought me on to see it through.',
    detail: 'Led the full redesign across 14 screens, focused on reducing mobile friction, improving feature comprehension, and driving first-time activation. Now running A/B tests, event tracking, and post-activation surveys to measure how the changes hold up on retention.',
    meta: [
      { k: 'Role', v: 'UX Designer · Contract' },
      { k: 'Scope', v: '14 screens · iOS onboarding' },
      { k: 'Year', v: '2025' },
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
          Embry-Riddle — pointed at high-stakes environments: reducing cognitive load, eliminating use-errors,
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
  const experiences = [
    {
      role: 'UX Designer',
      company: 'Prox',
      type: 'Contract',
      desc: "Sent an unsolicited onboarding redesign to the team. They adopted it as the product's first-time user experience direction and brought me on to see it through. Led the full redesign across 14 screens, focused on reducing mobile friction, improving feature comprehension, and driving first-time activation. Running A/B tests, event tracking, and post-activation surveys to measure how the changes hold up on retention."
    },
    {
      role: 'AI Evaluation Specialist',
      company: 'Handshake AI',
      type: 'Contract',
      desc: "Contracted by a leading AI research lab to evaluate LLM-generated outputs for quality, accuracy, and alignment with UX principles. Reviewed and scored 500+ outputs, returning structured feedback to directly improve model iteration cycles."
    },
    {
      role: 'Software Engineer (UX)',
      company: 'Wazzle AI',
      desc: "Led mixed-methods research combining behavioral analytics and support ticket analysis to identify product gaps, driving an 18% increase in conversion. Translated ambiguous feedback into testable hypotheses and shipped iterative UX improvements via A/B testing."
    },
    {
      role: 'Technical Support Engineer',
      company: 'Greenville County',
      desc: "Redesigned and automated the employee onboarding experience, cutting device setup time by rewriting legacy workflows. Built documentation systems that reduced cognitive overhead for support staff and standardized procedures across the department."
    }
  ];

  return (
    <div>
      <PanelTitle index="E">Experience</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem' }}>
        {experiences.map((exp, i) => (
          <div key={i} style={{ borderBottom: i !== experiences.length - 1 ? 'var(--hair) solid var(--border)' : 'none', paddingBottom: i !== experiences.length - 1 ? '1.5rem' : 0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap:'0.5rem', marginBottom:'0.5rem' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-h2)', color:'var(--text-strong)', margin:0 }}>{exp.role}</h3>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)' }}>
                {exp.company} {exp.type ? `· ${exp.type}` : ''}
              </span>
            </div>
            <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', margin:0 }}>
              {exp.desc}
            </p>
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
            <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-h2)', color:'var(--text-strong)' }}>{l}</span>
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
    if (id === 'about' || id === 'experience' || id === 'contact') setPanel(id);
    else setOpenCase(WORK.find((w) => w.id === id));
  };
  return (
    <React.Fragment>
      <Cursor />
      <IntroCurtain />
      <Nav onOpen={onOpen} />
      <main id="top">
        <Hero />
        <Archive items={WORK} />
        <FieldNote />
        <Footer onOpen={onOpen} />
      </main>
      <CaseOverlay item={openCase} onClose={() => setOpenCase(null)} />
      <Panel open={panel === 'about'} onClose={() => setPanel(null)}><AboutContent /></Panel>
      <Panel open={panel === 'experience'} onClose={() => setPanel(null)}><ExperienceContent /></Panel>
      <Panel open={panel === 'contact'} onClose={() => setPanel(null)}><ContactContent /></Panel>
      <div className="vignette" aria-hidden="true"></div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
