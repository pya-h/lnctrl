
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


export default ODE;