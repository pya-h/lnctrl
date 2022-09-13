import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import img_in_out_signals from "./img/in_out_signals.jpg";
import { MathJax } from "better-react-mathjax";

const Ch06Intro = () => {
    return (
        <SubCard title="مقدمه" darkBorder={true} style={{ direction: "rtl" }}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ p: 2 }} style={{ lineHeight: "2.5" }}>
                        <h2>چرااز پاسخ فرکانسی استفاده می‌کنیم؟</h2>
                        ابتدا این سوال به وجود می‌آید که چرا پاسخ فرکانسی را
                        بررسی می‌کنیم؟ در بررسی سیستم‌های کنترل خطی به روش
                        کلاسیک، دو شیوه اساسی برای تحلیل و بهبود عملکرد سیستم
                        وجود دارد که بدون حل معادلات دیفرانسیل حاکم بر سیستم عمل
                        می‌کنند:
                        <br />
                        1.مکان ریشه &nbsp;&nbsp;&nbsp;&nbsp; 2. پاسخ فرکانسی
                        <br />
                        همان طور که در فصل قبل دیدیم طراحی سیستم کنترل در روش
                        مکان‌ریشه، با بررسی رفتار ریشه‌های حلقه‌بسته در صفحه s
                        در پاسخ به تغییر پارامتری در سیستم (بهره سیستم حلقه‌باز)
                        انجام می‌پذیرد. در تحلیل پاسخ فرکانسی بر خلاف مکان‌ریشه،
                        بهره سیستم و سایر پارامترهای آن ثابت فرض شده تغییرات
                        دامنه و فاز تابع تبدیل G(s) در پاسخ به تغییرات قطب‌های
                        تابع تبدیل در نظر گرفته می‌شود.
                        <br />
                        تبدیل فوریه پل بین پاسخ فرکانسی و معادلات دیفرانسیل
                        سیستم است:
                        <p style={{ textAlign: "center" }}>
                            (s=jω) پاسخ فرکانسی → تبدیل فوریه → معادلات
                            دیفرانسیل
                        </p>
                        <br />
                        در گذشته داشتیم:
                        <br />
                        <p style={{ textAlign: "center" }}>
                            (s=σ+jω) تابع تبدیل → تبدیل لاپلاس → معادلات
                            دیفرانسیل
                        </p>
                        <h2>پاسخ فرکانسی</h2>
                        پاسخ فرکانسی یک سیستم به صورت پاسخ حالت ماندگار به ورودی
                        سینوسی تعریف می‌گردد.
                        <br />
                        <p style={{ textAlign: "center" }}>
                            حالت ماندگار Asin(ωt) → linear system → Bsin(ωt+Ѳ)
                        </p>
                    </Typography>
                </Grid>
                <Grid style={{ margin: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ textAlign: "center" }}
                        src={img_in_out_signals}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ p: 2 }} style={{ lineHeight: "2.5" }}>
                        به عبارت دیگر پاسخ یک سیستم خطی پایدار به ورودی سینوسی،
                        خود نیز سینوسی است. اگر ورودی به سیستم به صورت زیر باشد:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ u(t) = Asin(\\omega t) \\\\
                         U(s) = \\frac{A\\omega}{s^2 + \\omega^2} 
                         \\Rightarrow Y(s) = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} $$`}
                        </MathJax>
                        که G(s) تابع تبدیل سیستم می‌باشد. حال حالات متفاوت را
                        بررسی می‌کنیم:
                        <br /> <br />
                        <b>حالت اول:</b>&nbsp; اگر قطب‌های Y(s) همه پایدار و
                        متمایز از هم باشند:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ Y(s) = \\frac{b(s)}{(s + p_1)(s + p_2)...(s + p_n)} \\times \\frac{A\\omega}{s^2 + \\omega^2} \\\\
                         \\Rightarrow Y(s) = \\frac{a}{s + j\\omega} + \\frac{\\bar{a}}{s + j\\omega} + \\frac{b_1}{s + p_1} \\text{ } + ... + \\text{ } \\frac{b_n}{s + p_n} \\\\
                         \\Rightarrow y(t) = ae^{-j\\omega t} + \\bar{a}e^{-j\\omega t} + b_1e^{-p_1 t} \\text{ } + ... + \\text{ } b_ne^{-p_n t} $$`}
                        </MathJax>
                        با میل کردن t به سمت بینهایت، عبارات &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( e^{-p_i t}  \\)`}
                        </MathJax>
                        &nbsp; به سمت صفر میل خواهند کرد. لذا کلیه عبارات به جز
                        دو عبارت اول صفر خواهند شد.
                        <br /> <br />
                        <b>حالت دوم:</b>&nbsp; اگر Y(s) قطب‌های مکرر نیز داشته
                        باشد:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ Y(s) = \\frac{b(s)}{((s + p_1) ... (s + p_j)^{mj} ... (s + p_n))} \\times \\frac{A\\omega}{s^2 + \\omega^2}$$`}
                        </MathJax>
                        <br />
                        y(t) شامل عباراتی چون &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( t^{hj} e^{-p_j t} \\)`}
                        </MathJax>
                        &nbsp; خواهد بود که برای یک سیستم پایدار عبارات &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( t^{hj} e^{-p_j t} \\)`}
                        </MathJax>
                        &nbsp; به ازای t به سمت بی‌نهایت، به سمت صفر میل خواهند
                        کرد.
                        <br /> &nbsp;&nbsp;&nbsp;&nbsp; در هر دو حالت مقدار
                        نهایی y(t) به صورت زیر است: ( t به سمت بینهایت میل
                        می‌کند)
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ y_{ss}(t) = ae^{-j\\omega t} + \\bar{a}e^{j\\omega t} $$`}
                        </MathJax>
                        که ضرایب a و a ̅ از روابط زیر به دست می‌آید.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ a = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} \\times (s + j\\omega)|_{s=-j\\omega} = \\frac{-AG(-j\\omega)}{2j} \\\\
                    \\bar{a} = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} \\times (s - j\\omega)|_{s=j\\omega} = \\frac{AG(-j\\omega)}{2j} $$`}
                        </MathJax>
                        از آنجایی که G(jω) یک کمیت مختلط است، می‌توان آن را به
                        صورت قطبی زیر نوشت:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega)=|G(j\\omega)|e^{j\\theta} = |G(j\\omega)|\\angle G(j\\omega) $$`}
                        </MathJax>
                        که در آن |G(jω)| نشان‌دهنده اندازه G(jω) و θ بیانگر فاز
                        یا زاویه G(jω) است. به عبارت دیگر:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\theta =\\angle G(jω) = tan^{-1} \\frac{ImG(j\\omega)}{ReG(j\\omega)} $$`}
                        </MathJax>
                        بنابراین:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ y_{ss}(t) = A |G(jω)| \\frac{e^{j(\\omega t + \\theta)} - e^{-j(\\omega t + \\theta)}}{2j} \\\\ 
                        \\Rightarrow y_{ss}(t) = A|G(j\\omega)|sin(\\omega t + \\theta) = Bsin(\\omega t + \\theta) $$`}
                        </MathJax>
                        در نتیجه یک سیستم خطی تغییرناپذیر با زمان پایدار با
                        ورودی سینوسی، در حالت ماندگار نیز یک خروجی سینوسی با
                        همان فرکانس دارد و تنها در حالت ماندگار دامنه و فاز
                        سیگنال خروجی با دامنه و فاز سیگنال ورودی تفاوت خواهد
                        داشت. نسبت دامنه خروجی به ورودی برابر اندازه تابع تبدیل
                        |G(jω)| است و اختلاف فاز سیگنال ورودی و خروجی برابر با
                        θ=∠G(jω) می‌باشد. به تابع تبدیل G(jω) تابع تبدیل سینوسی
                        نیز می‌گویند. که در آن نسبت دامنه خروجی به دامنه ورودی
                        برابر است:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ |G(jω)| = \\frac{B}{A} $$`}
                        </MathJax>
                        و اختلاف فاز خروجی و فاز ورودی برابر است با: &nbsp;
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\angle G(j\\omega) \\)`}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default Ch06Intro;
