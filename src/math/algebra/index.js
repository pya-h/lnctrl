import NotScalarError from "errors/algebra/NotScalarError";
import StandardInputSignal from "math/input-signals";
import { round, strictPrecisionFormat } from "../calculus";

class Algebra {
    // symbolic expressions
    constructor(
        a,
        { symbol = "t", type = "poly", b, dot, plus, teta = 0, previous, input }
    ) {
        // dot is the interface between terms
        // g(t) = a * f(t) * {dot: as Algebra}
        // teta is the offset for wt + alpha in sin/cos/tan/..

        this.symbol = symbol;
        this.type = type.toLowerCase();
        this.setA(a).setB(b).setTeta(teta);

        this.input = input; // u(t), r(t), puls, ...
        if (dot) {
            this.dot = dot.copy();
        } // multiply a Algebra from different type into 'this'

        if (plus) {
            this.plus = plus.copy();
            this.removeZeros();
        } // add another Algebra with different type to this one

        this.previous = previous; // the previous term in the chained Algebra objects
        // term.plus => next term, term.previous => previous term, term.dot => an algebra from another type that is multiplied to actual term
        // F(u) = a.f(u).dot(u) + term.plus(u)
        this.link();
    }
    static identify = (parameter) => {
        if (parameter instanceof Array)
            return parameter.map((pi) =>
                pi instanceof Algebra || pi instanceof StandardInputSignal
                    ? pi.copy()
                    : round(pi)
            );
        else if (parameter instanceof Algebra) {
            return parameter.copy();
        } else if (typeof parameter === "number") return round(parameter);
        else if (typeof parameter === "string") return parameter;
        else if (!parameter) return 0;
        throw new NotScalarError(parameter);
    };
    
    setA = (a) => {
        this.a = Algebra.identify(a);
        return this;
    };
    getA = () => this.a;
    getSymbol = () => this.symbol;
    setB = (b) => {
        this.b = Algebra.identify(b);
        return this;
    };
    getB = () => this.b;

    setTeta = (teta) => {
        this.teta = Algebra.identify(teta);
        return this;
    };
    getTeta = () => this.teta;
    getType = () => this.type;

    linkPlus = (plus) => {
        this.plus = plus;
        return this;
    };
    linkDot = (dot) => {
        this.dot = dot;
        return this;
    };

    setInputSignal = (input) => {
        this.input = input;
        return this;
    };
    // CONNECT AND LINK METHODS, FIND FIRST TERM AND LAST TERM AND ...
    end = () => {
        // returns the end term in the algebratic chain
        let last = this;
        while (last.plus) last = last.plus;
        return last;
    };

    first = () => {
        // returns the first term in the algebratic chain
        let fst = this;
        while (fst.previous) fst = fst.previous;
        return fst;
    };

    enddot = () => {
        // returns the end term in the algebratic chain
        let last = this;
        while (last.dot) last = last.dot;
        return last;
    };

    firstdot = () => {
        // returns the first term in the algebratic chain
        let fst = this;
        // WRONG *****************************
        //while (fst.previous) fst = fst.previous;
        return fst;
    };
    link = () => {
        // some times .previous links are broken; so i decided to write this method just to make sure everything is connected
        let term = this.first();
        if (!term) term = this; // in case this.first() returns wrong answer
        while (term.plus) {
            if (term.plus) term.plus.previous = term;
            term = term.plus; // go to next term in the chain
        }
        return this;
    };

    copy = (linkPrevious = false) =>
        new Algebra(this.a, {
            type: this.type,
            b: this.b,
            dot: this.dot,
            plus: this.plus,
            symbol: this.symbol,
            teta: this.teta,
            input: this.input,
            previous: linkPrevious ? this.previous : null,
        });

    // SORT THE MULTIPLIERD TERMS ( TERMS CONNECTED WITH this.dot) IN A SPECIFIC ORDER (FOR BETTER SHOW AND COMPARE AND ETC.)
    // LOOK HERE IT STILL HAS BUGS
    sort = () => {
        // sort .dot in special order: poly - exp - frac - ...
        const orders = ["poly", "exp", "frac"];
        let position = this;
        for (const order of orders) {
            while (position) {
                let func = position.dot;
                while (func) {
                    if (func.type === order && !position.isPrior(order)) {
                        const temp = position.copy();
                        position.a =
                            func.a instanceof Array ? [...func.a] : func.a;
                        position.type = func.type;
                        position.symbol = func.symbol;
                        if (func.b instanceof Array) position.b = [...func.b];
                        else position.b = func.b;

                        func.a = temp.a instanceof Array ? [...temp.a] : temp.a;
                        func.type = temp.type;
                        func.symbol = temp.symbol;
                        if (temp.b instanceof Array) func.b = [...temp.b];
                        else func.b = temp.b;
                    }
                    func = func.dot;
                }
                position = position.dot;
            }
        }
    };

