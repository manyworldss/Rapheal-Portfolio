/* ============================================================
   Portfolio — Nav, console home (with the Rally game), Case
   Studies, and the sign-off footer.
   The home screen is a console: four channels, one per section.
   ============================================================ */
const { useState: useStateS, useEffect: useEffectS } = React;

/* One channel order everywhere: home buttons, nav, and section headers. */
const CHANNELS = [['work','01','Case Studies'],['about','02','About'],['currently','03','Currently'],['contact','04','Contact']];

/* ---- Nav ---- */
function Nav({ onOpen, onHome, view }) {
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
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
          <button data-hot onClick={onHome} aria-label="Back to the console" style={{ display:'inline-flex', alignItems:'center', gap:'0.65rem',
            fontFamily:'var(--font-display)', fontSize:'0.95rem', fontWeight:'var(--fw-semibold)', letterSpacing:'-0.01em',
            color:'var(--text-strong)', flexShrink:0 }}>
            <span style={{ width:8, height:8, background:'var(--accent)' }} />
            <span>Rapheal Suber</span>
          </button>
        ) : <span />}
        <nav className="rs-nav-links" style={{ pointerEvents:'auto' }}>
          {!isHome && CHANNELS.map(([id, , label]) => <NavLink key={id} label={label} active={view===id} onClick={() => onOpen(id)} />)}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
function NavLink({ label, active, onClick }) {
  const [h, setH] = useStateS(false);
  return (
    <button data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} aria-current={active ? 'page' : undefined}
      style={{ fontSize:'var(--text-sm)', color: (h || active) ? 'var(--text-strong)' : 'var(--text-muted)',
        textDecoration: active ? 'underline' : 'none', textDecorationColor:'var(--accent)', textUnderlineOffset:'6px', textDecorationThickness:'2px',
        transition:'color var(--dur-2) var(--ease-soft)' }}>{label}</button>
  );
}

/* A quiet handheld console. */
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

/* ---- Rally: an original paddle game for the console screen ----
   Attract mode: both paddles play themselves. START (button, tap, or
   Enter) hands the left paddle to the visitor; first to five wins and
   the end screen points to the case studies. Reduced motion gets a
   still title card and only moves if the visitor chooses to play. */
const RW = 160, RH = 100, PAD_H = 18, PAD_W = 3, BALL = 3, PAD_X = 6, WIN_AT = 5;
const pad2 = n => String(n).padStart(2, '0');

