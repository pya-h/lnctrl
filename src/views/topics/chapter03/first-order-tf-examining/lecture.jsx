import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import simple_LTI_system from "./visual/simple_lti_system.png";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";

const firstOrderTransferFunctionFormFormula = "$$G(s) = \\frac{k}{s + a}$$";
const firstOrderTransferFunctionSteadyStateTransientFormula =
    "$$c(t) = c_{tr}(t) + c_{ss}(t)$$";

const steadyStateCalculationsFormula =
    "$$\\begin{cases} \\lim\\limits_{t \\to \\infty}c_{tr}(t) = 0 \\\\ \\lim\\limits_{t \\to \\infty}c_{ss}(t) = c_{ss} \\end{cases} \\rightarrow c_{ss} = \\lim\\limits_{t \\to \\infty}c(t)$$";
const resultOfFinalValueTheorem =
    "$$c_{ss} = \\lim\\limits_{t \\to \\infty}c_{ss}(t) = \\lim\\limits_{s \\to 0}sC(s)$$";

const stepFunctionFormula = "$$r(t) = u(t) \\rightarrow R(s) = \\frac{1}{s}$$";
const stepResponseOfFirstOrderTfInLaplaceDomain =
    "$$C(s) = G(s)R(s) = \\frac{k}{s(s + 1)}$$";
const stepResponseOfFirstOrderTfInTimeDomain =
    "$$c(t) = (\\frac{k}{a} - \\frac{k}{a}e^{-at})u(t)$$";
const stepInputSteadyStateValueForFirstOrderTf =
    "$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s + a} = \\frac{k}{a}$$";

const rampFunctionFormula =
    "$$r(t) = tu(t) \\rightarrow R(s) = \\frac{1}{s^2}$$";
const rampResponseOfFirstOrderTfInLaplaceDomain =
    "$$C(s) = G(s)R(s) = \\frac{k}{s^2(s + 1)}$$";
const rampResponseOfFirstOrderTfInTimeDomain =
    "$$c(t) = \\frac{k}{a}(t - \\frac{1}{a})u(t) + \\frac{k}{a^2}e^{-at}u(t)$$";
const rampInputSteadyStateValueForFirstOrderTf =
    "$$c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\lim\\limits_{s \\to 0}\\frac{k}{s(s + a)} = \\infty$$";

const FOTFLecture = () => {
    return (
        <SubCard
            title="First-order transfer function"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <p>
                        These transfer functions are of the following form:
                    </p>
                </Grid>
                <Grid item>
                    <MathJax>{firstOrderTransferFunctionFormFormula}</MathJax>
                </Grid>
                <Grid className="lecture-text" item>
                    <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                        Steady-State Response
                    </h1>
                    <p>
                        The diagram of a simple LTI system is as follows:
                    </p>
                </Grid>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={simple_LTI_system}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>
                        {firstOrderTransferFunctionSteadyStateTransientFormula}
                    </MathJax>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{steadyStateCalculationsFormula}</MathJax>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        Note: According to the final value theorem, we have:
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{resultOfFinalValueTheorem}</MathJax>
                </Grid>
                <Grid sx={{ mt: 1 }} item>
                    <SubCard>
                        <Grid className="lecture-text" item>
                            <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                                Unit step response
                            </h1>
                            <p>
                                Now we compute the steady-state response to a unit step input for the aforementioned system:
                            </p>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>{stepFunctionFormula}</MathJax>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {stepResponseOfFirstOrderTfInLaplaceDomain}
                            </MathJax>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {stepResponseOfFirstOrderTfInTimeDomain}
                            </MathJax>
                        </Grid>
                        <Grid className="lecture-text" item>
                            <p>
                                As a result, the steady-state value of the system is:
                            </p>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {stepInputSteadyStateValueForFirstOrderTf}
                            </MathJax>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid sx={{ mt: 1 }} item>
                    <SubCard>
                        <Grid className="lecture-text" item>
                            <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                                Unit ramp response
                            </h1>
                            <p>
                                Now we compute the steady-state response to a unit ramp input for the aforementioned system:
                            </p>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>{rampFunctionFormula}</MathJax>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {rampResponseOfFirstOrderTfInLaplaceDomain}
                            </MathJax>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {rampResponseOfFirstOrderTfInTimeDomain}
                            </MathJax>
                        </Grid>
                        <Grid className="lecture-text" item>
                            <p>
                                As a result, the steady-state value of the system is:
                            </p>
                        </Grid>
                        <Grid style={{ fontSize: "20px" }} item>
                            <MathJax>
                                {rampInputSteadyStateValueForFirstOrderTf}
                            </MathJax>
                        </Grid>
                    </SubCard>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default FOTFLecture;