    isPrior = (order) => {
        const orders = ["poly", "exp", "frac"];
        const thisValue = orders.findIndex((or) => or === this.type);
        const orderValue = orders.findIndex((or) => or === order);
        return thisValue <= orderValue;
    };

    // CHECK IF ONE TERMS CAN BE ADDED TO ANOTHER ONE (MEANING THEY HAVE SAME PARAMETRIC TERMS)
    unifiable = (exp) => {
        // check if this is unifiable with expression:exp
        //this.sort();
        //exp.sort();
        if (exp && this.type === exp.type && this.symbol === exp.symbol) {
            // check if this and exp are sumable
            // check .dot s:
            let isUnifiable = true;
            if (this.dot || exp.dot)
                isUnifiable = this.dot && this.dot.unifiable(exp.dot);

            if (this.b instanceof Array && exp.b instanceof Array) {
                if (this.b.length === exp.b.length) {
                    const sameOnes = this.b.filter(
                        (item, idx) => item === exp.b[idx]
                    );
                    return isUnifiable && this.b.length === sameOnes.length;
                }
            } else if (this.b instanceof Algebra)
                return isUnifiable && this.b.equals(exp.b);
            return isUnifiable && exp.b === this.b;
        }
        return false;
    };

    static valueOf = (x, t = 0) => {
        if (x) {
            let value = 0;
            if (x instanceof Algebra || x instanceof StandardInputSignal)
                value = x.$(t);
            else if (x instanceof Array)
                value = Algebra.polynomialValueAt(x, t);
            else value = x;
            return value;
        }
        return 0;
    };

    static polynomialValueAt = (arr, t) => {
        let value = 0;
        const n = arr.length - 1;
        for (let i = 0; i <= n; i++) {
            value += arr[i] * t ** (n - i);
        }
        return value;
    };
    // REMOVE REDUNDANT TERMS, SIGNS AND ETC.
    removeZeros = () => {
        let term = this.first();
        while (term) {
            if (term instanceof Algebra) {
                if (
                    term.a === 0 ||
                    Algebra.polynomial(term.a, term.symbol) === 0
                ) {
                    if (term.previous) {
                        term.previous.plus = term.plus;
                    } else {
                        // remove first term and transfer the second term to first one
                        if (this === term) term.redundant = true;
                        if (term.plus) {
                            term = term.plus.copy(true);
                            if (term.plus) {
                                term.plus = term.plus.plus;
                                if (term.plus) term.plus.previous = term;
                            }
                            term.previous = null;
                        }
                    }
                    // }
                }
            }
            term = term.plus;
        }
        return this;
    };

    $ = (t, params = { showSteps: false }) => {
        // valueOf function in certain point
        // I used character $ in many places as acronym for "set" in setters, so $ here means that set the t ( or x or whatever) with a certain point
        // for each type just implement the method literally
        if (params.showSteps) console.log("step: ", this);
        let result = this.valueAt(t);
        if (this.dot) result *= this.dot.$(t);
        if (this.plus) result += this.plus.$(t);

        return (!this.input ? 1 : this.input.$(t)) * result;
    };

    label = (name = undefined, index = undefined) =>
        (name
            ? name +
              (index !== undefined ? "_{" + index + "}" : "") +
              "(" +
              this.symbol +
              ") = "
            : "") + this.toString();

