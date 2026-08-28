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

/* ---- Space field: sparse drifting stars, faint nebula, comet-trail cursor ---- */
function BlueprintBg() {
  const cv = useRef(null);
  useEffect(() => {
    const canvas = cv.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let w = 0, h = 0, dpr = Math.min(2, devicePixelRatio || 1), raf = 0, t = 0;
    let stars = [], trail = [], mx = -999, my = -999;

    const build = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // sparse: ~1 star per 14k px², three depth layers
      const n = Math.round((w * h) / 14000);
      stars = Array.from({ length: n }, () => {
        const layer = Math.random() < 0.62 ? 0 : (Math.random() < 0.7 ? 1 : 2);
        return {
          x: Math.random() * w, y: Math.random() * h,
          r: layer === 2 ? 1.5 + Math.random() * 0.9 : layer === 1 ? 1.0 + Math.random() * 0.5 : 0.5 + Math.random() * 0.45,
          a: layer === 2 ? 0.75 : layer === 1 ? 0.5 : 0.3,
          vx: (layer + 1) * 0.008 + Math.random() * 0.006,
          tw: Math.random() < 0.22 ? 0.6 + Math.random() * 1.4 : 0,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!coarse && !reduce) {
        for (let i = 0; i < 2; i++) {
          trail.push({ x: mx + (Math.random() - 0.5) * 5, y: my + (Math.random() - 0.5) * 5,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 + 0.16,
            life: 1, r: 0.7 + Math.random() * 1.5 });
        }
        if (trail.length > 240) trail.splice(0, trail.length - 240);
      }
    };

    const draw = () => {
      t += 1;
      const light = document.documentElement.dataset.theme === 'light';
      ctx.clearRect(0, 0, w, h);
      // stars
      for (const s of stars) {
        if (!reduce) { s.x += s.vx; if (s.x > w + 2) s.x = -2; }
        let a = s.a;
        if (s.tw && !reduce) a *= 0.55 + 0.45 * Math.sin(t * 0.012 * s.tw + s.ph);
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = light ? '#2E4257' : '#E8F1F8';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.3) { // faint bloom on the brightest
          ctx.globalAlpha = a * 0.16;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.6, 0, 6.283); ctx.fill();
        }
      }
      // comet trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.006; p.life -= 0.022;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.72;
        ctx.fillStyle = light ? (p.life > 0.62 ? '#4A7FA8' : '#2E6C97') : (p.life > 0.62 ? '#DDF1FC' : '#7EC8F0');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 6.283); ctx.fill();
      }
      // cursor head
      if (mx > -900 && !coarse) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 12);
        if (light) { g.addColorStop(0, 'rgba(46,108,151,0.34)'); g.addColorStop(1, 'rgba(46,108,151,0)'); }
        else { g.addColorStop(0, 'rgba(232,241,248,0.5)'); g.addColorStop(1, 'rgba(126,200,240,0)'); }
        ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(mx, my, 12, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    build(); draw();
    const onResize = () => build();
    addEventListener('resize', onResize);
    addEventListener('mousemove', onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('mousemove', onMove); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <canvas ref={cv} className="rs-stars" />
      <style>{`
        .rs-stars{ position:absolute; inset:0; width:100%; height:100%; }
        [data-theme="light"] .rs-stars{ opacity:0.22; }
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

/* ---- Glass sphere: warm clay/pine swirl under a glossy shell ---- */
function Sphere({ size = 160, style = {} }) {
  return (
    <div className="rs-sphere" style={{ width:size, height:size, ...style }}>
      <div className="rs-sphere-grad" />
      <div className="rs-sphere-glass" />
      <div className="rs-sphere-spec" />
      <style>{`
        .rs-sphere{ position:relative; border-radius:50%; overflow:hidden; isolation:isolate; }
        .rs-sphere::after{ content:''; position:absolute; inset:0; border-radius:50%; z-index:3;
          box-shadow: inset 0 2px 12px rgba(255,255,255,0.24), inset 0 -22px 46px rgba(0,0,0,0.5); }
        .rs-sphere-grad{ position:absolute; inset:-35%; z-index:0;
          background:conic-gradient(from 0deg, var(--sky), var(--teal), var(--sky-soft), var(--sky-deep), var(--sky));
          filter:blur(14px); animation:rsSpin 18s linear infinite; }
        .rs-sphere-glass{ position:absolute; inset:0; z-index:1; border-radius:50%;
          background:radial-gradient(130% 130% at 68% 84%, rgba(0,0,0,0.60), rgba(0,0,0,0.16) 46%, transparent 62%); }
        .rs-sphere-spec{ position:absolute; inset:0; z-index:2; border-radius:50%; mix-blend-mode:screen;
          background:radial-gradient(58% 54% at 32% 26%, rgba(255,255,255,0.72), rgba(255,255,255,0.10) 34%, transparent 56%); }
        @keyframes rsSpin{ to{ transform:rotate(360deg); } }
        @media (prefers-reduced-motion: reduce){ .rs-sphere-grad{ animation:none; } }
      `}</style>
    </div>
  );
}

/* ---- Hero orb: a large partial sphere anchored off the right edge for depth ---- */
function HeroOrb() {
  return (
    <div aria-hidden="true" className="rs-hero-orb">
      <Sphere size="min(60vw, 760px)" />
      <style>{`
        .rs-hero-orb{ position:absolute; top:50%; right:-24vw; transform:translateY(-50%); z-index:0;
          opacity:0.7; pointer-events:none; animation:rsFloat 14s var(--ease-soft) infinite; }
        @media (max-width:1200px){ .rs-hero-orb{ right:-34vw; opacity:0.5; } }
        @keyframes rsFloat{ 0%,100%{ transform:translateY(-52%);} 50%{ transform:translateY(-45%);} }
        @media (max-width:900px){ .rs-hero-orb{ opacity:0.45; right:-34vw; } }
        @media (prefers-reduced-motion: reduce){ .rs-hero-orb{ animation:none; } }
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
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:9500, background:'var(--void)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2.2rem',
      transform: lifted ? 'translateY(-100%)' : 'none',
      transition:'transform 1.1s var(--ease-io)' }}>
      <div style={{ opacity: lifted ? 0 : 1, transform: `scale(${lifted ? 0.9 : 1})`,
        transition:'opacity 0.5s var(--ease-out), transform 0.9s var(--ease-out)' }}>
        <Sphere size="clamp(120px, 22vw, 180px)" />
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.9rem',
        opacity: lifted ? 0 : 1, transition:'opacity 0.4s var(--ease-out)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
          textTransform:'uppercase', color:'rgba(232,241,248,0.5)' }}>Rapheal Suber</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-h2)', fontWeight:'var(--fw-regular)',
          color:'var(--ice)', fontVariantNumeric:'tabular-nums', letterSpacing:'var(--track-tight)' }}>
          {String(n).padStart(3,'0')}
        </div>
        <div style={{ width:180, maxWidth:'40vw', height:1, background:'rgba(232,241,248,0.14)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, transformOrigin:'0 50%', transform:`scaleX(${n/100})`,
            background:'var(--sky)', transition:'transform 0.1s linear' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reveal, useReveal, BlueprintBg, ScrollProgress, useMagnetic, Sphere, HeroOrb, IntroCurtain });
