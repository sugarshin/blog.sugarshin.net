---
title: OSS コントリビューションや GitHub 上のアクティビティのまとめレポート投稿を自動化する
date: 2017-05-07 10:17
public: true
tags: monthly report, javascript, circleci, github
ogp:
  og:
    image:
      src: https://log.sugarshin.net/assets/images/2017/05/07/automation-monthly-report/main.png
---

![Main](/assets/images/2017/05/07/automation-monthly-report/main.png)

月ごとに、 OSS コントリビューションや GitHub 上での活動をまとめたレポートの当ブログへの投稿を自動化しました。

***

なかなかブログも書けないので、これから GitHub の月報を投稿していくことにしました。

[[Monthly report] 2017-04 my activity this month on GitHub](/2017/04/30/monthly-report-1704)

## Table of Contents

## 流れ

やっていることは単純ですが大まかな流れとしては、

1. GitHub API から User event を取得して該当月のイベントから記事を作成する
2. GitHub へ push
3. API で Pull request 作成 => CI がパス次第 API で Merge
4. CircleCI などで上述の script を実行
5. cron などで月末に定期ビルドさせる

前提として、 GitHub 上で投稿までのサイクルが回るようになっています。

[React と Redux なブログ運用をソフトウェア開発する話し](/2016/07/14/blog-like-software-development)

## List events performed by a user

User event は `GET /users/:username/events` エンドポイントから取得します。パブリックなイベントのみでいいはずなのでアクセストークンは必要ないです。

ただ API の仕様で、過去 90 日以内でかつ上限 300 件しか取得できないので、活動が多かった月は漏れがあるかもです。週ごと程度定期で取得してストックしておくなどの対応が必要かもですね。

ref: https://developer.github.com/v3/activity/events/#list-events-performed-by-a-user

```bash
$ curl "https://api.github.com/users/sugarshin/events"

[
  {
    "id": "5823717083",
    "type": "PushEvent",
    "actor": {
      "id": 2001452,
      "login": "sugarshin",
      "display_login": "sugarshin",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sugarshin",
      "avatar_url": "https://avatars.githubusercontent.com/u/2001452?"
    },
    "repo": {
      "id": 58251000,
      "name": "sugarshin/log.sugarshin.net",
      "url": "https://api.github.com/repos/sugarshin/log.sugarshin.net"
    },
    "payload": {
      "push_id": 1723998566,
      "size": 1,
      "distinct_size": 1,
      "ref": "refs/heads/gh-pages",
      "head": "2944a811f7f2c9f58b994ad46da1a7d67f1a5de8",
      "before": "21e6e15b34bad569fb2b2a6f233354ea38fdd69f",
      "commits": [
        {
          "sha": "2944a811f7f2c9f58b994ad46da1a7d67f1a5de8",
          "author": {
            "email": "s+travisci@sugarshin.net",
            "name": "Travis CI"
          },
          "message": "Updates",
          "distinct": true,
          "url": "https://api.github.com/repos/sugarshin/log.sugarshin.net/commits/2944a811f7f2c9f58b994ad46da1a7d67f1a5de8"
        }
      ]
    },
    "public": true,
    "created_at": "2017-05-07T04:57:51Z"
  },
  ...
]
```

## 記事作成

記事作成は取得したイベントデータを元にパース、フォーマットして Markdown ファイルとして書き出します。

[log.sugarshin.net/scripts/create-monthly-report/index.js](https://github.com/sugarshin/log.sugarshin.net/blob/6370f753134c3ba9592afd7cac5c7640746a060e/scripts/create-monthly-report/index.js)

対象のイベントは現状、下記に絞ってあります。

- `CreateEvent`
- `PullRequestEvent`
- `PublicEvent`
- `WatchEvent`
- `IssuesEvent`

イベントタイプは[ドキュメント](https://developer.github.com/v3/activity/events/types/)にまとまっています。

ここから Markdown として出力するのに少しフィルタリングしています。

## ビルド

ビルドは CircleCI 上で行います。

ブログのリポジトリだけで完結させられるかと思いましたが、ごちゃごちゃしそうだったので別環境を用意しています。

https://github.com/sugarshin/build.log.sugarshin.net

現状、 Pull request のマージは、ステータスが `mergeable` かつ `mergeable_state === 'clean'` になるまでポーリングしています。ステータス変更をトリガーできればいいですね。

- https://github.com/sugarshin/build.log.sugarshin.net/blob/42bf302cb92cfffccbc98b30339906dc5c4cbf15/merge-pull-request.js#L36

CircleCI の API からビルドを実行します。

ref: [Recent Builds For a Project Branch - CircleCI API v1.1 Reference - CircleCI](https://circleci.com/docs/api/v1-reference/#recent-builds-project-branch)

```bash
$ curl -XPOST "https://circleci.com/api/v1/project/sugarshin/build.log.sugarshin.net/tree/monthly-report?circle-token=$TOKEN"
```

## 定期実行

月末に定期実行させるために、 cron などで上述 CircleCI の API を叩きます。

今回は既存の自分のプライベート Hubot 内で起動させてあります。

```coffeescript
# Description:
#   monthly report to blog

{ CronJob } = require 'cron'
fetch = require 'node-fetch'

{ HUBOT_BLOG_BUILDER_CIRCLE_TOKEN: TOKEN } = process.env

module.exports = () ->
  executeMonthlyReport = ->
    fetch(
      "https://circleci.com/api/v1/project/sugarshin/build.log.sugarshin.net/tree/monthly-report?circle-token=#{TOKEN}"
      method: 'POST'
    )

  new CronJob('0 01 00 01 * *', executeMonthlyReport).start()
```

月の末日をとるのが難しかったので、月初の 0 時 1 分とし、そこからビルド時間を考慮した分をマイナスして計算するようにしてあります。

ref: https://github.com/sugarshin/log.sugarshin.net/blob/53700e705c6f154510d853fa5cbdd5f393a376ce/scripts/create-monthly-report/index.js#L42

***

GitHub の API でとれるデータを元に、エンジニアのパフォーマンス計測や作業量などの算出に利用して、エンジニアの働き方やワークライフバランス改善の 1 つの指針に利用できたりしないかなと考えてみたりしています。

## リンク

- [log.sugarshin.net](https://log.sugarshin.net/)
- [sugarshin/log.sugarshin.net](https://github.com/sugarshin/log.sugarshin.net)
- [sugarshin/build.log.sugarshin.net](https://github.com/sugarshin/build.log.sugarshin.net)
