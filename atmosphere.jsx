/* ============================================================
   Editorial Archive v2 — atmospheric break, marquee, footer.
   ============================================================ */
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ---- Marquee band ---- */
function Marquee({ children, speed = 44, onDark = false }) {
  const id = 'mq' + React.useId().replace(/[:]/g, '');
  return (
    <div className={id} style={{ display:'flex', overflow:'hidden', width:'100%', whiteSpace:'nowrap',
      userSelect:'none', color:onDark?'var(--on-dark)':'var(--text-strong)',
      WebkitMaskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
      maskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
      <style>{`
        @keyframes ${id}m{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .${id} .${id}t{display:flex;flex:none;align-items:center;animation:${id}m ${speed}s linear infinite}
        .${id}:hover .${id}t{animation-play-state:paused}
        @media (prefers-reduced-motion: reduce){.${id} .${id}t{animation:none}}
      `}</style>
      {[0,1].map((t)=>(
        <div className={id+'t'} key={t} aria-hidden={t===1}>
          {Array.from({length:5}).map((_,i)=>(
            <span key={i} style={{ display:'inline-flex', alignItems:'center', fontFamily:'var(--font-display)',
              fontWeight:'var(--fw-display)', fontSize:'var(--text-display)', letterSpacing:'var(--track-display)', lineHeight:1 }}>
              <span style={{ padding:'0 0.4em' }}>{children}</span>
              <span aria-hidden="true" style={{ padding:'0 0.4em', color:'var(--accent)' }}>—</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---- Atmospheric field-note break ---- */
function FieldNote({ image }) {
  const id = 'fn' + Math.random().toString(36).slice(2, 7);
  const [ref, shown] = useReveal();
  return (
    <section ref={ref} style={{ position:'relative', minHeight:'92vh', overflow:'hidden', isolation:'isolate',
      display:'flex', alignItems:'center', background:'var(--obsidian)', color:'var(--on-dark)' }}>
      {image && <img src={image} alt="" aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%',
        objectFit:'cover', opacity: shown?0.40:0.2, filter:'grayscale(20%) contrast(1.02)', zIndex:-2,
        transform: shown?'scale(1)':'scale(1.08)', transition:'opacity var(--dur-5) var(--ease-out), transform 1600ms var(--ease-out)' }} />}
      <style>{`
        @keyframes ${id}A{0%{transform:translate(0,0) scale(1)}33%{transform:translate(30%,18%) scale(1.45)}66%{transform:translate(12%,36%) scale(0.82)}100%{transform:translate(0,0) scale(1)}}
        @keyframes ${id}B{0%{transform:translate(0,0) scale(1.12)}50%{transform:translate(-34%,-22%) scale(0.72)}100%{transform:translate(0,0) scale(1.12)}}
        @keyframes ${id}C{0%{transform:translate(0,0) scale(0.85)}40%{transform:translate(26%,-30%) scale(1.4)}80%{transform:translate(-20%,16%) scale(1.05)}100%{transform:translate(0,0) scale(0.85)}}
        @media (prefers-reduced-motion: reduce){.${id}A,.${id}B,.${id}C{animation:none!important}}
      `}</style>
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:-1, overflow:'hidden', pointerEvents:'none' }}>
        <div className={id+'A'} style={{ position:'absolute', top:'-2%', left:'2%', width:'56vw', height:'56vw',
          background:'radial-gradient(circle, rgba(201,138,99,0.46), transparent 60%)', borderRadius:'999px',
          willChange:'transform', animation:`${id}A 13s ease-in-out infinite` }} />
        <div className={id+'B'} style={{ position:'absolute', bottom:'-6%', right:'4%', width:'52vw', height:'52vw',
          background:'radial-gradient(circle, rgba(110,144,126,0.50), transparent 62%)', borderRadius:'999px',
          willChange:'transform', animation:`${id}B 16s ease-in-out infinite` }} />
        <div className={id+'C'} style={{ position:'absolute', top:'26%', left:'46%', width:'40vw', height:'40vw',
          background:'radial-gradient(circle, rgba(255,196,150,0.16), transparent 64%)', borderRadius:'999px',
          willChange:'transform', animation:`${id}C 19s ease-in-out infinite` }} />
      </div>
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(130% 110% at 50% 0%, transparent 60%, rgba(0,0,0,0.32) 100%)' }} />
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', opacity:0.05, mixBlendMode:'overlay',
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")" }} />

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'var(--page-max)', margin:'0 auto',
        padding:'clamp(4rem,9vw,8rem) var(--gutter)' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:'0.75rem', marginBottom:'2.2rem',
          opacity: shown?1:0, transform: shown?'none':'translateY(var(--rise))', transition:'opacity var(--dur-4) var(--ease-out), transform var(--dur-4) var(--ease-out)' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--accent-2-on-dark)' }}>02</span>
          <span style={{ width: shown?'2rem':'0rem', height:'var(--hair)', background:'var(--accent-2-on-dark)', alignSelf:'center', transition:'width var(--dur-4) var(--ease-out) 120ms' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--on-dark-muted)' }}>Approach</span>
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
          lineHeight:'var(--leading-display)', letterSpacing:'var(--track-display)', color:'var(--on-dark)', maxWidth:'16ch', margin:0 }}>
          {['The best interface','reduces cognitive load','to almost nothing.'].map((ln, i) => (
            <span key={i} style={{ display:'block', overflow:'hidden', paddingBottom:'0.16em', marginBottom:'-0.06em' }}>
              <span style={{ display:'block', transform: shown?'none':'translateY(110%)',
                transition:`transform var(--dur-5) var(--ease-out) ${140 + i*110}ms` }}>{ln}</span>
            </span>
          ))}
        </h2>
        <p style={{ marginTop:'2rem', maxWidth:'46ch', fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)',
          color:'var(--on-dark-muted)', fontWeight:'var(--fw-regular)',
          opacity: shown?1:0, transform: shown?'none':'translateY(var(--rise))', transition:'opacity var(--dur-5) var(--ease-out) 520ms, transform var(--dur-5) var(--ease-out) 520ms' }}>
          A psychology background, full-stack hands, and an accelerated B.S./M.S. in Human Factors,
          pointed at the systems where getting it wrong actually costs something.
        </p>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer({ onOpen }) {
  const [h, setH] = useState2(false);
  return (
    <footer style={{ background:'var(--bg)', borderTop:'var(--hair) solid var(--border)' }}>
      <div style={{ padding:'clamp(3rem,6vw,5rem) 0 0' }}>
        <Marquee speed={50}>Let's work together</Marquee>
      </div>
      <Reveal y="14px" style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(2.5rem,5vw,4rem) var(--gutter)',
        display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'2rem', flexWrap:'wrap' }}>
        <div>
          <button data-hot onClick={()=>onOpen('contact')} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
            style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)',
            letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'#F4F0E5',
            background: h ? 'var(--accent-hover)' : 'var(--accent)', borderRadius:'var(--radius-pill)',
            border:'none', padding:'1rem 1.9rem', display:'inline-flex', alignItems:'center', gap:'0.6em',
            transition:'background var(--dur-2) var(--ease-soft)' }}>
            Get in touch <span aria-hidden="true" style={{ display:'inline-block', transform: h ? 'translateX(4px)' : 'none', transition:'transform var(--dur-2) var(--ease-out)' }}>→</span>
          </button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', textAlign:'right' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)' }}>© 2026 Rapheal Suber</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent-2)', display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'0.5rem' }}>
            <span style={{display:'inline-block', width:6, height:6, borderRadius:999, background:'var(--accent-2)'}}></span> Open to UX research &amp; human factors roles
          </span>
        </div>
      </Reveal>
    </footer>
  );
}

Object.assign(window, { Marquee, FieldNote, Footer });
