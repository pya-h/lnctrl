// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { makeProgress } from "toolshed";
import NyquistPlotParameters from "./parameters";
import NyquistPlotLecture from "./lecture";
const symbols = {
    in: "jw",
    out: "H",
};

const observeSystem = (numerator, denominator) => {
    let degreeOfZeroPole = 0,
        degreeOfZeroZero = 0;
    for (
        ;
        !denominator[denominator.length - 1 - degreeOfZeroPole];
        degreeOfZeroPole++
    );
    for (
        ;
        !numerator[numerator.length - 1 - degreeOfZeroZero];
        degreeOfZeroZero++
    );
    const sensitiveSystem =
        !denominator[denominator.length - 1] &&
        degreeOfZeroZero < degreeOfZeroPole;
    // degreeOfZeroPole % 2;
    const systemIsPainInTheA =
        sensitiveSystem &&
        denominator.length > numerator.length + 1 &&
        denominator.length > 2 &&
        denominator.length - degreeOfZeroPole > 1; //numerator.length < denominator.length;

    return { sensitiveSystem, systemIsPainInTheA };
};

const revisePlot = (numerator, denominator, x, y) => {
    let systemIsPainInTheA = true;
    if (denominator.length === 3 && denominator[0] && denominator[1]) {
        // just have a simple zero pole with degree 1
        let max = 0;
        const nearInfinityPole = -Math.abs(denominator[1]) / denominator[0];

        const absP = Math.abs(nearInfinityPole);
        for (let i = 0; i < x.length; i++) {
            if (Math.abs(x[i]) + 0.001 >= absP || x[i] === 0) {
                delete x[i];
                delete y[i];
            } else {
                const absy = Math.abs(y[i]);
                if (absy > max) max = absy;
            }
        }
        x.push(nearInfinityPole - 0.001);
        y.push(max * 10);
        x.push(nearInfinityPole - 0.001);
        y.push(-max * 10);

        systemIsPainInTheA = false;
    }
    return { x, y, systemIsPainInTheA };
};
let currentRawNum = "",
    currentRawDen = "";
const _1PlusJ = calculus.arrayToTrace([-1], [0], 1, "-1+0j", false, "markers");
const NyquistPlot = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");
    const [fraction, $fraction] = useState([[1], [1, 1]]);
    const [H_s, $H_s] = useState(null);
    const [w_min, $w_min] = useState(-50);
    const [w_max, $w_max] = useState(50);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState([]);
    const [response, $response] = useState(null);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [N, $N] = useState(10000);
    const [responseTime, setResponseTime] = useState(null);
    const [method, changeMethod] = useState("polar");
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
        (async () => {
            try {
                const currentPlotProgressBarElement = document.getElementById(
                        "nyquist_progressbar"
                    ),
                    previousPlotsProgressBarElement = document.getElementById(
                        "precvious_plots_progressbar"
                    );
                const [numerator, denominator] = fraction;

                const h_s = new TransferFunction(numerator, denominator);
                // if (!h_s.equals(H_s))
                {
                    $H_s(h_s);
                    $response("$$" + h_s.label("H") + "$$");
                    setResponseTime("درحال رسم");
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;
                    const startTime = new Date();
                    const all = Array(systems.length);
                    for (let i = 0; i < systems.length; i++) {
                        const num = systems[i].H_s.getA(),
                            den = systems[i].H_s.getB();
                        let { sensitiveSystem, systemIsPainInTheA } =
                            observeSystem(num, den);
                        await makeProgress(
                            previousPlotsProgressBarElement,
                            (100 * i) / systems.length
                        );
                        let [x, y] = await calculus.complexPointify(
                            (w) => systems[i].H_s.nyquist(w, method),
                            +w_min,
                            +w_max,
                            method === "cartesian" && !sensitiveSystem,
                            +N
                        );
                        // if (systemIsPainInTheA)
                        //     ({ x, y, systemIsPainInTheA } = revisePlot(
                        //         num,
                        //         den,
                        //         x,
                        //         y
                        //     ));
                        if (h_s.equals(systems[i].H_s)) repeatedSystem = true;
                        all[i] = calculus.arrayToTrace(
                            x,
                            y,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            method === "polar" || !systemIsPainInTheA
                                ? "lines"
                                : "markers"
                        );
                    }
                    if (all.length) {
                        await makeProgress(
                            previousPlotsProgressBarElement,
                            100
                        );
                    }
                    if (!repeatedSystem) {
                        await makeProgress(currentPlotProgressBarElement, 0);
                        // if current system isnt in traces list => add it temperory to plot
                        let { sensitiveSystem, systemIsPainInTheA } =
                            observeSystem(numerator, denominator);
                        let [x, y] = await calculus.complexPointify(
                            (w) => h_s.nyquist(w, method),
                            +w_min,
                            +w_max,
                            method === "cartesian" && !sensitiveSystem,
                            +N,
                            currentPlotProgressBarElement
                        );
                        // if (systemIsPainInTheA)
                        //     ({ x, y, systemIsPainInTheA } = revisePlot(
                        //         numerator,
                        //         denominator,
                        //         x,
                        //         y
                        //     ));
                        const newsys = calculus.arrayToTrace(
                            x,
                            y,
                            thickness,
                            `${symbols.out}(${symbols.in})`,
                            is3DPlotEnabled,
                            method === "polar" || !systemIsPainInTheA
                                ? "lines"
                                : "markers"
                        );
                        all.push(newsys);
                        const endTime = new Date();
                        setResponseTime(
                            (+endTime - +startTime) / 1000 + " ثانیه"
                        );
                        await makeProgress(currentPlotProgressBarElement, 100);
                    }
                    all.push(_1PlusJ);

                    $traces(all);
                }
            } catch (ex) {
                console.log(ex);
            }
        })();
    }, [
        fraction,
        w_min,
        w_max,
        method,
        is3DPlotEnabled,
        thickness,
        systems,
        N,
    ]);

    useEffect(() => {
        if (
            rawNumerator.trim() !== currentRawNum ||
            rawDenominator.trim() !== currentRawDen
        ) {
            const num = calculus.stringToArray(rawNumerator),
                den = calculus.stringToArray(rawDenominator);
            currentRawDen = rawDenominator;
            currentRawNum = rawNumerator;
            $fraction([num, den]);
        }
    }, [rawNumerator, rawDenominator]);

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
                    <h2 className="chapter-section-title">نمودار نایکوئیست</h2>
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
                        <NyquistPlotLecture />
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
                                <NyquistPlotParameters
                                    rawNumerator={rawNumerator}
                                    rawDenominator={rawDenominator}
                                    $rawNumerator={$rawNumerator}
                                    $rawDenominator={$rawDenominator}
                                    w_min={w_min}
                                    w_max={w_max}
                                    $w_min={$w_min}
                                    $w_max={$w_max}
                                    responseTime={responseTime}
                                    N={N}
                                    $N={$N}
                                    method={method}
                                    changeMethod={changeMethod}
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
                                    <Grid xs={12} item>
                                        <PlotlyBox
                                            title="نمودار نایکويیست"
                                            traces={traces}
                                        />
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

export default NyquistPlot;
