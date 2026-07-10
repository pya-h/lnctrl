import { Grid, Button, Typography } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";
import { gridSpacing } from '../../../../store/constant';

const parameterFormulas = [
    "$$a = $$",
    "$$k = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [null, null, "$$sec$$", "$$sec$$", null];

const FOTFParameters = ({
    k,
    a,
    $k,
    $a,
    t_i,
    t_f,
    $t_i,
    $t_f,
    inputSignal,
    $inputSignal,
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    const grids = 10;
    const selectRealPart = (point) => {
        if (point) $a(-point.x);
    };

    // only the system parameters are meaningful to sweep; ti/tf/N shape the graph
    const autoPlayParams = [
        { key: "a", label: "a", value: a, setValue: $a },
        { key: "k", label: "k", value: k, setValue: $k },
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
                />
            }
            sx={{
                direction: "ltr",
                textAlign: "left",
                height: "100%",
            }}
        >
            <Grid xs={12} container>
                <Grid xs={6} sx={{ pr: 1, pb: 1 }} item>
                    <Button
                        onClick={() => $inputSignal(0)}
                        disabled={isAutoPlaying}
                        style={{ width: "100%", textTransform: "none" }}
                        variant={inputSignal === 0 ? "contained" : "outlined"}
                    >
                        Step
                    </Button>
                </Grid>
                <Grid sx={{ pb: 1 }} xs={6} item>
                    <Button
                        onClick={() => $inputSignal(1)}
                        disabled={isAutoPlaying}
                        style={{ width: "100%", textTransform: "none" }}
                        variant={inputSignal === 1 ? "contained" : "outlined"}
                    >
                        Ramp
                    </Button>
                </Grid>
            </Grid>
            <Grid spacing={gridSpacing} container direction="row">
            
                <SimpleParametersList parameters={[a, k, t_i, t_f, N]} setters={[$a, $k, $t_i, $t_f, $N]} labels={parameterFormulas} units={parameterUnits} disabled={isAutoPlaying} />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <Typography style={{textAlign: 'center'}}>Select the location of the pole</Typography>
                    {/* keep the pole animating during autoplay, but block dragging it */}
                    <div style={isAutoPlaying ? { pointerEvents: "none", opacity: 0.6 } : undefined}>
                        <CoordinateSystem
                            point={{ x: -a, y: 0, select: selectRealPart }}
                            options={{ pointSize: 10, grids }}
                        />
                    </div>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default FOTFParameters;
