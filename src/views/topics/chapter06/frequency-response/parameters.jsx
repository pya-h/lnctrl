import { Grid, Button } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import ProgressBar from "views/ui-component/progressbar/ProgressBar";

const parameterFormulas = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
];
const parameterUnits = ["$$]$$", "$$]$$", "$$Hz$$", "$$Hz$$"];

const FrequencyResponseParameters = ({
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
    responseTime,
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
                    parameters={[rawNumerator, rawDenominator, w_min, w_max]}
                    setters={[$rawNumerator, $rawDenominator, $w_min, $w_max]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />
                <Grid xs={12} style={{paddingLeft: '3%'}} container>
                    <Grid xs={6} sx={{ p: 1 }}  item>
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
                <Grid xs={12} sx={{ mt: 1 }} item>
                    <ProgressBar id="fr_progressbar" />
                </Grid>
                {responseTime && (
                    <Grid xs={12} sx={{ mt: 1 }} item>
                        <p style={{ textAlign: "center", color: "coral" }}>
                            Operation duration: {responseTime} Seconds
                        </p>
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};

export default FrequencyResponseParameters;
