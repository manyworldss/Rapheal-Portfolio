/* ============================================================
   Editorial Archive v2 — Nav, Hero, Projects (Moments structure).
   ============================================================ */
const { useState: useStateS, useRef: useRefS } = React;

/* ---- Nav ---- */
function Nav({ onOpen }) {
  const links = [
    { l: 'Work', id: 'work' },
    { l: 'About', id: 'about' },
    { l: 'Experience', id: 'experience' },
  ];
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:800,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      height:'var(--topbar-h)', padding:'0 var(--gutter)' }}>
      <a href="#top" onClick={(e)=>{e.preventDefault(); scrollTo({top:0,behavior:'smooth'});}}
        style={{ fontFamily:'var(--font-mono)', fontWeight:700, fontSize:'0.9375rem', color:'var(--text-strong)' }}>
        RS<span style={{ color:'var(--accent)' }}>/</span>
      </a>
      <nav style={{ display:'flex', alignItems:'center', gap:'clamp(1.1rem,2.6vw,2.2rem)' }}>
        {links.map((it) => <NavLink key={it.id} label={it.l} onClick={()=>onOpen(it.id)} />)}
        <TalkPill onClick={()=>onOpen('contact')} />
        <ThemeToggle />
      </nav>
    </header>
  );
}
function NavLink({ label, onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:'relative', fontFamily:'var(--font-mono)', fontSize:'var(--text-label)',
        letterSpacing:'var(--track-label)', textTransform:'uppercase',
        color: h ? 'var(--text-strong)' : 'var(--text-muted)', paddingBottom:'0.3rem',
        transition:'color var(--dur-2) var(--ease-soft)' }}>
      {label}
      <span style={{ position:'absolute', left:0, bottom:0, height:'var(--hair)', width:h?'100%':'0%',
        background:'var(--accent)', transition:'width var(--dur-3) var(--ease-out)' }} />
    </button>
  );
}
function TalkPill({ onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)',
        textTransform:'uppercase', color:'var(--bg)',
        background: h ? 'var(--accent)' : 'var(--text-strong)',
        border:'none', borderRadius:'var(--radius-pill)',
        padding:'0.7rem 1.25rem', whiteSpace:'nowrap',
        transition:'background var(--dur-2) var(--ease-soft)' }}>
      Let's talk <span aria-hidden="true">↗</span>
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
      style={{ display:'flex', alignItems:'center', gap:'0.45rem', fontFamily:'var(--font-mono)',
        fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)', textTransform:'uppercase',
        color:'var(--text-muted)' }}>
      <span style={{ width:7, height:7, borderRadius:'999px', background: dark?'var(--accent-2)':'var(--accent)',
        transition:'background var(--dur-2) var(--ease-soft)' }}></span>
      {dark ? 'Night' : 'Day'}
    </button>
  );
}

/* ---- Hero — the Moments structure: meta strip, disciplines,
   massive stacked statement with serif-italic accent line,
   intro + CTAs on the baseline. ---- */
