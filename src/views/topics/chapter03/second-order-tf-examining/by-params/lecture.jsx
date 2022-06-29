import SubCard from "views/ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "../../../topics.css";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";
import { mathjaxSpaces } from "toolshed";

const sotfExtremeMortalFormula =
    "$$ s_{1,2} = -\\zeta\\omega_n \\pm\\omega_n \\sqrt{\\zeta ^ 2 - 1} \\\\ " +
    " G(s) = \\frac{\\omega_n ^ 2}{s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2} \\\\" +
    "C(s) = \\frac{\\omega_n ^ 2}{s(s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2)} \\\\" +
    "\\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{\\omega_n ^ 2}{\\omega_n ^ 2} = 1 $$";
const sotfTransientStepResponseFormula =
    "$$c(t) = 1 - e^{-\\zeta\\omega_n t} \\lgroup cos\\omega_d t + \\frac{\\zeta}{\\sqrt{1 - \\zeta^2}}sin\\omega_d t \\rgroup, " + mathjaxSpaces(3) + 
    "\\omega_d = \\omega_n \\sqrt{1 - \\zeta^2} \\\\ " + 
    " \\\\ c(t) = 1 - \\frac{1}{\\sqrt{\\zeta ^ 2 - 1}}e^{-\\zeta \\omega_n t}sin(\\omega_n \\lgroup\\sqrt{\\zeta ^ 2 - 1}\\rgroup t + cos^{-1}\\zeta) \\\\" + 
    "c(t) = 1 - \\frac{e ^ {-\\zeta \\omega_n t}}{\\sqrt{1 - \\zeta ^ 2}}sin \\lgroup \\omega_d t + tan^{-1}\\frac{\\sqrt{1 - \\zeta^2}}{\\zeta} \\rgroup$$";

const sotfTransientImpulseResponseFormula =
    "$$c(t) = \\frac{\\omega_n}{\\sqrt{\\zeta ^ 2 - 1}}e^{-\\zeta \\omega_n t}sin(\\omega_n \\lgroup\\sqrt{\\zeta ^ 2 - 1}\\rgroup t)$$";

const SOTFByParamsLecture = () => {
    return (
        <SubCard
            title="تابع تبدیل مرتبه دو- بررسی پارامتری"
            darkBorder={true}
            sx={{ direction: "rtl" }}
            spacing={gridSpacing}
        >
            <Grid className="lecture-text" style={{ fontSize: "20px" }} item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ سیستم مرتبه دوم به ورودی
                    پله یکی از سه حالت زیر می باشد:
                </p>
            </Grid>
            <SubCard>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfExtremeMortalFormula}</MathJax>
                </Grid>
                <Grid
                    className="lecture-text"
                    style={{ fontSize: "20px" }}
                    item
                >
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; پاسخ حالت گذرای ورودی پله:
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfTransientStepResponseFormula}</MathJax>
                </Grid>
                <Grid
                    className="lecture-text"
                    style={{ fontSize: "20px" }}
                    item
                >
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; پاسخ حالت گذرای ورودی ضربه:
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfTransientImpulseResponseFormula}</MathJax>
                </Grid>
            </SubCard>
        </SubCard>
    );
};

export default SOTFByParamsLecture;
