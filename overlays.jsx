/* ============================================================
   OVERLAYS - Panels for About, Experience, Resume, Contact & Case Studies.
   Geist & Monochrome Engineering Aesthetics.
   ============================================================ */
const { useState: useStateO, useEffect: useEffectO } = React;

/* ---- Generic Slide-Over Panel ---- */
function Panel({ open, onClose, children }) {
  useEffectO(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.2s ease-out'
    }} onClick={onClose}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '720px', height: '100%',
          backgroundColor: 'var(--bg-raised)', borderLeft: '1px solid var(--border)',
          overflowY: 'auto', padding: 'clamp(2rem, 5vw, 3.5rem)',
          display: 'flex', flexDirection: 'column', gap: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase', color: 'var(--text-muted)', backgroundColor: 'var(--bg-inset)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.8rem',
              cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '0.4rem'
            }}
          >
            ← Close [ESC]
          </button>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

function PanelTitle({ index, children }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)',
        textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem'
      }}>
        {index}
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)',
        lineHeight: 'var(--leading-h1)', color: 'var(--text-strong)', margin: 0
      }}>
        {children}
      </h2>
    </div>
  );
}

/* ---- About Content ---- */
function AboutContent() {
  return (
    <div>
      <PanelTitle index="01 / Background">About</PanelTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-strong)' }}>
          I study human performance, cognition, and systems error prevention to make technical tools and complex workflows safe and reliable.
        </p>
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)' }}>
          I am pursuing an accelerated B.S./M.S. degree in Human Factors Psychology at Embry-Riddle Aeronautical University. My focus lies at the intersection of human cognitive ergonomics, AI reliability auditing, and technical operations-designing workflows that fail gracefully when humans are under stress or high workload.
        </p>
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)' }}>
          Having engineered full-stack applications and performed empirical evaluations on LLM models, I bridge engineering teams and human factors principles to turn complex system requirements into predictable human-system performance.
        </p>
      </div>

      <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.8rem' }}>
          Education
        </div>
        <div style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: 'var(--text-strong)' }}>
          B.S. / M.S. Human Factors Psychology
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Embry-Riddle Aeronautical University · Accelerated Program
        </div>
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
          Core Competencies
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            ['Human Factors', 'Cognitive Task Analysis', 'Usability Testing', 'Error Classification'],
            ['AI Reliability', 'LLM Evaluation', 'Safety Auditing', 'Edge-Case Analysis'],
            ['Systems Ops', 'Workflow Automation', 'Technical Support', 'Documentation']
          ].map((col, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-inset)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-strong)', marginBottom: '0.5rem' }}>{col[0]}</div>
              {col.slice(1).map((item) => (
                <div key={item} style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 'var(--track-label)' }}>
          Personal Notes &amp; Pursuits
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
          Flight &amp; space systems, endurance running, culinary experimentation, and reading foundational texts on systems thinking.
        </p>
      </div>
    </div>
  );
}


/* ---- Resume Content ---- */
function ResumeContent() {
  return (
    <div>
      <PanelTitle index="03 / Credentials">Resume</PanelTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 1.25rem', backgroundColor: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-strong)' }}>Rapheal Suber - Curriculum Vitae</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Human Factors &amp; AI Reliability Focus</div>
        </div>
        <a
          href="reach.html"
          target="_blank"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase',
            color: '#FFFFFF', backgroundColor: 'var(--text-strong)', padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)', textDecoration: 'none', letterSpacing: 'var(--track-label)'
          }}
        >
          View / Print PDF
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: 'var(--track-label)', marginBottom: '0.75rem' }}>
            Education
          </h3>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-strong)' }}>
            Accelerated B.S. / M.S. in Human Factors Psychology
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Embry-Riddle Aeronautical University
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: 'var(--track-label)', marginBottom: '0.75rem' }}>
            Technical &amp; Research Domains
          </h3>
          <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.7' }}>
            <li>Human Factors Engineering &amp; Cognitive Ergonomics</li>
            <li>AI Evaluation &amp; Safety Taxonomy Scoring</li>
            <li>Workflow Automation &amp; System Telemetry</li>
            <li>Clinical SaaS &amp; Medical Outcome Tracking</li>
            <li>Python, JavaScript/TypeScript, React, Django, SQL</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---- Contact Content ---- */
function ContactContent() {
  const links = [
    ['Email', 'raphealsuber@gmail.com', 'mailto:raphealsuber@gmail.com'],
    ['LinkedIn', 'linkedin.com/in/raphealsuber', 'https://www.linkedin.com/in/raphealsuber/'],
    ['GitHub', 'github.com/manyworldss', 'https://github.com/manyworldss'],
  ];

  return (
    <div>
      <PanelTitle index="04 / Connect">Contact</PanelTitle>
      <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Open to technical opportunities in Human Factors, AI Reliability, Manufacturing, Technical Operations, and Systems Improvement.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {links.map(([label, value, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1.25rem', borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-inset)', border: '1px solid var(--border)',
              textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s ease'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: 'var(--track-label)' }}>{label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-strong)', marginTop: '0.2rem' }}>{value}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---- Case Study Overlay ---- */
function CaseStudyOverlay({ caseStudy, onClose }) {
  if (!caseStudy) return null;

  return (
    <Panel open={!!caseStudy} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--track-label)', marginBottom: '0.5rem' }}>
            {caseStudy.code} · {caseStudy.domain}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-h1)', color: 'var(--text-strong)', margin: 0 }}>
            {caseStudy.title}
          </h1>
          {caseStudy.page && (
            <a
              href={caseStudy.page}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: 'var(--accent)', textDecoration: 'none', textTransform: 'uppercase'
              }}
            >
              Open Full Standalone Report ↗
            </a>
          )}
        </div>

        {/* 5 Engineering Headings */}
        {[
          ['01. Problem', caseStudy.problem],
          ['02. Constraints', caseStudy.constraints],
          ['03. Approach', caseStudy.approach],
          ['04. Outcome', caseStudy.outcome],
          ['05. Lessons Learned', caseStudy.lessonsLearned]
        ].map(([title, content]) => (
          <div key={title} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
              {title}
            </h3>
            <div style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {content}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

Object.assign(window, { Panel, AboutContent, ResumeContent, ContactContent, CaseStudyOverlay });