function Hero({ onOpen }) {
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column',
      justifyContent:'space-between', gap:'clamp(1.25rem,3vh,2.5rem)', padding:'calc(var(--topbar-h) + clamp(0.5rem,2.5vh,2rem)) var(--gutter) clamp(2rem,5vh,4rem)',
      overflow:'hidden' }}>
      <style>{`
        @keyframes heroWave{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-5%,4%) scale(1.12)}100%{transform:translate(0,0) scale(1)}}
        @keyframes lineRise{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .hero-line{display:block;overflow:hidden;padding-bottom:0.06em;margin-bottom:-0.04em;}
        .hero-line-in{display:block;transform:translateY(108%);animation:lineRise 1.05s var(--ease-out) forwards;}
        @media (prefers-reduced-motion: reduce){
          .hero-wave{animation:none!important}
          .hero-line-in{transform:none;animation:none}
        }
      `}</style>

      {/* warm glow, right side */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:-1, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'12%', right:'-14%', width:'52vw', height:'52vw',
          background:'radial-gradient(circle, var(--accent-wash), transparent 62%)', borderRadius:'999px', opacity:0.9 }} />
        <div style={{ position:'absolute', bottom:'-18%', left:'-10%', width:'40vw', height:'40vw',
          background:'radial-gradient(circle, var(--accent-2-wash), transparent 64%)', borderRadius:'999px' }} />
      </div>

      {/* corner bracket */}
      <span aria-hidden="true" style={{ position:'absolute', top:'calc(var(--topbar-h) + 0.75rem)', left:'var(--gutter)', zIndex:-1,
        width:44, height:44, borderLeft:'var(--hair-2) solid var(--accent-line)', borderTop:'var(--hair-2) solid var(--accent-line)' }} />

      {/* A — meta strip */}
      <Reveal as="div" delay={1450} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem',
        paddingTop:'2rem', flexWrap:'wrap' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--text-muted)' }}>Rapheal Suber</span>
        <span style={{ display:'flex', alignItems:'center', gap:'0.55rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
          letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent-2)' }}>
          <span style={{ width:6, height:6, borderRadius:'999px', background:'var(--accent-2)' }}></span>
          Available for research &amp; product design roles
        </span>
      </Reveal>

      {/* B — disciplines + statement */}
      <div>
        <Reveal as="p" delay={1550} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
          letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--accent)', margin:'0 0 1.4rem' }}>
          Human Factors Psychology · UX Research · Product Design
        </Reveal>
        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-hero)',
          lineHeight:'var(--leading-hero)', letterSpacing:'var(--track-hero)', textTransform:'uppercase',
          color:'var(--text-strong)', margin:0 }}>
          <span className="hero-line"><span className="hero-line-in" style={{ animationDelay:'1.6s' }}>Designing</span></span>
          <span className="hero-line"><span className="hero-line-in" style={{ animationDelay:'1.72s' }}>
            <em style={{ fontFamily:'var(--font-accent)', fontStyle:'italic', fontWeight:400, textTransform:'none',
              color:'var(--accent)', letterSpacing:0 }}>for clarity</em>
          </span></span>
          <span className="hero-line"><span className="hero-line-in" style={{ animationDelay:'1.84s' }}>in the moments</span></span>
          <span className="hero-line"><span className="hero-line-in" style={{ animationDelay:'1.96s' }}>that matter.</span></span>
        </h1>
      </div>

      {/* C — intro + CTAs */}
      <Reveal delay={2250} y="14px" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        gap:'clamp(1.5rem,4vw,4rem)', flexWrap:'wrap', borderTop:'var(--hair) solid var(--border)', paddingTop:'1.4rem' }}>
        <p style={{ margin:0, maxWidth:'44ch', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)',
          color:'var(--text-muted)' }}>
          I work across research, product design, and front-end development
          to make complex tools easier to understand and use.
        </p>
        <span style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
          <CtaPill solid onClick={()=>{ const w=document.querySelector('#work'); if(w) scrollTo({top:w.offsetTop-20, behavior:'smooth'}); }}>
            View selected work <span aria-hidden="true">↓</span>
          </CtaPill>
          <CtaPill onClick={()=>onOpen('contact')}>Start a conversation <span aria-hidden="true">↗</span></CtaPill>
        </span>
      </Reveal>
    </section>
  );
}
function CtaPill({ children, solid = false, onClick }) {
  const [h, setH] = useStateS(false);
  const base = solid
    ? { bg: h ? 'var(--accent-hover)' : 'var(--accent)', fg: '#F4F0E5', bd: 'transparent' }
    : { bg: h ? 'var(--text-strong)' : 'transparent', fg: h ? 'var(--bg)' : 'var(--text-strong)', bd: 'var(--border-strong)' };
  return (
    <button data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:'inline-flex', alignItems:'center', gap:'0.6em', fontFamily:'var(--font-mono)',
        fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)', textTransform:'uppercase',
        color:base.fg, background:base.bg, border:`var(--hair) solid ${base.bd}`,
        borderRadius:'var(--radius-pill)', padding:'0.85rem 1.5rem', whiteSpace:'nowrap',
        transition:'background var(--dur-2) var(--ease-soft), color var(--dur-2) var(--ease-soft)' }}>
      {children}
    </button>
  );
}

