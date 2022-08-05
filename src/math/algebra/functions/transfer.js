import Algebra from "../index";
import Complex from "../complex";
import Exp from "./exp";
import Fraction from "./fraction";
import { Step } from "math/input-signals/signals";
import Poly from "./poly";
import { Cos, Sin } from "./trigonometric";
import { round } from "math/calculus/index";
import Equation from "math/solvers/equation";
import { makeProgress } from "toolshed";
import Formula from "math/solvers/formula";

export default class TransferFunction extends Fraction {
    static Specials = {
        $1: (k, a) =>
            new TransferFunction([k], [1, a]).setRoots([], [-a]).setOrder(1),
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
        $design: (t_rise, overshoot) =>
            new TransferFunction(null, null, { overshoot, t_rise }),

        $PID: (Kp, Ti, Td) =>
            Ti !== 0
                ? new TransferFunction([Kp * Ti * Td, Kp * Ti, Kp], [Ti, 0])
                : new TransferFunction([Kp * Td, Kp], [1]),
    };

    static RootOrders = (Roots) => {
        Roots = Roots.sort((p1, p2) => p1.real() - p2.real());
        const orders = [];
        for (let i = 0; i < Roots.length; i++) {
            let j = i + 1,
                order = 1;
            for (; j < Roots.length && Roots[i].equals(Roots[j]); j++, order++);
            orders.push({ value: Roots[i], order });
            i = j - 1;
        }
        return orders;
    };
    static OmegaZetaPoles = (w_n, zeta) => {
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
        if (params) {
            if (params.overshoot && params.t_rise) {
                params.overshoot = Number(params.overshoot);
                params.t_rise = Number(params.t_rise);
                const logMp = Math.log10(params.overshoot);
                params.zeta =
                    -logMp / (Math.PI * Math.PI + logMp * logMp) ** 0.5;
                params.w_d = Math.PI / params.t_rise;
                params.w_n =
                    params.w_d / (1 - params.zeta * params.zeta) ** 0.5;
            }

            if (params.w_n) {
                params.w_n = Number(params.w_n);
                params.zeta = Number(params.zeta);
                // if the user sends w_n params it will override the given zero/pole list
                const { w_n, zeta } = params;
                const wn2 = w_n * w_n;
                numerator = wn2;
                denominator = [1, 2 * zeta * w_n, wn2];
                poles = TransferFunction.OmegaZetaPoles(w_n, zeta);
                zeros = [];
            }
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
                this.timeConstant = round(1 / (this.zeta * this.w_n));
                this.t_settle = 4 * this.timeConstant;
                if (params && params.w_d) this.w_d = params.w_d;
                else if (this.zeta >= -1 && this.zeta <= 1)
                    this.w_d = this.w_n * (1 - this.zeta ** 2) ** 0.5;
                this.order = 2;
                this.setRoots(
                    [],
                    TransferFunction.OmegaZetaPoles(this.w_n, this.zeta)
                );
            }
        }
        if (!this.order)
            this.order =
                denominator instanceof Array ? denominator.length - 1 : 1;
        if (params.overshoot && params.t_rise) {
            [this.overshoot, this.t_rise] = [params.overshoot, params.t_rise];
        } else {
            const dampingCharasteristics =
                this.getDampingSystemCharasteristics();
            if (dampingCharasteristics) {
                this.overshoot = dampingCharasteristics.overshoot;
                this.t_rise = dampingCharasteristics.t_rise;
            }
        }
        if (
            (!this.zeros || !this.zeros.length) &&
            (!this.poles || !this.poles.length)
        ) {
            const [zs, ps] = this.roots();
            this.setRoots(zs, ps);
        }
    }

    roots = () => {
        // roots hasnt been decided by user
        let zeros = [],
            poles = [];
        if (
            this.a instanceof Array &&
            this.b instanceof Array && // if all elements of numerator and denominator are actual numbers
            !this.a.find((ai) => ai !== +ai) &&
            !this.b.find((bi) => bi !== +bi)
        ) {
            // CONSTANT COEFFICIENT POLYNOMIAL EQUATIONS
            zeros =
                this.a.length > 1
                    ? new Formula(this.numerator().toFormula(), this.symbol).x()
                    : // ? new Equation(this.a, this.symbol).solve()
                      [];
            poles =
                this.b.length > 1
                    ? new Formula(
                          this.denominator().toFormula(),
                          this.symbol
                      ).x()
                    : //? new Equation(this.b, this.symbol).solve()
                      [];
            if (zeros.length < this.a.length - 1) {
                zeros = Formula.RepetitiveFactors(
                    this.numerator().toFormula(),
                    zeros,
                    this.symbol
                );
            }
            if (poles.length < this.b.length - 1) {
                poles = Formula.RepetitiveFactors(
                    this.denominator().toFormula(),
                    poles,
                    this.symbol
                );
            }
        } else {
            // if the equation isnt a simple constant coefficient polynomial
        }

        return [zeros, poles];
    };

    setRoots = (zeros, poles) => {
        this.poles = poles
            .map((pi) =>
                pi instanceof Complex ? pi.copy() : new Complex(pi, 0)
            )
            .sort((p1, p2) => p1.real() - p2.real());
        this.zeros = zeros
            .map((zi) =>
                zi instanceof Complex ? zi.copy() : new Complex(zi, 0)
            )
            .sort((z1, z2) => z1.real() - z2.real());

        return this;
    };

    getDampingSystemCharasteristics = () =>
        this.w_d
            ? {
                  t_rise: round(Math.PI / this.w_d),
                  // WHAT IF W_D === 0?
                  overshoot:
                      this.zeta >= -1 && this.zeta <= 1
                          ? round(
                                100 *
                                    Math.exp(
                                        -(this.zeta * Math.PI) /
                                            (1 - this.zeta ** 2) ** 0.5
                                    )
                            )
                          : null,
              }
            : null;

    getOrder = () => this.order;
    setOrder = (order) => {
        this.order = order;
        return this;
    };
    getPoles = () => this.poles;
    setPoles = (poles) => {
        this.poles = TransferFunction.map((pi) =>
            pi instanceof Complex ? pi.copy() : new Complex(pi, 0)
        );
        return this;
    };
    getZeros = () => this.zeros;
    setZeros = (zeros) => {
        this.zeros = zeros.map((zi) =>
            zi instanceof Complex ? zi.copy() : new Complex(zi, 0)
        );
        return this;
    };

    poleOrder = (pole) =>
        this.poles.filter((pi) => Algebra.areTheseTwoEqual(pole, pi)).length;

    laplace = () => this.copy(); // actually it has no laplace, this is for disfunctioning the laplace method in the parent class Algebra
    laplaceInverse = () => {
        // const m = this.zeros.length - 1; // number of zeros
        // const n = this.poles.length - 1; // number of poles
        const zeros = TransferFunction.RootOrders(this.zeros),
            poles = TransferFunction.RootOrders(this.poles); // compact zero/pole list containing the orders
        const coefs = [];
        for (let i = 0; i < poles.length; i++) {
            // for(let j  = 0; j < poles[i].order; i++)
            const s = poles[i].value;
            const otherPoles = [...poles];
            otherPoles.splice(i, 1);
            const num =
                    zeros.length > 0
                        ? Complex.MultiplyFactors(zeros, s)
                        : new Complex(1, 0),
                den = Complex.MultiplyFactors(otherPoles, s);
            coefs.push(num.devide(den));
        }
        let g_s = new TransferFunction(coefs[0].actual(), [
                1,
                poles[0].value.negation().actual(),
            ]),
            c_t = new Exp(coefs[0].actual(), poles[0].value.actual());
        for (let i = 1; i < coefs.length; i++) {
            g_s = g_s.add(
                new TransferFunction(coefs[i].actual(), [
                    1,
                    poles[i].value.negation().actual(),
                ])
            );
            c_t = c_t.add(new Exp(coefs[i].actual(), poles[i].value.actual()));
        }
        return { $s: g_s, $t: c_t };
    };

    stepify = () => {
        const lstep = this.copy();
        lstep.b.push(0); //update denominator
        lstep.poles.push(new Complex(0, 0));
        return lstep;
    };
    step = () => {
        // normally will automatically return the time domain answer
        // unless inLaplaceDomain is true
        // PUT INPUT SIGNAL AT THE END
        const m = this.zeros.length; // number of zeros
        const n = this.poles.length; // number of poles
        const nreal = this.poles.filter(
            (pi) => !(pi instanceof Complex) || pi.isReal()
        ).length; // number of real poles; can be eig   her 2 or 0
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
                    //UNDERSHOOT BUG FIXLAYS HERE
                    const a = -this.poles[0].real(),
                        b = this.poles[0].imaginary();
                    const ka2b2 = k / (a ** 2 + b ** 2);
                    // FIND BUUUUUUG
                    // return new Exp(-ka2b2, -a)
                    //     .multiply(new Cos(1, b).add(new Sin(a / b, b)))
                    //     .multiply(new Step())
                    //     .add(new Step(ka2b2));
                    return new Exp(-ka2b2, -a)
                        .multiply(new Cos(1, b))
                        .add(new Exp(-ka2b2, -a).multiply(new Sin(a / b, b)))
                        .multiply(new Step())
                        .add(new Step(ka2b2));
                }
                // else if( nreal == 1) // this cant happen, but what if sth went wrong?
            }
        }
        // if its not in special mode:
        return new Formula(this.stepify().toFormula(), this.symbol).iL();
    };
    copy = (linkPrevious = false) =>
        new TransferFunction(this.a, this.b, {
            overshoot: this.overshoot,
            t_rise: this.t_rise,
            t_settle: this.t_settle,
            w_d: this.w_d,
            timeConstant: this.timeConstant,
            w_n: this.w_n,
            zeta: this.zeta,
            dot: this.dot,
            plus: this.plus,
            previous: linkPrevious ? this.previous : null,
            input: this.input,
        }).setRoots(this.zeros, this.poles);

    lim = (s0) => {
        let num, den;
        // for simple polynomial numerator and denominator fractions
        // IMPLEMENT HOPITAL AS WELL?
        if (!s0) {
            // s -> 0)

            num = { a: 0, sp: this.a.length - 1 };
            den = { b: 1, sp: this.b.length - 1 };
            for (; num.sp > 0 && this.a[num.sp] === 0; num.sp--);
            num.a = this.a[num.sp];
            for (; den.sp > 0 && this.b[den.sp] === 0; den.sp--);
            den.b = this.b[den.sp];
            num.sp = this.a.length - num.sp - 1;
            den.sp = this.b.length - den.sp - 1;
            if (num.sp === den.sp) return num.a / den.b;
            else {
                const sMinPower = Math.min(den.sp, num.sp);
                if (sMinPower) {
                    num.sp -= sMinPower;
                    den.sp -= sMinPower;
                }
                // now one of num.sp or den.sp is zero
                if (den.sp)
                    // zero on denominator
                    return Infinity;
                // if den.sp == 0 and num.sp != 0
                return 0;
            }
        } else if (s0 === Infinity) {
            // s -> infinity
            num = { a: 0, sp: 0 };
            den = { b: 1, sp: 0 };
            for (; num.sp < this.a.length && this.a[num.sp] === 0; num.sp++);
            num.a = this.a[num.sp];
            for (; den.sp < this.b.length && this.b[den.sp] === 0; den.sp++);
            den.b = this.b[den.sp];
            num.sp = this.a.length - num.sp - 1;
            den.sp = this.b.length - den.sp - 1;
            if (num.sp === den.sp) return num.a / den.b;
            // else
            const sMinPower = Math.min(den.sp, num.sp);
            if (sMinPower) {
                num.sp -= sMinPower;
                den.sp -= sMinPower;
            }
            // now one of num.sp or den.sp is zero
            if (den.sp)
                // zero on denominator
                return 0;
            // if den.sp == 0 and num.sp != 0
            return Infinity;
        } else {
            // if s0 is just a no-zero limited number
            num = this.numerator().$(s0);
            den = this.denominator().$(s0);
            if (den)
                // simple non zero denominator limit
                return num / den;
            // if den == 0
            // use Hopital or other limit methods
            //return (num.a * (s0 ** num.sp)) / (den.b * (s0 ** den.sp));
        }
    };
    errors = () => {
        const sGs = this.multiply(new Poly([1, 0], "s"));
        const s2Gs = sGs.multiply(new Poly([1, 0], "s"));
        return {
            Ks: round(this.lim(0)),
            Kr: round(sGs.lim(0)),
            Ka: round(s2Gs.lim(0)),
        };
    };
    // $ = (t) => this.laplaceInverse().$(t); // valueOf function in certain point; I used character $ in many places as,
    // acronym for "set" in setters, so $ here means that set the t ( or x or whatever) with a certain point

    amplitude = (w) => {
        // w === omega
        const jw = new Complex(0, w);
        const num = this.numerator(),
            den = this.denominator();
        const numAmp = !(num instanceof Exp)
                ? num.$(jw).magnitude()
                : Math.abs(num.getA()),
            denAmp = !(den instanceof Exp)
                ? den.$(jw).magnitude()
                : Math.abs(den.getB());
        return numAmp / denAmp;
        // this is for find exact match of the devide function
        // but im sure num and den are Complex so i directly stated the result

        // if(num instanceof Complex)
        //     return num.magnitude() / (den instanceof Complex ? den.magnitude : den).magnitude();
        // if(den instanceof Complex)
        //     return num instanceof Algebra ? num.devide(den.magnitude()) : num / den.magnitude();
        // if(num instanceof Algebra)
        //     return num.devide(den);
        // if(den instanceof Algebra)
        //     return den.devideInverse(num);
        // // signal input?
        // if(den)
        //     return num / den;
        // return NaN;
    };

    phase = (w) => {
        const jw = new Complex(0, w);
        let num = this.numerator(),
            den = this.denominator();
        const numPhase = !(num instanceof Exp)
                ? num.$(jw).phase()
                : num.phase(w), //exponentials have their own shortcut for phase()
            denPhase = !(den instanceof Exp) ? den.$(jw).phase() : den.phase(w);
        if (+denPhase === denPhase && +numPhase === numPhase)
            return numPhase - denPhase;
        // for now Complex.phase() returns numbers or functions:
        // numPhase or denPhase instanceof Function then:
        return (
            (numPhase instanceof Function ? numPhase(w) : numPhase) -
            (denPhase instanceof Function ? denPhase(w) : denPhase)
        );
        // else if(numPhase instanceof Algebra)
        //     return numPhase.$(w) - den.phase();
        // return NaN;
    };

    static PolarToComplex = (A, phi) =>
        new Complex(A * Math.cos(phi), A * Math.sin(phi));
    nyquist = (w, method = "complex") =>
        method === "complex"
            ? this.$(new Complex(0, w))
            : TransferFunction.PolarToComplex(this.amplitude(w), this.phase(w));

    bode = (w) => 20 * Math.log10(this.amplitude(w));

    toFormula = () => {
        // const [zeros, poles] = this.repetitiveRoots();
        const num =
            this.zeros.length > 0
                ? this.zeros
                      .map(
                          (zi) =>
                              "(" +
                              this.symbol +
                              " - " +
                              zi.toString(false, true).replace("j", "i*") +
                              ")"
                      )
                      .join("*")
                : "1";
        const den =
            this.poles.length > 0
                ? this.poles
                      .map(
                          (pi) =>
                              "(" +
                              this.symbol +
                              " - " +
                              pi.toString(false, true).replace("j", "i*") +
                              ")"
                      )
                      .join("*")
                : "1";
        return `(${num})/(${den})`;
    };
    // ****************************************************** //
    // SOLVE THIS WITH nerdamer again
    rootLocus = async (k_min, k_max, progressBarObject, N = 1000) => {
        // return root locus values for plotting

        // TEMPORARY:
        let dk = (k_max - k_min) / N;
        const a = this.getA(), // numerator
            b = this.getB(); // denominator => a / b
        const na = a.length - 1,
            nb = b.length - 1;
        const reals = [],
            imaginaries = [];
        const progressLength = k_max - k_min;
        const newTerm = Formula.GetTerm; // Equation.GetAlgebriteTerm;
        for (let k = k_min, progress = 0; k <= k_max; k += dk, progress += dk) {
            // in this piece: using short form codes and using objects is set to minimum
            // because root locus is time consuming and putting all the codes in one main loop is better
            // const delta = b.add(a.multiply(k));
            let delta = null,
                expression = "";
            // USE ARRAY DIRECT PROCESS FOR FASTER RESPONSE
            // NUM + K * DEN
            if (na <= nb) {
                delta = Array(nb);
                const offsetB = nb - na;
                for (
                    let i = 0;
                    i < offsetB;
                    delta[i] = b[i],
                        expression += newTerm(nb - i, delta[i], this.symbol),
                        i++
                );
                for (
                    let i = 0, ib = offsetB;
                    i <= na;
                    delta[ib] = b[ib] + k * a[i],
                        expression += newTerm(na - i, delta[ib], this.symbol),
                        i++,
                        ib++
                );
            } else {
                delta = Array(na);
                const offsetA = na - nb;
                for (
                    let i = 0;
                    i < offsetA;
                    delta[i] = b[i],
                        expression += newTerm(na - i, delta[i], this.symbol),
                        i++
                );
                for (
                    let i = 0, ib = offsetA;
                    i <= nb;
                    delta[ib] = b[ib] + k * a[i],
                        expression += newTerm(nb - i, delta[ib], this.symbol),
                        i++,
                        ib++
                );
            }
            const poles = new Formula(expression, this.symbol).x();
            await makeProgress(
                progressBarObject,
                (100 * progress) / progressLength
            );

            for (let i = 0; i < poles.length; i++) {
                if (poles[i] instanceof Complex) {
                    reals.push(poles[i].real());
                    imaginaries.push(poles[i].imaginary());
                } else {
                    reals.push(poles[i]);
                    imaginaries.push(0);
                }
            }
        }
        await makeProgress(progressBarObject, 100);
        return [reals, imaginaries];
    };

    rootsByAlgebriteLocus = async (
        k_min,
        k_max,
        progressBarObject,
        N = 1000
    ) => {
        // return root locus values for plotting

        // TEMPORARY:
        let dk = (k_max - k_min) / N;
        const a = this.getA(), // numerator
            b = this.getB(); // denominator => a / b
        const na = a.length - 1,
            nb = b.length - 1;
        const reals = [],
            imaginaries = [];
        const progressLength = k_max - k_min;
        const newTerm = Equation.GetAlgebriteTerm;
        for (let k = k_min, progress = 0; k <= k_max; k += dk, progress += dk) {
            // in this piece: using short form codes and using objects is set to minimum
            // because root locus is time consuming and putting all the codes in one main loop is better
            // const delta = b.add(a.multiply(k));
            let delta = null,
                expression = "";
            // USE ARRAY DIRECT PROCESS FOR FASTER RESPONSE
            // NUM + K * DEN
            if (na <= nb) {
                delta = Array(nb);
                const offsetB = nb - na;
                for (
                    let i = 0;
                    i < offsetB;
                    delta[i] = b[i],
                        expression += newTerm(nb - i, delta[i], i, this.symbol),
                        i++
                );
                for (
                    let i = 0, ib = offsetB;
                    i <= na;
                    delta[ib] = b[ib] + k * a[i],
                        expression += newTerm(
                            na - i,
                            delta[ib],
                            ib,
                            this.symbol
                        ),
                        i++,
                        ib++
                );
            } else {
                delta = Array(na);
                const offsetA = na - nb;
                for (
                    let i = 0;
                    i < offsetA;
                    delta[i] = b[i],
                        expression += newTerm(na - i, delta[i], i, this.symbol),
                        i++
                );
                for (
                    let i = 0, ib = offsetA;
                    i <= nb;
                    delta[ib] = b[ib] + k * a[i],
                        expression += newTerm(
                            nb - i,
                            delta[ib],
                            ib,
                            this.symbol
                        ),
                        i++,
                        ib++
                );
            }
            // const roots = new Equation(new Poly(delta)).roots();
            const poles = new Equation(expression).solve();

            await makeProgress(
                progressBarObject,
                (100 * progress) / progressLength
            );

            for (let i = 0; i < poles.length; i++) {
                if (poles[i] instanceof Complex) {
                    reals.push(poles[i].real());
                    imaginaries.push(poles[i].imaginary());
                } else {
                    reals.push(poles[i]);
                    imaginaries.push(0);
                }
            }
        }
        await makeProgress(progressBarObject, 100);
        return [reals, imaginaries];
    };

    controlFeedback = (controller) => {
        const cs_gs = this.multiply(controller);
        return cs_gs
            .numerator()
            .devide(cs_gs.numerator().add(cs_gs.denominator())).toTransferFunction();
    };
}