function RallyGame({ onOpen }) {
  const reduced = React.useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const idle = reduced ? 'still' : 'demo';
  const [mode, setMode] = useStateS('boot');           // boot | demo | still | play | over
  const [score, setScore] = useStateS([0, 0]);
  const [hint, setHint] = useStateS(false);
  const wrap = React.useRef(null), canvas = React.useRef(null);
  const keys = React.useRef({ up:false, down:false }), pointer = React.useRef(null);

  const start = () => { setMode('play'); wrap.current && wrap.current.focus({ preventScroll:true }); };

  // Boot splash, then the demo.
  useEffectS(() => {
    if (mode !== 'boot') return;
    const t = setTimeout(() => setMode(idle), 1500);
    return () => clearTimeout(t);
  }, [mode]);

  // After a game ends, drift back to the demo if nobody acts.
  useEffectS(() => {
    if (mode !== 'over') return;
    const t = setTimeout(() => setMode(idle), 15000);
    return () => clearTimeout(t);
  }, [mode]);

  // Game loop: runs only while the demo or a game is on screen.
  useEffectS(() => {
    if (mode !== 'demo' && mode !== 'play') return;
    const human = mode === 'play';
    const cv = canvas.current, ctx = cv.getContext('2d');
    const readColors = () => {
      const cs = getComputedStyle(wrap.current);
      const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      return { bg:v('--screen','#b6c58e'), ink:v('--screen-ink','#253421'), mid:v('--screen-muted','#4a5b3b') };
    };
    let col = readColors();
    const themeWatch = new MutationObserver(() => { col = readColors(); });
    themeWatch.observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold:0.05 });
    io.observe(cv);

    const rnd = (a, b) => a + Math.random() * (b - a);
    const s = { ly:RH/2 - PAD_H/2, ry:RH/2 - PAD_H/2, bx:0, by:0, vx:0, vy:0, speed:0, wait:0, err:[0,0], score:[0,0] };
    // Each paddle aims with a little error, so rallies end now and then.
    const aim = p => { s.err[p] = rnd(-1, 1) * PAD_H * (human && p === 1 ? 0.6 : 0.68); };
    const serve = dir => {
      s.bx = RW/2 - BALL/2; s.by = rnd(RH*0.3, RH*0.7); s.speed = 72;
      const a = rnd(-0.45, 0.45); s.vx = Math.cos(a) * s.speed * dir; s.vy = Math.sin(a) * s.speed;
      s.wait = 0.8; aim(dir > 0 ? 1 : 0);
    };
    const track = (y, p, dt, maxV) => {
      const coming = p === 0 ? s.vx < 0 : s.vx > 0;
      const target = coming ? s.by + BALL/2 + s.err[p] - PAD_H/2 : RH/2 - PAD_H/2;
      const step = maxV * dt;
      return y + Math.max(-step, Math.min(step, target - y));
    };
    const clampY = y => Math.max(0, Math.min(RH - PAD_H, y));
    const hit = (py, dirOut) => {
      const rel = Math.max(-1, Math.min(1, ((s.by + BALL/2) - (py + PAD_H/2)) / (PAD_H/2)));
      const a = rel * 0.95;
      s.speed = Math.min(s.speed * 1.07, 175);
      s.vx = Math.cos(a) * s.speed * dirOut; s.vy = Math.sin(a) * s.speed;
      aim(dirOut > 0 ? 1 : 0);
    };
    serve(Math.random() < 0.5 ? -1 : 1);
    setScore([0, 0]);

    const step = dt => {
      if (human) {
        if (pointer.current != null) s.ly += (pointer.current - PAD_H/2 - s.ly) * Math.min(1, dt * 18);
        if (keys.current.up) s.ly -= 130 * dt;
        if (keys.current.down) s.ly += 130 * dt;
      } else s.ly = track(s.ly, 0, dt, 82);
      s.ry = track(s.ry, 1, dt, human ? 74 : 82);
      s.ly = clampY(s.ly); s.ry = clampY(s.ry);
      if (s.wait > 0) { s.wait -= dt; return; }
      s.bx += s.vx * dt; s.by += s.vy * dt;
      if (s.by < 0) { s.by = 0; s.vy = Math.abs(s.vy); }
      if (s.by > RH - BALL) { s.by = RH - BALL; s.vy = -Math.abs(s.vy); }
      const rx = RW - PAD_X - PAD_W;
      if (s.vx < 0 && s.bx <= PAD_X + PAD_W && s.bx + BALL >= PAD_X && s.by + BALL >= s.ly && s.by <= s.ly + PAD_H) { s.bx = PAD_X + PAD_W; hit(s.ly, 1); }
      if (s.vx > 0 && s.bx + BALL >= rx && s.bx <= rx + PAD_W && s.by + BALL >= s.ry && s.by <= s.ry + PAD_H) { s.bx = rx - BALL; hit(s.ry, -1); }
      if (s.bx < -BALL * 2 || s.bx > RW + BALL) {
        const scorer = s.bx < 0 ? 1 : 0;
        s.score[scorer]++;
        if (s.score[scorer] >= WIN_AT) {
          if (human) { setScore([...s.score]); setMode('over'); return 'stop'; }
          s.score = [0, 0];
        }
        setScore([...s.score]);
        serve(scorer === 0 ? 1 : -1);   // serve toward whoever just lost the point
      }
    };
    const draw = ghost => {
      // A partial wipe leaves a faint trail, like a slow handheld LCD.
      ctx.globalAlpha = ghost ? 0.5 : 1; ctx.fillStyle = col.bg; ctx.fillRect(0, 0, RW, RH); ctx.globalAlpha = 1;
      ctx.fillStyle = col.mid;
      for (let y = 2; y < RH; y += 7) ctx.fillRect(RW/2 - 1, y, 1, 3);
      ctx.fillStyle = col.ink;
      ctx.fillRect(PAD_X, Math.round(s.ly), PAD_W, PAD_H);
      ctx.fillRect(RW - PAD_X - PAD_W, Math.round(s.ry), PAD_W, PAD_H);
      if (s.wait <= 0 || Math.floor(s.wait * 6) % 2 === 0) ctx.fillRect(Math.round(s.bx), Math.round(s.by), BALL, BALL);
    };

    let raf = 0, last = performance.now(), acc = 0;
    const DT = 1 / 120;
    const loop = now => {
      raf = requestAnimationFrame(loop);
      const elapsed = Math.min(0.1, (now - last) / 1000); last = now;
      if (!visible || document.hidden) return;
      acc += elapsed;
      while (acc >= DT) {
        acc -= DT;
        if (step(DT) === 'stop') { cancelAnimationFrame(raf); draw(false); return; }
      }
      draw(!reduced);
    };
    draw(false);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); themeWatch.disconnect(); io.disconnect(); };
  }, [mode]);

  // Controls while playing: arrows / W S, pointer or touch drag, Esc to quit.
  useEffectS(() => {
    if (mode !== 'play') return;
    setHint(true);
    const t = setTimeout(() => setHint(false), 3500);
    const map = { ArrowUp:'up', w:'up', W:'up', ArrowDown:'down', s:'down', S:'down' };
    const down = e => {
      if (e.key === 'Escape') { setMode(idle); return; }
      const k = map[e.key];
      if (k) { e.preventDefault(); keys.current[k] = true; pointer.current = null; }
    };
    const up = e => { const k = map[e.key]; if (k) keys.current[k] = false; };
    addEventListener('keydown', down); addEventListener('keyup', up);
    return () => {
      clearTimeout(t); removeEventListener('keydown', down); removeEventListener('keyup', up);
      keys.current = { up:false, down:false }; pointer.current = null;
    };
  }, [mode]);

  const onPointer = e => {
    if (mode !== 'play') return;
    const r = canvas.current.getBoundingClientRect();
    pointer.current = (e.clientY - r.top) / r.height * RH;
  };
  const human = mode === 'play' || mode === 'over';
  const won = score[0] >= WIN_AT;
  const caption = { boot:'Loading Rally…', demo:'Demo · press start to play', still:'Rally · a tiny paddle game', play:'You are the left paddle', over:'Thanks for playing' }[mode];

  return (
    <div className={'rally rally-' + mode} ref={wrap} tabIndex={-1}
      onKeyDown={e => { if (mode === 'demo' && e.key === 'Enter' && e.target === wrap.current) start(); }}>
      <div className="rally-hud" aria-hidden="true">
        <span>{human ? 'You' : 'CPU'} <b>{pad2(score[0])}</b></span>
        <span>{mode === 'play' ? 'First to ' + WIN_AT : 'Rally'}</span>
        <span><b>{pad2(score[1])}</b> CPU</span>
      </div>
      <div className="rally-screen">
        <canvas ref={canvas} width={RW} height={RH} role="img"
          aria-label={mode === 'play' ? 'Rally game in progress. Use the arrow keys or drag to move your paddle. Press Escape to quit.' : 'Rally, a small paddle game, playing a demo on the console screen.'}
          onPointerMove={onPointer} onPointerDown={onPointer}
          onClick={() => { if (mode === 'demo') start(); }} />
        {(mode === 'boot' || mode === 'still') && (
          <div className="rally-cover">
            <AsciiScene />
            {mode === 'boot'
              ? <span className="rally-blink">Loading…</span>
              : <button className="rally-btn" onClick={start}>▶ Play a quick game</button>}
          </div>
        )}
        {mode === 'demo' && <div className="rally-overlay rally-overlay-demo"><button className="rally-btn rally-blink" onClick={start}>▶ Press start</button></div>}
        {mode === 'play' && hint && <div className="rally-hint" aria-hidden="true">↑ ↓ or drag · Esc to quit</div>}
        {mode === 'over' && (
          <div className="rally-overlay rally-end" role="status">
            <p className="rally-title">{won ? 'You win!' : 'Game over'}</p>
            <p className="rally-score">{pad2(score[0])} : {pad2(score[1])}</p>
            <p className="rally-continue">Continue?</p>
            <div className="rally-actions">
              <button className="rally-btn" onClick={() => onOpen('work')}>▶ See my work</button>
              <button className="rally-btn rally-btn-ghost" onClick={start}>↻ Play again</button>
            </div>
          </div>
        )}
      </div>
      <div className="rally-caption">
        <span>{caption}</span>
        {mode !== 'over' && <button className="rally-link" onClick={() => onOpen('work')}>Case studies →</button>}
      </div>
    </div>
  );
}

