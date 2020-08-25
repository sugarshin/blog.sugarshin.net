---
title: オンラインストアの入荷情報を Slack に通知する
date: 2020-08-26 02:03
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: python, snow peak, slack, github actions
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2020/08/26/sp-product-arrival-notifier/main.png
---

![](/assets/images/2020/08/26/sp-product-arrival-notifier/main.png)

[Snow Peak](https://www.snowpeak.co.jp/) 公式オンラインストアの製品入荷情報を Slack に通知する仕組みを雑につくりました。

## Table of Contents

## モチベーション

Snow Peak は最近お気に入りのアウトドア製品メーカーで、流行りもあるのか入荷待ちの商品ばかりで欲しいときに買えないのが悔しいのでつくりました。

近所に直営店はありますが、直営店もすべての商品があるわけではないし、正直入荷待ちのものも多いです。

ちなみにオンラインストアの在庫管理は実店舗のそれとは別らしいです。

## アーキテクチャ

- 突貫工事
- 料金コストは極力かけたくない

という前提で、 GitHub Actions の `schedule` トリガーを利用して実装しました。

スクレイピングで製品一覧の情報をとって結果を保持しておき、次回の実行時にその状態と比較して入荷していたら Slack に通知する、というシンプルなスクリプトを定期実行しています。

スクリプト本体は Python で雑に書いてあります。

ref: https://github.com/sugarshin/sp-product-arrival-notifier

## Artifact

GitHub Actions の Artifact としてスクレイピングした結果を保持するのですが、謹製の [download-artifact](https://github.com/actions/download-artifact) アクションだと別々の Workflow 間では Artifact を参照できないのですが、ちょうどそれをうまくやってくれるアクションが公開されていたので利用しました。

ref: https://github.com/dawidd6/action-download-artifact

## 通知

![](/assets/images/2020/08/26/sp-product-arrival-notifier/notify.png)
