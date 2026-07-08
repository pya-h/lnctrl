import SOTFByPolesLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import SOTFByPolesInputs from "./parameters";
import Complex from "math/algebra/complex";
import Algebra from "math/algebra/index";
import TransferFunction from "math/algebra/functions/fraction";
import { gridSpacing } from "store/constant";
import Describer from "math/describer";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
import { cacheParameters } from "toolshed";

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

class SOTFExamineByPoles extends TopicBaseComponent {
    state = {
        topicKey: "ch3-2tf-poles",
        alpha: new Complex(1, 1),
        beta: new Complex(1, 1).conjugate(),
        k: 1.0,
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
    };

    // alpha/beta are Complex instances, so they can't be JSON-cached directly;
    // saveState serializes them to {re, im} and reviveState rebuilds them.
    saveState() {
        const { topicKey, k, t_i, t_f, thickness, N, alpha, beta } = this.state;
        cacheParameters(topicKey, {
            k,
            t_i,
            t_f,
            thickness,
            N,
            alpha: { re: alpha.real(), im: alpha.imaginary() },
            beta: { re: beta.real(), im: beta.imaginary() },
        });
    }

    reviveState(cache) {
        const revived = { ...cache };
        if (cache.alpha)
            revived.alpha = new Complex(cache.alpha.re, cache.alpha.im);
        if (cache.beta)
            revived.beta = new Complex(cache.beta.re, cache.beta.im);
        return revived;
    }

    $alpha = (value) => this.setState({ alpha: value });
    $beta = (value) => this.setState({ beta: value });
    $k = (value) => this.setState({ k: value });
    $t_i = (value) => this.setState({ t_i: value });
    $t_f = (value) => this.setState({ t_f: value });
    $systems = (value) => this.setState({ systems: value });
    $thickness = (value) => this.setState({ thickness: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    //update
    capture = () => {
        const { systems, alpha, beta, k, G_s, C_t, thickness } = this.state;
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) =>
                alpha.equals(sys.alpha) && beta.equals(sys.beta) && sys.k === k
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                alpha,
                beta,
                k,
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
            alpha,
            beta,
            k,
            t_i,
            t_f,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        let gtf = TransferFunction.Shortcuts.$2(
            +k,
            alpha instanceof Algebra ? alpha.negation() : -alpha,
            beta instanceof Algebra ? beta.negation() : -beta
        );
        const tstep = gtf.step();
        this.setState({ G_s: gtf });
        if (gtf && alpha.hasSameTypeWith(beta)) {
            const [x, y] = calculus.pointify(tstep.$, +t_i, +t_f, +N);
            // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
            // so that the traces will be loaded with new conditions
            const all = systems.map((e, index) => {
                let tgtf = TransferFunction.Shortcuts.$2(
                    +e.k,
                    e.alpha instanceof Algebra ? e.alpha.negation() : -e.alpha,
                    e.beta instanceof Algebra ? e.beta.negation() : -e.beta
                );

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
                (sys) =>
                    alpha.equals(sys.alpha) &&
                    beta.equals(sys.beta) &&
                    sys.k === k
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
            alpha,
            beta,
            k,
            t_i,
            t_f,
            is3DPlotEnabled,
            thickness,
            systems,
            N,
        } = this.state;
        if (
            alpha !== prevState.alpha ||
            beta !== prevState.beta ||
            k !== prevState.k ||
            t_i !== prevState.t_i ||
            t_f !== prevState.t_f ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            systems !== prevState.systems ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            alpha !== prevState.alpha ||
            beta !== prevState.beta ||
            k !== prevState.k
        )
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            alpha,
            beta,
            k,
            t_i,
            t_f,
            systems,
            traces,
            isGraphCatured,
            GInfo,
            N,
            response,
        } = this.state;
        return (
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
                    <SOTFByPolesLecture />
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
                            <SOTFByPolesInputs
                                alpha={alpha}
                                beta={beta}
                                k={k}
                                t_i={t_i}
                                t_f={t_f}
                                $alpha={this.$alpha}
                                $beta={this.$beta}
                                $k={this.$k}
                                $t_i={this.$t_i}
                                $t_f={this.$t_f}
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
                                <PlotlyBox title="Step response" traces={traces} />
                            </SubCard>
                        </Grid>
                        <hr />
                        <Grid xs={12} item>
                            {GInfo && <GInfo.Explain />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default SOTFExamineByPoles;
