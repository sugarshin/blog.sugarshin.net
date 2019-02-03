import * as path from 'path'

describe('Google', () => {
  beforeAll(async () => {
    await page.goto(
      `file://${path.resolve(
        process.cwd(),
        'build',
        'index.html'
      )}`
    )
  })

  it('should display "google" text on page', async () => {
    console.log('page', page)
    await expect(page).toMatch('google')
  })
})

// describe('Google', () => {
//   beforeAll(async () => {
//     await page.goto('https://google.com')
//   })

//   it('should display "google" text on page', async () => {
//     await expect(page).toMatch('google')
//   })
// })
