/* ============================================================
   Editorial Archive — portfolio building blocks (kit-scoped).
   Mirrors the design-system components; self-contained so the
   page runs standalone. Exposed on window for app.jsx.
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---- reveal-on-scroll hook ---- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, y = 'var(--rise)', as = 'div', style = {}, ...rest }) {
  const [ref, shown] = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : `translateY(${y})`,
      transition: `opacity var(--dur-4) var(--ease-out) ${delay}ms, transform var(--dur-4) var(--ease-out) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

/* ---- custom cursor: a quiet ring that swells over interactive things ---- */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let rx = innerWidth / 2, ry = innerHeight / 2, x = rx, y = ry, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`; };
    const loop = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    const over = (e) => { const t = e.target.closest('a,button,[data-hot]'); if (ring.current) ring.current.dataset.hot = t ? '1' : ''; };
    addEventListener('mousemove', move); addEventListener('mouseover', over); loop();
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); removeEventListener('mouseover', over); };
  }, []);
  return (
    <div aria-hidden="true">
      <div ref={dot} style={{ position:'fixed', top:0, left:0, width:5, height:5, marginLeft:-2.5, marginTop:-2.5, borderRadius:999, background:'var(--clay)', pointerEvents:'none', zIndex:9999, mixBlendMode:'normal' }} />
      <div ref={ring} className="cursor-ring" style={{ position:'fixed', top:0, left:0, width:34, height:34, marginLeft:-17, marginTop:-17, borderRadius:999, border:'1px solid var(--line-strong)', pointerEvents:'none', zIndex:9998, transition:'width var(--dur-2) var(--ease-soft), height var(--dur-2) var(--ease-soft), border-color var(--dur-2) var(--ease-soft), background var(--dur-2) var(--ease-soft)' }} />
      <style>{`
        @media (pointer:fine){ * { cursor: none !important; } }
        .cursor-ring[data-hot="1"]{ width:58px; height:58px; margin-left:-29px; margin-top:-29px; border-color:var(--clay-line); background:var(--clay-wash); }
      `}</style>
    </div>
  );
}

/* ---- opening curtain: a cinematic title card that counts in, then
   splits and lifts to reveal the page. ---- */
function IntroCurtain() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf, start;
    const dur = 1250;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 380);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const panel = (side) => ({
    position:'absolute', top:0, [side]:0, width:'50.5%', height:'100%',
    background:'var(--obsidian)',
    transform: done ? 'translateY(-100%)' : 'none',
    transition:`transform var(--dur-5) var(--ease-io) ${side === 'right' ? '90ms' : '0ms'}`,
  });

  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:9000,
      pointerEvents: done ? 'none' : 'auto' }}>
      <div style={panel('left')} />
      <div style={panel('right')} />
      {/* content rides above the split panels and fades as they lift */}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'1.5rem',
        opacity: done ? 0 : 1, transition:'opacity var(--dur-2) var(--ease-out)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--on-dark-muted)', whiteSpace:'nowrap',
          transform:`translateY(${(1 - pct/100) * 12}px)`, opacity: 0.4 + pct/100 * 0.6 }}>
          Rapheal Suber — Archive
        </span>
        <span style={{ width:'min(46vw, 420px)', height:'var(--hair)', background:'var(--border-inverse)', position:'relative', overflow:'hidden' }}>
          <span style={{ position:'absolute', inset:0, transformOrigin:'left', transform:`scaleX(${pct/100})`, background:'var(--accent)' }} />
        </span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          color:'var(--accent-on-dark)', fontVariantNumeric:'tabular-nums' }}>
          {String(pct).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { useReveal, Reveal, Cursor, IntroCurtain });
