import Algebra from "math/algebra";
import Complex from "../complex";
import Fraction from "./fraction";

export default class Poly extends Algebra {
    static atn = (a, n, symbol = "t") => {
        const aArray = Array(n + 1).fill(0);
        aArray[0] = a;
        return new Poly(aArray, symbol);
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
    hardcopy = () =>
        // shallow copy; signle term copy
        new Poly(this.a, this.symbol, {
            dot: this.dot,
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

    devide = (operand) => {
        if (operand instanceof Poly && this.symbol === operand.symbol) {
            return new Fraction(this.getA(), operand.getA(), this.symbol);
        }
        if (operand === +operand) return this.multiply(1 / Number(operand));
        else if (operand instanceof Algebra)
            return new Fraction(this.getA(), operand, this.symbol);
        return this.copy();
        // is it true??
        // return super.devide();
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
        return an instanceof Complex
            ? !an.isUnit()
                ? an
                : 1
            : an;
    };
}
