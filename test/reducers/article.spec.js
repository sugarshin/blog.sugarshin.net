import { ActionTypes as ReduxActionTypes } from 'redux/lib/createStore'
import reducer from 'reducers/article'
import * as actions from 'actions/article'
import { article as initialState } from 'initialState'

describe('article reducer suite', () => {
  let state
  beforeEach(() => {
    state = reducer(initialState, ReduxActionTypes.INIT)
  })
  it('fetchArticle', () => {
    const actual = reducer(state, actions.fetchArticle())
    expect(actual).toMatchObject(initialState)
  })
  it('requestArticle', () => {
    const actual = reducer(state, actions.requestArticle())
    expect(actual).toMatchObject({
      title: '',
      markdown: '',
      url: '',
      isFetching: true,
      didInvalidate: false,
      cache: {},
      error: null,
    })
  })
  it('receiveArticle', () => {
    const markdown = `---
title: Foo
---

- bar
- buz
`
    const url = '/foo'
    const actual = reducer(state, actions.receiveArticle({ markdown, url }))
    expect(actual).toMatchObject({
      title: 'Foo',
      markdown,
      url,
      isFetching: false,
      didInvalidate: false,
      cache: { [url]: markdown },
      error: null,
    })
  })
})
