/* ============================================================
   Portfolio, overlays: case-study takeover + slide-over panels.
   ============================================================ */
const { useEffect: useEffectO } = React;

function useLockScroll(active) {
  useEffectO(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}
function useEsc(onClose, active) {
  useEffectO(() => {
    if (!active) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', h); return () => removeEventListener('keydown', h);
  }, [active, onClose]);
}

/* ---- Case-study takeover ---- */
function CaseOverlay({ item, onClose, reading }) {
  const active = !!item;
  const scrollRoot = React.useRef(null);
  useLockScroll(active);
  useEsc(onClose, active);
  return (
    <div aria-hidden={!active} style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents: active?'auto':'none' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(10,10,11,0.55)',
        backdropFilter: active ? 'blur(3px)' : 'none',
        opacity: active?1:0, transition:'opacity var(--dur-3) var(--ease-out)' }} />
      <div ref={scrollRoot} style={{ position:'absolute', inset:0, background:'var(--bg)', color:'var(--text-strong)', overflowY:'auto',
        transform: active?'translateY(0)':'translateY(1.5%)', opacity: active?1:0,
        transition:'transform var(--dur-5) var(--ease-io), opacity var(--dur-4) var(--ease-out)' }}>
        {item && <CaseBody item={item} onClose={onClose} reading={reading} scrollRoot={scrollRoot} />}
      </div>
    </div>
  );
}

