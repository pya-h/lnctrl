// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import PIDParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

const symbols = {
    in: "jw",
    out: "G",
};
let currentRawNum = "",
    currentRawDen = "";
// ********************* SYSTEMS THAT HAVE BUG ****************************//
// DEN = [1 1 2 2]
class PIDController extends TopicBaseComponent {
    state = {
        topicKey: "ch7-pid",
        rawNumerator: "1",
        rawDenominator: "1 1",
        G_s: null,
        K_p: 1,
        T_i: 0,
        T_d: 0,
        controller: null,
        t_initial: 0,
        t_final: 10,
        // gradiant of u(t) is 0 and unit ramp is one
        traces: {
            main: [],
            controlled: [],
        },
        solution: [],
        thickness: 1.0, // graph line thickness
        is3DPlotEnabled: false,
        N: 1000,
        responseTime: 0,
    };

    persistKeys = [
        "rawNumerator",
        "rawDenominator",
        "K_p",
        "T_i",
        "T_d",
        "t_initial",
        "t_final",
        "thickness",
        "N",
        "is3DPlotEnabled",
    ];

    $rawNumerator = (value) => this.setState({ rawNumerator: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $G_s = (value) => this.setState({ G_s: value });
    $K_p = (value) => this.setState({ K_p: value });
    $T_i = (value) => this.setState({ T_i: value });
    $T_d = (value) => this.setState({ T_d: value });
    setController = (value) => this.setState({ controller: value });
    $t_initial = (value) => this.setState({ t_initial: value });
    $t_final = (value) => this.setState({ t_final: value });
    $traces = (value) => this.setState({ traces: value });
    $solution = (value) => this.setState({ solution: value });
    $thickness = (value) => this.setState({ thickness: value });
    $N = (value) => this.setState({ N: value });
    setResponseTime = (value) => this.setState({ responseTime: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));
    // const [currentProgressSignal, currentProgressSignal] = useState(new AbortController());
    // EDIT J * J
    refreshTraces = () => {
        const {
            G_s,
            t_initial,
            t_final,
            controller,
            is3DPlotEnabled,
            thickness,
            N,
        } = this.state;
        // plot
        if (G_s instanceof TransferFunction) {
            (async () => {
                try {
                    const lp = G_s.stepify().laplaceInverse();
                    const controlledSystem = G_s.controlFeedback(controller);
                    const clp = controlledSystem.stepify().laplaceInverse();
                    this.$solution([
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

                    // const c_t = G_s.step();
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
                    // const c_pid = controlledSystem.step();
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

                    this.$traces({ main: [main], controlled: [controlled] });
                    const endTime = new Date();
                    this.setResponseTime((+endTime - +startTime) / 1000);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    };

    refreshController = () => {
        const { K_p, T_i, T_d } = this.state;
        this.setController(TransferFunction.Shortcuts.$PID(K_p, T_i, T_d));
    };

    refreshTransferFunction = () => {
        const { rawNumerator, rawDenominator } = this.state;
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
                this.$G_s(g_s);
                // HOW TO CANCEL PREVIOUS ASYNC
                new AbortController().abort();
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
        this.refreshController();
        this.refreshTransferFunction();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            G_s,
            t_initial,
            t_final,
            controller,
            is3DPlotEnabled,
            thickness,
            N,
            K_p,
            T_i,
            T_d,
            rawNumerator,
            rawDenominator,
        } = this.state;
        if (
            G_s !== prevState.G_s ||
            t_initial !== prevState.t_initial ||
            t_final !== prevState.t_final ||
            controller !== prevState.controller ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            K_p !== prevState.K_p ||
            T_i !== prevState.T_i ||
            T_d !== prevState.T_d
        )
            this.refreshController();

        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.refreshTransferFunction();
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            rawNumerator,
            rawDenominator,
            t_initial,
            t_final,
            K_p,
            T_i,
            T_d,
            N,
            responseTime,
            traces,
            solution,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">PID controller</h2>
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
                                            style={{
                                                fontSize: "18px",
                                                textAlign: "center",
                                            }}
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
                                        $rawNumerator={this.$rawNumerator}
                                        $rawDenominator={this.$rawDenominator}
                                        t_initial={t_initial}
                                        t_final={t_final}
                                        $t_initial={this.$t_initial}
                                        $t_final={this.$t_final}
                                        K_p={K_p}
                                        $K_p={this.$K_p}
                                        T_i={T_i}
                                        $T_i={this.$T_i}
                                        T_d={T_d}
                                        $T_d={this.$T_d}
                                        N={N}
                                        $N={this.$N}
                                        responseTime={responseTime}
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={9} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphMenu
                                        reset={() => {
                                            this.$rawDenominator("1 1");
                                            this.$rawNumerator("1");
                                        }}
                                        update={(changes) => this.update(changes)}
                                        toggle3DPlot={this.toggle3DPlot}
                                    />
                                </SubCard>
                                <hr />
                                <Grid xs={12} item>
                                    <SubCard>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="Step Response of the Initial System"
                                                traces={traces.main}
                                            />
                                        </Grid>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="Step Response of the Controlled System"
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
    }
}

export default PIDController;
