// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import BodePlotParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { browserLockBreaker } from "toolshed";
import BodePlotExampleLecture from "./lecture";
const symbols = {
    in: "jw",
    out: "H",
};

const BodePlotExample = () => {
    const [K, $K] = useState(1);
    const [t_a, $t_a] = useState(0.1);
    const [t_b, $t_b] = useState(0.2);
    const [t_1, $t_1] = useState(0.3);
    const [t_2, $t_2] = useState(0.4);
    const [t_3, $t_3] = useState(0.5);
    const [t_4, $t_4] = useState(0.6);
    const [H_s, $H_s] = useState(null);
    const [w_min, $w_min] = useState(0);
    const [w_max, $w_max] = useState(20);
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
        // plot
        if (H_s instanceof TransferFunction) {
            (async () => {
                try {
                    $response("$$" + H_s.label("H") + "$$");
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;
                    const all = {
                        amplitude: Array(systems.length),
                        phase: Array(systems.length),
                        degreePhase: Array(systems.length),
                    };

                    for (let i = 0; i < systems.length; i++) {
                        if (i % 5 === 0) await browserLockBreaker();
                        all.amplitude[i] = calculus.systemToTrace(
                            systems[i].H_s.bode,
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
                        all.phase[i].y = all.phase[i].y.map(
                            (phi) => (phi - 2 * Math.PI) % (2 * Math.PI)
                        );
                        all.degreePhase[i] = { ...all.phase[i] };
                        all.degreePhase[i].y = all.degreePhase[i].y.map(
                            (yi) => yi * calculus.RadianToDegree
                        );
                        if (H_s.equals(systems[i].H_s)) repeatedSystem = true;
                    }

                    if (!repeatedSystem) {
                        const amp = calculus.systemToTrace(
                                H_s.bode,
                                +w_min,
                                +w_max,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            ),
                            phase = calculus.systemToTrace(
                                H_s.phase,
                                +w_min,
                                +w_max,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            );
                        phase.y = phase.y.map(
                            (phi) => (phi - 2 * Math.PI) % (2 * Math.PI)
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
        try {
            const k = +K,
                ta = +t_a,
                tb = +t_b;
            const tau = [+t_1, +t_2, +t_3, +t_4];

            const num = [k * ta * tb, k * (ta + tb), k],
                den = Array(6).fill(0);
            den[5] = 0;
            den[4] = 1;
            den[0] = 1;

            for (let i = 0; i <= 3; i++) {
                den[0] *= tau[i];

                for (let j = i + 1; j <= 3; j++) {
                    den[2] += tau[i] * tau[j];
                }

                den[3] += tau[i];
            }
            den[1] +=
                (tau[0] + tau[1]) * tau[2] * tau[3] +
                (tau[2] + tau[3]) * tau[0] * tau[1];
            const h_s = new TransferFunction(num, den);
            $H_s(h_s);
        } catch (ex) {
            console.log(ex);
        }
    }, [K, t_a, t_b, t_1, t_2, t_3, t_4]);

    useEffect(() => {
        $graphCaptured(false);
    }, [K, t_a, t_b, t_1, t_2, t_3, t_4]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid xs={12} item>
                        <BodePlotExampleLecture />
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
                                <BodePlotParameters
                                    K={K}
                                    $K={$K}
                                    t_a={t_a}
                                    $t_a={$t_a}
                                    t_b={t_b}
                                    $t_b={$t_b}
                                    t_1={t_1}
                                    $t_1={$t_1}
                                    t_2={t_2}
                                    $t_2={$t_2}
                                    t_3={t_3}
                                    $t_3={$t_3}
                                    t_4={t_4}
                                    $t_4={$t_4}
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default BodePlotExample;
