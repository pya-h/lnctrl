import SketchingRootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
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

const listRoots = (roots, _type = "قطب") =>
    roots.length
        ? "$$" +
          roots
              .map((zi, i) => `\\quad s_{${i + 1}} = ` + zi.toString())
              .join(",") +
          "$$"
        : `.سیستم ${_type}ی ندارد`;

const SketchingRootLocus = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 5 6");

    const [stepByStepTraces, $stepByStepTraces] = useState([]);

    const [G_s, $G_s] = useState(null);
    // const [GInfo, $GInfo] = useState("");
    const [formula, $formula] = useState(null);
    const [N, $N] = useState(100);
    const [thickness, setThickness] = useState(5.0);
    const [step, setStep] = useState(0);
    const [yRange, setYRange] = useState(null);
    const [guides, setGuides] = useState([]);
    const [description, setDescription] = useState([]);

    //update
    useEffect(() => {
        // k * num / den
        const g_s = new TransferFunction(
            calculus.stringToArray(rawNumerator),
            calculus.stringToArray(rawDenominator)
        );
            console.log(g_s.asymptotes());
        $G_s(g_s);
        $formula(tfFormula(g_s));
        setStep(0);
    }, [rawNumerator, rawDenominator]);

    useEffect(() => {
        try {
            let maxY = 0;
            const guides = [],
                description = [];
            if (G_s instanceof TransferFunction) {
                const traces = [];
                const [zeros, poles] = G_s.roots();

                let [zx, zy] = Complex.ToCouples(zeros);
                description.push({ formula: listRoots(zeros, "صفر") });
                guides.push("یافتن صفرها");
                // step 0
                traces.push(pointByPointTrace(zx, zy, "Zeros"));
                // step 1
                let [px, py] = Complex.ToCouples(poles);
                traces.push(
                    pointByPointTrace(px, py, "Poles", { symbol: "x" })
                );
                description.push({ formula: listRoots(poles) });
                guides.push("یافتن قطب ها");
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
                    guides.push(`یافتن خطوط محور افقی (${i + 1})`);
                    const directions = lineDirection(
                        xAxisPZs[i],
                        xAxisPZs[i + 1]
                    );
                    traces.push(...directions);
                    for (let idx = 0; idx < directions.length; idx++) {
                        guides.push(`یافتن جهت خط شماره ی (${i + 1})`);

                        description.push({
                            formula:
                                "$$" +
                                g_delta.toString() +
                                " = 0 \\\\ $$ " +
                                listRoots(g_deltaRoots, "ریشه"),
                            persian: `تعداد شاخه ها = ${g_deltaRoots.length}`,
                        });
                    }
                    description.push({
                        formula:
                            "$$" +
                            g_delta.toString() +
                            " = 0 \\\\ $$ " +
                            listRoots(g_deltaRoots, "ریشه"),
                        persian: `تعداد شاخه ها = ${g_deltaRoots.length}`,
                    });
                }
                maxY = calculus.max([...zy, ...py]).value;

                const {sigma, angles, PI} = G_s.asymptotes();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

                for(const angle of angles){
                    // change to for[i]
                    const line = new PolyLine({x: sigma, y: 0}, angle);
                    traces.push(
                        angle !== PI ? calculus.syste1mToTrace( 
                            line.$,
                            0,1,
                            // xAxisPZs[i].value,
                            // xAxisPZs[i + 1].value,
                            thickness,
                            // `{RL${i}}`,
                            "dfs",
                            false,
                            +N
                        ) : null// arrayToTrace
                    );
                }
                setYRange(!isNaN(maxY) ? [-maxY - 1, maxY + 1] : null);
                $stepByStepTraces(traces);
                setGuides(guides);
                setDescription(description);
                // $GInfo(new Describer(G_s));
            }
        } catch (ex) {
            console.log(ex);
        }
    }, [G_s, N, thickness]);

    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        مکان هندسی قطب های سیستم
                    </h2>
                </Typography>
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
                                    $rawNumerator={$rawNumerator}
                                    $rawDenominator={$rawDenominator}
                                    N={N}
                                    $N={$N}
                                    formula={formula}
                                    thickness={thickness}
                                    setThickness={setThickness}
                                    step={step}
                                    setStep={setStep}
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
                                        title="مکان هندسی"
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
                                                    {description[step].persian}
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
};

export default SketchingRootLocus;
