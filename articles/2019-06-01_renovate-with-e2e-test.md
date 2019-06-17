---
title: Renovate と E2E テストを用いて依存モジュールのアップデートを安全に自動化する
date: 2019-06-01 19:46
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: renovate, cypress, circleci
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2019/06/01/renovate-with-e2e-test/main.png
---

![Main](/assets/images/2019/06/01/renovate-with-e2e-test/main.png)

当ブログプロジェクトの依存モジュールのアップデートを、 [Renovate](https://renovatebot.com/) と E2E テストを用いて安全に自動化する環境を整えました。

*[React と Redux なブログ運用をソフトウェア開発する話し](https://blog.sugarshin.net/2016/07/14/blog-like-software-development)*

## Table of Contents

## モチベーション

Renovate は依存モジュールにアップデートがあるとプルリクエストを作成してくれますが、設定次第ではその挙動をいろいろカスタマイズでき、さらにマージも自動でやってくれます。

CI のステータスチェック次第で安全にマージできるので、ユニットテストやビルドだけではなく、 E2E テストも実行することでその安全性をより担保しました。

そもそもの前提として、自分はソフトウェア開発プロセスの自動化についてはかなり積極的で、可能な限りそれを実施することで品質、スピード、スケーラビリティなどに寄与するほか、人的なオペレーションミスなども防げます。

## Cypress

E2E テストについては、 [Cypress](https://www.cypress.io/) を利用しています。オールインワンなフレームワークで、E2E テストに特化したフレームワークです。また、 Selenium を利用していなく独自のアーキテクチャで実行されている模様で、インストールも npm からインストールするだけなので楽です。

```js
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
```

ref: https://github.com/sugarshin/blog.sugarshin.net/blob/598cfb1abe3d11c7ccc8951687bc3f95d6982a87/cypress/integration/index.test.js

まだ最低限のテストケースしか書いてないので今後増やしていかないとです。

個人的に、 Cypress の API が使いづらくてテスト書くのに時間かかります。

## Renovate

公式の設定プリセットがとても充実しているのでそれらを眺めていればだいたいやりたいことはできます。 [renovatebot/presets](https://github.com/renovatebot/presets)

デフォルトプリセットに `:automergeAll` があるのでこれを設定します。これですべてのパッケージに対してオートマージが効きます。 https://github.com/sugarshin/blog.sugarshin.net/blob/84a66d2d3c1eb951c4fd7d72a5f3ad22270414cd/renovate.json

ベースとなるコンフィグは自分用に汎用化してあり、ほかのプロジェクトやライブラリでも利用しています。

[sugarshin/renovate-config: My shareable config for Renovate](https://github.com/sugarshin/renovate-config)

npm にパブリッシュしておくだけで、インストールせずに設定を利用可能です。 [@sugarshin/renovate-config  -  npm](https://www.npmjs.com/package/@sugarshin/renovate-config)

```json
{
  "extends": [
    "@sugarshin:js-app"
  ]
}
```

また、 `prConcurrentLimit` や `prHourlyLimit` でプルリクエストの発行数を制限し、メインブランチが更新されるたびに Renovate が自身の全プルリクエストを更新して CI がものすごくスタックしていくのを防いでいます。

- https://github.com/sugarshin/renovate-config/blob/903985ad15418268b9ccd1a098378d8487adc375/package.json#L52
- https://github.com/sugarshin/renovate-config/blob/903985ad15418268b9ccd1a098378d8487adc375/package.json#L59

モジュールマネージメントツールに関して、開設当初は [Greenkeeper](https://greenkeeper.io/) を利用していましたが、カスタマイズ性の高さで 2018 年末から Renovate に移行しています。 [Configure Renovate by renovate · Pull Request #314 · sugarshin/blog.sugarshin.net](https://github.com/sugarshin/blog.sugarshin.net/pull/314)

## CI

CircleCI の Orbs に Cypress 公式の Orb があるのでこれを利用します。 [CircleCI Orb Registry - cypress-io/cypress](https://circleci.com/orbs/registry/orb/cypress-io/cypress)

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.7.0
workflows:
  test_build_deploy:
    jobs:
      - cypress/run:
          name: e2e_test
          executor: cypress_browsers_chrome
          yarn: true
          cache-key: 'v1-dependencies-cypress-{{ checksum "yarn.lock" }}'
          build: NODE_ENV=production npm run build:e2e-test
          start: PORT=3000 node e2e-test/server
          wait-on: 'http-get://localhost:3000'
          browser: chrome
          no-workspace: true
          store_artifacts: true
```

ref: https://github.com/sugarshin/blog.sugarshin.net/blob/598cfb1abe3d11c7ccc8951687bc3f95d6982a87/.circleci/config.yml

Renovate が出した各プルリクエストに対してテストする必要があるので、プルリクエストごとの依存関係のモジュールらでビルドしたアセットを、サーバを立てて配信しそれに対して Cypress でテストしています。

`cypress/run` ジョブがとれるオプションで、テスト前にビルドしたりサーバを立てたりできます。

> `wait-on: 'http-get://localhost:3000'`

サーバが起動するまで待機させることができるのですが、 `wait-on` はデフォルトでは `OPTIONS` メソッドでリクエストをポーリングしてくるので、それ用のルーティングを用意する必要があります。もしくは指定オリジンのプロトコルを `http-get:` とすることで `GET` メソッドでリクエストしてくれます。

ref: https://github.com/jeffbski/wait-on#readme

---

プライベートなプロジェクトでモジュールの更新は滞りがちだったのでこれでかなり改善できそう。 https://circleci.com/gh/sugarshin/blog.sugarshin.net
