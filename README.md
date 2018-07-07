# slideheader (slideheader.js)

## 概要

「slideheader」は、**ページのスクロールイベントを取得して、ヘッダーバーをスライドさせて表示/非表示させる機能を実装するための JavaScript プラグイン**です。

このプラグインでは、以下の 2 つの機能を提供します。

- **ページを下にスクロールしたタイミングで、非表示になっていたヘッダーバーを表示させる機能**
- **ページを下にスクロールしたタイミングで、表示されているヘッダーバーを非表示にする機能**

## デモ

### スクロールするとヘッダーバーが表示されるサンプル

準備中

### スクロールするとヘッダーバーが非表示となるサンプル

準備中

## 実装方法

### 1. プラグインをインストールする

npm でインストールする場合。

```
$ npm install --save slideheader
```

yarn でインストールする場合。

```
$ yarn add slideheader
```

なお、こちらのページから[ダウンロード](https://github.com/maechabin/slideheader/archive/master.zip)も可能です。また、 `[git clone]` コマンドでローカル環境にコピーすることも可能です。

```
$ git clone git@github.com:maechabin/slideheader.git [任意のディレクトリ名]
```

機能の実装に使用するファイルは以下の js ファイルとなります。

- **dist/slideheader.min.js**

### 2. プラグイン & 外部ファイルを読み込む

JS ファイルに `import` する場合。

```javascript
import SlideHeader from 'slideheader';
```

`script` 要素を使って HTML ファイルに読み込む場合（ファイルのパスはご自身の環境に合わせて変更してください）。

```html
<script src="/dist/slideheader.min.js"></script>
```

### 3. ヘッダーバーを準備する

プラグインを適用するヘッダーバーを準備します。ヘッダーバーの要素に対して `cb-header` という class 名をつけます。

```html
<header class="cb-header">header1</header>
```

### 4. CSS を指定する

ヘッダーバーに付与した class 属性 `cb-header` に対して、以下を指定します。ページを読み込んだ初期表示でヘッダーバーを非表示にしておきたい場合は `visibility: hidden;` を指定しておきます。

```css
.cb-header {
  position: fixed;
  /**
   * ページを読み込んだ初期表示でヘッダーバーを
   * 非表示にしておきたい場合は以下を指定
   */
  visibility: hidden;
}
```

### 5. プラグインを実行する

準備したヘッダーバーに対して、プラグインの処理を適用させます。

SlideHeader を new する際に、コンストラクタの第一引数にヘッダバーに指定したクラス名 `'.cb-header'`、第二引数にオプションを指定します。

```JavaScript
const slideheader = new SlideHeader('.cb-header', {
  /** 例えば以下のようにオプションを指定 */
  slidePoint: 64,
});
```

作成したインスタンスの `init()` メソッドを呼び出すことで、プラグインがヘッダバーに適用されます。その際に、`init()` の引数に `'slideDown'` または `'slideUp'` を渡し、スライドバーの動きを指定します。

```JavaScript
slideheader.init('slideDown');
```

`'slideDown'` と `'slideUp'` は、それぞれ以下のような機能となっています。

- **slideDown**: ページを下にスクロールしたタイミングで、非表示になっていたヘッダーバーを表示します。
- **slideUp**: ページを下にスクロールしたタイミングで、表示されているヘッダーバーを非表示にします。

#### 実装例

通常は、以下のようにひとまとめにして書いても良いです。

```JavaScript
/**
 * スクロールしてヘッダーバーを表示させる場合
 */
window.onload = () => {
  new SlideHeader('.cb-header', {
    slidePoint: 64,
    headroom: true,
  }).init('slideUp');
}
```

## プラグインのオプション

slideheader はさまざまな使用状況を想定して豊富なオプションを備えています。

### ヘッダーバーの表示/非表示に関するオプション

- **slidePoint**: number<br>
  ヘッダーバーが表示/非表示のトリガーとなるスクロールの位置を指定します。この値を境にヘッダバーが現れたり、隠れたりするようになります。`0` 以上の数値（ただしページの高さより小さい値）で指定します。デフォルト値は `0`。

- **headerClone**: boolean<br>
  `init()` メソッドの引数に `'slideDown'` を指定した場合、ヘッダーバーは初期状態では非表示となります。初期状態でも表示させておきたい場合は、このオプションを `ture` にします。ヘッダーバーを複製して、常に表示されるヘッダーバーを生成します。複製したヘッダーバーには `cb-header1` という class 名が付与されます。デフォルト値は `false`。

- **headroom**: boolean<br>
  `init()` メソッドの引数に `'slideUp'` を指定した場合の専用オプションです。`true` にした場合、ページを下にスクールするとヘッダバーが隠れ、上にスクロールするとヘッダーバーが表示されるようになります。`headroom.js` というプラグインと同じような動きを実現します。デフォルト値は `false`。

### ヘッダーバーのスタイルに関するオプション

- **headerBarHeight**: number<br>
  表示/非表示の対象となるヘッダーバーの高さを指定します。指定した高さの分だけ隠れるようになります。`0` 以上の数値（単位は px)で指定します。デフォルト値は `対象のヘッダーバーの高さ`。

