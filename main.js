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
