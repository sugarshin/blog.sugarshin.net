import * as actions from 'actions/article'
import types from 'constants/ActionTypes'

describe('article actions suite', () => {
  it('useCachedArticle', () => {
    expect(actions.useCachedArticle('https://example.com/foo/bar/buz')).toMatchObject({
      type: types.USE_CACHED_ARTICLE,
      payload: {
        url: 'https://example.com/foo/bar/buz',
      },
    })
  })
  it('requestArticle', () => {
    expect(actions.requestArticle()).toMatchObject({
      type: types.REQUEST_ARTICLE,
    })
  })
  it('receiveArticle if successfully', () => {
    const data = { markdown: '# Title\n\n- list\n- list', url: 'https://example.com/foo/bar/buz', foo: 1 }
    expect(actions.receiveArticle(data)).toMatchObject({
      type: types.RECEIVE_ARTICLE,
      payload: {
        markdown: '# Title\n\n- list\n- list',
        url: 'https://example.com/foo/bar/buz',
      },
    })
  })
  it('receiveArticle if unsuccessfully', () => {
    const actual = actions.receiveArticle(new Error('some error'))
    expect(actual).toHaveProperty('type', types.RECEIVE_ARTICLE)
    expect(actual).toHaveProperty('payload')
    expect(actual.payload).toBeInstanceOf(Error)
    expect(actual).toHaveProperty('error', true)
  })
})
