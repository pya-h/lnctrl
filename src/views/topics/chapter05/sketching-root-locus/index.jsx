import SketchingRootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { Grid, Typography } from "@mui/material";
import SketchingRootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import { gridSpacing } from "store/constant";
// import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import Complex from "math/algebra/complex";
import { joinSorted } from "toolshed";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import Equation from "../../../../math/solvers/equation";
import { PolyLine } from "math/algebra/functions";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

const tfFormula = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

const pointByPointTrace = (x, y, name, markerStyle) => {
    const size = markerStyle?.size || 15,
        symbol = markerStyle?.symbol;
    return {
        x: x instanceof Array ? x : [x],
        y: y instanceof Array ? y : [y],
        type: "scatter",
        mode: "markers",
        marker: {
            size,
            symbol,
            // color: "black",
        },
        name,
    };
};
const arrowTrace = (direction, x, y = 0, size = 20) =>
    pointByPointTrace(x, y, `Direction${x}`, {
        symbol: `arrow-bar-${direction}`,
        size,
    });

const lineDirection = (pzl, pzr) => {
    const traces = [];
    if (pzl.group !== pzr.group) {
        traces.push(
            arrowTrace(
                pzl.group === "pole" ? "right" : "left",
                (pzl.value + pzr.value) / 2
            )
        );
    } else {
        const half = (pzl.value + pzr.value) / 2;
        const positions = [(pzl.value + half) / 2, (pzr.value + half) / 2],
            directions = [
                pzl.group === "pole" ? "right" : "left",
                pzr.group === "pole" ? "left" : "right",
            ];
        for (let idx = 0; idx < positions.length; idx++)
            traces.push(arrowTrace(directions[idx], positions[idx], 0, 15));
    }
    return traces;
};

const listRoots = (roots, _type = "Pole") =>
    roots.length
        ? "$$" +
          roots
              .map((zi, i) => `\\quad s_{${i + 1}} = ` + zi.toString())
              .join(",") +
          "$$"
        : `The system does not have a ${_type}`;

class SketchingRootLocus extends TopicBaseComponent {
    state = {
        topicKey: "ch5-sketchrl",
        rawNumerator: "1",
        rawDenominator: "1 5 6",
        stepByStepTraces: [],
        G_s: null,
        // GInfo: "",
        formula: null,
        N: 100,
        thickness: 5.0,
        step: 0,
        yRange: null,
        guides: [],
        description: [],
    };

    persistKeys = ["rawNumerator", "rawDenominator", "N", "thickness"];

    $rawNumerator = (value) => this.setState({ rawNumerator: value });
    $rawDenominator = (value) => this.setState({ rawDenominator: value });
    $stepByStepTraces = (value) => this.setState({ stepByStepTraces: value });
    $G_s = (value) => this.setState({ G_s: value });
    $formula = (value) => this.setState({ formula: value });
    $N = (value) => this.setState({ N: value });
    setThickness = (value) => this.setState({ thickness: value });
    setStep = (value) => this.setState({ step: value });
    setYRange = (value) => this.setState({ yRange: value });
    setGuides = (value) => this.setState({ guides: value });
    setDescription = (value) => this.setState({ description: value });

    //update
    updateFormula = () => {
        const { rawNumerator, rawDenominator } = this.state;
        // k * num / den
        const g_s = new TransferFunction(
            calculus.stringToArray(rawNumerator),
            calculus.stringToArray(rawDenominator)
        );
        this.setState({ G_s: g_s, formula: tfFormula(g_s), step: 0 });
    };

