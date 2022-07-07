import { preventBrowserLock } from "toolshed";
import LTI from "./lti";
import ODE from "./ode";

const defaultMathPrecision = 4;
export const RadianToDegree = 180 / Math.PI;

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
export const complexPointify = async (fcomplex, ti, tf, N = 1000) => {
    // returns (x, y) as for x + jy => for complex returning functions like frequency responses
    let dt = (tf - ti) / N; //time step size

    while (dt >= 0.01) {
        N *= 10;
        dt = (tf - ti) / N; //time step size
    }
    const xc = Array(N + 1),
        yc = Array(N + 1);
    for (let ts = ti, i = 0; ts <= tf; ts += dt, i++) {
        const ycomplex = fcomplex(ts);
        if (i % 1000 === 0) await preventBrowserLock();
        xc[i] = ycomplex.real();
        yc[i] = ycomplex.imaginary();
    }

    // for(let i = 0; i < N + 1; i++){
    //     for(let j = i + 1; j < N + 1; j++){
    //         if(xc[j] < xc[i]){
    //             const tx = xc[j], ty = yc[j];
    //             xc[j] = xc[i];
    //             yc[j] = yc[i];
    //             xc[i] = tx;
    //             yc[i] = ty;
    //         }
    //     }
    // }
    return [xc, yc];
};

export const systemToTrace = (
    f,
    in_min,
    in_max,
    thickness,
    legend,
    _3d,
    N = 1000,
    mode = "lines"
) => {
    // in === t, w, x, etc.
    const [x, y] = pointify(f, in_min, in_max, N);
    return {
        x,
        y,
        z: _3d ? Array(x.length).fill(0) : null,
        // color,
        line: {
            // color:'rgb(17, 157, 255)'
            width: thickness,
        },
        type: "scatter" + (_3d ? "3d" : ""),
        mode,
        name: `$$${legend}$$`,
    };
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
    +(Math.round(x + "e" + decimalPrecision) + "e-" + decimalPrecision);

// decimal roof
const droof = (num) => 10 * Math.trunc((num + 10) / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]
// decimal floor
const dfloor = (num) => 10 * Math.trunc(num / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]

export const isDigit = (char) => (char >= "0" && char <= "9") || char === ".";

export const stringToArray = (raw) =>
    raw
        .split(/,| /)
        .filter((el) => el && !isNaN(el))
        .map((el) => +el);

export const isFloat = (x) => x === +x && x !== (x | 0);
export const evaluate = (raw) => {
    // evaluate basic math operations in string
    // when pressing = we can convert the expression to final value
    // const inlineOperators = ['+', '-', '*', '/', '^'];
    // const separators = /\+|-|\*|^|\//;
    const terms = raw.split(/,| /).filter((el) => el && el !== "");
    if (isNaN(terms[0])) return NaN;
    // IMPLEMENT PARENTHESIS AS WELL ************************
    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "^") {
            if (i + 1 < terms.length) {
                terms[i - 1] **= +terms[i + 1];
                terms.splice(i, 2);
            } else terms.splice(i, 1);
        }
    }
    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "*") {
            if (i + 1 < terms.length) {
                terms[i - 1] *= +terms[i + 1];
                terms.splice(i, 2);
            } else terms.splice(i, 1);
        } else if (terms[i] === "/") {
            if (i + 1 < terms.length) {
                terms[i - 1] /= +terms[i + 1];
                terms.splice(i, 2);
            } else terms.splice(i, 1);
        }
    }

    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "+") {
            if (i + 1 < terms.length) {
                terms[i - 1] += +terms[i + 1];
                terms.splice(i, 2);
            } else terms.splice(i, 1);
        } else if (terms[i] === "-") {
            if (i + 1 < terms.length) {
                terms[i - 1] -= +terms[i + 1];
                terms.splice(i, 2);
            } else terms.splice(i, 1);
        }
    }

    if (terms.length === 1) return +terms[0];
    return NaN;
};
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
    systemToTrace,
    RadianToDegree,
};

export default calculus;
