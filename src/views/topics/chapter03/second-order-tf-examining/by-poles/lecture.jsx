import SubCard from "views/ui-component/cards/SubCard";
import { Grid } from "@mui/material";
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
            title="تابع تبدیل مرتبه دو- بررسی پارامتری"
            darkBorder={true}
            sx={{ direction: "rtl" }}
            spacing={gridSpacing}
        >
            <Grid className="lecture-text"  style={{ fontSize: "20px" }} item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ سیستم مرتبه دوم به ورودی
                    پله یکی از سه حالت زیر می باشد:
                </p>
            </Grid>
            <SubCard>
                <Grid sx={{ my: 4 }} className="lecture-text" item>
                    <h1>&nbsp; پاسخ میرای شدید</h1>
                </Grid>
                <Grid sx={{ my: 4 }}  style={{ fontSize: "20px" }} className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب
                        حقیقی منفی دارد.
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfExtremeMortalFormula}</MathJax>
                </Grid>
            </SubCard>
            <SubCard sx={{ my: 4 }}>
                <Grid className="lecture-text" item>
                    <h1>&nbsp; پاسخ میرای بحرانی</h1>
                </Grid>
                <Grid sx={{ my: 4 }}  style={{ fontSize: "20px" }} className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب
                        حقیقی منفی برابر دارد.
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfCriticalFormula}</MathJax>
                </Grid>
            </SubCard>
            <SubCard sx={{ my: 4 }}>
                <Grid className="lecture-text" item>
                    <h1>&nbsp; پاسخ میرای ضعیف (نوسانی)</h1>
                </Grid>
                <Grid sx={{ my: 4 }}  style={{ fontSize: "20px" }} className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب
                        مزدوج با مقدار حقیقی منفی دارد.
                    </p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{sotfWeakFormula}</MathJax>
                </Grid>
            </SubCard>
            <Grid sx={{ my: 4 }} style={{ fontSize: "20px" }} className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    پاسخ اکثر سیستم های خطی در عمل به صورت میرای ضعیف است. لذا معیارهای عملکرد در حوزه ی زمان برای بررسی و تحلیل سیستم های کنترل خطی
                    از این پاسخ استخراج می شود.
                </p>
            </Grid>
        </SubCard>
    );
};

export default SOTFByPolesLecture;
