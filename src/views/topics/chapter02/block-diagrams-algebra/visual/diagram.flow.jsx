// Step-by-step block-diagram reduction for the block-diagram-algebra lecture,
// expressed as React Flow diagrams (nodes + edges). Mirrors diagram.formulas:
//   F1 = G1 + H1                     (parallel)
//   F2 = G2 / (1 - G2 H2)            (positive feedback)
//   G  = F1 * F2                     (series)
//   F  = 1 / G                       (inverse)

// STEP 0 — full diagram: (G1 ∥ H1) then G2 with H2 feedback
const step0 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 150 }, data: { label: "R(s)", kind: "input" } },
        { id: "tp1", type: "takeoff", position: { x: 96, y: 156 }, data: {} },
        { id: "g1", type: "tf", position: { x: 180, y: 70 }, data: { label: "G₁(s)" } },
        { id: "h1", type: "tf", position: { x: 180, y: 222 }, data: { label: "H₁(s)" } },
        { id: "s1", type: "sum", position: { x: 344, y: 150 }, data: { signs: ["+", "+"] } },
        { id: "s2", type: "sum", position: { x: 448, y: 150 }, data: { signs: ["+", "+"] } },
        { id: "g2", type: "tf", position: { x: 548, y: 132 }, data: { label: "G₂(s)" } },
        { id: "tp2", type: "takeoff", position: { x: 700, y: 156 }, data: {} },
        { id: "out", type: "io", position: { x: 782, y: 150 }, data: { label: "C(s)", kind: "output" } },
        { id: "h2", type: "tf", position: { x: 508, y: 300 }, data: { label: "H₂(s)", flow: "rtl" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "tp1" },
        { id: "e2", source: "tp1", sourceHandle: "out", target: "g1" },
        { id: "e3", source: "tp1", sourceHandle: "down", target: "h1" },
        { id: "e4", source: "g1", target: "s1", targetHandle: "in1" },
        { id: "e5", source: "h1", target: "s1", targetHandle: "in2" },
        { id: "e6", source: "s1", target: "s2", targetHandle: "in1", label: "F₁(s)" },
        { id: "e7", source: "s2", target: "g2" },
        { id: "e8", source: "g2", target: "tp2" },
        { id: "e9", source: "tp2", sourceHandle: "out", target: "out", label: "C(s)" },
        { id: "e10", source: "tp2", sourceHandle: "down", target: "h2" },
        { id: "e11", source: "h2", target: "s2", targetHandle: "in2" },
    ],
};

// STEP 1 — parallel branch collapsed into F1
const step1 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 150 }, data: { label: "R(s)", kind: "input" } },
        { id: "f1", type: "tf", position: { x: 110, y: 132 }, data: { label: "F₁(s)" } },
        { id: "s2", type: "sum", position: { x: 300, y: 150 }, data: { signs: ["+", "+"] } },
        { id: "g2", type: "tf", position: { x: 400, y: 132 }, data: { label: "G₂(s)" } },
        { id: "tp2", type: "takeoff", position: { x: 552, y: 156 }, data: {} },
        { id: "out", type: "io", position: { x: 634, y: 150 }, data: { label: "C(s)", kind: "output" } },
        { id: "h2", type: "tf", position: { x: 372, y: 300 }, data: { label: "H₂(s)", flow: "rtl" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "f1" },
        { id: "e2", source: "f1", target: "s2", targetHandle: "in1" },
        { id: "e3", source: "s2", target: "g2" },
        { id: "e4", source: "g2", target: "tp2" },
        { id: "e5", source: "tp2", sourceHandle: "out", target: "out", label: "C(s)" },
        { id: "e6", source: "tp2", sourceHandle: "down", target: "h2" },
        { id: "e7", source: "h2", target: "s2", targetHandle: "in2" },
    ],
};

// STEP 2 — feedback loop collapsed into F2 (series with F1)
const step2 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 120 }, data: { label: "R(s)", kind: "input" } },
        { id: "f1", type: "tf", position: { x: 120, y: 102 }, data: { label: "F₁(s)" } },
        { id: "f2", type: "tf", position: { x: 300, y: 102 }, data: { label: "F₂(s)" } },
        { id: "out", type: "io", position: { x: 480, y: 110 }, data: { label: "C(s)", kind: "output" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "f1" },
        { id: "e2", source: "f1", target: "f2", label: "F₁(s)" },
        { id: "e3", source: "f2", target: "out", label: "C(s)" },
    ],
};

// STEP 3 — series collapsed into a single G = F1 · F2
const step3 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 120 }, data: { label: "R(s)", kind: "input" } },
        { id: "g", type: "tf", position: { x: 160, y: 102 }, data: { label: "G(s)" } },
        { id: "out", type: "io", position: { x: 340, y: 110 }, data: { label: "C(s)", kind: "output" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "g" },
        { id: "e2", source: "g", target: "out", label: "C(s)" },
    ],
};

// STEP 4 — final simplified system G(s)
const step4 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 120 }, data: { label: "R(s)", kind: "input" } },
        { id: "g", type: "tf", position: { x: 160, y: 102 }, data: { label: "G(s)" } },
        { id: "out", type: "io", position: { x: 340, y: 110 }, data: { label: "C(s)", kind: "output" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "g", label: "R(s)" },
        { id: "e2", source: "g", target: "out", label: "C(s)" },
    ],
};

// STEP 5 — inverse system F(s) = 1/G(s) (maps C(s) back to R(s))
const step5 = {
    nodes: [
        { id: "in", type: "io", position: { x: 0, y: 120 }, data: { label: "C(s)", kind: "input" } },
        { id: "f", type: "tf", position: { x: 150, y: 102 }, data: { label: "1/G(s)" } },
        { id: "out", type: "io", position: { x: 340, y: 110 }, data: { label: "R(s)", kind: "output" } },
    ],
    edges: [
        { id: "e1", source: "in", target: "f" },
        { id: "e2", source: "f", target: "out", label: "R(s)" },
    ],
};

const stepByStepDiagram = [step0, step1, step2, step3, step4, step5];

export default stepByStepDiagram;
