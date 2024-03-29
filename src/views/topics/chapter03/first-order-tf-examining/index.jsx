import FirstOrderTfLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import FirstOrderTfParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { getCache, cacheParameters } from 'toolshed';


const realCoeficientValue = (coef) => {
    if (coef === -1) return "-";
    if (coef === 1) return "";
    return calculus.strictPrecisionFormat(coef);
};

const realAdditionTermsValue = (term) =>
    term > 0
        ? " + " + calculus.strictPrecisionFormat(term)
        : " - " + calculus.strictPrecisionFormat(term) * -1;

const realAdditionalCoefficientValue = (coef) => {
    let result = "";
    if (coef < 0) {
        result += "-";
        coef *= -1;
    } else if (coef > 0) result += "+";
    if (coef !== 1) result += calculus.strictPrecisionFormat(coef);
    return result;
};
const stepResponse = (k, a) =>
    "$$\\begin{cases}G(s) = " +
    TransferFunction.Shortcuts.$1(k, -a).toString() +
    (a !== 0
        ? " \\\\ \\\\ c(t) = " +
          realCoeficientValue(k / a) +
          "(1 - e^{" +
          realCoeficientValue(-a) +
          "t})u(t) "
        : "} \\\\ \\\\ c(t) = tu(t) ") +
    "\\end{cases}$$";

const indexedStepResponse = (k, a, index) =>
    "$$\\begin{cases}G_{" +
    index +
    "}(s) = " +
    TransferFunction.Shortcuts.$1(k, -a).toString() +
    (a !== 0
        ? " \\\\ \\\\ c_{" +
          index +
          "}(t) = " +
          realCoeficientValue(k / a) +
          "(1 - e^{" +
          realCoeficientValue(-a) +
          "t})u(t)"
        : " \\\\ \\\\ c_{" + index + "}(t) = tu(t)") +
    "\\end{cases}$$";

const rampResponse = (k, a) =>
    "$$\\begin{cases}G(s) = " +
    TransferFunction.Shortcuts.$1(k, -a).toString() +
    (a !== 0
        ? " \\\\ \\\\ c(t) = " +
          realCoeficientValue(k / a) +
          "(t" +
          realAdditionTermsValue(-1 / a) +
          ")u(t)" +
          realAdditionalCoefficientValue(k / (a * a)) +
          "e^{" +
          realCoeficientValue(-a) +
          "t}u(t) "
        : "} \\\\ \\\\ c(t) = t^2u(t) ") +
    "\\end{cases}$$";

const indexedRampResponse = (k, a, index) =>
    "$$\\begin{cases}G_{" +
    index +
    "}(s) = " +
    TransferFunction.Shortcuts.$1(k, -a).toString() +
    (a !== 0
        ? " \\\\ \\\\ c_{" +
          index +
          "}(t) = " +
          realCoeficientValue(k / a) +
          "(t" +
          realAdditionTermsValue(-1 / a) +
          ")u(t)" +
          realAdditionalCoefficientValue(k / (a * a)) +
          "e^{" +
          realCoeficientValue(-a) +
          "t}u(t) "
        : "} \\\\ \\\\ c_{" + index + "}(t) = t^2u(t) ") +
    "\\end{cases}$$";

const symbols = {
    in: "t",
    out: "c",
};

const FirstOrderTransferFunctionExamining = () => {

    const [a, $a] = useState(getCache("ch3-1tf", "a", 1.0));
    const [k, $k] = useState(getCache("ch3-1tf", "k", 1.0));
    const [t_i, $t_i] = useState(getCache("ch3-1tf", "t_i", 0));
    const [t_f, $t_f] = useState(getCache("ch3-1tf", "t_f", 5));
    const [inputSignal, $inputSignal] = useState(getCache("ch3-1tf", "inputSignal", 0)); // 0 as step | 1 as ramp === assume this state's value as the gradiant value of th input signal function
    // gradiant of u(t) is 0 and unit ramp is one
    const [systems, $systems] = useState([]);
    const [traces, $traces] = useState([]);
    const [response, $response] = useState(null);
    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, $graphCaptured] = useState(false);
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [N, $N] = useState(1000);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) =>
                sys.a === +a && sys.k === +k && sys.inputSignal === inputSignal
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                a: +a,
                k: +k,
                inputSignal,
                thickness,
                legend:
                    "$$" +
                    symbols.out +
                    "_{" +
                    (systems.length + 1).toString() +
                    "}$$",
            });
            $systems(capturedSystems);
            $graphCaptured(true);
        }
    };

    useEffect(() => {
        let g_t = null;
        if (!inputSignal) {
            // step
            g_t = calculus.LTI.step(1, +k, +a);
            $response(stepResponse(+k, +a));
        } else {
            g_t = calculus.LTI.ramp(1, +k, +a);
            $response(rampResponse(+k, +a));
        }
        const [x, y] = calculus.pointify(g_t, +t_i, +t_f, +N);
        // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
        // so that the traces will be loaded with new conditions
        const all = systems.map((e, index) => {
            let g_t = null;

            if (!e.inputSignal) {
                // step
                g_t = calculus.LTI.step(1, e.k, e.a);
            } else {
                g_t = calculus.LTI.ramp(1, e.k, e.a);
            }
            const [xi, yi] = calculus.pointify(g_t, +t_i, +t_f, +N);

            return {
                x: xi,
                y: yi,
                z: is3DPlotEnabled ? Array(xi.length).fill(0) : null,
                line: {
                    // color: e.color...
                    width: e.thickness,
                },
                // color,
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                mode: "lines",
                name: e.legend,
            };
        });

        const index = systems.findIndex(
            (sys) =>
                sys.a === +a && sys.k === +k && sys.inputSignal === inputSignal
        );
        if (index === -1)
            // if current system isnt in traces list => add it temperory to plot
            all.push({
                x,
                y,
                z: is3DPlotEnabled ? Array(x.length).fill(0) : null,
                // color,
                line: {
                    // color:'rgb(17, 157, 255)'
                    width: thickness,
                },
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                mode: "lines",
                name: `${symbols.out}(${symbols.in})`,
            });

        $traces(all);
        cacheParameters("ch3-1tf", {a, k, t_i, t_f, inputSignal});
    }, [a, k, t_i, t_f, inputSignal, is3DPlotEnabled, thickness, systems, N]);

    useEffect(() => {
        $graphCaptured(false);
    }, [a, k, inputSignal]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        توابع تبدیل مرتبه یک
                    </h2>
                </Typography>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <Grid container direction="column" spacing={1}>
                    <Grid
                        style={{
                            width: "100%",
                            height: "100%",
                            margin: "auto",
                            direction: "ltr",
                        }}
                        item
                    >
                        <FirstOrderTfLecture />
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
                                    let formula = null;
                                    if (!sys.inputSignal)
                                        formula = indexedStepResponse(
                                            sys.k,
                                            sys.a,
                                            index + 1
                                        );
                                    else
                                        formula = indexedRampResponse(
                                            sys.k,
                                            sys.a,
                                            index + 1
                                        );

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
                                <FirstOrderTfParameters
                                    a={a}
                                    k={k}
                                    t_i={t_i}
                                    t_f={t_f}
                                    $a={$a}
                                    $k={$k}
                                    $t_i={$t_i}
                                    $t_f={$t_f}
                                    inputSignal={inputSignal}
                                    $inputSignal={$inputSignal}
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
                                    <PlotlyBox
                                        title="پاسخ پله/رمپ"
                                        traces={traces}
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

export default FirstOrderTransferFunctionExamining;
