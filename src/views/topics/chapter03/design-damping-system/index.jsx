import DesignSystemByCharsLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";
import DesignSystemByCharsParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";

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

const DesignSystemByCharacteristics = () => {
    const [M_p, $M_p] = useState(1);
    const [t_rise, $t_rise] = useState(1);
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
            (sys) => M_p === sys.M_p && t_rise === sys.t_rise
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                M_p: +M_p,
                t_rise: +t_rise,
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
        let gtf = TransferFunction.Shortcuts.$design(+t_rise, +M_p);
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
                const M_p2 = e.M_p * e.M_p;
                let tgtf = new TransferFunction(
                    [M_p2],
                    [1, 2 * e.t_rise * e.M_p, M_p2]
                );

                const [xi, yi] = calculus.pointify(
                    tgtf.step().$,
                    +t_i,
                    +t_f,
                    +N
                );

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
                (sys) => M_p === sys.M_p && t_rise === sys.t_rise
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
    }, [M_p, t_rise, t_i, t_f, is3DPlotEnabled, thickness, systems, N]);

    useEffect(() => {
        $graphCaptured(false);
    }, [M_p, t_rise]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        طراحی سیستم با استفاده از مشخصات میرایی سیستم{" "}
                    </h2>
                </Typography>
            </Grid>
            <Grid item spacing={gridSpacing}>
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
                        <DesignSystemByCharsLecture />
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
                                <DesignSystemByCharsParameters
                                    M_p={M_p}
                                    t_rise={t_rise}
                                    t_i={t_i}
                                    t_f={t_f}
                                    $M_p={$M_p}
                                    $t_rise={$t_rise}
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
                                    <GraphBox
                                        title="پاسخ پله"
                                        traces={traces}
                                    />
                                </SubCard>
                            </Grid>
                            <hr />
                            <Grid lg={12} md={12} sm={12} xs={12} item>
                                {GInfo && <GInfo.Explain />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default DesignSystemByCharacteristics;
