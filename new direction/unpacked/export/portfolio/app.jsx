/* ============================================================
   Portfolio, data + panel content + composition.
   Human Factors Psychology · AI Reliability · Systems.
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'reach', code: 'CS-01', title: 'Reach', year: '2025',
    disciplines: ['Human Factors', 'Clinical Systems', 'Full-Stack'],
    thumb: null,
    blurb: 'A caseload and outcome-tracking system for rehabilitation therapists treating upper-extremity motor recovery after stroke, built so a clinician can see who needs attention and whether a patient is on track in seconds.',
    sections: {
      'Problem': 'Rehab therapists carry large caseloads and monitor recovery across many patients at once. Existing tools bury the signal, trajectories, adherence, and remote-monitoring status live in separate views, so deciding who needs attention first means reconstructing each patient by hand under time pressure.',
      'Constraints': [
        'Clinicians read the interface between appointments, in seconds, not minutes.',
        'Recovery data is noisy and non-linear; a single session tells you little.',
        'Patient-safety domain, an interface that hides a declining patient is a use-error, not a design nitpick.',
        'Built solo, full-stack, on a student timeline.',
      ],
      'Approach': 'Designed around the clinician\u2019s glance rather than the database. Recovery is plotted against an expected range so deviation is visible without interpretation; assigned programs surface adherence inline; remote-monitoring status is triaged into one prioritized view. The information architecture is ordered by clinical urgency, so attention lands where it matters first.',
      'Outcome': 'A working platform where a therapist can scan a caseload and identify off-track patients at a glance, with drill-down into per-patient trajectories and program adherence. Validated against the review workflow it replaces.',
      'Lessons Learned': 'In a safety-adjacent tool, the hard problem is not visualization, it is deciding what to omit. Every element competing for the clinician\u2019s attention costs a fraction of a second on every patient, every day. Restraint is the feature.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Domain', v: 'Clinical rehabilitation · stroke recovery' },
      { k: 'Year', v: '2025' },
      { k: 'Status', v: 'Prototype, in validation' },
    ],
  },
  {
    id: 'celio', code: 'CS-02', title: 'Celio', year: '2025',
    disciplines: ['Human Factors', 'Offline-First', 'Full-Stack'],
    thumb: './assets/work/celio-landing.png',
    hero: './assets/work/celio-landing.png',
    blurb: 'An offline-first platform that reduces the cognitive load of international travel for people with Celiac disease, turning a high-stakes, high-friction moment into a single confident interaction.',
    sections: {
      'Problem': 'For someone with Celiac disease, ordering food abroad is a safety decision made across a language barrier, often with no connectivity. Getting it wrong has real medical consequences, and existing translation tools are generic, online-dependent, and not trusted in the moment that matters.',
      'Constraints': [
        'Must work fully offline, no assumption of connectivity abroad.',
        'The critical interaction happens in seconds, in person, under social pressure.',
        'Medical trust: the translation has to be unambiguous and complete.',
        'Privacy, health context should not require sending data to a server.',
      ],
      'Approach': 'Built a 12-language translation card with text-to-speech and native Apple/Google Wallet export, so the safety artifact lives where the user already reaches. Added an on-device local LLM assistant (Sage AI) for private offline queries, plus interactive establishment maps. The design strips the moment-of-use down to a single glanceable, speakable card.',
      'Outcome': 'A deployed offline-first application combining Wallet passes, on-device inference, and TTS, the whole safety interaction reduced to one artifact the user can present or play aloud without a network.',
      'Lessons Learned': 'Designing for a high-stakes moment means designing for the worst conditions, not the demo. Offline, stressed, non-native context is the real spec, everything that assumed connectivity or calm had to be redesigned around that constraint.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Stack', v: 'Django · Alpine.js · WebLLM · Web Speech API · Wallet APIs' },
      { k: 'Domain', v: 'Consumer health · travel safety' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'handshake', code: 'CS-03', title: 'AI Reliability', year: '2025',
    disciplines: ['AI Reliability', 'Human Factors', 'Evaluation'],
    thumb: './assets/work/north-star-hero.png',
    hero: './assets/work/north-star-hero.png',
    blurb: 'Evaluating large-language-model outputs for a leading AI research lab, and studying automation bias, the moment a professional accepts confident but wrong machine advice.',
    sections: {
      'Problem': 'As AI systems enter high-stakes workflows, the failure mode is no longer just a wrong answer, it is a human accepting a wrong answer because the system stated it confidently. Reliability work needs a way to measure that hand-off between human judgment and machine output at scale.',
      'Constraints': [
        'Reviewer judgment must stay consistent across hundreds of outputs without drift or fatigue.',
        'Scoring has to be structured enough to feed directly into model iteration.',
        'Automation bias is subtle, the measurement can\u2019t cue the reviewer to the "right" answer.',
      ],
      'Approach': 'Contracted to evaluate LLM outputs for quality, accuracy, and alignment. Scored 500+ outputs against structured rubrics designed to reduce reviewer drift, and explored evaluation surfaces (North Star) that detect automation bias: measuring when a professional changes a correct answer after receiving confident, deliberately wrong AI advice.',
      'Outcome': 'Structured, repeatable feedback delivered into model iteration cycles, plus a human-factors framing of AI reliability as a measurable property of the human-plus-system, not the model alone.',
      'Lessons Learned': 'Reliability is a human-factors problem as much as a model problem. The most dangerous errors are the confident ones, because confidence suppresses the reviewer\u2019s skepticism, so the evaluation has to account for the human in the loop, not just grade the text.',
    },
    meta: [
      { k: 'Role', v: 'AI Evaluation Specialist · Contract' },
      { k: 'Context', v: 'Leading AI research lab · via Handshake AI' },
      { k: 'Scope', v: '500+ outputs evaluated' },
      { k: 'Year', v: '2025' },
    ],
  },
];

function AboutContent() {
  return (
    <div>
      <PanelTitle index="About">Human factors, from the ground up.</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I build full-stack systems and study the people who use them. That combination lets me speak the
          language of engineering while advocating for the human on the other side of the screen , 
          the operator, the clinician, the reviewer.
        </p>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I'm formalizing that through an accelerated B.S./M.S. in Human Factors Psychology at
          Embry-Riddle, focused on high-stakes environments: reducing cognitive load, eliminating
          use-error, and building trust in the systems that define safety-critical work.
        </p>
      </div>
      <div style={{ marginTop:'2rem', display:'grid', gridTemplateColumns:'1fr', gap:'1.1rem' }}>
        {[
          ['Education', 'B.S./M.S. Human Factors Psychology, Embry-Riddle Aeronautical University (Accelerated)'],
          ['Focus', 'AI reliability · human-automation interaction · systems safety · technical operations'],
          ['Toolkit', 'Mixed-methods research · full-stack development · A/B testing · behavioral analytics'],
        ].map(([k,v])=>(
          <div key={k} style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'0.9rem' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.4rem' }}>{k}</div>
            <div style={{ fontSize:'var(--text-sm)', lineHeight:1.6, color:'var(--text)' }}>{v}</div>
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
      <PanelTitle index="Contact">Let's talk.</PanelTitle>
      <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', marginBottom:'2rem', maxWidth:'42ch' }}>
        Open to roles in human factors, AI reliability, technical operations, and systems engineering.
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

function SectionView({ eyebrow, title, onBack, children }) {
  return (
    <div className="rs-viewin" style={{ position:'relative', minHeight:'100vh', width:'100%',
      maxWidth:'var(--page-max)', margin:'0 auto', padding:'calc(var(--topbar-h) + clamp(1.5rem,4vh,2.5rem)) var(--gutter) clamp(3rem,7vh,6rem)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', marginBottom:'clamp(2rem,5vw,3.5rem)' }}>
        <button data-hot onClick={onBack} style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem',
          fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
          color:'var(--text-muted)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)', padding:'0.5rem 1rem' }}>
          <span style={{ color:'var(--accent)' }}>←</span> Console
        </button>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)' }}>{eyebrow}</span>
      </div>
      {title && (
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
          lineHeight:'var(--leading-display)', letterSpacing:'var(--track-display)', color:'var(--text-strong)',
          margin:'0 0 clamp(2rem,4vw,3rem)', maxWidth:'20ch' }}>{title}</h1>
      )}
      {children}
      <style>{`
        @keyframes rsViewIn{ from{ opacity:0; transform:translateY(26px); } to{ opacity:1; transform:none; } }
        .rs-viewin{ animation:rsViewIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .rs-viewin{ animation:none; } }
      `}</style>
    </div>
  );
}

function App() {
  const [view, setView] = useAppState('home');
  const [openCase, setOpenCase] = useAppState(null);
  const [reading, setReading] = useAppState(false);
  const [warp, setWarp] = useAppState({ active:false, color:'rgba(201,138,99,0.55)' });

  const goTo = (id, color) => {
    if (id === view) return;
    setWarp({ active:true, color: color || 'rgba(126,200,240,0.55)' });
    setTimeout(() => { setView(id); window.scrollTo(0,0); }, 460);
    setTimeout(() => setWarp((w) => ({ ...w, active:false })), 620);
  };
  const onOpen = (id, color) => {
    if (id === 'home') return goTo('home', color);
    if (id === 'work' || id === 'science' || id === 'art' || id === 'about' || id === 'contact') return goTo(id, color);
    // a case-study id → open the detail takeover
    setOpenCase(WORK.find((w) => w.id === id));
  };

  return (
    <React.Fragment>
      <BlueprintBg />
      <ScrollProgress />
      <IntroCurtain />
      <Nav onOpen={onOpen} reading={reading} onToggleReading={()=>setReading(r=>!r)} onHome={()=>goTo('home')} view={view} />
      <main id="top" style={{ position:'relative', zIndex:1 }}>
        {view === 'home' && <Hero onOpen={onOpen} />}
        {view === 'work' && (
          <SectionView eyebrow="CH 01 / Case Studies" onBack={()=>goTo('home')}>
            <CaseStudies items={WORK} onOpen={onOpen} embedded />
          </SectionView>
        )}
        {view === 'science' && (
          <SectionView eyebrow="CH 02 / Science" onBack={()=>goTo('home')}>
            <Science embedded />
          </SectionView>
        )}
        {view === 'art' && (
          <SectionView eyebrow="CH 03 / Art" onBack={()=>goTo('home')}>
            <Currently embedded />
          </SectionView>
        )}
        {view === 'about' && (
          <SectionView eyebrow="CH 04 / About" title="About" onBack={()=>goTo('home')}>
            <AboutContent />
          </SectionView>
        )}
        {view === 'contact' && (
          <SectionView eyebrow="CH 05 / Contact" title="Let's build something reliable." onBack={()=>goTo('home')}>
            <ContactContent />
          </SectionView>
        )}
      </main>

      {/* warp transition */}
      <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:1200, pointerEvents:'none',
        opacity: warp.active ? 1 : 0, transition:`opacity ${warp.active ? 0.24 : 0.4}s var(--ease-out)` }}>
        <div style={{ position:'absolute', inset:0, background:'#05070C', opacity: warp.active ? 0.86 : 0, transition:'opacity 0.3s ease' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'160vmax', height:'160vmax', marginLeft:'-80vmax', marginTop:'-80vmax',
          borderRadius:'50%', background:`radial-gradient(closest-side, ${warp.color}, transparent 70%)`,
          transform: warp.active ? 'scale(1)' : 'scale(0.05)', transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)', filter:'blur(24px)' }} />
      </div>

      <CaseOverlay item={openCase} reading={reading} onClose={() => setOpenCase(null)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
