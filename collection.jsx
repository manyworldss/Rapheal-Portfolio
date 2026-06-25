/* ============================================================
   Currently / Lately — a curated shelf of films, series, books,
   and records Rapheal would hand to anyone who joins. The set
   shuffles deterministically each day (everyone sees the same
   "today" pick; it changes tomorrow), with a manual reshuffle.
   ============================================================ */
const { useState: useStateC } = React;

/* kind → label, accent (moving image = clay, page/sound = pine), and the
   service each medium links out to. Links are search URLs so they resolve
   without hand-coded IDs. */
const KINDS = {
  film:   { label: 'Film',   accent: 'var(--accent)',   via: 'Letterboxd',
            link: (it) => `https://letterboxd.com/search/films/${encodeURIComponent(it.title)}/` },
  series: { label: 'Series', accent: 'var(--accent)',   via: 'Rotten Tomatoes',
            link: (it) => `https://www.rottentomatoes.com/search?search=${encodeURIComponent(it.title)}` },
  book:   { label: 'Book',   accent: 'var(--accent-2)', via: 'Goodreads',
            link: (it) => `https://www.goodreads.com/search?q=${encodeURIComponent(it.title + ' ' + it.by)}` },
  music:  { label: 'Record', accent: 'var(--accent-2)', via: 'Apple Music',
            link: (it) => `https://music.apple.com/us/search?term=${encodeURIComponent((it.by !== 'Anything' ? it.by + ' ' : '') + it.title)}` },
};