    // RETURNS THE BEST AND SIMPLE AND SHORTEST WAY TO SHOW COEFFICIENTS
    static coefy = (a_i, i, n) => {
        if (a_i instanceof Algebra) {
            let str = "";
            let ai = a_i.copy();
            if (i > 0) {
                // write a method to edit all the + - occuring next to each other in toString()
                if (ai.type === "complex" && +ai.a === ai.a) {
                    if (ai.a < 0) {
                        str += " - ";
                        ai.a *= -1;
                    } else if (!ai.a) {
                        ai.b = +ai.b;
                        if (ai.b < 0) {
                            str += " - ";
                            ai.b *= -1;
                        } else str += " + ";
                    } else str += " + ";
                } else str += " + ";
            }
            return str + ai.toString(i < n && a_i.hasMultiTerms());
        }
        if (a_i instanceof StandardInputSignal) {
            //EDIT THIS PART TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            let str = i > 0 ? " + " : "";
            return str + a_i.toString(i < n && a_i.hasMultiTerms());
        } else {
            if (n === 0) return strictPrecisionFormat(a_i);
            if (a_i === 0) return "";
            if (i !== 0) {
                let s = "";
                if (a_i < 0) {
                    s += " - ";
                    a_i *= -1;
                } else s += " + ";

                if (a_i === 1 && i < n) return s;
                return s + strictPrecisionFormat(a_i);
            }
            if (a_i === 1) return "";
            if (a_i === -1) return "-";

            return strictPrecisionFormat(a_i);
        }
    };

    // DECIPHER THE OBJECT TO ITS POLYNOMINAL FORM (IF IT IS ONE ACTUALLY)
    static polynomial = (coefs, symbol) => {
        if (coefs instanceof Array) {
            const n = coefs.length - 1;
            if(n < 0) return "0";
            if (
                !n ||
                !coefs.slice(0, n).filter((ci) => ci.toString() !== "0").length
            )
                return coefs[n].toString();
            return coefs
                .map((a_i, i) =>
                    a_i
                        ? Algebra.coefy(a_i, i, n) +
                          (i < n
                              ? symbol +
                                (i < n - 1
                                    ? "^{" + (n - i).toString() + "}"
                                    : "")
                              : "")
                        : ""
                )
                .join(""); // joins all the coefficients, symbols, etc all together as for polynomal functions
        }
        return coefs.toString();
    };

    join = () => {
        // connect this term to its next terms; considering the right use of + or -
        if (this.plus) {
            let operator = "+",
                next = this.plus.copy();
            if (next.a instanceof Array) {
                if (next.a[0] < 0) {
                    operator = "-";
                    next.a[0] *= -1;
                }
            } else {
                if (next.a < 0) {
                    operator = "-";
                    next.a *= -1;
                }
            }
            return operator + next.toString();
        }
        return "";
    };

    hasMultiTerms = () => {
        if (this.plus) return true;
        if (this.a instanceof Array && this.type !== "frac")
            return this.a.filter((ai) => ai !== 0).length > 1;
        return false;
    };
    isTriangular = () =>
        this.type === "sin" ||
        this.type === "cos" ||
        this.type === "tan" ||
        this.type === "cot";

    

    // MATHEMATICAL OPERATIONS
    // static add = (expressions) => expressions.map((el) => el.toString()).join(" + ");
    add = (right) => {
        // result = this + operand
        let result = this.link().copy();
        if (right instanceof Algebra) {
            let operand = right.link().copy();

            let x = result; // now we try to add each term with its unifiable term in y
            while (x) {
                let y = operand;
                while (y) {
                    if (x.unifiable(y)) {
                        if (x.a instanceof Algebra) x.a = x.a.add(y.a);
                        else if (y.a instanceof Algebra) x.a = y.a.add(x.a);
                        // **************************************************
                        // else if x.a || y.a instanceof StandardInputSignal
                        // *********************************************
                        else if (x.a instanceof Array) {
                            if (y.a instanceof Array) {
                                if (y.a.length > x.a.length) x.a = [...y.a];
                                for (
                                    let i = 1;
                                    i <= y.a.length && i <= x.a.length;
                                    i++
                                )
                                    x.a[x.a.length - i] += y.a[y.a.length - i];
                            } else {
                                x.a[x.a.length - 1] += y.a;
                            }
                        } else {
                            x.a += y.a;
                        }
                        // remove the term in y that has been processed
                        if (y.previous) {
                            y.previous.plus = y.plus;
                            if (y.plus) y.plus.previous = y.previous;
                            y.a = 0;
                        }

                        // its the first term
                        else operand = operand.plus;
                        // after this the garbage collector will remove the term because it has no reference to it
                    }
                    y = y.plus;
                }
                // if(x.plus) x.plus.previous = x;
                x = x.plus; // go to next term in the chain
            }

            if (operand) {
                // if the above algorythm leaves operand with non-null value
                /// it means there was terms in the operand's algebratic chain that are'nt unifiable with x terms
                // so we must connect the leftovers to last terms of the result
                if (Algebra.polynomial(result.a, result.symbol) !== "0") {
                    if (
                        Algebra.polynomial(operand.getA(), operand.symbol) !==
                        "0"
                    ) {
                        let endTerm = result.end();
                        endTerm.plus = operand;
                        endTerm.plus.previous = result;
                    }
                } else result = operand.copy(); // connect to next term
            }
            return result.removeZeros();
        } else if (right instanceof StandardInputSignal) {
            const endTerm = result.end();
            endTerm.plus = right.copy();
            endTerm.plus.previous = endTerm;
        }
        return result;
    };

