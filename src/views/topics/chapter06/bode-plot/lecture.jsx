import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import img_formula_22 from "./img/formula_22.jpg";
import img_formula_23 from "./img/formula_23.jpg";
import img_zero_poles_type_in_bode from "./img/zero_pole_types_in_bode.JPG";
import img_standard_second_degree_system from "./img/standard_second_degree_system.jpg";
import img_m_pw_plot from "./img/m_pw_plot.png";
import img_bode_plot_manual from "./img/bode_plot_manual.jpg";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const BodePlotLecture = () => {
    return (
        <PinchPanCard title="نمودار بود" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1>نمودار بود</h1>
                        نمودار اندازه پاسخ فرکانسی برحسب لگاریتم و نمودار فاز آن
                        را نمودار بود گویند.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ G(j\\omega) = |G(j\\omega)|e^{j\\theta} $$`}</MathJax>
                        لگاریتم دامنه تابع تبدیل G(jω) بر حسب دسی بل بیان
                        می‌گردد و به صورت زیر است.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ LmG(j\\omega) = 20log|G(j\\omega)| $$`}</MathJax>
                        دو واحدی که برای بیان باندهای فرکانسی یا نسبت‌های
                        فرکانسی استفاده می‌شوند، اکتاو (octave) و دهه (decade)
                        هستند.
                        <br />
                        <br />
                        فاصله بین این دو فرکانس یک اکتاو است.
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{\\omega_1}{\\omega_2} = 2 \\Rightarrow \\)`}
                        </MathJax>
                        <br />
                        فاصله بین این دو فرکانس یک دهه است.
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{\\omega_1}{\\omega_2} = 10 \\Rightarrow \\)`}
                        </MathJax>
                        <br />
                        <br />
                        <b> مزایای استفاده از لگاریتم در اندازه:</b>
                        <br />
                        1. تبدیل ضرب به جمع و تقسیم به تفریق
                        <br />
                        2. نمایش گسترده‌تری از پاسخ فرکانسی
                        <br />
                        <br />
                        <b>مزایای استفاده از نمایش لگاریتمی ω</b>
                        <br />
                        1. رسم ساده‌تر
                        <br />
                        2. نمایش محدوده فرکانسی گسترده‌تر
                        <br /> <br />
                        <b>تابع تبدیل یک سیستم در حالت کلی:</b>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_formula_22}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        برای تابع تبدیل بالا، دو دسته معادلات برای لگاریتم دامنه
                        و فاز خواهیم داشت:
                        <h3>لگاریتم دامنه</h3>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_formula_23}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>فاز</h3>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <MathJax
                        style={{ fontSize: "18px" }}
                    >{`$$ \\phi(\\omega) = +\\sum\\limits_{i=1}^Q tan^{-1}(\\omega \\tau_i) - N(90°) -
                     \\sum\\limits_{m=1}^M tan^{-1}(\\omega \\tau_m) \\\\ \\qquad - \
                     \\sum\\limits_{k=1}^R tan^{-1} \\frac{2\\zeta_k \\omega_{n_k} \\omega}{\\omega^2 _{n_k} - \\omega^2}
                     \\sum\\limits_{l=1}^P tan^{-1} \\frac{2\\zeta_l \\omega_{n_l} \\omega}{\\omega^2 _{n_l} - \\omega^2} $$`}</MathJax>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>ترسیم نمودارهای بود</h3>
                        برای رسم کامل نمودار بود ابتدا چهار عبارت زیر را رسم
                        می‌کنیم:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_zero_poles_type_in_bode}
                        style={{ maxWidth: "30rem", height: "auto" }}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>فرکانس شکست</h3>
                        به فرکانس &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} = \\omega_1 \\)`}
                        </MathJax>
                        ، فرکانس شکست یا فرکانس گوشه می‌گویند. فرکانس &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} \\)`}
                        </MathJax>
                        &nbsp; را از آن جهت فرکانس شکست گویند که در این فرکانس
                        شکستی در شیب منحنی دامنه رخ می‌دهد. همچنین فرکانس &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} \\)`}
                        </MathJax>
                        <br />
                        را به علت اینکه نمودار مجانبی دامنه در این فرکانس
                        در گوشه دو خط راست است، فرکانس گوشه نیز می‌نامند.
                        <br />
                        <b>توجه:</b> &nbsp; محدوده ی مهم پاسخ فرکانسی (در
                        نمودارهای لگاریتم دامنه و زاویه فاز) معمولاً &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm1 \\)`}
                        </MathJax>
                        &nbsp; دهه از فرکانس شکست است.
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>فرکانس تشدید</h3>
                        اگر ξ بین 0 و1 باشد ما دو قطب مختلط داریم. با تغییر
                        مقدار آن نمودار بود نیز به صورت مقابل تغییر می‌کند. در
                        واقع برآمدگی به‌وجود‌آمده در فرکانس خاصی رخ می‌دهد که
                        آنرا فرکانس تشدید می‌گویند.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_standard_second_degree_system}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <MathJax
                        style={{ fontSize: "18px" }}
                    >{`$$ \\omega_r = \\omega_n \\sqrt{1 - 2\\zeta^2} \\\\
                    m_{p\\omega} = \\begin{cases} 
                            \\frac{1}{2\\zeta \\sqrt{1 - \\zeta^2}} \\qquad \\zeta < \\frac{1}{2} \\\\
                            1 \\qquad \\qquad 1 > \\zeta > \\frac{1}{\\sqrt2}
                        \\end{cases}
                $$`}</MathJax>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        هر چه پهنای باند &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega_B \\)`}
                        </MathJax>
                        &nbsp; افزایش پیدا کند، زمان صعود پاسخ پله کاهش پیدا
                        می‌کند. فراجهش پاسخ پله هم به &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( m_{p\\omega} \\)`}
                        </MathJax>
                        &nbsp; به خاطر ξ مرتبط است. هر چه &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( m_{p\\omega} \\)`}
                        </MathJax>
                        &nbsp; افزایش می‌یابد، درصد فراجهش هم افزایش می‌یابد.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_m_pw_plot}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h2>مراحل ترسیم نمودار بود</h2>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={img_bode_plot_manual}
                        style={{ maxWidth: "30rem", height: "auto" }}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <b>نکته: </b>
                        اگر سیستمی را در عدد 10 ضرب کنیم، در نمودار اندازه 20dB
                        بالا می‌رود و در فاز تغییری ایجاد نمی‌شود.
                        <br />
                        <b>نکته: </b>
                        اگر سیستمی را در عدد &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{-1}{10} \\)`}
                        </MathJax>
                        &nbsp; ضرب کنیم، در نمودار اندازه 20dB پایین می‌رود و در
                        فاز 180درجه جابجا می‌شود.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default BodePlotLecture;
