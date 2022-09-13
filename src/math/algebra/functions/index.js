import Algebra from "math/algebra";
import Complex from "../complex";
import calculus from "math/calculus";
import { Fraction } from "./fraction";

export class Poly extends Algebra {
    static atn = (a, n, symbol = "t") => {
        const aArray = Array(n + 1).fill(0);
        aArray[0] = a;
        return new Poly(aArray, symbol);
    };
    static PolyLine = (point) => {
        const m = new Poly([1, 0], "m");
        // y - y0 = m(x - x0) => y = y0 + m.x - m.x0 = m.x + (y0 - m.x0)
        // a = [m, y0 - m.x0]
        return new Poly([m, m.multiply(-point.x).add(point.y)], "x");
    };
    constructor(a, symbol = "t", params = {}) {
        // ke^ct
        if (typeof a === "number") a = [a];
        super(a, { symbol, type: "poly", ...params });
    }

    copy = (
        linkPrevious = false // copy everything
    ) =>
        new Poly(this.a, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    degree = () => this.a.length - 1;

    valueAt = (t) => {
        if (typeof t === "number") return Algebra.polynomialValueAt(this.a, t);
        else if (t instanceof Complex) {
            const n = this.a.length - 1;
            if (n >= 0) {
                let powerTerm = 1,
                    result =
                        this.a[n] instanceof Complex
                            ? this.a[n].copy()
                            : new Complex(this.a[n], 0);
                for (let i = n - 1; i >= 0; i--) {
                    powerTerm = t.multiply(powerTerm);
                    result = result.add(powerTerm.multiply(this.a[i]));
                }
                return result;
            }
            return 0;
        }
        return NaN;
    };

    static Symbolic = (
        degree,
        symbol = "t",
        halfTermsVisible = 2,
        coef = "a",
        inline = false
    ) => {
        let res = inline ? "" : "$$";
        if (degree === "n") {
            res += `${coef}_n ${symbol}^n + `;
            for (let i = 1; i < halfTermsVisible; i++)
                res += `${coef}_{n - ${i}}${symbol}^{n - ${i}} + `;
            res += " ... ";
            for (let i = halfTermsVisible - 1; i > 0; i--)
                res += ` + ${coef}_{${i}}${symbol}^{${i}}`;
            res += ` + ${coef}_0`;
        } else if (typeof degree === "number") {
            for (; degree >= 0; degree--) {
                res += `${coef}_{${degree}}`;
                if (degree > 0) res += `${symbol}^{${degree}} + `;
            }
        }
        return res + (inline ? "" : " $$");
    };
    derivative = (against = this.symbol) => {
        const result = this.copy(true);
        if (against === this.symbol) {
            if (!result.dot) {
                const n = result.a.length - 1;
                const da = Array(n).fill(0);
                for (let i = n; i >= 1; i--) da[n - i] = i * result.a[n - i];
                result.a = [...da];
            }
            if (result.plus) result.plus = result.plus.derivative();
        }
        return result;
    };

    expression = () => {
        if (this.a instanceof Array) {
            const n = this.a.length - 1;
            if (
                !n ||
                !this.a.slice(0, n).filter((ci) => ci.toString() !== "0").length
            )
                return this.a[n].toString();
            return this.a
                .map((a_i, i) =>
                    a_i
                        ? Algebra.coefy(a_i, i, n) +
                          (i < n
                              ? this.symbol +
                                (i < n - 1 ? "^" + (n - i).toString() : "")
                              : "")
                        : ""
                )
                .join(""); // joins all the coefficients, symbols, etc all together as for polynomal functions
        }
        return this.a.toString();
    };

    // edit this function to remove unnecessary white spaces
    toFormula = () => {
        if (this.a instanceof Array) {
            const n = this.a.length - 1;
            if (
                !n ||
                !this.a.slice(0, n).filter((ci) => ci.toString() !== "0").length
            )
                return this.a[n].toString();
            return this.a
                .map((a_i, i) =>
                    a_i
                        ? Algebra.coefy(a_i, i, n) +
                          (i < n
                              ? this.symbol +
                                (i < n - 1 ? "^" + (n - i).toString() : "")
                              : "")
                        : ""
                )
                .join(""); // joins all the coefficients, symbols, etc all together as for polynomal functions
        }
        return this.a.toString();
    };

    mostSignificantCoefficient = () => {
        const an = this.a.filter((bi) => bi !== 0)[0];
        return an instanceof Complex ? (!an.isUnit() ? an : 1) : an;
    };

    devide = (operand) => {
        if (operand instanceof Poly && this.symbol === operand.symbol)
            return new Fraction(this.getA(), operand.getA(), this.symbol);

        if (operand === +operand) return this.multiply(1 / +operand);
        else if (operand instanceof Algebra)
            return new Fraction(this.getA(), operand, this.symbol);
        return this.toAlgebra().devide(operand); // if none of the conditions are met use the parent class devide function
        // is it true??
        // return super.devide();
    };
    toAlgebra = () =>
        new Algebra(this.a, {
            type: "poly",
            symbol: this.symbol,
            dot: this.dot,
            plus: this.plus,
            previous: this.previous,
            input: this.input,
        });
}

export class PolyLine extends Poly {
    constructor(
        point = { x: 0, y: 0 },
        angle = null,
        symbol = "x",
        params = {}
    ) {
        if (angle) {
            const m = calculus.tan(angle);
            const pt = point instanceof Array ? point[0] : point;
            // y - y0 = m(x - x0) => y = y0 + m.x - m.x0 = m.x + (y0 - m.x0)
            // a = [m, y0 - m.x0]
            super([m, pt.y - m * pt.x], symbol, params);
            this.angle = angle;
            // if(point.length > 1) => CHECK IF ALL POINTS IN ONE LINE???
        } else if (point.length >= 2) {
            const m = (point[1].y - point[0].y) / (point[1].x - point[0].x);
            // y - y0 = m(x - x0) => y = y0 + m.x - m.x0 = m.x + (y0 - m.x0)
            // a = [m, y0 - m.x0]
            super([m, point[0].y - m * point[0].x], symbol, params);
            this.angle = angle;

            // CHECK IF ALL POINTS IN ONE LINE???
        } else if (!(point instanceof Array) || point.length <= 1) {
            const m = new Poly([1, 0], "m");
            const pt = point instanceof Array ? point[0] : point;
            // y - y0 = m(x - x0) => y = y0 + m.x - m.x0 = m.x + (y0 - m.x0)
            // a = [m, y0 - m.x0]
            super([m, m.multiply(-pt.x).add(pt.y)], symbol, params);
            this.angle = angle;
        } else {
            super([0, 0], "x");
        }
    }
}

export class Exp extends Algebra {
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
                    const cos = new Cos(exp.a, b, 0, this.symbol, {
                        input: this.input,
                        plus: this.plus,
                        previous: this.previous,
                        dot: this.dot,
                    });
                    const sin =
                        b >= 0
                            ? new Sin(exp.a, b, 0, this.symbol, {
                                  dot: this.dot,
                              })
                            : new Sin(
                                  exp.a instanceof Algebra
                                      ? exp.a.negation()
                                      : -exp.a,
                                  -b,
                                  0,
                                  this.symbol,
                                  { dot: this.dot }
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
                        exp.symbol,
                        {
                            dot: this.dot,
                            input: this.input,
                            plus: this.plus,
                            previous: this.previous,
                        }
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

export class Sin extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
        if (w === +w && w < 0) {
            w *= -1;
            A *= -1;
        }
        super(A, { symbol, type: "sin", b: w, teta, ...params });
    }
    copy = (
        linkPrevious = false // deep copy; copy everything
    ) =>
        new Sin(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    toExp = () => {
        const sin = this.copy();
        const exp1 = new Exp(sin.a / 2, Complex.jX(-sin.b));
        const exp2 = new Exp(-sin.a / 2, Complex.jX(sin.b));
        return Complex.jX(exp1.add(exp2));
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.sin(w * t + teta);
    };
    static ConvertToMe = (algebra) =>
        new Sin(
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
}

export class Cos extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
        if (+w === w && w < 0) w *= -1; // cos(-w) = cos(w);
        super(A, { symbol, type: "cos", b: w, teta, ...params });
    }
    copy = (linkPrevious = false) =>
        new Cos(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    toExp = () => {
        const cos = this.copy();
        const exp1 = new Exp(cos.a / 2, Complex.jX(cos.b));
        const exp2 = new Exp(cos.a / 2, Complex.jX(-cos.b));
        return exp1.add(exp2);
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.cos(w * t + teta);
    };
    static ConvertToMe = (algebra) =>
        new Cos(
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
}

export class Tan extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
        super(A, { symbol, type: "tan", b: w, teta, ...params });
    }
    copy = (linkPrevious = false) =>
        new Tan(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    toExp = () => {
        const tan = this.copy();
        const exp1 = new Exp(1, Complex.jX(-tan.b));
        const numeratorExp2 = new Exp(-1, Complex.jX(tan.b));
        const denominatorExp2 = new Exp(1, Complex.jX(tan.b));
        return new Fraction(exp1.add(numeratorExp2), exp1.add(denominatorExp2));
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.tan(w * t + teta);
    };
    static ConvertToMe = (algebra) =>
        new Tan(
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
}

export class Cot extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
        super(A, { symbol, type: "cot", b: w, teta, ...params });
    }
    copy = (linkPrevious = false) =>
        new Cot(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    toExp = () => {
        const cot = this.copy();
        const exp1 = new Exp(1, Complex.jX(-cot.b));
        const numeratorExp2 = new Exp(-1, Complex.jX(cot.b));
        const denominatorExp2 = new Exp(1, Complex.jX(cot.b));
        return new Fraction(exp1.add(denominatorExp2), exp1.add(numeratorExp2));
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.cot(w * t + teta);
    };
    static ConvertToMe = (algebra) =>
        new Cot(
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
}

export class Scalar extends Poly {
    constructor(scalar) {
        // ke^ct
        super([scalar], null);
    }

    degree = () => 0;

    valueAt = (t) => 1;

    toString = () => {
        let str = this.a.toString();
        if (this.plus) {
            const strplus = this.plus.toString();
            if (strplus !== "0") str += " + " + strplus;
        }
        return str;
    };

    // ADD .add FOR REVISING .symbol VALUE
    // AND EDIT MULTIPLY TOO AND OTHER FUNCTIONS JUST TO REPLACE .SYMBOL
    multiply = (operand) =>
        operand instanceof Scalar
            ? new Scalar(this.a * operand.a)
            : operand instanceof Algebra
            ? operand.multiply(this.a)
            : new Scalar(+operand * this.a);
    devide = (operand) => new Fraction([+this.a], [1], operand instanceof Algebra ? operand.symbol : null).devide(operand);
}

export class One extends Scalar {
    constructor() {
        // ke^ct
        super(1);
    }

    multiply = (operand) =>
        operand instanceof Algebra ? operand : new Scalar(+operand);
    devide = (operand) => new Fraction([1], [1], this.symbol).devide(operand);
}

export class Zero extends Scalar {
    constructor(params) {
        // ke^ct
        super(0);
    }

    toString = () => {
        let str = "0";
        if (this.plus) str = this.plus.toString();

        return str;
    };
    devide = (operand) => new Zero();

    add = (operand) =>
        operand instanceof Algebra ? operand : new Scalar(+operand); //.hardcopy().linkPlus(this.plus);

    multiply = (operand) => new Zero();

}
