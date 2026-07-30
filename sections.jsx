/* ============================================================
   SECTIONS — Nav, Minimal Hero, Case Studies List, Footer.
   Apple/Linear Minimal Engineering Aesthetic.
   ============================================================ */
const { useState: useStateS, useRef: useRefS } = React;

/* ---- Nav ---- */
function Nav({ activeTab, onOpen }) {
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Case Studies', id: 'work' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '60px', padding: '0 clamp(1.25rem, 4vw, 3rem)',
      backgroundColor: 'rgba(var(--bg-rgb, 250, 250, 250), 0.85)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-strong)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
        Rapheal Suber <span style={{ color: 'var(--accent)', marginLeft: '0.2rem' }}>/</span>
      </a>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.8rem, 2vw, 1.6rem)' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpen(item.id)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              letterSpacing: 'var(--track-label)', textTransform: 'uppercase',
              color: activeTab === item.id ? 'var(--accent)' : 'var(--text-muted)',
              background: 'none', border: 'none', padding: '0.4rem 0.2rem',
              cursor: 'pointer', position: 'relative',
              transition: 'color 0.2s ease'
            }}
          >
            {item.label}
          </button>
        ))}
        <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 0.4rem' }} />
        <ThemeToggle />
      </nav>
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useStateS(() => document.documentElement.dataset.theme === 'dark');
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('rs-theme', next ? 'dark' : 'light'); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem', letterSpacing: 'var(--track-label)', textTransform: 'uppercase',
        color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer'
      }}>
      <span style={{
        width: 7, height: 7, borderRadius: '999px',
        background: dark ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'background 0.2s ease'
      }}></span>
      {dark ? 'Dark' : 'Light'}
    </button>
  );
}

/* ---- Hero Section ---- */
function Hero({ onOpen }) {
  return (
    <section style={{
      minHeight: '82vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '100px clamp(1.25rem, 5vw, 4rem) 60px',
      maxWidth: '1200px', margin: '0 auto', width: '100%'
    }}>
      <Reveal delay={100}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-pill)',
          background: 'var(--bg-inset)', border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)',
          color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '999px', background: 'var(--accent)' }} />
          HUMAN FACTORS PSYCHOLOGY STUDENT | AI RELIABILITY | TECHNICAL OPERATIONS
        </div>
      </Reveal>

      <Reveal delay={200}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-hero)', lineHeight: 'var(--leading-hero)',
          letterSpacing: 'var(--track-hero)', color: 'var(--text-strong)',
          maxWidth: '24ch', margin: '0 0 1.75rem 0'
        }}>
          Building better systems through human-centered thinking.
        </h1>
      </Reveal>

      <Reveal delay={300}>
        <p style={{
          maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body-lg)',
          color: 'var(--text-muted)', margin: '0 0 2.5rem 0'
        }}>
          Accelerated B.S./M.S. student in Human Factors Psychology at Embry-Riddle. I work across AI reliability evaluation, clinical software, workflow automation, and technical operations to eliminate use-errors and reduce cognitive workload in high-stakes systems.
        </p>
      </Reveal>

      <Reveal delay={400}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { const w = document.querySelector('#case-studies'); if (w) w.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: 'var(--text-strong)',
              border: 'none', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.6rem',
              cursor: 'pointer', transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Explore Case Studies ↓
          </button>
          <button
            onClick={() => onOpen('contact')}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase', color: 'var(--text-strong)', backgroundColor: 'transparent',
              border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.6rem',
              cursor: 'pointer', transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-inset)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Get In Touch ↗
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---- Case Studies List Section ---- */
function CaseStudies({ items, onSelectCaseStudy }) {
  return (
    <section id="case-studies" style={{
      padding: '80px clamp(1.25rem, 5vw, 4rem)',
      maxWidth: '1200px', margin: '0 auto', width: '100%',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ marginBottom: '3.5rem' }}>
        <Reveal>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem'
          }}>
            01 / Engineering &amp; Human Factors
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-display)',
            lineHeight: 'var(--leading-display)', letterSpacing: 'var(--track-display)',
            color: 'var(--text-strong)', margin: 0
          }}>
            Case Studies
          </h2>
          <p style={{
            marginTop: '0.75rem', maxWidth: '52ch', fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)', color: 'var(--text-muted)'
          }}>
            Rigorous analysis of problem solving, human-system interactions, AI output reliability, and cognitive load reduction.
          </p>
        </Reveal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {items.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 80}>
            <CaseStudyCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CaseStudyCard({ item }) {
  const [hovered, setHovered] = useStateS(false);

  return (
    <a
      href={item.page || `${item.id}.html`}
      className="case-study-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem', padding: '2rem', borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-raised)', border: `1px solid ${hovered ? 'var(--accent-line)' : 'var(--border)'}`,
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.06)' : 'none',
        textDecoration: 'none', color: 'inherit',
        cursor: 'pointer', transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'none'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)',
            color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.8rem'
          }}>
            <span>{item.code}</span>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>{item.domain}</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h2)',
            lineHeight: 'var(--leading-h2)', color: 'var(--text-strong)', margin: '0 0 0.8rem 0'
          }}>
            {item.title}
          </h3>

          <p style={{
            fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
            color: 'var(--text-muted)', margin: 0
          }}>
            {item.summary}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
              padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-inset)', color: 'var(--text-muted)',
              border: '1px solid var(--border)'
            }}>
              {tag}
            </span>
          ))}
          <span style={{
            marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: hovered ? 'var(--accent)' : 'var(--text-strong)', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            transition: 'color 0.2s ease'
          }}>
            Read Case Study →
          </span>
        </div>
      </div>

      {item.thumb && (
        <div style={{
          width: '100%', height: '220px', borderRadius: 'var(--radius-md)',
          overflow: 'hidden', backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border)'
        }}>
          <img
            src={item.thumb}
            alt={item.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: hovered ? 'none' : 'grayscale(15%)',
              transition: 'filter 0.3s ease, transform 0.3s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)'
            }}
          />
        </div>
      )}
    </a>
  );
}

/* ---- Footer ---- */
function Footer({ onOpen }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '60px clamp(1.25rem, 5vw, 4rem)',
      maxWidth: '1200px', margin: '0 auto', width: '100%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '2rem'
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600,
          color: 'var(--text-strong)', marginBottom: '0.4rem'
        }}>
          Rapheal Suber
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)'
        }}>
          Human Factors Psychology &amp; Systems Reliability
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button
          onClick={() => onOpen('contact')}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase',
            color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: 'var(--track-label)'
          }}
        >
          Get In Touch ↗
        </button>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, CaseStudies, Footer });
