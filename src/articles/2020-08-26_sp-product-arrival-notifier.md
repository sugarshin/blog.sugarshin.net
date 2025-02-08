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
      src: /assets/images/2020/08/26/sp-product-arrival-notifier/main.png
---

![](/assets/images/2020/08/26/sp-product-arrival-notifier/main.png)

[Snow Peak](https://www.snowpeak.co.jp/) 公式オンラインストアの製品入荷情報をSlackに通知する仕組みを雑につくりました。

## 目次

## モチベーション

Snow Peakは最近お気に入りのアウトドア製品メーカーで、流行りもあるのか入荷待ちの商品ばかりで欲しいときに買えないのが悔しいのでつくりました。とりあえずキャンプカテゴリの製品のみ対象としています。 ref: [キャンプの通販 | アウトドア・キャンプ用品はスノーピーク(Snow Peak)](https://ec.snowpeak.co.jp/snowpeak/ja/%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%97/c/2010000)

近所に直営店はありますが、直営店もすべての商品があるわけではないし、正直入荷待ちのものも多いです。

ちなみにオンラインストアの在庫管理は実店舗のそれとは別らしいです。

## アーキテクチャ

- 突貫工事
- 料金コストは極力かけたくない

という前提で、 [GitHub Actions](https://github.co.jp/features/actions) のVM上でスクリプトを `schedule` トリガーを利用して定期実行するという実装にしました。

スクレイピングで製品一覧の情報をとって結果を保持しておき、次回の実行時にその状態と比較して入荷していたらSlackに通知する、というシンプルなスクリプトです。

[![](https://raw.githubusercontent.com/sugarshin/sp-product-arrival-notifier/master/architecture.png)](https://github.com/sugarshin/sp-product-arrival-notifier/blob/master/architecture.png)

スクリプト本体はPythonで雑に書いてあります。

ref: https://github.com/sugarshin/sp-product-arrival-notifier

## Artifact

GitHub ActionsのArtifactsとしてスクレイピングした結果を保持するのですが、謹製の [download-artifact](https://github.com/actions/download-artifact) アクションだと別々のWorkflow間ではArtifactsを参照できないです。なのでちょうどそれをうまくやってくれるアクションが公開されていたので利用しました。

ref: https://github.com/dawidd6/action-download-artifact

## 通知

![](/assets/images/2020/08/26/sp-product-arrival-notifier/notify.png)
