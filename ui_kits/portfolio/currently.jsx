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
