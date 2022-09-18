import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import routh_hurwitz_symbolic_table from "./images/routh_hurwitz_table.png";
import { MathJax } from "better-react-mathjax";
import { Poly } from "math/algebra/functions";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const transformSInverse = "$$s \\rightarrow \\frac{1}{s} $$";
const sTransformInFormula =
    "$$" +
    Poly.Symbolic("n", "s", 2, "a", true) +
    " \\rightarrow " +
    Poly.Symbolic("n", "(\\frac{1}{s})", 2, "a", true) +
    " $$";
const RouthHurwitzCriterionLecture = () => {
    return (
        <PinchPanCard title="معیار پایداری روث-هرویتز" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        اگر معادله مشخصه سیستم به صورت زیر باشد:
                        <MathJax style={{ fontSize: "18px" }}>
                            {Poly.Symbolic("n", "s", 3)}
                        </MathJax>
                        جدول روث-هرویتز بصورت زیر خواهد بود:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={routh_hurwitz_symbolic_table}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        تعداد قطب های سمت راست محور موهومی تابع تبدیل حلقه بسته
                        (ریشه های معادله مشخصه) برابر است با تعداد تغییر علامت
                        در ستون اول آرایش روث هرویتز.
                        <h1>نکات</h1>
                        ۱- اگر در هر سطر یک عدد مثبت ضرب کنیم در نتیجه تغییری
                        حاصل نمی شود؛ این کار برای راحتی محاسبات توصیه می شود.
                        <br />
                        ۲- اگر یکی از عناصر ستون اول صفر شود دو راهکار وجود
                        دارد:
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; الف) به جای عنصر صفر می توان
                        Ɛ گذاشت و به کمک آن مثبت یا منفی بودن عناصر ستون اول را
                        تشخیص داد.
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; ب) می توان در معادله مشخصه
                        تمامی s ها را معکوس کرد. با اعمال این تبدیل ریشه ها عکس
                        می شوند اما صفحه ی ریشه ها عوض نمی شود.
                        <MathJax style={{ fontSize: "18px" }}>
                            {transformSInverse}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {sTransformInFormula}
                        </MathJax>
                        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                        توجه:‌ ممکن است با این تغییر سطر دیگری صفر شود، در این
                        صورت معادله مشخصه ریشه روی محور موهومی دارد.
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; ج) معادله مشخصه را در یک
                        عبارت جبری دیگر ضرب می کنیم.
                        <br />
                        ۳- اگر تمامی عناصر یک سطر صفر شود:
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; برای حل یک معادله کمکی تشکیل
                        می دهیم؛ این معادله از روی سطر بالای سطر صفر ساخته می
                        شود؛ سپس از معادله کمکی مشتق می گیریم و ضرایب مشتق
                        معادله ی کمکی به جای سطر صفر می نشنید.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default RouthHurwitzCriterionLecture;
