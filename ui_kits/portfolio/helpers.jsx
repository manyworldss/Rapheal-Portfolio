/* ============================================================
   Portfolio — shared helpers.
   Scroll reveals, the atmospheric aurora backdrop, the glass
   sphere primitive, and the intro curtain.
   ============================================================ */
const { useState, useEffect, useRef } = React;

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) { setShown(true); return; }
    // If already in (or above) the viewport at mount, reveal on next frame.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.16 });
    io.observe(el);
    // Safety fallback: never leave content invisible.
    const t = setTimeout(() => setShown(true), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, y = '18px', as = 'div', style = {}, ...rest }) {
  const [ref, shown] = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : `translateY(${y})`,
      transition: `opacity 0.7s var(--ease-out) ${delay}ms, transform 0.7s var(--ease-out) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

/* ---- Blueprint backdrop: slow clay/pine aurora + cursor spotlight ---- */
function BlueprintBg() {
  const spot = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // The spotlight repaints a full-viewport gradient, so only run the easing
    // loop while the cursor is actually settling — never as an idle rAF.
    let raf = 0, tx = -999, ty = -999, x = -999, y = -999;
    const paint = () => {
      if (spot.current) {
        spot.current.style.background = `radial-gradient(440px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, rgba(201,138,99,0.13), rgba(127,161,137,0.05) 44%, transparent 66%)`;
      }
    };
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      paint();
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) { raf = 0; return; }
      raf = requestAnimationFrame(loop);
    };
    const move = (e) => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); };
    addEventListener('mousemove', move, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <div className="rs-aur">
        <span className="a a1" /><span className="a a2" /><span className="a a3" />
      </div>
      <div ref={spot} className="rs-spot" />
      <style>{`
        /* Blur lives on each blob, not the container: a filtered parent would
           have to re-rasterise the whole viewport on every animation frame,
           whereas a promoted blob layer is just transformed by the compositor. */
        .rs-aur{ position:absolute; inset:-25%; opacity:0.42; }
        .rs-aur .a{ position:absolute; border-radius:50%; filter:blur(60px); will-change:transform; }
        .rs-aur .a1{ width:64vw; height:64vw; left:2%; top:-14%; background:radial-gradient(closest-side, rgba(166,96,60,0.72), transparent 70%); animation:rsD1 26s ease-in-out infinite; }
        .rs-aur .a2{ width:58vw; height:58vw; right:-6%; top:22%; background:radial-gradient(closest-side, rgba(51,81,63,0.78), transparent 70%); animation:rsD2 32s ease-in-out infinite; }
        .rs-aur .a3{ width:46vw; height:46vw; left:34%; bottom:-16%; background:radial-gradient(closest-side, rgba(201,138,99,0.52), transparent 70%); animation:rsD3 38s ease-in-out infinite; }
        .rs-spot{ position:absolute; inset:0; background:radial-gradient(420px circle at -999px -999px, rgba(201,138,99,0.12), rgba(127,161,137,0.04) 44%, transparent 66%); }
        @keyframes rsD1{ 0%,100%{ transform:translate(0,0) scale(1);} 50%{ transform:translate(10%,8%) scale(1.2);} }
        @keyframes rsD2{ 0%,100%{ transform:translate(0,0) scale(1.1);} 50%{ transform:translate(-10%,-8%) scale(0.9);} }
        @keyframes rsD3{ 0%,100%{ transform:translate(0,0) scale(0.95);} 50%{ transform:translate(8%,-10%) scale(1.25);} }
        [data-theme="light"] .rs-aur{ opacity:0.28; }
        @media (prefers-reduced-motion: reduce){ .rs-aur .a{ animation:none; } }
      `}</style>
    </div>
  );
}

/* ---- Scroll progress hairline ---- */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} aria-hidden="true" style={{ position:'fixed', top:0, left:0, right:0, height:2, zIndex:900,
    transformOrigin:'0 50%', transform:'scaleX(0)', background:'var(--signal)',
    transition:'transform 0.1s linear' }} />;
}

/* ---- Magnetic hover (fine pointers only) ---- */
function useMagnetic(strength = 0.28) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    };
    const leave = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return ref;
}

/* ---- Channel sphere: dense volumetric glass. Same optical language as
   the kiosk orbs — rim light from behind-right, whisper specular, fine
   grain to kill the CGI plastic sheen, optional instrument ring. ---- */
function Sphere({ size = 160, ring = false, style = {} }) {
  return (
    <div className="rs-sphere-wrap" style={{ width:size, height:size, ...style }}>
      <div className="rs-sphere">
        <div className="rs-sphere-grad" />
        <div className="rs-sphere-shade" />
        <div className="rs-sphere-spec" />
        <div className="rs-sphere-grain" />
      </div>
      {ring && <div className="rs-sphere-ring" />}
      <style>{`
        .rs-sphere-wrap{ position:relative; }
        .rs-sphere{ position:absolute; inset:0; border-radius:50%; overflow:hidden; isolation:isolate; }
        .rs-sphere::after{ content:''; position:absolute; inset:0; border-radius:50%; z-index:4;
          box-shadow: inset -2px -3px 7px rgba(255,255,255,0.20),
                      inset -9px -13px 28px rgba(255,255,255,0.05),
                      inset 10px 12px 34px rgba(0,0,0,0.40),
                      inset 0 0 0 1px rgba(240,236,227,0.10); }
        .rs-sphere-grad{ position:absolute; inset:-35%; z-index:0;
          background:conic-gradient(from 0deg, var(--clay), var(--pine-soft), var(--clay-soft), var(--pine-deep), var(--clay));
          filter:blur(16px) saturate(1.1); animation:rsSpin 34s linear infinite; will-change:transform; }
        .rs-sphere-shade{ position:absolute; inset:0; z-index:1; border-radius:50%;
          background:radial-gradient(72% 72% at 50% 120%, rgba(0,0,0,0.60), transparent 58%); }
        .rs-sphere-spec{ position:absolute; inset:0; z-index:2; border-radius:50%;
          background:radial-gradient(38% 34% at 33% 24%, rgba(255,255,255,0.13), transparent 66%); }
        .rs-sphere-grain{ position:absolute; inset:0; z-index:3; border-radius:50%; opacity:0.13;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E");
          background-size:120px 120px; }
        .rs-sphere-ring{ position:absolute; inset:-14%; border-radius:50%; pointer-events:none;
          border:1px solid rgba(240,236,227,0.06);
          border-top-color:var(--clay-soft); border-right-color:rgba(240,236,227,0.13);
          animation:rsSpin 40s linear infinite; will-change:transform; }
        @keyframes rsSpin{ to{ transform:rotate(360deg); } }
        @media (prefers-reduced-motion: reduce){ .rs-sphere-grad, .rs-sphere-ring{ animation:none; } }
      `}</style>
    </div>
  );
}

/* ---- Intro curtain: sphere assembles + a 00→100 counter, then wipes up ---- */
function IntroCurtain() {
  const [n, setN] = useState(0);
  const [lifted, setLifted] = useState(false);
  const [gone, setGone] = useState(false);
  const [skip] = useState(() => {
    try { if (sessionStorage.getItem('rs-intro')) return true; } catch (e) {}
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    try { sessionStorage.setItem('rs-intro', '1'); } catch (e) {}
    if (skip) { setLifted(true); setGone(true); return; }
    let v = 0;
    const tick = setInterval(() => {
      v = Math.min(100, v + Math.round(3 + Math.random() * 6));
      setN(v);
      if (v >= 100) {
        clearInterval(tick);
        setTimeout(() => setLifted(true), 320);
        setTimeout(() => setGone(true), 320 + 1100);
      }
    }, 34);
    return () => clearInterval(tick);
  }, [skip]);
  if (gone) return null;
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:9500, background:'var(--bg)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2.2rem',
      transform: lifted ? 'translateY(-100%)' : 'none',
      transition:'transform 1.1s var(--ease-io)' }}>
      <div style={{ opacity: lifted ? 0 : 1, transform: `scale(${lifted ? 0.9 : 1})`,
        transition:'opacity 0.5s var(--ease-out), transform 0.9s var(--ease-out)' }}>
        <Sphere size="clamp(120px, 22vw, 180px)" ring />
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.9rem',
        opacity: lifted ? 0 : 1, transition:'opacity 0.4s var(--ease-out)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'var(--text-muted)' }}>Rapheal Suber</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-h2)', fontWeight:'var(--fw-regular)',
          color:'var(--text-strong)', fontVariantNumeric:'tabular-nums', letterSpacing:'var(--track-tight)' }}>
          {String(n).padStart(3,'0')}
        </div>
        <div style={{ width:180, maxWidth:'40vw', height:1, background:'var(--border)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, transformOrigin:'0 50%', transform:`scaleX(${n/100})`,
            background:'var(--clay-soft)', transition:'transform 0.1s linear' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reveal, useReveal, BlueprintBg, ScrollProgress, useMagnetic, Sphere, IntroCurtain });