- **headerBarWidth**: string<br>
  表示/非表示の対象となるヘッダーバーの幅を指定します。デフォルト値は `'100%'` となっており、基本はこのままでよいですが、念のため状況に応じて幅を変更できるようになっています。CSS の `width` プロパティに指定できる値を指定します。

- **zIndex**: number<br>
  表示/非表示の対象となるヘッダーバーの重なり順を指定します。値が大きいほど上になります。CSS の `z-index` プロパティに指定できる値で指定します。デフォルト値は `9999`。

- **boxShadow**: string<br>
  表示/非表示の対象となるヘッダーバーに影をつけます。CSS の `box-shadow` プロパティに指定できる値で指定します。デフォルト値は `'none'`。

- **opacity**: number<br>
  表示/非表示の対象となるヘッダーバーの透明度を指定します。CSS の `opacity` プロパティに指定できる値で指定します。デフォルト値は `1`。

### ヘッダーバーのアニメーションに関するオプション

- **slideDownDuration**: string<br>
  ヘッダーバーが表示される時のスピード（duration）を指定します。CSS の `transition` プロパティに指定できる変化の速度をミリ秒（ms）で指定します。デフォルト値は `'500ms'`。

- **slideUpDuration**: string<br>
  ヘッダーバーが非表示になる時のスピード（duration）を指定します。CSS の `transition` プロパティに指定できる変化の速度をミリ秒（ms）で指定します。デフォルト値は `'500ms'`。

- **slideDownEasing**: string<br>
  ヘッダーバーが表示される時のアニメーションの動作パターン（easing）を指定します。指定できる値は、`'ease'`、`'linear'`、`'ease-in'`、`'ease-out'`、`'ease-in-out'` です。デフォルト値は `'ease'`。

- **slideUpEasing**: string<br>
  ヘッダーバーが隠れる時のアニメーションの動作パターン（easing）を指定します。指定できる値は、`'ease'`、`'linear'`、`'ease-in'`、`'ease-out'`、`'ease-in-out'` です。デフォルト値は `'ease'`。

### コールバック関数に関するオプション

- **slideDownCallback**: function<br>
  ヘッダーバーが表示された後に呼び出されるコールバック関数を指定します。デフォルト値は `() => {}`。

- **slideUpCallback**: function<br>
  ヘッダーバーが非表示になった後に呼び出されるコールバック関数を指定します。デフォルト値は `() => {}`。

### 全画面表示に関するオプション

- **fullscreenView**: boolean<br>
  `true` を指定すると、ヘッダーバーともう一つの要素を利用して、全画面表示を実現します。デフォルト値は `false`。

- **header2SelectorName**: string<br>
  `fullscreenView` オプションに `true` を指定した時に、全画面表示に使われる要素のセレクター名を指定します。デフォルト値は `.cb-header2`。

## 実装事例

準備中

## ライセンス

MIT license
