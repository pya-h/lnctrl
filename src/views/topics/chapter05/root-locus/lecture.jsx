import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import { MathJax } from "better-react-mathjax";
import img_control_system_block_diagram from "./img/control_system_block_diagram.jpg";
import { Poly } from "math/algebra/functions";

const RootLocusLecture = () => {
    return (
        <PinchPanCard title="مکان هندسی" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        مکان ریشه‌ها همان مکان هندسی ریشه‌های معادله مشخصه به
                        ازای تغییر یک بهره می‌باشد. در این روش با استفاده از
                        تابع تبدیل حلقه (یا حلقه باز با فیدبک واحد) به تعیین محل
                        قطب‌های حلقه بسته می‌پردازیم.
                        <br />
                        در واقع ریشه‌‌های معادله مشخصه همان قطب‌های تابع تبدیل
                        حلقه بسته می‌باشند.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$
                                \\frac{C(s)}{R(s)} = \\frac{G(s)}{1 + G(s)H(s)} \\Rightarrow 1 + G(s)H(s) = 0
                            $$`}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        src={img_control_system_block_diagram}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$
                                1 + G(s)H(s) = 1 + k\\frac{${Poly.Symbolic(
                                    "m",
                                    "s",
                                    2,
                                    "b",
                                    true,
                                    true
                                )}}{${Poly.Symbolic(
                                "n",
                                "s",
                                2,
                                "a",
                                true
                            )}} \\\\
                                \\Rightarrow 1 + G(s)H(s) = 1 + k\\frac{(s-z_1)(s-z_2)...(s-z_m)}{(s-p_1)(s-p_2)...(s-p_n)}
                            $$`}
                        </MathJax>
                        که در این رابطه ها z<sub>i</sub> صفرهای تابع تبدیل حلقه‌
                        و p<sub>i</sub> ها قطب‌های آن می‌باشند. با صفر قراردادن
                        رابطه بالا می‌توان معادله مشخصه سیستم را به فرم رابطه
                        زیر نوشت:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ (s - p_1)(s - p_2)...(s - p_n) + k(s - z_1)(s - z_2)...(s - z_m) = 0 $$`}
                        </MathJax>
                        مرتبه معادله مشخصه (n) برابر با تعداد ریشه‌های آن و
                        تعداد قطب‌های تابع تبدیل حلقه بسته می‌باشد. همانطور که
                        پیداست به ازای هر k، n ریشه به دست می‌آید که در صفحه s
                        رسم می‌شود.
                        <br />
                        می‌خواهیم با دانستن محل z<sub>i</sub> ها و p<sub>i</sub> ها محل
                        این n ریشه را به ازای تغییرات k از منفی بی‌نهایت تا مثبت
                        بی‌نهایت (یا از صفر تا مثبت بی‌نهایت) رسم کنیم.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default RootLocusLecture;
