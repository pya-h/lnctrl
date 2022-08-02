import MassSpringDamperLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus/index";
import { useState, useEffect } from "react";
import MassSpringDamperParameters from "./parameters";

import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";

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

const MassSpringDamperExample = () => {
    const [m, $m] = useState(100);
    const [c, $c] = useState(1.0);
    const [k, $k] = useState(1.0);
    const [F_t, $F_t] = useState(0.0);
    const [t_i, $t_i] = useState(0);
    const [t_f, $t_f] = useState(5);
    const [x_i, $x_i] = useState(0.0);
    const [v_i, $v_i] = useState(1.0);
    const [systems, setSystems] = useState([]);
    const [traces, setTraces] = useState([]);
    const [diffEquation, setDiffEquation] = useState(null);
    const [thickness, setThickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, setGraphCaptured] = useState(false);
    const [output, $output] = useState(null); // y or null as x(t) | dy as v(t) | d2y as a(t)
    const [is3DPlotEnabled, set3DPlotEnabled] = useState(false);
    const [N, $N] = useState(1000);

    const toggle3DPlot = () => set3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
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
            setSystems(capturedSystems);
            setGraphCaptured(true);
        }
    };

    useEffect(() => {
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
        setDiffEquation(mechanicSystemEquation(m, c, k, F_t));

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

        setTraces(all);
    }, [
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
    ]);

    useEffect(() => {
        setGraphCaptured(false);
    }, [m, c, k, F_t, x_i, v_i, output]);

    const update = (changes) => {
        if (changes) setThickness(changes.thickness);
        //and so...
    };
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
                            $m={$m}
                            $c={$c}
                            $k={$k}
                            $F_t={$F_t}
                            $x_i={$x_i}
                            $v_i={$v_i}
                            $t_i={$t_i}
                            $t_f={$t_f}
                            $output={$output}
                            N={N}
                            $N={$N}
                        />
                    </Grid>
                </Grid>
                <Grid md={9} sm={12} xs={12} item>
                    <SubCard>
                        <GraphMenu
                            capture={capture}
                            reset={() => setSystems([])}
                            update={(changes) => update(changes)}
                            toggle3DPlot={toggle3DPlot}
                        />
                    </SubCard>
                    <hr />
                    <Grid lg={12} md={12} sm={12} xs={12} item>
                        <SubCard>
                            <GraphBox
                                title="منحنی مشخصه های گاری"
                                traces={traces}
                            />
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MassSpringDamperExample;