function Hero({ onOpen }) {
  return <section className="console-home">
    <div className="console-topline"><span>RS / PERSONAL SYSTEM</span><span>DESIGN · RESEARCH · DEVELOPMENT</span></div>
    <div className="handheld">
      <div className="handheld-rim"><span><i /> HUMAN FACTORS / INTERACTIVE PORTFOLIO</span><span>01 — 04</span></div>
      <div className="lcd-screen">
        <div className="lcd-status"><span>PLAYER 01</span><span>● SYSTEM READY</span></div>
        <div className="lcd-content">
          <div className="lcd-copy"><p className="console-label">Hello, I'm</p><h1>Rapheal<br/>Suber<span className="pixel-cursor">_</span></h1><p className="lcd-role">Human factors.<br/>Human-centered software.</p><p className="lcd-intro">I study human factors and build software. I’m interested in how people use technology and how we can make it easier to use.</p><button className="start-button" onClick={()=>onOpen('work')}>▶ EXPLORE MY WORK</button></div>
          <div className="lcd-art"><RallyGame onOpen={onOpen} /></div>
        </div>
        <div className="lcd-bottom"><span>SELECT A CHANNEL TO BEGIN</span><span>© 2026 RS</span></div>
      </div>
      <div className="console-controls"><div className="d-pad" aria-hidden="true">✚</div><nav aria-label="Portfolio channels" className="channel-buttons">{CHANNELS.map(([id,num,label])=><button key={id} onClick={()=>onOpen(id)}><span>{num}</span>{label}<b aria-hidden="true">↗</b></button>)}</nav><div className="speaker" aria-hidden="true">/////</div></div>
    </div>
    <div className="console-home-foot"><span>DESIGNED AND BUILT BY ME</span><a href="https://github.com/manyworldss" target="_blank" rel="noopener">GITHUB ↗</a></div>
  </section>;
}

