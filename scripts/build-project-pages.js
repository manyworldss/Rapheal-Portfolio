// Generate current project articles from the same records used by the cartridge shelf.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} }; vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'ui_kits/portfolio/work.jsx'),'utf8'),context);
const esc = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const asset = src => src.replace('../../Rapheal-Portfolio/','').replace('../../','');
for (const item of context.window.WORK.filter(w=>['celio','birk','runa'].includes(w.id))) {
 const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(item.title)} — Rapheal Suber</title><meta name="description" content="${esc(item.blurb)}"><script>try{document.documentElement.dataset.theme=localStorage.getItem('rs-theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}</script><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="css/project-console.css"></head><body>
<header class="article-nav"><a href="index.html#work">← Project library</a><span>${esc(item.code)} / ${esc(item.title)}</span><button id="theme-toggle" aria-label="Switch color theme">Light / dark</button></header>
<main class="project-article"><div class="article-heading"><p class="console-label">${esc(item.disciplines.join(' / '))}</p><h1>${esc(item.title)}</h1><p class="article-lede">${esc(item.blurb)}</p><div class="article-actions">${item.liveUrl?`<a class="console-button" href="${esc(item.liveUrl)}" target="_blank" rel="noopener">${esc(item.liveLabel||'Website')} ↗</a>`:''}${item.repoUrl?`<a class="console-button" href="${esc(item.repoUrl)}" target="_blank" rel="noopener">Repository ↗</a>`:''}</div></div>
${item.hero?`<figure class="article-hero"><img src="${asset(item.hero)}" alt="Current Celio marketing website with iPhone app mockup"><figcaption>Captured from <a href="https://manyworldss.github.io/Celio/">Celio’s current marketing site</a>. Product screens shown are the site’s mockups.</figcaption></figure>`:''}
<dl class="article-meta">${item.meta.map(m=>`<div><dt>${esc(m.k)}</dt><dd>${esc(m.v)}</dd></div>`).join('')}</dl>
<div class="article-chapters">${Object.entries(item.sections).map(([title,body],i)=>`<section><span class="console-label">CHAPTER ${String(i+1).padStart(2,'0')}</span><h2>${esc(title)}</h2>${Array.isArray(body)?`<ul>${body.map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`:`<p>${esc(body)}</p>`}</section>`).join('')}</div>
${item.photoSlots?`<section><h2>Project visuals</h2><div class="photo-slots">${item.photoSlots.map(v=>`<div class="photo-slot"><span aria-hidden="true">[ + ]</span><strong>${esc(v)}</strong><p>${item.upcoming?'Coming soon':'Photo / screenshot to be added'}</p></div>`).join('')}</div></section>`:''}
${item.gallery?`<section class="article-gallery"><h2>Current direction</h2>${item.gallery.map(g=>`<figure><img src="${asset(g.src)}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</section>`:''}
<footer><a class="console-button" href="index.html#work">← Back to the project library</a></footer></main><script src="js/project-console.js"></script></body></html>`;
 fs.writeFileSync(path.join(root,item.id+'.html'),html);
}
