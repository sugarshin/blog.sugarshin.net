const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--headless', '--disable-gpu'],
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
