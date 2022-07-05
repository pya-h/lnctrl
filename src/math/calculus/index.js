import LTI from "./lti";
import ODE from "./ode";
import theorems from "./theorems";

const defaultMathPrecision = 4;

export const precision = {
    get: () => localStorage.getItem("precision") || defaultMathPrecision, // digits allowed after dcimal point (private)
    set: (newPrecision) => {
        if (newPrecision > 0 && Math.floor(newPrecision) === newPrecision) {
            localStorage.setItem("precision", newPrecision);
        }
    },
};

const pointify = (f, ti, tf, N = 1000) => {
    // construct two arrays consisting inputs (t) and outputs[f(t)] of the function: f
    let dt = (tf - ti) / N; //time step size
    while (dt >= 1) {
        N *= 10;
        dt = (tf - ti) / N; //time step size
    }
    const ts = Array.from(Array(N + 1), (_, k) => k * dt + ti);
    const ys = ts.map((t) => f(t));
    return [ts, ys];
};
export const complexPointify = (fcomplex, ti, tf, N = 1000) => {
    // returns (x, y) as for x + jy => for complex returning functions like frequency responses
    let dt = (tf - ti) / N; //time step size
    while (dt >= 1) {
        N *= 10;
        dt = (tf - ti) / N; //time step size
    }
    const xc = Array(N + 1), yc = Array(N + 1);
    for(let ts = ti, i = 0; ts <= tf; ts += dt, i++){
        const ycomplex = fcomplex(ts);
        xc[i] = ycomplex.real();
        yc[i] = ycomplex.imaginary();
    }
    return [xc, yc];
};

export const strictPrecisionFormat = (num) => {
    if (num) {
        // num != 0
        const strNum = num.toFixed(precision.get());
        let reduntantZereos = 0,
            i = 0;
        for (
            i = strNum.length - 1;
            i >= 0 && strNum[i] === "0";
            i--, reduntantZereos++
        );
        if (strNum[i] === ".") reduntantZereos++;
        return (
            (reduntantZereos > 0
                ? strNum.slice(0, -reduntantZereos)
                : strNum) || "0"
        );
    }
    return "0";
};
const linspace = (min, max, step) => {
    const ins = [];
    for (let i = min; i <= max; i += step) ins.push(i.toFixed(precision.get()));
    return ins;
};

export const round = (x, decimalPrecision = precision.get()) =>
    Number(Math.round(x + "e" + decimalPrecision) + "e-" + decimalPrecision);

// decimal roof
const droof = (num) => 10 * Math.trunc((num + 10) / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]
// decimal floor
const dfloor = (num) => 10 * Math.trunc(num / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]

export const isDigit = (char) => (char >= "0" && char <= "9") || char === ".";

export const stringToArray = (raw) =>
    raw
        .split(/,| /)
        .filter((el) => el && !isNaN(el))
        .map((el) => Number(el));

export const isFloat = x => x === +x && x !== (x|0);
export const evaluate = (raw) => {
    // evaluate basic math operations in string
    // when pressing = we can convert the expression to final value
    // const inlineOperators = ['+', '-', '*', '/', '^'];
    // const separators = /\+|-|\*|^|\//;           
    const terms = raw.split(/,| /).filter((el) => el && el !== "");
    if(isNaN(terms[0]))
        return NaN;
    // IMPLEMENT PARENTHESIS AS WELL ************************
    for(let i = 0; i < terms.length; i++){
        if(terms[i] === '^'){
            if(i + 1 < terms.length){
                terms[i - 1] **= Number(terms[i + 1]);
                terms.splice(i, 2);
            }
            else
                terms.splice(i, 1);
        }
    }
    for(let i = 0; i < terms.length; i++){
        if(terms[i] === '*'){
            if(i + 1 < terms.length){
                terms[i - 1] *= Number(terms[i + 1]);
                terms.splice(i, 2);
            }
            else
                terms.splice(i, 1);
        }
        else if(terms[i] === '/'){
            if(i + 1 < terms.length){
                terms[i - 1] /= Number(terms[i + 1]);
                terms.splice(i, 2);
            }
            else
                terms.splice(i, 1);
        }
    }

    for(let i = 0; i < terms.length; i++){
        if(terms[i] === '+'){
            if(i + 1 < terms.length){
                terms[i - 1] += Number(terms[i + 1]);
                terms.splice(i, 2);
            }
            else
                terms.splice(i, 1);
        }
        else if(terms[i] === '-'){
            if(i + 1 < terms.length){
                terms[i - 1] -= Number(terms[i + 1]);
                terms.splice(i, 2);
            }
            else
                terms.splice(i, 1);
        }
    }
    
    if(terms.length === 1)
        return Number(terms[0]);
    return NaN;
}
const calculus = {
    ODE,
    LTI,
    precision,
    round,
    isFloat,
    pointify,
    complexPointify,
    strictPrecisionFormat,
    linspace,
    droof,
    dfloor,
    isDigit,
    stringToArray,
    evaluate,
    theorems,
};

export default calculus;
