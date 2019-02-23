const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
  const title = await page.title()
  console.log('title:', title)
  await browser.close()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
