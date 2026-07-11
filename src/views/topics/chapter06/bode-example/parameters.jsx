import { Grid, Button, Fab, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";
import { gridSpacing } from "store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { MathJax } from "better-react-mathjax";

const parameterFormulas = [
    "$$K = $$",
    "$$\\tau _a = $$",
    "$$\\tau _b = $$",
    "$$\\tau _1 = $$",
    "$$\\tau _2 = $$",
    "$$\\tau _3 = $$",
    "$$\\tau _4 = $$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "$$Hz$$",
    "$$Hz$$",
    null,
];

const BodePlotExampleParameters = ({
    t_a,
    t_b,
    K,
    t_1,
    t_2,
    t_3,
    t_4,
    $t_a,
    $t_b,
    $K,
    $t_1,
    $t_2,
    $t_3,
    $t_4,
    w_min,
    w_max,
    $w_min,
    $w_max,
    phaseInRadianScale,
    setPhaseInRadianScale,
    N,
    $N,
    multiplier,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    // K and the time constants are the system parameters; the omega range and N
    // only frame the graph, so they are left out of the sweep list
    const autoPlayParams = [
        { key: "K", label: "K", value: K, setValue: $K },
        { key: "t_a", label: "\\tau_a", value: t_a, setValue: $t_a },
        { key: "t_b", label: "\\tau_b", value: t_b, setValue: $t_b },
        { key: "t_1", label: "\\tau_1", value: t_1, setValue: $t_1 },
        { key: "t_2", label: "\\tau_2", value: t_2, setValue: $t_2 },
        { key: "t_3", label: "\\tau_3", value: t_3, setValue: $t_3 },
        { key: "t_4", label: "\\tau_4", value: t_4, setValue: $t_4 },
    ];

    return (
        <SubCard
            darkBorder
            title="Parameters"
            secondary={
                <AutoPlayControl
                    params={autoPlayParams}
                    running={isAutoPlaying}
                    onRunningChange={setAutoPlaying}
                />
            }
            sx={{
                direction: "ltr",
                textAlign: "left",
                height: "100%",
            }}
        >
            <Grid spacing={gridSpacing} container direction="row">
                <SimpleParametersList
                    parameters={[
                        K,
                        t_a,
                        t_b,
                        t_1,
                        t_2,
                        t_3,
                        t_4,
                        w_min,
                        w_max,
                        N,
                    ]}
                    setters={[
                        $K,
                        $t_a,
                        $t_b,
                        $t_1,
                        $t_2,
                        $t_3,
                        $t_4,
                        $w_min,
                        $w_max,
                        $N,
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />
                <Grid xs={12} item>
                    <hr />
                </Grid>
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
                    <Grid xs={12} item>
                        <Typography dir="ltr" style={{ textAlign: "center" }}>
                            Phase output in terms of:
                        </Typography>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale(false)}
                            disabled={isAutoPlaying}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                !phaseInRadianScale ? "contained" : "outlined"
                            }
                        >
                            Degree
                        </Button>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale("rad")}
                            disabled={isAutoPlaying}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                phaseInRadianScale ? "contained" : "outlined"
                            }
                        >
                            Radian
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <hr />
            <Grid
                xs={12}
                sx={{ pt: gridSpacing }}
                spacing={gridSpacing}
                style={{ textAlign: "center" }}
                container
            >
                <Grid xs={12} item>
                    <Typography>
                        Effect of scalar multiplication of the system on the Bode plot
                    </Typography>
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        disabled={isAutoPlaying}
                        onClick={() => multiplier(0.1)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\times\\frac{1}{10}$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        disabled={isAutoPlaying}
                        onClick={() => multiplier(10)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\times 10$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        disabled={isAutoPlaying}
                        onClick={() => multiplier(-1)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\lgroup - \\rgroup$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default BodePlotExampleParameters;
