import SOTFByParamsLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus/index";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";
import SOTFByParamsInputs from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
import Describer from "math/describer";

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

const SOTFExamineByParams = () => {
    const [w_n, $w_n] = useState(1);
    const [zeta, $zeta] = useState(0.1);
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
    const [GInfo, $GInfo] = useState("");
    const [N, $N] = useState(1000);
    const [response, $response] = useState(null);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    //update
    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) => w_n === sys.w_n && zeta === sys.zeta
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                w_n,
                zeta,
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
        let gtf = TransferFunction.Specials.$WnZ(w_n, zeta);
        const tstep = gtf.step();
        $G_s(gtf);
        if (gtf) {
            $C_t(tstep);
            $GInfo(new Describer(gtf));
            const [x, y] = calculus.pointify(tstep.$, +t_i, +t_f, +N);
            $response(stepResponse(gtf));
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            const all = systems.map((e, index) => {
                const w_n2 = e.w_n * e.w_n;
                let tgtf = new TransferFunction(
                    [w_n2],
                    [1, 2 * e.zeta * e.w_n, w_n2]
                );

                const [xi, yi] = calculus.pointify(tgtf.step().$, +t_i, +t_f, +N);

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
                (sys) => +w_n === sys.w_n && +zeta === sys.zeta
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
    }, [w_n, zeta, t_i, t_f, is3DPlotEnabled, thickness, systems, N]);

    useEffect(() => {
        $graphCaptured(false);
    }, [w_n, zeta]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <Grid container direction="column" spacing={gridSpacing}>
            <Grid
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    direction: "ltr",
                }}
                item
            >
                <SOTFByParamsLecture />
            </Grid>

            <Grid sx={{ margin: "auto", width: "100%" }} item>
                <SubCard sx={{ direction: "ltr" }}>
                    <Grid
                        id="formulaBox"
                        sx={{ margin: "auto" }}
                        container
                        direction="row"
                    >
                        {systems instanceof Array &&
                            systems.map((sys, index) => {
                                const formula = stepResponse(
                                    sys.G_s,
                                    sys.C_t,
                                    index + 1
                                );
                                console.log(sys.C_t, sys.G_s);

                                return (
                                    <Grid
                                        style={{ fontSize: "18px" }}
                                        xs={12}
                                        item
                                    >
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
                        <SOTFByParamsInputs
                            w_n={w_n}
                            zeta={zeta}
                            t_i={t_i}
                            t_f={t_f}
                            $w_n={$w_n}
                            $zeta={$zeta}
                            $t_i={$t_i}
                            $t_f={$t_f}
                            N={N}
                            $N={$N}
                        />
                    </Grid>
                </Grid>
                <Grid md={9} sm={12} xs={12} item>
                    <SubCard>
                        <GraphMenu
                            capture={capture}
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
                        {GInfo && <GInfo.Explain />}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SOTFExamineByParams;
