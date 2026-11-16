/* ============================================================
   Portfolio — Nav, Kiosk hero, Case Studies, Footer.
   The home screen is a console: four channels, one per section.
   ============================================================ */
const { useState: useStateS, useEffect: useEffectS } = React;

/* ---- Nav ---- */
function Nav({ onOpen, onHome, view }) {
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const items = [['work','Case Studies'],['currently','Currently'],['about','About'],['contact','Contact']];
  const isHome = view === 'home';
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, height:'var(--topbar-h)', zIndex:20,
      background: isHome ? 'transparent' : 'var(--bg)',
      backdropFilter: 'none',
      borderBottom: (!isHome && scrolled) ? 'var(--hair) solid var(--border)' : 'var(--hair) solid transparent',
      transition:'background var(--dur-3) var(--ease-soft), border-color var(--dur-3) var(--ease-soft)',
      pointerEvents: isHome ? 'none' : 'auto' }}>
      <style>{`
        .rs-nav-inner { max-width:var(--page-max); margin:0 auto; height:100%; padding:0 var(--gutter); display:flex; align-items:center; justify-content:space-between; gap:1rem; }
        .rs-nav-links { display:flex; align-items:center; gap:clamp(1.2rem,2.4vw,2.2rem); }
        @media (max-width: 680px) {
          .rs-nav-inner { gap:0.5rem; }
          .rs-nav-links { gap:0.85rem; overflow-x:auto; max-width:100%; padding:0.25rem 0; scrollbar-width:none; -ms-overflow-style:none; }
          .rs-nav-links::-webkit-scrollbar { display:none; }
          .rs-nav-links button, .rs-nav-links a { flex-shrink:0; font-size:0.78rem !important; }
        }
      `}</style>
      <div className="rs-nav-inner">
        {!isHome ? (
          <button data-hot onClick={onHome} style={{ display:'inline-flex', alignItems:'center', gap:'0.65rem',
            fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:'var(--fw-semibold)', letterSpacing:'-0.01em',
            color:'var(--text-strong)', flexShrink:0 }}>
            <span style={{ width:7, height:7, borderRadius:999, background:'var(--accent)' }} />
            <span>Rapheal Suber</span>
          </button>
        ) : <span />}
        <nav className="rs-nav-links" style={{ pointerEvents:'auto' }}>
          {!isHome && items.map(([id, label]) => <NavLink key={id} label={label} active={view===id} onClick={() => onOpen(id)} />)}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
function NavLink({ label, active, onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontSize:'var(--text-sm)', color: (h || active) ? 'var(--text-strong)' : 'var(--text-muted)',
        transition:'color var(--dur-2) var(--ease-soft)' }}>{label}</button>
  );
}

/* A quiet handheld console, with a playable project library. */
const ASCII_WORLD = `                 .           +                       .
         +                 __________________
                          /_________________/|
       .                 |  .  .  .  .  .  | |
                   ______|  .  .  .  .  .  | |______
                  /      |_________________|/      /|
     ____________/________________________________/ |
    / . . . . . /    ____                  ____  /  |
   / . . . . . /    |____|     +          |____|/   /
  /___________/_______________________________/   /
  |           |                               |  /
  |___________|_______________________________|/
             .                 +                    .`;

function AsciiScene({ className = '' }) {
  return <pre aria-hidden="true" className={'ascii-scene ' + className}>{ASCII_WORLD}</pre>;
}

function Hero({ onOpen }) {
  const shell = React.useRef(null);
  useEffectS(() => {
    const node = shell.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!node || media.matches || window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    const move = e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = node.getBoundingClientRect();
        node.style.setProperty('--px', ((e.clientX-r.left)/r.width-.5)*12+'px');
        node.style.setProperty('--py', ((e.clientY-r.top)/r.height-.5)*8+'px');
      });
    };
    const reset = () => { cancelAnimationFrame(raf); node.style.setProperty('--px','0px'); node.style.setProperty('--py','0px'); };
    node.addEventListener('pointermove',move); node.addEventListener('pointerleave',reset);
    return () => { cancelAnimationFrame(raf); node.removeEventListener('pointermove',move); node.removeEventListener('pointerleave',reset); };
  }, []);
  return <section className="console-home" ref={shell}>
    <div className="console-topline"><span>RS / PERSONAL SYSTEM</span><span>DESIGN · RESEARCH · DEVELOPMENT</span></div>
    <div className="handheld">
      <div className="handheld-rim"><span><i /> HUMAN FACTORS / INTERACTIVE PORTFOLIO</span><span>01 — 04</span></div>
      <div className="lcd-screen">
        <div className="lcd-status"><span>PLAYER 01</span><span>● SYSTEM READY</span></div>
        <div className="lcd-content">
          <div className="lcd-copy"><p className="console-label">Hello, I'm</p><h1>Rapheal<br/>Suber<span className="pixel-cursor">_</span></h1><p className="lcd-role">Human factors.<br/>Human-centered software.</p><p className="lcd-intro">I research, design, and build tools for the moments when clarity matters most.</p><button className="start-button" onClick={()=>onOpen('work')}>▶ EXPLORE MY WORK</button></div>
          <div className="lcd-art"><AsciiScene/><span>HUMAN CAPABILITY × SYSTEM COMPLEXITY</span></div>
        </div>
        <div className="lcd-bottom"><span>SELECT A CHANNEL TO BEGIN</span><span>© 2026 RS</span></div>
      </div>
      <div className="console-controls"><div className="d-pad" aria-hidden="true">✚</div><nav aria-label="Portfolio channels" className="channel-buttons">{[['work','01','Case Studies'],['about','02','About'],['currently','03','Currently'],['contact','04','Contact']].map(([id,num,label])=><button key={id} onClick={()=>onOpen(id)}><span>{num}</span>{label}<b aria-hidden="true">↗</b></button>)}</nav><div className="speaker" aria-hidden="true">/////</div></div>
    </div>
    <div className="console-home-foot"><span>BUILT WITH CURIOSITY. DESIGNED FOR PEOPLE.</span><a href="https://github.com/manyworldss" target="_blank" rel="noopener">GITHUB ↗</a></div>
  </section>;
}

