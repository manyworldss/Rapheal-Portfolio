/* ============================================================
   build-standalone.js
   Bundles the multi-file ui_kits/portfolio source into:
   1) index.html (Root) — ultra-fast, lightweight (<100KB) with
      direct relative paths to assets for peak Chrome performance.
   2) export/portfolio/index.html — standalone offline bundle with
      inlined base64 images and correct relative media paths.

   Run:  node scripts/build-standalone.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const R = f => fs.readFileSync(path.join(root, f), 'utf8');

// ---- CSS: combine tokens + base ----
let css = ['tokens/colors.css','tokens/typography.css','tokens/spacing.css','tokens/motion.css','tokens/base.css']
  .map(R).join('\n\n');

// Clean up any loose @import statements in tokens and place the single Google Font import cleanly at the top
css = css.replace(/@import\s+url\([^)]+\);/g, '');
const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Hanken+Grotesk:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap');`;
css = fontImport + '\n\n' + css;

// ---- JSX source (the canonical ui_kits/portfolio copies) ----
const helpers   = R('ui_kits/portfolio/helpers.jsx');
const sections  = R('ui_kits/portfolio/sections.jsx');
const overlays  = R('ui_kits/portfolio/overlays.jsx');
const currently = R('ui_kits/portfolio/currently.jsx');
const rawWork   = R('ui_kits/portfolio/work.jsx');
const app       = R('ui_kits/portfolio/app.jsx');

// ---- 1. Fast Work for root index.html (clean relative paths) ----
let fastWork = rawWork
  .replace(/['"]\.\.\/\.\.\/Rapheal-Portfolio\/images\/([^'"]+)['"]/g, "'./images/$1'")
  .replace(/['"]\.\.\/\.\.\/assets\/work\/([^'"]+)['"]/g, "'./assets/work/$1'");

// ---- 2. Inlined Work for standalone export/portfolio/index.html ----
let standaloneWork = rawWork.replace(/['"](\.\.\/\.\.\/(?:assets\/work|Rapheal-Portfolio\/images)\/[^'"]+\.(?:png|jpg|jpeg|webp))['"]/g, (match, imgPath) => {
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
standaloneWork = standaloneWork.replace(/['"]\.\.\/\.\.\/Rapheal-Portfolio\/images\/prox\/onboarding-walkthrough\.mp4['"]/g, "'../../images/prox/onboarding-walkthrough.mp4'");

// Guard: nothing inlined may contain a script-closing sequence
for (const [n, s] of [['helpers',helpers],['sections',sections],['overlays',overlays],['currently',currently],['work',fastWork],['app',app],['css',css]]) {
  if (/<\/script/i.test(s)) throw new Error('closing-script sequence found in ' + n);
}

const S = code => '<script type="text/babel">\n' + code + '\n</script>';

const CDN = [
  '<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>',
  '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
  '<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>',
].join('\n');

const makeHtml = (workCode, isStandalone = false) => `<!-- @dsCard group="Portfolio" viewport="1440x900" name="Portfolio — Home" subtitle="Human Factors · UX Systems & Research" -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rapheal Suber — Human Factors &amp; UX Systems</title>
<meta name="description" content="Portfolio of Rapheal Suber — Human Factors Psychology & UX Systems Designer, specializing in clinical software, accessibility, and high-stakes interaction design.">
<meta name="theme-color" content="#0e0e10">

<!-- Open Graph / Social Sharing -->
<meta property="og:type" content="website">
<meta property="og:title" content="Rapheal Suber — Human Factors &amp; UX Systems">
<meta property="og:description" content="Portfolio of Rapheal Suber — Human Factors Psychology & UX Systems Designer, specializing in clinical software, accessibility, and high-stakes interaction design.">
<meta property="og:site_name" content="Rapheal Suber Portfolio">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Rapheal Suber — Human Factors &amp; UX Systems">
<meta name="twitter:description" content="Portfolio of Rapheal Suber — Human Factors Psychology & UX Systems Designer, specializing in clinical software, accessibility, and high-stakes interaction design.">

<!-- Performance Preconnects -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com" crossorigin>

<script>
  (function(){ var t; try { t = localStorage.getItem('rs-theme'); } catch(e){}
    document.documentElement.dataset.theme = (t === 'light') ? 'light' : 'dark'; })();
</script>
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
${S(workCode)}
${S(app)}
</body>
</html>
`;

const rootHtml = makeHtml(fastWork, false);
const standaloneHtml = makeHtml(standaloneWork, true);

fs.mkdirSync(path.join(root, 'export/portfolio'), { recursive: true });
fs.writeFileSync(path.join(root, 'export/portfolio/index.html'), standaloneHtml);
fs.writeFileSync(path.join(root, 'index.html'), rootHtml);
if (fs.existsSync(path.join(root, 'Rapheal-Portfolio'))) {
  fs.writeFileSync(path.join(root, 'Rapheal-Portfolio/index.html'), rootHtml);
}

console.log('wrote optimized index.html — ' + (rootHtml.length/1024).toFixed(1) + ' KB (super fast payload)');
console.log('wrote export/portfolio/index.html — ' + (standaloneHtml.length/1024).toFixed(1) + ' KB (standalone bundle)');
