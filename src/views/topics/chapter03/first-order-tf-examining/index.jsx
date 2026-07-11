import FirstOrderTfLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import FirstOrderTfParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import TopicBaseComponent from "views/topics/TopicBaseComponent";


const realCoeficientValue = (coef) => {
    if (coef === -1) return "-";
    if (coef === 1) return "";
    return calculus.strictPrecisionFormat(coef);
};

const realAdditionTermsValue = (term) =>
    term > 0
        ? " + " + calculus.strictPrecisionFormat(term)
        : " - " + calculus.strictPrecisionFormat(-term);

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

class FirstOrderTransferFunctionExamining extends TopicBaseComponent {
    state = {
        topicKey: "ch3-1tf",
        a: 1.0,
        k: 1.0,
        t_i: 0,
        t_f: 5,
        inputSignal: 0, // 0 as step | 1 as ramp === assume this state's value as the gradiant value of th input signal function
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: [],
        response: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        N: 1000,
        isAutoPlaying: false,
        autoYRange: undefined,
    };

    persistKeys = ["a", "k", "t_i", "t_f", "inputSignal", "thickness", "N"];

    setAutoPlaying = (value, sweep) =>
        this.setState({
            isAutoPlaying: value,
            // freeze the y-axis over the whole sweep so the graph doesn't keep
            // rescaling itself and hiding how much it is actually changing
            autoYRange: value && sweep ? this.autoPlayYRange(sweep) : undefined,
        });

    autoPlayYRange = ({ key, from, to, step }) => {
        const { k, a, inputSignal, t_i, t_f, N, systems } = this.state;
        let lo = Infinity;
        let hi = -Infinity;
        const fold = (ys) =>
            ys.forEach((v) => {
                if (v < lo) lo = v;
                if (v > hi) hi = v;
            });
        const responseOf = (kk, aa) =>
            inputSignal ? calculus.LTI.ramp(1, kk, aa) : calculus.LTI.step(1, kk, aa);
        // captured curves stay on the plot, so keep them inside the frozen frame
        systems.forEach((e) => fold(calculus.pointify(responseOf(e.k, e.a), +t_i, +t_f, +N)[1]));
        // walk the swept parameter across its whole travel; the last frame always
        // lands exactly on `to`, so fold that in too or it can clip past the frame
        const frames = Math.floor(Math.abs((to - from) / step));
        const foldAt = (value) =>
            fold(
                calculus.pointify(
                    responseOf(key === "k" ? value : +k, key === "a" ? value : +a),
                    +t_i,
                    +t_f,
                    +N
                )[1]
            );
        const samples = Math.min(frames, 60);
        if (samples <= 0) {
            foldAt(from);
            foldAt(to);
        } else {
            for (let i = 0; i <= samples; i++)
                foldAt(from + ((to - from) * i) / samples);
        }
        if (!isFinite(lo) || !isFinite(hi)) return undefined;
        const pad = (hi - lo) * 0.05 || 1;
        return [lo - pad, hi + pad];
    };

    $a = (value) => this.setState({ a: value });
    $k = (value) => this.setState({ k: value });
    $t_i = (value) => this.setState({ t_i: value });
    $t_f = (value) => this.setState({ t_f: value });
    $inputSignal = (value) => this.setState({ inputSignal: value });
    $systems = (value) => this.setState({ systems: value });
    $thickness = (value) => this.setState({ thickness: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, a, k, inputSignal, thickness } = this.state;
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
            this.setState({ systems: capturedSystems, isGraphCatured: true });
        }
    };

    refreshTraces = () => {
        const {
            a,
            k,
            t_i,
            t_f,
            inputSignal,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        let g_t = null;
        let response = null;
        if (!inputSignal) {
            // step
            g_t = calculus.LTI.step(1, +k, +a);
            response = stepResponse(+k, +a);
        } else {
            g_t = calculus.LTI.ramp(1, +k, +a);
            response = rampResponse(+k, +a);
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

        this.setState({ traces: all, response });
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            a,
            k,
            t_i,
            t_f,
            inputSignal,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        if (
            a !== prevState.a ||
            k !== prevState.k ||
            t_i !== prevState.t_i ||
            t_f !== prevState.t_f ||
            inputSignal !== prevState.inputSignal ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            a !== prevState.a ||
            k !== prevState.k ||
            inputSignal !== prevState.inputSignal
        )
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            a,
            k,
            t_i,
            t_f,
            inputSignal,
            systems,
            traces,
            response,
            isGraphCatured,
            N,
            isAutoPlaying,
            autoYRange,
        } = this.state;

        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        First-order transfer functions
                    </h2>
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
                                        $a={this.$a}
                                        $k={this.$k}
                                        $t_i={this.$t_i}
                                        $t_f={this.$t_f}
                                        inputSignal={inputSignal}
                                        $inputSignal={this.$inputSignal}
                                        N={N}
                                        $N={this.$N}
                                        isAutoPlaying={isAutoPlaying}
                                        setAutoPlaying={this.setAutoPlaying}
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={9} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphMenu
                                        capture={this.capture}
                                        reset={() => this.$systems([])}
                                        update={(changes) => this.update(changes)}
                                        toggle3DPlot={this.toggle3DPlot}
                                    />
                                </SubCard>
                                <hr />
                                <Grid xs={12} item>
                                    <SubCard>
                                        <PlotlyBox
                                            title="Step/ramp response"
                                            traces={traces}
                                            yRange={autoYRange}
                                        />
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        );
    }
}

export default FirstOrderTransferFunctionExamining;