/* ---- Projects — centered section header + alternating split cards ---- */
function Projects({ items }) {
  const caseCount = items.filter((it) => !it.wip).length;
  return (
    <section id="work" style={{ padding:'clamp(4rem,9vw,8rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
      <div style={{ position:'relative', textAlign:'center', marginBottom:'clamp(2.5rem,5vw,4.5rem)' }}>
        <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'2.4rem' }}>
          <span style={{ display:'flex', alignItems:'baseline', gap:'0.75rem' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', color:'var(--accent)' }}>01</span>
            <span style={{ width:'2rem', height:'var(--hair)', background:'var(--border-strong)', alignSelf:'center' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)' }}>Selected Work</span>
          </span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-faint)' }}>{String(caseCount).padStart(2,'0')} Case Studies</span>
        </Reveal>
        <Reveal delay={60}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
            lineHeight:'var(--leading-display)', letterSpacing:'var(--track-display)', textTransform:'uppercase',
            color:'var(--text-strong)', margin:0 }}>
            Selected<br /><em style={{ fontFamily:'var(--font-accent)', fontStyle:'italic', fontWeight:400, textTransform:'none', color:'var(--accent)', letterSpacing:0 }}>projects.</em>
          </h2>
          <p style={{ margin:'1.2rem auto 0', maxWidth:'46ch', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)' }}>
            Work across consumer health, AI, clinical tools, and onboarding.
          </p>
        </Reveal>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'clamp(2rem,4vw,3.5rem)' }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={40}>
            <ProjectCard item={it} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ item, flip }) {
  const [h, setH] = useStateS(false);
  const cardRef = useRefS(null);
  const imgRef = useRefS(null);
  const wip = !!item.wip;
  const beta = !!item.beta;
  const contain = !!item.contain;
  const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = (e) => {
    const el = cardRef.current; if (!el || reduce()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${(px * 2.4).toFixed(2)}deg) rotateX(${(py * -2.4).toFixed(2)}deg) translateY(-3px)`;
    if (imgRef.current) imgRef.current.style.transform = `scale(1.06) translate(${(px * -16).toFixed(1)}px, ${(py * -14).toFixed(1)}px)`;
  };
  const onEnter = () => setH(true);
  const onLeave = () => {
    setH(false);
    if (cardRef.current) cardRef.current.style.transform = '';
    if (imgRef.current) imgRef.current.style.transform = '';
  };
  const media = (
    <div style={{ position:'relative', background:'var(--obsidian)', overflow:'hidden', height:'100%' }}>
      {item.thumb ? (
        <img ref={imgRef} src={item.thumb} alt={item.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%',
          boxSizing:'border-box', objectFit: contain ? 'contain' : 'cover', objectPosition: contain ? 'center' : 'top',
          padding: contain ? 'clamp(1.4rem,3vw,2.6rem)' : 0,
          filter: h ? 'grayscale(0%) brightness(1)' : 'grayscale(22%) brightness(0.9)',
          transition:'transform var(--dur-4) var(--ease-out), filter var(--dur-4) var(--ease-out)', willChange:'transform' }} />
      ) : (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'flex-end', padding:'1.2rem',
          background:'radial-gradient(80% 80% at 30% 20%, var(--obsidian-3), var(--obsidian))' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)',
            textTransform:'uppercase', color:'var(--on-dark-muted)' }}>{item.mediaLabel}</span>
        </div>
      )}
    </div>
  );
  const text = (
    <div style={{ padding:'clamp(1.5rem,3vw,3rem)', display:'flex', flexDirection:'column', gap:'1.2rem', justifyContent:'center' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
        fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase' }}>
        <span style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <span style={{ color:'var(--accent)' }}>{item.code}</span>
          {wip && (
            <span style={{ display:'inline-flex', alignItems:'center', gap:'0.35rem', color:'var(--accent-2)',
              border:'var(--hair) solid var(--accent-2-line)', borderRadius:'var(--radius-pill)', padding:'0.15rem 0.6rem',
              letterSpacing:'var(--track-micro)' }}>
              <span style={{ width:5, height:5, borderRadius:'999px', background:'var(--accent-2)' }} />
              In progress
            </span>
          )}
          {beta && (
            <span style={{ display:'inline-flex', alignItems:'center', gap:'0.35rem', color:'var(--accent)',
              border:'var(--hair) solid var(--accent-line)', borderRadius:'var(--radius-pill)', padding:'0.15rem 0.6rem',
              letterSpacing:'var(--track-micro)' }}>
              <span style={{ width:5, height:5, borderRadius:'999px', background:'var(--accent)' }} />
              Beta
            </span>
          )}
        </span>
        <span style={{ color:'var(--text-faint)' }}>{item.year}</span>
      </div>
      <hr className="rule" style={{ margin:0 }} />
      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'clamp(2rem,3.6vw,3.25rem)',
        lineHeight:1.0, letterSpacing:'var(--track-display)', textTransform:'uppercase', color:'var(--text-strong)', margin:'0.4rem 0' }}>
        {item.title}
      </h3>
      <p style={{ margin:0, maxWidth:'52ch', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)',
        display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
        {item.summary}
      </p>
      <hr className="rule" style={{ margin:'0.4rem 0 0' }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)', lineHeight:1.7 }}>
          <span style={{ color:'var(--text-faint)', display:'block' }}>Role</span>
          {item.disciplines.join(' · ')}
        </span>
        {wip ? (
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)',
            textTransform:'uppercase', color:'var(--text-faint)', whiteSpace:'nowrap' }}>
            In development — coming soon
          </span>
        ) : (
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)',
            textTransform:'uppercase', color: h ? 'var(--accent)' : 'var(--text-strong)', whiteSpace:'nowrap',
            transition:'color var(--dur-2) var(--ease-soft)' }}>
            View case study <span aria-hidden="true" style={{ display:'inline-block', transform: h ? 'translateX(4px)' : 'none', transition:'transform var(--dur-2) var(--ease-out)' }}>→</span>
          </span>
        )}
      </div>
    </div>
  );
  const gridStyle = {
    display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)', width:'100%', textAlign:'left',
    height:'clamp(340px, 40vw, 500px)',
    border:`var(--hair) solid ${(!wip && h) ? 'var(--border-strong)' : 'var(--border)'}`, background:'var(--bg-raised)',
    textDecoration:'none', color:'inherit', willChange:'transform',
    transition:'transform 140ms var(--ease-out), border-color var(--dur-2) var(--ease-soft)',
  };
  if (wip) {
    return (
      <div style={gridStyle}>
        {flip ? text : media}
        {flip ? media : text}
      </div>
    );
  }
  return (
    <a ref={cardRef} data-hot href={item.page || `${item.id}.html`}
      onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={gridStyle}>
      {flip ? text : media}
      {flip ? media : text}
    </a>
  );
}

Object.assign(window, { Nav, Hero, Projects });
