import MassSpringDamperLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import MassSpringDamperParameters from "./parameters";

import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

const mechanicSystemEquation = (m, c, k, F_t) =>
    "$$" +
    m +
    "\\frac{d^2x(t)}{dt^2}" +
    (c ? " + " + (c !== 1 ? c : "") + "\\frac{dx(t)}{dt}" : "") +
    (k ? " + " + (k !== 1 ? k : "") + "x(t) = " : " = ") +
    F_t +
    "$$";

const indexedMechanicSystemEquation = (m, c, k, F_t, index) =>
    "$$" +
    m +
    `\\frac{d^2x_{${index}}(t)}{dt^2}` +
    (c ? ` + ` + (c !== 1 ? c : ``) + `\\frac{dx_{${index}}(t)}{dt}` : ``) +
    (k ? ` + ` + (k !== 1 ? k : ``) + `x_{${index}}(t) = ` : ` = `) +
    F_t +
    "$$";

const symbols = {
    in: "t",
    out: (output) => {
        switch (output) {
            case "dy":
                return "v";
            case "d2y":
                return "a";
            default:
                return "x";
        }
    },
};

class MassSpringDamperExample extends TopicBaseComponent {
    state = {
        topicKey: "ch2-msd",
        m: 100,
        c: 1.0,
        k: 1.0,
        F_t: 0.0,
        t_i: 0,
        t_f: 5,
        x_i: 0.0,
        v_i: 1.0,
        systems: [],
        traces: [],
        diffEquation: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        output: null, // y or null as x(t) | dy as v(t) | d2y as a(t)
        is3DPlotEnabled: false,
        N: 1000,
        isAutoPlaying: false,
        autoYRange: undefined,
    };

    persistKeys = [
        "m",
        "c",
        "k",
        "F_t",
        "t_i",
        "t_f",
        "x_i",
        "v_i",
        "output",
        "thickness",
        "N",
    ];

    setAutoPlaying = (value, sweep) =>
        this.setState({
            isAutoPlaying: value,
            // freeze the y-axis over the whole sweep so the graph doesn't keep
            // rescaling itself and hiding how much it is actually changing
            autoYRange: value && sweep ? this.autoPlayYRange(sweep) : undefined,
        });

    autoPlayYRange = ({ key, from, to, step }) => {
        const { m, c, k, F_t, x_i, v_i, output, t_i, t_f, N, systems } =
            this.state;
        let lo = Infinity;
        let hi = -Infinity;
        const fold = (ys) =>
            ys.forEach((v) => {
                if (v < lo) lo = v;
                if (v > hi) hi = v;
            });
        // mirror exactly what refreshTraces draws, including the a(t) post-step
        const yOf = (p) => {
            const fyt = (t, x, v) => Number((p.F_t - +p.c * v - +p.k * x) / +p.m);
            const [xs, ys, dys] = calculus.ODE.euiler(
                2,
                t_i,
                t_f,
                { y0: +p.x_i, dy_dt0: +p.v_i, fyt, output: p.output },
                +N
            );
            if (p.output && p.output.toLowerCase() === "d2y")
                return xs.map((t, i) => fyt(t, ys[i], dys[i]));
            return ys;
        };
        // captured curves stay on the plot, so keep them inside the frozen frame
        systems.forEach((e) => fold(yOf(e)));
        // hold every parameter at its current value and only move the swept one;
        // the last frame always lands exactly on `to`, so fold that in too
        const at = { m, c, k, F_t, x_i, v_i, output };
        const frames = Math.floor(Math.abs((to - from) / step));
        const foldAt = (value) => fold(yOf({ ...at, [key]: value }));
        for (let i = 0; i <= frames; i++) foldAt(from + i * step);
        foldAt(to);
        if (!isFinite(lo) || !isFinite(hi)) return undefined;
        const pad = (hi - lo) * 0.05 || 1;
        return [lo - pad, hi + pad];
    };

