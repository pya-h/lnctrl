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

const symbols = {
    in: "jw",
    out: "G",
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
    const [controller, setController] = useState(null);
    const [t_initial, $t_initial] = useState(0);
    const [t_final, $t_final] = useState(10);
    // gradiant of u(t) is 0 and unit ramp is one
    const [traces, $traces] = useState({
        main: [],
        controlled: [],
    });
    const [solution, $solution] = useState([]);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [N, $N] = useState(1000);
    const [responseTime, setResponseTime] = useState(0);
    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);
    // const [currentProgressSignal, currentProgressSignal] = useState(new AbortController());
    useEffect(() => {
        // plot
        if (G_s) {
            (async () => {
                try {
                    const lp = G_s.stepify().laplaceInverse();
                    const controlledSystem = G_s.controlFeedback(controller);
                    const clp = controlledSystem.stepify().laplaceInverse();
                    $solution([
                        "$$" + G_s.label(symbols.out) + "$$",
                        "$$" + lp.$s.label("H") + "$$",
                        `$$h(t) = ${lp.$t.toString()}$$`,
                        <hr />,
                        `$$C_{PID}(s) = ${controller.toString()}$$`,
                        `$$C(s) = ${clp.$s.toString()}$$`,
                        `$$c(t) = ${clp.$t.toString()}$$`,
                        
                    ]);
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    const startTime = new Date();

                    const c_t = G_s.step();
                    let [x, y] = await calculus.pointifyAsync(
                        // c_t.$,
                        lp.$t.$,
                        +t_initial,
                        +t_final,
                        document.getElementById("pid_tune_progress"),
                        500,
                        +N
                    );
                    const main = calculus.arrayToTrace(
                        x,
                        y,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled
                    );
                    const c_pid = controlledSystem.step();
                    [x, y] = await calculus.pointifyAsync(
                        // c_pid.$,
                        clp.$t.$,
                        +t_initial,
                        +t_final,
                        document.getElementById("pid_tune_progress"),
                        500,
                        +N
                    );
                    const controlled = calculus.arrayToTrace(
                        x,
                        y,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled
                    );

                    $traces({ main: [main], controlled: [controlled] });
                    const endTime = new Date();
                    setResponseTime((+endTime - +startTime) / 1000);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [G_s, t_initial, t_final, controller, is3DPlotEnabled, thickness, N]);

    useEffect(() => {
        setController(TransferFunction.Shortcuts.$PID(K_p, T_i, T_d));
    }, [K_p, T_i, T_d]);
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
                // HOW TO CANCEL PREVIOUS ASYNC
                new AbortController().abort();
            }
        } catch (ex) {
            console.log(ex);
        }
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
                                {solution.map((sol) => (
                                    <Grid
                                        style={{ fontSize: "18px", textAlign: 'center' }}
                                        xs={12}
                                    >
                                        <MathJax>{sol}</MathJax>
                                    </Grid>
                                ))}
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
                                    responseTime={responseTime}
                                />
                            </Grid>
                        </Grid>
                        <Grid md={9} sm={12} xs={12} item>
                            <SubCard>
                                <GraphMenu
                                    reset={() => {
                                        $rawDenominator("1 1");
                                        $rawNumerator("1");
                                    }}
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
