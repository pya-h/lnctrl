import { Button, Grid, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import ProgressBar from "views/ui-component/progressbar/ProgressBar";

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
    N,
    $N,
    responseTime,
    method,
    changeMethod,
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
                <hr style={{width: '100%'}} />

                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
  
                    <Grid xs={12} item>
                        <Typography dir="rtl" style={{ textAlign: "center" }}>
                            روش رسم
                        </Typography>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => changeMethod("polar")}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                method === "polar" ? "contained" : "outlined"
                            }
                        >
                            قطبی
                        </Button>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => changeMethod("cartesian")}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                method === "cartesian" ? "contained" : "outlined"
                            }
                        >
                            دکارتی
                        </Button>
                    </Grid>
                </Grid>
                <hr style={{width: '100%'}} />
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
                        <Typography style={{ textAlign: "center", color: "coral" }}>
                            مدت زمان عملیات: {responseTime}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};

export default NyquistPlotParameters;
