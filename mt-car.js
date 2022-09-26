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
