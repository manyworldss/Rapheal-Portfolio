/* ============================================================
   Marginalia — the final atmospheric layer. Typographic and
   linear only (no imagery): topographic contours in clay/pine,
   outlined ghost titles from the collection, a daily exhibit
   marker, and scroll-revealed margin notes between sections.
   ============================================================ */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

/* ---- flowing contour lines (generative, draw on load, parallax on scroll) ---- */
function TopoField() {
  const ref = useRefM(null);
  useEffectM(() => {
    const el = ref.current; if (!el) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 90)}px)`;
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // generative contours: sums of sines, seeded per line
  const lines = [];
  for (let l = 0; l < 6; l++) {
    const yBase = 130 + l * 128;
    const a1 = 26 + l * 7, a2 = 14 + l * 4;
    const f1 = 0.006 + l * 0.0009, f2 = 0.013 + l * 0.0011;
    const p1 = l * 1.7, p2 = l * 0.9;
    let d = '';
    for (let x = 0; x <= 1440; x += 24) {
      const y = yBase + a1 * Math.sin(x * f1 + p1) + a2 * Math.sin(x * f2 + p2);
      d += (x === 0 ? 'M' : 'L') + x.toFixed(0) + ' ' + y.toFixed(1) + ' ';
    }
    lines.push({ d, pine: l % 3 === 2, delay: 0.9 + l * 0.22 });
  }

  return (
    <div ref={ref} aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:-1, pointerEvents:'none', willChange:'transform' }}>
      <style>{`
        @keyframes topoDraw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce){ .topo-line { animation: none !important; stroke-dashoffset: 0 !important; } }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="none" style={{ display:'block' }}>
        {lines.map((ln, i) => (
          <path key={i} className="topo-line" d={ln.d} fill="none"
            stroke={ln.pine ? 'var(--accent-2-line)' : 'var(--accent-line)'}
            strokeWidth="1" opacity="0.5"
            style={{ strokeDasharray: 1700, strokeDashoffset: 1700,
              animation: `topoDraw 2.4s var(--ease-out) ${ln.delay}s forwards` }} />
        ))}
      </svg>
    </div>
  );
}

/* ---- outlined ghost titles from the collection, drifting in the hero ---- */
function GhostTitles() {
  const order = seededOrder(todaySeed());
  const picks = [COLLECTION[order[1]], COLLECTION[order[2]], COLLECTION[order[3]]];
  const spots = [
    { top:'16%', right:'4%',  size:'clamp(2.6rem,4.5vw,4.2rem)', dur:'34s', delay:'2.1s' },
    { top:'40%', right:'14%', size:'clamp(1.8rem,3vw,2.8rem)',   dur:'42s', delay:'2.35s' },
    { top:'62%', right:'6%',  size:'clamp(1.4rem,2.2vw,2rem)',   dur:'38s', delay:'2.6s' },
  ];
  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <style>{`
        @keyframes ghostDrift { 0%{transform:translate(0,0)} 50%{transform:translate(-14px,10px)} 100%{transform:translate(0,0)} }
        @keyframes ghostIn { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce){ .ghost-t { animation: none !important; opacity: 1 !important; } }
      `}</style>
      {picks.map((p, i) => (
        <span key={p.title} className="ghost-t" style={{
          position:'absolute', top:spots[i].top, right:spots[i].right,
          fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontStyle:'italic',
          fontSize:spots[i].size, whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.04em',
          color:'transparent', WebkitTextStroke:'1px var(--border-strong)',
          opacity:0,
          animation:`ghostIn 1.6s var(--ease-out) ${spots[i].delay} forwards, ghostDrift ${spots[i].dur} ease-in-out infinite`,
        }}>{p.title}</span>
      ))}
    </div>
  );
}

/* ---- daily exhibit marker: ties the hero to today's Currently pick ---- */
function DailyExhibit() {
  const [h, setH] = useStateM(false);
  const featured = COLLECTION[seededOrder(todaySeed())[0]];
  const k = KINDS[featured.kind];
  return (
    <a href="#currently" data-hot
      onClick={(e) => { e.preventDefault(); const c = document.querySelector('#currently'); if (c) window.scrollTo({ top: c.offsetTop - 40, behavior: 'smooth' }); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position:'absolute', right:'var(--gutter)', bottom:'clamp(7rem,16vh,11rem)', zIndex:2,
        display:'flex', flexDirection:'column', gap:'0.45rem', textAlign:'right', alignItems:'flex-end',
        textDecoration:'none', paddingRight:'0.9rem',
        borderRight:`var(--hair-2) solid ${k.accent}` }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
        textTransform:'uppercase', color:'var(--text-faint)' }}>Today's exhibit</span>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-regular)', fontStyle:'italic',
        fontSize:'var(--text-h3)', color:'var(--text-strong)', lineHeight:1.1, maxWidth:'16ch' }}>{featured.title}</span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
        textTransform:'uppercase', color: h ? k.accent : 'var(--text-muted)', transition:'color var(--dur-2) var(--ease-soft)' }}>
        {k.label} · View below <span aria-hidden="true">↓</span>
      </span>
    </a>
  );
}

/* ---- margin note: scroll-revealed marginalia in the gaps between sections ---- */
function MarginNote({ pickIndex = 4, align = 'left' }) {
  const [ref, shown] = useReveal();
  const it = COLLECTION[seededOrder(todaySeed())[pickIndex]];
  const k = KINDS[it.kind];
  return (
    <div ref={ref} aria-hidden="true" style={{
      maxWidth:'var(--page-max)', margin:'0 auto', width:'100%',
      padding:'clamp(1.5rem,3vw,2.5rem) var(--gutter)',
      display:'flex', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'1rem',
        opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(14px)',
        transition:'opacity var(--dur-5) var(--ease-out), transform var(--dur-5) var(--ease-out)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:k.accent }}>※</span>
        <span style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight:'var(--fw-light)',
          fontSize:'clamp(1.3rem,2vw,1.8rem)', color:'transparent', WebkitTextStroke:'1px var(--border-strong)',
          textTransform:'uppercase', letterSpacing:'0.04em', whiteSpace:'nowrap' }}>{it.title}</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--text-faint)', whiteSpace:'nowrap' }}>{k.label}{it.year !== '—' ? ` · ${it.year}` : ''}</span>
      </div>
    </div>
  );
}

Object.assign(window, { TopoField, GhostTitles, DailyExhibit, MarginNote });
