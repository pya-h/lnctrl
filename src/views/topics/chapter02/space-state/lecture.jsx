import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";

const formulaSpaceStateEquations =
    "$$\\begin{cases}\\dot{x}(t) = Ax(t) + Bu(t) \\\\ y(t) = Cx(t) + Du(t)\\end{cases}$$";
const formulaSpaceStateZeroInput = "$$\\dot{x}(t) = Ax(t)$$";
const formulaGettingLaplace =
    "$$\\begin{cases} sX(s) - x(0) = AX(s) \\\\ \\\\ [sI - A]X(s) = x(0) \\\\ \\\\ X(s) = [sI - A]^{-1} x(0) \\end{cases}$$";
const formulaStateSpaceDirectAnswer = "$$x(t) = e^{A(t-t_0)}x(t_0)$$";
const formulaStateSpaceDirectAnswer_t0EqualsZero =
    "$$if: t_0 = 0 \\rightarrow x(t) = e^{A(t)}x(0)$$";
const formulaSpaceStateTransferMatrix =
    "$$\\varphi(t) = e^{At} = \\mathscr{L}^{-1}\\{(sI - A)^{-1}\\}$$";
const SpaceStateLecture = () => {
    return (
        <SubCard
            title="State-space equations"
            darkBorder={true}
            sx={{ direction: "ltr" }}
            background="lightgray"
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <p>
                        Consider the following state and output equations:
                    </p>
                    <MathJax>{formulaSpaceStateEquations}</MathJax>
                    <p>
                        If we solve the first equation for a given input and given initial conditions, we obtain the response of the system's state variables to the input applied to the system. By substituting the computed state vector x(t) into the output relation y(t), we obtain the system's response for that same input and initial conditions.
                    </p>
                    <p>
                        [continuation of page 15/41 text, solving the equation using the Taylor expansion]
                    </p>
                </Grid>
                <Grid className="lecture-text" item>
                    <h2>Laplace transform method for solving the homogeneous state equation:</h2>
                    <MathJax>{formulaSpaceStateZeroInput}</MathJax>

                    <p>
                        Taking the Laplace transform of the above equation, we have:
                    </p>
                    <MathJax>{formulaGettingLaplace}</MathJax>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        Now, if we compare this result with the relation obtained from the direct method:
                    </p>
                    <MathJax>{formulaStateSpaceDirectAnswer}</MathJax>

                    <MathJax>
                        {formulaStateSpaceDirectAnswer_t0EqualsZero}
                    </MathJax>
                </Grid>

                <Grid className="lecture-text" item>
                    <p>Therefore:</p>
                    <MathJax>{formulaSpaceStateTransferMatrix}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default SpaceStateLecture;
