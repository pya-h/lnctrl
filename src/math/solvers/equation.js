import Algebra from "../algebra/index";
import { isDigit, precision, round } from "math/calculus";
import Complex from "math/algebra/complex";
import Poly from "../algebra/functions/poly";
const Algebrite = require("algebrite");

export default class Equation {
    static zeroPrecision = round(10 ** -precision.get());
    constructor(exp, symbol = "x") {
        if (exp instanceof Array) {
            this.algebra = new Poly(exp);
            this.symbol = symbol;
            this.expression = "";
            const n = exp.length - 1;
            this.degree = n;
            for (
                let i = 0;
                i < exp.length;
                this.expression += Equation.GetAlgebriteTerm(
                    n - i,
                    exp[i],
                    i,
                    symbol
                ),
                    i++
            );
        } else if (typeof exp === "string") {
            this.expression = exp;
            this.algebra = null;
            this.symbol = symbol;
        } else if (exp instanceof Poly) {
            this.expression = "";
            this.algebra = exp.copy();
            this.symbol = this.exp.symbol;
            const expression = this.getA();
            const n = expression.length - 1;
            this.degree = n; // unknown
            for (
                let i = 0;
                i < expression.length;
                this.expression += Equation.GetAlgebriteTerm(
                    n - i,
                    expression[i],
                    i,
                    symbol
                ),
                    i++
            );
        } else if (exp instanceof Algebra) {
            // THIS IS TEMPORARY
            this.expression = exp.toString(); // wrong EDIT THIS LATER
            this.algebra = exp.copy();
            this.symbol = this.exp.symbol;
            this.degree = undefined; // unknown
        }
        this.symbol = symbol;
    }

    static GetAlgebriteTerm = (termDegree, coef, index, symbol) => {
        if (coef === +coef) {
            // means that coef is not a string
            const intExpI = coef | 0;
            const symbolicPart =
                termDegree > 0 ? `*${symbol}^${termDegree}` : "";
            if (intExpI !== coef) {
                // means that coef is a float number
                Algebrite.run(`a${index} = ${coef}`);
                return (coef >= 0 ? "+" : "") + `a${index}${symbolicPart}`;
            } else
                return (intExpI >= 0 ? "+" : "") + `${intExpI}${symbolicPart}`;
        }
        // here it means coef is a string like '11/2' or '1/4', ...
        return `${coef}${symbol}^${termDegree}`;
    };
    solve = () => {
        // for factorable equations use: algebrite.roots
        let x = Algebrite.nroots(this.expression)
            .toString()
            .replaceAll("...", "");
        x = x.slice(1, x.length - 1);
        x = x.split(",").filter((xi) => xi && xi !== ""); // now x is converted from a string to the array of x answers (as Numbers);
        // edit string to array
        return x.map((xi, i) => {
            // let [real, image] = xi.split(/\+|-/).filter((xi) => xi && xi !== "");
            let separatorIndex = 1;
            for (; separatorIndex < xi.length; separatorIndex++)
                if (
                    (xi[separatorIndex] === "+" ||
                        xi[separatorIndex] === "-") &&
                    isDigit(xi[separatorIndex - 1]) &&
                    isDigit(xi[separatorIndex + 1])
                )
                    break;

            let terms = [];
            terms.push(xi.slice(0, separatorIndex));
            if (separatorIndex < xi.length)
                terms.push(xi.slice(separatorIndex, xi.length - 2));
            
            if (terms.length === 1) {
                const magnitude = terms[0].replace("*i", "");
                return magnitude === terms[0]
                    ? new Complex(Number(magnitude))
                    : new Complex(0, Number(magnitude));
            } else return new Complex(Number(terms[0]), Number(terms[1]));
        });
    };

    // AlgebraRoots = () => {
    //     // convert roots returning string to
    //     if (!this.roots || this.roots.length === 0) this.solve();
    // };

