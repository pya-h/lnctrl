import Algebra from "math/algebra";
import Poly from "./poly";

export default class Fraction extends Algebra {
    constructor(num, den = [1], symbol = "t", params = {}) {
        // ke^ct
        if (!(num instanceof Algebra)) {
            if (!(num instanceof Array)) num = [num];
            // this.a
            else if (num.length === 0) num = [0];
        }
        if (!(den instanceof Algebra)) {
            if (!(den instanceof Array)) den = [den];
            // this.b
            else if (den.length === 0) den = [1];
        }
        super(num, { symbol, type: "frac", b: den, ...params });
    }

    copy = (linkPrevious = false) =>
        new Fraction(this.a, this.b, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input
        });

    lim = () => {
        // for all fractions with all kind of numerator and denominator
    }
    
    numerator = () => this.a instanceof Algebra ? this.a.copy(true) : new Poly(this.a);
    denominator = () => this.b instanceof Algebra ? this.b.copy(true) : new Poly(this.b);

    setNumerator = (num) => {
        if (!(num instanceof Algebra)) {
            if (!(num instanceof Array)) num = [num];
            // this.a
            else if (num.length === 0) num = [0];
        }
        return this.setA(num);
    }

    setDenominator = (den) => {
        if (!(den instanceof Algebra)) {
            if (!(den instanceof Array)) den = [den];
            // this.b
            else if (den.length === 0) den = [1];
        }
        return this.setB(den);
    }
    valueAt = (t) => {
        const num = this.numerator().$(t);
        const den = this.denominator().$(t);
       
        if(num instanceof Algebra)
            return num.devide(den);
        if(den instanceof Algebra)
            return den.devideInverse(num);
        if(den)
            return num / den;
        // THROW zero denominator ERROR 
        return undefined;
    }

}
