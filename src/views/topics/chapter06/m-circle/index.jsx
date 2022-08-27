// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid, Typography } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import MCircleParameters from "./parameters";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import MCircleLecture from "./lecture";

const MCircle = () => {
    const [M, $M] = useState(1.0);
    const [x_i, $x_i] = useState(-1);
    const [x_f, $x_f] = useState(1);
    // gradiant of u(t) is 0 and unit ramp is one

    const [systems, $systems] = useState([]);

    const [traces, $traces] = useState([]);

    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [iterations, $iterations] = useState(10000);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex((sys) => sys.M === +M);
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                M: +M,
                thickness,
            });
            $systems(capturedSystems);
        }
    };

    useEffect(() => {
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

            $traces(all);
        } catch (ex) {
            console.log(ex);
        }
    }, [M, x_i, x_f, is3DPlotEnabled, thickness, systems, iterations]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        مکان هندسی اندازه ثابت
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
                                    $M={(value) => +value >= 0 && $M(value)}
                                    x_i={x_i}
                                    x_f={x_f}
                                    $x_i={$x_i}
                                    $x_f={$x_f}
                                    iterations={iterations}
                                    $iterations={$iterations}
                                />
                            </Grid>
                        </Grid>
                        <Grid md={9} sm={12} xs={12} item>
                            <SubCard>
                                <GraphMenu
                                    capture={capture}
                                    reset={() => $systems([])}
                                    update={(changes) => update(changes)}
                                    toggle3DPlot={toggle3DPlot}
                                />
                            </SubCard>
                            <hr />
                            <Grid xs={12} item>
                                <SubCard>
                                    <Grid xs={12} item>
                                        <GraphBox
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
};

export default MCircle;
