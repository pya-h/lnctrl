import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import { Poly } from "math/algebra/functions";
import hurwitz_symbolic_deltas from "./images/hurwitz_deltas.jpg";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const HurwitzCriterionLecture = () => {
    return (
        <PinchPanCard title="Hurwitz stability criterion" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        All roots of the characteristic equation lie to the left of the imaginary axis if and only if:
                        <MathJax style={{ fontSize: "18px" }}>
                            {"$$\\Delta_i > 0$$"}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {Poly.Symbolic("n", "s", 3)}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={hurwitz_symbolic_deltas}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        The necessary condition for the real part of the poles to be negative is the following expression:
                        <br />
                        1- All a terms having the same sign<sub>i</sub> s: If they do not all have the same sign, there is definitely a root to the right of the imaginary axis.
                        <br />
                        2- All a coefficients being nonzero<sub>i</sub> s: Otherwise, a root lies on the imaginary axis or to its right. (There exists a root that is not to the left of the imaginary axis.)
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default HurwitzCriterionLecture;
