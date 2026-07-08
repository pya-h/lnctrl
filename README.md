# LinearControl (`lnctrl`)

An interactive, browser-based textbook for **linear control systems** — the kind of
course a third‑year electrical/mechanical engineering student takes. Instead of static
figures, every topic ships with a live *sandbox*: you type in a transfer function, drag a
pole around a complex plane, sweep a gain, and watch the step response, Bode plot, root
locus or Nyquist diagram redraw in real time.

> **Live demo:** https://lnctrl.payaina.top
> **Live demo:** https://pya-h.github.io/lnctrl
> **Live demo:** https://pydea-rs.github.io/lnctrl

---

## Why this project exists

Control‑systems teaching tools almost always live in MATLAB/Simulink or Python
(`control`, `scipy.signal`). Five years ago, when this project started, there was **no
serious symbolic control/algebra library for JavaScript** — nothing that could take
`k / (s² + 2ζωₙs + ωₙ²)`, factor it, do a partial‑fraction expansion, invert the Laplace
transform *symbolically*, and hand you back `c(t)` as a printable expression **and** as a
sampleable function, all inside the browser with no server.

So the entire mathematics engine here — algebra, complex numbers, polynomials, transfer
functions, matrices, ODE solvers, Laplace machinery, root finders — was written **by hand,
from scratch**, specifically so this could be a purely client‑side, zero‑backend teaching
app. That home‑grown engine (`src/math`) is the heart of the repository; the React UI is
essentially a large, pretty front‑end bolted on top of it.

---

## The `src/math` library — what it took to build

Building a control‑systems CAS in plain JavaScript meant re‑deriving and implementing a
lot of first‑principles math. The pieces, bottom‑up:

