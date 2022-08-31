import SketchingRootLocusLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "math/calculus";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import SketchingRootLocusParameters from "./parameters";
import TransferFunction from "math/algebra/functions/transfer";
import { gridSpacing } from "store/constant";
// import Describer from "math/describer";
import MainCard from "views/ui-component/cards/MainCard";
import Complex from "math/algebra/complex";

const tfFormula = (tf, index = undefined) =>
    "$$ " + tf.label("G", index) + " $$";

const SketchingRootLocus = () => {
    const [rawNumerator, $rawNumerator] = useState("1");
    const [rawDenominator, $rawDenominator] = useState("1 5 6");

    const [rootLocusTrace, $rootLocusTrace] = useState({ x: [], y: [] });
    const [zerosTrace, $zerosTrace] = useState({ x: [], y: [] });
    const [polesTrace, $polesTrace] = useState({ x: [], y: [] });

    const [G_s, $G_s] = useState(null);
    // const [GInfo, $GInfo] = useState("");
    const [formula, $formula] = useState(null);
    const [N, $N] = useState(1000);

    //update
    useEffect(() => {
        // k * num / den
        const g_s = new TransferFunction(
            calculus.stringToArray(rawNumerator),
            calculus.stringToArray(rawDenominator)
        );
        $G_s(g_s);
        $formula(tfFormula(g_s));
    }, [rawNumerator, rawDenominator]);

    useEffect(() => {
        try {
            // const updateProgressBar =
            if (G_s) {
                $rootLocusTrace({ x: [], y: [] });
                const [zeros, poles] = G_s.roots();
                const [zx, zy] = Complex.ToCouples(zeros);
                $zerosTrace({
                    x: zx,
                    y: zy,
                    type: "scatter",
                    mode: "markers",
                    marker: {
                        size: 10,
                        color: "black",
                        // symbol: 'diamond'
                    },
                    name: "Zero",
                });
                const [px, py] = Complex.ToCouples(poles);
                $polesTrace({
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
                });

                // $GInfo(new Describer(G_s));
            }
        } catch (ex) {
            console.log(ex);
        }
    }, [G_s]);
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
                                />
                            </Grid>
                        </Grid>
                        <Grid md={8} sm={12} xs={12} item>
                            <Grid xs={12} item>
                                <SubCard>
                                    <GraphBox
                                        title="مکان هندسی"
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
};

export default SketchingRootLocus;
