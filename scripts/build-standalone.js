/* ============================================================
   build-standalone.js
   Bundles the multi-file ui_kits/portfolio source into ONE
   self-contained export/portfolio/index.html that runs by
   double-clicking (no local server): inlines all token CSS, the
   four JSX files (compiled in-browser by Babel), and the case
   images as data URIs. React / ReactDOM / Babel still load from
   the unpkg CDN, so an internet connection is required.

   Run:  node scripts/build-standalone.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const R = f => fs.readFileSync(path.join(root, f), 'utf8');
const B64 = f => fs.readFileSync(path.join(root, f)).toString('base64');

// ---- CSS: combine tokens + base, hoist @import(font) lines to the top ----
let css = ['tokens/colors.css','tokens/typography.css','tokens/spacing.css','tokens/motion.css','tokens/base.css']
  .map(R).join('\n\n');
const imports = [];
css = css.replace(/@import[^;]+;/g, m => { imports.push(m.trim()); return ''; });
css = imports.join('\n') + '\n\n' + css;

// ---- JSX source (the canonical ui_kits/portfolio copies) ----
let helpers  = R('ui_kits/portfolio/helpers.jsx');
let sections = R('ui_kits/portfolio/sections.jsx');
let overlays = R('ui_kits/portfolio/overlays.jsx');
let app      = R('ui_kits/portfolio/app.jsx');

// inline the two case images as data URIs so the file is fully portable
const celio = 'data:image/png;base64,' + B64('assets/work/celio-landing.png');
const north = 'data:image/png;base64,' + B64('assets/work/north-star-hero.png');
app = app.split('../../assets/work/celio-landing.png').join(celio)
         .split('../../assets/work/north-star-hero.png').join(north);

// guard: nothing inlined may contain a script-closing sequence
for (const [n, s] of [['helpers',helpers],['sections',sections],['overlays',overlays],['app',app],['css',css]]) {
  if (/<\/script/i.test(s)) throw new Error('closing-script sequence found in ' + n);
}

const S = code => '<script type="text/babel">\n' + code + '\n<\/script>';

const CDN = [
  '<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"><\/script>',
  '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"><\/script>',
  '<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"><\/script>',
].join('\n');

const html = `<!-- @dsCard group="Portfolio" viewport="1440x900" name="Portfolio — Home" subtitle="Technical Support · Systems · AI Quality Assurance — self-contained, opens with no server" -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rapheal Suber — Technical Support & Systems</title>
<script>
  (function(){ try { var t = localStorage.getItem('rs-theme'); if (t) document.documentElement.dataset.theme = t; } catch(e){} })();
<\/script>
<style>
${css}
html, body { background: var(--bg); }
#root { position: relative; }
</style>
</head>
<body>
<div id="root"></div>
${CDN}
${S(helpers)}
${S(sections)}
${S(overlays)}
${S(app)}
</body>
</html>
`;

fs.mkdirSync(path.join(root, 'export/portfolio'), { recursive: true });
fs.writeFileSync(path.join(root, 'export/portfolio/index.html'), html);
console.log('wrote export/portfolio/index.html — ' + (html.length/1024).toFixed(0) + ' KB');
