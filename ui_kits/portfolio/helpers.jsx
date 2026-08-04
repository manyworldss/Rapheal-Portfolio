/* ============================================================
   Portfolio — shared helpers. Minimal, engineering-grade.
   Scroll reveals + light theme boot. No decorative cursor/curtain.
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

/* ---- Blueprint backdrop: faint engineering grid + slow signal glow + cursor spotlight ---- */
function BlueprintBg() {
  const spot = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0, tx = -999, ty = -999, x = -999, y = -999;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      if (spot.current) {
        const m = `radial-gradient(300px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, #000 0%, transparent 62%)`;
        spot.current.style.webkitMaskImage = m;
        spot.current.style.maskImage = m;
      }
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', move, { passive: true }); loop();
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <div className="rs-glow" />
      {/* grid, revealed under the cursor spotlight */}
      <div className="rs-grid rs-grid-base" />
      <div ref={spot} className="rs-grid rs-grid-spot" />
      <style>{`
        .rs-grid{ position:absolute; inset:-1px; background-size: 72px 72px;
          background-image:
            linear-gradient(to right, var(--rs-grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--rs-grid-color) 1px, transparent 1px); }
        .rs-grid-base{ --rs-grid-color: color-mix(in srgb, var(--text-strong) 4%, transparent);
          -webkit-mask-image: radial-gradient(130% 100% at 50% -10%, #000 0%, transparent 68%);
          mask-image: radial-gradient(130% 100% at 50% -10%, #000 0%, transparent 68%); }
        .rs-grid-spot{ --rs-grid-color: color-mix(in srgb, var(--signal) 60%, transparent);
          -webkit-mask-image: radial-gradient(300px circle at -999px -999px, #000 0%, transparent 62%);
          mask-image: radial-gradient(300px circle at -999px -999px, #000 0%, transparent 62%); }
        .rs-glow{ position:absolute; top:-34vh; left:50%; width:min(1100px,92vw); height:80vh;
          background: radial-gradient(closest-side, color-mix(in srgb, var(--signal) 16%, transparent), transparent 72%);
          filter: blur(36px); animation: rsGlow 20s var(--ease-linear) infinite; will-change: transform; }
        @keyframes rsGlow{
          0%{ transform:translate(-52%,0) scale(1); }
          50%{ transform:translate(-46%,5vh) scale(1.14); }
          100%{ transform:translate(-52%,0) scale(1); } }
        @media (prefers-reduced-motion: reduce){ .rs-glow{ animation:none; } }
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

Object.assign(window, { Reveal, useReveal, BlueprintBg, ScrollProgress, useMagnetic });
