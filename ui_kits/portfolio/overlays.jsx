/* ============================================================
   Portfolio — the case-study takeover.
   Supports rich media, live links, video frames, side-by-side
   comparisons, insight grids, multi-screen galleries, and a
   full-screen click-to-zoom Lightbox.
   ============================================================ */
const { useState: useStateO, useEffect: useEffectO } = React;

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

/* ---- Lightbox Modal with Interactive 2x Zoom ---- */
function ImageLightbox({ src, caption, onClose }) {
  const active = !!src;
  const [scale, setScale] = useStateO(1);
  useLockScroll(active);
  useEsc(onClose, active);

  useEffectO(() => {
    if (active) setScale(1);
  }, [src, active]);

  if (!active) return null;

  const toggleZoom = (e) => {
    e.stopPropagation();
    setScale(prev => (prev === 1 ? 2 : 1));
  };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'1.5rem', background:'rgba(10, 8, 6, 0.95)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}
      onClick={onClose}>
      
      {/* Top Toolbar */}
      <div style={{ position:'absolute', top:'1.5rem', right:'1.5rem', zIndex:2010, display:'flex', alignItems:'center', gap:'0.6rem' }} onClick={(e)=>e.stopPropagation()}>
        <button onClick={toggleZoom} aria-label="Toggle 2x zoom" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
          color:'#FFFFFF', background:'rgba(255,255,255,0.14)', border:'1px solid rgba(255,255,255,0.24)', borderRadius:'var(--radius-pill)', padding:'0.5rem 1rem', cursor:'pointer' }}>
          {scale === 1 ? '🔍 2x Zoom' : '↙ Fit Screen'}
        </button>
        <button onClick={onClose} aria-label="Close image" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
          color:'#FFFFFF', background:'rgba(255,255,255,0.14)', border:'1px solid rgba(255,255,255,0.24)', borderRadius:'var(--radius-pill)', padding:'0.5rem 1rem', cursor:'pointer' }}>
          Close ✕
        </button>
      </div>

      {/* Image Container with Scroll & Magnification */}
      <div style={{ position:'relative', maxWidth:'96vw', maxHeight:'85vh', overflow: scale > 1 ? 'auto' : 'hidden',
        display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'var(--radius-md)', padding: scale > 1 ? '1rem' : 0 }}
        onClick={(e)=>e.stopPropagation()}>
        
        <img src={src} alt={caption || 'Full view'} onClick={toggleZoom}
          style={{ maxWidth: scale === 1 ? '100%' : 'none', maxHeight: scale === 1 ? '80vh' : 'none', width: scale > 1 ? '180%' : 'auto',
            objectFit:'contain', borderRadius:'var(--radius-md)', border:'1px solid rgba(255,255,255,0.18)',
            boxShadow:'0 30px 80px rgba(0,0,0,0.88)', cursor: scale === 1 ? 'zoom-in' : 'zoom-out',
            transition:'transform 0.3s cubic-bezier(0.19,1,0.22,1), width 0.3s cubic-bezier(0.19,1,0.22,1)' }} />

        {caption && (
          <div style={{ marginTop:'0.9rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
            color:'rgba(255,255,255,0.82)', textAlign:'center', maxWidth:'70ch', lineHeight:1.5 }}>
            {caption} {scale === 1 ? '· (Click image to zoom 2x)' : '· (Click image to fit screen)'}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Case-study takeover ---- */
function CaseOverlay({ item, onClose }) {
  const active = !!item;
  useLockScroll(active);
  useEsc(onClose, active);
  return (
    <div aria-hidden={!active} style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents: active?'auto':'none' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(11,9,6,0.62)',
        backdropFilter: active ? 'blur(4px)' : 'none',
        opacity: active?1:0, transition:'opacity 0.5s var(--ease-out)' }} />
      <div style={{ position:'absolute', inset:0, background:'var(--bg)', color:'var(--text-strong)', overflowY:'auto',
        transform: active ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,2.5%,0) scale(0.985)',
        opacity: active?1:0, transformOrigin:'50% 100%', willChange:'transform',
        transition:'transform 0.78s cubic-bezier(0.19,1,0.22,1), opacity 0.46s var(--ease-out)' }}>
        {item && <CaseBody key={item.id} item={item} onClose={onClose} />}
      </div>
    </div>
  );
}

