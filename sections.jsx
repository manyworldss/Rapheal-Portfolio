/* ============================================================
   Editorial Archive — page sections.
   ============================================================ */
const { useState: useStateS, useRef: useRefS } = React;

/* ---- Floating ghost nav ---- */
function Nav({ onOpen }) {
  const items = [
    { l: 'About', id: 'about' },
    { l: 'Experience', id: 'experience' },
    { l: 'Contact', id: 'contact' }
  ];
  const fg = 'var(--text-strong)';
  const muted = 'var(--text-muted)';
  const [scrolled, setScrolled] = useStateS(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:800,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      height:'var(--topbar-h)', padding:'0 var(--gutter)',
      mixBlendMode:'normal' }}>
      <a href="#top" onClick={(e)=>{e.preventDefault(); scrollTo({top:0,behavior:'smooth'});}}
        style={{ fontFamily:'var(--font-mono)', fontWeight:'var(--fw-medium)', fontSize:'var(--text-label)',
        letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--accent-2)',
        opacity: scrolled ? 1 : 0, transform: scrolled ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: scrolled ? 'auto' : 'none',
        transition:'opacity var(--dur-3) var(--ease-out), transform var(--dur-3) var(--ease-out), color var(--dur-3) var(--ease-soft)' }}>RS</a>
      <nav style={{ display:'flex', alignItems:'center', gap:'clamp(1.25rem,3vw,2.75rem)' }}>
        {items.map((it) => <NavLink key={it.id} label={it.l} muted={muted} fg={fg} onClick={()=>onOpen(it.id)} />)}
        <ThemeToggle muted={muted} fg={fg} />
      </nav>
    </header>
  );
}

function ThemeToggle({ muted, fg }) {
  const [dark, setDark] = useStateS(() => document.documentElement.dataset.theme === 'dark');
  const [h, setH] = useStateS(false);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('rs-theme', next ? 'dark' : 'light'); } catch (e) {}
  };
  return (
    <button onClick={toggle} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} aria-label="Toggle theme"
      style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
        letterSpacing:'var(--track-micro)', textTransform:'uppercase', color: h?fg:muted,
        border:'var(--hair) solid var(--border)', borderRadius:'var(--radius-pill)', padding:'0.4rem 0.7rem',
        transition:'color var(--dur-2) var(--ease-soft), border-color var(--dur-2) var(--ease-soft)' }}>
      <span style={{ width:6, height:6, borderRadius:'999px', background: dark?'var(--accent-2)':'var(--accent)',
        transition:'background var(--dur-2) var(--ease-soft)' }}></span>
      {dark ? 'Dark' : 'Light'}
    </button>
  );
}
function NavLink({ label, muted, fg, onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:'relative', fontFamily:'var(--font-mono)', fontSize:'var(--text-label)',
        letterSpacing:'var(--track-label)', textTransform:'uppercase', color:h?fg:muted, paddingBottom:'0.3rem',
        transition:'color var(--dur-2) var(--ease-soft)' }}>
      {label}
      <span style={{ position:'absolute', left:0, bottom:0, height:'var(--hair)', width:'100%',
        background:'var(--accent)', transform: h ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition:'transform var(--dur-3) var(--ease-out)' }} />
    </button>
  );
}