    arrangeDots = () => {
        let term = this;
        let input = null;
        while (term.dot) {
            // enhance the algo for cases that more than one input signal erxists in .dot chain
            if (term.dot instanceof StandardInputSignal) {
                input = term.dot;
                term.dot = term.dot.dot;
            }
            if (term.dot) term = term.dot;
        }
        term.dot = input;
    };
    // INCOMPLETE ***********
    multiply = (operand) => {
        const y = this.copy().link();
        if (operand instanceof Algebra) {
            // operand algebra or complex
            // ***** TODO:  ****************
            if (operand.type === "poly") {
                if (this.type === "poly" || this.type === "frac") {
                    // NEEDS ERDITING for FRACTIONs
                    if (this.symbol === operand.symbol) {
                        const ao = operand.getA();
                        const no = ao.length - 1;
                        const As = [];
                        for (let i = no; i >= 0; i--) {
                            if (operand.a[i]) {
                                const zeros = Array(no - i).fill(0);
                                const a = [...y.a].map((yai) =>
                                    yai instanceof Algebra
                                        ? yai.multiply(operand.a[i])
                                        : operand.a[i] instanceof Algebra
                                        ? operand.a[i].multiply(yai)
                                        : yai * operand.a[i]
                                );
                                a.push(...zeros);
                                As.push(a);
                            }
                        }
                        // now sum all the products
                        let product = As.pop();
                        for (let j = 0; j < As.length; j++)
                            for (
                                let i = 1;
                                i <= As[j].length && i <= product.length;
                                i++
                            )
                                if (
                                    product[product.length - i] instanceof
                                    Algebra
                                )
                                    product[product.length - i] = product[
                                        product.length - i
                                    ].add(As[j][As[j].length - i]);
                                else if (
                                    As[j][As[j].length - i] instanceof Algebra
                                )
                                    product[product.length - i] = As[j][
                                        As[j].length - i
                                    ].add(product[product.length - i]);
                                else
                                    product[product.length - i] +=
                                        As[j][As[j].length - i];

                        y.a = product;
                        if (operand.dot) {
                            // link dots ***IS THIS TRUE?>***
                            const endDotTerm = y.enddot();
                            endDotTerm.dot = operand.dot.copy(); // multiply
                            endDotTerm.dot.previous = endDotTerm;
                        }
                    }
                }
            } else if (y.type !== operand.type && operand.plus) {
                // like: exp(f(...)) * [Asin(...) * Bcos(...)]
                // UPDATE SELF MULTIPLY AFTER SOLVING THIS ISSUE
                y.plus = y.multiply(operand.plus.copy());
                const lastyDot = y.enddot();
                if (
                    typeof y.a === "number" &&
                    typeof operand.a === "number" &&
                    operand.a !== 1
                ) {
                    y.a *= operand.a;
                    operand.a = 1;
                }
                lastyDot.dot = operand.copy();
                lastyDot.dot.previous = lastyDot;
                // UPDATE SELF MULTIPLY AFTER SOLVING THIS ISSUE
            } else {
                const endDotTerm = y.enddot();
                if (typeof y.a === "number" && typeof operand.a === "number") {
                    y.a *= operand.a;
                    operand.a = 1;
                }
                endDotTerm.dot = operand.copy(); // multiply
                endDotTerm.dot.previous = endDotTerm;
            }
            if (y.plus) y.plus = y.plus.multiply(operand);
            if (operand.plus) y.end().plus = y.multiply(operand.plus);
            return y; // for now just to avoid crashes
        } else if (operand instanceof StandardInputSignal) {
            // const endDotTerm = y.enddot();
            // endDotTerm.dot = operand.copy(); // multiply
            // endDotTerm.dot.previous = endDotTerm;
            y.input = operand.copy();
            if (y.plus) y.plus = y.plus.multiply(operand);
        } else {
            // scalar multiply
            if (operand instanceof Algebra) {
            } else {
                if (y.a instanceof Array) y.a = y.a.map((ai) => operand * ai);
                else if (y.a instanceof Algebra) y.a = y.a.multiply(operand);
                else y.a = y.a * operand;
            }
            if (y.plus) y.plus = y.plus.multiply(operand);
        }
        return y;
    };

