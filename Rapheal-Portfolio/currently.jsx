/* ============================================================
   Currently / Lately - a rotating shelf of the art that stays
   with me. One featured pick with a personal note plus a daily
   index of the rest. Refreshes on its own each day; shuffle to
   re-roll. Warm and personal, not a title dump.
   ============================================================ */
const { useState: useCurState } = React;

/* medium → external search link (robust search URLs, never dead deep-links) */
const LINKS = {
  film:   (t) => ['Letterboxd',   'https://letterboxd.com/search/films/' + encodeURIComponent(t) + '/'],
  series: (t) => ['Rotten Tomatoes', 'https://www.rottentomatoes.com/search?search=' + encodeURIComponent(t)],
  book:   (t) => ['Goodreads',    'https://www.goodreads.com/search?q=' + encodeURIComponent(t)],
  sound:  (t) => ['Apple Music',  'https://music.apple.com/us/search?term=' + encodeURIComponent(t)],
};
const MEDIUM_LABEL = { film: 'Film', series: 'Series', book: 'Book', sound: 'Record' };

/* Featured-eligible picks carry a personal note. */
const FEATURED = [
  { t: 'Dune', by: 'Denis Villeneuve', yr: '2021', m: 'film',
    note: 'The one I point to when I talk about design under pressure. Every surface, sound, and silence is doing a job, and none of it shouts. Restraint at a planetary scale.' },
  { t: 'Akira', by: 'Katsuhiro Otomo', yr: '1988', m: 'film',
    note: 'I have watched the Neo-Tokyo bike slide more times than I can count. It rewired what I thought animation, and a city, could feel like.' },
  { t: 'Memories of Murder', by: 'Bong Joon-ho', yr: '2003', m: 'film',
    note: 'A procedural about the limits of certainty. It sits with me because it refuses the clean answer, which is closer to how real systems fail.' },
  { t: 'The Wire', by: 'David Simon', yr: '2002', m: 'series',
    note: 'The best study of institutions I have ever seen. Nobody is the villain and everything still breaks, which is the whole point.' },
  { t: 'Chernobyl', by: 'Craig Mazin', yr: '2019', m: 'series',
    note: 'A human-factors case study dressed as a miniseries. What is the cost of a lie, and of an interface that hides the truth from the people operating it.' },
  { t: 'The Brothers Karamazov', by: 'Fyodor Dostoevsky', yr: '1880', m: 'book',
    note: 'I keep returning to the questions it refuses to close. It is the book that taught me to be comfortable holding two opposed ideas at once.' },
  { t: 'Meditations', by: 'Marcus Aurelius', yr: '180', m: 'book',
    note: 'Notes a person wrote to steady himself, never meant for us. I read a few lines when the work gets loud and it quiets everything down.' },
  { t: 'To Pimp a Butterfly', by: 'Kendrick Lamar', yr: '2015', m: 'sound',
    note: 'Dense, structural, and it rewards the tenth listen more than the first. That is the kind of thing I want to make.' },
  { t: 'Hyperion', by: 'Dan Simmons', yr: '1989', m: 'book',
    note: 'Six voices, one pilgrimage, and a structure that trusts you to keep up. Ambition executed with real care.' },
  { t: 'Mindhunter', by: 'Joe Penhall', yr: '2017', m: 'series',
    note: 'Two people building a method from nothing, one interview at a time. I love watching a field get invented on screen.' },
];

