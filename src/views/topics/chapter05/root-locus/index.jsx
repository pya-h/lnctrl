import RootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "math/GraphMenu";
import { Grid } from "@mui/material";
import GraphBox from "math/GraphBox";
import { MathJax } from "better-react-mathjax";
import RootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";

const stepResponse = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

const RootLocus = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");

    const [k_min, $k_min] = useState(0);
    const [k_max, $k_max] = useState(5);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState([]);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [G_s, $G_s] = useState(null);
    const [GInfo, $GInfo] = useState("");

    const [response, $response] = useState(null);

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

    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex((sys) => G_s.equals(sys.G_s));
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                G_s,
                thickness,
                legend: "$$_{" + (systems.length + 1).toString() + "}$$",
            });
            $systems(capturedSystems);
            $graphCaptured(true);
        }
    };
    useEffect(() => {
        if (G_s) {
            // $GInfo(new Describer(G_s));
            const [x, y] = G_s.rootLocus(k_min, k_max);
            $response(stepResponse(G_s));
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            const all = systems.map((e, index) => {
                const [xi, yi] = calculus.pointify(
                    e.G_s.$,
                    Number(k_min),
                    Number(k_max)
                ); // N: 100

                return {
                    x: xi,
                    y: yi,
                    // z: is3DPlotEnabled ? Array(xi.length).fill(0) : null,
                    line: {
                        // color: e.color...
                        width: e.thickness,
                    },
                    // color,
                    type: "scatter",
                    mode: 'markers',
                    name: e.legend,
                };
            });

            if (systems.findIndex((sys) => G_s.equals(sys.G_s)) === -1)
                // if current system isnt in traces list => add it temperory to plot
                all.push({
                    x,
                    y,
                    // color,
                    line: {
                        // color:'rgb(17, 157, 255)'
                        width: thickness,
                    },
                    type: "scatter",
                    mode: 'markers',
                   
                    name: `c(t)`,
                });

            $traces(all);
        }
    }, [G_s, k_min, k_max, thickness, systems]);

    useEffect(() => {
        $graphCaptured(false);
    }, [rawNumerator, rawDenominator]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">
                    طراحی سیستم با استفاده از مشخصات میرایی سیستم{" "}
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
                                {systems instanceof Array &&
                                    systems.map((sys, index) => {
                                        const formula = stepResponse(
                                            sys.G_s,
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
                                />
                            </Grid>
                        </Grid>
                        <Grid md={8} sm={12} xs={12} item>
                            <SubCard>
                                <GraphMenu
                                    capture={capture}
                                    formulaFileName={
                                        "Water Tank Level Equations _ " +
                                        [
                                            ...systems.map((sys) => sys.legend),
                                        ].join() +
                                        ".png"
                                    }
                                    graphFileName={
                                        [
                                            ...systems.map(
                                                (sys) =>
                                                    `${
                                                        sys.legend
                                                    }{rawNumerator=_rawDenominator=_k=${
                                                        sys.k
                                                    }_in=${
                                                        sys.inputSignal
                                                            ? "ramp"
                                                            : "step"
                                                    }}`
                                            ),
                                        ].join(", ") + ".png"
                                    }
                                    reset={() => $systems([])}
                                    update={(changes) => update(changes)}
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

export default RootLocus;
