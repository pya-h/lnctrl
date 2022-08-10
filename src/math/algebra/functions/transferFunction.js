import Algebra from "../index";
import Complex from "../complex";
import Exp from "./exp";
import Fraction from "./fraction";
import { Step } from "math/input-signals/signals";
import Poly from "./poly";
import { Cos, Sin } from "./trigonometric";

export default class TransferFunction extends Fraction {
    static Specials = {
        $1: (k, a) =>
            new TransferFunction([k], [1, -a]).setRoots([], [a]).setOrder(1),
        $2: (k, a, b = a instanceof Complex ? a.conjugate : a) => {
            // k / (s + a)(s + b) => must be converted to => k / (s2 + 2(a+b)s + ab)
            let aplusb =
                a instanceof Algebra
                    ? a.add(b)
                    : b instanceof Algebra
                    ? b.add(a)
                    : b + a;
            let ab =
                a instanceof Algebra
                    ? a.multiply(b)
                    : b instanceof Algebra
                    ? b.multiply(a)
                    : b * a;
            if (aplusb instanceof Complex && aplusb.isReal())
                aplusb = aplusb.real();
            if (ab instanceof Complex && ab.isReal()) ab = ab.real();

            return new TransferFunction(
                [k],
                [1, aplusb instanceof Algebra ? aplusb.negation() : -aplusb, ab]
            )
                .setRoots([], [a, b])
                .setOrder(2);
        },
        $WnZ: (w_n, zeta) => new TransferFunction(null, null, { w_n, zeta }),
    };

    static omegaZetaPoles = (w_n, zeta) => {
        if (Math.abs(zeta) >= 1) {
            const alpha = -zeta * w_n;
            const beta = w_n * (zeta * zeta - 1) ** 0.5;
            return [alpha + beta, alpha - beta];
        }
        const alpha = -zeta * w_n;
        const beta = w_n * (1 - zeta * zeta) ** 0.5;
        return [new Complex(alpha, beta), new Complex(alpha, -beta)];
    };
    constructor(numerator, denominator, params = {}) {
        let zeros = [],
            poles = [];
        if (params && params.w_n) {
            // if the user sends w_n params it will override the given zero/pole list
            const { w_n, zeta } = params;
            const wn2 = w_n * w_n;
            numerator = wn2;
            denominator = [1, 2 * zeta * w_n, wn2];
            poles = TransferFunction.omegaZetaPoles(w_n, zeta);
            zeros = [];
        }
        super(numerator, denominator, "s", params);
        // SIMPL;IFY
        this.poles = [...poles]; //edit solve equations
        this.zeros = [...zeros];
        if (!this.a instanceof Array) this.a = [this.a];
        if (this.a.length === 1 && !this.w_n) {
            if (
                this.b.length === 3 &&
                this.b[this.b.length - 1] === this.a[0]
            ) {
                this.w_n = this.a[0];
                this.zeta = this.b[1] / (2 * this.w_n);
                this.order = 2;
                this.setRoots(
                    [],
                    TransferFunction.omegaZetaPoles(this.w_n, this.zeta)
                );
            }
        }
        if (!this.order)
            this.order = denominator instanceof Array ? denominator.length : 1;
    }
    static sortRoots = (rt) =>
        rt.sort((ri, rj) =>
            ri instanceof Algebra
                ? ri.substract(rj)
                : rj instanceof Algebra
                ? rj.substract(ri)
                : Math.abs(ri) - Math.abs(rj)
        );
    roots = () => [this.zeros, this.poles];
    setRoots = (zeros, poles) => {
        this.poles = poles.map((pi) =>
            pi instanceof Complex && pi.isReal() ? pi.real() : pi
        );
        this.zeros = zeros.map((zi) =>
            zi instanceof Complex && zi.isReal() ? zi.real() : zi
        );
        return this;
    };

    getOrder = () => this.order;
    setOrder = (order) => {
        this.order = order;
        return this;
    };
    getPoles = () => this.poles;
    setPoles = (poles) => {
        this.poles = TransferFunction.sortRoots(poles).map((pi) =>
            pi instanceof Complex && pi.isReal() ? pi.real() : pi
        );
        return this;
    };
    getZeros = () => this.zeros;
    setZeros = (zeros) => {
        this.zeros = zeros.map((pi) =>
            pi instanceof Complex && pi.isReal() ? pi.real() : pi
        );
        return this;
    };

    poleOrder = (pole) =>
        this.poles.filter((pi) => Algebra.areTheseTwoEqual(pole, pi)).length;

    laplace = () => this.copy(); // actually it has no laplace, this is for disfunctioning the laplace method in the parent class Algebra
    laplaceInverse = () => {
        const m = this.zeros.length - 1; // number of zeros
        const n = this.poles.length - 1; // number of poles

        if (m === 0) {
            switch (n) {
                case 2:
                    return null;
                case 1:
                    return new Algebra(1, { type: "exp" }); //EDITTTTTTTTTTTTTTTT
                case 0:
                    return null; //u(t)
                default:
                    return null; //DEFINE AN UNKNOWN FUNCTION FOR CASE LIKE THIS
            }
        }
    };
    step = (inTimeDomain = true) => {
        // normally will automatically return the time domain answer
        // unless inLaplaceDomain is true
        if (inTimeDomain) {
            const m = this.zeros.length; // number of zeros
            const n = this.poles.length; // number of poles
            const nreal = this.poles.filter(
                (pi) => !(pi instanceof Complex)
            ).length; // number of real poles; can be eigher 2 or 0
            if (m === 0) {
                const k = this.numerator();
                if (n === 0) {
                    // return u(t)
                    // DEFINE U(T) IN ALGEBRA
                }
                if (n === 1) {
                } else if (n === 2) {
                    const a = -this.poles[0],
                        b = -this.poles[1];
                    if (nreal === 2) {
                        // if (a > 0 && b > 0) {
                        if (a !== b)
                            // two independent polesdddd
                            // two negative independent poles
                            return new Exp(1 / a, -a)
                                .add(new Exp(-1 / b, -b))
                                .multiply(k / (a - b))
                                .multiply(new Step())
                                .add(new Step(k / (a * b)));
                        else {
                            const a2 = a * a;
                            return new Exp(-k / a2, -a)
                                .multiply(new Poly([a, 1]))
                                .multiply(new Step())
                                .add(new Step(k / a2));
                        }
                        // } else {
                        //     // repetetive poles
                        // }
                    } else if (nreal === 0) {
                        // two conjugated complex poles
                        const a = -this.poles[0].real(),
                            b = this.poles[0].imaginary();
                        const ka2b2 = k / (a ** 2 + b ** 2);
                        return new Exp(-ka2b2, -a)
                            .multiply(new Cos(1, b).add(new Sin(a / b, b)))
                            .multiply(new Step())
                            .add(new Step(ka2b2));
                    }
                    // else if( nreal == 1) // this cant happen, but what if sth went wrong?
                }
            }
        } else {
            const lstep = this.copy();
            const poles = lstep.getPoles();
            poles.push(0);
            lstep.getB().push(0); //update denominator
            lstep.setPoles(poles).setDenominator(lstep.getB());
            return lstep;
        }
    };
    copy = (linkPrevious = false) =>
        new TransferFunction(this.a, this.b, this.symbol, {
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        }).setRoots(this.zeros, this.poles);

    $ = (t) => this.laplaceInverse().$(t); // valueOf function in certain point; I used character $ in many places as,
    // acronym for "set" in setters, so $ here means that set the t ( or x or whatever) with a certain point
}
