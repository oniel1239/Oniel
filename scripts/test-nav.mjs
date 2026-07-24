import { chromium, devices } from 'playwright';

(async () => {
  const iPhone = devices['iPhone 13'];
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  try {
    await page.goto('http://localhost:3000/Oniel/');
    await page.waitForLoadState('networkidle');

    const links = ['About', 'Services', 'Portfolio', 'Contact'];
    for (const text of links) {
      // Find the nav link by text and click
      const handle = await page.locator(`text=${text}`).first();
      if (!await handle.count()) {
        console.log(`Link not found: ${text}`);
        continue;
      }
      await handle.click({ force: true });
      // Give time for smooth scroll animation
      await page.waitForTimeout(600);
      const activeTag = await page.evaluate(() => document.activeElement && document.activeElement.tagName);
      console.log(`${text} clicked — active element: ${activeTag}`);
    }

    console.log('Test finished');
  } catch (err) {
    console.error('Error during test:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
