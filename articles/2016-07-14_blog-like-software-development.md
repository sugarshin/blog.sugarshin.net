---
title: React と Redux なブログ運用をソフトウェア開発する話し
date: 2016-07-14 00:52
public: true
tags: react.js, redux, javascript, software development
ogp:
  og:
    image:
      content: https://log.sugarshin.net/assets/images/2016/07/14/blog-like-software-development/main.png
---

![Main](/assets/images/2016/07/14/blog-like-software-development/main.png)

継続的なソフトウェア開発プロセスを取り入れ、最低限の SEO は考慮しつつ無理矢理 React でブログを作ってみたという話しです。

---

個人ブログ開設にあたり何を使おうか迷いまして、いろいろ考えた結果結局 React と Redux で自作しました。

過去の経験上、普通にブログを続けていくだけではモチベーションを保てないなぁと思い、ソフトウェア開発的なプロセスや自動化を取り入れつつという感じです。

https://github.com/sugarshin/log.sugarshin.net

Redux 周りを最近触っていなかったので久しぶりに触りたかったというのも理由付けの一つです。

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

本体は特に変哲もない普通の React + react-router です。 Redux のディレクトリ構成に沿ってはいます。

特に複雑な非同期処理もないので普通に redux-thunk でよっこいしょしています。

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

Markdown で書いた記事を XHR で取ってきて remark でレンダリングしています。

[remark][https://github.com/wooorm/remark] はプラガブルな Markdown パーサ & コンパイラです。

```json
{
  "remark": "~5.0.1",
  "remark-highlight.js": "~3.1.1",
  "remark-html": "3.0.1",
  "remark-slug": "~4.2.0",
  "remark-yaml-config": "~3.0.2"
}
```

### Enzyme

React コンポーネントのテストは [Enzyme](https://github.com/airbnb/enzyme) を使ってみました。普通に DOM を触っている感じでテストが書けるので面白いかなと思います。

```js
import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';

describe('Article suite', () => {
  const Article = require('../../src/components/Article').default;
  it('contains spec with an expectation', () => {
    const markdown = '';
    assert(shallow(<Article article={{ markdown }} />).is('.markdown-body'));
  });
});
```

テスト周りは Mocha, power-assert, babel-preset-power-assert, なこちらも定番な感じす。

が、まだテストはほとんど書けてません。。

## webpack

webpack はやれることも多くドキュメントも貧弱ですが、これじゃないといろいろ実現しないですね。

普通に Babel, ESLint, [Stylint](https://github.com/rossPatton/stylint) な感じです。

また、 CSS Modules は css-loader で実現しています。

```js
const production = NODE_ENV === 'production';
const localIdentName = production ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]';
const cssModules = `modules&importLoaders=1&localIdentName=${localIdentName}`;
const cssLoader = production ? `css?minimize&${cssModules}` : `css?${cssModules}`;
```

コンポーネントを意識した構成にさえしていれば、ある程度雑に CSS を書いても大丈夫ですし、面倒な class 名の命名に悩む必要もないのでとっても気に入っています。

Stylus で書いて PostCSS でポストプロセスしつつ最終的に style-loader でインライン化しています。

```js
{
  test: /\.styl$/,
  loaders: ['style', cssLoader, 'postcss', 'stylus']
}
```

CSS ファイルの管理を意識しなくていいので楽です。

## 開発、執筆プロセス

`npm start` で 開発サーバが立ち上がります。

その他、記事一覧のデータをとるための JSON ファイルを生成したり、本番で記事情報を取ってきている GitHub API のモックとして利用するファイルを生成したりしています。

新しい記事を書くときは `npm run na -- --name example-name` で `.md` ファイルと必要なディレクトリを生成します。

また、 [textlint](https://github.com/textlint/textlint) を利用し、自然言語のリントも行っています。

文章のフォーマットなどは気分によって変わる場合もあったり、文章校正はどうしてもヒューマンエラーが起こるのでこういうツールに丸投げするのも有りですね。

採用ルールは一旦こんな感じです。

```json
{
  "rules": {
    "preset-ja-technical-writing": true,
    "eslint": {
      "configFile": ".eslintrc"
    }
  }
}
```

記事内のコードブロックに対しても ESLint でリントします。

こちらもビルド時にその他リントと一緒に走ります。

また、開発時は index.html のみで SPA として動きます。

## ビルド、デプロイ

ホスティングは GitHub Pages です。

なので、 SEO のためにも各記事ごとに静的ファイルを用意しないといけないのですが、

当初は `ReactDOMServer.renderToStaticMarkup` でビルド時に、サーバーサイドレンダリングライクな感じで吐いて、レンダリング済みの DOM とスムーズに連携できる予定でしたがうまくいかず。。

結局、 [Pug](https://github.com/pugjs/pug) で各ページ分、内容を雑にレンダリングして内容部分は `style="display: none;"` しつつ生成するようにしています。笑

これで各ページ分クロールもされ、アクセス後は SPA として動作します。

Google Search Console でも今のところ特に問題視されていません。

その他、 Sitemap や RSS, Atom フィード用のファイル、 Favicon, OG 画像等もビルド時 script でつくっています。

master ブランチにマージされると、テスト、ビルド、デプロイと Travis CI で CI がまわります。

## Greenkeeper

[Greeankeeper](https://greenkeeper.io/) でライブラリの最新化もほぼ自動化しています。

利用ライブラリにアップデートがあると Bot からプルリクがとんでくるのであとは CI が通ればマージするだけです。

`npm-check-updates` よりも楽かなと思います。

OSS のリポジトリだと無料で利用できるので、他の自分の OSS でも利用しています。

## TODOs

- テストをかく
- `ReactDOMServer.renderToStaticMarkup` でスマートにしたい
- SEO をもう少しがんばる
- もろもろ整理、パッケージにして OSS 化（React static blog generator ?）したい
