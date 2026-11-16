/* ============================================================
   Portfolio — section content + kiosk composition.
   Home is the console; every channel warps into its own screen.
   Case-study records live in work.jsx.
   ============================================================ */
const { useState: useAppState } = React;

function AboutContent() {
  return (
    <div>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', maxWidth:'60ch' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text)' }}>
          I am a Human Factors Psychology student with experience across human-AI interaction, evaluation methodology, user research, and technical systems. I am focused on designing and evaluating technology and workflow systems where human capability and system complexity meet.
        </p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text)' }}>
          Currently finishing an accelerated B.S./M.S. in Human Factors Psychology at Embry-Riddle Aeronautical University. My background in full-stack engineering, Python, SQL, and data analysis allows me to run deep technical evaluations, build rigorous prototypes, and design intuitive, error-resistant systems for high-stakes environments.
        </p>
      </div>
      <div style={{ marginTop:'clamp(2.5rem,5vw,3.5rem)', display:'grid', gridTemplateColumns:'1fr', gap:'1.1rem', maxWidth:'60ch' }}>
        {[
          ['Education', 'Accelerated B.S./M.S. Human Factors Psychology, Embry-Riddle Aeronautical University'],
          ['Focus', 'Human-AI interaction · evaluation methodology · user research · technical systems'],
          ['Toolkit', 'Cognitive task analysis · usability testing · Python · SQL · React · Figma · structured evaluation'],
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
    ['Email', 'raphealsuberusca@gmail.com', 'mailto:raphealsuberusca@gmail.com'],
    ['LinkedIn', 'in/raphealsuber', 'https://www.linkedin.com/in/raphealsuber/'],
    ['GitHub', 'manyworldss', 'https://github.com/manyworldss'],
  ];
  return (
    <div>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text-muted)', marginBottom:'2.5rem', maxWidth:'46ch' }}>
        Open to roles in Human Factors Engineering, UX Research, Product Design, and Human-Systems Integration.
      </p>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {links.map(([l,v,h],i)=>(
          <a key={l} data-hot href={h} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem',
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
      <div className="rs-viewin-1" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', marginBottom:'1.5rem' }}>
        <button data-hot onClick={onBack} className="rs-back" style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem',
          fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
          color:'var(--text-muted)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)', padding:'0.5rem 1rem' }}>
          <span style={{ color:'var(--accent)' }}>←</span> Console
        </button>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)' }}>{eyebrow}</span>
      </div>
      {title && (
        <h1 className="rs-viewin-2" style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
          lineHeight:'var(--leading-display)', letterSpacing:'var(--track-display)', color:'var(--text-strong)',
          margin:'0 0 clamp(2rem,4vw,3rem)', maxWidth:'20ch' }}>{title}</h1>
      )}
      <div className="rs-viewin-3">{children}</div>
      <style>{`
        /* Kiosk screen entrance: the frame settles first, then the content
           rises under it. Staggered so the swap reads as a machine changing
           channel rather than a page fade. */
        @keyframes rsRise{ from{ opacity:0; transform:translate3d(0,26px,0); } to{ opacity:1; transform:none; } }
        @keyframes rsRiseSoft{ from{ opacity:0; transform:translate3d(0,14px,0); } to{ opacity:1; transform:none; } }
        .rs-viewin-1{ animation:rsRiseSoft 0.55s cubic-bezier(0.16,1,0.3,1) 0.02s both; }
        .rs-viewin-2{ animation:rsRise 0.78s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
        .rs-viewin-3{ animation:rsRise 0.86s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        .rs-back{ transition:color var(--dur-2) var(--ease-soft), border-color var(--dur-2) var(--ease-soft), background var(--dur-2) var(--ease-soft); }
        .rs-back:hover{ color:var(--text-strong); border-color:var(--accent-line); background:var(--accent-wash); }
        @media (prefers-reduced-motion: reduce){
          .rs-viewin-1,.rs-viewin-2,.rs-viewin-3{ animation:none; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [view, setView] = useAppState(['work','about','currently','contact'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home');
  const [openCase, setOpenCase] = useAppState(null);

  const goTo = (id, color) => {
    if (id === view) return;
    setView(id);
    history.replaceState(null, '', id === 'home' ? location.pathname : '#'+id);
    requestAnimationFrame(() => window.scrollTo(0,0));
  };
  const onOpen = (id, color) => {
    if (id === 'home') return goTo('home', color);
    if (id === 'work' || id === 'currently' || id === 'about' || id === 'contact') return goTo(id, color);
    // a case-study id → open the detail takeover
    setOpenCase(WORK.find((w) => w.id === id));
  };

  return (
    <React.Fragment>
      {/* The kiosk hero carries its own aurora and covers the viewport,
          so the site backdrop only renders behind the section views. */}
      {view !== 'home' && <BlueprintBg />}
      <ScrollProgress />

      <Nav onOpen={onOpen} onHome={()=>goTo('home')} view={view} />
      <main id="top" style={{ position:'relative', zIndex:1 }}>
        {view === 'home' && <Hero onOpen={onOpen} />}
        {view === 'work' && (
          <SectionView eyebrow="CH 01 / Case Studies" onBack={()=>goTo('home')}>
            <CaseStudies items={WORK} onOpen={onOpen} embedded />
            <Footer onOpen={onOpen} />
          </SectionView>
        )}
        {view === 'currently' && (
          <SectionView eyebrow="CH 02 / Currently" onBack={()=>goTo('home')}>
            <Currently embedded />
          </SectionView>
        )}
        {view === 'about' && (
          <SectionView eyebrow="CH 03 / About" title="Human factors, systems, and the people who use them." onBack={()=>goTo('home')}>
            <AboutContent />
          </SectionView>
        )}
        {view === 'contact' && (
          <SectionView eyebrow="CH 04 / Contact" title="Let's talk." onBack={()=>goTo('home')}>
            <ContactContent />
          </SectionView>
        )}
      </main>

      <CaseOverlay item={openCase} onClose={() => setOpenCase(null)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
