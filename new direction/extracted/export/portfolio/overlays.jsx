/* ============================================================
   Editorial Archive — overlays: case-file takeover & slide panels.
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

/* ---- Case-file takeover ---- */
function CaseOverlay({ item, onClose }) {
  const active = !!item;
  useLockScroll(active);
  useEsc(onClose, active);
  return (
    <div aria-hidden={!active} style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents: active?'auto':'none' }}>
      {/* backdrop */}
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(8,6,5,0.6)',
        opacity: active?1:0, transition:'opacity var(--dur-3) var(--ease-out)' }} />
      {/* sheet */}
      <div style={{ position:'absolute', inset:0, background:'var(--obsidian)', color:'var(--on-dark)', overflowY:'auto',
        transform: active?'translateY(0)':'translateY(2%)', opacity: active?1:0,
        transition:'transform var(--dur-5) var(--ease-io), opacity var(--dur-4) var(--ease-out)' }}>
        {item && <CaseBody item={item} onClose={onClose} />}
      </div>
    </div>
  );
}

function CaseBody({ item, onClose }) {
  return (
    <div>
      {/* top bar */}
      <div style={{ position:'sticky', top:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'space-between',
        height:'var(--topbar-h)', padding:'0 var(--gutter)', background:'linear-gradient(var(--obsidian), transparent)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent-on-dark)' }}>{item.code} / {item.year}</span>
        <button data-hot onClick={onClose} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)',
          textTransform:'uppercase', color:'var(--on-dark)', border:'var(--hair) solid var(--border-inverse)', borderRadius:'var(--radius-pill)', padding:'0.6rem 1.1rem' }}>Close ✕</button>
      </div>

      {/* masthead */}
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(1rem,3vw,2rem) var(--gutter) clamp(2rem,5vw,4rem)' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-hero)', lineHeight:'var(--leading-hero)',
          letterSpacing:'var(--track-hero)', textTransform:'uppercase', color:'var(--on-dark)', margin:'0 0 1.5rem' }}>{item.title}</h2>
        <div style={{ display:'flex', gap:'0.7rem', flexWrap:'wrap' }}>
          {item.disciplines.map((d)=>(
            <span key={d} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
              color:'var(--on-dark-muted)', border:'var(--hair) solid var(--border-inverse)', borderRadius:'var(--radius-pill)', padding:'0.4rem 0.85rem' }}>{d}</span>
          ))}
        </div>
      </div>

      {/* full-bleed image */}
      <div style={{ width:'100%', aspectRatio:'16/9', maxHeight:'78vh', overflow:'hidden', background:'var(--obsidian-2)' }}>
        <img src={item.hero || item.thumb} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
      </div>

      {/* writeup */}
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(3rem,7vw,6rem) var(--gutter)',
        display:'grid', gridTemplateColumns:'minmax(0,1.6fr) minmax(0,1fr)', gap:'clamp(2rem,6vw,6rem)' }}>
        <div>
          <p style={{ fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--on-dark)', fontWeight:'var(--fw-regular)', margin:'0 0 1.5rem', maxWidth:'56ch' }}>{item.summary}</p>
          <p style={{ fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--on-dark-muted)', margin:0, maxWidth:'58ch' }}>{item.detail}</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.4rem', borderTop:'var(--hair) solid var(--border-inverse)', paddingTop:'1.4rem', alignSelf:'start' }}>
          {item.meta.map((m)=>(
            <div key={m.k}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent-on-dark)', marginBottom:'0.4rem' }}>{m.k}</div>
              <div style={{ fontSize:'var(--text-sm)', color:'var(--on-dark)', lineHeight:1.5 }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Slide-over panel (About / Contact) ---- */
function Panel({ open, onClose, children }) {
  const active = !!open;
  useLockScroll(active);
  useEsc(onClose, active);
  return (
    <div aria-hidden={!active} style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents: active?'auto':'none' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(8,6,5,0.42)',
        opacity: active?1:0, transition:'opacity var(--dur-3) var(--ease-out)' }} />
      <aside style={{ position:'absolute', top:0, right:0, height:'100%', width:'min(560px, 100%)', background:'var(--bg)',
        borderLeft:'var(--hair) solid var(--border)', transform: active?'translateX(0)':'translateX(100%)',
        transition:'transform var(--dur-5) var(--ease-io)', overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'flex-end', padding:'1.5rem var(--gutter) 0' }}>
          <button data-hot onClick={onClose} style={{ width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--text-strong)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)' }}>✕</button>
        </div>
        <div style={{ padding:'1rem var(--gutter) clamp(3rem,6vw,4rem)' }}>{children}</div>
      </aside>
    </div>
  );
}

function PanelTitle({ index, children }) {
  return (
    <div style={{ marginBottom:'2rem' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'0.7rem', marginBottom:'1.2rem' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)' }}>{index}</span>
        <span style={{ width:'1.75rem', height:'var(--hair)', background:'var(--border-strong)', alignSelf:'center' }} />
      </div>
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-h1)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:0 }}>{children}</h2>
    </div>
  );
}

Object.assign(window, { CaseOverlay, Panel, PanelTitle });
