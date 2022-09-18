import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SpaceStateLecture = () => {
    return (
        <PinchPanCard title="State-space equations" border={true}>
            <Grid item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    Consider the following state and output equations:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\begin{cases}\\dot{x}(t) = Ax(t) + Bu(t) \\\\ y(t) = Cx(t) + Du(t)\\end{cases}$$"
                        }
                    </MathJax>
                    If we solve the first equation for a given input and given initial conditions, we obtain the response of the system's state variables to the input applied to the system. By substituting the computed state vector x(t) into the output relation y(t), we obtain the system's response for that same input and initial conditions.
                    <br />
                    [continuation of page 15/41 text, solving the equation using the Taylor expansion]
                    <h2>Laplace transform method for solving the homogeneous state equation:</h2>
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$\\dot{x}(t) = Ax(t)$$"}
                    </MathJax>
                    Taking the Laplace transform of the above equation, we have:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\begin{cases} sX(s) - x(0) = AX(s) \\\\ \\\\ [sI - A]X(s) = x(0) \\\\ \\\\ X(s) = [sI - A]^{-1} x(0) \\end{cases}$$"
                        }
                    </MathJax>
                    Now, if we compare this result with the relation obtained from the direct method:
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$x(t) = e^{A(t-t_0)}x(t_0)$$"}
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$if: t_0 = 0 \\rightarrow x(t) = e^{A(t)}x(0)$$"}
                    </MathJax>
                    As a result:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\varphi(t) = e^{At} = \\mathscr{L}^{-1}\\{(sI - A)^{-1}\\}$$"
                        }
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SpaceStateLecture;
