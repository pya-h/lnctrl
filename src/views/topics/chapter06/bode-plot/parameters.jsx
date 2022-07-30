import {
    Grid,
    Button,
    Fab,
    Stack,
    Slider,
    TextField,
    InputAdornment,
} from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from "store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { MathJax } from "better-react-mathjax";

const parameterFormulas = [
    "$$Num = [$$",
    "$$Den = [$$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$",
];
const parameterUnits = ["$$]$$", "$$]$$", "$$Hz$$", "$$Hz$$", null];

const BodePlotParameters = ({
    rawNumerator,
    rawDenominator,
    $rawNumerator,
    $rawDenominator,
    w_min,
    w_max,
    $w_min,
    $w_max,
    phaseInRadianScale,
    setPhaseInRadianScale,
    N,
    $N,
    multiplier,
    K,
    $K,
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
                <Grid xs={12} item>
                    <hr />
                </Grid>
                <Grid xs={12} style={{ paddingLeft: "3%" }} container>
                    <Grid xs={12} item>
                        <p dir="rtl" style={{ textAlign: "center" }}>
                            خروجی فاز بر حسب:
                        </p>
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
            <hr />
            <Grid
                xs={12}
                sx={{ pt: gridSpacing }}
                spacing={gridSpacing}
                style={{ textAlign: "center" }}
                container
            >
                <Grid xs={12} item>
                    تاثیر ضرب اسکالر سیستم در نمودار بود
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        onClick={() => multiplier(0.1)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\times\\frac{1}{10}$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        onClick={() => multiplier(10)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\times 10$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
                <Grid xs={4} item>
                    <Fab
                        size="large"
                        variant="circular"
                        onClick={() => multiplier(-1)}
                    >
                        <AnimateButton type="scale" direction="down">
                            <MathJax>{"$$\\lgroup - \\rgroup$$"}</MathJax>
                        </AnimateButton>
                    </Fab>
                </Grid>
            </Grid>
            <br />

            <hr />
            <br />
            <Grid
                xs={12}
                style={{ textAlign: "center", border: '1px solid grey', borderRadius: '1rem', paddingBottom: '0.5rem', paddingRight: '0.5rem', margin: 'auto' }}
                spacing={gridSpacing}
                container
            >
                <Grid xs={12} item>
                    تاثیر تغییر بهره در نمودار بود
                </Grid>
                <Grid xs={9} item>
                    <Slider sx={{mt: 1}}
                        aria-label="Volume"
                        value={K}
                        onChange={(e, value) => $K(value)}
                    />
                </Grid>
                <Grid  xs={3} item>
                    <TextField
                        onChange={(e) => $K(e.target.value)}
                        value={K}
                        sx={{ width: "100%" }}
                       
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default BodePlotParameters;