/* The wider shelf (title + medium), rotated daily alongside the featured pick. */
const SHELF = [
  { t: 'Parasite', m: 'film' }, { t: 'Blade Runner', m: 'film' }, { t: 'Pulp Fiction', m: 'film' },
  { t: 'The Thing', m: 'film' }, { t: 'A Clockwork Orange', m: 'film' }, { t: 'Get Out', m: 'film' },
  { t: 'Lawrence of Arabia', m: 'film' }, { t: 'Casino Royale', m: 'film' }, { t: 'Layer Cake', m: 'film' },
  { t: 'The Silence of the Lambs', m: 'film' }, { t: 'Menace II Society', m: 'film' }, { t: 'Boyz n the Hood', m: 'film' },
  { t: 'Sinners', m: 'film' }, { t: 'The Holdovers', m: 'film' }, { t: 'Drive My Car', m: 'film' },
  { t: 'Wind River', m: 'film' }, { t: 'Beasts of No Nation', m: 'film' }, { t: 'Inside Man', m: 'film' },
  { t: 'The Sopranos', m: 'series' }, { t: 'Breaking Bad', m: 'series' }, { t: 'Silicon Valley', m: 'series' },
  { t: 'Game of Thrones', m: 'series' }, { t: 'Shrinking', m: 'series' },
  { t: 'Crime and Punishment', m: 'book' }, { t: 'The Alchemist', m: 'book' },
  { t: 'Children of Blood and Bone', m: 'book' }, { t: 'The Prince', m: 'book' },
  { t: 'The Miseducation of Lauryn Hill', m: 'sound' }, { t: 'My Beautiful Dark Twisted Fantasy', m: 'sound' },
  { t: 'The College Dropout', m: 'sound' }, { t: 'Tame Impala', m: 'sound' },
  { t: 'Anderson .Paak', m: 'sound' }, { t: 'Kaytranada', m: 'sound' }, { t: 'Steve Lacy', m: 'sound' },
  { t: 'The Roots', m: 'sound' }, { t: 'Daft Punk', m: 'sound' },
];

function dayIndex() { return Math.floor(Date.now() / 86400000); }

/* ============================================================
   SCIENCE channel - space human-factors facts, each with a
   route to the primary source. Rotates daily like the art shelf.
   ============================================================ */
const NTRS = (q) => 'https://ntrs.nasa.gov/search?q=' + encodeURIComponent(q);

const FACTS = [
  { tag: 'Workload', t: 'The industry standard workload scale was built at NASA.',
    body: 'NASA-TLX, developed at NASA Ames in the 1980s, measures perceived workload across six dimensions including mental demand, effort, and frustration. It became the most widely used subjective workload instrument in aviation, medicine, and human factors research.',
    src: 'NASA Ames Human Systems Integration', url: 'https://humansystems.arc.nasa.gov/groups/TLX/' },
  { tag: 'Cockpit design', t: 'Apollo crews flew the Moon with a verb-and-noun keypad.',
    body: 'The Apollo Guidance Computer was operated through the DSKY, where astronauts entered a two-digit verb for the action and a two-digit noun for the data it acted on. A constrained command language was safer than free-form input under time pressure.',
    src: 'NASA Technical Reports', url: NTRS('Apollo guidance computer DSKY display keyboard') },
  { tag: 'Automation trust', t: 'A computer alarm nearly aborted the first Moon landing.',
    body: 'During descent, the guidance computer raised 1202 and 1201 program alarms as it shed lower-priority tasks under overload. The landing continued because the crew and ground controllers understood what the alarms meant. Knowing when to trust automation was the deciding factor.',
    src: 'NASA Technical Reports', url: NTRS('Apollo 11 1202 program alarm descent') },
  { tag: 'Human standards', t: 'Human requirements for spaceflight are a formal engineering standard.',
    body: 'NASA-STD-3001 and the companion Human Integration Design Handbook specify the human-system requirements for spacecraft, covering everything from reach envelopes and labeling to workload and habitability. Human factors is written into the hardware spec, not applied afterward.',
    src: 'NASA Office of the Chief Health and Medical Officer', url: 'https://www.nasa.gov/ochmo/' },
  { tag: 'Cognition', t: 'Astronaut cognition is tracked as flight-critical data.',
    body: 'The Human Research Program studies how microgravity, isolation, confinement, and disrupted sleep affect attention, memory, and decision making on long-duration missions. Crew cognitive performance is treated as a mission risk to be measured and mitigated.',
    src: 'NASA Human Research Program', url: 'https://www.nasa.gov/hrp/' },
  { tag: 'Circadian load', t: 'Station crews see sixteen sunrises a day, so the lighting had to be redesigned.',
    body: 'Orbiting roughly every ninety minutes destroys natural light cues. NASA replaced station lighting with tunable solid-state assemblies that shift intensity and color temperature to support circadian entrainment and crew alertness.',
    src: 'NASA Technical Reports', url: NTRS('ISS solid state lighting assembly circadian') },
  { tag: 'Displays', t: 'The Shuttle traded gauges for glass to cut crew workload.',
    body: 'The Multifunction Electronic Display Subsystem replaced electromechanical instruments with full-color flat panels. Consolidating scattered readouts into coherent display formats reduced the interpretation work asked of the crew during dynamic flight phases.',
    src: 'NASA Technical Reports', url: NTRS('Shuttle multifunction electronic display subsystem glass cockpit') },
  { tag: 'Manual control', t: 'The first American astronauts insisted on a window and a hand controller.',
    body: 'Early Mercury capsule concepts treated the occupant as a passenger. The astronauts pushed for a viewport and manual attitude control, arguing that a trained operator with real authority made the system safer. It set the precedent for crew agency in spacecraft design.',
    src: 'NASA Technical Reports', url: NTRS('Mercury capsule astronaut manual control window design') },
  { tag: 'Error', t: 'Use-error is designed out, not trained away.',
    body: 'Spaceflight human factors treats a predictable operator mistake as a design defect: connectors that only mate one way, controls guarded against inadvertent actuation, labels legible in a pressurized glove. The environment absorbs the error instead of the person.',
    src: 'NASA Technical Reports', url: NTRS('human error spacecraft design use error prevention') },
];

