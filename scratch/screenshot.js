const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a standard desktop size
  await page.setViewport({ width: 1280, height: 1024 });

  const urls = [
    { name: 'index', url: 'http://localhost:8000/' },
    { name: 'reach', url: 'http://localhost:8000/reach.html' },
    { name: 'celio', url: 'http://localhost:8000/celio.html' },
    { name: 'materialsiq', url: 'http://localhost:8000/materialsiq.html' }
  ];

  for (const { name, url } of urls) {
    console.log(`Taking screenshot of ${name}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      // Wait for any animations to finish
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({ path: `${name}.png`, fullPage: true });
      console.log(`Saved ${name}.png`);
    } catch (err) {
      console.error(`Failed to screenshot ${name}:`, err);
    }
  }

  await browser.close();
})();
