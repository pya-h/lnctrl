// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import NicolesChartParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { browserLockBreaker } from "toolshed";
import NicolesChartLecture from "./lecture";
const symbols = {
    in: "jw",
    out: "H",
};
let currentRawNum = "",
    currentRawDen = "";
const NicolesChart = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");
    const [H_s, $H_s] = useState(null);
    const [w_min, $w_min] = useState(0);
    const [w_max, $w_max] = useState(10);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState({
        rad: [],
        deg: [],
    });
    const [response, $response] = useState(null);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [phaseInRadianScale, setPhaseInRadianScale] = useState(true); // for degree => 180 / PI, for radian scale => 1.0
    const [N, $N] = useState(1000);
    const [K, $K] = useState(1);
    const [ktrace, $ktrace] = useState({
        deg: [],
        rad: [],
    });

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
        // plot
        if (H_s instanceof TransferFunction) {
            (async () => {
                try {
                    $response("$$" + H_s.label("H") + "$$");
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;
                    const all = {
                        deg: Array(systems.length),
                        rad: Array(systems.length),
                    };

                    for (let i = 0; i < systems.length; i++) {
                        if (i % 5 === 0) await browserLockBreaker();
                        const [, phase] = calculus.pointify(
                            systems[i].H_s.phase,
                            +w_min,
                            +w_max,
                            +N
                        );
                        const [, bodeAmp] = calculus.pointify(
                            systems[i].H_s.bode,
                            +w_min,
                            +w_max,
                            +N
                        );

                        all.rad[i] = calculus.arrayToTrace(
                            phase,
                            bodeAmp,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled
                        );
                        all.deg[i] = calculus.arrayToTrace(
                            phase.map((phi) => phi * calculus.RadianToDegree),
                            bodeAmp,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled
                        );
                        if (H_s.equals(systems[i].H_s)) repeatedSystem = true;
                    }

                    if (!repeatedSystem) {
                        const [, phase] = calculus.pointify(
                            H_s.phase,
                            +w_min,
                            +w_max,
                            +N
                        );

                        const [, bodeAmp] = calculus.pointify(
                            H_s.bode,
                            +w_min,
                            +w_max,
                            +N
                        );

                        all.rad.push(
                            calculus.arrayToTrace(
                                phase,
                                bodeAmp,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled
                            )
                        );
                        all.deg.push(
                            calculus.arrayToTrace(
                                phase.map(
                                    (phi) => phi * calculus.RadianToDegree
                                ),
                                bodeAmp,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled
                            )
                        );
                    }
                    $traces(all);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [H_s, systems, w_min, w_max, is3DPlotEnabled, thickness, N]);

    const multiplyPlotBy = (value) => {
        const currentLength = systems.length;
        const multipliedSystem = H_s.multiply(value);
        const newSystemList = systems.filter(
            (sys) => !sys.H_s.equals(multipliedSystem)
        );
        if (newSystemList.length === currentLength) capture();
        else $systems(newSystemList);
        $H_s(multipliedSystem);
    };
    useEffect(() => {
        if (H_s instanceof TransferFunction && +K && +K !== 1) {
            const KH_s = H_s.multiply(K);
            const [, phase] = calculus.pointify(KH_s.phase, +w_min, +w_max, +N);

            const [, amplitude] = calculus.pointify(
                KH_s.bode,
                +w_min,
                +w_max,
                +N
            );

            const rad = calculus.arrayToTrace(
                    phase,
                    amplitude,
                    thickness,
                    `K=${K}`,
                    is3DPlotEnabled
                ),
                deg = calculus.arrayToTrace(
                    phase.map((phi) => phi * calculus.RadianToDegree),
                    amplitude,
                    thickness,
                    `K=${K}`,
                    is3DPlotEnabled
                );
            $ktrace({ rad, deg });
        } else $ktrace({ rad: [], phase: [] });
    }, [K, H_s, N, is3DPlotEnabled, w_min, w_max, thickness]);
    useEffect(() => {
        try {
            if (
                rawNumerator.trim() !== currentRawNum ||
                rawDenominator.trim() !== currentRawDen
            ) {
                const num = calculus.stringToArray(rawNumerator),
                    den = calculus.stringToArray(rawDenominator);
                const h_s = new TransferFunction(num, den);
                currentRawNum = rawNumerator;
                currentRawDen = rawDenominator;
                $H_s(h_s);
            }
        } catch (ex) {
            console.log(ex);
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
                    <h2 className="chapter-section-title">نمودار نیکولز</h2>
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
                        <NicolesChartLecture />
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
                                <NicolesChartParameters
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
                                    $K={$K}
                                    multiplier={multiplyPlotBy}
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
                                            title="نمودار نیکولز"
                                            traces={
                                                phaseInRadianScale
                                                    ? [
                                                          ...traces.rad,
                                                          ktrace.rad,
                                                      ]
                                                    : [
                                                          ...traces.deg,
                                                          ktrace.deg,
                                                      ]
                                            }
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

export default NicolesChart;
