---
title: Web アプリケーションの印刷時スタイルを継続的にチェックして結果を Slack に通知する
date: 2018-04-28 16:00
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: slack, circleci, puppeteer
ogp:
  og:
    image:
      src: /assets/images/2018/04/28/printing-style-notify-slack/main.png
---

![](/assets/images/2018/04/28/printing-style-notify-slack/main.png)

Web ページの印刷は、気をつけていないとスタイルくずれを起こしやすいかなと思います。それが、日々、機能追加や改善を行う Web アプリケーションとなるとさらにこの問題がでてきます。

業務で開発している Web アプリケーションで印刷時のスタイリングをサポートするにあたり、継続的な見た目のチェックを自動化し、結果を Slack に通知するようにしました。

***

## 目次

## CircleCI

Web アプリケーションのデプロイをトリガーに、 CircleCI 上で実行します。

1. ヘッドレスブラウザで印刷をエミュレートし、 PDF やスクリーンショットをとる
2. 結果を Slack に通知する
3. 上記を CircleCI で実行

### .circleci/config.yml

```yaml
version: 2
jobs:
  build:
    branches:
      only:
        - master
    working_directory: ~/printing-style-notify
    docker:
      - image: circleci/node:8.11.1
    steps:
      - checkout
      - restore_cache:
          name: Restoring Yarn Cache
          keys:
            - v1-dependencies-{{ arch }}-{{ .Branch }}-{{ checksum "yarn.lock" }}
            - v1-dependencies-
      - run: yarn
      - save_cache:
          paths:
            - ~/printing-style-notify/node_modules
            - ~/.cache/yarn/
          key: v1-dependencies-{{ arch }}-{{ .Branch }}-{{ checksum "yarn.lock" }}
      - run:
          name: Setup libxcb
          command: bash .circleci/setup-libxcb.sh
      - run: node pdf-make.js
      - store_artifacts:
          path: print.pdf
      - store_artifacts:
          path: print.png
      - run: node slack-notify.js
```

CircleCI 公式 Node.js の Docker image で、後述する Puppeteer をさくっと動作させるために libxcb 関連のパッケージもインストールしています。

ref: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-324838511

```bash
#!/bin/bash

sudo apt-get update
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

CircleCI の REST API で実行します。

```bash
curl -XPOST "https://circleci.com/api/v1.1/project/github/$username/printing-style-notify?circle-token=$CIRCLE_TOKEN"
```

現状、 CircleCI 2.0 の Workflows は REST API から実行できないようなので、とりあえず 1 つの Job にまとめて記述してあります。

ref: https://discuss.circleci.com/t/trigger-workflow-through-rest-api/13931/47

## Puppeteer

[Puppeteer](https://github.com/GoogleChrome/puppeteer) を使ってみました。印刷時の PDF と、後述する Slack の通知でサムネイルを表示するためにスクリーンショットも生成します。

e.g.

```js
const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(process.env.TARGET_URL, { waitUntil: 'networkidle0' })
  await page.waitForSelector(process.env.TARGET_SELECTOR)
  await page.pdf({
    path: 'print.pdf',
    displayHeaderFooter: true,
    printBackground: true,
  })
  await page.emulateMedia('print')
  await page.screenshot({ path: 'print.png', fullPage: true })
  await browser.close()
}
main()
```

## Slack に通知

あとは先程 Artifacts としてストアされた PDF とスクリーンショットを Slack に Webhook 経由で通知するだけです。 [Attachments](https://api.slack.com/docs/message-attachments) で装飾してあげます。

通知先の Slack で PDF やスクリーンショットを参照できなきゃいけないので、これも CircleCI の API でとるようにしています。

e.g.

```js
const { IncomingWebhook } = require('@slack/client')
const getArtifacts = require('./getArtifacts')

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)

const main = async () => {
  const artifacts = await getArtifacts()
  const pdf = artifacts.find(a => /print\.pdf$/.test(a.path))
  const png = artifacts.find(a => /print\.png$/.test(a.path))
  const attachments = [{
    color: '#2eb886',
    pretext: `Screenshot for print style on \`${process.env.RELEASE_STAGE}\``,
    text: `<${process.env.TARGET_URL}|URL>`,
    author_name: 'Puppeteer',
    title: 'Build by CircleCI',
    title_link: process.env.CIRCLE_BUILD_URL,
    image_url: `${png.url}?circle-token=${process.env.CIRCLE_TOKEN}`,
    fields: [
      { value: `<${pdf.url}?circle-token=${process.env.CIRCLE_TOKEN}|Download PDF>` },
    ],
  }]
  await webhook.send({ attachments })
}
main()
```

## Diff

スタイルくずれを把握しやすいように、 PDF とかスクリーンショットの Diff をとって通知内容に含められればもっといいですね。
