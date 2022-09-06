import Algebra from "math/algebra";
import Complex from "math/algebra/complex";
import { makeProgress } from "toolshed";
import LTI from "./lti";
import ODE from "./ode";

const defaultMathPrecision = 4;
const RadianToDegree = 180 / Math.PI;
const DegreeToRadian = Math.PI / 180;

const precision = {
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

export const pointifyAsync = async (
    f,
    ti,
    tf,
    progressBar,
    progressStep = 500,
    N = 1000
) => {
    // construct two arrays consisting inputs (t) and outputs[f(t)] of the function: f
    let dt = (tf - ti) / N; //time step size
    while (dt >= 1) {
        N *= 10;
        dt = (tf - ti) / N; //time step size
    }
    const ts = Array.from(Array(N + 1), (_, k) => k * dt + ti);
    const ys = Array(N + 1);
    for (let i = 0; i <= N; i++) {
        if (progressBar) {
            if (i % progressStep === 0)
                await makeProgress(progressBar, (100 * i) / N);
        }
        ys[i] = f(ts[i]);
    }
    return [ts, ys];
};

const verticalLine = (at, xi, xf, N) => {
    let dx = (xf - xi) / N;
    while (dx >= 1) {
        N *= 10;
        dx = (xf - xi) / N;
    }
    const xs = Array(N + 1);
    const ys = Array(N + 1);
    xs[0] = at;
    ys[0] = xi;
    for (let i = 1; i <= N; i++) {
        xs[i] = at;
        ys[i] = ys[i - 1] + dx;
    }
    return [xs, ys];
};
export const complexPointify = async (
    fcomplex,
    ti,
    tf,
    requiresRectifying,
    N,
    progressBar
) => {
    // returns (x, y) as for x + jy => for complex returning functions like frequency responses
    let dt = (tf - ti) / N; //time step size
    const plotlyLinkToOriginError = 0.0001;
    while (dt >= 1) {
        N *= 10;
        dt = (tf - ti) / N; //time step size
    }
    const xc = Array(N + 1),
        yc = Array(N + 1);
    // let previousRamp = 1;
    // let roadToInfinityPoint = -1;
    for (let ts = ti, i = 0; ts <= tf; ts += dt, i++) {
        const ycomplex = fcomplex(ts);
        if (N >= 10000 && progressBar) {
            if (i % 5000 === 0) await makeProgress(progressBar, (100 * i) / N);
        }
        xc[i] = ycomplex.real();
        yc[i] = ycomplex.imaginary();

        // these below lines are for making plotly remove link to origin lines:
        if (requiresRectifying) {
            if (
                (yc[i] < plotlyLinkToOriginError &&
                    yc[i] > -plotlyLinkToOriginError) ||
                (xc[i] < plotlyLinkToOriginError &&
                    xc[i] > -plotlyLinkToOriginError)
            ) {
                delete xc[i];
                delete yc[i];
            }
        }
    }
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

export const arrayToTrace = (x, y, thickness, legend, _3d, mode = "lines") => {
    return {
        x,
        y,
        z: _3d ? Array(x.length).fill(0) : null,
        line: {
            // color:'rgb(17, 157, 255)'
            width: thickness,
        },
        type: "scatter" + (_3d ? "3d" : ""),
        mode,
        name: `$$${legend}$$`,
    };
};

const mCircle = (M, x_i, x_f, iterations) => {
    const m2 = M ** 2;
    const m2minus1 = m2 - 1;
    const temp = m2 / m2minus1;
    let x = [],
        y = [];
    if (m2 !== 1) {
        const f = (x) => (temp / m2minus1 - (x + temp) ** 2) ** 0.5;
        [x, y] = pointify(f, x_i, x_f, +iterations);
    } else {
        [x, y] = verticalLine(-0.5, x_i, x_f, iterations);
    }
    return [x, y];
};

const nCircle = (N, x_i, x_f, iterations) => {
    const iN = Math.abs(1 / N);
    while (x_i > -iN) x_i -= iN;
    while (x_f < iN) x_f += iN;

    const i2n = 1 / (2 * N);
    const n2 = N * N;
    // const f = (x) => (0.25 + i2n / N - x - (x ** 2)) ** 0.5;
    const f = (x) => ((n2 + 1) / (2 * n2) - (x + 0.5) ** 2) ** 0.5;

    let [x, y] = pointify(f, x_i, x_f, +iterations);

    return [
        [...x, ...x],
        [...y.map((yi) => i2n + yi), ...y.map((yi) => i2n - yi)],
    ];
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

const isFloat = (x) => x === +x && x !== (x | 0);
const evaluate = (raw) => {
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

export const min = (nums) => {
    let value = nums[0],
        index = 0;
    for (let i = 1; i < nums.length; i++) {
        let nActual = nums[i];
        if (nActual instanceof Complex) {
            if (typeof nActual.actual() !== "number")
                return { index: NaN, value: NaN };
            nActual = nActual.actual();
        } else if (nActual instanceof Algebra) {
            // check better
            return { index: NaN, value: NaN };
        }
        if (nActual < value) {
            value = nActual;
            index = i;
        }
    }
    return { index, value };
};

export const max = (nums) => {
    let value = nums[0],
        index = 0;
    for (let i = 1; i < nums.length; i++) {
        let nActual = nums[i];
        if (nActual instanceof Complex) {
            if (typeof nActual.actual() !== "number")
                return { index: NaN, value: NaN };
            nActual = nActual.actual();
        } else if (nActual instanceof Algebra) {
            // check better
            return { index: NaN, value: NaN };
        }
        if (nActual > value) {
            value = nActual;
            index = i;
        }
    }
    return { index, value };
};

export const randomize = (max, min = 0) =>
    Math.floor(Math.random() * max - min + 1);

const tan = (angle, unit = null) =>
    Math.tan(
        unit && unit.toLowerCase() === "rad" ? angle : angle * DegreeToRadian
    );
const cot = (angle, unit = null) => 1 / tan(angle, unit);
const sin = (angle, unit = null) =>
    Math.sin(
        unit && unit.toLowerCase() === "rad" ? angle : angle * DegreeToRadian
    );
const cos = (angle, unit = null) =>
    Math.cos(
        unit && unit.toLowerCase() === "rad" ? angle : angle * DegreeToRadian
    );

export const addArrays = (arr1, arr2) => {
    if (arr1 === +arr1 && arr2 === +arr2)
        // both numbers
        return arr1 + arr2;

    let first, second;
    if ((arr1.length || 0) >= (arr2.length || 0)) {
        first = [...arr1];
        second = arr2;
    } else {
        first = [...arr2];
        second = arr1;
    }

    const lastItem = first.length - 1;
    if (second instanceof Array) {
        for (let i = 1; i <= second.length; i++) {
            // second.length always is < first.length
            const f = first.length - i,
                s = second.length - i;
            if (first[f] === +first[f] && second[s] === +second[s])
                first[f] += second[second.length - i];
            else if (first[f] instanceof Algebra)
                first[f] = first[f].add(second[s]);
            else first[f] = second[s].add(first[f]);
        }
    } else if (second instanceof Algebra)
        first[lastItem] = second.add(first[lastItem]);
    else {
        if (first[lastItem] instanceof Algebra)
            first[lastItem] = first[lastItem].add(second);
        else first[lastItem] += second;
    }

    return first;
};

export const sum = (list) => {
    const { Zero } = require("../algebra/functions");
    let s;
    if (list.filter((x) => +x !== x).length) {
        s = new Zero();
        for (const item of list) s = s.add(item);
    } else {
        s = 0;
        for (const item of list) s += item;
    }
    return s;
};
const calculus = {
    ODE,
    LTI,
    precision,
    round,
    isFloat,
    pointify,
    verticalLine,
    complexPointify,
    strictPrecisionFormat,
    linspace,
    droof,
    dfloor,
    isDigit,
    stringToArray,
    arrayToTrace,
    evaluate,
    systemToTrace,
    RadianToDegree,
    DegreeToRadian,
    mCircle,
    nCircle,
    pointifyAsync,
    min,
    max,
    randomize,
    sin,
    cos,
    tan,
    cot,
    sum,
    addArrays,
};

export default calculus;
