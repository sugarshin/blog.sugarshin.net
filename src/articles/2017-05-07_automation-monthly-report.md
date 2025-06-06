---
title: OSS コントリビューションや GitHub 上のアクティビティのまとめレポート投稿を自動化する
date: 2017-05-07 10:17
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags:
  - monthly report
  - javascript
  - circleci
  - github
ogp:
  og:
    image:
      src: /assets/images/2017/05/07/automation-monthly-report/main.png
---

![](/assets/images/2017/05/07/automation-monthly-report/main.png)

月ごとに、 OSSコントリビューションやGitHub上での活動をまとめたレポートの当ブログへの投稿を自動化しました。

***

なかなかブログも書けないので、これからGitHubの月報を投稿していくことにしました。

[[Monthly report] 2017-04 my activity this month on GitHub](/2017/04/30/monthly-report-1704/)

## 目次

## 流れ

やっていることは単純ですが大まかな流れとしては、

1. GitHub APIからUser eventを取得して該当月のイベントから記事を作成する
2. GitHubへpush
3. APIでPull requestを作成し、 CIがパス次第APIでMerge
4. CircleCIなどで上述のscriptを実行
5. cronなどで月末に定期ビルドさせる

前提として、 GitHub上で投稿までのサイクルが回るようになっています。

[React と Redux なブログ運用をソフトウェア開発する話し](/2016/07/14/blog-like-software-development/)

## List events performed by a user

User eventは `GET /users/:username/events` エンドポイントから取得します。パブリックなイベントのみでいいはずなのでアクセストークンは必要ないです。

ただAPIの仕様で、過去90日以内でかつ上限300件しか取得できないので、活動が多かった月は漏れがあるかもです。週ごと程度定期で取得してストックしておくなどの対応が必要かもですね。

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
      "name": "sugarshin/blog.sugarshin.net",
      "url": "https://api.github.com/repos/sugarshin/blog.sugarshin.net"
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
          "url": "https://api.github.com/repos/sugarshin/blog.sugarshin.net/commits/2944a811f7f2c9f58b994ad46da1a7d67f1a5de8"
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

記事作成は取得したイベントデータを元にパース、フォーマットしてMarkdownファイルとして書き出します。

[blog.sugarshin.net/scripts/create-monthly-report/index.js](https://github.com/sugarshin/blog.sugarshin.net/blob/6370f753134c3ba9592afd7cac5c7640746a060e/scripts/create-monthly-report/index.js)

対象のイベントは現状、下記に絞ってあります。

- `CreateEvent`
- `PullRequestEvent`
- `PublicEvent`
- `WatchEvent`
- `IssuesEvent`

イベントタイプは[ドキュメント](https://developer.github.com/v3/activity/events/types/)にまとまっています。

ここからMarkdownとして出力するのに少しフィルタリングしています。

## ビルド

ビルドはCircleCI上で行います。

ブログのリポジトリだけで完結させられるかと思いましたが、ごちゃごちゃしそうだったので別環境を用意しています。

https://github.com/sugarshin/build.blog.sugarshin.net

現状、 Pull requestのマージは、ステータスが `mergeable` かつ `mergeable_state === 'clean'` になるまでポーリングしています。ステータス変更をトリガーできればいいですね。

- [build.blog.sugarshin.net/merge-pull-request.js at 42bf302cb92cfffccbc98b30339906dc5c4cbf15 · sugarshin/build.blog.sugarshin.net](https://github.com/sugarshin/build.blog.sugarshin.net/blob/42bf302cb92cfffccbc98b30339906dc5c4cbf15/merge-pull-request.js#L36)

CircleCIのAPIからビルドを実行します。

ref: [Recent Builds For a Project Branch - CircleCI API v1.1 Reference - CircleCI](https://circleci.com/docs/api/v1-reference/#recent-builds-project-branch)

```bash
$ curl -XPOST "https://circleci.com/api/v1/project/sugarshin/build.blog.sugarshin.net/tree/monthly-report?circle-token=$TOKEN"
```

## 定期実行

月末に定期実行させるために、 cronなどで上述CircleCIのAPIを叩きます。

今回は既存の自分のプライベートHubot内で起動させてあります。

```coffeescript
# Description:
#   monthly report to blog

{ CronJob } = require 'cron'
fetch = require 'node-fetch'

{ HUBOT_BLOG_BUILDER_CIRCLE_TOKEN: TOKEN } = process.env

module.exports = () ->
  executeMonthlyReport = ->
    fetch(
      "https://circleci.com/api/v1/project/sugarshin/build.blog.sugarshin.net/tree/monthly-report?circle-token=#{TOKEN}"
      method: 'POST'
    )

  new CronJob('0 01 00 01 * *', executeMonthlyReport).start()
```

月の末日をとるのが難しかったので、月初の0時1分とし、そこからビルド時間を考慮した分をマイナスして計算するようにしてあります。

ref: [blog.sugarshin.net/index.js at 53700e705c6f154510d853fa5cbdd5f393a376ce · sugarshin/blog.sugarshin.net]( https://github.com/sugarshin/blog.sugarshin.net/blob/53700e705c6f154510d853fa5cbdd5f393a376ce/scripts/create-monthly-report/index.js#L42)

***

GitHubのAPIでとれるデータを元に、エンジニアのパフォーマンス計測や作業量などの算出に利用して、エンジニアの働き方やワークライフバランス改善の1つの指針に利用できたりしないかなと考えてみたりしています。

## リンク

- https://blog.sugarshin.net/
- https://github.com/sugarshin/blog.sugarshin.net
- https://github.com/sugarshin/build.blog.sugarshin.net
