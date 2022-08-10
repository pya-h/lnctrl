import SecondOrderTfLecture from "./lecture";

// project imports
import SubCard from "ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "math/GraphMenu";
import { Grid } from "@mui/material";
import GraphBox from "math/GraphBox";
import { MathJax } from "better-react-mathjax";
import SecondOrderTfParameters from "./parameters";
import Complex from "math/algebra/complex";
import Algebra from "math/algebra/index";
import TransferFunction from "math/algebra/functions/transferFunction";
import { gridSpacing } from "../../../../store/constant";

const stepResponse = (tf, c_t = tf.step(), index = undefined) =>
    "$$\\begin{cases} " +
    tf.label("G", index) +
    " \\\\ \\\\ " +
    c_t.label("c", index) +
    "\\end{cases}$$";

const symbols = {
    in: "t",
    out: "c",
};

const SecondOrderTfExample = () => {
    const [alpha, $alpha] = useState(new Complex(1, 1));
    const [beta, $beta] = useState(alpha.conjugate());
    const [k, $k] = useState(1.0);
    const [t_i, $t_i] = useState(0);
    const [t_f, $t_f] = useState(5);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState([]);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [C_t, $C_t] = useState(null);
    const [G_s, $G_s] = useState(null);
    const [gnfo, $gnfo] = useState("");

    const [response, $response] = useState(null);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    //update
    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) => alpha.equals(sys.alpha) && beta.equals(sys.beta) && sys.k === k
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                alpha,
                beta,
                k,
                G_s,
                C_t,
                thickness,
                legend:
                    "$$" +
                    symbols.out +
                    "_{" +
                    (systems.length + 1).toString() +
                    "}$$",
            });
            $systems(capturedSystems);
            $graphCaptured(true);
        }
    };

    useEffect(() => {
        let gtf = TransferFunction.$2nd(
            Number(k),
            alpha instanceof Algebra ? alpha.negation() : -alpha,
            beta instanceof Algebra ? beta.negation() : -beta
        );
        const tstep = gtf.step();
        $G_s(gtf);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        if (gtf && alpha.hasSameTypeWith(beta)) {
            $C_t(tstep);
            $gnfo(gtf.describe());
            const [x, y] = calculus.pointify(
                tstep.$,
                Number(t_i),
                Number(t_f)
            ); // N: 100
            $response(stepResponse(gtf));
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            const all = systems.map((e, index) => {
                let tgtf = TransferFunction.$2nd(
                    Number(e.k),
                    e.alpha instanceof Algebra ? e.alpha.negation() : -e.alpha,
                    e.beta instanceof Algebra ? e.beta.negation() : -e.beta
                );
                
                const [xi, yi] = calculus.pointify(
                    tgtf.step().$,
                    Number(t_i),
                    Number(t_f)
                ); // N: 100

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
                (sys) => alpha.equals(sys.alpha) && beta.equals(sys.beta) && sys.k === k
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
                    name: `${symbols.out}(${symbols.in})`,
                });

            $traces(all);
        }
    }, [alpha, beta, k, t_i, t_f, is3DPlotEnabled, thickness, systems]);

    useEffect(() => {
        $graphCaptured(false);
    }, [alpha, beta, k]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
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
                <SecondOrderTfLecture />
            </Grid>

            <Grid sx={{ margin: "auto", width: "100%" }} item>
                <SubCard sx={{ direction: "ltr" }}>
                    <Grid
                        id="formulaBox"
                        sx={{ margin: "auto" }}
                        container
                        direction="row"
                    >
                        {systems instanceof Array &&  systems.map((sys, index) => {
                            const formula = stepResponse(sys.G_s, sys.C_t, index + 1);
                            console.log(sys.C_t, sys.G_s)

                            return (
                                <Grid style={{ fontSize: "18px" }} xs={12} item>
                                    <MathJax>{formula}</MathJax>
                                </Grid>
                            );
                        })}
                        {!isGraphCatured && (
                            <Grid style={{ fontSize: "18px" }} xs={12}>
                                <MathJax>{response}</MathJax>
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
                        <SecondOrderTfParameters
                            alpha={alpha}
                            beta={beta}
                            k={k}
                            t_i={t_i}
                            t_f={t_f}
                            $alpha={$alpha}
                            $beta={$beta}
                            $k={$k}
                            $t_i={$t_i}
                            $t_f={$t_f}
                        />
                    </Grid>
                </Grid>
                <Grid md={9} sm={12} xs={12} item>
                    <SubCard>
                        <GraphMenu
                            capture={capture}
                            formulaFileName={
                                "Water Tank Level Equations _ " +
                                [...systems.map((sys) => sys.legend)].join() +
                                ".png"
                            }
                            graphFileName={
                                [
                                    ...systems.map(
                                        (sys) =>
                                            `${sys.legend}{alpha=${
                                                sys.alpha
                                            }_beta=${sys.beta}_k=${sys.k}_in=${
                                                sys.inputSignal
                                                    ? "ramp"
                                                    : "step"
                                            }}`
                                    ),
                                ].join(", ") + ".png"
                            }
                            reset={() => $systems([])}
                            update={(changes) => update(changes)}
                            toggle3DPlot={toggle3DPlot}
                        />
                    </SubCard>
                    <hr />
                    <Grid lg={12} md={12} sm={12} xs={12} item>
                        <SubCard>
                            <GraphBox title="پاسخ پله" traces={traces} />
                        </SubCard>
                    </Grid>
                    <hr />
                    <Grid lg={12} md={12} sm={12} xs={12} item>
                        <SubCard direction="rtl">
                            <Grid
                                style={{ textAlign: "center" }}
                                spacing={gridSpacing}
                                container
                            >
                                {gnfo instanceof Array &&
                                    gnfo.map((info, i) => (
                                        <Grid
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            item
                                        >
                                          <MathJax> {info}</MathJax> 
                                        </Grid>
                                    ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SecondOrderTfExample;