const COLLECTION = [
  // ---- Film ----
  { kind:'film', title:'Pulp Fiction', by:'Tarantino', year:'1994', why:"The script that rewired how I think about structure — I still chase that feeling of order hiding inside chaos." },
  { kind:'film', title:'Parasite', by:'Bong Joon-ho', year:'2019', why:"Class drawn as architecture; the sharpest thing I've seen on inequality, and it never raises its voice." },
  { kind:'film', title:'Blade Runner', by:'Ridley Scott', year:'1982', why:"I keep coming back to the only question that matters to me — what actually makes a thing human." },
  { kind:'film', title:'The Thing', by:'John Carpenter', year:'1982', why:"Paranoia, practical effects, and no easy answers. Forty years on, nothing's touched it." },
  { kind:'film', title:'Get Out', by:'Jordan Peele', year:'2017', why:"Horror as a social X-ray. It understands a specific feeling I know in my body." },
  { kind:'film', title:'Memories of Murder', by:'Bong Joon-ho', year:'2003', why:"An unsolved case that taught me ambiguity can haunt harder than any answer." },
  { kind:'film', title:'Drive My Car', by:'Hamaguchi', year:'2021', why:"Three hours of grief and quiet that earns every single minute. Sit with it." },
  { kind:'film', title:'The Silence of the Lambs', by:'Demme', year:'1991', why:"Two minds circling each other — the blueprint for everything I love about Mindhunter." },
  { kind:'film', title:'A Clockwork Orange', by:'Kubrick', year:'1971', why:"Beautiful and repulsive at once, and it never lets you off the hook. That's the point." },
  { kind:'film', title:'Dune', by:'Villeneuve', year:'2021', why:"The rare adaptation that makes scale and silence feel overwhelming in the best way." },
  { kind:'film', title:'Lawrence of Arabia', by:'David Lean', year:'1962', why:"Scale I didn't know cinema could hold. Watch it as big as you possibly can." },
  { kind:'film', title:'Kill Bill', by:'Tarantino', year:'2003', why:"Revenge as choreography. I put it on whenever I forget that craft can be pure joy." },
  { kind:'film', title:'The Holdovers', by:'Alexander Payne', year:'2023', why:"Lonely people slowly finding each other — it sneaks up and gets you." },
  { kind:'film', title:'Boyz n the Hood', by:'Singleton', year:'1991', why:"The first film that made me feel the full weight of where you happen to grow up." },
  { kind:'film', title:'Menace II Society', by:'Hughes Brothers', year:'1993', why:"It refuses to let you look away — and it shouldn't." },
  { kind:'film', title:'Juice', by:'Dickerson', year:'1992', why:"Pac's eyes do half the storytelling. A debut that still feels dangerous." },
  { kind:'film', title:'Belly', by:'Hype Williams', year:'1998', why:"Style as substance — every single frame looks like an album cover." },
  { kind:'film', title:'Sinners', by:'Coogler', year:'2025', why:"Proof horror can carry history and music in the same breath." },
  { kind:'film', title:'The Harder They Fall', by:'Jeymes Samuel', year:'2021', why:"A Western that finally looks like the people who actually lived it." },
  { kind:'film', title:'Casino Royale', by:'Campbell', year:'2006', why:"The Bond that made the stakes feel personal again." },
  { kind:'film', title:'Layer Cake', by:'Matthew Vaughn', year:'2004', why:"Taught me a clever exit can matter as much as a clean entrance." },
  { kind:'film', title:'Inside Man', by:'Spike Lee', year:'2006', why:"A heist film with far more on its mind than the money." },
  { kind:'film', title:'Wind River', by:'Sheridan', year:'2017', why:"Grief and snow and silence — it just stays with me." },
  { kind:'film', title:'Blood Diamond', by:'Zwick', year:'2006', why:"A thriller that never once lets you forget the real cost." },
  { kind:'film', title:'The Hurt Locker', by:'Bigelow', year:'2008', why:"Tension as a character; the addiction to the edge made completely visceral." },
  { kind:'film', title:'Beasts of No Nation', by:'Fukunaga', year:'2015', why:"Devastating and necessary. A kid and an Idris performance you can't shake." },
  { kind:'film', title:'The Invitation', by:'Karyn Kusama', year:'2015', why:"A masterclass in dread sitting quietly at a dinner table." },
  { kind:'film', title:'Scream', by:'Wes Craven', year:'1996', why:"Horror that knows the rules and plays with them — smarter than it lets on." },
  { kind:'film', title:'Akira', by:'Otomo', year:'1988', why:"The animation that expanded what I thought the medium could even say." },
  { kind:'film', title:'Boomerang', by:'Hudlin', year:'1992', why:"Comfort food — Black glamour and wit I never get tired of." },
  { kind:'film', title:'Vampire in Brooklyn', by:'Wes Craven', year:'1995', why:"Messy, fun, and a reminder Eddie Murphy will try anything." },

  // ---- Series ----
  { kind:'series', title:'Mindhunter', by:'Fincher', year:'2017', why:"Watching them invent behavioral science in real time is basically my dream job, dramatized." },
  { kind:'series', title:'The Wire', by:'David Simon', year:'2002', why:"The closest TV's come to a systems-level view of a city. Nothing in it is wasted." },
  { kind:'series', title:'Chernobyl', by:'Mazin', year:'2019', why:"The cost of lies told with unbearable precision — the human-factors disaster I think about most." },
  { kind:'series', title:'The Sopranos', by:'David Chase', year:'1999', why:"A character study that never flinches; therapy and violence in the same hour." },
  { kind:'series', title:'Breaking Bad', by:'Gilligan', year:'2008', why:"The cleanest arc on television — a chemistry teacher and a slow-motion tragedy." },
  { kind:'series', title:'Silicon Valley', by:'Mike Judge', year:'2014', why:"Tech satire that lands because it's true. I've sat in versions of these meetings." },
  { kind:'series', title:'Shrinking', by:'Lawrence/Goldstein', year:'2023', why:"Grief comedy that earns its laughs and its tears; Harrison Ford is a revelation." },
  { kind:'series', title:'Platonic', by:'Stoller', year:'2023', why:"Rogen and Byrne making the chaos of adult friendship feel completely real." },
  { kind:'series', title:'Game of Thrones', by:'HBO', year:'2011', why:"For the highs — when it was must-watch, nothing on earth felt bigger." },
  { kind:'series', title:'The Chair Company', by:'HBO', year:'2025', why:"New, strange, and exactly the kind of swing I want more shows to take." },

  // ---- Books ----
  { kind:'book', title:'Dune', by:'Frank Herbert', year:'1965', why:"The world that taught me how ecology, power, and systems all interlock." },
  { kind:'book', title:'The Brothers Karamazov', by:'Dostoevsky', year:'1880', why:"Faith, doubt, and family pushed to the absolute limit. It rearranged me." },
  { kind:'book', title:'Crime and Punishment', by:'Dostoevsky', year:'1866', why:"The original mind-under-pressure; guilt rendered better here than anywhere." },
  { kind:'book', title:'Meditations', by:'Marcus Aurelius', year:'180', why:"The notebook I keep closest — an emperor reminding me to get out of my own head." },
  { kind:'book', title:'Hyperion', by:'Dan Simmons', year:'1989', why:"Six pilgrims, six stories. Science fiction operating as literature." },
  { kind:'book', title:'Children of Blood and Bone', by:'Adeyemi', year:'2018', why:"Magic, rage, and heritage — I tore right through it." },
  { kind:'book', title:'The Prince', by:'Machiavelli', year:'1532', why:"Cold, clear, and useful. Understanding power isn't the same as worshipping it." },
  { kind:'book', title:'The Alchemist', by:'Paulo Coelho', year:'1988', why:"A simple parable I return to whenever I need to remember why I started." },

  // ---- Records ----
  { kind:'music', title:'To Pimp a Butterfly', by:'Kendrick Lamar', year:'2015', why:"An album that feels like a movement. I still find something new every listen." },
  { kind:'music', title:'The Miseducation of Lauryn Hill', by:'Lauryn Hill', year:'1998', why:"Perfect, full stop. Warmth and wisdom in every single track." },
  { kind:'music', title:'My Beautiful Dark Twisted Fantasy', by:'Kanye West', year:'2010', why:"Maximalism done right; the production still floors me." },
  { kind:'music', title:'The College Dropout', by:'Kanye West', year:'2004', why:"The record that made me believe in taking big swings." },
  { kind:'music', title:'The Fugees', by:'Anything', year:'—', why:"The harmonies I'll put on for anyone who'll sit still long enough to listen." },
  { kind:'music', title:'The Roots', by:'Anything', year:'—', why:"Live hip-hop — proof that musicianship and rap have always belonged together." },
  { kind:'music', title:'Tame Impala', by:'Anything', year:'—', why:"For the days I just want to float. Headphones, eyes closed." },
  { kind:'music', title:'Anderson .Paak', by:'Anything', year:'—', why:"Pure groove. Genuinely impossible to sit still to." },
  { kind:'music', title:'KAYTRANADA', by:'Anything', year:'—', why:"The producer I reach for the second a room needs to move." },
  { kind:'music', title:'Steve Lacy', by:'Anything', year:'—', why:"Bedroom funk that sounds like absolutely no one else." },
  { kind:'music', title:'Daft Punk', by:'Anything', year:'—', why:"Robots who somehow made me feel the most human on a dance floor." },
];

