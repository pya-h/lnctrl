import { Fab, Grid, Slider, Stack, Typography } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import { MathJax } from "better-react-mathjax";
import AnimateButton from "views/ui-component/extended/AnimateButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import { useState } from "react";

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
    thickness,
    setThickness,
    step,
    setStep,
    finalStep,
    guides,
}) => {
    const [sliderValue, setSliderValue] = useState(25);

    const updateThickness = (value) => {
        setSliderValue(value);
        setThickness(sliderValue / 5);
    };
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
            {guides && guides.length && (
                <Grid xs={12} item>
                    <Typography sx={{my: 2, py: 2}} style={{textAlign: "center", border: '2px outset lightcoral', borderRadius: '1rem', color: 'coral' }}>
                        {guides[step]}
                    </Typography>
                </Grid>
            )}
            <Grid xs={12} sx={{ mt: 2, pl: 2 }} spacing={gridSpacing} container>
                <Grid style={{ textAlign: "left" }} xs={3} item>
                    <Fab
                        size="large"
                        sx={{ p: 2 }}
                        variant="circular"
                        disabled={step <= 0}
                        onClick={() => setStep(step - (step > 0 ? 1 : 0))}
                    >
                        <AnimateButton type="scale" direction="down">
                            <Grid sx={{ mt: 1, ml: 1 }}>
                                <ArrowBackIosIcon />
                            </Grid>
                        </AnimateButton>
                    </Fab>
                </Grid>
                <Grid xs={6} item>
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ py: 2, direction: "ltr" }}
                        alignItems="center"
                    >
                        <Fullscreen />
                        <Slider
                            aria-label="Volume"
                            value={sliderValue}
                            onChange={(e, value) => updateThickness(value)}
                        />
                        <FilterCenterFocusIcon />
                    </Stack>
                </Grid>
                <Grid xs={3} item>
                    <Fab
                        size="large"
                        sx={{ p: 2 }}
                        variant="circular"
                        disabled={step >= finalStep - 1}
                        onClick={() =>
                            setStep(step + (step < finalStep - 1 ? 1 : 0))
                        }
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
};

export default SketchingRootLocusParameters;
