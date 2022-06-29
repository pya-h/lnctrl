const u = (t) => (t >= 0 ? 1 : 0);

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

export default LTI;