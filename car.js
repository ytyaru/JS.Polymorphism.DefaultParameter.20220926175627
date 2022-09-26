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
