import Poly from "./poly";

export default class Zero extends Poly {
    constructor(params = {}) {
        // ke^ct
        super([0], null, {...params} );
    }

    degree = () => 0;

    valueAt = (t) => 0;

    toString = () => {
        let str = "0";
        if (this.plus) str = this.plus.toString();

        return str;
    };
    devide = (operand) => new Zero();

    add = (operand) => operand.hardcopy().linkPlus(this.plus);

    multiply = (operand) => new Zero();

    replace = (operand) => {
        this.a = operand.getA();
        this.b = operand.getB();
        this.teta = operand.getTeta();
        this.symbol = operand.getSymbol();
        this.type = operand.getType();
        this.dot = operand.dot.copy();
    };
}
