import Algebra from "math/algebra";
import Complex from "math/algebra//complex";
import { Cos, Sin } from "./trigonometric";

export default class Exp extends Algebra {
    constructor(a, b, symbol = "t", params = {}) {
        // ae^bt
        super(a, { symbol, type: "exp", b, ...params });
    }

    copy = (
        linkPrevious = false // copy everything
    ) =>
        new Exp(this.a, this.b, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    hardcopy = () =>
        // shallow copy just for single term copy
        new Exp(this.a, this.b, this.symbol, {
            dot: this.dot,
            input: this.input,
        });
    toSin = () => {
        const exp = this.copy();
        if (
            exp.type === "exp" &&
            exp.b instanceof Complex &&
            exp.b.isComplex()
        ) {
            if (exp.b instanceof Complex) {
                if (exp.b.real() === 0 || exp.b.toString() === "0") {
                    const b = exp.b.imaginary();
                    const cos = new Cos(exp.a, b);
                    const sin =
                        b >= 0
                            ? new Sin(exp.a, b)
                            : new Sin(
                                  exp.a instanceof Algebra
                                      ? exp.a.negation()
                                      : -exp.a,
                                  -b
                              );
                    return new Complex(cos, sin);
                } else
                    return new Exp(
                        new Exp(
                            exp.a,
                            Complex.jX(exp.b.imaginary()),
                            exp.symbol
                        ).toSin(),
                        exp.b.real(),
                        exp.symbol
                    );
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
        const jw = Complex.jX(w);
        let pb = +this.b;
        if (this.b === pb) return pb * w;
        if (this.b instanceof Algebra) {
            pb = this.b.$(jw);
            return jw.multiply(pb).imaginary();
        }
    };

    decomposition = () => {
        if (this.b instanceof Complex)
            return new Exp(
                new Exp(this.a, Complex.jX(this.b.imaginary()), this.symbol),
                this.b.real(),
                this.symbol
            );
        return this.copy();
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
                    Complex.jX(this.b * t.imaginary()),
                    this.symbol
                ).toSin();
            } else if (t.imaginary()) {
                // edit this
                return (
                    new Exp(this.a, this.b, this.symbol).valueAt(t.real()) *
                    new Exp(
                        1,
                        Complex.jX(this.b * t.imaginary()),
                        this.symbol
                    ).toSin()
                );
            }
            // t is real
            else return this.valueAt(t.real());
        }
    };

    static ConvertToMe = (algebra) =>
        new Exp(
            algebra.getA(),
            algebra.getB() ? algebra.getB() : 0,
            algebra.symbol,
            {
                dot: this.dot,
                plus: this.plus,
                previous: this.previous,
                input: this.input,
            }
        );
    toAlgebra = () =>
        new Algebra(this.a, {
            type: "exp",
            symbol: this.symbol,
            b: this.b,
            dot: this.dot,
            plus: this.plus,
            previous: this.previous,
            input: this.input,
        });
}