function Science({ embedded }) {
  const [roll, setRoll] = useCurState(0);
  const seed = dayIndex() + roll;
  const feat = FACTS[seed % FACTS.length];
  const rest = Array.from({ length: 4 }, (_, i) => FACTS[(seed + 1 + i) % FACTS.length]);

  return (
    <section id="science">
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding: embedded ? 0 : 'clamp(4rem,8vw,7rem) var(--gutter)' }}>
        <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem', flexWrap:'wrap',
          borderBottom:'var(--hair) solid var(--border)', paddingBottom:'1.4rem', marginBottom:'clamp(2rem,4vw,3rem)' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
              textTransform:'uppercase', color:'var(--accent-2)', marginBottom:'0.7rem' }}>Science channel</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
              letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0 }}>Why space</h2>
            <p style={{ marginTop:'1rem', maxWidth:'56ch', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)' }}>
              Human factors was largely invented in cockpits and capsules. These are the pieces of that history I keep coming back to, and where to read the primary source.
            </p>
          </div>
          <button data-hot onClick={()=>setRoll((r)=>r+1)}
            style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
              color:'var(--text-strong)', border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)', padding:'0.6rem 1.15rem' }}>
            Next transmission
          </button>
        </Reveal>

        {/* featured fact */}
        <Reveal style={{ display:'grid', gridTemplateColumns:'minmax(0,1.35fr) minmax(0,1fr)', gap:'clamp(1.5rem,4vw,3.5rem)',
          alignItems:'start', marginBottom:'clamp(2.5rem,5vw,4rem)' }} className="rs-sci-feat">
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
              textTransform:'uppercase', color:'var(--accent-2)', marginBottom:'1rem' }}>{feat.tag}</div>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-semibold)', fontSize:'var(--text-h2)',
              lineHeight:'var(--leading-h2)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:'0 0 1.1rem', maxWidth:'26ch' }}>{feat.t}</h3>
            <p style={{ margin:'0 0 1.5rem', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)', maxWidth:'58ch' }}>{feat.body}</p>
            <a data-hot href={feat.url} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'0.55rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
                letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--accent)',
                borderBottom:'var(--hair) solid var(--accent-line)', paddingBottom:'0.3rem' }}>
              {feat.src} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div style={{ display:'flex', justifyContent:'center', paddingTop:'0.5rem' }}>
            <Sphere size="clamp(150px, 20vw, 230px)" style={{ opacity:0.92 }} />
          </div>
        </Reveal>

        {/* index of the rest */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'clamp(0.75rem,1.5vw,1.25rem)' }}>
          {rest.map((f, i) => (
            <Reveal key={f.t} delay={i*70}>
              <a data-hot href={f.url} target="_blank" rel="noopener noreferrer" className="rs-fact"
                style={{ display:'flex', flexDirection:'column', gap:'0.7rem', height:'100%',
                  padding:'clamp(1.1rem,1.8vw,1.4rem)', border:'var(--hair) solid var(--border)', borderRadius:'var(--radius-md)',
                  background:'var(--bg-raised)', transition:'border-color var(--dur-2) var(--ease-soft), background var(--dur-2) var(--ease-soft), transform var(--dur-3) var(--ease-out)' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
                  textTransform:'uppercase', color:'var(--accent-2)' }}>{f.tag}</span>
                <span style={{ fontSize:'var(--text-sm)', lineHeight:'var(--leading-sm)', fontWeight:'var(--fw-medium)', color:'var(--text-strong)', flex:1 }}>{f.t}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
                  textTransform:'uppercase', color:'var(--text-faint)' }}>{f.src} ↗</span>
              </a>
            </Reveal>
          ))}
        </div>
        <style>{`
          .rs-fact:hover{ border-color:var(--accent-line) !important; background:var(--bg-inset) !important; transform:translateY(-3px); }
          @media (max-width:860px){ .rs-sci-feat{ grid-template-columns:1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function Currently({ embedded }) {
  const [roll, setRoll] = useCurState(0);
  const seed = dayIndex() + roll;
  const feat = FEATURED[seed % FEATURED.length];
  const shelf = [];
  for (let i = 0; i < 7; i++) shelf.push(SHELF[(seed * 3 + i * 5) % SHELF.length]);
  const [fLabel, fHref] = LINKS[feat.m](feat.t);

  return (
    <section id="currently" style={{ borderTop: embedded ? 'none' : 'var(--hair) solid var(--border)' }}>
      <div style={{ maxWidth:'var(--page-max)', margin:'0 auto', width:'100%', padding: embedded ? 0 : 'clamp(4rem,8vw,7rem) var(--gutter)' }}>
        <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem', flexWrap:'wrap',
          borderBottom:'var(--hair) solid var(--border)', paddingBottom:'1.4rem', marginBottom:'clamp(2rem,4vw,3.2rem)' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
              textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.9rem' }}>This is my kind of art</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-display)',
              letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:0 }}>Currently / Lately</h2>
          </div>
          <p style={{ fontSize:'var(--text-sm)', lineHeight:'var(--leading-sm)', color:'var(--text-muted)', maxWidth:'34ch', margin:0 }}>
            The films, shows, books, and records I keep coming back to. A different set surfaces each day.
          </p>
        </Reveal>

        {/* Featured pick */}
        <Reveal delay={80}>
          <div className="rs-cur-feat" style={{ display:'grid', gridTemplateColumns:'minmax(0,0.95fr) minmax(0,1.05fr)',
            gap:'clamp(1.5rem,4vw,3.5rem)', alignItems:'stretch' }}>
            <a data-hot href={fHref} target="_blank" rel="noopener" className="rs-cur-poster" aria-label={feat.t}>
              <div className="rs-cur-poster-inner">
                <Sphere size="min(46%, 220px)" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
                <div style={{ position:'absolute', top:'clamp(1.2rem,3vw,2rem)', left:'clamp(1.2rem,3vw,2rem)', right:'clamp(1.2rem,3vw,2rem)',
                  display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
                  letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--on-dark-muted)', zIndex:2 }}>
                  <span>{MEDIUM_LABEL[feat.m]}</span><span>{feat.yr}</span>
                </div>
                <div style={{ position:'absolute', bottom:'clamp(1.2rem,3vw,2rem)', left:'clamp(1.2rem,3vw,2rem)', right:'clamp(1.2rem,3vw,2rem)', zIndex:2 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
                    textTransform:'uppercase', color:'var(--clay-soft)' }}>Featured today · {fLabel} →</div>
                </div>
              </div>
            </a>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:'0.5rem' }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-display)', fontSize:'var(--text-h1)',
                lineHeight:'var(--leading-h1)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:'0 0 0.6rem' }}>{feat.t}</h3>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
                textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'1.4rem' }}>{feat.by} · {MEDIUM_LABEL[feat.m]} · {feat.yr}</div>
              <p style={{ fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text)', margin:'0 0 1.8rem', maxWidth:'46ch' }}>{feat.note}</p>
              <div style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
                <a data-hot href={fHref} target="_blank" rel="noopener" style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)',
                  fontWeight:'var(--fw-medium)', color:'var(--text-on-inverse)', background:'var(--text-strong)',
                  borderRadius:'var(--radius-sm)', padding:'0.7rem 1.3rem' }}>Open in {fLabel}</a>
                <button data-hot onClick={()=>setRoll(r=>r+1)} style={{ fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)',
                  fontWeight:'var(--fw-medium)', color:'var(--text-strong)', background:'transparent',
                  border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-sm)', padding:'0.7rem 1.3rem',
                  display:'inline-flex', alignItems:'center', gap:'0.5rem' }}>
                  <span style={{ color:'var(--accent)' }}>↻</span> Shuffle
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The shelf index */}
        <Reveal delay={140} style={{ marginTop:'clamp(2.5rem,5vw,4rem)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
            textTransform:'uppercase', color:'var(--text-faint)', marginBottom:'0.4rem' }}>Also on the shelf</div>
          <div>
            {shelf.map((s, i) => {
              const [lbl, href] = LINKS[s.m](s.t);
              return <ShelfRow key={s.t + i} title={s.t} medium={MEDIUM_LABEL[s.m]} lbl={lbl} href={href} />;
            })}
          </div>
        </Reveal>
      </div>
      <style>{`
        .rs-cur-poster{ display:block; border-radius:var(--radius-md); overflow:hidden; text-decoration:none; }
        .rs-cur-poster-inner{ position:relative; width:100%; aspect-ratio:4/5; min-height:320px; background:var(--obsidian);
          overflow:hidden; transition:transform 0.5s var(--ease-out); }
        .rs-cur-poster:hover .rs-cur-poster-inner{ transform:scale(1.012); }
        @media (max-width:820px){ .rs-cur-feat{ grid-template-columns:1fr !important; } .rs-cur-poster-inner{ aspect-ratio:16/10; min-height:260px; } }
      `}</style>
    </section>
  );
}

function ShelfRow({ title, medium, lbl, href }) {
  const [h, setH] = useCurState(false);
  return (
    <a data-hot href={href} target="_blank" rel="noopener"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:'grid', gridTemplateColumns:'1fr auto auto', alignItems:'center', gap:'clamp(1rem,3vw,2.5rem)',
        padding:'1.05rem clamp(0.4rem,1.2vw,1rem)', borderTop:'var(--hair) solid var(--border)',
        background: h ? 'var(--bg-inset)' : 'transparent', borderRadius:'var(--radius-md)',
        transition:'background var(--dur-2) var(--ease-soft)', textDecoration:'none' }}>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-medium)', fontSize:'var(--text-h3)',
        color:'var(--text-strong)', transform: h ? 'translateX(4px)' : 'none', transition:'transform var(--dur-3) var(--ease-out)' }}>{title}</span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
        textTransform:'uppercase', color:'var(--text-muted)' }}>{medium}</span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)',
        textTransform:'uppercase', color: h ? 'var(--accent)' : 'var(--text-faint)', display:'inline-flex', alignItems:'center', gap:'0.5rem',
        transition:'color var(--dur-2) var(--ease-soft)' }}>{lbl}
        <span aria-hidden="true" style={{ transform: h ? 'translateX(3px)' : 'none', transition:'transform var(--dur-3) var(--ease-out)' }}>→</span>
      </span>
    </a>
  );
}

Object.assign(window, { Currently, Science });
