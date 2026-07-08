// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import DelayedSystemsExampleParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import DelayedSystemsLecture from "./lecture";
import {Exp} from "math/algebra/functions";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
const symbols = {
    in: "jw",
    out: "H",
};
let currentT_d = "",
    currentRawDen = "";
class DelayedSystemsExample extends TopicBaseComponent {
    state = {
        topicKey: "ch6-delayed",
        T_d: "1",
        rawDenominator: "1 1",
        H_s: null,
        NoDelayH_s: null,
        w_min: 0,
        w_max: 10,
        // gradiant of u(t) is 0 and unit ramp is one
        traces: {
            phase: [],
            amplitude: [],
            degreePhase: [],
        },
        responses: [],
        thickness: 1.0, // graph line thickness
        is3DPlotEnabled: false,
        phaseInRadianScale: true, // for degree => 180 / PI, for radian scale => 1.0
        N: 1000,
    };

    persistKeys = [
        "T_d",
        "rawDenominator",
        "w_min",
        "w_max",
        "thickness",
        "is3DPlotEnabled",
        "phaseInRadianScale",
        "N",
    ];

    $T_d = (value) => this.setState({ T_d: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $H_s = (value) => this.setState({ H_s: value });
    $NoDelayH_s = (value) => this.setState({ NoDelayH_s: value });
    $w_min = (value) => this.setState({ w_min: value });
    $w_max = (value) => this.setState({ w_max: value });
    $traces = (value) => this.setState({ traces: value });
    $responses = (value) => this.setState({ responses: value });
    $thickness = (value) => this.setState({ thickness: value });
    setPhaseInRadianScale = (value) =>
        this.setState({ phaseInRadianScale: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    refreshTraces = () => {
        const {
            H_s,
            NoDelayH_s,
            w_min,
            w_max,
            is3DPlotEnabled,
            thickness,
            N,
        } = this.state;
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
                            const complexForm = TransferFunction.PolarToCartesian(
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
                    this.$responses(res);
                    this.$traces(all);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    };

    refreshTransferFunctions = () => {
        const { T_d, rawDenominator } = this.state;
        try {
            if (
                (T_d && +T_d.trim() !== currentT_d) ||
                rawDenominator.trim() !== currentRawDen
            ) {
                const num = new Exp(1, -T_d, "s"),
                    den = calculus.stringToArray(rawDenominator);
                const h_s = new TransferFunction(num, den);
                this.setState({
                    H_s: h_s,
                    NoDelayH_s: new TransferFunction(1, den),
                });
                currentRawDen = rawDenominator;
                currentT_d = +T_d;
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
        this.refreshTransferFunctions();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            H_s,
            NoDelayH_s,
            w_min,
            w_max,
            is3DPlotEnabled,
            thickness,
            N,
            T_d,
            rawDenominator,
        } = this.state;
        if (
            H_s !== prevState.H_s ||
            NoDelayH_s !== prevState.NoDelayH_s ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            T_d !== prevState.T_d ||
            rawDenominator !== prevState.rawDenominator
        )
            this.refreshTransferFunctions();
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            T_d,
            rawDenominator,
            w_min,
            w_max,
            traces,
            responses,
            phaseInRadianScale,
            N,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        Time-delay systems
                    </h2>
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
                                        $T_d={this.$T_d}
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={9} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphMenu
                                        reset={() => {
                                            this.$T_d(1);
                                            this.$rawDenominator("1 1");
                                        }}
                                        update={(changes) => this.update(changes)}
                                        toggle3DPlot={this.toggle3DPlot}
                                    />
                                </SubCard>
                                <hr />
                                <Grid xs={12} spacing={gridSpacing} container>
                                    <Grid xs={12} item>
                                        <SubCard>
                                            <Grid xs={12} item>
                                                <PlotlyBox
                                                    logX={true}
                                                    title="Bode plot"
                                                    traces={traces.amplitude}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <PlotlyBox
                                                    title="Phase"
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
                                                    title="Nyquist plot"
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
    }
}

export default DelayedSystemsExample;
