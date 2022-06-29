import nerdamer from "nerdamer/nerdamer.core";
import "nerdamer/Algebra";
import "nerdamer/Solve";
import "nerdamer/Calculus";
import "nerdamer/Extra";
import Algebra from "../algebra/index";
import { precision, round } from "math/calculus";
import Complex from "math/algebra/complex";

export default class Equation {
    static zeroPrecision = round(10 ** -precision.get());
    constructor(expression, symbol = null) {
        if (expression instanceof Algebra) {
            this.expression = expression.copy(true);
            this.symbol = this.expression.symbol;
        } else if (typeof expression === "string") {
            this.expression = expression;
        }

        this.symbol = symbol;
    }

    roots = () => {
        console.log(nerdamer.solve(this.expression, this.symbol));
        let x = nerdamer.solve(this.expression, this.symbol).toDecimal();
        x = x.slice(1, x.length - 1);
        x = x.split(",").filter((xi) => xi && xi !== ""); // now x is converted from a string to the array of x answers (as Numbers);
        // edit string to array
        return x;
    };

    AlgebraRoots = () => {
        // convert roots returning string to
        if (!this.roots || this.roots.length === 0) this.solve();
    };

    // needs work!
    static newton = (polyf, x0 = 0, N = 20) => {
        const f = polyf.$;
        const df = polyf.derivative().$;
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
    };

    approximate = (method = Equation.newton, boundary = 1000, N = 10) => {
        const allRoots = [];
        // newton reaches to approx fast
        // so N = 10 is enough (?????)
        const isUnique = (newRoot) =>
            !isNaN(newRoot) &&
            allRoots.findIndex((rt) => !(rt instanceof Complex) ? rt === newRoot : rt.equals(newRoot)) === -1;
        const isUniqueComplex = (newRoot) =>
            newRoot instanceof Complex &&
            allRoots.findIndex(
                (rt) => newRoot.equals(rt)
            ) === -1;

        if (this.expression instanceof Algebra) {
            let a0 = 0;
            for(let i = this.expression.a.length - 1;i >= 0; i--)
                if(this.expression.a[i]){
                    a0 = this.expression.a[i];
                    break;
                }
            const an = this.expression.a[0];

            if (a0 && an !== 0) boundary = Math.abs(a0 / an);
            
            for (let x0 = -boundary; x0 <= boundary; x0++) {
                let x = method(this.expression, x0, N);
                if (!isNaN(x)) {
                    const rx = round(x);
                    if (isUnique(rx)) allRoots.push(rx);
                }
                x = method(this.expression, new Complex(0, x0), N);
                if (isUniqueComplex(x)) allRoots.push(x);
            }
        }
        return allRoots;
    };
    // needs work!
    static middlePoint = (
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

            let rate = (xb - xa) / (2 * Math.max(Math.abs(xa), Math.abs(xb)));
            let p = null;
            while (rate >= expectedRate) {
                p = (xa + xb) / 2;
                if (!f(p)) break;
                else if (f(p) * f(xa) < 0) xb = p;
                else {
                    xa = p;
                    rate =
                        (xb - xa) / (2 * Math.max(Math.abs(xa), Math.abs(xb)));
                }
            }
            if (!f(p)) poles.push(round(p));
        }
        return new Set(poles);
    };
}