    selfmultiply = (operand) => {
        if (operand instanceof Algebra) {
            // operand algebra or complex
            // ***** TODO:  ****************
            if (operand.type === "poly") {
                if (this.type === "poly" || this.type === "frac") {
                    // NEEDS ERDITING for FRACTIONs
                    if (this.symbol === operand.symbol) {
                        const ao = operand.getA();
                        const no = ao.length - 1;
                        const As = [];
                        for (let i = no; i >= 0; i--) {
                            if (ao[i]) {
                                const zeros = Array(no - i).fill(0);
                                const a = [...this.a].map(
                                    (yai) => yai * operand[i]
                                );
                                a.push(...zeros);
                                As.push(a);
                            }
                        }
                        // now sum all the products
                        const product = As.pop();
                        for (let j = 0; j < As.length; j++)
                            for (
                                let i = 1;
                                i <= As[j].length && i <= product.length;
                                i++
                            )
                                product[product.length - i] +=
                                    As[j][As[j].length - i];
                        this.a = product;
                        if (operand.dot) {
                            // link dots ***IS THIS TRUE?>***
                            const endDotTerm = this.enddot();
                            endDotTerm.dot = operand.dot.copy(); // multiply
                            endDotTerm.dot.previous = endDotTerm;
                        }
                    }
                }
            } else if (this.type !== operand.type && operand.plus) {
                // like: exp(f(...)) * [Asin(...) * Bcos(...)]
                // UPDATE SELF MULTIPLY AFTER SOLVING THIS ISSUE
                this.plus = this.selfmultiply(operand.plus.copy());
                const lastyDot = this.enddot();
                if (
                    typeof this.a === "number" &&
                    typeof operand.a === "number" &&
                    operand.a !== 1
                ) {
                    this.a *= operand.a;
                    operand.a = 1;
                }
                lastyDot.dot = operand.copy();
                lastyDot.dot.previous = lastyDot;
                // UPDATE SELF MULTIPLY AFTER SOLVING THIS ISSUE
            } else {
                const endDotTerm = this.enddot();
                if (
                    typeof this.a === "number" &&
                    typeof operand.a === "number"
                ) {
                    this.a *= operand.a;
                    operand.a = 1;
                }
                endDotTerm.dot = operand.copy(); // multiply
                endDotTerm.dot.previous = endDotTerm;
            }
            if (this.plus) this.plus.selfmultiply(operand);
            // if (operand.plus) this.end().plus = this.selfmultiply(operand.plus);
        } else if (operand instanceof StandardInputSignal) {
            // this.dot = operand.copy(); // multiply
            // this.dot.previous = this;
            this.input = operand.copy();
            if (this.plus) this.plus.selfmultiply(operand);
            if (operand.plus) this.end().plus = this.multiply(operand.plus);
        } else {
            // scalar multiply
            if (this.a instanceof Array)
                this.a = this.a.map((ai) => operand * ai);
            else this.a *= operand;

            if (this.plus) this.plus.selfmultiply(operand);
        }
    };

    raise = (degree = 1) => {
        if (degree === 0) return new Algebra(1, { symbol: null });
        let negative = false;
        if (degree < 0) {
            negative = true;
            degree *= -1;
        }
        let result = this.copy();
        for (let i = 1; i < degree; i++) result = result.multiply(this);
        return !negative ? result : result.devideInverse(1);
    };
    negation = () => this.multiply(-1);

    substract = (operand) => this.add(operand.negation());

    devide = (operand) => {
        if (operand === +operand)
            // scaler
            return this.multiply(1 / +operand);
        // u need to handle Complex objects as Algebra using their type to recognize them
        if (operand instanceof Algebra) {
            if (operand.type === "poly" && this.symbol === operand.symbol) {
                return new Algebra(this.getA(), {
                    type: "frac",
                    b: operand.getA(),
                    symbol: this.symbol,
                });
            }
            return this.copy(); // for now just to avoid crashes
        }
    };

