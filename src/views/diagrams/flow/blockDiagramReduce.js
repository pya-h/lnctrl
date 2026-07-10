// Reduces a group of block-diagram elements to a single equivalent transfer
// function using Mason's gain formula, which subsumes the series, parallel and
// feedback rules taught in the block-diagram-algebra chapter.

const IN = "__IN__";

const SUBS = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
const tex = (label) => label.replace(/[₀-₉]+/g, (run) => `_{${[...run].map((c) => SUBS[c]).join("")}}`);

const inputsOf = (data) =>
    data.inputs || (data.signs || ["+", "−"]).map((s, i) => ({ id: `in${i + 1}`, sign: s }));

const sumSign = (node, handle) => {
    const inputs = inputsOf(node.data);
    const inp = inputs.find((i) => i.id === handle) || inputs[0];
    return inp && inp.sign === "−" ? -1 : 1;
};

// a branch gain is set by the block the edge feeds into
const edgeTerm = (edge, byId) => {
    const t = byId[edge.target];
    if (t.type === "tf" || t.type === "gain") return { coef: 1, factors: [t.data.label] };
    if (t.type === "sum") return { coef: sumSign(t, edge.targetHandle), factors: [] };
    return { coef: 1, factors: [] };
};

const mulTerm = (a, b) => ({ coef: a.coef * b.coef, factors: [...a.factors, ...b.factors] });
const ONE = { coef: 1, factors: [] };

const combine = (terms) => {
    const map = new Map();
    terms.forEach((t) => {
        const key = [...t.factors].sort().join("*");
        const cur = map.get(key);
        if (cur) cur.coef += t.coef;
        else map.set(key, { coef: t.coef, factors: [...t.factors].sort() });
    });
    return [...map.values()].filter((t) => t.coef !== 0);
};
const mulPolys = (p, q) => combine(p.flatMap((a) => q.map((b) => mulTerm(a, b))));

const disjoint = (a, b) => ![...a].some((x) => b.has(x));

const forwardPaths = (adj, from, to) => {
    const out = [];
    const walk = (node, visited, term, touched) => {
        if (node === to) return out.push({ term, nodes: touched });
        (adj[node] || []).forEach((br) => {
            if (!visited.has(br.to))
                walk(br.to, new Set([...visited, br.to]), mulTerm(term, br.term), new Set([...touched, br.to]));
        });
        return undefined;
    };
    walk(from, new Set([from]), ONE, new Set([from]));
    return out;
};

// every simple loop, each anchored at its lowest-order node so it is found once
const findLoops = (adj, graphNodes, order) => {
    const loops = [];
    const seen = new Set();
    graphNodes.forEach((start) => {
        const walk = (node, visited, term, touched) => {
            (adj[node] || []).forEach((br) => {
                if (br.to === start) {
                    const key = [...touched].sort().join(",");
                    if (!seen.has(key)) {
                        seen.add(key);
                        loops.push({ term: mulTerm(term, br.term), nodes: new Set(touched) });
                    }
                } else if (!visited.has(br.to) && order[br.to] > order[start]) {
                    walk(br.to, new Set([...visited, br.to]), mulTerm(term, br.term), new Set([...touched, br.to]));
                }
            });
        };
        walk(start, new Set([start]), ONE, new Set([start]));
    });
    return loops;
};

// subsets of pairwise non-touching loops (indices), empty subset included
const nonTouching = (loops) => {
    const res = [[]];
    const rec = (start, current, used) => {
        for (let i = start; i < loops.length; i++) {
            if (disjoint(loops[i].nodes, used)) {
                const next = current.concat(i);
                res.push(next);
                rec(i + 1, next, new Set([...used, ...loops[i].nodes]));
            }
        }
    };
    rec(0, [], new Set());
    return res;
};

// Δ = 1 − ΣLᵢ + Σ(non-touching pairs) − …
const determinant = (loops) => {
    let poly = [ONE];
    nonTouching(loops).forEach((subset) => {
        if (!subset.length) return;
        let prod = ONE;
        subset.forEach((i) => (prod = mulTerm(prod, loops[i].term)));
        const sign = subset.length % 2 ? -1 : 1;
        poly = poly.concat({ coef: sign * prod.coef, factors: prod.factors });
    });
    return combine(poly);
};

