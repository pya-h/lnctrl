import { Grid } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";

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
            <Grid spacing={0.6} container direction="row">
                <SimpleParametersList
                    parameters={[ rawNumerator, rawDenominator, k_min, k_max]}
                    setters={[ $rawNumerator, $rawDenominator, $k_min, $k_max]}
                    labels={startLebels}
                    units={endLabels}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{ textAlign: "center" }}>
                        محدوده ی بهره را مشخص کنید
                    </p>

                    <CoordinateSystem
                        point={{
                            y: 0,
                            x: k_min,
                            select: ({ x }) => {
                                if (x) $k_min(x);
                            },
                        }}
                        extra={{
                            y: 0,
                            x: k_max,
                            select: ({ x }) => {
                                if (x && x >= k_min) $k_max(x);
                            },
                        }}
                        options={{ pointSize: 20, grids}}
                   />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default RootLocusParameters;
