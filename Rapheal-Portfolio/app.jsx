/* ============================================================
   Portfolio, data + panel content + composition.
   Human Factors Psychology · AI Reliability · Systems.
   ============================================================ */
const { useState: useAppState } = React;

const WORK = [
  {
    id: 'reach', code: 'CS-01', title: 'Reach', year: '2025',
    disciplines: ['Human Factors', 'Clinical Systems', 'Full-Stack'],
    thumb: './assets/work/reach-card.jpg',
    hero: './assets/work/reach-card.jpg',
    blurb: 'A caseload and outcome-tracking system for rehabilitation therapists treating upper-extremity motor recovery after stroke, built so a clinician can parse patient recovery trajectories in seconds.',
    sections: {
      'Problem': 'Rehab therapists carry large caseloads and monitor recovery trajectories across many patients simultaneously. Standardized outcome measures like the Fugl-Meyer Assessment are documented inconsistently due to severe session time pressure. Existing EHR tools bury data across separate tabs, forcing clinicians to reconstruct patient trajectories by hand under high stress.',
      'Constraints': [
        'Clinicians must read the interface between patient appointments, in seconds, not minutes.',
        'Recovery data is non-linear and noisy, making single-session snapshots unreliable.',
        'Patient-safety domain: an interface that masks a declining patient creates severe use-error risks.',
        'Built solo, full-stack, adhering to clinical ergonomics standards.',
      ],
      'Approach': 'Engineered around the clinician glance rather than traditional EHR database layouts. Recovery scores automatically plot against baseline severity bands, surfacing deviations without manual calculation. Assigned home programs display adherence metrics inline, and remote-monitoring trajectory changes trigger early-warning alerts for high-risk patients.',
      'Outcome': 'Delivered a functional platform where therapists scan an entire caseload in seconds, identify off-track trajectories immediately, and review per-patient adherence without double-entry overhead. Validated directly against therapist charting workflows.',
      'Lessons Learned': 'In safety-adjacent clinical software, the central challenge is deciding what to omit. Every unnecessary element competing for clinician attention costs precious seconds on every patient daily. Cognitive restraint is the core usability feature.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Clinical Systems · Full-Stack Development' },
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
    blurb: 'An offline-first platform reducing the cognitive load and medical anxiety of international travel for Celiac patients, turning a high-stakes interaction into a single confident card.',
    sections: {
      'Problem': 'For individuals with Celiac disease, ordering food abroad is a critical medical decision made across foreign language barriers, often with zero cellular connectivity. Severe autoimmune reactions make miscommunication dangerous, yet generic translation tools fail in offline dining environments.',
      'Constraints': [
        'Must function 100% offline with zero internet dependency in remote areas or airplane mode.',
        'Critical interactions occur under social pressure within seconds.',
        'Zero hallucination tolerance: medical dietary translation must be unambiguous.',
        'Privacy: health context must remain strictly on-device without cloud logging.',
      ],
      'Approach': 'Engineered an offline-first architecture utilizing WebLLM for client-side local inference, eliminating cloud API calls entirely. Built a deterministic 12-language Translation Card system with local text-to-speech, exportable directly to native Apple & Google Wallet passes for immediate offline presentation.',
      'Outcome': 'Achieved sub-second translation rendering and offline AI query responses with zero server latency, ensuring travelers maintain reliable communication tools regardless of network availability.',
      'Lessons Learned': 'Designing for safety-critical human tasks requires building for worst-case conditions rather than ideal demos. High-anxiety users in unfamiliar environments demand deterministic, non-probabilistic fallbacks.',
    },
    meta: [
      { k: 'Role', v: 'Human Factors · Research · Full-Stack Development' },
      { k: 'Stack', v: 'Django · Alpine.js · WebLLM · Web Speech API · Wallet APIs' },
      { k: 'Domain', v: 'Consumer health · travel safety' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'materialsiq', code: 'CS-03', title: 'MaterialIQ', year: '2025',
    disciplines: ['AI Quality Analysis', 'Browser Extension', 'FastAPI'],
    thumb: './images/materialsIQ/hero.png',
    hero: './images/materialsIQ/hero.png',
    blurb: 'An AI-powered browser extension analyzing product quality, material composition, and value for money in real time while shopping online.',
    sections: {
      'Problem': 'Consumers spend significant money assuming product durability, often struggling to parse complex fiber blends, fabric weight, and construction details. Price is frequently conflated with quality due to a lack of objective, transparent evaluation metrics in online retail environments.',
      'Constraints': [
        'Must parse unstructured e-commerce product listings instantly within the browser viewport.',
        'Low-latency inference requirements to prevent disrupting consumer browsing flow.',
        'Scoring rules must be completely transparent to prevent black-box distrust.',
      ],
      'Approach': 'Developed a browser extension powered by a FastAPI backend. The system extracts fiber percentages and weight specs to compute a Material Quality Score, estimates construction durability, and calculates an objective Value Score comparing retail price against material worth.',
      'Outcome': 'Released MaterialIQ (Beta) on the Chrome Web Store, providing shoppers with instant, transparent quality breakdowns directly in their shopping carts to reduce purchasing uncertainty.',
      'Lessons Learned': 'Building user trust in algorithmic scoring requires absolute algorithmic transparency. Users reject black-box scores; showing the exact fiber breakdown and rule-based logic validates the evaluation.',
    },
    meta: [
      { k: 'Role', v: 'AI Quality Analysis · Extension Architecture · Backend Engineering' },
      { k: 'Stack', v: 'Chrome Extension API · FastAPI · Python · Skimlinks' },
      { k: 'Domain', v: 'Consumer AI · quality analysis' },
      { k: 'Year', v: '2025' },
    ],
  },
  {
    id: 'prox', code: 'CS-04', title: 'Prox', year: '2024',
    disciplines: ['Onboarding UX', 'iOS', 'Capacitor'],
    thumb: './images/prox/08-deals-ready.png',
    hero: './images/prox/08-deals-ready.png',
    blurb: 'A complete redesign of the first-time user experience for an iOS grocery-savings application, mitigating a 3-5 minute technical loading constraint.',
    sections: {
      'Problem': 'During initial sign-up, the app fetches real-time store inventory and local pricing data, requiring an unavoidable 3 to 5 minute background data pull. The original design displayed a static loading spinner, causing high user drop-off as users assumed the application was broken.',
      'Constraints': [
        'The 3-5 minute initial data pull is technically unavoidable.',
        'Runs on Capacitor for iOS, requiring native-feeling responsiveness on cross-platform code.',
        'High drop-off rates during first-launch setup.',
      ],
      'Approach': 'Reframed the wait time by designing a structured preferences flow (store selection, dietary restrictions) that occupies the user productively while data downloads in the background. Introduced transparent status indicators and deferred location permissions to establish trust incrementally.',
      'Outcome': 'Delivered an end-to-end 14-screen onboarding redesign. Increased user activation by transforming forced waiting into an engaging setup sequence with interactive savings previews.',
      'Lessons Learned': 'When technical constraints create friction, design must manage user perception. Clear feedback, progress indicators, and productive task framing turn user impatience into anticipation.',
    },
    meta: [
      { k: 'Role', v: 'UX Lead · Product Designer · Contract' },
      { k: 'Context', v: 'Prox Mobile App · iOS / Capacitor' },
      { k: 'Scope', v: '14-screen onboarding flow' },
      { k: 'Year', v: '2024' },
    ],
  },
];

function AboutContent() {
  return (
    <div>
      <PanelTitle index="About">Human factors, from the ground up.</PanelTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I build full-stack systems and study the people who operate them. That combination lets me speak the
          language of engineering while advocating for the human on the other side of the screen: 
          the operator, the clinician, the reviewer, or the astronaut.
        </p>
        <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>
          I am formalizing that work through an accelerated B.S./M.S. in Human Factors Psychology at
          Embry-Riddle Aeronautical University, focused on high-stakes environments: reducing cognitive load, eliminating
          use-error, and building trust in safety-critical systems.
        </p>
      </div>
      <div style={{ marginTop:'2rem', display:'grid', gridTemplateColumns:'1fr', gap:'1.1rem' }}>
        {[
          ['Education', 'B.S./M.S. Human Factors Psychology, Embry-Riddle Aeronautical University (Accelerated)'],
          ['Focus', 'Aerospace human factors · AI reliability · human-automation interaction · systems safety · technical operations'],
          ['Toolkit', 'Mixed-methods research · full-stack development · A/B testing · behavioral analytics · cognitive ergonomics'],
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
        Open to roles in human factors, AI reliability, technical operations, and systems engineering across aerospace, health, and complex operations.
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
  const [warp, setWarp] = useAppState({ active:false, color:'rgba(126,200,240,0.55)' });

  const goTo = (id, color) => {
    if (id === view) return;
    setWarp({ active:true, color: color || 'rgba(126,200,240,0.55)' });
    setTimeout(() => { setView(id); window.scrollTo(0,0); }, 460);
    setTimeout(() => setWarp((w) => ({ ...w, active:false })), 620);
  };
  const onOpen = (id, color) => {
    if (id === 'home') return goTo('home', color);
    if (id === 'work' || id === 'science' || id === 'art' || id === 'about' || id === 'contact') return goTo(id, color);
    // Direct navigation to single condensed full-page case study
    const pageMap = {
      reach: 'reach.html',
      celio: 'celio.html',
      materialsiq: 'materialsiq.html',
      prox: 'prox.html'
    };
    if (pageMap[id]) {
      window.location.href = pageMap[id];
    } else {
      setOpenCase(WORK.find((w) => w.id === id));
    }
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

      {/* no overlay modal — single condensed full page for each case study */}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
