import { Grid, Typography } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";

const parameterFormulas = [
    "$$\\omega_{n} = $$",
    "$$\\zeta = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [null, null, "$$sec$$", "$$sec$$", null];

const SOTFByParamsInputs = ({
    w_n,
    zeta,
    $w_n,
    $zeta,
    t_i,
    t_f,
    $t_i,
    $t_f,
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    const grids = 10;
    const checkSetW_N = (value) => value && $w_n(value);

    // only the system parameters are meaningful to sweep; ti/tf/N shape the graph
    const autoPlayParams = [
        { key: "w_n", label: "\\omega_n", value: w_n, setValue: $w_n },
        { key: "zeta", label: "\\zeta", value: zeta, setValue: $zeta },
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
            <Grid spacing={0.6} container direction="row">
                <SimpleParametersList
                    parameters={[w_n, zeta, t_i, t_f, N]}
                    setters={[
                        checkSetW_N,
                        $zeta,
                        $t_i,
                        $t_f,
                        $N
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <Typography style={{ textAlign: "center" }}>
                        You can also change the parameter values from here
                    </Typography>

                    {/* keep the marker animating during autoplay, but block dragging it */}
                    <div style={isAutoPlaying ? { pointerEvents: "none", opacity: 0.6 } : undefined}>
                        <CoordinateSystem
                            point={{
                                x: w_n,
                                y: 0,
                                select: ({x}) => {
                                    if(x) $w_n(x)
                                }
                            }}
                            extra={{
                                x: 0,
                                y: zeta,
                                select: ({y}) => {
                                    if(y) $zeta(y)
                                }
                            }}
                            options={{ pointSize: 10, grids }}
                        />
                    </div>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SOTFByParamsInputs;
