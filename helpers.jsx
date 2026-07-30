/* ============================================================
   HELPERS — Micro-interactions, Cursor Ring & Ambient Background.
   Linear / Apple Minimal Aesthetic.
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
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, y = '14px', as = 'div', style = {}, ...rest }) {
  const [ref, shown] = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : `translateY(${y})`,
      transition: `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

/* ---- Precision Cursor ---- */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let running = false;
    let raf = null;

    const onMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (!running) {
        running = true;
        animate();
      }
    };

    const animate = () => {
      const dx = x - rx;
      const dy = y - ry;
      rx += dx * 0.22;
      ry += dy * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        raf = requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const onMouseOver = (e) => {
      const isHot = !!e.target.closest('a, button, [data-hot], .case-study-card');
      if (ringRef.current) {
        ringRef.current.setAttribute('data-hot', isHot ? 'true' : 'false');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <style>{`
        @media (pointer: fine) {
          body, a, button { cursor: default; }
        }
        .cursor-ring-elem {
          position: fixed; top: 0; left: 0;
          width: 26px; height: 26px;
          margin-left: -13px; margin-top: -13px;
          border-radius: 999px;
          border: 1px solid var(--border-strong);
          pointer-events: none; z-index: 9998;
          transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
        }
        .cursor-ring-elem[data-hot="true"] {
          width: 44px; height: 44px;
          margin-left: -22px; margin-top: -22px;
          border-color: var(--accent);
          background-color: var(--accent-wash);
        }
        .cursor-dot-elem {
          position: fixed; top: 0; left: 0;
          width: 4px; height: 4px;
          margin-left: -2px; margin-top: -2px;
          border-radius: 999px;
          background-color: var(--accent);
          pointer-events: none; z-index: 9999;
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot-elem" />
      <div ref={ringRef} className="cursor-ring-elem" />
    </div>
  );
}

/* ---- Subtle Ambient Background Spotlight & Grid ---- */
function AmbientBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      bgRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      bgRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={bgRef} aria-hidden="true" style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden'
    }}>
      <style>{`
        .ambient-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.35;
          mask-image: radial-gradient(circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 30vh), #000 0%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 30vh), #000 0%, transparent 80%);
          transition: opacity 0.3s ease;
        }
        .ambient-glow-1 {
          position: absolute; top: -10vw; right: -10vw;
          width: 50vw; height: 50vw;
          border-radius: 999px;
          background: radial-gradient(circle, var(--accent-wash), transparent 70%);
          opacity: 0.6; filter: blur(60px);
          animation: floatSlow 20s ease-in-out infinite alternate;
        }
        .ambient-glow-2 {
          position: absolute; bottom: -10vw; left: -10vw;
          width: 45vw; height: 45vw;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(113, 113, 122, 0.06), transparent 70%);
          opacity: 0.5; filter: blur(80px);
          animation: floatSlow 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes floatSlow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(3vw, 4vw) scale(1.08); }
        }
      `}</style>
      <div className="ambient-grid" />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
    </div>
  );
}

Object.assign(window, { useReveal, Reveal, Cursor, AmbientBackground });
