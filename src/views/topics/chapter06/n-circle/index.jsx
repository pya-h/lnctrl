// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus/index";
import { useState, useEffect } from "react";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import GraphBox from "views/plotter/GraphBox";
import NCircleParameters from "./parameters";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import NCircleLecture from "./lecture";
const x_i = -2;
const x_f = 2;

const NCircle = () => {
    const [N, $N] = useState(1);
    // gradiant of u(t) is 0 and unit ramp is one

    const [systems, $systems] = useState([]);

    const [traces, $traces] = useState([]);

    const [thickness, $thickness] = useState(1.0); // graph line thickness
    const [is3DPlotEnabled, $3DPlotEnabled] = useState(false);
    const [phaseInRadianScale, setPhaseInRadianScale] = useState(false); // for degree => 180 / PI, for radian scale => 1.0
    const [iterations, $iterations] = useState(10000);

    const toggle3DPlot = () => $3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) => sys.N === +N
        );
        if (index === -1) {
            const n = phaseInRadianScale ? +N : +N * calculus.DegreeToRadian;
            const unit = phaseInRadianScale ? "rad" : "°";
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                N: n,
                legend: `N = ${+N} ${unit}`,
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
            let n = +N, legend = `N = ${+N} rad`;
            if(!phaseInRadianScale){
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
               
                const [x, y] = calculus.nCircle(
                    n,
                    x_i,
                    x_f,
                    +iterations
                );
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

            $traces(all);
        } catch (ex) {
            console.log(ex);
        }
    }, [
        N,
        is3DPlotEnabled,
        thickness,
        systems,
        iterations,
        phaseInRadianScale,
    ]);

    const update = (changes) => {
        if (changes) $thickness(changes.thickness);
        //and so...
    };
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">پاسخ فرکانسی فیلتر RC</h2>
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
                                    $N={(value) => value && $N(value)}
                                    phaseInRadianScale={phaseInRadianScale}
                                    setPhaseInRadianScale={
                                        setPhaseInRadianScale
                                    }
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
                            <Grid lg={12} md={12} sm={12} xs={12} item>
                                <SubCard>

                                        <Grid
                                            lg={9}
                                            md={9}
                                            sm={12}
                                            xs={12}
                                            item
                                        >
                                            <GraphBox
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
};

export default NCircle;
