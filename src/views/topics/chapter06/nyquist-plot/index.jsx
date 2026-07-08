// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { makeProgress } from "toolshed";
import NyquistPlotParameters from "./parameters";
import NyquistPlotLecture from "./lecture";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
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

// const revisePlot = (numerator, denominator, x, y) => {
//     let systemIsPainInTheA = true;
//     if (denominator.length === 3 && denominator[0] && denominator[1]) {
//         // just have a simple zero pole with degree 1
//         let max = 0;
//         const nearInfinityPole = -Math.abs(denominator[1]) / denominator[0];

//         const absP = Math.abs(nearInfinityPole);
//         for (let i = 0; i < x.length; i++) {
//             if (Math.abs(x[i]) + 0.001 >= absP || x[i] === 0) {
//                 delete x[i];
//                 delete y[i];
//             } else {
//                 const absy = Math.abs(y[i]);
//                 if (absy > max) max = absy;
//             }
//         }
//         x.push(nearInfinityPole - 0.001);
//         y.push(max * 10);
//         x.push(nearInfinityPole - 0.001);
//         y.push(-max * 10);

//         systemIsPainInTheA = false;
//     }
//     return { x, y, systemIsPainInTheA };
// };
let currentRawNum = "",
    currentRawDen = "";
const _1PlusJ = calculus.arrayToTrace([-1], [0], 1, "-1+0j", false, "markers");

class NyquistPlot extends TopicBaseComponent {
    state = {
        topicKey: "ch6-nyquist",
        rawNumerator: "1",
        rawDenominator: "1 1",
        fraction: [[1], [1, 1]],
        H_s: null,
        w_min: -50,
        w_max: 50,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: [],
        response: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        N: 10000,
        responseTime: null,
        method: "polar",
    };

    persistKeys = [
        "rawNumerator",
        "rawDenominator",
        "w_min",
        "w_max",
        "thickness",
        "N",
        "method",
    ];

    $rawNumerator = (value) => this.setState({ rawNumerator: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $fraction = (value) => this.setState({ fraction: value });
    $H_s = (value) => this.setState({ H_s: value });
    $w_min = (value) => this.setState({ w_min: value });
    $w_max = (value) => this.setState({ w_max: value });
    $systems = (value) => this.setState({ systems: value });
    $traces = (value) => this.setState({ traces: value });
    $response = (value) => this.setState({ response: value });
    $thickness = (value) => this.setState({ thickness: value });
    $graphCaptured = (value) => this.setState({ isGraphCatured: value });
    $N = (value) => this.setState({ N: value });
    setResponseTime = (value) => this.setState({ responseTime: value });
    changeMethod = (value) => this.setState({ method: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, H_s, thickness } = this.state;
        const capturedSystems = [...systems];

        if (capturedSystems.findIndex((sys) => H_s.equals(sys.H)) === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                H_s,
                thickness,
                legend:
                    symbols.out + "_{" + (systems.length + 1).toString() + "}",
            });
            this.$systems(capturedSystems);
            this.$graphCaptured(true);
        }
    };

    refreshTraces = () => {
        const {
            fraction,
            w_min,
            w_max,
            method,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
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
                    this.setState({ H_s: h_s });
                    this.setState({ response: "$$" + h_s.label("H") + "$$" });
                    this.setState({ responseTime: "Plotting" });
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
                        this.setState({
                            responseTime:
                                (+endTime - +startTime) / 1000 + " Seconds",
                        });
                        await makeProgress(currentPlotProgressBarElement, 100);
                    }
                    all.push(_1PlusJ);

                    this.setState({ traces: all });
                }
            } catch (ex) {
                console.log(ex);
            }
        })();
    };

    refreshFraction = () => {
        const { rawNumerator, rawDenominator } = this.state;
        if (
            rawNumerator.trim() !== currentRawNum ||
            rawDenominator.trim() !== currentRawDen
        ) {
            const num = calculus.stringToArray(rawNumerator),
                den = calculus.stringToArray(rawDenominator);
            currentRawDen = rawDenominator;
            currentRawNum = rawNumerator;
            this.$fraction([num, den]);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
        this.refreshFraction();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            fraction,
            w_min,
            w_max,
            method,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
            rawNumerator,
            rawDenominator,
        } = this.state;
        if (
            fraction !== prevState.fraction ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            method !== prevState.method ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.refreshFraction();

        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            rawNumerator,
            rawDenominator,
            w_min,
            w_max,
            systems,
            traces,
            response,
            isGraphCatured,
            N,
            responseTime,
            method,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">Nyquist plot</h2>
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
                                        $rawNumerator={this.$rawNumerator}
                                        $rawDenominator={this.$rawDenominator}
                                        w_min={w_min}
                                        w_max={w_max}
                                        $w_min={this.$w_min}
                                        $w_max={this.$w_max}
                                        responseTime={responseTime}
                                        N={N}
                                        $N={this.$N}
                                        method={method}
                                        changeMethod={this.changeMethod}
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
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="Nyquist plot"
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
    }
}

export default NyquistPlot;
