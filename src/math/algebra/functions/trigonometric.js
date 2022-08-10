import Algebra from "math/algebra";
import Complex from "math/algebra/complex";
import Exp from "./exp";
import Fraction from "./fraction";

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
    hardcopy = () =>
        // shallow copy; copy signle term
        new Sin(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
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
    hardcopy = () =>
        // shallow copy; copy signle term
        new Cos(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
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
    hardcopy = () =>
        // shallow copy; copy signle term
        new Tan(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
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
    hardcopy = () =>
        // shallow copy; copy signle term
        new Cot(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
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
