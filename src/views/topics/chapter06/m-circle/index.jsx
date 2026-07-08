// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import MCircleParameters from "./parameters";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import MCircleLecture from "./lecture";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

class MCircle extends TopicBaseComponent {
    state = {
        topicKey: "ch6-mcircle",
        M: 1.0,
        x_i: -1,
        x_f: 1,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: [],
        thickness: 1.0, // graph line thickness
        is3DPlotEnabled: false,
        iterations: 10000,
    };

    persistKeys = ["M", "x_i", "x_f", "thickness", "iterations"];

    $M = (value) => this.setState({ M: value });
    $x_i = (value) => this.setState({ x_i: value });
    $x_f = (value) => this.setState({ x_f: value });
    $systems = (value) => this.setState({ systems: value });
    $thickness = (value) => this.setState({ thickness: value });
    $iterations = (value) => this.setState({ iterations: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, M, thickness } = this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex((sys) => sys.M === +M);
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                M: +M,
                thickness,
            });
            this.$systems(capturedSystems);
        }
    };

    refreshTraces = () => {
        const { M, x_i, x_f, is3DPlotEnabled, thickness, systems, iterations } =
            this.state;
        try {
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            let repeatedSystem = false;
            const all = Array(systems.length);

            for (let i = 0; i < systems.length; i++) {
                const [x, y] = calculus.mCircle(
                    systems[i].M,
                    +x_i,
                    +x_f,
                    +iterations
                );
                all[i] = calculus.arrayToTrace(
                    [...x, ...x],
                    [...y, ...y.map((yi) => -yi)],
                    thickness,
                    `M = ${systems[i].M}`,
                    is3DPlotEnabled
                );

                if (+M === systems[i].M) repeatedSystem = true;
            }

            if (!repeatedSystem) {
                // if current system isnt in traces list => add it temperory to plot
                const [x, y] = calculus.mCircle(+M, +x_i, +x_f, +iterations);
                all.push(
                    calculus.arrayToTrace(
                        [...x, ...x],
                        [...y, ...y.map((yi) => -yi)],
                        thickness,
                        `M = ${+M}`,
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
        const { M, x_i, x_f, is3DPlotEnabled, thickness, systems, iterations } =
            this.state;
        if (
            M !== prevState.M ||
            x_i !== prevState.x_i ||
            x_f !== prevState.x_f ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            iterations !== prevState.iterations
        )
            this.refreshTraces();
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const { M, x_i, x_f, iterations, traces } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        Constant-Magnitude Locus (M-circle)
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
                            <MCircleLecture />
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
                                    <MCircleParameters
                                        M={M}
                                        $M={(value) => +value >= 0 && this.$M(value)}
                                        x_i={x_i}
                                        x_f={x_f}
                                        $x_i={this.$x_i}
                                        $x_f={this.$x_f}
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
                                                title="M-Circle"
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

export default MCircle;