    $m = (value) => this.setState({ m: value });
    $c = (value) => this.setState({ c: value });
    $k = (value) => this.setState({ k: value });
    $F_t = (value) => this.setState({ F_t: value });
    $t_i = (value) => this.setState({ t_i: value });
    $t_f = (value) => this.setState({ t_f: value });
    $x_i = (value) => this.setState({ x_i: value });
    $v_i = (value) => this.setState({ v_i: value });
    $output = (value) => this.setState({ output: value });
    $N = (value) => this.setState({ N: value });
    setSystems = (value) => this.setState({ systems: value });
    setThickness = (value) => this.setState({ thickness: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, v_i, x_i, m, c, k, F_t, output, thickness } =
            this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) =>
                sys.v_i === +v_i &&
                sys.x_i === +x_i &&
                sys.m === +m &&
                sys.c === +c &&
                sys.k === +k &&
                sys.F_t === F_t &&
                sys.output === output
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                x_i: +x_i,
                v_i: +v_i,
                m: +m,
                c: +c,
                k: +k,
                F_t,
                output,
                thickness,
                legend:
                    "$$" +
                    symbols.out(output) +
                    "_{" +
                    (systems.length + 1).toString() +
                    "}$$",
            });
            this.setState({ systems: capturedSystems, isGraphCatured: true });
        }
    };

    refreshTraces = () => {
        const {
            m,
            c,
            k,
            F_t,
            t_i,
            t_f,
            x_i,
            v_i,
            output,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        const fyt = (t, x, v) => Number((F_t - +c * v - +k * x) / +m);
        const [x, y, dy] = calculus.ODE.euiler(
            2,
            t_i,
            t_f,
            {
                y0: +x_i,
                dy_dt0: +v_i,
                fyt,
                output,
            },
            +N
        ); // solve the diff eq by the eiuler method for 2nd order differential equations

        if (output && output.toLowerCase() === "d2y")
            for (
                let i = 0;
                i < x.length;
                i++ // which one is faster? for loop or xi.map(...)  ? ==> i think for is faster and better
            )
                y[i] = fyt(x[i], y[i], dy[i]); // a(t) is actually the fyt defined above; first calculate x(t) [y] and v(t) [dy_dt] and then use it to calculate a
        const diffEquation = mechanicSystemEquation(m, c, k, F_t);

        // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
        // so that the traces will be loaded with new conditions
        const all = systems.map((e, index) => {
            const fyt = (t, x, v) => Number((e.F_t - e.c * v - e.k * x) / e.m);
            let [xi, yi, dyi] = calculus.ODE.euiler(
                2,
                t_i,
                t_f,
                {
                    y0: e.x_i,
                    dy_dt0: e.v_i,
                    fyt,
                    output: e.output,
                },
                +N
            ); // solve the diff eq by the eiuler method for 2nd order differential equations (N: >=100)

            if (e.output && e.output.toLowerCase() === "d2y")
                // using for loop inside a .map method causes error ; so i used xi.map
                yi = xi.map((t, i) => fyt(t, yi[i], dyi[i])); // a(t) is actually the fyt defined above; first calculate x(t) [y] and v(t) [dy_dt] and then use it to calculate a

            return {
                x: xi,
                y: yi,
                z: is3DPlotEnabled ? Array(xi.length).fill(0) : null,
                line: {
                    // color: e.color...
                    width: e.thickness,
                },
                // color,
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                mode: "lines",
                name: e.legend,
            };
        });

        const index = systems.findIndex(
            (sys) =>
                sys.v_i === +v_i &&
                sys.x_i === +x_i &&
                sys.m === +m &&
                sys.c === +c &&
                sys.k === +k &&
                sys.F_t === F_t &&
                sys.output === output
        );
        if (index === -1)
            // if current system isnt in traces list => add it temperory to plot
            all.push({
                x,
                y,
                z: is3DPlotEnabled ? Array(x.length).fill(0) : null,
                // color,
                line: {
                    // color:'rgb(17, 157, 255)'
                    width: thickness,
                },
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                mode: "lines",
                name: `${symbols.out(output)}(${symbols.in})`,
            });

        this.setState({ traces: all, diffEquation });
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            m,
            c,
            k,
            F_t,
            t_i,
            t_f,
            x_i,
            v_i,
            output,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        if (
            m !== prevState.m ||
            c !== prevState.c ||
            k !== prevState.k ||
            F_t !== prevState.F_t ||
            t_i !== prevState.t_i ||
            t_f !== prevState.t_f ||
            x_i !== prevState.x_i ||
            v_i !== prevState.v_i ||
            output !== prevState.output ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            m !== prevState.m ||
            c !== prevState.c ||
            k !== prevState.k ||
            F_t !== prevState.F_t ||
            x_i !== prevState.x_i ||
            v_i !== prevState.v_i ||
            output !== prevState.output
        )
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.setThickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            m,
            c,
            k,
            F_t,
            t_i,
            t_f,
            x_i,
            v_i,
            systems,
            traces,
            diffEquation,
            isGraphCatured,
            output,
            N,
            isAutoPlaying,
            autoYRange,
        } = this.state;
        return (
            <Grid container direction="column" spacing={1}>
                <Grid
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                        direction: "ltr",
                    }}
                    item
                >
                    <MassSpringDamperLecture />
                </Grid>

                <Grid sx={{ margin: "auto", width: "100%" }} item>
                    <SubCard sx={{ direction: "ltr" }}>
                        <Grid
                            id="formulaBox"
                            sx={{ margin: "auto" }}
                            container
                            direction="row"
                        >
                            {systems.map((sys, index) => {
                                if (!index) {
                                    sys.index = index + 1;
                                } else if (
                                    sys.m === systems[index - 1].m &&
                                    sys.c === systems[index - 1].c &&
                                    sys.k === systems[index - 1].k &&
                                    sys.F_t === systems[index - 1].F_t
                                ) {
                                    sys.index = systems[index - 1].index;
                                } else {
                                    sys.index = systems[index - 1].index + 1;
                                }

                                const formula = indexedMechanicSystemEquation(
                                    sys.m,
                                    sys.c,
                                    sys.k,
                                    sys.F_t,
                                    sys.index
                                );
                                return (
                                    <Grid md={6} sm={12} item>
                                        <MathJax>{formula}</MathJax>
                                    </Grid>
                                );
                            })}
                            {!isGraphCatured && (
                                <Grid md={6} sm={12}>
                                    <MathJax>{diffEquation}</MathJax>
                                </Grid>
                            )}
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid
                    spacing={2}
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                        direction: "ltr",
                    }}
                    container
                >
                    <Grid
                        md={3}
                        sm={12}
                        xs={12}
                        sx={{ marginTop: "1%", width: "100%" }}
                        container
                    >
                        <Grid xs={12}>
                            <MassSpringDamperParameters
                                m={m}
                                c={c}
                                k={k}
                                F_t={F_t}
                                x_i={x_i}
                                v_i={v_i}
                                t_i={t_i}
                                t_f={t_f}
                                output={output}
                                $m={this.$m}
                                $c={this.$c}
                                $k={this.$k}
                                $F_t={this.$F_t}
                                $x_i={this.$x_i}
                                $v_i={this.$v_i}
                                $t_i={this.$t_i}
                                $t_f={this.$t_f}
                                $output={this.$output}
                                N={N}
                                $N={this.$N}
                                isAutoPlaying={isAutoPlaying}
                                setAutoPlaying={this.setAutoPlaying}
                            />
                        </Grid>
                    </Grid>
                    <Grid md={9} sm={12} xs={12} item>
                        <SubCard>
                            <GraphMenu
                                capture={this.capture}
                                reset={() => this.setSystems([])}
                                update={(changes) => this.update(changes)}
                                toggle3DPlot={this.toggle3DPlot}
                            />
                        </SubCard>
                        <hr />
                        <Grid xs={12} item>
                            <SubCard>
                                <PlotlyBox
                                    title="Cart characteristic curves"
                                    traces={traces}
                                    yRange={autoYRange}
                                />
                            </SubCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MassSpringDamperExample;
