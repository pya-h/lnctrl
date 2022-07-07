import RootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import GraphBox from "math/GraphBox";
import { MathJax } from "better-react-mathjax";
import RootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
// import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import { makeProgress } from "toolshed";

const stepResponse = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

const RootLocus = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 5 12");

    const [k_min, $k_min] = useState(0);
    const [k_max, $k_max] = useState(50);
    // gradiant of u(t) is 0 and unit ramp is one
    const [trace, $trace] = useState({ x: [], y: [] });
    const [G_s, $G_s] = useState(null);
    // const [GInfo, $GInfo] = useState("");
    const [response, $response] = useState(null);
    const [responseTime, setResponseTime] = useState(null); //the time that takes for plotting rootlocus
    //update
    useEffect(() => {
        // k * num / den
        $G_s(
            new TransferFunction(
                calculus.stringToArray(rawNumerator),
                calculus.stringToArray(rawDenominator)
            )
        );
    }, [rawNumerator, rawDenominator]);

    const updatePlot = async () => {
        try {
            // const updateProgressBar =
            if (G_s) {
                // $GInfo(new Describer(G_s));
                const progressBar = document.getElementById("progressbar");
                const startTime = new Date();
                const [x, y] = await G_s.rootLocus(
                    k_min,
                    k_max,
                    progressBar // send progress bar element to root locus for showing progres and preventing the browser from locking
                );
                const endTime = new Date();
                $response(stepResponse(G_s));
                $trace({
                    x,
                    y,
                    type: "scatter",
                    mode: "markers",
                    name: `root-locus`,
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
                <h2 className="chapter-section-title">
                    مکان هندسی قطب های سیستم
                </h2>
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
                        <SubCard sx={{ direction: "ltr" }}>
                            <Grid
                                id="formulaBox"
                                sx={{ margin: "auto" }}
                                container
                                direction="row"
                            >
                                <MathJax>{response}</MathJax>
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
                                />
                            </Grid>
                        </Grid>
                        <Grid md={8} sm={12} xs={12} item>
                            <Grid lg={12} md={12} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphBox
                                        title="مکان هندسی"
                                        traces={[trace]}
                                    />
                                </SubCard>
                            </Grid>
                            <hr />
                            {/* <Grid lg={12} md={12} sm={12} xs={12} item>
                                {GInfo && <GInfo.Explain />}
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default RootLocus;
