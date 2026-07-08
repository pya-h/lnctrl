// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import NicolesChartParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { browserLockBreaker } from "toolshed";
import NicolesChartLecture from "./lecture";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
const symbols = {
    in: "jw",
    out: "H",
};
let currentRawNum = "",
    currentRawDen = "";

class NicolesChart extends TopicBaseComponent {
    state = {
        topicKey: "ch6-nicoles",
        rawNumerator: "1",
        rawDenominator: "1 1",
        H_s: null,
        w_min: 0,
        w_max: 10,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: {
            rad: [],
            deg: [],
        },
        response: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        phaseInRadianScale: true, // for degree => 180 / PI, for radian scale => 1.0
        N: 1000,
        K: 1,
        ktrace: {
            deg: [],
            rad: [],
        },
    };

    persistKeys = [
        "rawNumerator",
        "rawDenominator",
        "w_min",
        "w_max",
        "thickness",
        "phaseInRadianScale",
        "N",
        "K",
    ];

    $rawNumerator = (value) => this.setState({ rawNumerator: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $H_s = (value) => this.setState({ H_s: value });
    $w_min = (value) => this.setState({ w_min: value });
    $w_max = (value) => this.setState({ w_max: value });
    $systems = (value) => this.setState({ systems: value });
    $traces = (value) => this.setState({ traces: value });
    $response = (value) => this.setState({ response: value });
    $thickness = (value) => this.setState({ thickness: value });
    $graphCaptured = (value) => this.setState({ isGraphCatured: value });
    $3DPlotEnabled = (value) => this.setState({ is3DPlotEnabled: value });
    setPhaseInRadianScale = (value) =>
        this.setState({ phaseInRadianScale: value });
    $N = (value) => this.setState({ N: value });
    $K = (value) => this.setState({ K: value });
    $ktrace = (value) => this.setState({ ktrace: value });

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
            this.setState({
                systems: capturedSystems,
                isGraphCatured: true,
            });
        }
    };

    refreshTraces = () => {
        const { H_s, systems, w_min, w_max, is3DPlotEnabled, thickness, N } =
            this.state;
        // plot
        if (H_s instanceof TransferFunction) {
            (async () => {
                try {
                    const all = {
                        deg: Array(systems.length),
                        rad: Array(systems.length),
                    };
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;

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
                    this.setState({
                        response: "$$" + H_s.label("H") + "$$",
                        traces: all,
                    });
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    };

    multiplyPlotBy = (value) => {
        const { systems, H_s } = this.state;
        const currentLength = systems.length;
        const multipliedSystem = H_s.multiply(value);
        const newSystemList = systems.filter(
            (sys) => !sys.H_s.equals(multipliedSystem)
        );
        if (newSystemList.length === currentLength) this.capture();
        else this.$systems(newSystemList);
        this.$H_s(multipliedSystem);
    };

    refreshKTrace = () => {
        const { K, H_s, N, is3DPlotEnabled, w_min, w_max, thickness } =
            this.state;
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
            this.$ktrace({ rad, deg });
        } else this.$ktrace({ rad: [], phase: [] });
    };

    refreshHs = () => {
        const { rawNumerator, rawDenominator } = this.state;
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
                this.$H_s(h_s);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
        this.refreshKTrace();
        this.refreshHs();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            H_s,
            systems,
            w_min,
            w_max,
            is3DPlotEnabled,
            thickness,
            N,
            K,
            rawNumerator,
            rawDenominator,
        } = this.state;

        if (
            H_s !== prevState.H_s ||
            systems !== prevState.systems ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            K !== prevState.K ||
            H_s !== prevState.H_s ||
            N !== prevState.N ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            thickness !== prevState.thickness
        )
            this.refreshKTrace();

        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.refreshHs();

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
            phaseInRadianScale,
            N,
            ktrace,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">Nichols chart</h2>
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
                                        $rawNumerator={this.$rawNumerator}
                                        $rawDenominator={this.$rawDenominator}
                                        w_min={w_min}
                                        w_max={w_max}
                                        $w_min={this.$w_min}
                                        $w_max={this.$w_max}
                                        phaseInRadianScale={phaseInRadianScale}
                                        setPhaseInRadianScale={
                                            this.setPhaseInRadianScale
                                        }
                                        N={N}
                                        $N={this.$N}
                                        $K={this.$K}
                                        multiplier={this.multiplyPlotBy}
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
                                                title="Nichols chart"
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
    }
}

export default NicolesChart;
