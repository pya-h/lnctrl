// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus/index";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";
import PIDParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { browserLockBreaker } from "toolshed";
const symbols = {
    in: "jw",
    out: "H",
};
let currentRawNum = "",
    currentRawDen = "";
const PIDController = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");
    const [G_s, $G_s] = useState(null);
    const [K_p, $K_p] = useState(1);
    const [T_i, $T_i] = useState(0);
    const [T_d, $T_d] = useState(0);

    const [t_initial, $t_initial] = useState(0);
    const [t_final, $t_final] = useState(10);
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState({
        main: [],
        controlled: [],
    });
    const [response, $response] = useState(null);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [N, $N] = useState(1000);
    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);
    const capture = () => {
        const capturedSystems = [...systems];

        if (capturedSystems.findIndex((sys) => G_s.equals(sys.H)) === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                G_s,
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
        if (G_s) {
            (async () => {
                try {
                    $response("$$" + G_s.label("H") + "$$");
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;
                    const all = {
                        main: Array(systems.length),
                        controlled: Array(systems.length),
                    };

                    for (let i = 0; i < systems.length; i++) {
                        if (i % 5 === 0) await browserLockBreaker();
                        all.main[i] = calculus.systemToTrace(
                            systems[i].G_s.bode,
                            +t_initial,
                            +t_final,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        all.controlled[i] = calculus.systemToTrace(
                            systems[i].G_s.phase,
                            +t_initial,
                            +t_final,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );

                        if (G_s.equals(systems[i].G_s)) repeatedSystem = true;
                    }

                    if (!repeatedSystem) {
                        const main = calculus.systemToTrace(
                                G_s.bode,
                                +t_initial,
                                +t_final,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            ),
                            controlled = calculus.systemToTrace(
                                G_s.phase,
                                +t_initial,
                                +t_final,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            );
                        all.main.push(main);
                        all.controlled.push(controlled);
                    }
                    $traces(all);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [G_s, systems, t_initial, t_final, is3DPlotEnabled, thickness, N]);

    useEffect(() => {
        try {
            if (
                rawNumerator.trim() !== currentRawNum ||
                rawDenominator.trim() !== currentRawDen
            ) {
                const num = calculus.stringToArray(rawNumerator),
                    den = calculus.stringToArray(rawDenominator);
                const g_s = new TransferFunction(num, den);
                currentRawNum = rawNumerator;
                currentRawDen = rawDenominator;
                $G_s(g_s);
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
                    <h2 className="chapter-section-title">کنترل کننده PID</h2>
                </Typography>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <Grid container direction="column" spacing={1}>
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
                                        sys.G_s.label("H", index + 1) +
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
                                <PIDParameters
                                    rawNumerator={rawNumerator}
                                    rawDenominator={rawDenominator}
                                    $rawNumerator={$rawNumerator}
                                    $rawDenominator={$rawDenominator}
                                    t_initial={t_initial}
                                    t_final={t_final}
                                    $t_initial={$t_initial}
                                    $t_final={$t_final}
                                    K_p={K_p}
                                    $K_p={$K_p}
                                    T_i={T_i}
                                    $T_i={$T_i}
                                    T_d={T_d}
                                    $T_d={$T_d}
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
                                    <Grid lg={9} md={9} sm={12} xs={12} item>
                                        <GraphBox
                                            title="پاسخ پله ی سیستم اولیه"
                                            traces={traces.main}
                                        />
                                    </Grid>
                                    <Grid lg={9} md={9} sm={12} xs={12} item>
                                        <GraphBox
                                            title="پاسخ پله ی سیستم کنترل شده"
                                            traces={traces.controlled}
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

export default PIDController;
