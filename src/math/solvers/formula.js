import Algebra from "math/algebra";
import { isDigit } from "math/calculus";
import Complex from "math/algebra/complex";
const nerdamer = require("nerdamer/all.min");

export default class Formula {
    constructor(mathPhrase, symbol = null, expressions = null) {
        /// all type of parameters must be converted to an string mathPhrases (f)
        if (mathPhrase instanceof Algebra) {
            this.f = mathPhrase.toFormula();
            this.symbol = mathPhrase.symbol;
        } else if (typeof mathPhrase === "string") {
            this.f = mathPhrase;
            this.symbol = symbol;
        }
        this.expressions = expressions ? expressions : nerdamer(this.f); // normally its the nerdamer expressions
    }

    // differentiate function
    df = (against = this.symbol) => {
        const expressions = nerdamer.diff(this.f, against);
        return new Formula(expressions.toString(), this.symbol, expressions);
    };
    iL = (timeSymbol = "t") => {
        // inverse laplace transform
        const expressions = nerdamer(
            `ilt(${this.f}, ${this.symbol}, ${timeSymbol})`
        );
        return new Formula(expressions.toString(), timeSymbol, expressions);
    };

    L = (frequencySymbol = "s") => {
        // laplace
        const expressions = nerdamer(
            `laplace(${this.f}, ${this.symbol}, ${frequencySymbol})`
        );
        return new Formula(
            expressions.toString(),
            frequencySymbol,
            expressions
        );
    };

    $ = (t = undefined) => {
        // returns the containing f as a normal funtion or single value in a certain point
        // get value at certain point
        const knownVariables = [];
        knownVariables[this.symbol] = t;
        return t
            ? nerdamer(this.f, { ...knownVariables })
                  .evaluate()
                  .toDecimal()
            : nerdamer(this.f).toDecimal();
    };

    // solve equations
    x = () => {
        // nerdamer.solveEquations(this.f, this.symbol);

        let roots = nerdamer(this.f)
            .solveFor(this.symbol)
            .map((ri) =>
                (!ri.toString().includes("sqrt")
                    ? ri
                    : ri.evaluate()
                ).toDecimal()
            );
        //roots = roots.split(",").filter((ri) => ri && ri !== ""); // now x is converted from a string to the array of x answers (as +s);
        // edit string to array
        return roots.map((ri, i) => {
            // let [real, image] = ri.split(/\+|-/).filter((ri) => ri && ri !== "");
            let separatorIndex = 1;
            for (; separatorIndex < ri.length; separatorIndex++)
                if (
                    (ri[separatorIndex] === "+" ||
                        ri[separatorIndex] === "-") &&
                    (isDigit(ri[separatorIndex - 1]) ||
                        ri[separatorIndex - 1] === "i") &&
                    (isDigit(ri[separatorIndex + 1]) ||
                        ri[separatorIndex + 1] === "i")
                )
                    break;

            let terms = [];
            terms.push(ri.slice(0, separatorIndex));
            if (separatorIndex < ri.length)
                terms.push(ri.slice(separatorIndex, ri.length));

            if (terms.length === 1) {
                const magnitude = terms[0].replace("*i", "").replace("i", "1");
                return magnitude === terms[0]
                    ? new Complex(+magnitude)
                    : new Complex(0, +magnitude);
            } else {
                let b = terms[1].replace("*i", "").replace("i", "1");
                if (b !== terms[1]) return new Complex(+terms[0], +b);
                // if not, means the first term was image
                b = terms[0].replace("*i", "").replace("i", "1");
                return new Complex(+terms[1], +b);
            }
        });
    };
    toString = () => nerdamer(this.f).toTeX();

    toAlgebra = () => {
        if (this.expressions instanceof Algebra) return this.expressions.copy();
    };
    static GetTerm = (termDegree, coef, symbol) => {
        if (coef === +coef) {
            // means that coef is not a string
            const symbolicPart =
                termDegree > 0 ? `*${symbol}^${termDegree}` : "";
            return (coef >= 0 ? "+" : "") + `${coef}${symbolicPart}`;
        }
        // here it means coef is a string like '11/2' or '1/4', ...
        return `${coef}${symbol}^${termDegree}`;
    };

    static RepetitiveFactors = (f, roots, symbol) => {
        const fullRoots = [...roots];
        for (const root of roots) {
            const knowns = [];
            knowns[symbol] = root.toString(false, true).replace("j", "i*");
            for (
                let fi = nerdamer.diff(f);
                !+nerdamer(fi, {...knowns}).toDecimal();
                fullRoots.push(root.copy()), fi = nerdamer.diff(fi)
            );
        }
        return fullRoots;
    };
}
