/* ============================================================
   Portfolio — section content + console composition.
   Home is the console; every channel opens its own screen,
   framed by the same shell and LCD banner.
   Case-study records live in work.jsx.
   ============================================================ */
const { useState: useAppState } = React;

function AboutContent() {
  return (
    <div>
      <div className="about-grid">
        <div className="about-intro">
          <p>
            My background is in software development and technical systems, and I study Human Factors Psychology at Embry-Riddle. I’m interested in understanding how people use technology and applying what I learn to the software I build.
          </p>
          <p>
            I joined Birk Aerosystems as an engineering intern and have since shifted toward developing internal software. I currently build tools to automate manual processes and make quality and engineering work easier for the team.
          </p>
        </div>
        <div className="spec-sheet">
          {[
            ['Education', 'B.S. Human Factors Psychology (STEM) · Embry-Riddle Aeronautical University · Expected March 2028 · GPA 3.7/4.0'],
            ['Coursework', 'HCI · Cognitive Systems Engineering · Research Methods · Technical Writing · HFES member'],
            ['Focus', 'Human-AI interaction · evaluation methodology · user research · technical systems'],
            ['Toolkit', 'Interviews · surveys · usability testing · heuristic evaluation · A/B testing · rubric design · Python · PowerShell · Swift / SwiftUI · React / TypeScript'],
          ].map(([k,v])=>(
            <div key={k} className="spec">
              <div className="console-label">{k}</div>
              <div>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <section className="experience-list" aria-labelledby="experience-heading">
        <p className="console-label">Experience</p>
        <h2 id="experience-heading">Where I’ve worked</h2>
        {[
          ['Birk Aerosystems', 'Engineering Intern, Aerospace Interiors', 'Oct. 2026 – Present', 'Built an internal audit tool for 12 staff at two sites, a supplier certification tracker with automated renewal reminders, a FastAPI and PyMuPDF drawing-review app for human verification, and five custom private jet interior components in CATIA.'],
          ['Handshake AI', 'AI Evaluation Specialist · Contract', 'Oct. 2025 – Oct. 2026', 'Evaluated 500+ AI outputs weekly. Built an interaction bug taxonomy adopted by a 12-person team and wrote seven communication rubrics used by hundreds of contractors.'],
          ['Prox', 'UX Engineer · Contract', 'Apr. 2026 – June 2026', 'Research with 250–300 monthly users informed a 12-screen onboarding flow. Sign-ups rose 30–40%, with 500+ users onboarded. Shipped SwiftUI features and extended the iOS design system.'],
          ['Wazzle AI', 'Software Engineer · Part Time', 'Aug. 2023 – Sept. 2025', 'Synthesized 50+ customer conversations and support tickets. Onboarding changes cut related support requests by 35%; helped trace and fix a six-second signup delay in Django.'],
          ['Greenville County', 'Technical Support Engineer', 'June 2018 – Dec. 2022', 'Cut device setup from two hours to under 20 minutes for 150+ annual hires. Updated 200+ polling devices and delivered 20+ statewide election technology sessions to 300+ attendees.'],
        ].map(([company,role,period,description],i)=><Reveal as="article" key={company} delay={i*70} y="12px"><span className="experience-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><div><div className="experience-head"><h3>{company}</h3><span>{period}</span></div><p className="experience-role">{role}</p><p>{description}</p></div></Reveal>)}
      </section>
    </div>
  );
}

const CONTACT_EMAIL = 'raphealsuberusca@gmail.com';

function ContactContent({ onOpen }) {
  const [copied, setCopied] = useAppState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      // Clipboard blocked: select the address so it can be copied by hand.
      const el = document.getElementById('contact-email');
      const range = document.createRange(); range.selectNodeContents(el);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    }
  };
  const roles = ['Software Engineering', 'Human Factors Engineering', 'UX Research', 'Product Design', 'Human-Systems Integration'];
  return (
    <div className="contact-grid">
      <div className="lcd-screen lcd-live contact-card">
        <div className="lcd-status"><span>Player 2</span><span><Led />Ready</span></div>
        <div className="contact-card-body">
          <p className="console-label">Open to roles in</p>
          <ul className="role-list">{roles.map((r, i) => <li key={r} className="pop-in" style={{ '--i': i }}>{r}</li>)}</ul>
          <p className="console-label">Email me</p>
          <p id="contact-email" className="contact-email">{CONTACT_EMAIL}</p>
          <div className="contact-actions">
            <a className="start-button" href={'mailto:' + CONTACT_EMAIL}><span className="press" aria-hidden="true">▶</span> Send an email</a>
            <button className="start-button ghost" onClick={copy}>{copied ? '✓ Copied' : 'Copy address'}</button>
          </div>
          <span role="status" className="sr-only">{copied ? 'Email address copied' : ''}</span>
        </div>
      </div>
      <div className="contact-side">
        <a className="contact-tile" href="https://www.linkedin.com/in/raphealsuber/" target="_blank" rel="noopener">
          <span className="console-label">LinkedIn</span><strong>in/raphealsuber</strong><b aria-hidden="true">↗</b>
        </a>
        <a className="contact-tile" href="https://github.com/manyworldss" target="_blank" rel="noopener">
          <span className="console-label">GitHub</span><strong>manyworldss</strong><b aria-hidden="true">↗</b>
        </a>
        <button className="contact-tile" onClick={() => onOpen('work')}>
          <span className="console-label">Case studies</span><strong>See the work first</strong><b aria-hidden="true">→</b>
        </button>
      </div>
    </div>
  );
}

/* ---- Banner sprites: one small ASCII loop per channel ---- */
const bannerPad = (s, w) => s + ' '.repeat(Math.max(0, w - s.length));

/* Case studies: a cartridge drops into the console, loads, and ejects. */
function cartridgeFrames() {
  const labels = WORK.filter((w) => !w.upcoming).map((w) => w.code.replace('-', '').slice(0, 4));
  const blank = ' '.repeat(20), out = [];
  labels.forEach((label) => {
    const cart = ['     .--------.     ', '     |  ____  |     ', '     | |' + label + '| |     ', "     '--------'     "];
    const frame = (y, msg) => {
      const rows = [blank, blank, blank, blank];
      cart.forEach((line, j) => { if (y + j < 4) rows[y + j] = line; });
      rows.push(' ___[__________]___ ', '|' + ' '.repeat(18) + '|', '| ' + bannerPad(msg, 16) + ' |', '|' + '_'.repeat(18) + '|');
      return rows.join('\n');
    };
    out.push(frame(0, '> INSERT'), frame(0, '> INSERT'), frame(1, '> INSERT'), frame(2, '> INSERT'), frame(3, '> INSERT'));
    for (let k = 0; k <= 4; k++) out.push(frame(3, 'LOAD [' + '#'.repeat(k) + ' '.repeat(4 - k) + ']'));
    out.push(frame(3, '> START'), frame(3, ''), frame(3, '> START'), frame(3, '> START'));
    out.push(frame(2, '  EJECT'), frame(1, '  EJECT'), frame(0, '  EJECT'));
  });
  return out;
}

/* About: player one walks to the star while the XP bar fills, then levels up. */
function walkerFrames() {
  const out = [];
  const scene = (head, x, arms, legs, xp, top) => [
    bannerPad(top, 20), head, bannerPad(' '.repeat(x) + arms, 20), bannerPad(' '.repeat(x) + legs, 20),
    ' ' + '='.repeat(18) + ' ', bannerPad(' XP [' + '#'.repeat(xp) + '-'.repeat(12 - xp) + ']', 20),
  ].join('\n');
  for (let x = 1; x <= 15; x++) {
    const head = bannerPad(' '.repeat(x) + ' o ', 20).split('');
    if (x < 15) head[17] = '*';
    out.push(scene(head.join(''), x, '/|\\', x % 2 ? '/ \\' : ' | ', Math.round(((x - 1) / 14) * 12), ' PLAYER 1'));
  }
  for (let b = 0; b < 5; b++) {
    out.push(scene(bannerPad(' '.repeat(15) + '\\o/', 20), 15, ' | ', '/ \\', 12, b % 2 ? ' PLAYER 1' : ' PLAYER 1  LEVEL UP!'));
  }
  return out;
}

/* Currently: equalizer bars. */
function equalizerFrames() {
  const out = [];
  for (let f = 0; f < 24; f++) {
    const h = [0, 1, 2, 3, 4, 5, 6].map((i) => 1 + Math.round(4 * Math.abs(Math.sin(f * 0.55 + i * 1.7) * Math.cos(f * 0.21 + i * 0.6))));
    const rows = [];
    for (let r = 5; r >= 1; r--) rows.push(h.map((v) => (v >= r ? '##' : '  ')).join(' '));
    rows.push('-'.repeat(20));
    out.push(rows.join('\n'));
  }
  return out;
}

/* Contact: an envelope sends out a signal, with a blinking prompt. */
function signalFrames() {
  const env = [' .--------. ', ' |\\      /| ', " | '.__.' | ", " '--------' "];
  const out = [];
  for (let f = 0; f < 8; f++) {
    const waves = [0, 1, 2].map((i) => (i < Math.min(f, 3) ? ')  ' : '   ')).join('');
    out.push([env[0], env[1] + ' ' + waves, env[2] + ' ' + waves, env[3], f % 2 ? '' : ' > PRESS START']
      .map((r) => bannerPad(r, 22)).join('\n'));
  }
  return out;
}

const BANNER_ART = {
  work:      { frames: cartridgeFrames(), fps: 5 },
  about:     { frames: walkerFrames(),    fps: 6 },
  currently: { frames: equalizerFrames(), fps: 6 },
  contact:   { frames: signalFrames(),    fps: 4 },
};

function SectionView({ channel, label, title, intro, status = 'Ready', art, onBack, children }) {
  // The intro prints in once the title has finished typing.
  const printDelay = 180 + title.length * 55 + 120;
  return (
    <div className="rs-viewin section-view">
      <div className="rs-viewin-1 section-topbar">
        <button data-hot onClick={onBack} className="rs-back"><span aria-hidden="true">←</span> Console</button>
      </div>
      <header className="rs-viewin-2 screen-shell">
        <div className="handheld-rim"><span><i /> Rapheal Suber / Portfolio</span><span>CH {channel} / 04</span></div>
        <div className="lcd-screen lcd-live screen-banner">
          <div className="lcd-status"><span>CH {channel} / {label}</span><span><Led />{status}</span></div>
          <div className="banner-body">
            <div>
              <h1><TypeOn text={title} /></h1>
              {intro && <p className="banner-intro" style={{ '--print-delay': printDelay + 'ms' }}>{intro}</p>}
            </div>
            {art && <AsciiLoop className="banner-art" frames={art.frames} fps={art.fps} />}
          </div>
        </div>
      </header>
      <div className="rs-viewin-3">{children}</div>
      <style>{`
        /* The frame settles first, then the content rises under it,
           so the swap reads as a console changing channel. */
        @keyframes rsRise{ from{ opacity:0; transform:translate3d(0,26px,0); } to{ opacity:1; transform:none; } }
        @keyframes rsRiseSoft{ from{ opacity:0; transform:translate3d(0,14px,0); } to{ opacity:1; transform:none; } }
        .rs-viewin-1{ animation:rsRiseSoft 0.55s cubic-bezier(0.16,1,0.3,1) 0.02s both; }
        .rs-viewin-2{ animation:rsRise 0.78s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
        .rs-viewin-3{ animation:rsRise 0.86s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        @media (prefers-reduced-motion: reduce){
          .rs-viewin-1,.rs-viewin-2,.rs-viewin-3{ animation:none; }
        }
      `}</style>
    </div>
  );
}

const APP_VIEWS = ['work','about','currently','contact'];
const viewFromHash = () => {
  const h = location.hash.slice(1);
  return APP_VIEWS.includes(h) ? h : (h === '' ? 'home' : null);
};

function App() {
  const [view, setView] = useAppState(viewFromHash() || 'home');
  const [openCase, setOpenCase] = useAppState(null);

  const goTo = (id, color) => {
    if (id === view) return;
    setView(id);
    history.pushState(null, '', id === 'home' ? location.pathname + location.search : '#'+id);
    requestAnimationFrame(() => window.scrollTo(0,0));
  };

  // Keep the view in sync with Back/Forward and hand-typed hashes.
  React.useEffect(() => {
    const sync = () => {
      const next = viewFromHash();
      if (!next) return;
      setOpenCase(null);
      setView(next);
      requestAnimationFrame(() => window.scrollTo(0,0));
    };
    addEventListener('popstate', sync);
    addEventListener('hashchange', sync);
    return () => { removeEventListener('popstate', sync); removeEventListener('hashchange', sync); };
  }, []);
  const onOpen = (id, color) => {
    if (id === 'home') return goTo('home', color);
    if (APP_VIEWS.includes(id)) return goTo(id, color);
    // a case-study id → open the detail takeover
    setOpenCase(WORK.find((w) => w.id === id));
  };
  const home = () => goTo('home');

  return (
    <React.Fragment>
      {view !== 'home' && <BlueprintBg />}
      <ScrollProgress />

      <Nav onOpen={onOpen} onHome={home} view={view} />
      <main id="top" style={{ position:'relative', zIndex:1 }}>
        {view === 'home' && <Hero onOpen={onOpen} />}
        {view === 'work' && (
          <SectionView channel="01" label="Case Studies" title="Case studies" art={BANNER_ART.work}
            intro="A few projects I’ve worked on, including one I’m still building. Pick a cartridge to see what I did and why."
            status={WORK.filter((w) => !w.upcoming).length + ' cartridges'} onBack={home}>
            <CaseStudies items={WORK} onOpen={onOpen} />
            <Footer onOpen={onOpen} current="work" />
          </SectionView>
        )}
        {view === 'about' && (
          <SectionView channel="02" label="About" title="A little about me" art={BANNER_ART.about} onBack={home}>
            <AboutContent />
            <Footer onOpen={onOpen} current="about" />
          </SectionView>
        )}
        {view === 'currently' && (
          <SectionView channel="03" label="Currently" title="Currently playing" art={BANNER_ART.currently}
            intro="The films, shows, books, and records I keep coming back to. A new pick loads each day."
            status="New pick daily" onBack={home}>
            <Currently />
            <Footer onOpen={onOpen} current="currently" />
          </SectionView>
        )}
        {view === 'contact' && (
          <SectionView channel="04" label="Contact" title="Let's work together." art={BANNER_ART.contact}
            intro="If you have a role or project you think I’d be a good fit for, email is the best way to reach me."
            onBack={home}>
            <ContactContent onOpen={onOpen} />
            <div className="signoff-foot standalone"><span>© 2026 Rapheal Suber</span><span>Designed and built by me.</span></div>
          </SectionView>
        )}
      </main>

      <CaseOverlay item={openCase} onClose={() => setOpenCase(null)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
