import { Grid, Typography } from "@mui/material";
import simple_LTI_system from "./visual/simple_lti_system.png";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

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
        <PinchPanCard title="First-order transfer function" border={true}>
            <Grid container>
                <Grid xs={12} sx={{m: "auto"}}  item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        These transfer functions take the following form:
                        <MathJax style={{ fontSize: "18px" }}>
                            {firstOrderTransferFunctionFormFormula}
                        </MathJax>
                        <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                            Steady-State Response
                        </h1>
                        The diagram of a simple LTI system is as follows:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={simple_LTI_system}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} sx={{m: "auto"}} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                firstOrderTransferFunctionSteadyStateTransientFormula
                            }
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {steadyStateCalculationsFormula}
                        </MathJax>
                        Note: According to the final value theorem, we have:
                        <MathJax style={{ fontSize: "18px" }}>
                            {resultOfFinalValueTheorem}
                        </MathJax>
                        <h1
                            style={{
                                marginTop: "5%",
                                marginBottom: "3%",
                            }}
                        >
                            Unit step response
                        </h1>
                        Now we compute the steady-state response to a unit step input for the aforementioned system:
                        <MathJax style={{ fontSize: "18px" }}>
                            {stepFunctionFormula}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {stepResponseOfFirstOrderTfInLaplaceDomain}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {stepResponseOfFirstOrderTfInTimeDomain}
                        </MathJax>
                        As a result, the steady-state value of the system is:
                        <MathJax style={{ fontSize: "18px" }}>
                            {stepInputSteadyStateValueForFirstOrderTf}
                        </MathJax>
                        <h1
                            style={{
                                marginTop: "5%",
                                marginBottom: "3%",
                            }}
                        >
                            Unit ramp response
                        </h1>
                        Now we compute the steady-state response to a unit ramp input for the aforementioned system:
                        <MathJax style={{ fontSize: "18px" }}>
                            {rampFunctionFormula}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {rampResponseOfFirstOrderTfInLaplaceDomain}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {rampResponseOfFirstOrderTfInTimeDomain}
                        </MathJax>
                        As a result, the steady-state value of the system is:
                        <MathJax style={{ fontSize: "18px" }}>
                            {rampInputSteadyStateValueForFirstOrderTf}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default FOTFLecture;
