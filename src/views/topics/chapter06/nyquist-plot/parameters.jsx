import { Grid, Button, Fab } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import ProgressBar from "views/ui-component/progressbar/ProgressBar";
import AnimateButton from "views/ui-component/extended/AnimateButton";

const parameterFormulas = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = ["$$]$$", "$$]$$", "$$Hz$$", "$$Hz$$", null];

const NyquistPlotParameters = ({
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
    method,
    responseTime,
    changeMethod,
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
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
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
                        Solution method:
                    </Grid>
                    <Grid xs={6} item>
                        <Fab
                            size="large"
                            variant="circular"
                            color={method === "polar" ? "secondary" : null}
                            onClick={() => changeMethod("polar")}
                        >
                            <AnimateButton type="scale" direction="down">
                                Polar
                            </AnimateButton>
                        </Fab>
                    </Grid>
                    <Grid xs={6} item>
                        <Fab
                            size="large"
                            variant="circular"
                            color={method === "complex" ? "secondary" : null}
                            onClick={() => changeMethod("complex")}
                        >
                            <AnimateButton type="scale" direction="down">
                                Complex
                            </AnimateButton>
                        </Fab>
                    </Grid>
                </Grid>
                <br />
                <Grid xs={12} sx={{ mt: 1 }} item>
                    <ProgressBar
                        background="lightcoral"
                        id="precvious_plots_progressbar"
                    />
                </Grid>
                <Grid xs={12} sx={{ mt: 1 }} item>
                    <ProgressBar id="nyquist_progressbar" />
                </Grid>
                {responseTime && (
                    <Grid xs={12} sx={{ mt: 1 }} item>
                        <p style={{ textAlign: "center", color: "coral" }}>
                            Operation duration: {responseTime}
                        </p>
                    </Grid>
                )}
        </SubCard>
    );
};

export default NyquistPlotParameters;
