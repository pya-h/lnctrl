import Poly from "./poly";
import Fraction from './fraction';

export default class One extends Poly {
    constructor(params = {}) {
        // ke^ct
        super([1], null, { ...params });
    }

    degree = () => 0;

    valueAt = (t) => 1;

    toString = () => {
        let str = "1";
        if (this.plus) {
            const strplus = this.plus.toString();
            if(strplus !== "0")
                str += " + " + strplus;
        }
        return str;
    };
    devide = (operand) => new Fraction([1], [1], this.symbol).devide(operand);
}