    devideInverse = (k) => {
        if (k === +k) {
            return new Algebra([k], {
                symbol: this.symbol,
                type: "frac",
                b: [1],
            });
        } else if (k instanceof Algebra) return k.devide(this);
    };

    laplace = () => {};

    static areTheSame = (el1, el2) => {
        // checkes the sameness of parameters like .a .b .teta , etc.
        if (el1 instanceof Algebra && el2 instanceof Algebra)
            return el1.equals(el2);
        else if (el1 instanceof Array && el2 instanceof Array) {
            if (el1.length === el2.length) {
                let i = 0;
                for (i = 0; i < el1.length; i++) if (el1[i] !== el2[i]) break;
                return i >= el1.length;
            }
        }
        return typeof el1 === typeof el2 && el1 === el2;
    };
    equals = (operand) =>
        operand instanceof Algebra &&
        this.type === operand.type &&
        this.symbol === operand.symbol &&
        this.type === operand.type &&
        this.symbol === operand.symbol &&
        Algebra.areTheSame(this.a, operand.a) &&
        Algebra.areTheSame(this.b, operand.b) &&
        Algebra.areTheSame(this.teta, operand.teta) &&
        (!this.dot || this.dot.equals(operand.dot)) &&
        (!this.plus || this.plus.equals(operand.plus)) &&
        (!this.previous || this.previous.equals(operand.previous));

