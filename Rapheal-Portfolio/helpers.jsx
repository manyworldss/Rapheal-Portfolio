/* ============================================================
   Portfolio — shared helpers. Minimal, engineering-grade.
   Scroll reveals + light theme boot. Dynamic Starfield & Cursor.
   ============================================================ */
const { useState, useEffect, useRef } = React;

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) { setShown(true); return; }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.16 });
    io.observe(el);
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

/* ---- Creative Celestial Space Engine: 3D parallax, diffraction glints, constellation lines, meteors ---- */
function BlueprintBg() {
  const cv = useRef(null);
  useEffect(() => {
    const canvas = cv.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let w = 0, h = 0, dpr = Math.min(2, window.devicePixelRatio || 1), raf = 0, t = 0;
    let stars = [], meteors = [], mx = -999, my = -999, targetMx = -999, targetMy = -999;
    let nextMeteorTime = 180 + Math.random() * 240;

    // Helper: 4-point telescope diffraction spike for bright celestial bodies
    const drawSpike = (x, y, r, a, color) => {
      const len = r * 5.2;
      ctx.globalAlpha = a * 0.45;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(x - len, y); ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len); ctx.lineTo(x, y + len);
      ctx.stroke();
    };

    const build = () => {
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Balanced density: tuned for 60fps on retina and mobile
      const densityDivisor = coarse ? 14000 : 8500;
      const n = Math.min(180, Math.round((w * h) / densityDivisor));

      stars = Array.from({ length: n }, () => {
        // Layer 0: distant micro-stars (55%), Layer 1: midground (32%), Layer 2: bright beacons (13%)
        const rand = Math.random();
        const layer = rand < 0.55 ? 0 : (rand < 0.87 ? 1 : 2);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          layer,
          r: layer === 2 ? 1.8 + Math.random() * 0.9 : layer === 1 ? 1.1 + Math.random() * 0.5 : 0.55 + Math.random() * 0.45,
          baseAlpha: layer === 2 ? 0.88 : layer === 1 ? 0.62 : 0.38,
          vx: (layer + 1) * 0.012 + Math.random() * 0.008,
          vy: (Math.random() - 0.5) * 0.006,
          twinkleSpeed: 0.015 + Math.random() * 0.025,
          twinklePhase: Math.random() * Math.PI * 2,
          hasSpikes: layer === 2 && Math.random() < 0.65,
          hueShift: Math.random() < 0.28 ? 'blue' : (Math.random() < 0.16 ? 'cyan' : 'white'),
        };
      });
    };

    const spawnMeteor = () => {
      if (reduce) return;
      const startX = Math.random() * (w * 0.8) + (w * 0.1);
      const startY = Math.random() * (h * 0.4);
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 deg descent
      const speed = 7 + Math.random() * 6;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 70 + Math.random() * 80,
        life: 1.0,
        decay: 0.014 + Math.random() * 0.012,
        r: 1.4 + Math.random() * 0.8,
      });
    };

    const onMove = (e) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
    };

    const draw = () => {
      t += 1;
      // Smooth cursor interpolation
      mx += (targetMx - mx) * 0.08;
      my += (targetMy - my) * 0.08;

      const light = document.documentElement.dataset.theme === 'light';
      ctx.clearRect(0, 0, w, h);

      // 1. Atmospheric Deep-Space Nebulae (subtle cosmic gradient dust)
      if (!light) {
        const neb1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 0, w * 0.25, h * 0.3, Math.max(w, h) * 0.55);
        neb1.addColorStop(0, 'rgba(18, 51, 58, 0.18)');
        neb1.addColorStop(0.6, 'rgba(27, 35, 64, 0.08)');
        neb1.addColorStop(1, 'rgba(5, 7, 12, 0)');
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, w, h);

        const neb2 = ctx.createRadialGradient(w * 0.75, h * 0.65, 0, w * 0.75, h * 0.65, Math.max(w, h) * 0.45);
        neb2.addColorStop(0, 'rgba(46, 108, 151, 0.12)');
        neb2.addColorStop(0.7, 'rgba(18, 24, 38, 0.04)');
        neb2.addColorStop(1, 'rgba(5, 7, 12, 0)');
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Faint Astronomical Coordinate Grid
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = light ? 'rgba(15, 23, 42, 0.035)' : 'rgba(126, 200, 240, 0.025)';
      const step = 140;
      ctx.beginPath();
      for (let x = 0; x < w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y < h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // 3. Dynamic Constellation Connections
      const maxConnDist = coarse ? 55 : 85;
      const connDistSq = maxConnDist * maxConnDist;
      ctx.lineWidth = 0.65;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        if (a.layer === 0) continue; // Only mid and foreground stars form constellations
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          if (b.layer === 0) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < connDistSq) {
            const prox = 1 - (d2 / connDistSq);
            let alpha = prox * (light ? 0.07 : 0.11);
            // Interactive mouse proximity boost
            if (mx > 0) {
              const mdx = (a.x + b.x) * 0.5 - mx;
              const mdy = (a.y + b.y) * 0.5 - my;
              if (mdx * mdx + mdy * mdy < 20000) {
                alpha *= 2.2;
              }
            }
            ctx.globalAlpha = Math.min(0.35, alpha);
            ctx.strokeStyle = light ? '#0284C7' : '#7EC8F0';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 4. Render Stars with Depth & Telescope Spikes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x > w + 4) s.x = -4;
          if (s.y > h + 4) s.y = -4;
          if (s.y < -4) s.y = h + 4;
        }

        let a = s.baseAlpha;
        if (!reduce) {
          a *= (0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
        }

        const starColor = light
          ? (s.hueShift === 'blue' ? '#0369A1' : (s.hueShift === 'cyan' ? '#0891B2' : '#0F172A'))
          : (s.hueShift === 'blue' ? '#A8DCF7' : (s.hueShift === 'cyan' ? '#9BDCD6' : '#FFFFFF'));

        // Core star point
        ctx.globalAlpha = light ? Math.min(1, a * 0.85) : Math.min(1, a);
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric halo & optical spikes for major beacons
        if (s.layer === 2) {
          // Soft outer glow
          ctx.globalAlpha = light ? a * 0.16 : a * 0.24;
          ctx.fillStyle = light ? '#0284C7' : '#7EC8F0';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.8, 0, Math.PI * 2);
          ctx.fill();

          // 4-point telescope glint
          if (s.hasSpikes && !reduce) {
            drawSpike(s.x, s.y, s.r, a, light ? '#0284C7' : '#DDF1FC');
          }
        }
      }

      // 5. Shooting Meteors
      if (t >= nextMeteorTime) {
        spawnMeteor();
        nextMeteorTime = t + (coarse ? 400 : 220) + Math.random() * 320;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > w + 100 || m.y > h + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len * m.life;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len * m.life;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, 'rgba(126, 200, 240, 0)');
        grad.addColorStop(0.7, light ? `rgba(2, 132, 199, ${m.life * 0.4})` : `rgba(168, 220, 247, ${m.life * 0.5})`);
        grad.addColorStop(1, light ? `rgba(15, 23, 42, ${m.life * 0.95})` : `rgba(255, 255, 255, ${m.life})`);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.r * m.life;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Meteor luminous head
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(headX, headY, m.r * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const onResize = () => build();
    const onVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <canvas ref={cv} className="rs-stars" />
      <style>{`
        .rs-stars{ position:absolute; inset:0; width:100%; height:100%; will-change:transform; }
        [data-theme="light"] .rs-stars{ opacity:0.85; }
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

/* ---- Glass sphere ---- */
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

/* ---- Hero orb ---- */
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

/* ---- Intro curtain ---- */
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
