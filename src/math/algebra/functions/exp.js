import Algebra from "math/algebra";
import Complex from "math/algebra//complex";
import { Cos, Sin } from "./trigonometric";

export default class Exp extends Algebra {
    constructor(a, b, symbol = "t", params = {}) {
        // ae^bt
        super(a, { symbol, type: "exp", b, ...params });
    }

    copy = (linkPrevious = false) => // copy everything
        new Exp(this.a, this.b, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    hardcopy = () => // shallow copy just for single term copy
        new Exp(this.a, this.b, this.symbol, {
            dot: this.dot,
            input: this.input,
        });
    toSin = () => {
        const exp = this.copy();
        if (exp.type === "exp" && exp.b instanceof Complex) {
            if (exp.b instanceof Complex && exp.b.real() === 0) {
                const cos = new Cos(exp.a, exp.b.imaginary());
                const sin = new Sin(exp.a, exp.b.imaginary());
                return new Complex(cos, sin);
            }
        }
        return exp; // if doesnt math the condition then just return exponential function itself
    };

    amplitude = (t) => {
        // NOT SURE
        // if (this.b instanceof Complex || t instanceof Complex) {
        //     if (this.a === +this.a) return this.a;
        //     else if (this.a instanceof Algebra && this.symbol === this.a.symbol)
        //         return this.a.$(t);
        // } else return this.valueAt(t);
    };
    phase = (w) => {
        const jw = new Complex(0, w);
        let pb = +this.b;
        if (this.b === pb) return pb * w;
        if (this.b instanceof Algebra) {
            pb = this.b.$(jw);
            return jw.multiply(pb).imaginary();
        }
    };
    valueAt = (t) => {
        const numericT = +t;
        if (numericT === t) {
            const a = Algebra.valueOf(this.a, numericT),
                b = Algebra.valueOf(this.b, numericT);
            return a * Math.exp(b * numericT);
        } else if (t instanceof Complex) {
            if (!t.real()) {
                return new Exp(
                    this.a,
                    new Complex(0, this.b * t.imaginary()),
                    this.symbol
                ).toSin();
            } else if (t.imaginary()) {
                // edit this
                return (
                    new Exp(this.a, this.b, this.symbol).valueAt(t.real()) *
                    new Exp(
                        1,
                        new Complex(0, this.b * t.imaginary()),
                        this.symbol
                    ).toSin()
                );
            }
            // t is real
            else return this.valueAt(t.real());
        }
    };
}
