import { Grid, Typography } from "@mui/material";
import ThemedImage from "views/ui-component/ThemedImage";
import "views/topics/topics.css";
import routh_hurwitz_symbolic_table from "./images/routh_hurwitz_table.png";
import routh_hurwitz_symbolic_table_dark from "./images/routh_hurwitz_table-dark.png";
import { MathJax } from "better-react-mathjax";
import { Poly } from "math/algebra/functions";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const transformSInverse = "$$s \\rightarrow \\frac{1}{s} $$";
const sTransformInFormula =
    "$$" +
    Poly.Symbolic("n", "s", 2, "a", true) +
    " \\rightarrow " +
    Poly.Symbolic("n", "(\\frac{1}{s})", 2, "a", true) +
    " $$";
const RouthHurwitzCriterionLecture = () => {
    return (
        <PinchPanCard title="Routh-Hurwitz Stability Criterion" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        If the characteristic equation of the system is as follows:
                        <MathJax style={{ fontSize: "18px" }}>
                            {Poly.Symbolic("n", "s", 3)}
                        </MathJax>
                        The Routh-Hurwitz array will be as follows:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={routh_hurwitz_symbolic_table} dark={routh_hurwitz_symbolic_table_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        The number of poles on the right-hand side of the imaginary axis of the closed-loop transfer function (roots of the characteristic equation) equals the number of sign changes in the first column of the Routh-Hurwitz array.
                        <h1>Notes</h1>
                        1- If we multiply any row by a positive number, no change results; this is recommended for ease of computation.
                        <br />
                        2- If one of the elements of the first column becomes zero, there are two approaches:
                        <br />
                        a) In place of the zero element, Ɛ can be placed, and by means of it the elements of the first column can be identified as positive or negative.
                        <br />
                        b) In the characteristic equation, all the s terms can be inverted. Applying this transformation inverts the roots, but the half-plane of the roots does not change.
                        <MathJax style={{ fontSize: "18px" }}>
                            {transformSInverse}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {sTransformInFormula}
                        </MathJax>
                        Note: With this change, another row may become zero; in that case, the characteristic equation has a root on the imaginary axis.
                        <br />
                        c) We multiply the characteristic equation by another algebraic expression.
                        <br />
                        3- If all elements of a row become zero:
                        <br />
                        To solve, we form an auxiliary equation; this equation is constructed from the row above the zero row. We then differentiate the auxiliary equation, and the coefficients of the derivative of the auxiliary equation replace the zero row.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default RouthHurwitzCriterionLecture;
