---
title: CircleCI Orbs をつかって npm モジュール開発を効率化する
date: 2019-06-26 02:30
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: circleci, circleci-orbs, npm
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2019/06/26/npm-modules-development-with-circleci-orbs/main.png
---

![](/assets/images/2019/06/26/npm-modules-development-with-circleci-orbs/main.png)

[npm](https://www.npmjs.com/) コマンドを用途に合わせて便利にまとめたユーティリティを [CircleCI Orbs](https://circleci.com/orbs/) として公開しました。

[CircleCI Orb Registry - sugarshin/npm](https://circleci.com/orbs/registry/orb/sugarshin/npm)

sources: https://github.com/sugarshin/circleci-orbs

## Table of Contents

## モチベーション

普段 npm モジュールを作る際に [CircleCI](https://circleci.com/) を利用していますが、 CI でテスト、ビルド、パブリッシュまでやってもらっています。毎回構成やジョブはだいたい同じなので共通化するべく CircleCI Orbs としてまとめました。

## release ジョブ

npm レジストリへのパブリッシュと Git のタグつけまで自動でやってくれるジョブです。

ref: https://circleci.com/orbs/registry/orb/sugarshin/npm#jobs-release

プロジェクトの `package.json` の `vesion` をパブリッシュ済みの最新バージョンと比較してインクリメントされていたらこのジョブが上記を実行します。

```yaml
# Example
version: 2.1

orbs:
  npm: sugarshin/npm@0.1.3

executors:
  nodejs:
    docker:
      - image: circleci/node:12.4.0

jobs:
  # ...

workflows:
  test_build_publish:
    jobs:
      - test
      - build
      - npm/release:
          executor: nodejs
          attach-workspace: true
          tagging: true
          ssh-fingerprints: ff:22:gs:v6:gg:2g:22:7j:73:gf:ja:36:ff:y2:22:89
          requires:
            - test
            - build
```

こんな感じのインクリメントする npm-scripts を用意しておけば便利です。

```json
{
  "scripts": {
    "update-pkg-version": "npm --no-git-tag-version version",
    "postupdate-pkg-version": "git add package.json package-lock.json && MESSAGE=$(node -p \"require('./package.json').version\"); git commit -m $MESSAGE",
    "u": "npm run update-pkg-version",
    "u:patch": "npm run u -- patch",
    "u:minor": "npm run u -- minor",
    "u:major": "npm run u -- major"
  }
}
```

```bash
$ npm run u:patch
$ git push origin patch-1
$ hub pull-request -b master -h patch-1 -m "<version>"
```

公式の npm レジストリ以外へのパブリッシュには未対応です。

## install コマンド

ついでにこれもお決まりでやる依存モジュールのインストール && キャッシュをするコマンドも用意しました。

ref: https://circleci.com/orbs/registry/orb/sugarshin/npm#commands-install

```yaml
jobs:
  test:
    executor: nodejs
    steps:
      - checkout
      - npm/install
      - run:
          name: Lint
          command: npm run lint
      - run:
          name: Test
          command: npm test
```

## Orbs

Orbs 自体の CI に関しては公式の Orbs 用ツール群の Orbs があってまるっと任せられて楽でした。

[CircleCI Orb Registry - circleci/orb-tools](https://circleci.com/orbs/registry/orb/circleci/orb-tools)

https://github.com/CircleCI-Public/orb-tools-orb

```yaml
version: 2.1

orbs:
  orb-tools: circleci/orb-tools@8.27.1

workflows:
  lint_pack_publish-dev:
    jobs:
      - orb-tools/lint
      - orb-tools/pack:
          name: pack-npm
          source-dir: src/npm
          destination-orb-path: packed/npm/orb.yml
          workspace-path: packed/npm/orb.yml
          artifact-path: packed/npm/orb.yml
          requires:
            - orb-tools/lint
      - orb-tools/publish-dev:
          name: publish-dev-npm
          orb-name: sugarshin/npm
          orb-path: workspace/packed/npm/orb.yml
          requires:
            - pack-npm
      - orb-tools/trigger-integration-workflow:
          name: trigger-integration-workflow-npm
          ssh-fingerprints: 84:ce:ef:5a:1a:c2:65:df:54:80:ad:80:d7:7f:50:47
          requires:
            - publish-dev-npm
      - orb-tools/dev-promote-prod:
          name: dev-promote-prod-npm-patch
          orb-name: sugarshin/npm
          release: patch
          ssh-fingerprints: 84:ce:ef:5a:1a:c2:65:df:54:80:ad:80:d7:7f:50:47
          requires:
            - trigger-integration-workflow-npm
          filters:
            branches:
              ignore: /.*/
            tags:
              only: /master-patch.*/
```

ref: https://github.com/sugarshin/circleci-orbs/blob/master/.circleci/config.yml

Lint, Pack（ビルド）, 開発用デプロイ、統合テスト、本番プロモートまで揃ってます。
