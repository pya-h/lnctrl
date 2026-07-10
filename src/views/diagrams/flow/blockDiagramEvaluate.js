// Turns the symbolic reduction (numerator / denominator term-lists over block
// labels) into a concrete transfer function once the user supplies each block's
// numerator/denominator and each gain's value. Polynomials are highest-degree
// first, matching the TransferFunction class used for the final display.

import TransferFunction from "math/algebra/functions/fraction";
import Algebra from "math/algebra";

const polyAdd = (p, q) => {
    const n = Math.max(p.length, q.length);
    const out = Array(n).fill(0);
    for (let i = 0; i < p.length; i++) out[n - p.length + i] += p[i];
    for (let i = 0; i < q.length; i++) out[n - q.length + i] += q[i];
    return out;
};
const polyMul = (p, q) => {
    const out = Array(p.length + q.length - 1).fill(0);
    for (let i = 0; i < p.length; i++)
        for (let j = 0; j < q.length; j++) out[i + j] += p[i] * q[j];
    return out;
};
const trimLead = (p) => {
    let i = 0;
    while (i < p.length - 1 && Math.abs(p[i]) < 1e-12) i++;
    return p.slice(i);
};

// a rational function carried as {num, den} coefficient arrays
const fracMul = (a, b) => ({ num: polyMul(a.num, b.num), den: polyMul(a.den, b.den) });
const fracAdd = (a, b) => ({
    num: polyAdd(polyMul(a.num, b.den), polyMul(b.num, a.den)),
    den: polyMul(a.den, b.den),
});

// Σ over terms of  coef · ∏ factor-fractions
const evalPoly = (terms, tfMap) =>
    terms.reduce(
        (acc, t) =>
            fracAdd(
                acc,
                t.factors.reduce((f, name) => fracMul(f, tfMap[name]), {
                    num: [t.coef],
                    den: [1],
                })
            ),
        { num: [0], den: [1] }
    );

const round = (x) => Math.round(x * 1e6) / 1e6;

// numerator/denominator: symbolic term-lists from computeEquivalent
// tfMap: label → { num:[...], den:[...] } coefficient arrays
export const evaluateEquivalent = (numerator, denominator, tfMap) => {
    const N = evalPoly(numerator, tfMap);
    const D = evalPoly(denominator, tfMap);
    // T = N / D with N and D themselves fractions, so cross-multiply
    const num = trimLead(polyMul(N.num, D.den)).map(round);
    const den = trimLead(polyMul(N.den, D.num)).map(round);
    if (!den.length || den.every((c) => c === 0)) return null;
    let latex;
    try {
        latex = new TransferFunction([...num], [...den], "s").toString();
    } catch (e) {
        latex = `\\frac{${Algebra.polynomial(num, "s")}}{${Algebra.polynomial(den, "s")}}`;
    }
    return { num, den, latex };
};
