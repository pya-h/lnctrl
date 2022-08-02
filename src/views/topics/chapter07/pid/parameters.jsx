import { Grid, Button, Fab, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { MathJax } from "better-react-mathjax";

const parameterFormulas = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = ["$$]$$", "$$]$$", "$$Hz$$", "$$Hz$$", null];

const PIDParameters = ({
    rawNumerator,
    rawDenominator,
    $rawNumerator,
    $rawDenominator,
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
            title="Parameters"
            sx={{
                direction: "ltr",
                textAlign: "left",
                height: "100%",
            }}
        >
            <Grid spacing={gridSpacing} container direction="row">
                <SimpleParametersList
                    parameters={[rawNumerator, rawDenominator, w_min, w_max, N]}
                    setters={[
                        $rawNumerator,
                        $rawDenominator,
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
                        <Typography dir="ltr" style={{ textAlign: "center" }}>
                            Phase output in terms of:
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
                            Degree
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
                    Effect of scalar multiplication of the system on the Bode plot
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

export default PIDParameters;
