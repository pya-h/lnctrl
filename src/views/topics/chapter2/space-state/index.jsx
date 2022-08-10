
import SpaceStateLecture from "./lecture";

import { useState } from "react";
import SpaceStateParameters from "./parameters";
import { Grid } from "@mui/material";
import SpaceStateEquationSolveBox from './solve';

const SpaceStateExample = () => {
    const [A, $A] = useState([
        [0, 1],
        [-3, -4],
    ]);

    const [C, $C] = useState([1, 0]);

    const [x_0, $x_0] = useState([[1], [-1]]);
    return (
        <Grid container direction="column" spacing={1}>
            <Grid
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    direction: "ltr",
                }}
                item
            >
                <SpaceStateLecture />
            </Grid>

            <Grid
                spacing={2}
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    marginTop: "1%",
                    direction: "ltr",
                }}
                container
            >
                <Grid lg={4} md={12} sm={12} xs={12} item>
                    <SpaceStateParameters
                       A={A}
                       $A={$A}
                       C={C}
                       $C={$C}
                       x_0={x_0}
                       $x_0={$x_0}

                    />
                </Grid>
                <Grid lg={8} md={12} sm={12} xs={12} item>
                    <SpaceStateEquationSolveBox A={A} C={C} x_0={x_0} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SpaceStateExample;
