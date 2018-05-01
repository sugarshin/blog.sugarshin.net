---
title: Qiita に画像をアップロードする CLI ツールを oclif でつくる
date: 2018-05-01 23:35
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: qiita, cli, oclif, puppeteer, typescript
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2018/05/01/qiita-image-upload-cli-with-oclif/main.png
---

![Main](/assets/images/2018/05/01/qiita-image-upload-cli-with-oclif/main.png)

[Qiita](https://qiita.com/) に画像をアップロードする CLI ツールを、 [Heroku](https://www.heroku.com/) 製の CLI フレームワーク [oclif](https://oclif.io/) を使ってつくってみました。

```bash
$ yarn global add qiiu

# or

$ npm install -g qiiu

# ...

$ qiiu --username=$QIITA_USERNAME --password=$PASSWORD ./path/to/example.png

https://qiita-image-store.s3.amazonaws.com/0/2432/df89ffdd-f8f8-fd0s-4124-sdddfd9d6f5f.png
```

[qiiu  -  npm](https://www.npmjs.com/package/qiiu)

https://github.com/sugarshin/qiiu

***

## Table of Contents

## モチベーション

Qiita への記事投稿を CLI で完結させたいなぁと思っていて、 [REST API](https://qiita.com/api/v2/docs) は提供されているものの当然画像をアップロードするインターフェイスはなく、別でホスティングするか迷っていましたが結局それ用のツールをつくることにしました。

## oclif

oclif は、 Heroku や [Salesforce CLI](https://developer.salesforce.com/ja/tools/sfdxcli) でも利用されているらしく、 Scaffolding やテストヘルパー、リリースまで面倒みてくれるフレームワークでいろいろ楽でした。 Plugin 機構もあって拡張性も高いみたいです。

```
$ npx oclif single qiiu
npx: installed 423 in 17.533s

     _-----_     ╭──────────────────────────╮
    |       |    │      Time to build a     │
    |--(o)--|    │  single-command CLI with │
   `---------´   │  oclif! Version: 1.7.35  │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y `

? npm package name qiiu
? command bin name the CLI will export qiiu
? description Upload image to Qiita
? author sugarshin @sugarshin
? version 0.0.0
? license MIT
? node version supported >=8.0.0
? github owner of repository (https://github.com/OWNER/repo) sugarshin
? github name of repository (https://github.com/owner/REPO) qiiu
? optional components to include yarn (npm alternative), mocha (testing framework), typescript (static typing for javascript), tslint (static analysis tool for typescript)
   create package.json
   create .circleci/config.yml
   create tslint.json
   create tsconfig.json
   create test/tsconfig.json
   create .nycrc
   create test/helpers/init.js
   create test/mocha.opts
   create .editorconfig
   create .circleci/greenkeeper
   create README.md
   create appveyor.yml
   create .gitattributes
   create .gitignore
   create bin/run
   create bin/run.cmd
   create src/index.ts
   create test/index.test.ts
yarn add v1.3.2

# ...

Created qiiu in /Users/shingosato/npm/qiiu
```

## Puppeteer

内部的には [Puppeteer](https://github.com/GoogleChrome/puppeteer) を利用してアップロードしています。

```typescript
const inputFile: ElementHandle = await page.$(selectors.fileUploadButton)
if (inputFile) {
  await inputFile.uploadFile(imagePath)
} else {
  throw new Error(`Can't find \`${selectors.fileUploadButton}\``)
}
```

ref: https://github.com/sugarshin/qiiu/blob/master/src/upload.ts

2 段階認証を有効にしている場合の対応や、記事の下書きの上限数を考慮する対応などもしてあります。

***

これでいろいろ自動化できそう。
