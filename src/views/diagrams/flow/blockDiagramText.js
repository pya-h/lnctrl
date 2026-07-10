// Lets labels carry sub/super-scripts with a LaTeX-like syntax: while renaming,
// `G_1` or `G_{12}` become subscripts and `G^2` / `G^{-1}` become superscripts.
// The reverse turns the stored unicode back into LaTeX for the equivalent modal.

const SUB = {
    0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉",
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
    a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ",
    o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ",
};
const SUP = {
    0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
    a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ",
    k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ",
    v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
};

const reverse = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
const SUB_R = reverse(SUB);
const SUP_R = reverse(SUP);
const subClass = Object.values(SUB).join("");
const supClass = Object.values(SUP).join("");

const conv = (map, chars) => [...chars].map((c) => map[c] ?? c).join("");

export const applyScripts = (str) =>
    str
        .replace(/\^\{([^}]*)\}/g, (_, g) => conv(SUP, g))
        .replace(/_\{([^}]*)\}/g, (_, g) => conv(SUB, g))
        .replace(/\^(\S)/g, (_, c) => conv(SUP, c))
        .replace(/_(\S)/g, (_, c) => conv(SUB, c));

export const scriptsToLatex = (label) =>
    label
        .replace(new RegExp(`[${subClass}]+`, "g"), (run) => `_{${[...run].map((c) => SUB_R[c]).join("")}}`)
        .replace(new RegExp(`[${supClass}]+`, "g"), (run) => `^{${[...run].map((c) => SUP_R[c]).join("")}}`);
