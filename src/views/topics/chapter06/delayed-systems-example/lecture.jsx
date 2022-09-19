import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from "./visual/delay_types.png";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const DelayedSystemsLecture = () => {
    return (
        <PinchPanCard title="سیستم های تاخیردار" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        تاخیر مدت زمانی است که باید طی شود تا خروجی به ورودی
                        پاسخ دهد. دو نوع تاخیر داریم:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={delay_types_png}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        سیستم زیر را در نظر بگیرید:
                        <MathJax style={{ fontSize: "18px" }}>
                            {"$$G(s) = e^{-T_d s}$$"}
                        </MathJax>
                        تاخیر خالص در اندازه تاثیر نمی گذارد بلکه فقط زاویه فاز
                        را به طور خطی با فرکانس تغییر می دهد.
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$"
                            }
                        </MathJax>
                        <h2>نمودار نایکوئیست سیستم‌های تأخیردار</h2>
                        معادله تاخیر &nbsp;
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( G(s) = e^{-sT} \\)"}
                        </MathJax>
                        &nbsp; است. این معادله به صورت زیر مدل می‌شود:
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ G(s) = e^{-sT} \\Rightarrow G(j\\omega) = e^{-j\\omega T} = 1 \\angle -\\omega T $$"
                            }
                        </MathJax>
                        <b>توجه:</b> &nbsp; در فرکانس‌های پایین &nbsp;
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( \\omega \\rightarrow 0 \\)"}
                        </MathJax>
                        ، عنصر تأخیر &nbsp;
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( e^{-j\\omega T} \\)"}
                        </MathJax>
                        &nbsp; و سیستم مرتبه یک &nbsp;
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( \\frac{1}{1 + j\\omega T} \\)"}
                        </MathJax>
                        &nbsp; مانند هم رفتار می‌کنند.
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ if: \\omega \\rightarrow 0 \\quad \\Rightarrow \\quad e^{-j\\omega T} \\cong \\frac{1}{1 + j\\omega T}$$"
                            }
                        </MathJax>
                        <h2>نمودار کامل نایکوئیست</h2>
                         نمودار کامل نایکوئیست با رسم
                        نمودار برای ω از منفی بی‌نهایت تا مثبت بی‌نهایت به دست
                        می‌آید. برای این کار از نکات زیر بهره می‌بریم:
                        <br /> &nbsp;&nbsp;&nbsp;&nbsp; 1) نمودار
                        برای ω از منفی بی‌نهایت تا صفر منفی قرینه نمودار برای ω
                        از صفر مثبت تا مثبت بی‌نهایت است. (نسبت به محور حقیقی)
                        <br /> &nbsp;&nbsp;&nbsp;&nbsp;
                        2) به ازای هر قطب تابع تبدیل روی محور موهومی یک مسیر نیم
                        دایره در بی‌نهایت خواهیم داشت؛ این مسیر در بی‌نهایت در
                        جهت عقربه‌های ساعت حرکت می‌کند.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default DelayedSystemsLecture;
