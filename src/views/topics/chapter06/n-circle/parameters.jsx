import { Grid, Button, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";

const parameterFormulas = [
    "$$N = $$",
    "$$N_{iterations} = $$",
];

const NCircleParameters = ({
    N,    $N,
    phaseInRadianScale,
    setPhaseInRadianScale,
    iterations,
    $iterations,
}) => {
    // const grids = 10;
    // const selectR = (point) => {
    //     if (point) $R(point.x);
    // };
    // const selectC = (point) => {
    //     if (point) $C(point.y);
    // };

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
                    parameters={[N, iterations]}
                    setters={[$N, $iterations]}
                    labels={parameterFormulas}
                    units={[phaseInRadianScale ? "$$rad$$" : "$$deg$$", null]}
                />
                <Grid xs={12} item>
                <hr />
                </Grid>
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
                    <Grid xs={12} item>
                        <Typography dir="rtl" style={{textAlign:'center'}}>ورودی فاز بر حسب:</Typography>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale(false)}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={
                                !phaseInRadianScale ? "contained" : "outlined"
                            }
                        >
                            درجه
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
                            رادیان
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default NCircleParameters;