function CaseBody({ item, onClose, reading, scrollRoot }) {
  const SECTIONS = ['Problem', 'Constraints', 'Approach', 'Outcome', 'Lessons Learned'];
  return (
    <div>
      {/* top bar */}
      <div style={{ position:'sticky', top:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'space-between',
        height:'var(--topbar-h)', padding:'0 var(--gutter)', background:'color-mix(in srgb, var(--bg) 86%, transparent)',
        backdropFilter:'blur(12px)', borderBottom:'var(--hair) solid var(--border)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)' }}>{item.code} · {item.year}</span>
        <div style={{ display:'flex', alignItems:'center', gap:'0.9rem' }}>
          <button data-hot onClick={onClose} style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:'var(--fw-medium)',
            color:'var(--text-strong)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-sm)', padding:'0.5rem 1rem' }}>Close</button>
        </div>
      </div>

      {/* masthead */}
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(2.5rem,6vw,5rem) var(--gutter) clamp(2rem,4vw,3rem)' }}>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.6rem' }}>
          {item.disciplines.map((d)=>(
            <span key={d} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
              color:'var(--text-muted)', border:'var(--hair) solid var(--border)', borderRadius:'var(--radius-pill)', padding:'0.35rem 0.8rem' }}>{d}</span>
          ))}
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-hero)', lineHeight:'var(--leading-hero)',
          letterSpacing:'var(--track-hero)', color:'var(--text-strong)', margin:'0 0 1.2rem', maxWidth:'16ch' }}>{item.title}</h2>
        <p style={{ fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text-muted)', maxWidth:'62ch', margin:0 }}>{item.blurb}</p>
      </div>

      {/* media */}
      {(item.hero || item.thumb) && (
        <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'0 var(--gutter)' }}>
          <div style={{ width:'100%', aspectRatio:'16/9', maxHeight:'70vh', overflow:'hidden', background:'var(--bg-inset)',
            border:'var(--hair) solid var(--border)', borderRadius:'var(--radius-lg)' }}>
            <img src={item.hero || item.thumb} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
          </div>
        </div>
      )}

      {/* body: meta rail + 5 engineering sections */}
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(3rem,6vw,5rem) var(--gutter)',
        display:'grid', gridTemplateColumns:'minmax(0,15rem) minmax(0,1fr)', gap:'clamp(2rem,6vw,6rem)', alignItems:'start' }}>
        {/* meta rail (sticky) */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.4rem', position:'sticky', top:'calc(var(--topbar-h) + 2rem)' }}>
          {item.meta.map((m)=>(
            <div key={m.k} style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'0.8rem' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)', marginBottom:'0.4rem' }}>{m.k}</div>
              <div style={{ fontSize:'var(--text-sm)', color:'var(--text-strong)', lineHeight:1.5 }}>{m.v}</div>
            </div>
          ))}
        </div>
        {/* stages: launch sequence — each ignites as it scrolls in */}
        <div style={{ display:'flex', flexDirection:'column', gap:'clamp(2rem,4vw,3.25rem)' }}>
          {SECTIONS.filter((s)=>item.sections[s]).map((s, i, arr) => (
            <LaunchStage key={s} label={s} n={i+1} total={arr.length} scrollRoot={scrollRoot} content={item.sections[s]} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Launch stage: ignites (bar fills, content rises) when scrolled into view ---- */
function LaunchStage({ label, n, total, content, scrollRoot }) {
  const ref = React.useRef(null);
  const [lit, setLit] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLit(true); return; }
    const root = scrollRoot && scrollRoot.current ? scrollRoot.current : null;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setLit(true); io.disconnect(); } });
    }, { root, threshold: 0.3 });
    io.observe(el);
    const t = setTimeout(() => setLit(true), 2200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [scrollRoot]);
  return (
    <div ref={ref} style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'1.3rem', alignItems:'start' }}>
      {/* ignition rail */}
      <span style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', paddingTop:'0.35rem' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          color: lit ? 'var(--accent)' : 'var(--text-faint)', transition:'color 0.5s var(--ease-out)', fontVariantNumeric:'tabular-nums' }}>
          {String(n).padStart(2,'0')}
        </span>
        {n < total && (
          <span aria-hidden="true" style={{ width:1, flex:1, minHeight:38, background:'var(--border)', position:'relative', overflow:'hidden' }}>
            <span style={{ position:'absolute', inset:0, background:'var(--accent)', transformOrigin:'50% 0',
              transform:`scaleY(${lit ? 1 : 0})`, transition:'transform 0.85s var(--ease-out) 0.12s' }} />
          </span>
        )}
      </span>
      <div style={{ opacity: lit ? 1 : 0, transform: lit ? 'none' : 'translateY(20px)',
        transition:'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)' }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h3)',
          letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:'0 0 0.7rem' }}>{label}</h3>
        {Array.isArray(content) ? (
          <ul style={{ margin:0, paddingLeft:'1.1rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {content.map((li, k)=>(
              <li key={k} style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)',
                opacity: lit ? 1 : 0, transform: lit ? 'none' : 'translateY(10px)',
                transition:`opacity 0.6s var(--ease-out) ${120 + k*80}ms, transform 0.6s var(--ease-out) ${120 + k*80}ms` }}>{li}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)', margin:0, maxWidth:'64ch' }}>{content}</p>
        )}
      </div>
    </div>
  );
}

/* ---- Slide-over panel ---- */
function Panel({ open, onClose, children }) {
  const active = !!open;
  useLockScroll(active);
  useEsc(onClose, active);
  return (
    <div aria-hidden={!active} style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents: active?'auto':'none' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(10,10,11,0.4)',
        opacity: active?1:0, transition:'opacity var(--dur-3) var(--ease-out)' }} />
      <aside style={{ position:'absolute', top:0, right:0, height:'100%', width:'min(560px, 100%)', background:'var(--bg)',
        borderLeft:'var(--hair) solid var(--border)', transform: active?'translateX(0)':'translateX(100%)',
        transition:'transform var(--dur-5) var(--ease-io)', overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'flex-end', padding:'1.5rem var(--gutter) 0' }}>
          <button data-hot onClick={onClose} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--text-strong)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-sm)' }}>✕</button>
        </div>
        <div style={{ padding:'1rem var(--gutter) clamp(3rem,6vw,4rem)' }}>{children}</div>
      </aside>
    </div>
  );
}

function PanelTitle({ index, children }) {
  return (
    <div style={{ marginBottom:'2rem' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.9rem' }}>{index}</div>
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-h1)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:0 }}>{children}</h2>
    </div>
  );
}

Object.assign(window, { CaseOverlay, Panel, PanelTitle });
