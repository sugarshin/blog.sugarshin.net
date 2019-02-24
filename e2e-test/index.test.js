const { PORT } = require('./config')
const { siteName } = require('../config/settings')

beforeAll(async () => {
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' })
})

const subjects = [
  `should page title "${siteName}"`,
  'should have one or more article list on the top page',
  'should change to article page when click each items on the top page',
]

it(subjects.join('\n'), async () => {
  const rootTitle = await page.title()
  expect(rootTitle).toBe(siteName)

  const topArticleListItems = await page.$$('#top-article-list > div')
  expect(topArticleListItems.length > 0).toBe(true)

  const firstArticleAnchor = await topArticleListItems[0].$('a')
  await firstArticleAnchor.click()
  await page.waitForSelector('#article-detail')
  const currentTitle = await page.title()
  const articleMarkdownBodyChildren = await page.$$('#article-detail .markdown-body > *')
  expect(currentTitle).not.toBe(rootTitle)
  expect(articleMarkdownBodyChildren.length > 0).toBe(true)
})
