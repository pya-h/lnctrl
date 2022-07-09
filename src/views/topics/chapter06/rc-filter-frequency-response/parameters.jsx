import { Grid, Button } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";

const parameterFormulas = [
    "$$R = $$",
    "$$C = $$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = ["$$k\\Omega$$", "$$\\mu F$$", "$$Hz$$", "$$Hz$$", null];

const RCFilterFrequencyResponseParameters = ({
    R,
    C,
    $R,
    $C,
    w_min,
    w_max,
    $w_min,
    $w_max,
    phaseInRadianScale,
    setPhaseInRadianScale,
    N,
    $N,
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
                    parameters={[R, C, w_min, w_max, N]}
                    setters={[$R, $C, $w_min, $w_max, $N]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />
                <Grid xs={12} item>
                    <hr />
                </Grid>
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
                    <Grid xs={12} item>
                        <p dir="ltr" style={{ textAlign: "center" }}>
                            Phase output in terms of:
                        </p>
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
        </SubCard>
    );
};

export default RCFilterFrequencyResponseParameters;
