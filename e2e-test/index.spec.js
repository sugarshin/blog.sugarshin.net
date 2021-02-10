import url from 'url'
import playwright from 'playwright'
import { siteName } from '../config/settings'

const BASE_URL = process.env.BASE_URL.replace(/\/$/, '')
const { ARTIFACTS_DIR } = process.env

for (const browserType of ['chromium', 'firefox', 'webkit']) {
  describe(`E2E Testing: ${browserType}`, () => {
    let browser
    let page

    beforeAll(async () => {
      const opt = browserType === 'chromium' ? { args: ['--no-sandbox'] } : undefined
      browser = await playwright[browserType].launch(opt)
    })

    afterAll(async () => {
      await browser.close()
    })

    beforeEach(async () => {
      page = await browser.newPage()
    })

    afterEach(async () => {
      await page.close()
    })

    it([
      `should page title "${siteName}"`,
      'should have one or more article list on the top page',
      'should change to article page when click each items on the top page',
    ].join(', '), async () => {
      await page.goto(`${BASE_URL}/`)
      await page.screenshot({ path: `${ARTIFACTS_DIR}/top-ss-${browserType}-${Date.now()}.png` })
      expect(await page.title()).toBe(siteName)

      const articleListItems = await page.$$('#top-article-list > div')
      expect(articleListItems.length).toBeGreaterThan(0)

      const firstItem = articleListItems[0]
      expect(firstItem).toBeTruthy()

      const itemAnchors = await firstItem.$$('a')
      await Promise.all([
        page.waitForSelector('#article-detail'),
        page.waitForNavigation(),
        itemAnchors[1].click(),
      ])
      await page.screenshot({ path: `${ARTIFACTS_DIR}/article-ss-${browserType}-${Date.now()}.png` })

      expect(await page.title()).not.toBe(siteName)

      const parsedUrl = url.parse(page.url())
      expect(parsedUrl.pathname).toEqual(
        expect.stringMatching(/^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9_-]+\/$/)
      )

      const mdBody = await page.$$('#article-detail .markdown-body > *')
      expect(mdBody.length).toBeGreaterThan(0)
    })
  })
}
