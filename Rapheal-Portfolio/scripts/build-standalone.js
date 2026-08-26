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

// ---- CSS: combine tokens + base ----
let css = ['tokens/colors.css','tokens/typography.css','tokens/spacing.css','tokens/motion.css','tokens/base.css']
  .map(R).join('\n\n');

// Clean up any loose @import statements in tokens and place the single Google Font import cleanly at the top
css = css.replace(/@import\s+url\([^)]+\);/g, '');
const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Hanken+Grotesk:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap');`;
css = fontImport + '\n\n' + css;

// ---- JSX source (the canonical ui_kits/portfolio copies) ----
let helpers   = R('ui_kits/portfolio/helpers.jsx');
let sections  = R('ui_kits/portfolio/sections.jsx');
let overlays  = R('ui_kits/portfolio/overlays.jsx');
let currently = R('ui_kits/portfolio/currently.jsx');
let work      = R('ui_kits/portfolio/work.jsx');
let app       = R('ui_kits/portfolio/app.jsx');

// Dynamically inline all case study images as base64 data URIs
work = work.replace(/['"](\.\.\/\.\.\/(?:assets\/work|Rapheal-Portfolio\/images)\/[^'"]+\.(?:png|jpg|jpeg|webp))['"]/g, (match, imgPath) => {
  const cleanPath = imgPath.replace('../../', '');
  const absPath = path.join(root, cleanPath);
  if (fs.existsSync(absPath)) {
    const ext = path.extname(cleanPath).slice(1).toLowerCase();
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    const b64 = fs.readFileSync(absPath).toString('base64');
    return `'data:image/${mime};base64,${b64}'`;
  }
  return match;
});

// For video files, convert the path to a relative URL from export/portfolio
work = work.replace(/['"]\.\.\/\.\.\/Rapheal-Portfolio\/images\/prox\/onboarding-walkthrough\.mp4['"]/g, `'../../Rapheal-Portfolio/images/prox/onboarding-walkthrough.mp4'`);


// guard: nothing inlined may contain a script-closing sequence
for (const [n, s] of [['helpers',helpers],['sections',sections],['overlays',overlays],['currently',currently],['work',work],['app',app],['css',css]]) {
  if (/<\/script/i.test(s)) throw new Error('closing-script sequence found in ' + n);
}

const S = code => '<script type="text/babel">\n' + code + '\n<\/script>';

const CDN = [
  '<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"><\/script>',
  '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"><\/script>',
  '<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"><\/script>',
].join('\n');

const html = `<!-- @dsCard group="Portfolio" viewport="1440x900" name="Portfolio — Home" subtitle="Technical Support · Systems — self-contained, opens with no server" -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rapheal Suber — Technical Support & Systems</title>
<script>
  (function(){ var t; try { t = localStorage.getItem('rs-theme'); } catch(e){}
    document.documentElement.dataset.theme = (t === 'light') ? 'light' : 'dark'; })();
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
${S(currently)}
${S(work)}
${S(app)}
</body>
</html>
`;

fs.mkdirSync(path.join(root, 'export/portfolio'), { recursive: true });
fs.writeFileSync(path.join(root, 'export/portfolio/index.html'), html);
fs.writeFileSync(path.join(root, 'index.html'), html);
fs.writeFileSync(path.join(root, 'Rapheal-Portfolio/index.html'), html);
console.log('wrote index.html, Rapheal-Portfolio/index.html, export/portfolio/index.html — ' + (html.length/1024).toFixed(0) + ' KB');

