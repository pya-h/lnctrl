import RCFilterFrequencyResponseLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import RCFilterFrequencyResponseParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
const symbols = {
    in: "jw",
    out: "H",
};

class RCFilterFrequencyResponseExample extends TopicBaseComponent {
    state = {
        topicKey: "ch6-rcfilter",
        R: 0.001,
        C: 1.0,
        H_s: null,
        w_min: -5,
        w_max: 5,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: {
            phase: [],
            amplitude: [],
            degreePhase: [],
        },
        response: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        phaseInRadianScale: true, // for degree => 180 / PI, for radian scale => 1.0
        N: 1000,
    };

    persistKeys = [
        "R",
        "C",
        "w_min",
        "w_max",
        "thickness",
        "phaseInRadianScale",
        "N",
    ];

    $R = (value) => this.setState({ R: value });
    $C = (value) => this.setState({ C: value });
    $H_s = (value) => this.setState({ H_s: value });
    $w_min = (value) => this.setState({ w_min: value });
    $w_max = (value) => this.setState({ w_max: value });
    $systems = (value) => this.setState({ systems: value });
    $traces = (value) => this.setState({ traces: value });
    $response = (value) => this.setState({ response: value });
    $thickness = (value) => this.setState({ thickness: value });
    $graphCaptured = (value) => this.setState({ isGraphCatured: value });
    setPhaseInRadianScale = (value) =>
        this.setState({ phaseInRadianScale: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, R, C, H_s, thickness } = this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) => sys.R === +R && sys.C === +C
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                R: +R,
                C: +C,
                H_s,
                thickness,
                legend:
                    symbols.out + "_{" + (systems.length + 1).toString() + "}",
            });
            this.setState({ systems: capturedSystems, isGraphCatured: true });
        }
    };

    refreshTraces = () => {
        const { R, C, w_min, w_max, is3DPlotEnabled, thickness, systems, N } =
            this.state;
        try {
            const h_s = new TransferFunction([1], [+R * +C * 1000, 1]);
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            let repeatedSystem = false;
            const all = {
                amplitude: Array(systems.length),
                phase: Array(systems.length),
                degreePhase: Array(systems.length),
            };

            for (let i = 0; i < systems.length; i++) {
                all.amplitude[i] = calculus.systemToTrace(
                    systems[i].H_s.amplitude,
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
                all.degreePhase[i] = { ...all.phase[i] };
                all.degreePhase[i].y = all.degreePhase[i].y.map(
                    (yi) => yi * calculus.RadianToDegree
                );
                if (h_s.equals(systems[i].H_s)) repeatedSystem = true;
            }

            if (!repeatedSystem) {
                // if current system isnt in traces list => add it temperory to plot
                const amp = calculus.systemToTrace(
                        h_s.amplitude,
                        +w_min,
                        +w_max,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled,
                        +N
                    ),
                    phase = calculus.systemToTrace(
                        h_s.phase,
                        +w_min,
                        +w_max,
                        thickness,
                        `${symbols.out}(${symbols.in})`,
                        is3DPlotEnabled,
                        +N
                    );
                const degreePhase = { ...phase };
                degreePhase.y = degreePhase.y.map(
                    (yi) => yi * calculus.RadianToDegree
                );

                all.phase.push(phase);
                all.degreePhase.push(degreePhase);
                all.amplitude.push(amp);
            }

            this.setState({
                H_s: h_s,
                response: "$$" + h_s.label("H") + "$$",
                traces: all,
            });
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const { R, C, w_min, w_max, is3DPlotEnabled, thickness, systems, N } =
            this.state;
        if (
            R !== prevState.R ||
            C !== prevState.C ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (R !== prevState.R || C !== prevState.C)
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            C,
            R,
            w_min,
            w_max,
            systems,
            traces,
            response,
            isGraphCatured,
            phaseInRadianScale,
            N,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        Frequency response of the RC filter
                    </h2>
                </Grid>
                <Grid item spacing={gridSpacing}>
                    <Grid container direction="column" spacing={gridSpacing}>
                        <Grid
                            style={{
                                width: "100%",
                                height: "100%",
                                margin: "auto",
                            }}
                            item
                        >
                            <RCFilterFrequencyResponseLecture />
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
                                    <RCFilterFrequencyResponseParameters
                                        C={C}
                                        R={R}
                                        $C={(value) => {
                                            if (value >= 0) this.$C(value);
                                        }}
                                        $R={(value) => {
                                            if (value >= 0) this.$R(value);
                                        }}
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
                                        <Grid
                                            spacing={gridSpacing}
                                            direction="row"
                                            container
                                        >
                                            <Grid xs={12} item>
                                                <PlotlyBox
                                                    title="Magnitude"
                                                    traces={traces.amplitude}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <PlotlyBox
                                                    title="Phase"
                                                    traces={
                                                        phaseInRadianScale
                                                            ? traces.phase
                                                            : traces.degreePhase
                                                    }
                                                />
                                            </Grid>
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

export default RCFilterFrequencyResponseExample;
