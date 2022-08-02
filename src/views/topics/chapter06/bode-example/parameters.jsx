import { Grid, Button, Fab, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
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
}) => {
    return (
        <SubCard
            darkBorder
            title="پارامترها"
            sx={{
                direction: "ltr",
                textAlign: "right",
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
                />
                <Grid xs={12} item>
                    <hr />
                </Grid>
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
                    <Grid xs={12} item>
                        <Typography dir="rtl" style={{ textAlign: "center" }}>
                            خروجی فاز بر حسب:
                        </Typography>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale(false)}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                !phaseInRadianScale ? "contained" : "outlined"
                            }
                        >
                            درجه
                        </Button>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale("rad")}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                phaseInRadianScale ? "contained" : "outlined"
                            }
                        >
                            رادیان
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
                    تاثیر ضرب اسکالر سیستم در نمودار بود
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
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
