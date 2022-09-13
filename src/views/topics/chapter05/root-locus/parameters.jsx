import { Button, Grid, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import ProgressBar from "views/ui-component/progressbar/ProgressBar";

const startLebels = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$k_{min} = $$",
    "$$k_{max} = $$",
    "$$N = $$",
];
const endLabels = ["$$]$$", "$$]$$", null, null, null];

const RootLocusParameters = ({
    rawNumerator,
    rawDenominator,
    $rawNumerator,
    $rawDenominator,
    k_min,
    k_max,
    $k_min,
    $k_max,
    updatePlot,
    responseTime,
    N,
    $N,
    method,
    changeMethod,
}) => (
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
                parameters={[rawNumerator, rawDenominator, k_min, k_max, N]}
                setters={[$rawNumerator, $rawDenominator, $k_min, $k_max, $N]}
                labels={startLebels}
                units={endLabels}
            />
        </Grid>
        <Grid xs={12} container>
            <Grid xs={6} sx={{ py: 2, pr: 1 }} item>
                <Button
                    onClick={() => {changeMethod("second"); $N(200)}}
                    style={{ width: "100%", textTransform: "none" }}
                    variant={method === "second" ? "contained" : "outlined"}
                >
                    روش دوم
                </Button>
            </Grid>
            <Grid xs={6} sx={{ py: 2, pl: 1 }} item>
                <Button
                    onClick={() => {changeMethod("first"); $N(500)}}
                    style={{ width: "100%", textTransform: "none" }}
                    variant={method === "first" ? "contained" : "outlined"}
                >
                    روش اول
                </Button>
            </Grid>
        </Grid>
        <Grid xs={12} item>
            <Button
                onClick={updatePlot}
                style={{
                    width: "100%",
                    textTransform: "none",
                    background: "coral",
                }}
                variant="contained"
            >
                مشاهده
            </Button>
        </Grid>
        <Grid xs={12} sx={{ mt: 2}} item>
            <ProgressBar id="progressbar" />
        </Grid>
        {responseTime && (
            <Grid xs={12} sx={{ mt: 2 }} item>
                <Typography style={{ textAlign: "center", color: "coral" }}>
                    مدت زمان عملیات: {responseTime} ثانیه
                </Typography>
            </Grid>
        )}
    </SubCard>
);

export default RootLocusParameters;
