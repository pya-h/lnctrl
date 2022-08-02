import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import Poly from "../../../../math/algebra/functions/poly";
import hurwitz_symbolic_deltas from './images/hurwitz_deltas.jpg';

const HurwitzCriterionLecture = () => {
    return (
        <SubCard
            title="Hurwitz stability criterion"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Typography>
            <Grid className="lecture-text" item>
                <p>
                    All roots of the characteristic equation lie to the left of the imaginary axis if and only if:
                </p>
                <MathJax>{"$$\\Delta_i > 0$$"}</MathJax>
                <MathJax>{Poly.Symbolic("n", "s", 3)}</MathJax>
            </Grid>
            <Grid className="lecture-text" sx={{mr: 20}} item>
                <img
                        className="lecture-image"
                        src={hurwitz_symbolic_deltas}
                        alt="Image loading failed"
                    />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    The necessary condition for the real part of the poles to be negative is the following expression:
                </p>
            </Grid>
 
            <Grid className="lecture-text" item>
                <p>1- All a having the same sign<sub>i</sub> s: If they do not all have the same sign, there is definitely a root to the right of the imaginary axis.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>2- All a being nonzero<sub>i</sub> s: Otherwise, a root lies on the imaginary axis or to its right. (There exists a root that is not to the left of the imaginary axis.)  
                </p>
            </Grid>
            </Typography>
        </SubCard>
    );
};

export default HurwitzCriterionLecture;