function PrimaryBtn({ children, onClick }) { return <button className="console-button" onClick={onClick}>{children} →</button>; }

function CaseStudies({ items, onOpen }) {
  const rail = React.useRef(null);
  const [active,setActive] = useStateS(0);
  useEffectS(() => {
    const node = rail.current;
    if (!node) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0;
    const update=()=>{
      raf=0;
      const cards=[...node.children];
      let nearest=0, distance=Infinity;
      cards.forEach((card,i)=>{const delta=card.offsetLeft-node.offsetLeft-node.scrollLeft;const d=Math.abs(delta);if(d<distance){distance=d;nearest=i;}if(!media.matches)card.style.setProperty('--card-px',Math.max(-14,Math.min(14,delta*.025))+'px');});
      setActive(nearest);
      if(!media.matches) node.style.setProperty('--rail-shift',node.scrollLeft*-0.08+'px');
    };
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};
    node.addEventListener('scroll',scroll,{passive:true});update();
    return()=>{cancelAnimationFrame(raf);node.removeEventListener('scroll',scroll);};
  },[]);
  const select = i => {
    const node=rail.current;
    const card=node.children[Math.max(0,Math.min(items.length-1,i))];
    node.scrollTo({left:card.offsetLeft-node.offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  return <section id="work" className="project-library">
    <div className="library-heading"><div><p className="console-label">THE PROJECT LIBRARY / SELECT A CARTRIDGE</p><h1>Work, in play.</h1></div><span className="library-count">{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span></div>
    <div className="library-toolbar"><p>Research, decisions, and the systems they became.</p><div><button aria-label="Previous project" disabled={active===0} onClick={()=>select(active-1)}>←</button><button aria-label="Next project" disabled={active===items.length-1} onClick={()=>select(active+1)}>→</button></div></div>
    <div className="cartridge-rail" ref={rail} role="region" aria-label="Case studies, scroll horizontally" tabIndex="0" onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1));}}}>
      {items.map((item,i)=><article className={'cartridge cartridge-'+item.id} key={item.id}>
        <div className="cartridge-heading"><span>{item.code}</span><span>{item.status || (item.upcoming?'COMING SOON':item.id==='birk'?'INTERNAL TOOL':item.id==='celio'?'iOS / TESTFLIGHT':'CASE STUDY')}</span><span aria-hidden="true">▥</span></div>
        <div className="cartridge-media">{item.thumb?<img src={item.thumb} alt={item.title+' project preview'} loading={i<2?'eager':'lazy'}/>:<div className="media-placeholder"><AsciiScene/><span>{item.upcoming?'NEXT CARTRIDGE / RUNA':'BIRK / PHOTO ARCHIVE'}<br/><small>{item.upcoming?'Concept in progress / visuals to come':'Screenshots to be added'}</small></span></div>}<span className="media-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span></div>
        <div className="cartridge-copy"><div className="console-label">{item.disciplines.join(' / ')}</div><h2>{item.title}<span aria-hidden="true">{item.upcoming?'+':'>'}</span></h2><p>{item.blurb}</p><button className="console-button" onClick={()=>onOpen(item.id)}>{item.upcoming?'Explore the concept':'Explore case study'} →</button></div>
      </article>)}
    </div>
    <div className="library-bottom"><span>SWIPE / SCROLL / USE ← →</span><div className="library-dots">{items.map((it,i)=><button key={it.id} aria-label={'Go to '+it.title} aria-current={i===active?'true':undefined} onClick={()=>select(i)}/>)}</div><span aria-live="polite">{items[active].title}</span></div>
  </section>;
}

function Footer({ onOpen }) {
  return (
    <footer style={{ marginTop:'clamp(3rem,7vw,6rem)', borderTop:'var(--hair) solid var(--border)',
      paddingTop:'clamp(3rem,6vw,5rem)' }}>
      <Reveal>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
          letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0, maxWidth:'16ch' }}>
          Let's build something reliable.
        </h2>
        <div style={{ marginTop:'2rem' }}>
          <PrimaryBtn onClick={()=>onOpen('contact')}>Get in touch</PrimaryBtn>
        </div>
      </Reveal>
      <div style={{ marginTop:'clamp(2.5rem,5vw,4rem)', paddingTop:'1.6rem', borderTop:'var(--hair) solid var(--border)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)' }}>© 2026 Rapheal Suber</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, CaseStudies, Footer, PrimaryBtn });
