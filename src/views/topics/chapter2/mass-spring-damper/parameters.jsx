import { Grid, Button } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { useState, useEffect } from "react";
import SimpleParametersList from "input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$m = $$",
    "$$c = $$",
    "$$k = $$",
    "$$F(t) = $$",
    "$$x_i = $$",
    "$$v_i = $$",
    "$$t_i = $$",
    "$$t_f = $$",
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
}) => {
    const [out, $out] = useState(null);

    useEffect(() => {
        $out(output ? output.toLowerCase() : "y");
    }, [output]);

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
                    parameters={[m, c, k, F_t, x_i, v_i, t_i, t_f]}
                    setters={[$m, $c, $k, $F_t, $x_i, $v_i, $t_i, $t_f]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />
                <Grid xs={12} container>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output(null)}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={out === "y" ? "contained" : "outlined"}
                        >
                            x
                        </Button>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output("dy")}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={out === "dy" ? "contained" : "outlined"}
                        >
                            v
                        </Button>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => $output("d2y")}
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
