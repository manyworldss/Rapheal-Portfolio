/* ============================================================
   Portfolio, Nav, Hero, Case Studies, Footer.
   Apple / Linear / Stripe register: monochrome, 1px borders,
   heavy whitespace, one restrained signal accent.
   ============================================================ */
const { useState: useStateS, useEffect: useEffectS } = React;

/* ---- Nav ---- */
function Nav({ onOpen }) {
  const links = [
    { l: 'About', id: 'about' },
    { l: 'Case Studies', id: 'work' },
    { l: 'Contact', id: 'contact' },
  ];
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:800,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      height:'var(--topbar-h)', padding:'0 var(--gutter)',
      background: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `var(--hair) solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition:'background var(--dur-3) var(--ease-soft), border-color var(--dur-3) var(--ease-soft)' }}>
      <a href="#top" onClick={(e)=>{e.preventDefault(); scrollTo({top:0,behavior:'smooth'});}}
        style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontFamily:'var(--font-mono)', fontWeight:'var(--fw-medium)',
        fontSize:'var(--text-sm)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)' }}>
        Rapheal Suber
      </a>
      <nav style={{ display:'flex', alignItems:'center', gap:'clamp(1rem,2.2vw,2rem)' }}>
        {links.map((it) => <NavLink key={it.id} label={it.l} onClick={()=>onOpen(it.id)} />)}
        <ThemeToggle />
      </nav>
    </header>
  );
}
function NavLink({ label, onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
        color: h ? 'var(--text-strong)' : 'var(--text-muted)', transition:'color var(--dur-2) var(--ease-soft)' }}>
      {label}
    </button>
  );
}
function ThemeToggle() {
  const [dark, setDark] = useStateS(() => document.documentElement.dataset.theme === 'dark');
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('rs-theme', next ? 'dark' : 'light'); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
        border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-sm)',
        color:'var(--text-muted)', fontSize:'0.9rem' }}>
      {dark ? '○' : '●'}
    </button>
  );
}

/* ---- Hero ---- */
function Hero({ onOpen }) {
  return (
    <section style={{ position:'relative', minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'center',
      maxWidth:'var(--page-max)', margin:'0 auto', width:'100%',
      padding:'calc(var(--topbar-h) + clamp(2rem,6vh,5rem)) var(--gutter) clamp(3rem,7vh,6rem)' }}>
      <Reveal as="p" delay={40} style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontFamily:'var(--font-mono)',
        fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'1.8rem' }}>
        <span style={{ width:7, height:7, borderRadius:'999px', background:'var(--accent)' }}></span>
        Technical Support · Systems · AI Quality Assurance
      </Reveal>
      <Reveal delay={120}>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-hero)',
          lineHeight:'var(--leading-hero)', letterSpacing:'var(--track-hero)', color:'var(--text-strong)', margin:0, maxWidth:'20ch' }}>
          Keeping complex systems reliable, and the people who run them unblocked.
        </h1>
      </Reveal>
      <Reveal as="p" delay={220} style={{ marginTop:'1.8rem', maxWidth:'56ch', fontSize:'var(--text-body-lg)',
        lineHeight:'var(--leading-body-lg)', color:'var(--text-muted)' }}>
        I'm a technical support and systems professional working across enterprise SaaS,
        AI quality assurance, and technical operations, troubleshooting complex issues,
        documenting the fix, and building the tooling that keeps platforms reliable. I'm
        finishing a B.S./M.S. in Human Factors Psychology at Embry-Riddle, the lens I'll
        move into next.
      </Reveal>
      <Reveal delay={320} style={{ marginTop:'2.6rem', display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
        <PrimaryBtn onClick={()=>{ const w=document.querySelector('#work'); if(w) scrollTo({top:w.offsetTop-40,behavior:'smooth'}); }}>
          View case studies
        </PrimaryBtn>
        <SecondaryBtn onClick={()=>onOpen('contact')}>Get in touch</SecondaryBtn>
      </Reveal>
      <Telemetry />
    </section>
  );
}

/* ---- Live telemetry readout: instrument-panel corner detail ---- */
function Telemetry() {
  const [t, setT] = useStateS(() => new Date());
  const [up, setUp] = useStateS(0);
  useEffectS(() => {
    const id = setInterval(() => { setT(new Date()); setUp((u) => u + 1); }, 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(t.getHours()).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  const ss = String(t.getSeconds()).padStart(2, '0');
  const rows = [
    ['LOCAL', `${hh}:${mm}:${ss}`, false],
    ['SESSION', `${String(Math.floor(up/60)).padStart(2,'0')}:${String(up%60).padStart(2,'0')}`, false],
  ];
  return (
    <Reveal delay={460} className="rs-telemetry" style={{ position:'absolute', right:'var(--gutter)', bottom:'clamp(2rem,7vh,4.5rem)',
      display:'flex', flexDirection:'column', gap:'0.55rem', textAlign:'right', pointerEvents:'none' }}>
      {rows.map(([k, v, live]) => (
        <div key={k} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'0.7rem',
          fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase' }}>
          <span style={{ color:'var(--text-faint)' }}>{k}</span>
          <span style={{ color: live ? 'var(--accent)' : 'var(--text-muted)', minWidth:'7ch', display:'inline-flex', alignItems:'center', justifyContent:'flex-end', gap:'0.4rem' }}>
            {live && <span className="rs-pulse" style={{ width:6, height:6, borderRadius:'999px', background:'var(--accent)', display:'inline-block' }} />}
            {v}
          </span>
        </div>
      ))}
      <span style={{ marginTop:'0.15rem', width:64, height:1, background:'var(--border)', alignSelf:'flex-end' }} />
      <style>{`
        @keyframes rsPulse{ 0%,100%{ opacity:0.35; transform:scale(1); } 50%{ opacity:1; transform:scale(1.35); } }
        .rs-pulse{ animation: rsPulse 2.4s var(--ease-soft) infinite; }
        @media (prefers-reduced-motion: reduce){ .rs-pulse{ animation:none; } }
        @media (max-width: 640px){ .rs-telemetry{ display:none !important; } }
      `}</style>
    </Reveal>
  );
}

function PrimaryBtn({ children, onClick }) {
  const [h, setH] = useStateS(false);
  const ref = useMagnetic(0.26);
  return (
    <button ref={ref} data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
        color:'var(--text-on-inverse)', background: h ? 'var(--text)' : 'var(--text-strong)',
        borderRadius:'var(--radius-sm)', padding:'0.75rem 1.4rem',
        transition:'background var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
      {children}
    </button>
  );
}
function SecondaryBtn({ children, onClick }) {
  const [h, setH] = useStateS(false);
  const ref = useMagnetic(0.26);
  return (
    <button ref={ref} data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
        color:'var(--text-strong)', background: h ? 'var(--bg-inset)' : 'transparent',
        border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-sm)', padding:'0.75rem 1.4rem',
        transition:'background var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
      {children}
    </button>
  );
}

/* ---- Case Studies ---- */
function CaseStudies({ items, onOpen }) {
  return (
    <section id="work" style={{ padding:'clamp(4rem,8vw,7rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
      <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem',
        borderBottom:'var(--hair) solid var(--border)', paddingBottom:'1.4rem', marginBottom:'clamp(2rem,4vw,3rem)' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
          letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0 }}>Case Studies</h2>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--text-faint)' }}>{String(items.length).padStart(2,'0')} Selected</span>
      </Reveal>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i*60}>
            <CaseRow item={it} onOpen={() => onOpen(it.id)} first={i===0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CaseRow({ item, onOpen, first }) {
  const [h, setH] = useStateS(false);
  return (
    <button data-hot onClick={onOpen} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:'relative', width:'100%', textAlign:'left', display:'grid',
        gridTemplateColumns:'auto minmax(0,1fr) auto', alignItems:'center', gap:'clamp(1rem,3vw,3rem)',
        padding:'clamp(1.6rem,2.6vw,2.4rem) clamp(0.5rem,1.5vw,1.25rem)',
        borderTop: first ? 'none' : 'var(--hair) solid var(--border)',
        background: h ? 'var(--bg-inset)' : 'transparent', borderRadius:'var(--radius-md)',
        transition:'background var(--dur-2) var(--ease-soft)' }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
        color: h ? 'var(--accent)' : 'var(--text-faint)', alignSelf:'start', paddingTop:'0.5rem',
        transition:'color var(--dur-2) var(--ease-soft)' }}>{item.code}</span>
      <span style={{ minWidth:0 }}>
        <span style={{ display:'block', fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h2)',
          letterSpacing:'var(--track-tight)', color:'var(--text-strong)', marginBottom:'0.5rem' }}>{item.title}</span>
        <span style={{ display:'block', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', maxWidth:'62ch' }}>{item.blurb}</span>
        <span style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'1rem' }}>
          {item.disciplines.map((d)=>(
            <span key={d} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
              textTransform:'uppercase', color:'var(--text-muted)', border:'var(--hair) solid var(--border)',
              borderRadius:'var(--radius-pill)', padding:'0.3rem 0.7rem' }}>{d}</span>
          ))}
        </span>
      </span>
      <span style={{ display:'flex', alignItems:'center', gap:'clamp(1rem,2vw,1.75rem)', alignSelf:'start', paddingTop:'0.4rem' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--text-faint)' }}>{item.year}</span>
        <span aria-hidden="true" style={{ fontFamily:'var(--font-mono)', fontSize:'1rem', color: h ? 'var(--accent)' : 'var(--text-muted)',
          transform: h ? 'translateX(4px)' : 'none', transition:'transform var(--dur-3) var(--ease-out), color var(--dur-2) var(--ease-soft)' }}>→</span>
      </span>
    </button>
  );
}

/* ---- Footer ---- */
function Footer({ onOpen }) {
  return (
    <footer style={{ background:'var(--bg)', borderTop:'var(--hair) solid var(--border)' }}>
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(3.5rem,7vw,6rem) var(--gutter)' }}>
        <Reveal>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
            letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0, maxWidth:'16ch' }}>
            Let's build something reliable.
          </h2>
          <div style={{ marginTop:'2rem', display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
            <PrimaryBtn onClick={()=>onOpen('contact')}>Get in touch</PrimaryBtn>
          </div>
        </Reveal>
        <div style={{ marginTop:'clamp(3rem,6vw,5rem)', paddingTop:'1.6rem', borderTop:'var(--hair) solid var(--border)',
          display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)' }}>© 2026 Rapheal Suber</span>
          <span style={{ display:'flex', gap:'1.5rem' }}>
            {[['LinkedIn','https://www.linkedin.com/in/raphealsuber/'],['GitHub','https://github.com/manyworldss'],['Email','mailto:raphealsuberusca@gmail.com']].map(([l,h])=>(
              <a key={l} data-hot href={h} target="_blank" rel="noopener" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-muted)' }}>{l}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, CaseStudies, Footer });
