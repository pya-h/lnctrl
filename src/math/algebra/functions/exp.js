import Algebra from "math/algebra";
import Complex from "math/algebra//complex";
import { Cos, Sin } from "./trigonometric";

export default class Exp extends Algebra {
    constructor(a, b, symbol = "t", params = {}) {
        // ae^bt
        super(a, { symbol, type: "exp", b, ...params });
    }

    copy = (linkPrevious = false) =>
        new Exp(this.a, this.b, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input
        });

    toSin = () => {
        const exp = this.copy();
        if (exp.type === "exp" && exp.b instanceof Complex) {
            if (exp.b instanceof Complex && exp.b.real() === 0) {
                const cos = new Cos(exp.a, exp.b.imaginary());
                const sin = new Sin(exp.a, -exp.b.imaginary());
                return new Complex(cos, sin);
            }
        }
        return exp; // if doesnt math the condition then just return exponential function itself
    };

    valueAt = (t) => {
        const a = Algebra.valueOf(this.a, t),
            b = Algebra.valueOf(this.b, t);
        return a * Math.exp(b * t);
    }
}
