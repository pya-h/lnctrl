import RootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import RootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import { gridSpacing } from "store/constant";
// import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import { makeProgress } from "toolshed";
import Complex from "math/algebra/complex";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

const tfFormula = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

class RootLocus extends TopicBaseComponent {
    state = {
        topicKey: "ch5-rootlocus",
        rawNumerator: "1",
        rawDenominator: "1 5 12",
        k_min: -100,
        k_max: 100,
        // gradiant of u(t) is 0 and unit ramp is one
        rootLocusTrace: { x: [], y: [] },
        zerosTrace: { x: [], y: [] },
        polesTrace: { x: [], y: [] },
        G_s: null,
        // GInfo: "",
        formula: null,
        responseTime: null, //the time that takes for plotting rootlocus
        method: "first",
        N: 1000,
    };

    persistKeys = [
        "rawNumerator",
        "rawDenominator",
        "k_min",
        "k_max",
        "N",
        "method",
    ];

    $rawNumerator = (value) => this.setState({ rawNumerator: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $k_min = (value) => this.setState({ k_min: value });
    $k_max = (value) => this.setState({ k_max: value });
    $N = (value) => this.setState({ N: value });
    changeMethod = (value) => this.setState({ method: value });

    //update
    updateFormula = () => {
        const { rawNumerator, rawDenominator } = this.state;
        // k * num / den
        const g_s = new TransferFunction(
            calculus.stringToArray(rawNumerator),
            calculus.stringToArray(rawDenominator)
        );
        this.setState({ G_s: g_s, formula: tfFormula(g_s) });
    };

    componentDidMount() {
        super.componentDidMount();
        this.updateFormula();
    }

    componentDidUpdate(prevProps, prevState) {
        const { rawNumerator, rawDenominator } = this.state;
        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.updateFormula();
    }

    updatePlot = async () => {
        try {
            const { G_s, k_min, k_max, method, N } = this.state;
            // const updateProgressBar =
            if (G_s instanceof TransferFunction) {
                this.setState({ rootLocusTrace: { x: [], y: [] } });
                const startTime = new Date();

                const [zeros, poles] = G_s.roots();
                const [zx, zy] = Complex.ToCouples(zeros);
                this.setState({
                    zerosTrace: {
                        x: zx,
                        y: zy,
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 10,
                            // black vanishes on the dark plot surface, so track the theme
                            color:
                                localStorage.getItem("navType") === "dark"
                                    ? "#e0e0e0"
                                    : "black",
                            // symbol: 'diamond'
                        },
                        name: "Zero",
                    },
                });
                const [px, py] = Complex.ToCouples(poles);
                this.setState({
                    polesTrace: {
                        x: px,
                        y: py,
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            color: "red",
                            symbol: "x",
                            size: 10,
                        },
                        name: "Pole",
                    },
                });

                // $GInfo(new Describer(G_s));
                const progressBar = document.getElementById("progressbar");
                const [x, y] = await (method === "second"
                    ? G_s.rootLocus
                    : G_s.rootsByAlgebriteLocus)(
                    +k_min,
                    +k_max,
                    progressBar, // send progress bar element to root locus for showing progres and preventing the browser from locking
                    +N
                );
                console.log(x, y);
                const endTime = new Date();
                this.setState({
                    rootLocusTrace: {
                        x,
                        y,
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 3,
                        },
                        name: "Root-Locus",
                    },
                    responseTime: (+endTime - +startTime) / 1000,
                });

                setTimeout(async () => {
                    await makeProgress(progressBar, 0);
                }, [1000]);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    render() {
        const {
            rawNumerator,
            rawDenominator,
            k_min,
            k_max,
            rootLocusTrace,
            zerosTrace,
            polesTrace,
            formula,
            responseTime,
            method,
            N,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <h2 className="chapter-section-title">
                        Root Locus of the System Poles
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
                            <RootLocusLecture />
                        </Grid>

                        <Grid sx={{ margin: "auto", width: "100%" }} item>
                            <SubCard>
                                <Grid id="formulaBox" container direction="row">
                                    <MathJax style={{ margin: "auto" }}>
                                        {formula}
                                    </MathJax>
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
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{ marginTop: "1%", width: "100%" }}
                                container
                            >
                                <Grid xs={12}>
                                    <RootLocusParameters
                                        rawNumerator={rawNumerator}
                                        rawDenominator={rawDenominator}
                                        k_min={k_min}
                                        k_max={k_max}
                                        $rawNumerator={this.$rawNumerator}
                                        $rawDenominator={this.$rawDenominator}
                                        $k_min={this.$k_min}
                                        $k_max={this.$k_max}
                                        updatePlot={this.updatePlot}
                                        responseTime={responseTime}
                                        N={N}
                                        $N={this.$N}
                                        method={method}
                                        changeMethod={this.changeMethod}
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={8} sm={12} xs={12} item>
                                <Grid xs={12} item>
                                    <SubCard>
                                        <PlotlyBox
                                            title="Root locus"
                                            traces={[
                                                rootLocusTrace,
                                                zerosTrace,
                                                polesTrace,
                                            ]}
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

export default RootLocus;
