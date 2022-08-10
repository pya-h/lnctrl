import { round, strictPrecisionFormat } from "../calculus";

export default class StandardInputSignal {
    constructor(amplitude = 1, type = "u", symbol = "t") {
        this.symbol = symbol;
        this.type = type;
        this.amp = round(amplitude);
    }

    copy = () => new StandardInputSignal(this.amp, this.type, this.symbol);

    toString = () => {
        let str = "",
            a = this.amp;
        if (this.amp === -1) {
            str += "-";
            a *= -1;
        }
        if (a !== 1) str += strictPrecisionFormat(a);
        return str + `${this.type}(${this.symbol})`;
    };

    simplify = () => {
        const result = this.copy();
        // ADD CODE TO REMOVE REDUNDANTS 
        return result;
    }
    ampiltude = () => this.amp;
}
