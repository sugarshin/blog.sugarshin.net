---
title: リッチテキストエディタ oneteam-rte を公開しました
date: 2016-06-05 10:44
public: true
tags: javascript, draft.js, oneteam-rte, react.js
---

リッチテキストエディタ用の React コンポーネントを公開しました

GitHub: https://github.com/oneteam-dev/oneteam-rte

npm: https://www.npmjs.com/package/oneteam-rte

2016年6月現在のバージョンは [0.2.12](https://github.com/oneteam-dev/oneteam-rte/releases/tag/v0.2.12) です

![oneteam-rte.gif](/assets/images/2016/06/05/published-oneteam-rte/oneteam-rte.gif)

2016年2月に OSS として公開された Facebook 製のフレームワーク、 [Draft.js](https://facebook.github.io/draft-js/) のラッパーです

## 使用例

```js
import React from 'react';
import { render } from 'react-dom';
import RichTextEditor, { Toolbar, Body } from 'oneteam-rte';
import 'oneteam-rte/lib/base.css';

render((
  <RichTextEditor
    initialHtml='<h1>Initial content</h1><div><br /></div><div>oneteam-rte</div>'>
    <Toolbar />
    <Body />
  </RichTextEditor>
), document.querySelector('#app-root'));
```

## ツールバー

下記の Function が利用可能です

- 画像挿入
- ファイル添付
- iframe 埋め込み
- リンク
- 見出しレベル
- Bold
- Italic
- 打ち消し線
- Blockquote
- チェックボックスリスト
- 順不同リスト
- 順序付きリスト

## Draft.js

Draft.js は [Immutable.js](https://facebook.github.io/immutable-js/) に依存していて、
下記のようエディタの状態を管理する State object (EditorState) をこの Immutable.js のデータ構造を利用して管理しています

- エディタのテキストの内容
- カーソルの位置、状態
- テキストの装飾の状態
- Undo/redo
- etc...

業務で利用しているため、仕様の都合上、素のままでは実現できないものもあり、結局 Draft.js に直接手を入れて利用しています

https://github.com/oneteam-dev/draft-js/tree/oneteam

## draft-js-export-html

EditorState からシリアライズした HTML の出力にも OSS を利用しました

https://github.com/sstur/draft-js-export-html

これも仕様の都合上、 fork して手を入れています

https://github.com/oneteam-dev/draft-js-export-html/tree/oneteam

---

PR 大歓迎です

また、 [@ngs](https://ngs.io/) 氏もコントリビュートしてださっています

@ngs 氏が Swift 版も公開していますのでそちらも要チェックです

https://github.com/oneteam-dev/SwiftyDraft
