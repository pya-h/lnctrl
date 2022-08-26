import RootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";
import RootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
// import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import { makeProgress } from "toolshed";
import Complex from "math/algebra/complex";

const tfFormula = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

const RootLocus = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 5 12");

    const [k_min, $k_min] = useState(-100);
    const [k_max, $k_max] = useState(100);
    // gradiant of u(t) is 0 and unit ramp is one
    const [rootLocusTrace, $rootLocusTrace] = useState({ x: [], y: [] });
    const [zerosTrace, $zerosTrace] = useState({ x: [], y: [] });
    const [polesTrace, $polesTrace] = useState({ x: [], y: [] });

    const [G_s, $G_s] = useState(null);
    // const [GInfo, $GInfo] = useState("");
    const [formula, $formula] = useState(null);
    const [responseTime, setResponseTime] = useState(null); //the time that takes for plotting rootlocus
    const [method, changeMethod] = useState("fast");
    const [N, $N] = useState(1000);

    //update
    useEffect(() => {
        // k * num / den
        const g_s = new TransferFunction(
            calculus.stringToArray(rawNumerator),
            calculus.stringToArray(rawDenominator)
        );
        $G_s(g_s);
        $formula(tfFormula(g_s));
    }, [rawNumerator, rawDenominator]);

    const updatePlot = async () => {
        try {
            // const updateProgressBar =
            if (G_s) {
                $rootLocusTrace({ x: [], y: [] });
                const startTime = new Date();

                const [zeros, poles] = G_s.roots();
                const [zx, zy] = Complex.ToCouples(zeros);
                $zerosTrace({
                    x: zx,
                    y: zy,
                    type: "scatter",
                    mode: "markers",
                    marker: {
                        size: 10,
                        color: "black",
                        // symbol: 'diamond'
                    },
                    name: "Zero",
                });
                const [px, py] = Complex.ToCouples(poles);
                $polesTrace({
                    x: px,
                    y: py,
                    type: "scatter",
                    mode: "markers",
                    marker: {
                        color: "red",
                        symbol: "x",
                        size: 10,
                    },
                    name: "Pole",
                });

                // $GInfo(new Describer(G_s));
                const progressBar = document.getElementById("progressbar");
                const [x, y] = await (method === "accurate"
                    ? G_s.rootLocus
                    : G_s.rootsByAlgebriteLocus)(
                    +k_min,
                    +k_max,
                    progressBar, // send progress bar element to root locus for showing progres and preventing the browser from locking
                    +N
                );
                const endTime = new Date();
                $rootLocusTrace({
                    x,
                    y,
                    type: "scatter",
                    mode: "markers",
                    marker: {
                        size: 3,
                    },
                    name: "Root-Locus",
                });
                setResponseTime((+endTime - +startTime) / 1000);

                setTimeout(async () => {
                    await makeProgress(progressBar, 0);
                }, [1000]);
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        مکان هندسی قطب های سیستم
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
                        <RootLocusLecture />
                    </Grid>

                    <Grid sx={{ margin: "auto", width: "100%" }} item>
                        <SubCard>
                            <Grid id="formulaBox" container direction="row">
                                <MathJax style={{ margin: "auto" }}>
                                    {formula}
                                </MathJax>
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
                            md={4}
                            sm={12}
                            xs={12}
                            sx={{ marginTop: "1%", width: "100%" }}
                            container
                        >
                            <Grid xs={12}>
                                <RootLocusParameters
                                    rawNumerator={rawNumerator}
                                    rawDenominator={rawDenominator}
                                    k_min={k_min}
                                    k_max={k_max}
                                    $rawNumerator={$rawNumerator}
                                    $rawDenominator={$rawDenominator}
                                    $k_min={$k_min}
                                    $k_max={$k_max}
                                    updatePlot={updatePlot}
                                    responseTime={responseTime}
                                    N={N}
                                    $N={$N}
                                    method={method}
                                    changeMethod={changeMethod}
                                />
                            </Grid>
                        </Grid>
                        <Grid md={8} sm={12} xs={12} item>
                            <Grid lg={12} md={12} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphBox
                                        title="مکان هندسی"
                                        traces={[
                                            rootLocusTrace,
                                            zerosTrace,
                                            polesTrace,
                                        ]}
                                    />
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default RootLocus;
