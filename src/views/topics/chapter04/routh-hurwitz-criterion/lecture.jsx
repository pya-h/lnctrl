import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import Poly from "../../../../math/algebra/functions/poly";
import routh_hurwitz_symbolic_table from './images/routh_hurwitz_table.png';

const transformSInverse = "$$s \\rightarrow \\frac{1}{s} $$";
const sTransformInFormula = "$$" + Poly.Symbolic("n", "s", 2, "a", true) + " \\rightarrow " + Poly.Symbolic("n", "(\\frac{1}{s})", 2, "a", true) + " $$"
const RouthHurwitzCriterionLecture = () => {
    return (
        <SubCard
            title="Routh-Hurwitz Stability Criterion"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    If the characteristic equation of the system is as follows:
                </p>
                <MathJax>{Poly.Symbolic("n", "s", 3)}</MathJax>
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    The Routh-Hurwitz array will be as follows:
                </p>
            </Grid>
            <Grid className="lecture-text" sx={{mr: 20}} item>
                <img
                        className="lecture-image"
                        src={routh_hurwitz_symbolic_table}
                        alt="Image loading failed"
                    />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    The number of poles on the right-hand side of the imaginary axis of the closed-loop transfer function (roots of the characteristic equation) equals the number of sign changes in the first column of the Routh-Hurwitz array.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <h1>Notes</h1>
            </Grid>
            
            <Grid className="lecture-text" item>
                <p>1- If we multiply any row by a positive number, no change results; this is recommended for ease of calculations.
                </p>
            </Grid>
            
            <Grid className="lecture-text" item>
                <p>2- If one of the elements in the first column becomes zero, there are two approaches:
                </p>
                <p>a) In place of the zero element, Ɛ can be placed, and by means of it the elements of the first column can be identified as positive or negative.
                </p>
                <p>b) In the characteristic equation, all the s terms can be inverted. Applying this transformation inverts the roots, but the half-plane of the roots does not change.
                </p>
                <MathJax>{transformSInverse}</MathJax>
                <MathJax>{sTransformInFormula}</MathJax>
                <p>Note: With this change, another row may become zero; in that case, the characteristic equation has a root on the imaginary axis.
                </p>
                <p>c) We multiply the characteristic equation by another algebraic expression.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>3- If all elements of a row become zero:
                </p>
                <p>To solve, we form an auxiliary equation; this equation is constructed from the row above the zero row. We then differentiate the auxiliary equation, and the coefficients of the derivative of the auxiliary equation replace the zero row.
                </p>
            </Grid>
        </SubCard>
    );
};

export default RouthHurwitzCriterionLecture;
