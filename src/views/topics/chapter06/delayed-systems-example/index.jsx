// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import DelayedSystemsExampleParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import DelayedSystemsLecture from "./lecture";
import Exp from "math/algebra/functions/exp";
const symbols = {
    in: "jw",
    out: "H",
};
let currentT_d = "",
    currentRawDen = "";
const DelayedSystemsExample = () => {
    const [T_d, $T_d] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 1");
    const [H_s, $H_s] = useState(null);
    const [NoDelayH_s, $NoDelayH_s] = useState(null);
    const [w_min, $w_min] = useState(0);
    const [w_max, $w_max] = useState(10);
    // gradiant of u(t) is 0 and unit ramp is one
    const [traces, $traces] = useState({
        phase: [],
        amplitude: [],
        degreePhase: [],
    });
    const [responses, $responses] = useState([]);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [phaseInRadianScale, setPhaseInRadianScale] = useState(true); // for degree => 180 / PI, for radian scale => 1.0
    const [N, $N] = useState(1000);
    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    useEffect(() => {
        // plot
        if (H_s instanceof TransferFunction) {
            (async () => {
                try {
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    const td = H_s.getA().getB();
                    const systems = [
                        {
                            H: NoDelayH_s,
                            legend: `${symbols.out}_0(${symbols.in})`,
                            color: "blue",
                        },
                        {
                            H: H_s,
                            legend: `${symbols.out}_{${td}}(${symbols.in})`,
                            color: "coral",
                        },
                    ];
                    const res = [];
                    const all = {
                        phase: Array(systems.length),
                        degreePhase: Array(systems.length),
                        amplitude: Array(systems.length),
                        nyquist: Array(systems.length),
                    };
                    for (let i = 0; i < systems.length; i++) {
                        all.amplitude[i] = calculus.systemToTrace(
                            systems[i].H.bode,
                            +w_min,
                            +w_max,
                            thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        all.phase[i] = calculus.systemToTrace(
                            systems[i].H.phase,
                            +w_min,
                            +w_max,
                            thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        all.degreePhase[i] = { ...all.phase[i] };
                        all.degreePhase[i].y = all.degreePhase[i].y.map(
                            (yi) => yi * calculus.RadianToDegree
                        );
                        const nx = Array(all.amplitude[i].y.length),
                            ny = Array(all.amplitude[i].y.length);
                        for (let j = 0; j < nx.length; j++) {
                            const complexForm = TransferFunction.PolarToComplex(
                                all.amplitude[i].y[j],
                                all.phase[i].y[j]
                            );
                            nx[j] = complexForm.real();
                            ny[j] = complexForm.imaginary();
                        }
                        all.nyquist[i] = calculus.arrayToTrace(
                            nx,
                            ny,
                            thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        res.push({
                            color: systems[i].color,
                            text:
                                "$$" +
                                systems[i].H.label("H", i === 1 ? td : 0) +
                                "$$",
                        });
                    }
                    $responses(res);
                    $traces(all);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [H_s, NoDelayH_s, w_min, w_max, is3DPlotEnabled, thickness, N]);

    useEffect(() => {
        try {
            if (
                (T_d && +T_d.trim() !== currentT_d) ||
                rawDenominator.trim() !== currentRawDen
            ) {
                const num = new Exp(1, -T_d, "s"),
                    den = calculus.stringToArray(rawDenominator);
                const h_s = new TransferFunction(num, den);
                $H_s(h_s);
                $NoDelayH_s(new TransferFunction(1, den));
                currentRawDen = rawDenominator;
                currentT_d = +T_d;
            }
        } catch (ex) {
            console.log(ex);
        }
    }, [T_d, rawDenominator]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        سیستم های تاخیردار
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
                        <DelayedSystemsLecture />
                    </Grid>
                    <Grid sx={{ margin: "auto", width: "100%" }} item>
                        <SubCard sx={{ direction: "ltr" }}>
                            <Grid
                                id="formulaBox"
                                sx={{ margin: "auto" }}
                                container
                                direction="row"
                            >
                                {responses.length > 0 &&
                                    responses.map((formula) => (
                                        <Grid
                                            style={{
                                                fontSize: "18px",
                                                color: formula.color,
                                            }}
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <MathJax>{formula.text}</MathJax>
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
                                <DelayedSystemsExampleParameters
                                    T_d={T_d}
                                    rawDenominator={rawDenominator}
                                    $T_d={$T_d}
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
                                    reset={() => {
                                        $T_d(1);
                                        $rawDenominator("1 1");
                                    }}
                                    update={(changes) => update(changes)}
                                    toggle3DPlot={toggle3DPlot}
                                />
                            </SubCard>
                            <hr />
                            <Grid xs={12} spacing={gridSpacing} container>
                                <Grid xs={12} item>
                                    <SubCard>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                logX={true}
                                                title="نمودار بود"
                                                traces={traces.amplitude}
                                            />
                                        </Grid>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="فاز"
                                                logX={true}
                                                traces={
                                                    phaseInRadianScale
                                                        ? traces.phase
                                                        : traces.degreePhase
                                                }
                                            />
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid xs={12} item>
                                    <SubCard>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="نمودار نایکويیست"
                                                traces={traces.nyquist}
                                            />
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default DelayedSystemsExample;
