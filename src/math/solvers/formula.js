import Algebra from "math/algebra";
const nerdamer = require("nerdamer/all.min");

export default class Formula {
    constructor(algebra, symbol = null) {
        /// all type of parameters must be converted to an string expressions (f)
        if (algebra instanceof Algebra) {
            this.algebra = algebra.copy();
            this.symbol = algebra.symbol;
        } else if (typeof algebra === "string") {
            this.f = algebra;
            this.symbol = symbol;
        }
    }

    // differentiate function
    df = (against = this.symbol) =>
        new Formula(nerdamer.diff(this.f, against).toString(), this.symbol);

    iL = (timeSymbol = "t") =>
        // inverse laplace transform
        new Formula(
            nerdamer(
                `ilt(${this.f}, ${this.symbol}, ${timeSymbol})`
            ).toString(),
            timeSymbol
        );
        
    L = (frequencySymbol = "s") =>
        // laplace
        new Formula(
            nerdamer(
                `laplace(${this.f}, ${this.symbol}, ${frequencySymbol})`
            ).toString(),
            frequencySymbol
        );

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
    x = () =>
        // nerdamer.solveEquations(this.f, this.symbol);
        nerdamer(this.f).solveFor(this.symbol);
}