function CaseBody({ item, onClose }) {
  const SECTIONS = ['Problem', 'Constraints', 'Approach', 'Outcome', 'Lessons Learned'];
  const [zoomTarget, setZoomTarget] = useStateO(null);

  return (
    <div>
      <style>{`
        @keyframes rsCaseIn{ from{ opacity:0; transform:translate3d(0,22px,0); } to{ opacity:1; transform:none; } }
        .rs-case-1{ animation:rsCaseIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.14s both; }
        .rs-case-2{ animation:rsCaseIn 0.75s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .rs-case-3{ animation:rsCaseIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.34s both; }
        .rs-case-grid{ display:grid; grid-template-columns:minmax(0,16rem) minmax(0,1fr); gap:clamp(2rem,5vw,5rem); align-items:start; }
        .rs-case-rail{ position:sticky; top:calc(var(--topbar-h) + 2rem); }
        .rs-insight-grid{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.2rem; margin:1.5rem 0; }
        .rs-insight-card{ background:var(--bg-raised); border:var(--hair) solid var(--border); padding:1.25rem; border-radius:var(--radius-md); }
        .rs-comp-grid{ display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.5rem; margin:1.8rem 0; }
        .rs-comp-card{ background:var(--bg-raised); border:var(--hair) solid var(--border); border-radius:var(--radius-md); padding:1.2rem; overflow:hidden; position:relative; cursor:pointer; transition:border-color 0.2s ease, transform 0.2s ease; }
        .rs-comp-card:hover{ border-color:var(--accent); transform:translateY(-2px); }
        
        .rs-hero-img-wrap{ position:relative; width:100%; background:var(--bg-raised); border:var(--hair) solid var(--border); border-radius:var(--radius-lg); overflow:hidden; cursor:pointer; transition:border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
        .rs-hero-img-wrap:hover{ border-color:var(--accent); box-shadow:var(--shadow-md); transform:scale(1.005); }
        .rs-hero-img{ width:100%; height:auto; display:block; object-fit:contain; }

        .rs-gallery-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:1.5rem; margin:1.8rem 0; }
        .rs-gallery-card{ background:var(--bg-raised); border:var(--hair) solid var(--border); border-radius:var(--radius-md); overflow:hidden; display:flex; flex-direction:column; cursor:pointer; transition:border-color 0.2s ease, transform 0.2s ease; position:relative; }
        .rs-gallery-card:hover{ border-color:var(--accent); transform:translateY(-2px); }
        .rs-gallery-img{ width:100%; height:auto; display:block; border-bottom:var(--hair) solid var(--border); object-fit:contain; }
        .rs-gallery-caption{ padding:0.8rem 1rem; font-family:var(--font-mono); font-size:var(--text-micro); color:var(--text-muted); line-height:1.45; }
        
        .prox-stage{ position:relative; display:flex; justify-content:center; padding:clamp(1.5rem,4vw,3rem) 0; }
        .prox-stage::before{ content:''; position:absolute; top:50%; left:50%; width:min(72%,500px); aspect-ratio:1/1;
            transform:translate(-50%,-50%); background:radial-gradient(circle, rgba(23,92,67,0.28), transparent 64%);
            filter:blur(24px); pointer-events:none; z-index:0; }
        .prox-phone{ position:relative; z-index:1; width:290px; max-width:82vw; padding:12px;
            background:linear-gradient(155deg,#242426,#0a0a0b); border-radius:48px;
            box-shadow:0 40px 80px -30px rgba(0,0,0,0.75), inset 0 0 0 1.5px rgba(255,255,255,0.08); }
        .prox-phone__island{ position:absolute; top:22px; left:50%; transform:translateX(-50%);
            width:80px; height:24px; background:#000; border-radius:14px; z-index:3; }
        .prox-phone__screen{ display:block; width:100%; aspect-ratio:544/1084; object-fit:cover;
            background:#000; border-radius:38px; border:none; }

        @media (max-width: 820px){
          .rs-case-grid{ grid-template-columns:1fr; }
          .rs-case-rail{ position:static; }
        }
        @media (prefers-reduced-motion: reduce){
          .rs-case-1,.rs-case-2,.rs-case-3{ animation:none; }
        }
      `}</style>

      {/* Lightbox component */}
      <ImageLightbox src={zoomTarget ? zoomTarget.src : null} caption={zoomTarget ? zoomTarget.caption : null} onClose={() => setZoomTarget(null)} />


      ) : ((item.hero || item.thumb) && (
        <div className="rs-case-2" style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'0 var(--gutter)' }}>
          <div className="rs-hero-img-wrap" onClick={() => setZoomTarget({ src: item.hero || item.thumb, caption: `${item.title} Dashboard Interface` })}>
            <img src={item.hero || item.thumb} alt={item.title} className="rs-hero-img" />
          </div>
        </div>
      ))}

      {/* body: meta rail + content sections */}
      <div className="rs-case-grid rs-case-3" style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding:'clamp(2.5rem,5vw,4.5rem) var(--gutter)' }}>
        {/* meta rail */}
        <div className="rs-case-rail" style={{ display:'flex', flexDirection:'column', gap:'1.4rem' }}>
          {item.meta.map((m)=>(
            <div key={m.k} style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'0.8rem' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)', marginBottom:'0.4rem' }}>{m.k}</div>
              <div style={{ fontSize:'var(--text-sm)', color:'var(--text-strong)', lineHeight:1.5 }}>{m.v}</div>
            </div>
          ))}
          {item.stack && (
            <div style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'0.8rem' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)', marginBottom:'0.6rem' }}>Tech Stack</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {item.stack.map((st)=>(
                  <span key={st} style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-muted)', background:'var(--bg-raised)', border:'var(--hair) solid var(--border)', borderRadius:'var(--radius-sm)', padding:'0.2rem 0.5rem' }}>{st}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* main sections column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'clamp(2rem,4vw,3.5rem)' }}>

          {/* Key Insights Grid if present */}
          {item.insights && (
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.7rem' }}>Key Insights & Architecture</div>
              <div className="rs-insight-grid">
                {item.insights.map((ins, idx)=>(
                  <div key={idx} className="rs-insight-card">
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--accent)', textTransform:'uppercase', marginBottom:'0.4rem' }}>{ins.title}</div>
                    <div style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)', lineHeight:1.55 }}>{ins.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparative A/B Blocks if present (e.g. Prox) */}
          {item.comparisons && (
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.7rem' }}>Strategy Comparison</div>
              <div className="rs-comp-grid">
                {item.comparisons.map((c, idx)=>(
                  <div key={idx} className="rs-comp-card" onClick={() => setZoomTarget({ src: c.src, caption: `${c.label}: ${c.desc}` })}>
                    <span style={{ display:'inline-block', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.6rem' }}>{c.label}</span>
                    <img src={c.src} alt={c.label} style={{ width:'100%', height:'auto', borderRadius:'var(--radius-sm)', border:'var(--hair) solid var(--border)' }} />
                    <p style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)', lineHeight:1.5, marginTop:'0.8rem', margin:0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engineering / Research Sections */}
          {SECTIONS.map((s, i) => item.sections[s] && (
            <div key={s} style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'1.2rem', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', color:'var(--accent)', paddingTop:'0.45rem' }}>{String(i+1).padStart(2,'0')}</span>
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h3)',
                  letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:'0 0 0.7rem' }}>{s}</h3>
                {Array.isArray(item.sections[s]) ? (
                  <ul style={{ margin:0, paddingLeft:'1.1rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                    {item.sections[s].map((li, k)=>(
                      <li key={k} style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)' }}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text)', margin:0, maxWidth:'64ch' }}>{item.sections[s]}</p>
                )}
              </div>
            </div>
          ))}

          {/* Multi-screen Gallery if present */}
          {item.gallery && item.gallery.length > 0 && (
            <div style={{ borderTop:'var(--hair) solid var(--border)', paddingTop:'2rem', marginTop:'1rem' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h3)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', marginBottom:'1.2rem' }}>Screen Gallery & Artifacts</h3>
              <div className="rs-gallery-grid">
                {item.gallery.map((g, idx)=>(
                  <div key={idx} className="rs-gallery-card" onClick={() => setZoomTarget({ src: g.src, caption: g.caption })}>
                    <img src={g.src} alt={g.caption || item.title} className="rs-gallery-img" loading="lazy" />
                    {g.caption && <div className="rs-gallery-caption">{g.caption}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CaseOverlay });
