import StandardInputSignal from "math/input-signals";
// import {Poly} from "math/algebra/functions";

export class Step extends StandardInputSignal {
    constructor(amplitude = 1, symbol = "t") {
        super(amplitude, "u", symbol); // \\delta is the equivalent of small delta in mathjax
    }
    copy = () => new Step(this.amp, this.symbol);

    $ = (t) => (t >= 0) * this.amp;
}

export class Puls extends StandardInputSignal {
    constructor(Delta = 1, amplitude = 1, symbol = "t") {
        super(amplitude, "\\sqcap", symbol);
        this.Delta = Delta;
    }
    copy = () => new Puls(this.Delta, this.amp, this.symbol);
    $ = (t) => (t >= 0 && t <= this.Delta) * this.amp / this.Delta;
}

export class Impact extends StandardInputSignal {
    constructor(amplitude = 1, symbol = "t") {
        super(amplitude, "\\delta", symbol); // \\delta is the equivalent of small delta in mathjax
    }
    copy = () => new Impact(this.amp, this.symbol);

    $ = (t) => this.amp * (t === 0);
}

// export class Ramp extends Poly {
//     constructor(amplitude, symbol = "t") {
//         super([amplitude, 0], symbol);
//         this.amplitude = amplitude; // just for calculating the value of this
//         this.selfmultiply(Step());
//     }
//     copy = () => new Ramp(this.amplitude, this.symbol);

//     $ = (t) => (t >= 0) * t * this.amplitude;
// }


// export class Parabolic extends Poly { //EDIT
//     constructor(amplitude, symbol = "t") {
//         super([amplitude, 0, 0], symbol);
//         this.amplitude = amplitude; // just for calculating the value of this
//         this.selfmultiply(Step());
//     }
//     copy = () => new Parabolic(this.amplitude, this.symbol);
//     $ = (t) => (t >= 0 ? t * this.amplitude : 0);
// }
