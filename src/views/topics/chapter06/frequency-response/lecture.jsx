import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";

const FrequencyResponseLecture = () => {
    return (
        <SubCard
            title="پاسخ فرکانسی"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1>&nbsp; تحلیل فرکانسی</h1>
                        در پاسخ فرکانسی تغییرات اندازه و فاز سیستم را بر حسب
                        تغییرات فرکانس بررسی می‌کنیم.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ G(s) = \\frac{k(s - z_1)(s - z_2) ... (s - z_m)}{(s - p_1)(s - p_2) ... (s - p_n)} \\\\ 
                        G(j\\omega) R(\\omega) + jX(\\omega) = |G(j\\omega) \\angle G(j\\omega) \\\\ R(\\omega) = Re[G(j\\omega)], X(\\omega) = Im[G(j\\omega)] \\\\
                        |G(j\\omega) = \\sqrt{R^2 + X^2}, \\quad \\angle G(j\\omega) = tan^{-1}\\frac{X(\\omega)}{R(\\omega)}$$`}</MathJax>
                        در نتیجه:
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ |G(j\\omega) = |k| \\times \\frac{\\prod_{i=1}^{m} |j\\omega - z_i|}{\\prod_{i=1}^{n} |j\\omega - p_i|} \\\\
                            \\angle G(j\\omega) = \\sum\\limits_{i=1}^{m} \\angle(j\\omega - z_i) - \\sum\\limits_{i=1}^{n} \\angle(j\\omega - p_i) + \\{ \\frac{0 \\rightarrow k > 0}{180 \\rightarrow k < 0 } \\} 
                        $$`}</MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default FrequencyResponseLecture;
