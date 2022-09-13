import { Grid, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
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
                />
                <Grid xs={12} sx={{ mt: 2 }} item>
                    <ProgressBar id="pid_tune_progress" />
                </Grid>
                {responseTime && (
                    <Grid xs={12} sx={{ mt: 2 }} item>
                        <Typography
                            style={{ textAlign: "center", color: "coral" }}
                        >
                            مدت زمان عملیات: {responseTime} ثانیه
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};

export default PIDParameters;