const factorsToLatex = (factors) => {
    const counts = {};
    factors.forEach((f) => (counts[f] = (counts[f] || 0) + 1));
    return Object.keys(counts)
        .map((f) => (counts[f] > 1 ? `${tex(f)}^{${counts[f]}}` : tex(f)))
        .join(" \\cdot ");
};

const polyToLatex = (poly) => {
    if (!poly.length) return "0";
    return poly
        .map((t, i) => {
            const body = factorsToLatex(t.factors);
            const mag = Math.abs(t.coef);
            const piece = body ? `${mag === 1 ? "" : mag}${body}` : `${mag}`;
            if (i === 0) return t.coef < 0 ? `-${piece}` : piece;
            return `${t.coef < 0 ? " - " : " + "}${piece}`;
        })
        .join("");
};

const mathBlock = (lines) =>
    lines.length > 1
        ? `$$ \\begin{gathered} ${lines.join(" \\\\ ")} \\end{gathered} $$`
        : `$$ ${lines[0]} $$`;

const fail = (reason) => ({ ok: false, reason });

export const computeEquivalent = (groupNodes, allEdges) => {
    const nodes = groupNodes.filter((n) => n.type !== "group");
    if (!nodes.length) return fail("The group has no elements to reduce.");

    const ids = new Set(nodes.map((n) => n.id));
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const internal = allEdges.filter((e) => ids.has(e.source) && ids.has(e.target));
    const inbound = allEdges.filter((e) => !ids.has(e.source) && ids.has(e.target));
    const outbound = allEdges.filter((e) => ids.has(e.source) && !ids.has(e.target));
    const ioIn = nodes.filter((n) => n.type === "io" && n.data.kind === "input");
    const ioOut = nodes.filter((n) => n.type === "io" && n.data.kind === "output");

    let inNode;
    let virtualIn = null;
    if (ioIn.length === 1 && !inbound.length) inNode = ioIn[0].id;
    else if (!ioIn.length && inbound.length === 1) {
        [virtualIn] = inbound;
        inNode = IN;
    } else return fail("The selection must have exactly one input signal.");

    let outNode;
    if (ioOut.length === 1 && !outbound.length) outNode = ioOut[0].id;
    else if (!ioOut.length && outbound.length) {
        const srcs = new Set(outbound.map((e) => e.source));
        if (srcs.size !== 1) return fail("The selection must have exactly one output signal.");
        [outNode] = srcs;
    } else return fail("The selection must have exactly one output signal.");

    if (inNode === outNode) return fail("Input and output resolve to the same point.");

    const adj = {};
    const push = (from, to, term) => (adj[from] = adj[from] || []).push({ from, to, term });
    if (virtualIn) push(IN, virtualIn.target, edgeTerm(virtualIn, byId));
    internal.forEach((e) => push(e.source, e.target, edgeTerm(e, byId)));

    const graphNodes = [...ids, ...(virtualIn ? [IN] : [])];
    const order = Object.fromEntries(graphNodes.map((n, i) => [n, i]));

    const paths = forwardPaths(adj, inNode, outNode);
    if (!paths.length) return fail("No signal path connects the input to the output.");

    const loops = findLoops(adj, graphNodes, order);
    const den = determinant(loops);
    const numerator = combine(
        paths.flatMap((p) => {
            const untouched = loops.filter((l) => disjoint(l.nodes, p.nodes));
            return mulPolys([p.term], determinant(untouched));
        })
    );

    const denIsOne = den.length === 1 && !den[0].factors.length && den[0].coef === 1;
    const numLatex = polyToLatex(numerator);
    const final = denIsOne ? numLatex : `\\dfrac{${numLatex}}{${polyToLatex(den)}}`;

    const steps = [
        {
            title: `Forward path${paths.length > 1 ? "s" : ""}`,
            latex: mathBlock(paths.map((p, i) => `P_{${i + 1}} = ${polyToLatex([p.term])}`)),
        },
        {
            title: `Loop${loops.length === 1 ? "" : "s"}`,
            latex: loops.length
                ? mathBlock(loops.map((l, i) => `L_{${i + 1}} = ${polyToLatex([l.term])}`))
                : "$$ \\text{no feedback loops} $$",
        },
        { title: "Characteristic  Δ", latex: `$$ \\Delta = ${polyToLatex(den)} $$` },
        { title: "Equivalent transfer function", latex: `$$ T(s) = ${final} $$` },
    ];

    return { ok: true, steps, final };
};
