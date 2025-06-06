---
title: React と Redux なブログ運用をソフトウェア開発する話し
date: 2016-07-14 00:52
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags:
  - reactjs
  - redux
  - javascript
  - software development
ogp:
  og:
    image:
      src: /assets/images/2016/07/14/blog-like-software-development/main.png
---

![](/assets/images/2016/07/14/blog-like-software-development/main.png)

継続的なソフトウェア開発プロセスを取り入れ、最低限のSEOは考慮しつつ無理矢理Reactでブログを作ってみたという話しです。

***

個人ブログ開設にあたり何を使おうか迷いまして、いろいろ考えた結果結局ReactとReduxで自作しました。

過去の経験上、普通にブログを続けていくだけではモチベーションを保てないなぁと思い、ソフトウェア開発的なプロセスや自動化を取り入れつつという感じです。

https://github.com/sugarshin/blog.sugarshin.net

Redux周りを最近触っていなかったので久しぶりに触りたかったというのも理由付けの1つです。

## 目次

## 利用ツール

主な利用ツールは以下です。

- React
- react-router
- Redux
- redux-thunk
- webpack
- Babel with ES2015
- CSS Modules
- PostCSS
- Stylus
- Pug
- remark
- textlint
- ESLint
- Stylint
- Mocha
- power-assert
- Enzyme
- Travis CI
- Greenkeeper

大まかに順番に解説します。

## React

本体は特に変哲もない普通のReact + react-routerです。 Reduxのディレクトリ構成に沿ってはいます。

特に複雑な非同期処理もないのでredux-thunkでよっこいしょしています。

```sh
src
├── actions
├── apis
├── components
│   ├── Article
│   │   ├── index.js
│   │   └── index.styl
│   ├── ArticleItem
│   │   ├── index.js
│   │   └── index.styl
│   ├── Articles
│   │   ├── index.js
│   │   └── index.styl
│   └── ...
├── constants
│   ├── ActionTypes.js
│   └── initialState.js
├── containers
│   ├── App.js
│   ├── DevTools.js
│   └── ...
├── images
├── index.js
├── reducers
│   ├── article.js
│   ├── articles.js
│   ├── index.js
│   └── ...
├── routes
│   ├── Archives.js
│   ├── Article.js
│   └── ...
├── store
│   ├── configureStore.dev.js
│   ├── configureStore.js
│   └── configureStore.prod.js
├── stylus
├── template
└── utils
```

Markdownで書いた記事をXHRで取ってきてremarkでレンダリングしています。

