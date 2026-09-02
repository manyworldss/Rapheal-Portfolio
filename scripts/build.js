/* ============================================================
   build.js — Lightning-Fast Production Compiler & Synchronizer
   1) Pre-compiles React JSX using esbuild into minified app.bundle.js (Zero runtime Babel).
   2) Generates production index.html with default dark mode (<html data-theme="dark">).
   3) Syncs all updated case studies & assets to root for clean root URLs (http://localhost:8000/).
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'Rapheal-Portfolio');

console.log('⚡ Starting high-performance build...');

// 1. Combine JSX files in dependency order
const jsxFiles = ['helpers.jsx', 'sections.jsx', 'overlays.jsx', 'currently.jsx', 'app.jsx'];
const combinedJSX = jsxFiles
  .map(f => {
    const fullPath = path.join(srcDir, f);
    return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
  })
  .join('\n\n');

const tempJsx = path.join(srcDir, '_combined_temp.jsx');
fs.writeFileSync(tempJsx, combinedJSX);

// 2. Transpile & minify with esbuild into app.bundle.js
const bundlePath = path.join(srcDir, 'app.bundle.js');
try {
  execSync(`npx --yes esbuild "${tempJsx}" --outfile="${bundlePath}" --minify`, { stdio: 'pipe' });
  fs.unlinkSync(tempJsx);
  console.log(`✅ Precompiled app.bundle.js (${(fs.statSync(bundlePath).size / 1024).toFixed(1)} KB)`);
} catch (err) {
  if (fs.existsSync(tempJsx)) fs.unlinkSync(tempJsx);
  console.error('❌ esbuild failed:', err.stderr ? err.stderr.toString() : err);
  process.exit(1);
}

// 3. Generate clean production index.html (Zero Babel, default dark mode)
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Rapheal Suber — Human Factors Psychology &amp; Systems</title>
<meta name="description" content="Portfolio of Rapheal Suber — Human Factors Psychology, AI Reliability, and Systems Thinking.">
<meta name="theme-color" content="#05070C">

<!-- Performance Preconnects -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com" crossorigin>

<script>
  (function(){
    try {
      var t = localStorage.getItem('rs-theme');
      document.documentElement.dataset.theme = (t === 'light') ? 'light' : 'dark';
    } catch(e) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
</script>
<link rel="stylesheet" href="./styles.css">
<style>
  html, body {
    background: var(--bg);
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  #root {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
  }
</style>
</head>
<body>
<div id="root"></div>

<!-- Fast React Production Build (Zero Runtime Babel) -->
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="./app.bundle.js" defer></script>
</body>
</html>
`;

// Write index.html to both Rapheal-Portfolio and root
fs.writeFileSync(path.join(srcDir, 'index.html'), indexHtmlContent);
fs.writeFileSync(path.join(root, 'index.html'), indexHtmlContent);
fs.copyFileSync(bundlePath, path.join(root, 'app.bundle.js'));

// 4. Copy updated case study files and design system tokens to root for clean URLs
const filesToSync = [
  'reach.html',
  'celio.html',
  'materialsiq.html',
  'prox.html',
  'ai-reliability.html',
  'styles.css',
];

for (const file of filesToSync) {
  const src = path.join(srcDir, file);
  const dest = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Recursively copy tokens, css, demo directories if needed
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

copyDir(path.join(srcDir, 'tokens'), path.join(root, 'tokens'));
copyDir(path.join(srcDir, 'css'), path.join(root, 'css'));
copyDir(path.join(srcDir, 'demo'), path.join(root, 'demo'));

console.log('🎉 Build complete! Site is synchronized at root and Rapheal-Portfolio.');
