/* ============================================================
   APP — Root Application & Case Studies Data
   Refocused on Human Factors Psychology, AI Reliability & Systems Engineering.
   ============================================================ */
const { useState: useAppState, useEffect: useAppEffect } = React;

const WORK = [
  {
    id: 'reach',
    code: 'CS-01',
    title: 'Reach: Clinical Rehab & Motor Recovery System',
    domain: 'Human Factors · Clinical Systems',
    tags: ['Human Factors', 'Clinical Ergonomics', 'Cognitive Workload', 'Full-Stack'],
    thumb: './assets/work/reach-card.jpg',
    page: 'reach.html',
    summary: 'A clinical caseload and outcome-tracking platform for rehab therapists treating upper-extremity motor recovery after stroke, built so clinicians can parse recovery trajectories in seconds.',
    problem: `Standardized outcome measures (Fugl-Meyer Assessment, Action Research Arm Test) are critical for tracking stroke recovery but are documented inconsistently due to high time pressure and fragmented clinical systems. Furthermore, home exercise adherence—the primary driver of long-term recovery—is invisible between sessions, forcing therapists to make clinical decisions without reliable workload data.`,
    constraints: `Strict clinical time limits per patient (typically 30–45 minutes total session time), zero tolerance for complex data entry during patient interaction, heterogeneous severity levels (mild, moderate, severe), and non-standardized EHR integration requirements.`,
    approach: `Conducted iterative co-design sessions with three licensed occupational therapists. Engineered an outcome-driven architecture where baseline assessment scores (FMA-UE) automatically route patients into severity-banded programs. Implemented an early-warning signal that surfaces patients whose home adherence drops below 60%, and auto-generates EMR documentation blurbs to eliminate redundant typing.`,
    outcome: `Reduced clinical charting overhead, eliminated double-entry of outcome metrics, and provided therapists with an instant glance of caseload trajectory before patient entry.`,
    lessonsLearned: `Tools designed for high-stress human environments must carry the documentation burden automatically; if an interface requires extra manual input during a high-workload task, clinicians will abandon it.`
  },
  {
    id: 'celio',
    code: 'CS-02',
    title: 'Celio: Offline-First Critical Information System',
    domain: 'Cognitive Reliability · Medical Safety',
    tags: ['Offline Systems', 'Cognitive Load', 'WebLLM', 'Fail-Safe UX'],
    thumb: './assets/work/celio-landing.png',
    page: 'celio.html',
    summary: 'An offline-first communication and travel platform tackling the severe cognitive load and risk of medical miscommunication for Celiacs travelling in low-connectivity environments.',
    problem: `Celiac travelers face acute anxiety and high medical risk (severe autoimmune reactions) when communicating dietary requirements in foreign languages. Server-dependent translation tools fail in remote regions or low-connectivity dining environments, creating a severe single point of failure.`,
    constraints: `Zero internet dependency requirement (must work reliably in airplane mode or remote areas), low latency execution on mobile hardware, zero hallucination tolerance for medical dietary cards, and simple, high-visibility contrast UI suitable for noisy or stressful environments.`,
    approach: `Engineered an offline-first architecture utilizing WebLLM for client-side local model inference, eliminating cloud API calls. Built a deterministic 12-language Translation Card system with local text-to-speech, exportable directly to native Apple & Google Wallet passes for offline verification.`,
    outcome: `Delivered sub-second translation rendering and offline AI query responses with 0% server latency, ensuring patients maintain critical communication capabilities regardless of network availability.`,
    lessonsLearned: `For safety-critical human tasks, offline-first reliability is not a feature—it is the core safety requirement. High-anxiety users demand deterministic, non-probabilistic fallbacks.`
  },
  {
    id: 'materialsiq',
    code: 'CS-03',
    title: 'MaterialIQ: Objective Quality in the Shopping Cart',
    domain: 'AI Quality Analysis · Browser Extension',
    tags: ['Browser Extension', 'AI Parsing', 'Quality Analysis', 'FastAPI'],
    thumb: './images/materialsIQ/hero.png',
    page: 'materialsiq.html',
    summary: 'An AI-powered browser extension that analyzes product quality, material composition, and value for money in real time while shopping online.',
    problem: 'Consumers spend hundreds of dollars on products assuming high quality, often struggling to understand material blends, construction details, and fair pricing. Without objective data, price is often falsely equated with durability.',
    constraints: 'The tool must parse unstructured e-commerce product descriptions and specifications in real time directly within the browser, requiring low-latency inference and clear, transparent rule-based scoring engines so users understand exactly how scores are derived.',
    approach: 'Developed an AI-powered Chrome extension backed by FastAPI. The system extracts fiber composition and fabric weight to calculate a Material Quality Score, infers a Durability Estimate from construction cues, and computes an objective Value Score to determine if the item is worth its asking price.',
    outcome: 'Launched MaterialIQ (Beta) on the Chrome Web Store with Skimlinks integration, providing shoppers with instant, transparent scoring directly in their shopping carts to remove purchasing uncertainty.',
    lessonsLearned: 'Building consumer trust requires extreme transparency in algorithmic scoring. Users do not trust a black-box "Quality Score"—they need to see the exact fiber breakdowns and rule-based logic that drove the calculation.'
  }
];

function App() {
  const [activePanel, setActivePanel] = useAppState(null);
  const [activeCaseStudyId, setActiveCaseStudyId] = useAppState(null);

  const handleOpen = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'work') {
      const el = document.querySelector('#case-studies');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (['about', 'experience', 'resume', 'contact'].includes(id)) {
      setActivePanel(id);
    }
  };

  const selectedCaseStudy = WORK.find((w) => w.id === activeCaseStudyId);

  return (
    <React.Fragment>
      <Cursor />
      <AmbientBackground />
      <Nav activeTab={activePanel} onOpen={handleOpen} />

      <main id="top">
        <Hero onOpen={handleOpen} />
        <CaseStudies items={WORK} onSelectCaseStudy={(id) => setActiveCaseStudyId(id)} />
        <Footer onOpen={handleOpen} />
      </main>

      <Panel open={activePanel === 'about'} onClose={() => setActivePanel(null)}>
        <AboutContent />
      </Panel>

      <Panel open={activePanel === 'experience'} onClose={() => setActivePanel(null)}>
        <ExperienceContent />
      </Panel>

      <Panel open={activePanel === 'resume'} onClose={() => setActivePanel(null)}>
        <ResumeContent />
      </Panel>

      <Panel open={activePanel === 'contact'} onClose={() => setActivePanel(null)}>
        <ContactContent />
      </Panel>

      <CaseStudyOverlay caseStudy={selectedCaseStudy} onClose={() => setActiveCaseStudyId(null)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
