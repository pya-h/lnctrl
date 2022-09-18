import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";

import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SOTFByPolesLecture = () => {
    return (
        <PinchPanCard title="Second-order transfer function - parametric study" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    The response of a second-order system to a step input is one of the following three cases:
                    <h1>Overdamped Response</h1>
                    In this case, the system has two negative real poles.
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ G(s) = \\frac{k}{(s + \\alpha) (s + \\beta)} \\qquad
                            \\alpha,\\beta > 0, \\quad \\alpha \\neq \\beta \\\\
                            C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha) (s + \\beta)}
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha\\beta} \\\\
                            c(t) = (\\frac{k}{\\alpha\\beta} + \\frac{k}{\\alpha - \\beta} \\lgroup \\frac{e^{-\\alpha t}}{\\alpha} - \\frac{e^{-\\beta t}}{\\beta}\\rgroup)u(t)$$`}
                    </MathJax>
                    <h1>Critically Damped Response</h1>
                    In this case, the system has two equal negative real poles.
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ G(s) = \\frac{k}{(s + \\alpha)^2} \\qquad
                            \\alpha,\\beta > 0, \\quad \\alpha = \\beta \\\\
                            C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha)^2}
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha^2} \\\\ 
                            c(t) = (\\frac{k}{\\alpha^2} - \\frac{k}{\\alpha^2} \\lgroup 1 + \\alpha t\\rgroup)e^{-\\alpha t}u(t)$$`}
                    </MathJax>
                    <h1>Underdamped (oscillatory) response</h1>
                    In this case, the system has two conjugate poles with a negative real value.
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ G(s) = \\frac{k}{s + \\alpha + j\\beta)(s + \\alpha - j\\beta)} \\qquad
                            \\alpha > 0 \\\\
                            \\Longrightarrow G(s) = \\frac{k}{(s^2 + 2\\alpha s + (\\alpha ^ 2 + \\beta ^ 2) } \\\\ 
                            C(s) = \\frac{1}{s}G(s) = \\frac{k}{s^3 + 2\\alpha s^2 + (\\alpha ^ 2 + \\beta ^ 2)s } =  
                            \\frac{1}{s} \\frac{k}{(s + \\alpha)^2 + \\beta ^ 2 }\\\\ 
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2} \\\\ 
                            c(t) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2}u(t) - \\frac{ke^{-\\alpha t}}{\\alpha ^ 2 + \\beta ^ 2} \\lgroup cos\\beta t + \\frac{\\alpha}{\\beta}sin\\beta t \\rgroup u(t) \\\\
                            \\Longrightarrow c(t) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2}u(t) - \\frac{\\sqrt{\\alpha ^ 2 + \\beta ^ 2}}{\\beta}e^{-\\alpha t}sin(\\beta t + \\theta) u(t)$$`}
                    </MathJax>
                    In practice, the response of most linear systems is underdamped. Therefore, the time-domain performance criteria for studying and analyzing linear control systems are derived from this response.
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SOTFByPolesLecture;