    approximate = (
        method = Equation.Methods.newton,
        N = 10,
        boundary = 1000
    ) => {
        const allRoots = [];
        // newton reaches to approx fast
        // so N = 10 is enough (?????)
        const isUnique = (newRoot) =>
            !isNaN(newRoot) &&
            allRoots.findIndex((rt) =>
                !(rt instanceof Complex) ? rt === newRoot : rt.equals(newRoot)
            ) === -1;
        const isUniqueComplex = (newRoot) =>
            newRoot instanceof Complex &&
            allRoots.findIndex((rt) => newRoot.equals(rt)) === -1;

        if (this.expression instanceof Algebra) {
            let a0 = 0;
            for (let i = this.expression.a.length - 1; i >= 0; i--)
                if (this.expression.a[i]) {
                    a0 = this.expression.a[i];
                    break;
                }
            const an = this.expression.a[0];

            if (a0 && an !== 0) boundary = Math.abs(a0 / an);

            for (let x0 = -boundary; x0 <= boundary; x0++) {
                let x = method(this.algebra, x0, N);
                if (!isNaN(x)) {
                    const rx = round(x);
                    if (isUnique(rx)) allRoots.push(rx);
                }
                x = method(this.algebra, new Complex(0, x0), N);
                if (isUniqueComplex(x)) allRoots.push(x);
            }
        }
        return allRoots;
    };
    // approximation methods
    durandKerner = (N = 20) => {
        if (this.algebra instanceof Algebra) {
            const f = this.algebra.$;
            const n = this.algebra.degree();
            let guess;
            do {
                guess = new Complex(Math.random(), Math.random());
            } while (guess.isReal());
            const roots = Array(n)
                .fill(0)
                .map((_) => []);

            roots[0].push(new Complex(1, 0));
            for (let i = 1; i < n; i++)
                roots[i][0] = guess.multiply(roots[i - 1][0]);
            for (let iter = 0; iter < N; iter++) {
                for (let i = 0; i < n; i++) {
                    const xiN = roots[i][iter].copy();
                    let sndTermDen = new Complex(1, 0);
                    for (let j = 0; j < n; j++) {
                        if (i !== j) {
                            const xjN = roots[j][roots[j].length - 1];
                            sndTermDen = sndTermDen.multiply(
                                xiN.substract(xjN)
                            );
                        }
                    }
                    let sndTerm = f(xiN).devide(sndTermDen);
                    // USING PUSH MAY SLOW DOWN THE ALGORITHM
                    roots[i].push(xiN.substract(sndTerm));
                }
            }
            return roots.map((r) => r[r.length - 1]);
        }
    };

    static Methods = {
        // needs work!
        newton: (algebraf, x0 = 0, N = 20) => {
            const f = algebraf.$;
            const df = algebraf.derivative().$;
            const xs = Array(N + 1).fill(0);
            const dfx0 = df(x0);
            if (dfx0 && (!(dfx0 instanceof Complex) || !dfx0.isZero())) {
                if (x0 instanceof Complex) {
                    xs[0] = x0;
                    for (let i = 0; i < N; i++) {
                        // const dfxsi = df(xs[i]);
                        // console.log("xs[i] = ", xs[i].toString(), "=> f(x) = ", f(xs[i]).toString(), "=> df =", dfxsi.toString(), "res = ", f(xs[i]).devide(df(xs[i])))
                        xs[i + 1] = xs[i].substract(f(xs[i]).devide(df(xs[i])));
                    }

                    const fx = f(xs[N]);
                    if (
                        Math.abs(fx.real()) > Equation.zeroPrecision ||
                        Math.abs(fx.imaginary()) > Equation.zeroPrecision
                    )
                        return NaN;
                } else {
                    xs[0] = x0;

                    for (let i = 0; i < N; i++) {
                        xs[i + 1] = xs[i] - f(xs[i]) / df(xs[i]);
                    }

                    if (f(xs[N]) > Equation.zeroPrecision) return NaN;
                }
                //integrity check!
                return xs[xs.length - 1];
            }
            return NaN;
        },
        // needs work!
        middlePoint: (
            f,
            boundary = 1000
            // decimalPrecision = precision.get()
        ) => {
            // NOTE: works fine for some equations
            // and wronge for some others like:  x ** 2 - 4*x  - 5
            boundary = Math.abs(boundary);
            const expectedRate = Equation.zeroPrecision;
            const poles = [];
            let xa = 0,
                xb = 1;
            for (let i = 0; i < boundary; i++) {
                xa = -boundary + i;
                xb = boundary - i;

                let rate =
                    (xb - xa) / (2 * Math.max(Math.abs(xa), Math.abs(xb)));
                let p = null;
                while (rate >= expectedRate) {
                    p = (xa + xb) / 2;
                    if (!f(p)) break;
                    else if (f(p) * f(xa) < 0) xb = p;
                    else {
                        xa = p;
                        rate =
                            (xb - xa) /
                            (2 * Math.max(Math.abs(xa), Math.abs(xb)));
                    }
                }
                if (!f(p)) poles.push(round(p));
            }
            return new Set(poles);
        },
    };
}
