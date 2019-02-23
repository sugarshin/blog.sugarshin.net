const assert = require('assert')
const puppeteer = require('puppeteer')
const { siteName } = require('../config/settings')

let browser

const main = async () => {
  browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })

  const rootTitle = await page.title()
  assert(rootTitle === siteName)

  const topArticleListItems = await page.$$('#top-article-list > div')
  assert(topArticleListItems.length > 0)

  const firstArticleAnchor = await topArticleListItems[0].$('a')
  await firstArticleAnchor.click()
  await page.waitForSelector('#article-detail')
  const currentTitle = await page.title()
  assert(rootTitle !== currentTitle)

  const articleMarkdownBodyChildren = await page.$$('#article-detail .markdown-body > *')
  assert(articleMarkdownBodyChildren.length > 0)

  await browser.close()
}

main().catch(async e => {
  console.error(e) // eslint-disable-line no-console
  await browser.close()
  process.exit(1)
})
