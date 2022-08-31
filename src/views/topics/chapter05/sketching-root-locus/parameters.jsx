import { Fab, Grid } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import { MathJax } from "better-react-mathjax";
import AnimateButton from "views/ui-component/extended/AnimateButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const startLebels = ["$$Num = [$$", "$$Den = [$$", "$$N = $$"];
const endLabels = ["$$]$$", "$$]$$", null];

const SketchingRootLocusParameters = ({
    rawNumerator,
    rawDenominator,
    $rawNumerator,
    $rawDenominator,
    N,
    $N,
    formula,
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
        <SubCard>
            <Grid id="formulaBox" container direction="row">
                <MathJax style={{ margin: "auto" }}>{formula}</MathJax>
            </Grid>
        </SubCard>

        <hr />
        <Grid spacing={gridSpacing} container direction="row">
            <SimpleParametersList
                parameters={[rawNumerator, rawDenominator, N]}
                setters={[$rawNumerator, $rawDenominator, $N]}
                labels={startLebels}
                units={endLabels}
            />
        </Grid>

        <Grid xs={12} sx={{ mt: 4, pl: 2 }} spacing={gridSpacing} container>
            <Grid style={{ textAlign: "left" }} xs={6} item>
                <Fab
                    size="large"
                    sx={{ p: 4 }}
                    variant="circular"
                    onClick={() => {}}
                >
                    <AnimateButton type="scale" direction="down">
                        <Grid sx={{ mt: 1, ml: 1 }}>
                            <ArrowBackIosIcon />
                        </Grid>
                    </AnimateButton>
                </Fab>
            </Grid>
            <Grid xs={6} item>
                <Fab
                    size="large"
                    sx={{ p: 4 }}
                    variant="circular"
                    onClick={() => {}}
                >
                    <AnimateButton type="scale" direction="down">
                        <Grid sx={{ mt: 1 }}>
                            <ArrowForwardIosIcon />
                        </Grid>
                    </AnimateButton>
                </Fab>
            </Grid>
        </Grid>
    </SubCard>
);

export default SketchingRootLocusParameters;
