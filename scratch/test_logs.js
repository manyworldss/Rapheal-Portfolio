const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Testing reach.html');
  await page.goto('http://localhost:8000/reach.html', { waitUntil: 'networkidle2' });
  
  console.log('Testing index.html');
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle2' });

  await browser.close();
})();
