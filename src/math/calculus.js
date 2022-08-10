const defaultMathPrecision = 4;

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

const u = (t) => (t >= 0 ? 1 : 0);

const strictPrecisionFormat = (num) => {
    if (num) {
        // num != 0
        const strNum = num.toFixed(precision.get());
        let reduntantZereos = 0;
        for (
            let i = strNum.length - 1;
            i >= 0 && (strNum[i] === "0" || strNum[i] === ".");
            i--, reduntantZereos++
        );
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

const round = (x, decimalPrecision = precision.get()) =>
    Number(Math.round(x + "e" + decimalPrecision) + "e-" + decimalPrecision);

// decimal roof
const droof = (num) => 10 * Math.trunc((num + 10) / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]
// decimal floor
const dfloor = (num) => 10 * Math.trunc(num / 10); // number: abcd => [floor] abc0 < abcd < ab(c+1)0 [roof]

const isDigit = (char) => (char >= "0" && char <= "9") || char === ".";

const ODE = {
    euiler: (order, ti, tf, { y0, dy_dt0, fyt, output }, N = 1000) => {
        // euiler for 2nd order differential equations
        // next two lines are necessary for preventing str/number mistaken bugs

        let dt = (tf - ti) / N; //time step size
        while (dt >= 1) {
            N *= 10;
            dt = (tf - ti) / N; //time step size
        }
        const ts = Array.from(Array(N + 1), (_, k) => k * dt + ti);
        const ys = Array(N + 1).fill(0); //empty array for the results
        ys[0] = y0; //initial conditions

        if (order === 1) {
            // ode first order
            for (let i = 0; i < N; i++)
                ys[i + 1] = ys[i] + dt * fyt(ts[i], ys[i]);
        } else if (order === 2) {
            // ode second order
            const dy_dt = Array(N + 1).fill(0); //empty array for the results
            dy_dt[0] = dy_dt0; //initial conditions

            for (let i = 0; i < N; i++) {
                ys[i + 1] = ys[i] + dt * dy_dt[i];
                dy_dt[i + 1] = dy_dt[i] + dt * fyt(ts[i], ys[i], dy_dt[i]);
            }

            if (output) {
                const out = output.toLowerCase();
                if (out === "dy") return [ts, dy_dt];
                else if (out === "d2y") return [ts, ys, dy_dt];
            }
        }
        // else
        return [ts, ys];
    },

    cc1ode: (a, b, c, y0) => {
        // Constant Coeficient First Order Differential Equation
        // a(dy/dt) + by = c
        const k = y0 - c / b;
        const y = (t) => c / b + k * Math.exp((-t * b) / a);
        return y;
    },
    rungeKutta: (x0, y0, x, h, fxy) => {
        // Count number of iterations
        // using step size or
        // step height h
        let n = (x - x0) / h;

        let k1, k2;

        // Iterate for number of iterations
        let y = y0;
        for (let i = 1; i <= n; i++) {
            // Apply Runge Kutta Formulas
            // to find next value of y
            k1 = h * fxy(x0, y);
            k2 = h * fxy(x0 + 0.5 * h, y + 0.5 * k1);

            // Update next value of y
            y = y + (1.0 / 6.0) * (k1 + 2 * k2);

            // Update next value of x
            x0 = x0 + h;
        }

        return y;
    },
};

const LTI = {
    u,
    step: (order, num, den) => {
        if (order === 1) {
            // f(s) = k / (s + a)

            if (den !== 0)
                return (t) => u(t) * (num / den) * (1 - Math.exp(-den * t));
            // if a = 0
            return (t) => u(t) * t;
        }
    },

    ramp: (order, num, den) => {
        if (order === 1) {
            // f(s) = k / (s + a)

            if (den !== 0)
                return (t) =>
                    u(t) *
                    ((num / den) * t +
                        (num / (den * den)) * (Math.exp(-den * t) - 1));
            // if a = 0
            return (t) => u(t) * t * t;
        }
    },
};

const middlePointTheorem = (
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

module.exports = {
    ODE,
    LTI,
    precision,
    round,
    pointify,
    strictPrecisionFormat,
    linspace,
    droof,
    dfloor,
    isDigit,
    middlePointTheorem,
};

// const strictPrecisionFormat = (num) => {
//     // strictly format a number preventing it to conatin extra digits, like extra meaningless decimals caused in round function
//     // objective: remove meaningless zeros in number formatting
//     //remove precisions that does not contain meaningless zeros
//     const decimalPrecision = precision.get(); // 10 ^ p
//     let temp = num >= 0 ? num * 10 : num * -10;
//     let nextDecimal = temp % 10; //decimal digits
//     for (
//         var actualPrecision = 0;
//         actualPrecision < decimalPrecision && nextDecimal;
//         actualPrecision++, temp *= 10, nextDecimal = temp % 10
//     );
//     return num.toFixed(actualPrecision);
// };