/* ---- deterministic daily shuffle ---- */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededOrder(seed) {
  const rng = mulberry32(seed);
  const idx = COLLECTION.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}
function todaySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function Collection() {
  const [seed, setSeed] = useStateC(todaySeed());
  const manual = seed !== todaySeed();
  const order = seededOrder(seed);
  const featured = COLLECTION[order[0]];
  const list = order.slice(1, 7).map((i) => COLLECTION[i]);

  return (
    <section id="currently" style={{ padding:'clamp(4rem,9vw,9rem) var(--gutter)', maxWidth:'var(--page-max)', margin:'0 auto', width:'100%' }}>
      {/* header */}
      <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1.5rem', flexWrap:'wrap', marginBottom:'clamp(2rem,4vw,3.5rem)' }}>
        <div>
          <div style={{ display:'flex', alignItems:'baseline', gap:'0.75rem', marginBottom:'1.4rem' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--accent-2)' }}>06</span>
            <span style={{ width:'2rem', height:'var(--hair)', background:'var(--border-strong)', alignSelf:'center' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-muted)' }}>Currently / Lately</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'var(--text-h1)', letterSpacing:'var(--track-tight)', color:'var(--text-strong)', margin:0, maxWidth:'18ch' }}>
            This is my kind of art.
          </h2>
          <p style={{ marginTop:'1.1rem', maxWidth:'48ch', fontSize:'var(--text-body)', lineHeight:'var(--leading-body)', color:'var(--text-muted)' }}>
            Same curiosity, off the clock. The films, series, books, and records that shaped how I think. A rotating shelf that refreshes each day.
          </p>
        </div>
        <button data-hot onClick={() => setSeed(manual ? todaySeed() : Date.now() % 2147483647)}
          style={{ display:'inline-flex', alignItems:'center', gap:'0.55rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
            letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-muted)',
            border:'var(--hair) solid var(--border-strong)', borderRadius:'var(--radius-pill)', padding:'0.65rem 1.1rem', whiteSpace:'nowrap' }}>
          <span aria-hidden="true" style={{ color:'var(--accent)' }}>↻</span> {manual ? 'Back to today' : 'Shuffle'}
        </button>
      </Reveal>

      {/* body: featured + index */}
      <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.35fr) minmax(0,1fr)', gap:'clamp(2rem,5vw,5rem)', alignItems:'start' }}>
        {/* featured */}
        <Reveal style={{ borderTop:`var(--hair-2) solid ${KINDS[featured.kind].accent}`, paddingTop:'1.6rem' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
            letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:KINDS[featured.kind].accent, whiteSpace:'nowrap' }}>
            <span style={{ width:6, height:6, borderRadius:'999px', background:KINDS[featured.kind].accent }} />
            {KINDS[featured.kind].label} · Today's pick
          </span>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-light)', fontSize:'clamp(2.5rem,4.5vw,4.25rem)', lineHeight:1.0,
            letterSpacing:'var(--track-display)', color:'var(--text-strong)', margin:'1.1rem 0 0.8rem', overflowWrap:'break-word' }}>{featured.title}</h3>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--text-faint)', marginBottom:'1.4rem' }}>
            {featured.by}{featured.year !== '—' ? `  ·  ${featured.year}` : ''}
          </div>
          <p style={{ fontSize:'var(--text-body-lg)', lineHeight:'var(--leading-body-lg)', color:'var(--text)', maxWidth:'40ch', margin:'0 0 1.6rem' }}>
            “{featured.why}”
          </p>
          <a data-hot href={KINDS[featured.kind].link(featured)} target="_blank" rel="noopener"
            style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)',
              letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:KINDS[featured.kind].accent,
              borderBottom:`var(--hair) solid ${KINDS[featured.kind].accent}`, paddingBottom:'0.25rem' }}>
            View on {KINDS[featured.kind].via} <span aria-hidden="true">↗</span>
          </a>
        </Reveal>

        {/* index */}
        <Reveal delay={80}>
          {list.map((it, i) => <CollectionRow key={featured.title + i} item={it} last={i === list.length - 1} />)}
        </Reveal>
      </div>
    </section>
  );
}

