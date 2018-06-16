---
title: FaSS の予約状況を確認する Hubot スクリプトをつくりました
date: 2018-06-17 01:30
public: true
qiita: true
author:
  name: Shingo Sato
  url: https://sugarshin.net/
tags: hubot, hubot-script
ogp:
  og:
    image:
      src: https://blog.sugarshin.net/assets/images/2018/06/17/hubot-fass-reservation/main.png
---

![Main](/assets/images/2018/06/17/hubot-fass-reservation/main.png)

[FaSS](http://www.fasssalon.com/) の予約の順番待ちを確認したり、順番が近づくと通知してくれる Hubot スクリプトをつくりました。

https://github.com/sugarshin/hubot-fass-reservation

[hubot-fass-reservation  -  npm](https://www.npmjs.com/package/hubot-fass-reservation)

```bash
yarn add hubot-fass-reservation

# or

npm install hubot-fass-reservation
```

```json
// external-scripts.json

[
  "hubot-fass-reservation"
]
```

***

## Table of Contents

## モチベーション

子供や自分の髪を切るのに FaSS というお店を利用しています。カットと仕上げのみで 2,000 円ほどと、安くて早いのでよく普段から利用しています。

[受付システム](http://www.fasssalon.com/sys/#flow)があり、来店して受付機から発券するか、 [Web](http://www.fasssalon.com/sys/#accept) でも発券できます。

事前に登録しておけば、順番が近づくとメールが届いたり、専用の Web ページから順番を確認できたりするのですが、もっと手軽に Slack でそれを行いたかったので Hubot スクリプトとしてつくってみました。

## リスト

店舗と識別子一覧を表示します。 http://www.fasssalon.com/salonlist/

```bash
> hubot fass ls

FaSS有楽町マルイ店 - yurakuchomarui
  e.g., `hubot fass yurakuchomarui w`

FaSS八重洲地下街店 - yaesuchikagai
  e.g., `hubot fass yaesuchikagai w`

FaSS中目黒店 - nakameguro
  e.g., `hubot fass nakameguro w`

FaSS二子玉川ライズS.C.店 - futakotamagawarisesc
  e.g., `hubot fass futakotamagawarisesc w`

FaSS新宿マルイ本館店 - shinjukumaruihonkan
  e.g., `hubot fass shinjukumaruihonkan w`

FaSSアトレヴィ大塚店 - atrevieotsuka
  e.g., `hubot fass atrevieotsuka w`

FaSS三軒茶屋店 - sangenjaya
  e.g., `hubot fass sangenjaya w`

FaSS下北沢店 - shimokitazawa
  e.g., `hubot fass shimokitazawa w`

FaSS代官山アドレス・ディセ店 - daikanyama17
  e.g., `hubot fass daikanyama17 w`

FaSS横浜ビブレ店 - yokohamavivre
  e.g., `hubot fass yokohamavivre w`

FaSSアトレ川崎店 - atrekawasaki
  e.g., `hubot fass atrekawasaki w`
```

## 順番待ち確認

```bash
> hubot fass futakotamagawarisesc w

> ＦａＳＳニ子玉川ライズＳ．Ｃ．店
>  ・待ち人数：6人
>  ・待ち時間の目安：40 ～ 50分
>  　01) 207
>  　02) 208
>  　03) 209
>  　04) 210
>  　05) 212
>  　06) 213
```

予約番号を入れると、順番が近づくとステップで通知してくれます。

```bash
> hubot fass futakotamagawarisesc w 39

> ｀39｀ 番の監視を開始します

> @sugarshin あと 5 人で順番がきます

> @sugarshin あと 3 人で順番がきます

> @sugarshin 順番がきました
```

## TODO

受付できるようにもする予定です。まだ実装はしていません。

```bash
> hubot fass futakotamagawarisesc rsv

> 予約しました、番号は `43` です
```
