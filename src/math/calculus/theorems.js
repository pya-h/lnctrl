import { precision, round } from "math/calculus";
const middlePoint = (
    f,
    boundary = 1000,
    decimalPrecision = precision.get()
) => {
    // NOTE: works fine for some equations
    // and wronge for some others like:  x ** 2 - 4*x  - 5
    boundary = Math.abs(boundary);
    const expectedRate = 10 ** -decimalPrecision;
    const poles = [];
    let xa = 0,
        xb = 1;
    for (let i = 0; i < boundary; i++) {
        xa = -boundary + i;
        xb = boundary - i;

        let rate = (xb - xa) / (2 * Math.max(Math.abs(xa), Math.abs(xb)));
        let p = null;
        while (rate >= expectedRate) {
            p = (xa + xb) / 2;
            if (!f(p)) break;
            else if (f(p) * f(xa) < 0) xb = p;
            else {
                xa = p;
                rate = (xb - xa) / (2 * Math.max(Math.abs(xa), Math.abs(xb)));
            }
        }
        if (!f(p)) poles.push(round(p));
    }
    return new Set(poles);
};

const theorems = {middlePoint};

export default theorems;