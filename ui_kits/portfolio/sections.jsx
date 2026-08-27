/* ============================================================
   Portfolio — Nav, Kiosk hero, Case Studies, Footer.
   The home screen is a console: four channels, one per section.
   ============================================================ */
const { useState: useStateS, useEffect: useEffectS } = React;

/* ---- Hero ---- */
function Hero({ onOpen }) {
  return <KioskHero onOpen={onOpen} />;
}

/* ---- Kiosk constellation console: the choose-your-path hero ---- */
const KIOSK_NODES = [
  { id:'work',      n:'01', label:'Case Studies', x:28, y:22, sz:100, coord:'28.0 / 22.0', g:['#C98A63','#A6603C','#7E472A'], glow:'rgba(201,138,99,0.55)' },
  { id:'currently', n:'02', label:'Currently',    x:68, y:40, sz:82,  coord:'68.0 / 40.0', g:['#7FA189','#4E6B58','#33513F'], glow:'rgba(127,161,137,0.5)' },
  { id:'about',     n:'03', label:'About',        x:24, y:64, sz:72,  coord:'24.0 / 64.0', g:['#D9C9B4','#B7A282','#8C7B5E'], glow:'rgba(217,201,180,0.42)' },
  { id:'contact',   n:'04', label:'Contact',      x:62, y:80, sz:66,  coord:'62.0 / 80.0', g:['#C98A63','#8C6B8A','#7FA189'], glow:'rgba(201,138,99,0.42)' },
];