/* ---- Hero / masthead ---- */
function Hero() {
  const wrap = useRefS(null);
  React.useEffect(() => {
    const onMove = (e) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width/2) / r.width;
      const dy = (e.clientY - r.top - r.height/2) / r.height;
      wrap.current.style.setProperty('--px', (dx*10).toFixed(2)+'px');
      wrap.current.style.setProperty('--py', (dy*8).toFixed(2)+'px');
    };
    addEventListener('mousemove', onMove);
    return () => removeEventListener('mousemove', onMove);
  }, []);
  return (
    <section ref={wrap} style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column',
      justifyContent:'space-between', padding:'calc(var(--topbar-h) + clamp(1rem,4vh,3rem)) var(--gutter) clamp(2.5rem,6vh,5rem)', overflow:'hidden' }}>
      <style>{`
        @keyframes waveA{0%{transform:translate(-4%,0) scale(1.05)}50%{transform:translate(8%,6%) scale(1.25)}100%{transform:translate(-4%,0) scale(1.05)}}
        @keyframes waveB{0%{transform:translate(0,4%) scale(1.1)}50%{transform:translate(-9%,-7%) scale(1.3)}100%{transform:translate(0,4%) scale(1.1)}}
        @keyframes waveC{0%{transform:translate(3%,-3%) scale(1)}50%{transform:translate(-5%,8%) scale(1.2)}100%{transform:translate(3%,-3%) scale(1)}}
        @keyframes orbDrift{0%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-2.2%,-1.6%) rotate(8deg)}100%{transform:translate(0,0) rotate(0deg)}}
        @keyframes lineRise{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .hero-line{display:block;overflow:hidden;padding-top:0.04em;}
        .hero-line-in{display:block;transform:translateY(108%);animation:lineRise 1.15s var(--ease-out) forwards;}
        @media (prefers-reduced-motion: reduce){
          .wave,.hero-orb{animation:none!important}
          .hero-line-in{transform:none;animation:none}
        }
      `}</style>

      {/* flowing gradient waves */}
      <div aria-hidden="true" style={{ position:'absolute', inset:'-10%', zIndex:-2, overflow:'hidden', pointerEvents:'none' }}>
        <div className="wave" style={{ position:'absolute', top:'-14%', right:'-4%', width:'62vw', height:'62vw',
          background:'radial-gradient(circle, rgba(166,96,60,0.20), transparent 62%)', borderRadius:'999px',
          willChange:'transform', animation:'waveA 24s ease-in-out infinite' }} />
        <div className="wave" style={{ position:'absolute', bottom:'-22%', left:'-10%', width:'60vw', height:'60vw',
          background:'radial-gradient(circle, rgba(110,144,126,0.26), transparent 64%)', borderRadius:'999px',
          willChange:'transform', animation:'waveB 30s ease-in-out infinite' }} />
        <div className="wave" style={{ position:'absolute', top:'16%', left:'22%', width:'46vw', height:'46vw',
          background:'radial-gradient(circle, rgba(60,90,74,0.20), transparent 66%)', borderRadius:'999px',
          willChange:'transform', animation:'waveC 38s ease-in-out infinite' }} />
      </div>

      <div aria-hidden="true" className="hero-orb" style={{ position:'absolute', bottom:'-17vh', right:'-9vh',
        width:'clamp(26rem, 48vh, 44rem)', height:'clamp(26rem, 48vh, 44rem)', borderRadius:'999px', zIndex:-1,
        pointerEvents:'none', willChange:'transform', animation:'orbDrift 26s ease-in-out infinite',
        background:'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.25), rgba(247,244,237,0.02) 60%)' }} />

      {/* A — catalogue reference */}
      <Reveal as="div" delay={1480} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem',
        fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-muted)' }}>
        <span>File <span style={{ color:'var(--accent-2)' }}>RS</span> — MMXXVI</span>
      </Reveal>

      {/* B — masthead: asymmetric name with annotations filling the gap beside SUBER */}
      <div style={{ transform:'translate(var(--px,0), var(--py,0))', transition:'transform var(--dur-3) var(--ease-soft)',
        display:'flex', alignItems:'flex-end', gap:'clamp(1.25rem,4vw,4.5rem)', flexWrap:'wrap' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'clamp(3.5rem, 9.5vw, 9.5rem)',
          lineHeight:'var(--leading-hero)', letterSpacing:'var(--track-hero)', textTransform:'uppercase',
          color:'var(--text-strong)', margin:0 }}>
          <span className="hero-line"><span className="hero-line-in" style={{ animationDelay:'1.55s' }}>Rapheal</span></span>
          <span className="hero-line" style={{ marginLeft:'clamp(1.5rem,7vw,7rem)' }}><span className="hero-line-in" style={{ animationDelay:'1.70s' }}>Suber</span></span>
        </h1>
        <Reveal as="ul" delay={2250} style={{ listStyle:'none', margin:'0 0 0.7em', padding:0,
          display:'flex', flexDirection:'column', gap:'0.95rem' }}>
          {['UX Research','Human Factors','Healthcare'].map((t,i)=>(
            <li key={t} style={{ display:'flex', alignItems:'center', gap:'0.85rem',
              fontFamily:'var(--font-mono)', fontSize:'0.8125rem', letterSpacing:'var(--track-label)',
              textTransform:'uppercase', color:'var(--text)', whiteSpace:'nowrap' }}>
              <span style={{ color: t === 'Healthcare' ? 'var(--accent-2)' : 'var(--accent)', fontVariantNumeric:'tabular-nums' }}>{String(i+1).padStart(2,'0')}</span>
              <span aria-hidden="true" style={{ width:'1.1rem', height:'var(--hair)', background:'var(--border-strong)' }} />
              <span>{t}</span>
            </li>
          ))}
        </Reveal>
      </div>

      {/* C — abstract + availability on a hairline */}
      <Reveal delay={1900} y="12px" style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'1.4rem',
        display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'clamp(2rem,6vw,6rem)', flexWrap:'wrap' }}>
        <p style={{ margin:0, maxWidth:'42ch', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)',
          color:'var(--text-muted)', fontWeight:'var(--fw-regular)' }}>
          Bridging complex systems and human cognition through research-driven design,
          toward human factors and UX research in healthcare.
        </p>
        <span style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
          letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)', whiteSpace:'nowrap' }}>
          <span style={{ width:6, height:6, borderRadius:'999px', background:'var(--accent-2)' }}></span>
          Open to research roles
        </span>
      </Reveal>
    </section>
  );
}