    refreshTraces = () => {
        const { G_s, N, thickness } = this.state;
        try {
            let maxY = 0;
            const guides = [],
                description = [];
            if (G_s instanceof TransferFunction) {
                const traces = [];
                const [zeros, poles] = G_s.roots();

                let [zx, zy] = Complex.ToCouples(zeros);
                description.push({ formula: listRoots(zeros, "Zero") });
                guides.push("Find zeros");
                // step 0
                traces.push(pointByPointTrace(zx, zy, "Zeros"));
                // step 1
                let [px, py] = Complex.ToCouples(poles);
                traces.push(
                    pointByPointTrace(px, py, "Poles", { symbol: "x" })
                );
                description.push({ formula: listRoots(poles) });
                guides.push("Find poles");
                // step 2
                // aAxisPZs ==> zero/poles that are placesd right on the real axis
                const xAxisPZs = joinSorted(
                    zeros
                        .filter((zi) => !(zi instanceof Complex) || zi.isReal())
                        .map((zi) => (zi instanceof Complex ? zi.real() : zi)),
                    poles
                        .filter((pi) => !(pi instanceof Complex) || pi.isReal())
                        .map((pi) => (pi instanceof Complex ? pi.real() : pi)),
                    ["zero", "pole"],
                    false
                );
                const g_delta = G_s.characteristicEquation();
                const g_deltaRoots = new Equation(g_delta).solve();

                for (let i = 0; i < xAxisPZs.length - 1; i++) {
                    traces.push(
                        calculus.systemToTrace(
                            (x) => 0,
                            xAxisPZs[i].value,
                            xAxisPZs[i + 1].value,
                            thickness,
                            `{RL${i}}`,
                            false,
                            +N
                        )
                    );
                    guides.push(`Finding the horizontal-axis lines (${i + 1})`);
                    const directions = lineDirection(
                        xAxisPZs[i],
                        xAxisPZs[i + 1]
                    );
                    traces.push(...directions);
                    for (let idx = 0; idx < directions.length; idx++) {
                        guides.push(`Finding the direction of line number (${i + 1})`);

                        description.push({
                            formula:
                                "$$" +
                                g_delta.toString() +
                                " = 0 \\\\ $$ " +
                                listRoots(g_deltaRoots, "Root"),
                            caption: `Number of branches = ${g_deltaRoots.length}`,
                        });
                    }
                    description.push({
                        formula:
                            "$$" +
                            g_delta.toString() +
                            " = 0 \\\\ $$ " +
                            listRoots(g_deltaRoots, "Root"),
                        caption: `Number of branches = ${g_deltaRoots.length}`,
                    });
                }
                maxY = calculus.max([...zy, ...py]).value;
                const maxX = calculus.max([...zx, ...px], true).value;
                const { sigma, angles, PI } = G_s.asymptotes();
                const asympDescription =
                    `angle calculation: $$ \\frac{(2N + 1)\\pi}{${
                        poles.length - zeros.length
                    }} = ` +
                    angles.join(", ") +
                    `$$ intersection with the horizontal axis: $$ \\sigma_{0} = ${calculus.strictPrecisionFormat(
                        sigma
                    )} $$`;
                for (const angle of angles) {
                    guides.push(`Find asymptotes`);
                    description.push({ formula: asympDescription });
                    const line = new PolyLine({ x: sigma, y: 0 }, angle);
                    if (angle !== PI / 2)
                        traces.push(
                            calculus.systemToTrace(
                                line.$,
                                -maxX,
                                maxX,
                                thickness,
                                `\\alpha = ${angle}`,
                                false,
                                +N
                            )
                        );
                    else {
                        const [xs, ys] = calculus.verticalLine(
                            sigma,
                            -maxY,
                            +maxY,
                            +N
                        );
                        traces.push(
                            calculus.arrayToTrace(
                                xs,
                                ys,
                                thickness,
                                `\\alpha = ${angle}`
                            )
                        );
                    }
                }

                guides.push("Finding the breakaway points");
                const { breakpoints, equation } = G_s.breakpoints();
                const [bx, by] = Complex.ToCouples(breakpoints);
                traces.push(pointByPointTrace(bx, by, "Zeros"));
                description.push({
                    formula:
                        `$$ ${equation.toString()} = 0 $$ breakaway points: $$ ` +
                        breakpoints.map((bp) => bp.toString()).join(", ") +
                        " $$",
                });
                this.setState({
                    yRange: !isNaN(maxY) ? [-maxY - 1, maxY + 1] : null,
                    stepByStepTraces: traces,
                    guides: guides,
                    description: description,
                });
                // $GInfo(new Describer(G_s));
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.updateFormula();
        this.refreshTraces();
    }

    componentDidUpdate(prevProps, prevState) {
        const { rawNumerator, rawDenominator, G_s, N, thickness } = this.state;
        if (
            rawNumerator !== prevState.rawNumerator ||
            rawDenominator !== prevState.rawDenominator
        )
            this.updateFormula();

        if (
            G_s !== prevState.G_s ||
            N !== prevState.N ||
            thickness !== prevState.thickness
        )
            this.refreshTraces();
    }

    render() {
        const {
            rawNumerator,
            rawDenominator,
            stepByStepTraces,
            formula,
            N,
            thickness,
            step,
            yRange,
            guides,
            description,
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
                            <SketchingRootLocusLecture />
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
                                    <SketchingRootLocusParameters
                                        rawNumerator={rawNumerator}
                                        rawDenominator={rawDenominator}
                                        $rawNumerator={this.$rawNumerator}
                                        $rawDenominator={this.$rawDenominator}
                                        N={N}
                                        $N={this.$N}
                                        formula={formula}
                                        thickness={thickness}
                                        setThickness={this.setThickness}
                                        step={step}
                                        setStep={this.setStep}
                                        finalStep={stepByStepTraces.length}
                                        guides={guides}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                sx={{ py: 2, pl: 2 }}
                                md={8}
                                sm={12}
                                xs={12}
                                container
                                spacing={gridSpacing}
                            >
                                <Grid xs={12} item>
                                    <SubCard>
                                        <PlotlyBox
                                            title="Root locus"
                                            traces={stepByStepTraces.slice(
                                                0,
                                                step + 1
                                            )}
                                            yRange={yRange}
                                            hideLegends
                                        />
                                    </SubCard>
                                </Grid>

                                <Grid sx={{ margin: "auto", width: "100%" }} item>
                                    <SubCard>
                                        <Grid
                                            id="description"
                                            container
                                            direction="row"
                                        >
                                            {Boolean(step < description.length) && (
                                                <Typography
                                                    sx={{
                                                        m: "auto",
                                                        textAlign: "center",
                                                        py: 1,
                                                    }}
                                                >
                                                    <MathJax
                                                        style={{ margin: "auto" }}
                                                    >
                                                        {description[step].formula}
                                                    </MathJax>
                                                    <hr />
                                                    <Typography
                                                        sx={{
                                                            m: "auto",
                                                            textAlign: "center",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {description[step].caption}
                                                    </Typography>
                                                </Typography>
                                            )}
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

export default SketchingRootLocus;
