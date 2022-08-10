import SubCard from "ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "../../../topics.css";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";

const sotfExtremeMortalFormula =
    "$$ s_{1,2} = -\\zeta\\omega_n \\pm\\omega_n \\sqrt{\\zeta ^ 2 - 1} \\\\ " +
    " G(s) = \\frac{\\omega_n ^ 2}{s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2} \\\\" +
    "C(s) = \\frac{\\omega_n ^ 2}{s(s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2)} \\\\" +
    "\\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{\\omega_n ^ 2}{\\omega_n ^ 2} = 1 $$";
const sotfTransientStepResponseFormula =
    "$$y(t) = 1 - \\frac{1}{\\beta}e^{-\\zeta \\omega_n t}sin(\\omega_n \\beta t + \\theta)$$";

const sotfTransientImpulseResponseFormula =
    "$$y(t) = \\frac{\\omega_n}{\\beta}e^{-\\zeta \\omega_n t}sin(\\omega_n \\beta t)$$";

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
