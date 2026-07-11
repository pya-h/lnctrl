import { Grid, Button, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";
import { gridSpacing } from "store/constant";

const parameterFormulas = [
    "$$T_d = $$",
    "$$Den = [$$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = ["$$ sec$$", "$$]$$", "$$Hz$$", "$$Hz$$", null];

const DelayedSystemsExampleParameters = ({
    T_d,
    rawDenominator,
    $T_d,
    $rawDenominator,
    w_min,
    w_max,
    $w_min,
    $w_max,
    phaseInRadianScale,
    setPhaseInRadianScale,
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    // only the delay is a plain number to sweep; the denominator is a coefficient
    // list and the omega range only frames the graph. T_d is kept a string so the
    // refresh reads it the same way the text field does.
    const autoPlayParams = [
        {
            key: "T_d",
            label: "T_d",
            value: T_d,
            setValue: (v) => $T_d(String(v)),
        },
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
                    parameters={[T_d, rawDenominator, w_min, w_max, N]}
                    setters={[$T_d, $rawDenominator, $w_min, $w_max, $N]}
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
        </SubCard>
    );
};

export default DelayedSystemsExampleParameters;
