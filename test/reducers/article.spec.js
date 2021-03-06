import { __DO_NOT_USE__ActionTypes as ReduxActionTypes } from 'redux'
import reducer from 'reducers/article'
import * as actions from 'actions/article'
import { article as initialState } from 'reducers/initialState'

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
      next: null,
      prev: null,
      isFetching: true,
      didInvalidate: false,
      cache: {},
      error: null,
    })
  })
  it('receiveArticle', () => {
    const markdown = `---
title: Foo
date: 2016-06-05 10:44
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: nitto, sugino, fixed gear
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2016/06/05/foo/main.png
---

- bar
- buz
`
    const url = '2016-06-05_foo.md'
    const next = { title: 'Next articel title', url: '/hoge' }
    const prev = { title: 'Previous articel title', url: '/fuga' }
    const actual = reducer(state, actions.receiveArticle({ markdown, url, next, prev }))
    expect(actual).toMatchObject({
      title: 'Foo',
      markdown,
      author: {
        name: 'Shingo Sato',
        url: 'https://sugarshin.net/',
      },
      date: '2016-06-05 10:44',
      tags: ['nitto', 'sugino', 'fixed gear'],
      url,
      next,
      prev,
      isFetching: false,
      didInvalidate: false,
      cache: { [url]: { markdown, next, prev } },
      error: null,
    })
  })
})
