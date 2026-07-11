import { Grid, Button } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import { useState, useEffect } from "react";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";

const parameterFormulas = [
    "$$m = $$",
    "$$c = $$",
    "$$k = $$",
    "$$F(t) = $$",
    "$$x_i = $$",
    "$$v_i = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [
    "$$Kg$$",
    "$$\\frac{N.s}{m}$$",
    "$$\\frac{N}{m}$$",
    "$$N$$",
    "$$m$$",
    "$$\\frac{m}{s}$$",
    "$$sec$$",
    "$$sec$$",
    null
];

const MassSpringDamperParameters = ({
    m,
    c,
    k,
    F_t,
    x_i,
    v_i,
    t_i,
    t_f,
    output,
    $m,
    $c,
    $k,
    $F_t,
    $x_i,
    $v_i,
    $t_i,
    $t_f,
    $output,
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    const [out, $out] = useState(null);

    useEffect(() => {
        $out(output ? output.toLowerCase() : "y");
    }, [output]);

    // every mechanical parameter and initial condition is a plain number worth
    // sweeping; ti/tf/N and the x/v/a selector only shape the graph
    const autoPlayParams = [
        { key: "m", label: "m", value: m, setValue: $m },
        { key: "c", label: "c", value: c, setValue: $c },
        { key: "k", label: "k", value: k, setValue: $k },
        { key: "F_t", label: "F(t)", value: F_t, setValue: $F_t },
        { key: "x_i", label: "x_i", value: x_i, setValue: $x_i },
        { key: "v_i", label: "v_i", value: v_i, setValue: $v_i },
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
                    parameters={[m, c, k, F_t, x_i, v_i, t_i, t_f, N]}
                    setters={[$m, $c, $k, $F_t, $x_i, $v_i, $t_i, $t_f, $N]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />
                <Grid xs={12} container>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output(null)}
                            disabled={isAutoPlaying}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={out === "y" ? "contained" : "outlined"}
                        >
                            x
                        </Button>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output("dy")}
                            disabled={isAutoPlaying}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={out === "dy" ? "contained" : "outlined"}
                        >
                            v
                        </Button>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output("d2y")}
                            disabled={isAutoPlaying}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={out === "d2y" ? "contained" : "outlined"}
                        >
                            a
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default MassSpringDamperParameters;
