// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import FrequencyResponseParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import FrequencyResponseLecture from "./lecture";

const symbols = {
    in: "jw",
    out: "H",
};

const FrequencyResponse = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");
    const [H_s, $H_s] = useState(null);
    const [w_min, $w_min] = useState(-10);
    const [w_max, $w_max] = useState(10);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState({
        phase: [],
        amplitude: [],
        degreePhase: [],
    });
    const [response, $response] = useState(null);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [phaseInRadianScale, setPhaseInRadianScale] = useState(true); // for degree => 180 / PI, for radian scale => 1.0
    const [N, $N] = useState(1000);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
        const capturedSystems = [...systems];

        if (capturedSystems.findIndex((sys) => H_s.equals(sys.H)) === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                H_s,
                thickness,
                legend:
                    symbols.out + "_{" + (systems.length + 1).toString() + "}",
            });
            $systems(capturedSystems);
            $graphCaptured(true);
        }
    };

    useEffect(() => {
        try {
            const num = calculus.stringToArray(rawNumerator),
                den = calculus.stringToArray(rawDenominator);
            const h_s = new TransferFunction(num, den);
            $H_s(h_s);
            $response("$$" + h_s.label("H") + "$$");
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            let repeatedSystem = false;
            const all = {
                amplitude: Array(systems.length),
                phase: Array(systems.length),
                degreePhase: Array(systems.length),
            };

            for (let i = 0; i < systems.length; i++) {
                all.amplitude[i] = calculus.systemToTrace(
                    systems[i].H_s.amplitude,
                    +w_min,
                    +w_max,
                    systems[i].thickness,
                    systems[i].legend,
                    is3DPlotEnabled,
                    +N
                );
                all.phase[i] = calculus.systemToTrace(
                    systems[i].H_s.phase,
                    +w_min,
                    +w_max,
                    systems[i].thickness,
                    systems[i].legend,
                    is3DPlotEnabled,
                    +N
                );
                all.degreePhase[i] = { ...all.phase[i] };
                all.degreePhase[i].y = all.degreePhase[i].y.map(
                    (yi) => yi * calculus.RadianToDegree
                );

                if (h_s.equals(systems[i].H_s)) repeatedSystem = true;
            }

            if (!repeatedSystem) {
                // if current system isnt in traces list => add it temperory to plot
                const amp = calculus.systemToTrace(
                        h_s.amplitude,
                        +w_min,
                        +w_max,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled,
                        +N
                    ),
                    phase = calculus.systemToTrace(
                        h_s.phase,
                        +w_min,
                        +w_max,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled,
                        +N
                    );
                const degreePhase = { ...phase };
                degreePhase.y = degreePhase.y.map(
                    (yi) => yi * calculus.RadianToDegree
                );
                all.phase.push(phase);
                all.degreePhase.push(degreePhase);
                all.amplitude.push(amp);
            }

            $traces(all);
        } catch (ex) {
            console.log(ex);
        }
    }, [
        rawNumerator,
        rawDenominator,
        w_min,
        w_max,
        is3DPlotEnabled,
        thickness,
        systems,
        N,
    ]);

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
                <Typography>
                    <h2 className="chapter-section-title">
                        پاسخ فرکانسی سیستم ها
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
                        <FrequencyResponseLecture />
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
                                    let formula =
                                        "$$" +
                                        sys.H_s.label("H", index + 1) +
                                        "$$";

                                    return (
                                        <Grid
                                            style={{ fontSize: "18px" }}
                                            md={6}
                                            sm={12}
                                            item
                                        >
                                            <MathJax>{formula}</MathJax>
                                        </Grid>
                                    );
                                })}
                                {!isGraphCatured && (
                                    <Grid
                                        style={{ fontSize: "18px" }}
                                        md={6}
                                        sm={12}
                                    >
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
                                <FrequencyResponseParameters
                                    rawNumerator={rawNumerator}
                                    rawDenominator={rawDenominator}
                                    $rawNumerator={$rawNumerator}
                                    $rawDenominator={$rawDenominator}
                                    w_min={w_min}
                                    w_max={w_max}
                                    $w_min={$w_min}
                                    $w_max={$w_max}
                                    phaseInRadianScale={phaseInRadianScale}
                                    setPhaseInRadianScale={
                                        setPhaseInRadianScale
                                    }
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
                            <Grid xs={12} item>
                                <SubCard>
                                    <Grid
                                        spacing={gridSpacing}
                                        direction="row"
                                        container
                                    >
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="اندازه"
                                                traces={traces.amplitude}
                                            />
                                        </Grid>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="فاز"
                                                traces={
                                                    phaseInRadianScale
                                                        ? traces.phase
                                                        : traces.degreePhase
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default FrequencyResponse;