function CollectionRow({ item, last }) {
  const [h, setH] = useStateC(false);
  const accent = KINDS[item.kind].accent;
  return (
    <a href={KINDS[item.kind].link(item)} target="_blank" rel="noopener" data-hot
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'grid', gridTemplateColumns:'4.2rem minmax(0,1fr) auto', alignItems:'baseline', columnGap:'1rem',
        padding:'1rem 0', paddingLeft: h ? '0.6rem' : 0, borderTop:'var(--hair) solid var(--border)',
        borderBottom: last ? 'var(--hair) solid var(--border)' : 'none', textDecoration:'none',
        transition:'padding-left var(--dur-2) var(--ease-soft)' }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase',
        color: h ? accent : 'var(--text-faint)', whiteSpace:'nowrap', transition:'color var(--dur-2) var(--ease-soft)' }}>{KINDS[item.kind].label}</span>
      <span style={{ minWidth:0 }}>
        <span style={{ fontFamily:'var(--font-display)', fontWeight:'var(--fw-regular)', fontSize:'var(--text-h3)', color:'var(--text-strong)', display:'block', lineHeight:1.15, overflowWrap:'break-word' }}>{item.title}</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', letterSpacing:'var(--track-micro)', textTransform:'uppercase', color:'var(--text-faint)', display:'block', marginTop:'0.3rem' }}>{item.by}{item.year !== '—' ? `  ·  ${item.year}` : ''}</span>
      </span>
      <span aria-hidden="true" style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-micro)', color: h ? accent : 'transparent',
        alignSelf:'center', transition:'color var(--dur-2) var(--ease-soft)' }}>↗</span>
    </a>
  );
}

Object.assign(window, { Collection });
