// import nerdamer from "nerdamer/nerdamer.core.js";
// import "nerdamer/Algebra.js";
// import "nerdamer/Calculus.js";
// import "nerdamer/Solve.js";
// import "nerdamer/Extra.js";
import Algebra from "math/algebra";
import nerdamer from "nerdamer/all.min";
// const nerdamer = require('nerdamer/all.min')
export default class Nerdamer {
    constructor(algebra, symbol = null) {
        if (algebra instanceof Algebra) {
            this.algebra = algebra.copy();
            this.symbol = algebra.symbol;
        } else if (typeof algebra === "string") {
            this.f = algebra;
            this.symbol = symbol;
        }
    }

    df = (against = this.symbol) => nerdamer.diff(this.f, against);

    iL = () => nerdamer(`ilt(${this.f}, ${this.symbol}, t)`) ;
}