function KioskHero({ onOpen }) {
  const fieldRef = React.useRef(null);
  const wiresRef = React.useRef(null);
  const ambientRef = React.useRef(null);
  const [active, setActive] = useStateS(null);
  const [clock, setClock] = useStateS('--:--:--');

  useEffectS(() => {
    const id = setInterval(() => {
      const t = new Date();
      setClock([t.getHours(), t.getMinutes(), t.getSeconds()].map((x)=>String(x).padStart(2,'0')).join(':'));
    }, 1000);
    return () => clearInterval(id);
  }, []);

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
        l.setAttribute('stroke','currentColor'); l.setAttribute('stroke-width','1');
        l.setAttribute('stroke-dasharray','2 8'); l.setAttribute('stroke-linecap','round');
        wires.appendChild(l);
      }
    };
    draw(); addEventListener('resize', draw);
    return () => removeEventListener('resize', draw);
  }, []);

  useEffectS(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const amb = ambientRef.current;
    // Full-viewport gradient repaint — coalesce to one write per frame.
    let raf = 0, px = 0, py = 0;
    const paint = () => {
      raf = 0;
      if (amb) amb.style.background = `radial-gradient(480px circle at ${px}px ${py}px, rgba(201,138,99,0.14), rgba(127,161,137,0.05) 42%, transparent 64%)`;
    };
    const move = (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    addEventListener('mousemove', move, { passive:true });
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); };
  }, []);

  return (
    <section className="k-hero" style={{ position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden', isolation:'isolate',
      background:'var(--k-bg)', color:'var(--k-fg)' }}>
      <style>{`
        /* Hero-local palette so the console reads correctly in both themes. */
        .k-hero{ --k-bg:#0B0906; --k-fg:#F0ECE3; --k-dim:rgba(240,236,227,0.56);
          --k-faint:rgba(240,236,227,0.40); --k-ghost:rgba(240,236,227,0.30);
          --k-line:rgba(240,236,227,0.20); --k-hair:rgba(240,236,227,0.14);
          --k-vig:rgba(0,0,0,0.72); --k-scan:rgba(0,0,0,0.06); --k-aur:0.9; }
        [data-theme="light"] .k-hero{ --k-bg:#F0ECE3; --k-fg:#17140F; --k-dim:rgba(23,20,15,0.62);
          --k-faint:rgba(23,20,15,0.48); --k-ghost:rgba(23,20,15,0.38);
          --k-line:rgba(23,20,15,0.24); --k-hair:rgba(23,20,15,0.16);
          --k-vig:rgba(23,20,15,0.14); --k-scan:rgba(23,20,15,0.035); --k-aur:0.5; }
        @keyframes kSpin{ to{ transform:rotate(360deg); } }
        @keyframes kPulse{ 0%,100%{ transform:scale(1);} 50%{ transform:scale(1.12);} }
        @keyframes kBlink{ 0%,100%{opacity:0.3;} 50%{opacity:1;} }
        @keyframes kDrift1{ 0%,100%{ transform:translate(0,0) scale(1);} 50%{ transform:translate(-12%,10%) scale(1.25);} }
        @keyframes kDrift2{ 0%,100%{ transform:translate(0,0) scale(1.1);} 50%{ transform:translate(14%,-12%) scale(0.85);} }
        @keyframes kDrift3{ 0%,100%{ transform:translate(0,0) scale(0.9);} 50%{ transform:translate(10%,14%) scale(1.3);} }
        /* Channel orb: dense volumetric glass, not a glossy plastic ball.
           Light reads as a rim from behind-right; the specular is a whisper.
           A slow instrument ring turns around it like a dial. */
        .k-orb{ position:relative; border-radius:50%; display:grid; place-items:center;
          transition:transform .75s cubic-bezier(0.19,1,0.22,1), filter .6s var(--ease-soft); }
        .k-orb .ball{ position:absolute; inset:0; border-radius:50%; overflow:hidden; isolation:isolate; }
        .k-orb .ball::before{ content:''; position:absolute; inset:-55%;
          background:conic-gradient(from 0deg, var(--g1), var(--g2), var(--g3), var(--g2), var(--g1));
          filter:blur(11px) saturate(1.12); animation:kSpin 26s linear infinite; will-change:transform; }
        .k-orb .ball::after{ content:''; position:absolute; inset:0; border-radius:50%;
          background:radial-gradient(72% 72% at 50% 122%, rgba(0,0,0,0.62), transparent 58%); }
        .k-orb .shell{ position:absolute; inset:0; border-radius:50%; z-index:2;
          background:radial-gradient(110% 110% at 58% 100%, rgba(0,0,0,0.42), rgba(0,0,0,0.06) 44%, transparent 60%),
                     radial-gradient(38% 34% at 33% 24%, rgba(255,255,255,0.14), transparent 66%);
          box-shadow: inset -2px -3px 7px rgba(255,255,255,0.20),
                      inset -10px -14px 30px rgba(255,255,255,0.05),
                      inset 10px 12px 38px rgba(0,0,0,0.42),
                      inset 0 0 0 1px rgba(240,236,227,0.10); }
        .k-orb .grain{ position:absolute; inset:0; border-radius:50%; z-index:3; opacity:0.13; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E");
          background-size:120px 120px; }
        .k-orb .ring{ position:absolute; inset:-26%; border-radius:50%; z-index:1; pointer-events:none;
          border:1px solid rgba(240,236,227,0.055);
          border-top-color:var(--glow); border-right-color:rgba(240,236,227,0.13);
          animation:kSpin 30s linear infinite; will-change:transform;
          transition:opacity .6s ease; opacity:0.75; }
        .k-orb .halo{ position:absolute; inset:-52%; border-radius:50%; z-index:-1; opacity:0.28; transition:opacity .6s ease;
          background:radial-gradient(closest-side, var(--glow), transparent 72%); animation:kPulse 6s ease-in-out infinite; will-change:transform; }
        .k-node:hover .k-orb{ transform:scale(1.1); filter:saturate(1.08) brightness(1.05); }
        .k-node:hover .k-orb .halo{ opacity:0.85; }
        .k-node:hover .k-orb .ring{ opacity:1; animation-duration:12s; }
        .k-node:hover .k-lab{ color:#C98A63 !important; }
        .k-node .k-lab, .k-node .k-meta{ transition:color .45s var(--ease-soft), transform .6s cubic-bezier(0.19,1,0.22,1); }
        .k-node:hover .k-lab, .k-node:hover .k-meta{ transform:translateX(5px); }
        .k-aur span{ filter:blur(46px); will-change:transform; }
        .k-mob{ display:none; }
        @media (prefers-reduced-motion: reduce){ .k-orb .ball::before,.k-orb .ball::after,.k-orb .glint,.k-orb .halo,.k-aur span{ animation:none !important; } }
        @media (max-width:920px){
          .k-field{ display:none !important; }
          .k-id{ position:relative !important; top:auto !important; transform:none !important; max-width:none !important;
            padding:clamp(3rem,8vh,5rem) var(--gutter) 4rem; }
          .k-mob{ display:block; margin-top:2.4rem; }
        }
      `}</style>

      {/* aggressive aurora — blur per blob, see .k-aur span in the style block */}
      <div className="k-aur" aria-hidden="true" style={{ position:'absolute', inset:'-20%', zIndex:0, pointerEvents:'none', opacity:'var(--k-aur)' }}>
        <span style={{ position:'absolute', width:'60vw', height:'60vw', left:'34%', top:'-8%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(166,96,60,0.85), transparent 70%)', animation:'kDrift1 18s ease-in-out infinite' }} />
        <span style={{ position:'absolute', width:'52vw', height:'52vw', left:'50%', top:'34%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(51,81,63,0.90), transparent 70%)', animation:'kDrift2 22s ease-in-out infinite' }} />
        <span style={{ position:'absolute', width:'40vw', height:'40vw', left:'20%', top:'40%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(201,138,99,0.60), transparent 70%)', animation:'kDrift3 26s ease-in-out infinite' }} />
      </div>
      <div ref={ambientRef} aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(140% 120% at 60% 45%, transparent 44%, var(--k-vig) 100%)' }} />
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none', background:'repeating-linear-gradient(0deg, transparent 0 3px, var(--k-scan) 3px 4px)' }} />

      {/* corner telemetry */}
      <div style={{ position:'absolute', top:'clamp(1.5rem,3.5vh,2.5rem)', left:'var(--gutter)', zIndex:6, fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--k-faint)', lineHeight:1.8 }}>
        RS · SELECT PATH<br/>CH {active ? active.n : '00'} / {active ? active.label.toUpperCase() : 'STANDBY'}
      </div>
      <div style={{ position:'absolute', top:'clamp(1.5rem,3.5vh,2.5rem)', right:'var(--gutter)', zIndex:6, textAlign:'right', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--k-faint)', lineHeight:1.8 }}>
        EST. 2026
      </div>
      <div style={{ position:'absolute', bottom:'clamp(1.6rem,4vh,2rem)', right:'var(--gutter)', zIndex:6, fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.22em', color:'var(--k-ghost)' }}>{clock}</div>

      {/* identity */}
      <div className="k-id" style={{ position:'absolute', zIndex:4, left:'var(--gutter)', top:'50%', transform:'translateY(-50%)', maxWidth:'clamp(320px, 36vw, 440px)' }}>
        <Reveal as="div" delay={40} style={{ display:'flex', alignItems:'center', gap:'10px', fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'0.32em', textTransform:'uppercase', color:'#C98A63', marginBottom:'22px' }}>
          <span style={{ width:24, height:1, background:'#C98A63' }} /> Portfolio — Select a channel
        </Reveal>
        <Reveal delay={120}>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'clamp(2.6rem,6.4vw,5rem)', lineHeight:0.92, letterSpacing:'-0.025em', textTransform:'uppercase', margin:0 }}>
            Rapheal<br/><b style={{ fontWeight:600 }}>Suber</b>
          </h1>
        </Reveal>
        <Reveal as="p" delay={220} style={{ marginTop:'26px', fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--k-dim)', lineHeight:1.9 }}>
          Human Factors · Human-AI Interaction · UX Research
        </Reveal>
        <Reveal as="p" delay={320} style={{ marginTop:'22px', maxWidth:'44ch', fontFamily:'var(--font-body)', fontSize:'var(--text-body)', lineHeight:1.6, color:'var(--k-dim)' }}>
          Human Factors Psychology student with experience across human-AI interaction, evaluation methodology, user research, and technical systems. Designing and evaluating technology where human capability and system complexity meet.
        </Reveal>

        {/* mobile channel list — the constellation field is desktop-only */}
        <div className="k-mob">
          {KIOSK_NODES.map((d) => (
            <a key={d.id} href="#" onClick={(e)=>{ e.preventDefault(); onOpen(d.id, d.glow); }}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem',
                padding:'1rem 0', borderTop:'1px solid var(--k-hair)', textDecoration:'none' }}>
              <span style={{ display:'flex', alignItems:'baseline', gap:'0.9rem' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.2em', color:'var(--k-faint)' }}>CH {d.n}</span>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:500, fontSize:'1.15rem', color:'var(--k-fg)' }}>{d.label}</span>
              </span>
              <span aria-hidden="true" style={{ fontFamily:'var(--font-mono)', color:'#C98A63' }}>→</span>
            </a>
          ))}
        </div>
      </div>

      {/* constellation field */}
      <div ref={fieldRef} className="k-field" style={{ position:'absolute', zIndex:3, left:'clamp(400px, 44vw, 560px)', right:0, top:0, height:'100%' }}>
        <svg ref={wiresRef} style={{ position:'absolute', inset:0, zIndex:2, overflow:'visible', pointerEvents:'none', color:'var(--k-line)' }}></svg>
        {KIOSK_NODES.map((d) => (
          <a key={d.id} href="#" className="k-node"
            onClick={(e)=>{ e.preventDefault(); onOpen(d.id, d.glow); }}
            onMouseEnter={()=>setActive(d)} onMouseLeave={()=>setActive(null)}
            style={{ position:'absolute', zIndex:4, left:d.x+'%', top:d.y+'%', transform:'translate(-50%,-50%)', textDecoration:'none' }}>
            <div className="k-orb" style={{ width:d.sz, height:d.sz, '--g1':d.g[0], '--g2':d.g[1], '--g3':d.g[2], '--glow':d.glow }}>
              <div className="ball"></div><div className="shell"></div><div className="grain"></div><div className="ring"></div><div className="halo"></div>
            </div>
            <div style={{ position:'absolute', left:'calc(100% + 38px)', top:'50%', transform:'translateY(-50%)', whiteSpace:'nowrap', zIndex:10 }}>
              <div className="k-meta" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'0.14em', color:'var(--k-dim)' }}>CH {d.n}</div>
              <div className="k-lab" style={{ fontFamily:'var(--font-display)', fontWeight:500, fontSize:'1.05rem', letterSpacing:'-0.01em', color:'var(--k-fg)', marginTop:'2px' }}>{d.label}</div>
              <div className="k-meta" style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.2em', color:'var(--k-ghost)', marginTop:'3px' }}>◇ {d.coord}</div>
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
        borderRadius:'var(--radius-sm)', padding:'0.75rem 1.4rem',
        transition:'background var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
      {children}
    </button>
  );
}

/* ---- Case Studies ---- */
function CaseStudies({ items, onOpen, embedded }) {
  return (
    <section id="work" style={{ padding: embedded ? 0 : 'clamp(4rem,8vw,7rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
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
      <span style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.7rem', alignSelf:'start', paddingTop:'0.35rem' }}>
        <Sphere size={38} style={{ transform: h ? 'scale(1.16)' : 'none', filter: h ? 'brightness(1.06)' : 'none',
          transition:'transform 0.7s cubic-bezier(0.19,1,0.22,1), filter 0.5s var(--ease-soft)', willChange:'transform' }} />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          color: h ? 'var(--accent)' : 'var(--text-faint)', transition:'color var(--dur-2) var(--ease-soft)' }}>{item.code}</span>
      </span>
      <span style={{ minWidth:0 }}>
        <span style={{ display:'block', fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h2)',
          letterSpacing:'var(--track-tight)', color:'var(--text-strong)', marginBottom:'0.5rem' }}>{item.title}</span>
        <span style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', maxWidth:'62ch' }}>{item.blurb}</span>
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

/* ---- Footer: the closing CTA under the case-study list ---- */
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

Object.assign(window, { Hero, CaseStudies, Footer, PrimaryBtn });
