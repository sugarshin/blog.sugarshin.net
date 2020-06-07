import * as actions from 'actions/articles'
import types from 'constants/ActionTypes'

describe('articles actions suite', () => {
  it('requestArticleList', () => {
    expect(actions.requestArticleList()).toMatchObject({
      type: types.REQUEST_ARTICLE_LIST,
    })
  })
  it('receiveArticleList', () => {
    expect(actions.receiveArticleList([{ title: 'SOME TITLE', body: 'body' }])).toMatchObject({
      type: types.RECEIVE_ARTICLE_LIST,
      payload: {
        items: [{ title: 'SOME TITLE', body: 'body' }],
      },
    })
  })
})
