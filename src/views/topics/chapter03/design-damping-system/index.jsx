import DesignSystemByCharsLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import DesignSystemByCharsParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import { gridSpacing } from "store/constant";
import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

const stepResponse = (tf, c_t = tf.step(), index = undefined) =>
    "$$\\begin{cases} " +
    tf.label("G", index) +
    " \\\\ \\\\ " +
    c_t.label("c", index) +
    "\\end{cases}$$";

const symbols = {
    in: "t",
    out: "c",
};

class DesignSystemByCharacteristics extends TopicBaseComponent {
    state = {
        topicKey: "ch3-damping",
        M_p: 1,
        t_rise: 1,
        t_i: 0,
        t_f: 5,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: [],
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        C_t: null,
        G_s: null,
        GInfo: "",
        N: 1000,
        response: null,
        isAutoPlaying: false,
        autoYRange: undefined,
    };

    persistKeys = ["M_p", "t_rise", "t_i", "t_f", "thickness", "N"];

    setAutoPlaying = (value, sweep) =>
        this.setState({
            isAutoPlaying: value,
            // freeze the y-axis over the whole sweep so the graph doesn't keep
            // rescaling itself and hiding how much it is actually changing
            autoYRange: value && sweep ? this.autoPlayYRange(sweep) : undefined,
        });

    autoPlayYRange = ({ key, from, to, step }) => {
        const { M_p, t_rise, t_i, t_f, N, systems } = this.state;
        let lo = Infinity;
        let hi = -Infinity;
        const fold = (ys) =>
            ys.forEach((v) => {
                if (v < lo) lo = v;
                if (v > hi) hi = v;
            });
        const responseOf = (mp, tr) =>
            TransferFunction.Shortcuts.$design(+tr, +mp).step().$;
        // captured curves are rebuilt exactly the way refreshTraces draws them,
        // so the frozen frame lines up with what's actually on screen
        systems.forEach((e) =>
            fold(
                calculus.pointify(
                    responseOf(e.M_p, e.t_rise),
                    +t_i,
                    +t_f,
                    +N
                )[1]
            )
        );
        // the last frame always lands exactly on `to`, so fold that in too
        const frames = Math.floor(Math.abs((to - from) / step));
        const foldAt = (value) =>
            fold(
                calculus.pointify(
                    responseOf(
                        key === "M_p" ? value : +M_p,
                        key === "t_rise" ? value : +t_rise
                    ),
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

    $M_p = (value) => this.setState({ M_p: value });
    $t_rise = (value) => this.setState({ t_rise: value });
    $t_i = (value) => this.setState({ t_i: value });
    $t_f = (value) => this.setState({ t_f: value });
    $systems = (value) => this.setState({ systems: value });
    $thickness = (value) => this.setState({ thickness: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    //update
    capture = () => {
        const { systems, M_p, t_rise, G_s, C_t, thickness } = this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) => M_p === sys.M_p && t_rise === sys.t_rise
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                M_p: +M_p,
                t_rise: +t_rise,
                G_s,
                C_t,
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
            M_p,
            t_rise,
            t_i,
            t_f,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        let gtf = TransferFunction.Shortcuts.$design(+t_rise, +M_p);
        const tstep = gtf.step();
        this.setState({ G_s: gtf });
        if (gtf) {
            const [x, y] = calculus.pointify(tstep.$, +t_i, +t_f, +N);
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            const all = systems.map((e, index) => {
                // rebuild the captured system from its specs the same way the live
                // curve is built, so a captured curve matches what produced it
                let tgtf = TransferFunction.Shortcuts.$design(+e.t_rise, +e.M_p);

                const [xi, yi] = calculus.pointify(
                    tgtf.step().$,
                    +t_i,
                    +t_f,
                    +N
                );

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
                (sys) => M_p === sys.M_p && t_rise === sys.t_rise
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

            this.setState({
                C_t: tstep,
                GInfo: new Describer(gtf),
                response: stepResponse(gtf),
                traces: all,
            });
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            M_p,
            t_rise,
            t_i,
            t_f,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        if (
            M_p !== prevState.M_p ||
            t_rise !== prevState.t_rise ||
            t_i !== prevState.t_i ||
            t_f !== prevState.t_f ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (M_p !== prevState.M_p || t_rise !== prevState.t_rise)
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            M_p,
            t_rise,
            t_i,
            t_f,
            systems,
            traces,
            isGraphCatured,
            GInfo,
            N,
            response,
            isAutoPlaying,
            autoYRange,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        System design using the system's damping specifications{" "}
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
                            <DesignSystemByCharsLecture />
                        </Grid>

                        <Grid sx={{ margin: "auto", width: "100%" }} item>
                            <SubCard sx={{ direction: "ltr" }}>
                                <Grid
                                    id="formulaBox"
                                    sx={{ margin: "auto" }}
                                    container
                                    direction="row"
                                >
                                    {systems instanceof Array &&
                                        systems.map((sys, index) => {
                                            const formula = stepResponse(
                                                sys.G_s,
                                                sys.C_t,
                                                index + 1
                                            );

                                            return (
                                                <Grid
                                                    style={{ fontSize: "18px" }}
                                                    xs={12}
                                                    item
                                                >
                                                    <MathJax>{formula}</MathJax>
                                                </Grid>
                                            );
                                        })}
                                    {!isGraphCatured && (
                                        <Grid style={{ fontSize: "18px" }} xs={12}>
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
                                    <DesignSystemByCharsParameters
                                        M_p={M_p}
                                        t_rise={t_rise}
                                        t_i={t_i}
                                        t_f={t_f}
                                        $M_p={this.$M_p}
                                        $t_rise={this.$t_rise}
                                        $t_i={this.$t_i}
                                        $t_f={this.$t_f}
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
                                            title="Step response"
                                            traces={traces}
                                            yRange={autoYRange}
                                        />
                                    </SubCard>
                                </Grid>
                                <hr />
                                <Grid xs={12} item>
                                    {GInfo && <GInfo.Explain />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        );
    }
}

export default DesignSystemByCharacteristics;
