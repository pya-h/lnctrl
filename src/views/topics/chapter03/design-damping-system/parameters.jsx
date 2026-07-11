import { Grid, Typography } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";

const parameterFormulas = [
    "$$M_{p} = $$",
    "$$t_{rise} = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = ["%", "$$sec$$", "$$sec$$", "$$sec$$", null];

const DesignSystemByCharsParameters = ({
    M_p,
    t_rise,
    $M_p,
    $t_rise,
    t_i,
    t_f,
    $t_i,
    $t_f,
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    const grids = 1;
    const checkRiseTime = (value) => value >= 0 && $t_rise(value);
    const checkOvershoot = (value) => value >= 0 && $M_p(value);

    // sweep the design specs themselves; ti/tf/N only shape the graph window
    const autoPlayParams = [
        { key: "M_p", label: "M_p", value: M_p, setValue: $M_p },
        { key: "t_rise", label: "t_{rise}", value: t_rise, setValue: $t_rise },
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
                    parameters={[ M_p, t_rise, t_i, t_f, N]}
                    setters={[ checkOvershoot, checkRiseTime, $t_i, $t_f, $N]}
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
                                y: M_p,
                                x: 0,
                                select: ({ y }) => {
                                    if (y && y >= 0) $M_p(y);
                                },
                            }}
                            extra={{
                                y: 0,
                                x: t_rise,
                                select: ({ x }) => {
                                    if (x && x >= 0) $t_rise(x);
                                },
                            }}
                            options={{ pointSize: 10, grids}}
                        />
                    </div>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default DesignSystemByCharsParameters;
