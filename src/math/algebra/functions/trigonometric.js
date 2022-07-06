import Algebra from "math/algebra";
import Complex from "math/algebra/complex";
import Exp from "./exp";
import Fraction from "./fraction";

export class Sin extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
        super(A, { symbol, type: "sin", b: w, teta, ...params });
    }
    copy = (linkPrevious = false) =>
        new Sin(this.a, this.b, this.teta, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });

    toExp = () => {
        const sin = this.copy();
        const exp1 = new Exp(sin.a / 2, new Complex(0, -sin.b));
        const exp2 = new Exp(-sin.a / 2, new Complex(0, sin.b));
        return new Complex(0, exp1.add(exp2));
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.sin(w * t + teta)
    }
}

export class Cos extends Algebra {
    constructor(A, w, teta = 0, symbol = "t", params = {}) {
        // Ae^wt
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
        const exp1 = new Exp(cos.a / 2, new Complex(0, cos.b));
        const exp2 = new Exp(cos.a / 2, new Complex(0, -cos.b));
        return exp1.add(exp2);
    };


    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.cos(w * t + teta)
    }
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
        const exp1 = new Exp(1, new Complex(0, -tan.b));
        const numeratorExp2 = new Exp(-1, new Complex(0, tan.b));
        const denominatorExp2 = new Exp(1, new Complex(0, tan.b));
        return new Fraction(exp1.add(numeratorExp2), exp1.add(denominatorExp2));
    };

    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.tan(w * t + teta)
    }
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
        const exp1 = new Exp(1, new Complex(0, -cot.b));
        const numeratorExp2 = new Exp(-1, new Complex(0, cot.b));
        const denominatorExp2 = new Exp(1, new Complex(0, cot.b));
        return new Fraction(exp1.add(denominatorExp2), exp1.add(numeratorExp2));
    };


    valueAt = (t) => {
        const A = Algebra.valueOf(this.a, t);
        const w = Algebra.valueOf(this.b, t);
        const teta = Algebra.valueOf(this.teta, t);
        return A * Math.cot(w * t + teta)
    }
}
