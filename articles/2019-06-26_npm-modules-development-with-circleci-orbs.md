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

## 目次

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

## CI

Orbs のリポジトリは Monorepo で構成してあるので、 CI で変更が加えられた Orb のみ処理対象としたいです。 CircleCI では `CIRCLE_COMPARE_URL` という環境変数が用意されていて、前コミットとの差分を VCS 側で確認できる URL をとれます。

上記を利用すれば変更された Orb のみビルドやパブリッシュの対象とできるのですが、 CircleCI 2.1 ではこれが無効となります。

これを利用できるようにする Orb が公開されているので利用します。

[CircleCI Orb Registry - iynere/compare-url](https://circleci.com/orbs/registry/orb/iynere/compare-url)

source: https://github.com/iynere/compare-url

`reconstruct` を実行したあとに、 `use` の `custom-logic` パラメータに渡す Shell script 内の環境変数で `COMMIT_RANGE` が利用できるようになります。

例えば、変更があった Orb のみ `circleci config pack <path>` コマンドで、 Command や Job ごとに分割して記述した Orb を 1 つのファイルにまとめ上げる場合、下記のようにします。

```yaml
jobs:
  pack:
    executor: circleci_cli
    parameters:
      dist-dir:
        type: env_var_name
        default: DIST_DIR
    steps:
      - circle-compare-url/reconstruct:
          project-path: *workspace-root
      - circle-compare-url/use:
          step-name: Packup modified orbs
          custom-logic: |
            mkdir -pv $<< parameters.dist-dir >>

            for ORB in ${SRC_DIR}/*/; do
              orbname=$(basename $ORB)
              if [[ $(git diff $COMMIT_RANGE --name-status | grep "$orbname") ]]; then
                orbpath=${DIST_DIR}/${orbname}/orb.yml
                mkdir -pv $(dirname $orbpath)
                circleci config pack ${SRC_DIR}/${orbname} > ${orbpath}
                circleci orb validate ${orbpath}
              else
                echo "${orbname} not modified; no need to packing"
              fi

              echo "------------------------------------------------------"
            done
```

ref: https://github.com/sugarshin/circleci-orbs/blob/master/.circleci/config.yml