function PrimaryBtn({ children, onClick }) { return <button className="console-button" onClick={onClick}>{children} →</button>; }

const CARTRIDGE_STATUS = { reach:'Live demo', celio:'iOS / TestFlight', birk:'Internal tool', prox:'Client project' };

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
    <div className="library-toolbar"><span className="library-count">Cartridge {pad2(active+1)} / {pad2(items.length)}</span><div><button aria-label="Previous project" disabled={active===0} onClick={()=>select(active-1)}>←</button><button aria-label="Next project" disabled={active===items.length-1} onClick={()=>select(active+1)}>→</button></div></div>
    <div className="cartridge-rail" ref={rail} role="region" aria-label="Case studies, scroll horizontally" tabIndex="0" onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1));}}}>
      {items.map((item,i)=><article className={'cartridge cartridge-'+item.id} key={item.id}>
        <div className="cartridge-heading"><span>{item.code}</span><span>{item.status || CARTRIDGE_STATUS[item.id] || 'Case study'}</span><span aria-hidden="true">▥</span></div>
        <div className="cartridge-media">{item.thumb?<img src={item.thumb} alt={item.title+' project preview'} loading={i<2?'eager':'lazy'}/>:<div className="media-placeholder"><AsciiScene/><span>{item.upcoming?'NEXT CARTRIDGE / RUNA':'BIRK / PHOTO ARCHIVE'}<br/><small>{item.upcoming?'Concept in progress / visuals to come':'Screenshots to be added'}</small></span></div>}<span className="media-index" aria-hidden="true">{pad2(i+1)}</span></div>
        <div className="cartridge-copy"><div className="console-label">{item.disciplines.join(' / ')}</div><h2>{item.title}</h2><p>{item.blurb}</p><button className="console-button" onClick={()=>onOpen(item.id)}>{item.upcoming?'Explore the concept':'Open case study'} →</button></div>
      </article>)}
    </div>
    <div className="library-bottom"><span>Swipe, scroll, or use ← →</span><div className="library-dots">{items.map((it,i)=><button key={it.id} aria-label={'Go to '+it.title} aria-current={i===active?'true':undefined} onClick={()=>select(i)}/>)}</div><span aria-live="polite">{items[active].title}</span></div>
  </section>;
}

/* Sign-off: a small LCD panel that closes every section and points onward. */
function Footer({ onOpen, current }) {
  return (
    <footer className="signoff">
      <div className="lcd-screen signoff-panel">
        <div className="lcd-status"><span>Next step</span><span>● Open to roles</span></div>
        <div className="signoff-body">
          <div>
            <h2>Have a role or project in mind?</h2>
            <p>I'm open to software engineering, human factors, UX research, and product design roles. Feel free to reach out if you think we’d be a good fit.</p>
          </div>
          <div className="signoff-actions">
            <button className="start-button" onClick={()=>onOpen('contact')}>▶ Get in touch</button>
            {current !== 'work' && <button className="start-button ghost" onClick={()=>onOpen('work')}>See case studies →</button>}
          </div>
        </div>
      </div>
      <div className="signoff-foot"><span>© 2026 Rapheal Suber</span><span>Designed and built by me.</span></div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, CaseStudies, Footer, PrimaryBtn, CHANNELS });