[remark][https://github.com/wooorm/remark]はプラガブルなMarkdownパーサ & コンパイラです。

```json
{
  "rehype-highlight": "~1.0.0",
  "rehype-stringify": "~1.0.0",
  "remark-parse": "~1.0.0",
  "remark-rehype": "~1.0.0",
  "remark-toc": "~3.0.1",
  "remark-yaml-config": "~3.0.2",
  "unified": "~4.1.2"
}
```

```js
const unified = require('unified')
const parse = require('remark-parse')
const toc = require('remark-toc')
const yamlConfig = require('remark-yaml-config')
const remarkToRehype = require('remark-rehype')
const highlight = require('rehype-highlight')
const stringify = require('rehype-stringify')

unified()
  .use(parse)
  .use(toc)
  .use(yamlConfig)
  .use(remarkToRehype)
  .use(highlight)
  .use(stringify)
  .process('# markdown')
```

### Enzyme

Reactコンポーネントのテストは [Enzyme](https://github.com/airbnb/enzyme) を使ってみました。普通にDOMを触っている感じでテストが書けるので面白いかなと思います。

```js
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'

describe('Article suite', () => {
  const Article = require('../../src/components/Article').default
  it('contains spec with an expectation', () => {
    const markdown = ''
    assert(shallow(<Article article={{ markdown }} />).is('.markdown-body'))
  })
})
```

テスト周りはMocha, power-assert, babel-preset-power-assert, なこちらも定番な感じす。

が、まだテストはほとんど書けてません。。

## webpack

webpackはやれることが多くドキュメントは充実しているとは言い難いですが、これじゃないといろいろ実現しないですね。

また、 CSS Modulesはcss-loaderで実現しています。

```js
const production = process.env.NODE_ENV === 'production';
const localIdentName = production ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]';
const cssModules = `modules&importLoaders=1&localIdentName=${localIdentName}`;
const cssLoader = production ? `css?minimize&${cssModules}` : `css?${cssModules}`;
```

コンポーネントを意識した構成にさえしていれば、ある程度雑にCSSを書いても大丈夫ですし、面倒なclass命名に悩む必要もないのでとっても気に入っています。

Stylusで書いてPostCSSでポストプロセスしつつ最終的にstyle-loaderでインライン化しています。

```js
{
  test: /\.styl$/,
  loaders: ['style', 'css', 'postcss', 'stylus']
}
```

CSSファイルの管理を意識しなくていいので楽です。

## 開発、執筆プロセス

`npm start` で開発サーバが立ち上がります。

その他、記事一覧のデータをとるためのJSONファイルを生成したり、本番で記事情報を取ってきているGitHub APIのモックとして利用するファイルを生成したりしています。

新しい記事を書くときは `npm run na -- --name example-name` で `.md` ファイルと必要なディレクトリを生成します。

### textlint

[textlint](https://github.com/textlint/textlint) を利用し、自然言語のリントも行っています。

文章のフォーマットなどは気分によって変わる場合もあったり、文章校正はどうしてもヒューマンエラーが起こるのでこういうツールに丸投げするのも有りですね。

こちらもビルド時にその他リントと一緒に走ります。

採用ルールは一旦こんな感じです。

```json
{
  "filters": {
    "comments": true
  },
  "rules": {
    "sentence-length": {
      "max": 140
    },
    "max-comma": {
      "max": 3
    },
    "max-ten": {
      "max": 3
    },
    "max-kanji-continuous-len": {
      "max": 5
    },
    "no-mix-dearu-desumasu": {
      "preferInHeader": "",
      "preferInBody": "ですます",
      "preferInList": "である",
      "strict": true
    },
    "no-double-negative-ja": true,
    "no-dropping-the-ra": true,
    "no-doubled-conjunctive-particle-ga": true,
    "no-hankaku-kana": true,
    "ja-no-successive-word": true,
    "ja-no-abusage": true,
    "preset-jtf-style": true,
    "eslint": {
      "configFile": ".eslintrc"
    }
  }
}
```

記事内のコードブロックに対してもESLintでリントします。

## ビルド、デプロイ

ホスティングはGitHub Pagesです。

なので、 SEOのためにも各記事ごとに静的ファイルを用意しないといけないのですが、

当初は `ReactDOMServer.renderToString` でビルド時に、サーバーサイドレンダリングライクな感じで吐いて、クライアントでレンダリング済みのDOMとReactがスムーズに連携できる予定でしたがうまくいかず。。

結局、 [Pug](https://github.com/pugjs/pug) で各ページ分、内容を雑にレンダリングして内容部分は `style="display: none;"` しつつ生成するようにしています。笑

これで各ページ分クロールもされ、アクセス後はSPAとして動作します。

Google Search Consoleでも今のところ特に問題視されていません。

その他、 sitemap.xmlやRSS, Atomフィード用のxml 、 Favicon, OG画像等もビルド時にscriptでつくっています。

masterブランチにマージされると、テスト、ビルド、デプロイとTravis CIでCIがまわります。

## Greenkeeper

[Greeankeeper](https://greenkeeper.io/) でライブラリの最新化もほぼ自動化しています。

利用ライブラリにアップデートがあるとBotからプルリクがとんでくるのであとはCIが通ればマージするだけです。

`npm-check-updates` よりも楽かなと思います。

OSSのリポジトリだと無料で利用できるので、他の自分のOSSでも利用しています。

## TODOs

- テストをかく
- `ReactDOMServer.renderToString` でスマートにしたい
- SEOをもう少しがんばる
- もろもろ整理、パッケージにしてOSS化（React static blog generator ?）したい
