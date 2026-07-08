// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import NCircleParameters from "./parameters";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import NCircleLecture from "./lecture";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
const x_i = -2;
const x_f = 2;

class NCircle extends TopicBaseComponent {
    state = {
        topicKey: "ch6-ncircle",
        N: 1,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: [],
        thickness: 1.0, // graph line thickness
        is3DPlotEnabled: false,
        phaseInRadianScale: false, // for degree => 180 / PI, for radian scale => 1.0
        iterations: 10000,
    };

    persistKeys = ["N", "thickness", "phaseInRadianScale", "iterations"];

    $N = (value) => this.setState({ N: value });
    $systems = (value) => this.setState({ systems: value });
    $thickness = (value) => this.setState({ thickness: value });
    setPhaseInRadianScale = (value) =>
        this.setState({ phaseInRadianScale: value });
    $iterations = (value) => this.setState({ iterations: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, N, phaseInRadianScale, thickness } = this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex((sys) => sys.N === +N);
        if (index === -1) {
            const n = phaseInRadianScale ? +N : +N * calculus.DegreeToRadian;
            const unit = phaseInRadianScale ? "rad" : "°";
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                N: n,
                legend: `N = ${+N} ${unit}`,
                thickness,
            });
            this.$systems(capturedSystems);
        }
    };

    refreshTraces = () => {
        const { N, is3DPlotEnabled, thickness, systems, iterations, phaseInRadianScale } =
            this.state;
        try {
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            let repeatedSystem = false;
            const all = Array(systems.length);
            let n = +N,
                legend = `N = ${+N} rad`;
            if (!phaseInRadianScale) {
                legend = `N = ${+N} °`;
                n *= calculus.DegreeToRadian;
            }
            for (let i = 0; i < systems.length; i++) {
                const [x, y] = calculus.nCircle(
                    systems[i].N,
                    x_i,
                    x_f,
                    +iterations
                );
                all[i] = calculus.arrayToTrace(
                    [...x, ...x],
                    [...y, ...y.map((yi) => -yi)],
                    thickness,
                    systems[i].legend,
                    is3DPlotEnabled
                );
                if (legend === systems[i].legend) repeatedSystem = true;
            }

            if (!repeatedSystem) {
                // if current system isnt in traces list => add it temperory to plot

                const [x, y] = calculus.nCircle(n, x_i, x_f, +iterations);
                all.push(
                    calculus.arrayToTrace(
                        [...x, ...x],
                        [...y, ...y.map((yi) => -yi)],
                        thickness,
                        legend,
                        is3DPlotEnabled
                    )
                );
            }

            this.setState({ traces: all });
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const { N, is3DPlotEnabled, thickness, systems, iterations, phaseInRadianScale } =
            this.state;
        if (
            N !== prevState.N ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            iterations !== prevState.iterations ||
            phaseInRadianScale !== prevState.phaseInRadianScale
        )
            this.refreshTraces();
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const { N, phaseInRadianScale, iterations, traces } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        Constant-phase locus (N-circle)
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
                            <NCircleLecture />
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
                                    <NCircleParameters
                                        N={N}
                                        $N={(value) => value && this.$N(value)}
                                        phaseInRadianScale={phaseInRadianScale}
                                        setPhaseInRadianScale={
                                            this.setPhaseInRadianScale
                                        }
                                        iterations={iterations}
                                        $iterations={this.$iterations}
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
                                                title="N-Circle"
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

export default NCircle;
