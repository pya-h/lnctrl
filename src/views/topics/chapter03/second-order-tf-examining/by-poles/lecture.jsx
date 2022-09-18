import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";

import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SOTFByPolesLecture = () => {
    return (
        <PinchPanCard title="تابع تبدیل مرتبه دو- بررسی پارامتری" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ سیستم مرتبه دوم به ورودی
                    پله یکی از سه حالت زیر می باشد:
                    <h1>&nbsp; پاسخ میرای شدید</h1>
                    &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب حقیقی
                    منفی دارد.
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ G(s) = \\frac{k}{(s + \\alpha) (s + \\beta)} \\qquad
                            \\alpha,\\beta > 0, \\quad \\alpha \\neq \\beta \\\\
                            C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha) (s + \\beta)}
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha\\beta} \\\\
                            c(t) = (\\frac{k}{\\alpha\\beta} + \\frac{k}{\\alpha - \\beta} \\lgroup \\frac{e^{-\\alpha t}}{\\alpha} - \\frac{e^{-\\beta t}}{\\beta}\\rgroup)u(t)$$`}
                    </MathJax>
                    <h1>&nbsp; پاسخ میرای بحرانی</h1>
                    &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب حقیقی
                    منفی برابر دارد.
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ G(s) = \\frac{k}{(s + \\alpha)^2} \\qquad
                            \\alpha,\\beta > 0, \\quad \\alpha = \\beta \\\\
                            C(s) = \\frac{1}{s}G(s) = \\frac{k}{s(s + \\alpha)^2}
                            \\Longrightarrow c_{ss} = \\lim\\limits_{s \\to 0}sC(s) = \\frac{k}{\\alpha^2} \\\\ 
                            c(t) = (\\frac{k}{\\alpha^2} - \\frac{k}{\\alpha^2} \\lgroup 1 + \\alpha t\\rgroup)e^{-\\alpha t}u(t)$$`}
                    </MathJax>
                    <h1>&nbsp; پاسخ میرای ضعیف (نوسانی)</h1>
                    &nbsp; &nbsp; &nbsp; &nbsp; در این حالت سیستم دو قطب مزدوج
                    با مقدار حقیقی منفی دارد.
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
                    &nbsp; &nbsp; &nbsp; &nbsp; پاسخ اکثر سیستم های خطی در عمل
                    به صورت میرای ضعیف است. لذا معیارهای عملکرد در حوزه ی زمان
                    برای بررسی و تحلیل سیستم های کنترل خطی از این پاسخ استخراج
                    می شود.
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SOTFByPolesLecture;
