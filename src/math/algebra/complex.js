import Algebra from ".";
import { round, isDigit } from "../calculus";

class Complex extends Algebra {
    static jX = (X) => new Complex(0, X);
    static Zero = () => new Complex(0, 0);

    constructor(preal, pimage = 0, params = {}) {
        super(preal, { symbol: "j", type: "complex", b: pimage, ...params });
        if (pimage instanceof Complex) {
            if (this.a instanceof Algebra)
                this.a = this.a.substract(pimage.imaginary());
            else if (pimage.imaginary() instanceof Algebra)
                this.a = pimage.negation().add(this.a);
            else this.a -= pimage.imaginary();
            this.b = pimage.real();
        } 
    }
    static ToCouples = (arrComplex) => {
        const n = arrComplex.length;
        if (n >= 1) {
            const reals = Array(n).fill(0),
                imaginaries = Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                if (arrComplex[i] instanceof Complex) {
                    reals[i] = arrComplex[i].real();
                    imaginaries[i] = arrComplex[i].imaginary();
                } else reals[i] = arrComplex[i];
            }
            return [reals, imaginaries];
        }
        return [];
    };
    hasMultiTerms = () =>
        this.plus || (this.a.toString() !== "0" && this.b.toString() !== "0");

    toString = (parenthesis = false, showJ1 = false) => {
        if (this.isZero()) return "0";
        const rl = this.a;
        let formula = parenthesis && this.hasMultiTerms() ? "(" : "";
        if (rl !== 0)
            formula +=
                rl instanceof Algebra
                    ? rl.toString(rl.hasMultiTerms())
                    : round(rl);
        let im = this.b;
        if (im !== 0) {
            //if (im < 0 || (im instanceof Algebra)) { im = im.negation()
            if (im < 0) {
                im *= -1;
                formula += " - ";
            } else if (im instanceof Algebra && im.getA() < 0) {
                im.setA(-im.getA());
                formula += " - ";
            } else if (rl !== 0) formula += " + ";

            formula += this.symbol;
            if (im !== 1 || showJ1)
                formula +=
                    im instanceof Algebra
                        ? im.toString(im.hasMultiTerms())
                        : round(im);
        }
        if (this.plus) formula += this.join(); // if there's a next term: casscade toString() calls

        return parenthesis ? formula + ")" : formula;
    }; // a + jb

    real = () => this.a;
    imaginary = () => this.b;

    copy = (linkPrevious = false) =>
        new Complex(this.a, this.b, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        });
    hardcopy = () =>
        new Complex(this.a, this.b, {
            dot: this.dot,
            input: this.input,
        });

    conjugate = () =>
        new Complex(
            this.a,
            this.b instanceof Algebra ? this.b.negation() : -this.b
        );

    negation = () =>
        new Complex(
            this.a instanceof Algebra ? this.a.negation() : -this.a,
            this.b instanceof Algebra ? this.b.negation() : -this.b
        );

    magnitude$2 = () => this.a ** 2 + this.b ** 2;

    magnitude = () => (this.a ** 2 + this.b ** 2) ** 0.5;

    phase = () => {
        const definiteA = +this.a,
            definiteB = +this.b;
        if (this.a === definiteA && this.b === definiteB)
            return Math.atan2(definiteB, definiteA);
        if (this.b instanceof Algebra)
            return (t) =>
                Math.atan2(
                    this.b.$(t),
                    this.a instanceof Algebra ? this.a.$(t) : definiteA
                );
        if (this.a instanceof Algebra)
            return (t) => Math.atan2(definiteB, this.a.$(t));
        return NaN;
    };
    isReal = () => this.b === 0;
    isComplex = () => this.b !== 0 && this.b.toString() !== 0;
    hasSameTypeWith = (x) =>
        (this.isReal() && x.isReal()) || (!this.isReal() && !x.isReal()); // both full imaginray or both real
    realify = () => new Complex(this.a, 0); // return a simple real value in Complex object format (for methods that only accept Complex values)

    add = (operand) => {
        let Re = null,
            Im = null;
        if (operand instanceof Complex) {
            if (this.a instanceof Algebra) Re = this.a.add(operand.real());
            else if (operand.real() instanceof Algebra)
                Re = operand.real().add(this.a);
            else Re = this.a + operand.real();

            if (this.b instanceof Algebra) Im = this.b.add(operand.imaginary());
            else if (operand.imaginary() instanceof Algebra)
                Im = operand.imaginary().add(this.b);
            else Im = this.b + operand.imaginary();
        } else {
            if (this.a instanceof Algebra) Re = this.a.add(operand);
            else if (operand instanceof Algebra) Re = operand.add(this.a);
            else Re = this.a + operand;

            Im = this.b;
        }
        return new Complex(Re, Im);
    };

    substract = (operand) => this.add(operand.negation());

    valueAt = t => {
        const real = this.a instanceof Algebra ? this.a.$(t) : this.a,
            image = this.b instanceof Algebra ? this.b.$(t) : this.b;
        return new Complex(real, image).actual();
    }
    equals = (operand) => {
        if (operand instanceof Complex) {
            // two complex number are equal to eachother if both thier real parts are the same, and their imaginary parts are the same
            let realPartsEqual = false;
            if (this.a instanceof Algebra)
                realPartsEqual = this.a.equals(operand.real());
            else if (operand.real() instanceof Algebra)
                realPartsEqual = operand.real().equals(this.a);
            else realPartsEqual = this.a === operand.real();
            if (!realPartsEqual) return false;

            if (this.b instanceof Algebra)
                return this.b.equals(operand.imaginary());
            else if (operand.imaginary() instanceof Algebra)
                return operand.imaginary().equals(this.b);
            return this.b === operand.imaginary();
        }

        // if operand is not a complex number then the only way it can be equal with this object of Complex,
        // is for this object to have a zero imaginary part:
        return (
            this.isReal() &&
            (operand instanceof Algebra
                ? operand.equals(this.a)
                : operand === this.a)
        );
    };

    isConjugateWith = (operand) => this.conjugate().equals(operand);
    multiply = (operand) => {
        let Re = [],
            Im = [];
        if (operand instanceof Complex) {
            // first term
            if (this.a instanceof Algebra) {
                Re.push(this.a.multiply(operand.real()));
                Im.push(this.a.multiply(operand.imaginary()));
            } else {
                Re.push(
                    operand.a instanceof Algebra
                        ? operand.a.multiply(this.a)
                        : operand.a * this.a
                );

                Im.push(
                    operand.b instanceof Algebra
                        ? operand.b.multiply(this.a)
                        : this.a * operand.b
                );
            }

            // second term
            if (this.b instanceof Algebra) {
                Re.push(this.b.multiply(operand.imaginary()));
                Im.push(this.b.multiply(operand.real()));
            } else {
                Re.push(
                    operand.b instanceof Algebra
                        ? operand.b.multiply(this.b)
                        : operand.b * this.b
                );

                Im.push(
                    operand.a instanceof Algebra
                        ? operand.a.multiply(this.b)
                        : this.b * operand.a
                );
            }
            return new Complex(Re[0] - Re[1], Im[0] + Im[1]);
        } else {
            Re =
                this.a instanceof Algebra
                    ? this.a.multiply(operand)
                    : operand instanceof Algebra
                    ? operand.multiply(this.a)
                    : this.a * operand;

            Im =
                this.b instanceof Algebra
                    ? this.b.multiply(operand)
                    : operand instanceof Algebra
                    ? operand.multiply(this.b)
                    : this.b * operand;
        }
        return new Complex(Re, Im);
    };

    devide = (denominator) => {
        if (denominator instanceof Complex) {
            const result = this.multiply(denominator.conjugate()).devide(
                denominator.magnitude$2()
            );
            // CHECK THIS
            if (isNaN(result.real())) result.setA(0);
            if (isNaN(result.imaginary())) result.setB(0);
            return result;
        } else if (denominator instanceof Algebra) {
            // USE super().devide ?
            return this.copy(); // for now to avoid craches
        } else return this.multiply(1 / denominator); // number
    };

    raiseTo = (power) => {
        let result = this.copy(true);
        // for now power must be integr
        if (Math.floor(power) === power)
            for (let i = 1; i < power; i++) {
                result = result.multiply(this);
            }

        return result;
    };

    devideInverse = (k) =>
        (k instanceof Algebra ? k : new Complex(k, 0)).devide(this);

    static extract = (strNumber) => {
        // extract a string to a complex object

        strNumber = strNumber.replace(/\s/g, "");
        let i = strNumber[0] === "-" || strNumber[0] === "+" ? 1 : 0;
        let real = 0;
        if (strNumber[i] !== "j") {
            for (; i < strNumber.length && isDigit(strNumber[i]); i++);
            real = Number(strNumber.slice(0, i) || 0);
        }

        let sign = 1;
        for (
            ;
            i < strNumber.length &&
            (strNumber[i] === "j" ||
                strNumber[i] === "+" ||
                strNumber[i] === "-");
            i++
        )
            if (strNumber[i] === "-") sign = -1;

        const img = Number(strNumber.slice(i, strNumber.length) || 0);
        return new Complex(real, sign * img);
    };

    isZero = () => this.a === 0 && this.b === 0;
    isUnit = () => this.a === 1 && this.b === 0;
    static MultiplyFactors = (factors, s, gain = 1) => {
        // list of factors (usually roots) multiply at a certain point
        // (s + f1) * (s + f2) * ... * (s + fn)
        if (!(s instanceof Complex)) s = new Complex(s, 0);
        let result = new Complex(gain, 0);
        for (const factor of factors) {
            let term = s.substract(factor.value);
            if (factor.order > 1) term = term.raiseTo(factor.order);
            result = result.multiply(term);
        }
        return result;
    };

    actual = () => (this.isReal() ? this.real() : this);
    
    simplify = () => {
        const result = this.copy();
        if (result.b instanceof Complex) {
            if (result.a instanceof Algebra)
                result.a = result.a.substract(result.b.imaginary());
            else if (result.b.imaginary() instanceof Algebra)
                result.a = result.b.negation().add(result.a);
            else result.a -= result.b.imaginary();
            result.b = result.b.real();
        } else if (result.b instanceof Algebra) {
            // j(x + jy)
            const x = result.b.a;
            if (x instanceof Complex && !x.real()) {
                x.a = x.b === +x.b ? -x.b : x.b.negation();
                x.b = 0;
            }
            return result.b.copy().add(result.a.copy());
        }
        return result;
    };
}

export default Complex;
