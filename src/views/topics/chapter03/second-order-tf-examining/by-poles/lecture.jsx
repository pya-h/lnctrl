import SubCard from "views/ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import { mathjaxSpaces } from "toolshed";
import { gridSpacing } from "store/constant";

const sotfExtremeMortalFormula =
    "$$ G(s) = \\frac{k}{(s + \\alpha) (s + \\beta)}" +
    mathjaxSpaces(3) +
    "\\alpha,\\beta > 0, \\quad \\alpha \\neq \\beta \\\\" +
    "C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha) (s + \\beta)}" +
    "\\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha\\beta} \\\\" +
    "c(t) = (\\frac{k}{\\alpha\\beta} + \\frac{k}{\\alpha - \\beta} \\lgroup \\frac{e^{-\\alpha t}}{\\alpha} - \\frac{e^{-\\beta t}}{\\beta}\\rgroup)u(t)$$";
const sotfCriticalFormula =
    "$$ G(s) = \\frac{k}{(s + \\alpha)^2}" +
    mathjaxSpaces(3) +
    "\\alpha,\\beta > 0, \\quad \\alpha = \\beta \\\\" +
    "C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha)^2}" +
    "\\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha^2} \\\\ " +
    "c(t) = (\\frac{k}{\\alpha^2} - \\frac{k}{\\alpha^2} \\lgroup 1 + \\alpha t\\rgroup)e^{-\\alpha t}u(t)$$";

const sotfWeakFormula =
    "$$ G(s) = \\frac{k}{s + \\alpha + j\\beta)(s + \\alpha - j\\beta)}" +
    mathjaxSpaces(3) +
    "\\alpha > 0 \\\\" +
    " \\Longrightarrow G(s) = \\frac{k}{(s^2 + 2\\alpha s + (\\alpha ^ 2 + \\beta ^ 2) } \\\\ " +
    "C(s) = \\frac{1}{s}G(s) = \\frac{k}{s^3 + 2\\alpha s^2 + (\\alpha ^ 2 + \\beta ^ 2)s } =  " +
    "\\frac{1}{s} \\frac{k}{(s + \\alpha)^2 + \\beta ^ 2 }\\\\ " +
    "\\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2} \\\\ " +
    "c(t) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2}u(t) - \\frac{ke^{-\\alpha t}}{\\alpha ^ 2 + \\beta ^ 2} \\lgroup cos\\beta t + \\frac{\\alpha}{\\beta}sin\\beta t \\rgroup u(t) \\\\" +
    "\\Longrightarrow c(t) = \\frac{k}{\\alpha ^ 2 + \\beta ^ 2}u(t) - \\frac{\\sqrt{\\alpha ^ 2 + \\beta ^ 2}}{\\beta}e^{-\\alpha t}sin(\\beta t + \\theta) u(t)$$";

const SOTFByPolesLecture = () => {
    return (
        <SubCard
            title="Second-order transfer function - parametric study"
            darkBorder={true}
            sx={{ direction: "ltr" }}
            spacing={gridSpacing}
        >
            <Typography>
                <Grid
                    className="lecture-text"
                    style={{ fontSize: "20px" }}
                    item
                >
                    <p>
                        The response of a second-order system to a step input is one of the following three cases:
                    </p>
                </Grid>
                <SubCard>
                    <Grid sx={{ my: 4 }} className="lecture-text" item>
                        <h1>Overdamped Response</h1>
                    </Grid>
                    <Grid
                        sx={{ my: 4 }}
                        style={{ fontSize: "20px" }}
                        className="lecture-text"
                        item
                    >
                        <p>
                            In this case, the system has two negative real poles.
                        </p>
                    </Grid>
                    <Grid style={{ fontSize: "20px" }} item>
                        <MathJax>{sotfExtremeMortalFormula}</MathJax>
                    </Grid>
                </SubCard>
                <SubCard sx={{ my: 4 }}>
                    <Grid className="lecture-text" item>
                        <h1>Critically Damped Response</h1>
                    </Grid>
                    <Grid
                        sx={{ my: 4 }}
                        style={{ fontSize: "20px" }}
                        className="lecture-text"
                        item
                    >
                        <p>
                            In this case, the system has two equal negative real poles.
                        </p>
                    </Grid>
                    <Grid style={{ fontSize: "20px" }} item>
                        <MathJax>{sotfCriticalFormula}</MathJax>
                    </Grid>
                </SubCard>
                <SubCard sx={{ my: 4 }}>
                    <Grid className="lecture-text" item>
                        <h1>Underdamped (oscillatory) response</h1>
                    </Grid>
                    <Grid
                        sx={{ my: 4 }}
                        style={{ fontSize: "20px" }}
                        className="lecture-text"
                        item
                    >
                        <p>
                            In this case, the system has two conjugate poles with a negative real value.
                        </p>
                    </Grid>
                    <Grid style={{ fontSize: "20px" }} item>
                        <MathJax>{sotfWeakFormula}</MathJax>
                    </Grid>
                </SubCard>
                <Grid
                    sx={{ my: 4 }}
                    style={{ fontSize: "20px" }}
                    className="lecture-text"
                    item
                >
                    <p>
                        In practice, the response of most linear systems is underdamped. Therefore, the time-domain performance criteria for studying and analyzing linear control systems are derived from this response.
                    </p>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default SOTFByPolesLecture;