/* ---- Archive: stacked case-file index ---- */
function Archive({ items }) {
  return (
    <section id="work" style={{ padding:'clamp(4rem,9vw,9rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
      <Reveal style={{ display:'flex', alignItems:'baseline', gap:'0.75rem', marginBottom:'clamp(2rem,4vw,3.5rem)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--accent)' }}>04</span>
        <span style={{ width:'2rem', height:'var(--hair)', background:'var(--border-strong)', alignSelf:'center' }} />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)' }}>Selected Work — Index</span>
      </Reveal>
      <div>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i*60}>
            <CaseRow item={it} last={i === items.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CaseRow({ item, last }) {
  const [h, setH] = useStateS(false);
  return (
    <a data-hot href={`${item.id}.html`} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:'relative', width:'100%', textAlign:'left', display:'block',
        padding:'clamp(1.4rem,2.6vw,2.4rem) 0',
        borderTop:'var(--hair) solid var(--border)', borderBottom: last?'var(--hair) solid var(--border)':'none',
        overflow:'hidden', textDecoration:'none', color:'inherit' }}>
      <span style={{ position:'absolute', left:0, top:0, width:'var(--hair-2)', height:'100%', background:'var(--accent)', transform: h ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top', transition:'transform var(--dur-3) var(--ease-out)' }} />
      <div style={{
        display:'grid',
        gridTemplateColumns:'minmax(2.5rem,auto) 1fr auto auto',
        alignItems:'center',
        columnGap:'clamp(1rem,3vw,3rem)',
        width:'100%',
        transform: h ? 'translate3d(clamp(.75rem,1.5vw,1.5rem),0,0)' : 'translate3d(0,0,0)',
        transition: 'transform var(--dur-3) var(--ease-out)',
        willChange: 'transform'
      }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          color:h?'var(--accent)':'var(--text-faint)', alignSelf:'start', paddingTop:'0.5rem', transition:'color var(--dur-2) var(--ease-soft)' }}>{item.code}</span>
        <span style={{ minWidth:0 }}>
          <span style={{ display:'block', fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-h1)',
            lineHeight:0.98, letterSpacing:'var(--track-tight)', color:'var(--text-strong)', transform:h?'translateX(0.4rem)':'none',
            transition:'transform var(--dur-3) var(--ease-out)' }}>{item.title}</span>
          <span style={{ display:'block', marginTop:'0.7rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
            letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)',
            transform:h?'translateX(0.4rem)':'none', transition:'transform var(--dur-3) var(--ease-out) 30ms' }}>{item.disciplines.join('  ·  ')}</span>
        </span>
        <span aria-hidden="true" style={{ width:'clamp(6rem,11vw,11rem)', height:'clamp(4.5rem,8vw,8rem)', flexShrink:0,
          overflow:'hidden', background:'var(--obsidian)', opacity:h?1:0,
          transform: h ? 'translate3d(0,0,0)' : 'translate3d(16px,0,0)',
          transition:'transform var(--dur-4) var(--ease-out), opacity var(--dur-3) var(--ease-out)', willChange:'transform, opacity' }}>
          <img src={item.thumb} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top',
            filter:h?'grayscale(8%) brightness(.96)':'grayscale(40%) brightness(.8)', transform:h?'scale(1.04)':'scale(1.12)',
            transition:'transform var(--dur-5) var(--ease-out), filter var(--dur-4) var(--ease-out)' }} />
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:'clamp(1rem,2vw,2rem)', alignSelf:'start', paddingTop:'0.4rem' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--text-faint)' }}>{item.year}</span>
          <span aria-hidden="true" style={{ fontFamily:'var(--font-mono)', fontSize:'1.2rem', color:h?'var(--accent)':'var(--text-muted)',
            transform:h?'translateX(6px)':'none', transition:'transform var(--dur-3) var(--ease-out), color var(--dur-2) var(--ease-soft)' }}>→</span>
        </span>
      </div>
    </a>
  );
}

Object.assign(window, { Nav, Hero, Archive });
