class ATCar extends Car {
    accelerator() {
        if (6 == this.gear) { this.gear = 0; }
        this.gear++;
        super.accelerator();
    }
}
