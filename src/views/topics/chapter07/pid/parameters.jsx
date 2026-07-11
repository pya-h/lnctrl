import { Grid, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";
import { gridSpacing } from "store/constant";
import ProgressBar from "views/ui-component/progressbar/ProgressBar";

const parameterFormulas = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$K_p = $$",
    "$$T_i = $$",
    "$$T_d = $$",
    "$$t_{initial} = $$",
    "$$t_{final} = $$",
    "$$N = $$",
];
const parameterUnits = [
    "$$]$$",
    "$$]$$",
    null,
    null,
    null,
    "$$sec$$",
    "$$sec$$",
    null,
];

const PIDParameters = ({
    rawNumerator,
    rawDenominator,
    $rawNumerator,
    $rawDenominator,
    t_initial,
    t_final,
    $t_initial,
    $t_final,
    K_p,
    $K_p,
    T_i,
    $T_i,
    T_d,
    $T_d,
    N,
    $N,
    responseTime,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    // the gains are the sweepable numbers; the numerator/denominator are coefficient
    // lists and t_initial/t_final/N only frame the graph. This section recomputes
    // asynchronously, so its autoplay steps on each finished computation (paced=false).
    const autoPlayParams = [
        { key: "K_p", label: "K_p", value: K_p, setValue: $K_p },
        { key: "T_i", label: "T_i", value: T_i, setValue: $T_i },
        { key: "T_d", label: "T_d", value: T_d, setValue: $T_d },
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
                    paced={false}
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
                        rawNumerator,
                        rawDenominator,
                        K_p,
                        T_i,
                        T_d,
                        t_initial,
                        t_final,
                        N,
                    ]}
                    setters={[
                        $rawNumerator,
                        $rawDenominator,
                        $K_p,
                        $T_i,
                        $T_d,
                        $t_initial,
                        $t_final,
                        $N,
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />
                <Grid xs={12} sx={{ mt: 2 }} item>
                    <ProgressBar id="pid_tune_progress" />
                </Grid>
                {responseTime && (
                    <Grid xs={12} sx={{ mt: 2 }} item>
                        <Typography
                            style={{ textAlign: "center", color: "coral" }}
                        >
                            Operation duration: {responseTime} Seconds
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};

export default PIDParameters;
