import { Grid, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_nyquist_plot from "./img/nyquist_plot.JPG";
import img_nyquist_important_points from "./img/nyquist_important_points.jpg";

const NyquistPlotLecture = () => {
    return (
        <PinchPanCard title="نمودار اندازه و فاز نیکولز">
            <Grid container>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>نمودار نایکوئیست (نمودار قطبی)</h2>
                        نمودار نایکوئیست تابع تبدیل G(jω)، رسم این تابع تبدیل در
                        صفحه مختلط برحسب تغییرات فرکانس از صفر تا بی‌نهایت است.
                        <br />
                        رسم این نمودار به دو صورت قابل بیان است:
                        <br />
                        <b>1) قطبی:</b> &nbsp; از طریق اندازه و فاز
                        <br />
                        اندازه : &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( |G(j\\omega)| \\)`}
                        </MathJax>
                        &nbsp; و فاز : &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\angle G(j\\omega) \\)`}
                        </MathJax>
                        &nbsp;
                        <br />
                        <b>2) دکارتی:</b> &nbsp; از طریق بخش حقیقی و موهومی
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ R(\\omega) = Re\\{G(j\\omega)\\} = |G(j\\omega)|cos(\\angle G(j\\omega)) \\\\
                        X(\\omega) = Im\\{G(j\\omega)\\} = |G(j\\omega)|sin(\\angle G(j\\omega)) $$`}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_nyquist_plot}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>رسم نمودار نایکوئیست</h2>
                        نمودار نایکوئیست را می‌توان با استفاده از چهار نقطه مهم
                        زیر رسم کرد:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_nyquist_important_points}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>
                            1)<sup>+</sup>ω → 0
                        </h2>
                        تابع تبدیل کلی زیر را در نظر بگیرید :
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(s) = k \\times s^q \\times \\prod (\\frac{s}{\\omega_i} + 1)^a \\times \\prod (\\frac{s^2}{\\omega_j ^ 2} + \\frac{2\\zeta s}{\\omega_j} + 1)^b $$`}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\text{if: } \\omega \\rightarrow 0^+ \\Rightarrow 
                                \\begin{cases} |k| \\angle 0 \\quad or \\quad |k| \\angle -180 \\qquad q = 0 \\\\
                                    0 \\angle (90\\times q) \\qquad \\qquad \\qquad q > 0 \\\\ 
                                    \\infty \\angle (90 \\times q) \\qquad \\qquad \\qquad q < 0 \\end{cases}
                            $$`}
                        </MathJax>

                        <h2>
                            2)∞+ → ω
                        </h2>
                        تابع تبدیل کلی زیر را در نظر بگیرید :
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(s) = \\frac{b_m s^m + ... + b_1 s + b_0 }{s^n + a_{n-1} s^{n - 1} + ... + a_1 s + a_0} $$`}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\text{if: } \\omega \\rightarrow 0^+ \\Rightarrow 
                                \\begin{cases} |b_m| \\angle 0 \\quad or \\quad |b_m| \\angle -180 \\qquad m = n \\\\
                                    0 \\angle -90 (n - m) \\qquad \\qquad \\qquad m < n \\\\ 
                                    \\infty \\angle 90 (m - n) \\qquad \\qquad \\qquad m > n \\end{cases}
                            $$`}
                        </MathJax>
                        <h2>
                            3) تعیین نقاط احتمالی قطع محورهای حقیقی
                        </h2>
                        برای به دست آوردن نقاط احتمالی قطع محورهای حقیقی، زاویه فاز را برابر 0 یا &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm 180 \\)`}
                        </MathJax>
                        &nbsp; درجه قرار داده یا قسمت موهومی را برابر صفر قرار می‌دهیم.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega) = |G(j\\omega) \\angle G(j\\omega) = R(\\omega) + jX(\\omega) \\\\
                                \\Rightarrow X(\\omega) = 0, \\quad \\angle G(j\\omega) = \\pm 180 \\quad or \\quad 0
                            $$`}
                        </MathJax>

                        <h2>
                            4) تعیین نقاط احتمالی قطع محورهای موهومی
                        </h2>
                        برای به دست آوردن نقاط احتمالی قطع محورهای موهومی، زاویه فاز را برابر &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm 90 \\)`}
                        </MathJax>
                        &nbsp;درجه قرار داده یا قسمت حقیقی را برابر صفر قرار می‌دهیم.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega) = |G(j\\omega) \\angle G(j\\omega) = R(\\omega) + jX(\\omega) \\\\
                                \\Rightarrow R(\\omega) = 0, \\quad \\angle G(j\\omega) = \\pm 90
                            $$`}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default NyquistPlotLecture;
