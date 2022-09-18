import { Grid, Typography } from "@mui/material";
import "../../../topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SOTFByParamsLecture = () => {
    return (
        <PinchPanCard title="تابع تبدیل مرتبه دو- بررسی پارامتری" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ سیستم مرتبه دوم به ورودی
                    پله یکی از سه حالت زیر می باشد:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ s_{1,2} = -\\zeta\\omega_n \\pm\\omega_n \\sqrt{\\zeta ^ 2 - 1} \\\\ 
                            G(s) = \\frac{\\omega_n ^ 2}{s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2} \\\\
                            C(s) = \\frac{\\omega_n ^ 2}{s(s^2 + 2\\zeta\\omega_n s + \\omega_n ^ 2)} \\\\
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{\\omega_n ^ 2}{\\omega_n ^ 2} = 1 $$`}
                    </MathJax>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ حالت گذرای ورودی پله:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$c(t) = 1 - e^{-\\zeta\\omega_n t} \\lgroup cos\\omega_d t + \\frac{\\zeta}{\\sqrt{1 - \\zeta^2}}sin\\omega_d t \\rgroup, \\qquad
                            \\omega_d = \\omega_n \\sqrt{1 - \\zeta^2} \\\\ 
                            \\\\ c(t) = 1 - \\frac{1}{\\sqrt{\\zeta ^ 2 - 1}}e^{-\\zeta \\omega_n t}sin(\\omega_n \\lgroup\\sqrt{\\zeta ^ 2 - 1}\\rgroup t + cos^{-1}\\zeta) \\\\
                            c(t) = 1 - \\frac{e ^ {-\\zeta \\omega_n t}}{\\sqrt{1 - \\zeta ^ 2}}sin \\lgroup \\omega_d t + tan^{-1}\\frac{\\sqrt{1 - \\zeta^2}}{\\zeta} \\rgroup$$`}
                    </MathJax>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ حالت گذرای ورودی ضربه:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$c(t) = \\frac{\\omega_n}{\\sqrt{\\zeta ^ 2 - 1}}e^{-\\zeta \\omega_n t}sin(\\omega_n \\lgroup\\sqrt{\\zeta ^ 2 - 1}\\rgroup t)$$"
                        }
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SOTFByParamsLecture;
