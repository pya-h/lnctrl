import { Button, Grid } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";

const startLebels = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$k_{min} = $$",
    "$$k_{max} = $$",
];
const endLabels = ["$$]$$", "$$]$$", null, null];

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
}) => {
    const grids = 10;

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
                    parameters={[rawNumerator, rawDenominator, k_min, k_max]}
                    setters={[$rawNumerator, $rawDenominator, $k_min, $k_max]}
                    labels={startLebels}
                    units={endLabels}
                />
                <Grid md={12} sm={4} xs={6} item>
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
            </Grid>
        </SubCard>
    );
};

export default RootLocusParameters;
