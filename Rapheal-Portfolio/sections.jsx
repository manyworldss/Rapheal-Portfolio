/* ============================================================
   Portfolio, Nav, Hero, Case Studies, Footer.
   Apple / Linear / Stripe register: monochrome, 1px borders,
   heavy whitespace, one restrained signal accent.
   ============================================================ */
const { useState: useStateS, useEffect: useEffectS } = React;

/* ---- Nav ---- */
function Nav({ onOpen, reading, onToggleReading, onHome, view }) {
  const COLORS = { work:'rgba(126,200,240,0.55)', science:'rgba(99,198,190,0.5)', art:'rgba(142,147,216,0.46)', about:'rgba(168,220,247,0.42)', contact:'rgba(126,200,240,0.42)' };
  const links = [
    { l: 'Case Studies', id: 'work' },
    { l: 'Science', id: 'science' },
    { l: 'Art', id: 'art' },
    { l: 'About', id: 'about' },
    { l: 'Contact', id: 'contact' },
  ];
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const isHome = view === 'home';

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:800,
      display:'flex', alignItems:'center', justifyContent: isHome ? 'flex-end' : 'space-between',
      height:'var(--topbar-h)', padding:'0 var(--gutter)',
      background: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `var(--hair) solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition:'background var(--dur-3) var(--ease-soft), border-color var(--dur-3) var(--ease-soft)' }}>
      {!isHome && (
        <a href="#top" onClick={(e)=>{e.preventDefault(); onHome ? onHome() : scrollTo({top:0,behavior:'smooth'});}}
          style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontFamily:'var(--font-mono)', fontWeight:'var(--fw-medium)',
          fontSize:'var(--text-sm)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)' }}>
          Rapheal Suber
        </a>
      )}
      <nav style={{ display:'flex', alignItems:'center', gap:'clamp(0.6rem,2vw,1.6rem)', overflowX:'auto', maxWidth:'100%', WebkitOverflowScrolling:'touch', scrollbarWidth:'none' }}>
        {!isHome && links.map((it) => <NavLink key={it.id} label={it.l} active={view===it.id} onClick={()=>onOpen(it.id, COLORS[it.id])} />)}
        <ThemeToggle />
      </nav>
    </header>
  );
}
function NavLink({ label, onClick, active }) {
  const [h, setH] = useStateS(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
        whiteSpace:'nowrap', color: (h||active) ? 'var(--text-strong)' : 'var(--text-muted)', transition:'color var(--dur-2) var(--ease-soft)' }}>
      {label}
    </button>
  );
}
function ThemeToggle() {
  const [dark, setDark] = useStateS(() => (document.documentElement.dataset.theme || 'dark') === 'dark');
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('rs-theme', next ? 'dark' : 'light'); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{ display:'inline-flex', alignItems:'center', gap:'0.45rem', flexShrink:0,
        fontFamily:'var(--font-mono)', fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase',
        padding:'0.4rem 0.85rem', borderRadius:'var(--radius-pill)',
        border:'1px solid var(--border-strong)', background:'var(--bg-raised)',
        color:'var(--text-strong)', cursor:'pointer', transition:'all 0.2s ease',
        boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
      <span style={{ color:'var(--accent)', fontSize:'0.85rem' }}>{dark ? '☀️' : '🌙'}</span>
      <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
}

/* ---- Hero ---- */
function Hero({ onOpen }) {
  return <KioskHero onOpen={onOpen} />;
}

/* ---- Kiosk constellation console: the choose-your-path hero ---- */
const KIOSK_NODES = [
  { id:'work',    n:'01', label:'Case Studies', x:33, y:22, sz:108, coord:'33.2 / 22.0', g:['#A8DCF7','#7EC8F0','#2E6C97'], glow:'rgba(126,200,240,0.55)' },
  { id:'science', n:'02', label:'Science',      x:65, y:38, sz:88,  coord:'65.0 / 38.5', g:['#9BDCD6','#63C6BE','#12333A'], glow:'rgba(99,198,190,0.5)' },
  { id:'art',     n:'03', label:'Art',         x:44, y:56, sz:78,  coord:'44.0 / 56.0', g:['#C8CBF2','#8E93D8','#1B2340'], glow:'rgba(142,147,216,0.46)' },
  { id:'about',   n:'04', label:'About',       x:24, y:70, sz:72,  coord:'24.5 / 70.0', g:['#DDF1FC','#A8DCF7','#5A8FB0'], glow:'rgba(168,220,247,0.42)' },
  { id:'contact', n:'05', label:'Contact',     x:70, y:76, sz:64,  coord:'70.0 / 76.0', g:['#A8DCF7','#63C6BE','#2E6C97'], glow:'rgba(126,200,240,0.42)' },
];

function KioskHero({ onOpen }) {
  const fieldRef = React.useRef(null);
  const wiresRef = React.useRef(null);
  const ambientRef = React.useRef(null);
  const [active, setActive] = useStateS(null);

  useEffectS(() => {
    const field = fieldRef.current, wires = wiresRef.current;
    if (!field || !wires) return;
    const draw = () => {
      const w = field.clientWidth, h = field.clientHeight;
      wires.innerHTML = '';
      for (let i=0;i<KIOSK_NODES.length-1;i++){
        const a=KIOSK_NODES[i], b=KIOSK_NODES[i+1];
        const l=document.createElementNS('http://www.w3.org/2000/svg','line');
        l.setAttribute('x1',a.x/100*w); l.setAttribute('y1',a.y/100*h);
        l.setAttribute('x2',b.x/100*w); l.setAttribute('y2',b.y/100*h);
        l.setAttribute('stroke','rgba(240,236,227,0.13)'); l.setAttribute('stroke-width','1');
        wires.appendChild(l);
      }
    };
    draw(); addEventListener('resize', draw);
    return () => removeEventListener('resize', draw);
  }, []);

  useEffectS(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const amb = ambientRef.current;
    const move = (e) => {
      if (amb) amb.style.background = `radial-gradient(480px circle at ${e.clientX}px ${e.clientY}px, rgba(126,200,240,0.16), rgba(99,198,190,0.06) 42%, transparent 64%)`;
    };
    addEventListener('mousemove', move, { passive:true });
    return () => removeEventListener('mousemove', move);
  }, []);

  return (
    <section style={{ position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden', isolation:'isolate',
      background:'transparent', color:'var(--text-strong)' }}>
      <style>{`
        @keyframes kSpin{ to{ transform:rotate(360deg); } }
        @keyframes kPulse{ 0%,100%{ transform:scale(1);} 50%{ transform:scale(1.12);} }
        @keyframes kBlink{ 0%,100%{opacity:0.3;} 50%{opacity:1;} }
        .k-orb{ position:relative; border-radius:50%; display:grid; place-items:center; transition:transform .5s cubic-bezier(0.16,1,0.3,1), filter .4s ease; }
        .k-orb .ball{ position:absolute; inset:0; border-radius:50%; overflow:hidden; isolation:isolate; }
        .k-orb .ball::before{ content:''; position:absolute; inset:-55%; background:conic-gradient(from 0deg, var(--g1), var(--g2), var(--g3), var(--g2), var(--g1)); filter:blur(9px) contrast(1.3); animation:kSpin 11s linear infinite; }
        .k-orb .ball::after{ content:''; position:absolute; inset:-30%; mix-blend-mode:screen; opacity:0.8; background:radial-gradient(38% 42% at 60% 34%, var(--g3), transparent 60%), radial-gradient(34% 36% at 32% 70%, var(--g1), transparent 62%); filter:blur(7px); animation:kSpin 8s linear infinite reverse; }
        .k-orb .shell{ position:absolute; inset:0; border-radius:50%; z-index:2; background:radial-gradient(132% 132% at 66% 84%, rgba(0,0,0,0.66), rgba(0,0,0,0.12) 44%, transparent 60%), radial-gradient(60% 55% at 30% 24%, rgba(255,255,255,0.82), rgba(255,255,255,0.08) 40%, transparent 56%); box-shadow: inset 0 2px 10px rgba(255,255,255,0.28), inset 0 -18px 36px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06); }
        .k-orb .glint{ position:absolute; inset:6%; border-radius:50%; z-index:3; background:conic-gradient(from 210deg, transparent 0 62%, rgba(255,255,255,0.5) 74%, transparent 82% 100%); mix-blend-mode:screen; filter:blur(3px); animation:kSpin 9s linear infinite; opacity:0.7; }
        .k-orb .halo{ position:absolute; inset:-52%; border-radius:50%; z-index:-1; opacity:0.35; transition:opacity .45s ease; background:radial-gradient(closest-side, var(--glow), transparent 72%); animation:kPulse 4.5s ease-in-out infinite; }
        .k-node:hover .k-orb{ transform:scale(1.18); filter:saturate(1.2) brightness(1.08); }
        .k-node:hover .k-orb .halo{ opacity:1; }
        .k-node:hover .k-lab{ color:var(--accent) !important; }
        .k-mob-card:hover { transform:translateY(-2px); border-color:var(--accent-line) !important; background:var(--bg-raised) !important; }
        @media (prefers-reduced-motion: reduce){ .k-orb .ball::before,.k-orb .ball::after,.k-orb .glint,.k-orb .halo{ animation:none !important; } }
        @media (max-width:820px){
          .k-field{ display:none !important; }
          .k-id{ position:relative !important; top:auto !important; transform:none !important; padding-top:calc(var(--topbar-h) + 1.5rem) !important; padding-bottom:3rem !important; max-width:none !important; }
          .k-mobile-menu{ display:flex !important; }
        }
      `}</style>

      <div ref={ambientRef} aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(140% 120% at 60% 45%, transparent 46%, var(--hero-vig) 100%)' }} />

      {/* top telemetry readout */}
      <div style={{ position:'absolute', top:'calc(var(--topbar-h) + 0.75rem)', left:'var(--gutter)', zIndex:6, fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--text-faint)', lineHeight:1.8 }}>
        SELECT PATH · CH {active ? active.n : '00'} / {active ? active.label.toUpperCase() : 'STANDBY'}
      </div>

      {/* identity */}
      <div className="k-id" style={{ position:'absolute', zIndex:4, left:'var(--gutter)', right:'var(--gutter)', top:'50%', transform:'translateY(-50%)', maxWidth:'min(46vw,520px)' }}>
        <Reveal delay={120}>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'clamp(2.6rem,6.4vw,5rem)', lineHeight:0.92, letterSpacing:'-0.025em', textTransform:'uppercase', margin:0 }}>
            Rapheal<br/><b style={{ fontWeight:600 }}>Suber</b>
          </h1>
        </Reveal>
        <Reveal as="p" delay={220} style={{ marginTop:'22px', fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)', lineHeight:1.9 }}>
          Human Factors Psychology<br/>AI Reliability · Systems Thinking
        </Reveal>

        {/* Mobile Channels Grid */}
        <div className="k-mobile-menu" style={{ display:'none', marginTop:'28px', width:'100%', flexDirection:'column', gap:'10px' }}>
          {KIOSK_NODES.map((d) => (
            <button key={d.id} data-hot onClick={(e)=>{ e.preventDefault(); onOpen(d.id, d.glow); }}
              className="k-mob-card"
              style={{ display:'flex', alignItems:'center', gap:'14px', width:'100%', padding:'12px 16px',
                borderRadius:'var(--radius-md, 12px)', border:'1px solid var(--border-strong)',
                background:'var(--bg-raised)', color:'var(--text-strong)', textAlign:'left',
                cursor:'pointer', transition:'all 0.25s ease' }}>
              <div className="k-orb" style={{ width:38, height:38, flexShrink:0, '--g1':d.g[0], '--g2':d.g[1], '--g3':d.g[2], '--glow':d.glow }}>
                <div className="ball"></div><div className="shell"></div><div className="glint"></div>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.14em', color:'var(--accent)', textTransform:'uppercase' }}>CH {d.n}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:'1.05rem', color:'var(--text-strong)' }}>{d.label}</div>
              </div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text-faint)' }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* constellation field */}
      <div ref={fieldRef} className="k-field" style={{ position:'absolute', zIndex:3, right:0, top:0, width:'56vw', height:'100%' }}>
        <svg ref={wiresRef} style={{ position:'absolute', inset:0, zIndex:2, overflow:'visible', pointerEvents:'none' }}></svg>
        {KIOSK_NODES.map((d) => (
          <a key={d.id} href="#" className="k-node"
            onClick={(e)=>{ e.preventDefault(); onOpen(d.id, d.glow); }}
            onMouseEnter={()=>setActive(d)} onMouseLeave={()=>setActive(null)}
            style={{ position:'absolute', zIndex:4, left:d.x+'%', top:d.y+'%', transform:'translate(-50%,-50%)', textDecoration:'none' }}>
            <div className="k-orb" style={{ width:d.sz, height:d.sz, '--g1':d.g[0], '--g2':d.g[1], '--g3':d.g[2], '--glow':d.glow }}>
              <div className="ball"></div><div className="shell"></div><div className="glint"></div><div className="halo"></div>
            </div>
            <div style={{ position:'absolute', left:'calc(100% + 14px)', top:'50%', transform:'translateY(-50%)', whiteSpace:'nowrap' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.14em', color:'var(--text-muted)' }}>CH {d.n}</div>
              <div className="k-lab" style={{ fontFamily:'var(--font-display)', fontWeight:500, fontSize:'1.05rem', letterSpacing:'-0.01em', color:'var(--text-strong)', marginTop:'2px', transition:'color .3s ease' }}>{d.label}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.2em', color:'var(--text-faint)', marginTop:'3px' }}>◇ {d.coord}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PrimaryBtn({ children, onClick }) {
  const [h, setH] = useStateS(false);
  const ref = useMagnetic(0.26);
  return (
    <button ref={ref} data-hot onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
        color:'var(--text-on-inverse)', background: h ? 'var(--text)' : 'var(--text-strong)',
        borderRadius:'var(--radius-pill)', padding:'0.75rem 1.4rem',
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
        border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)', padding:'0.75rem 1.4rem',
        transition:'background var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
      {children}
    </button>
  );
}

/* ---- Case Studies: mission-patch dossier grid ---- */
const MISSION_G = {
  reach:      ['#C8CBF2','#8E93D8','#1B2340'],
  celio:      ['#A8DCF7','#7EC8F0','#2E6C97'],
  materialsiq:['#9BDCD6','#63C6BE','#12333A'],
  prox:       ['#DDF1FC','#A8DCF7','#5A8FB0'],
};

function CaseStudies({ items, onOpen, embedded }) {
  return (
    <section id="work" style={{ padding: embedded ? 0 : 'clamp(4rem,8vw,7rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
      <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem',
        borderBottom:'var(--hair) solid var(--border)', paddingBottom:'1.4rem', marginBottom:'clamp(2rem,4vw,3rem)' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
            textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.7rem' }}>Mission log</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
            letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0 }}>Case Studies</h2>
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--text-faint)' }}>{String(items.length).padStart(2,'0')} on file</span>
      </Reveal>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'clamp(1rem,2vw,1.5rem)' }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i*80}>
            <MissionCard item={it} onOpen={() => onOpen(it.id)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MissionCard({ item, onOpen }) {
  const [h, setH] = useStateS(false);
  const g = MISSION_G[item.id] || MISSION_G.celio;
  const imageSrc = item.thumb || item.hero;

  return (
    <button data-hot onClick={onOpen} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      className="rs-mc" style={{ position:'relative', width:'100%', height:'100%', textAlign:'left', overflow:'hidden',
        display:'flex', flexDirection:'column', gap:'1.2rem', cursor:'pointer',
        padding:'clamp(1.4rem,2.2vw,1.9rem)', border:`var(--hair) solid ${h ? 'var(--accent-line)' : 'var(--border)'}`,
        borderRadius:'var(--radius-md)', background: h ? 'var(--bg-inset)' : 'var(--bg-raised)',
        transform: h ? 'translateY(-3px)' : 'none',
        transition:'background var(--dur-2) var(--ease-soft), border-color var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
      
      {/* patch glow bleed */}
      <span aria-hidden="true" style={{ position:'absolute', top:-70, right:-70, width:220, height:220, borderRadius:'50%',
        background:`radial-gradient(closest-side, ${g[1]}, transparent 70%)`, opacity: h ? 0.20 : 0.09,
        filter:'blur(26px)', transition:'opacity var(--dur-3) var(--ease-out)', pointerEvents:'none' }} />

      {/* patch + code */}
      <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
        <span className="rs-patch" style={{ '--p1':g[0], '--p2':g[1], '--p3':g[2],
          width: h ? 62 : 56, height: h ? 62 : 56, transition:'all var(--dur-3) var(--ease-out)' }}>
          <span className="rs-patch-core" /><span className="rs-patch-ring" />
        </span>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.3rem' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
            color: h ? 'var(--accent)' : 'var(--text-faint)', transition:'color var(--dur-2) var(--ease-soft)' }}>{item.code}</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--text-faint)' }}>{item.domain}</span>
        </div>
      </div>

      {/* title + summary */}
      <div style={{ position:'relative', display:'block', flex:1 }}>
        <h3 style={{ display:'block', fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h3)',
          letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:'0 0 0.6rem 0' }}>{item.title}</h3>
        <p style={{ display:'block', fontSize:'var(--text-sm)', lineHeight:'var(--leading-sm)', color:'var(--text-muted)', margin:0 }}>{item.summary || item.blurb}</p>
      </div>

      {/* tags & primary CTA */}
      <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem',
        borderTop:'var(--hair) solid var(--border)', paddingTop:'0.9rem' }}>
        <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
          {(item.tags || item.disciplines || []).slice(0,3).map((d)=>(
            <span key={d} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
              textTransform:'uppercase', color:'var(--text-muted)', background:'var(--bg-inset)', padding:'0.2rem 0.5rem', borderRadius:'var(--radius-pill)', border:'1px solid var(--border)' }}>{d}</span>
          ))}
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', textTransform:'uppercase', letterSpacing:'0.06em',
          color: h ? 'var(--accent)' : 'var(--text-muted)', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'0.25rem', transition:'color 0.2s ease' }}>
          Full Case Study <span style={{ transform: h ? 'translateX(3px) translateY(-1px)' : 'none', transition:'transform 0.2s ease' }}>↗</span>
        </span>
      </div>
      <style>{`
        .rs-patch{ position:relative; border-radius:50%; flex:none; display:block; }
        .rs-patch-core{ position:absolute; inset:0; border-radius:50%; overflow:hidden;
          background:conic-gradient(from 0deg, var(--p1), var(--p2), var(--p3), var(--p2), var(--p1));
          box-shadow: inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -12px 22px rgba(0,0,0,0.55);
          animation:rsPatch 22s linear infinite; }
        .rs-patch-core::after{ content:''; position:absolute; inset:0; border-radius:50%;
          background:radial-gradient(56% 52% at 32% 26%, rgba(255,255,255,0.6), transparent 54%); }
        .rs-patch-ring{ position:absolute; inset:-7px; border-radius:50%; border:1px solid var(--border-strong); }
        @keyframes rsPatch{ to{ transform:rotate(360deg); } }
        @media (prefers-reduced-motion: reduce){ .rs-patch-core{ animation:none; } }
      `}</style>
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
            {[['LinkedIn','https://www.linkedin.com/in/raphealsuber/'],['GitHub','https://github.com/manyworldss'],['Email','mailto:raphealsuber@gmail.com']].map(([l,h])=>(
              <a key={l} data-hot href={h} target="_blank" rel="noopener" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-muted)' }}>{l}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, CaseStudies, Footer });
