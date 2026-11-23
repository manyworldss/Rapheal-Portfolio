/* ============================================================
   Currently playing: a rotating shelf of the art that stays
   with me. One featured pick with a personal note plus a daily
   index of the rest. Refreshes each day; shuffle to re-roll.
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
    note: "The scale of the world is impressive, but the sound design and quieter scenes are just as interesting." },
  { t: 'Akira', by: 'Katsuhiro Otomo', yr: '1988', m: 'film',
    note: "The animation and the way Neo-Tokyo is built are still impressive decades later." },
  { t: 'Memories of Murder', by: 'Bong Joon-ho', yr: '2003', m: 'film',
    note: "A crime film that spends a great deal of time exploring uncertainty and the limitations of an investigation." },
  { t: 'The Wire', by: 'David Simon', yr: '2002', m: 'series',
    note: "An interesting look at how institutions shape the decisions people make, even when they want to do the right thing." },
  { t: 'Chernobyl', by: 'Craig Mazin', yr: '2019', m: 'series',
    note: "The series is particularly interesting from a human factors perspective, given the role of communication, authority, and equipment in the disaster." },
  { t: 'The Brothers Karamazov', by: 'Fyodor Dostoevsky', yr: '1880', m: 'book',
    note: "The questions about morality, faith, and responsibility are what make this book interesting." },
  { t: 'Meditations', by: 'Marcus Aurelius', yr: '180', m: 'book',
    note: "A collection of personal reflections on responsibility, judgment, and dealing with things outside our control." },
  { t: 'To Pimp a Butterfly', by: 'Kendrick Lamar', yr: '2015', m: 'sound',
    note: "There is a great deal to unpack in the album, both musically and in the ideas Kendrick explores." },
  { t: 'Hyperion', by: 'Dan Simmons', yr: '1989', m: 'book',
    note: "The book uses several different perspectives to tell one larger story. The structure itself is an interesting part of the experience." },
  { t: 'Mindhunter', by: 'Joe Penhall', yr: '2017', m: 'series',
    note: "The interviews and the process of developing a research method are some of the most interesting parts of the series." },
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

/* A small ASCII icon per medium, drawn on the "now playing" screen. */
const MEDIUM_ART = {
  film: String.raw`  .----.        .----.
 ( (()) )------( (()) )
  '----'        '----'
 ______________________
|[] [] [] [] [] [] [] []|
|_______________________|`,
  series: String.raw`        \      /
         \    /
  .-------\--/-------.
  | .--------------. |
  | |              | |
  | '--------------' |
  '------------------'`,
  book: String.raw`   ___________ ___________
  |  ~~~~~~~  |  ~~~~~~~  |
  |  ~~~~~~~  |  ~~~~~~~  |
  |  ~~~~~~~  |  ~~~~~~~  |
  |___________|___________|`,
  sound: String.raw`      .-------.
    .'  .---.  '.
   /   / .-. \   \
  |   | ( o ) |   |
   \   \ '-' /   /
    '.  '---'  .'
      '-------'`,
};
const pad2c = n => String(n).padStart(2, '0');

function Currently() {
  const [roll, setRoll] = useCurState(0);
  const seed = dayIndex() + roll;
  const pick = seed % FEATURED.length;
  const feat = FEATURED[pick];
  const shelf = [];
  for (let i = 0; i < 7; i++) shelf.push(SHELF[(seed * 3 + i * 5) % SHELF.length]);
  const [fLabel, fHref] = LINKS[feat.m](feat.t);

  return (
    <section id="currently" className="now-playing">
      <div className="np-feature">
        <a className="lcd-screen np-screen" href={fHref} target="_blank" rel="noopener" aria-label={'Open ' + feat.t + ' in ' + fLabel}>
          <div className="lcd-status"><span>Now playing · {MEDIUM_LABEL[feat.m]}</span><span>{feat.yr}</span></div>
          <pre aria-hidden="true" className="ascii-scene np-art">{MEDIUM_ART[feat.m]}</pre>
          <div className="np-title">{feat.t}</div>
          <div className="np-by">{feat.by}</div>
          <div className="lcd-bottom"><span>Pick {pad2c(pick + 1)} / {pad2c(FEATURED.length)}</span><span>{fLabel} ↗</span></div>
        </a>
        <div className="np-note">
          <p className="console-label">Why it stays with me</p>
          <h2>{feat.t}</h2>
          <p className="np-meta">{feat.by} · {MEDIUM_LABEL[feat.m]} · {feat.yr}</p>
          <p className="np-quote">{feat.note}</p>
          <div className="np-actions">
            <a className="console-button" href={fHref} target="_blank" rel="noopener">Open in {fLabel} ↗</a>
            <button className="console-button" onClick={() => setRoll(r => r + 1)}><span aria-hidden="true">↻</span> Shuffle</button>
          </div>
        </div>
      </div>

      <div className="np-shelf">
        <p className="console-label">Also on the shelf</p>
        <ol>
          {shelf.map((s, i) => {
            const [lbl, href] = LINKS[s.m](s.t);
            return (
              <li key={s.t + i}>
                <a href={href} target="_blank" rel="noopener">
                  <span className="np-idx" aria-hidden="true">{pad2c(i + 1)}</span>
                  <span className="np-name">{s.t}</span>
                  <span className="np-medium">{MEDIUM_LABEL[s.m]}</span>
                  <span className="np-src">{lbl} ↗</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

Object.assign(window, { Currently });
