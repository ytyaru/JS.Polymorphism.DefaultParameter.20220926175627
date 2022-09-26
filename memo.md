JSで多態性もどき

　そんな高尚なことできないからデフォルト引数でそれっぽくする。

<!-- more -->

# ブツ

* [DEMO][]
* [リポジトリ][]

[DEMO]:
[リポジトリ]:

# コード

## car.js

```javascript
class Car {
    constructor() {
        this.gear = 0;
    }
    accelerator(gear=-1) {
        // arguments.callee.nameはES5以降禁止
        //console.log(`${this.constructor.name}.${arguments.callee.name}(${gear}) ${this.gear}`)
        console.log(`${this.constructor.name}.accelerator(${gear}) ${this.gear}`)
    }
}
```

## at-car.js

```javascript
class ATCar extends Car {
    accelerator() {
        if (6 == this.gear) { this.gear = 0; }
        this.gear++;
        super.accelerator();
    }
}
```

## mt-car.js

```javascript
class MTCar extends Car {
    accelerator(gear) {
        if (1 === Math.abs(this.gear - gear)) {
            super.accelerator(gear);
            this.gear = gear;
        } else {
            console.log(`${this.constructor.name}.accelerator(${gear}) ${this.gear} エンスト！`)
            this.gear = 0;
        }
    }
}
```

## main.js

```javascript
window.addEventListener('load', (event) => {
    const at = new ATCar()
    const mt = new MTCar()
    console.log('----- AT -----')
    at.accelerator()
    at.accelerator(3) // 引数があっても無視して実行する
    at.accelerator()
    at.accelerator()
    at.accelerator()
    at.accelerator()
    at.accelerator()
    at.accelerator()
    console.log('----- MT -----')
    mt.accelerator(1)
    mt.accelerator(2)
    mt.accelerator(3)
    mt.accelerator(2)
    mt.accelerator(4)
    mt.accelerator(3)
    mt.accelerator(1)
    mt.accelerator() // 引数がないと参照したときundefinedになる
});
```

# 出力結果

```javascript
----- AT -----
ATCar.accelerator(-1) 1
ATCar.accelerator(-1) 2
ATCar.accelerator(-1) 3
ATCar.accelerator(-1) 4
ATCar.accelerator(-1) 5
ATCar.accelerator(-1) 6
ATCar.accelerator(-1) 1
ATCar.accelerator(-1) 2
----- MT -----
MTCar.accelerator(1) 0
MTCar.accelerator(2) 1
MTCar.accelerator(3) 2
MTCar.accelerator(2) 3
MTCar.accelerator(4) 2 エンスト！
MTCar.accelerator(3) 0 エンスト！
MTCar.accelerator(1) 0
MTCar.accelerator(undefined) 1 エンスト！
```

# 所感

　JSはオブジェクト指向と銘打っているがプロトタイプベースなのでダッグタイピングにより多態性っぽくする。

クラス|メソッド
------|--------
`Car`|`accelerator(gear=-1)`
`ATCar`|`accelerator()`
`MTCar`|`accelerator(gear)`

　`Car.accelerator(gear=-1)`はデフォルト引数をもちいることで引数あり／なし共にどちらでも使えるようにしたつもりだったが、べつにデフォルト引数にする必要なかったっぽい。`ATCar.accelerator()`のほうで呼び出し側で引数を渡してみたが、エラーにならず無視される。え、あ、そうだったの？　というわけで引数いらないなら書かなければいいだけ。

　引数が必須の`MTCar.accelerator(gear)`のほうはもし引数を渡さないと実行時に`gear`を参照したら`undefined`で計算できずエンスト扱いになった。`if`文で分岐すべきなのだろう。`if (gear) { 引数が存在するときの処理 }`みたいに。

　引数チェックして問題あれば例外発生すればいいと思われる。

　ええと、最初は何を悩んでたんだっけ？　悩む必要あったのかな？

