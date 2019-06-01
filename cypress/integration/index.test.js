/// <reference types="Cypress" />

const url = require('url')
const { siteName } = require('../../config/settings')

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const subjects = [
    `should page title "${siteName}"`,
    'should have one or more article list on the top page',
    'should change to article page when click each items on the top page',
  ]

  it(subjects.join('\n'), async () => {
    cy.title().should('eq', siteName)

    cy.get('#top-article-list > div').its('length').should('be.gt', 0)

    // TODO: test to behavior of clicking main title
    // click the more link of first article
    cy.get('#top-article-list > div').eq(0).find('a').eq(1).click()

    cy.url().should(pageUrl => {
      const parsedUrl = url.parse(pageUrl)
      expect(/^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9_-]+$/.test(parsedUrl.pathname)).to.ok
    })

    cy.title().should('not.eq', siteName)

    cy.get('#article-detail .markdown-body > *').its('length').should('be.gt', 0)
  })
})