    static areTheseTwoEqual = (p1, p2) =>
        p1 instanceof Algebra
            ? p1.equals(p2)
            : p2 instanceof Algebra
            ? p2.equals(p1)
            : p1 === p2;
    // DECIPHERS THE CONNECT OBJECTS TO UNDERSTANDABLE MATHMATICALLY SHAPED TEXT
    // IT IS FORMATTED COMPATIBLE FOR MathJax component
    toString = (parenthesis = false) => {
        // this.arrangeDots();
        this.removeZeros(); // removeZeros current chain that's left from unknown number of operations
        let formula = "";
        // if ... + 0 || 0 + ... appears ===>>>>> see below !!
        if (!this.a) return "0"; // what if **************************************** 0 / 0
        if (parenthesis) formula += "(";
        switch (this.type.toLowerCase()) {
            case "exp": {
                // if (this.a < 0) formula += "(";
                let a0 = this.a;
                if (a0 < 0) {
                    formula += "-";
                    a0 *= -1;
                }
                if (a0 !== 1)
                    if (a0 instanceof Algebra)
                        formula += a0.toString(
                            a0 instanceof Algebra && a0.hasMultiTerms()
                        );
                    else if (a0 instanceof Array)
                        // testTEST
                        formula += Algebra.polynomial(a0, this.symbol);
                    // FOR TEST
                    else formula += strictPrecisionFormat(a0);
                if (this.dot instanceof Algebra)
                    formula += this.dot.toString(
                        this.dot instanceof Algebra && this.dot.hasMultiTerms()
                    );
                if (this.b !== 0) {
                    if (this.a !== 0) {
                        formula += "e^{";
                        let e0 = this.b;
                        if (this.b instanceof Algebra)
                            formula += this.b.toString(
                                this.b instanceof Algebra &&
                                    this.b.hasMultiTerms()
                            );
                        else if (this.b instanceof Array)
                            formula += Algebra.polynomial(this.b, this.symbol);
                        else {
                            if (e0 < 0) {
                                formula += "-";
                                e0 *= -1;
                            }
                            if (e0 !== 1) formula += e0;
                        }
                        formula += this.symbol + "}";
                    }
                    if (this.input) formula += this.input.toString();
                } else if (a0 !== 1 || !this.dot)
                    formula +=
                        this.a instanceof Algebra
                            ? this.a.toString()
                            : strictPrecisionFormat(this.a);

                // if (this.a < 0) formula += ")";
                if (this.plus) formula += this.join(); // if there's a next term: casscade toString() calls
                break;
            }
            case "poly":
                if (
                    !parenthesis &&
                    this.input &&
                    this.a.filter((ai) => ai).length > 1
                ) {
                    parenthesis = true;
                    formula += "(";
                }
                formula += Algebra.polynomial(this.a, this.symbol);
                if (this.dot instanceof Algebra)
                    formula += this.dot.toString(
                        this.dot instanceof Algebra && this.dot.hasMultiTerms()
                    );
                if (this.input && formula !== "0") {
                    if (formula === "1")
                        formula =
                            (parenthesis ? ")" : "") + this.input.toString();
                    else if (formula === "-1")
                        formula =
                            "- " +
                            (parenthesis ? ")" : "") +
                            this.input.toString();
                    else {
                        formula +=
                            (parenthesis ? ")" : "") + this.input.toString();
                    }
                    parenthesis = false;
                }
                if (this.plus) formula += this.join(); // if there's a next term: casscade toString() calls
                break;
            case "frac": {
                if (this.dot instanceof Algebra)
                    formula += this.dot.toString(
                        this.dot instanceof Algebra && this.dot.hasMultiTerms()
                    );
                const numerator = Algebra.polynomial(this.a, this.symbol);
                formula +=
                    numerator !== "0"
                        ? "\\frac{" +
                          numerator +
                          "}{" +
                          Algebra.polynomial(this.b, this.symbol) +
                          "}"
                        : "0";
                if (this.input) formula += this.input.toString();
                if (this.plus) formula += this.join(); // if there's a next term: casscade toString() calls

                break;
            }
            case "sin":
            case "asin":
            case "cos":
            case "tan":
            case "cot": {
                // if (this.a < 0) formula += "(";
                let a0 = this.a;
                if (a0 < 0) {
                    formula += "-";
                    a0 *= -1;
                }
                if (a0 !== 1)
                    if (a0 instanceof Algebra)
                        formula += a0.toString(
                            a0 instanceof Algebra && a0.hasMultiTerms()
                        );
                    else if (a0 instanceof Array)
                        formula += Algebra.polynomial(a0, this.symbol);
                    // FOR TEST
                    else formula += strictPrecisionFormat(a0);
                if (this.a !== 0) {
                    if (this.dot && this.dot instanceof Algebra)
                        formula += this.dot.toString(
                            this.dot instanceof Algebra &&
                                this.dot.hasMultiTerms()
                        );
                    if (this.b !== 0) {
                        formula += this.type;
                        if (this.b instanceof Algebra) {
                            formula += this.b.toString(
                                this.b instanceof Algebra &&
                                    this.b.hasMultiTerms()
                            );
                        } else if (this.b instanceof Array)
                            formula += Algebra.polynomial(this.b, this.symbol);
                        // FOR TEST
                        else {
                            let w0 = this.b;
                            formula += "(";
                            if (w0 < 0) {
                                formula += "-";
                                w0 *= -1;
                            }
                            if (w0 !== 1) formula += strictPrecisionFormat(w0);
                            formula += this.symbol;
                            if (this.teta instanceof Algebra)
                                formula += this.teta.toString();
                            else if (this.teta) {
                                let e0 = this.teta;
                                if (e0 < 0) {
                                    formula += " - ";
                                    e0 *= -1;
                                } else formula += " + ";
                                formula += strictPrecisionFormat(e0);
                            }
                            formula += ")";
                        }
                        if (this.input) formula += this.input.toString();
                    }
                    // simple num
                } else {
                    if (a0 !== 1 || !this.dot)
                        formula += strictPrecisionFormat(this.a);
                }
                // if (this.a < 0) formula += ")";
                if (this.plus) formula += this.join(); // if there's a next term: casscade toString() calls
                break;
            }

            default:
                return null;
        }
        if (parenthesis) formula += ")";

        return formula;
    };
    toArray = () => {
        let x = [];
        const params = ["a", "b", "teta", "symbol", "type"],
            linkers = ["dot", "input", "plus", "previous"];
        for (const [key, value] of Object.entries(this)) {
            if (typeof value !== "function") {
                if (value) {
                    // maximum toArray call happens
                    if (params.filter((p) => p === key).length)
                        x[key] =
                            value instanceof Algebra ? value.toArray() : value;
                    //)((value instanceof StandardInputSignal ? value.copy() : ));
                    else if (linkers.filter((l) => l === key).length)
                        x[key] =
                            value instanceof StandardInputSignal
                                ? value.copy()
                                : value.toArray();
                }
            }
        }
        return x;
    };

    isIntegrator = () => false;
}

export default Algebra;
