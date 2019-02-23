const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
}

main()