| Module | Responsibility |
| --- | --- |
| [`algebra/index.js`](src/math/algebra/index.js) | `Algebra` base type — a symbolic term (coefficient · symbol) that can chain into multi‑term expressions, with `add`/`multiply`/`derivative`/`toString`, so everything downstream can be either numeric **or** symbolic. |
| [`algebra/complex.js`](src/math/algebra/complex.js) | Complex numbers with full arithmetic (`add`, `multiply`, `devide` via conjugate·/·magnitude², `conjugate`, `magnitude`, `phase`, `raiseTo`, `equals`), plus string↔complex parsing. Real and imaginary parts may themselves be symbolic. |
| [`algebra/functions/index.js`](src/math/algebra/functions/index.js) | `Poly` (polynomials in `s`/`t`), exponentials, sinusoids and the input‑signal wrappers used to render `c(t)`. |
| [`algebra/functions/fraction.js`](src/math/algebra/functions/fraction.js) | **`TransferFunction`** — the crown jewel. Pole/zero root‑finding, partial‑fraction / residue expansion, **symbolic inverse Laplace** (including repeated‑pole residues), step/ramp/impulse responses, Bode magnitude & phase, Nyquist data, `characteristicEquation`, unity‑feedback closed loop, PID assembly, damping‑spec (`ωₙ`, `ζ`, overshoot, rise time) conversions, and asymptote computation for root‑locus sketching. |
| [`matrix.js`](src/math/matrix.js) | Determinant (cofactor expansion), transpose, multiply, adjugate — used for the Hurwitz determinants and state‑space work. |
| [`calculus/ode.js`](src/math/calculus/ode.js) | Numerical ODE integrators (explicit Euler for 1st/2nd‑order systems) that drive the time‑domain simulations where a closed form isn't used. |
| [`calculus/lti.js`](src/math/calculus/lti.js) | Closed‑form LTI step/ramp responses for first‑order systems. |
| [`calculus/index.js`](src/math/calculus/index.js) | Sampling/plotting glue (`pointify`, `arrayToTrace`), the M‑circle / N‑circle geometry, number formatting, and misc numeric helpers. |
| [`solvers/equation.js`](src/math/solvers/equation.js), [`solvers/formula.js`](src/math/solvers/formula.js) | Polynomial root solvers (Durand–Kerner iteration, plus an [Algebrite](https://github.com/davidedc/Algebrite) path) and formula parsing. |
| [`describer.js`](src/math/describer.js) | Turns a `TransferFunction` into a human‑readable, MathJax‑rendered analysis ("this system has 2 poles in the right half‑plane…"). |
| [`input-signals/`](src/math/input-signals/) | Step / ramp / impulse signal models that compose with the functions above. |

A recurring design theme: **every quantity is dual‑mode**. A pole can be a number
`-2` or a symbol; a numerator can be `[1, 3, 2]` or an `Algebra` expression. That is what
lets the same `TransferFunction` both *draw* a curve and *print* the closed‑form answer a
student is expected to derive by hand.

---

## The curriculum (app sections)

Navigation is organized by textbook chapter. Each chapter page lists its topics; topics
that end in a live tool are marked 🧪.

- **Chapter 2 — Modeling**
  - Water‑tank (hydraulic) level 🧪
  - Mass–spring–damper (mechanical) 🧪
  - State‑space representation 🧪
  - Block‑diagram algebra (BPMN‑based interactive diagram) 🧪
  - Signal‑flow‑graph algebra (GoJS) 🧪
- **Chapter 3 — Transfer functions & time response**
  - First‑order transfer functions 🧪
  - Second‑order transfer functions — by poles (drag the pole pair) / by parameters (ωₙ, ζ) 🧪
  - Designing a system from a damping spec (overshoot & rise time) 🧪
- **Chapter 4 — Stability (algebraic criteria)**
  - Hurwitz criterion 🧪
  - Routh–Hurwitz criterion 🧪
- **Chapter 5 — Root locus**
  - Root locus 🧪
  - Sketching the root locus (asymptotes, step‑by‑step) 🧪
- **Chapter 6 — Frequency response**
  - Bode plot & a worked Bode example 🧪
  - Frequency response & the RC‑filter example 🧪
  - Nyquist plot 🧪
  - Nichols chart, M‑circles, N‑circles 🧪
  - Delayed (dead‑time) systems 🧪
- **Chapter 7 — Controllers**
  - PID controller tuning 🧪

Every 🧪 sandbox lets you capture multiple systems on one plot to compare them, toggle a
pseudo‑3D view, adjust the sampling resolution `N`, and (see below) **remembers your
inputs between visits**.

---

## Notable UI machinery

- **Interactive sandboxes** built on a shared pattern: a parameters panel feeds a
  `TransferFunction`/simulation, which feeds a [Plotly](https://plotly.com/javascript/)
  chart. Formulas are typeset live with [MathJax](https://www.mathjax.org/) via
  `better-react-mathjax`.
- **Draggable pole placement** — the second‑order "by poles" sandbox and the damping
  designer use a custom `CoordinateSystem` complex‑plane widget you can drag points on.
- **Diagram editors** — block diagrams use `bpmn-js`; signal‑flow graphs use `gojs`.
- **State persistence** — interactive sandboxes are class components extending
  [`TopicBaseComponent`](src/views/topics/TopicBaseComponent.jsx), which transparently
  saves each section's inputs to `localStorage` on unmount/refresh and restores them when
  you return. Components declare a `persistKeys` list of the (serializable) fields to keep;
  a section holding non‑serializable objects (e.g. `Complex` poles) can override
  `saveState`/`reviveState` to (de)serialize them.
- **UI theme** — MUI v5 with the "Berry" template, custom typography/font switching, and a
  Redux‑backed customization drawer.

---

## Tech stack

React 17 (Create React App) · Redux · MUI v5 · Plotly.js · MathJax · bpmn-js · GoJS ·
Algebrite. Deployed to GitHub Pages under a `/lnctrl` base path.

## Running locally

```bash
npm install        # a .npmrc sets legacy-peer-deps for some older transitive deps
npm start          # dev server at http://localhost:3000
npm run build      # production build into ./build
npm run deploy     # publish ./build to the gh-pages branch
```

> The app is served from a sub‑path in production (`/lnctrl`). Routing uses
> `basename={process.env.PUBLIC_URL}` so the same build works both at the domain root
> (local dev) and under `/lnctrl` (GitHub Pages).

---

## Project status & caveats

This began as a student's course project and grew into a fairly complete control‑systems
CAS. The math engine is extensive but hand‑rolled, so some deeper symbolic paths are
approximate or only cover the cases the curriculum needs. It is meant for **learning and
visualization**, not as a validated engineering tool.
