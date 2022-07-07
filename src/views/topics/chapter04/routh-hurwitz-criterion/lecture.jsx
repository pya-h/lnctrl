import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import Poly from "../../../../math/algebra/functions/poly";
import routh_hurwitz_symbolic_table from './images/routh_hurwitz_table.png';

const transformSInverse = "$$s \\rightarrow \\frac{1}{s} $$";
const sTransformInFormula = "$$" + Poly.Symbolic("n", "s", 2, "a", true) + " \\rightarrow " + Poly.Symbolic("n", "(\\frac{1}{s})", 2, "a", true) + " $$"
const RouthHurwitzCriterionLecture = () => {
    return (
        <SubCard
            title="معیار پایداری روث-هرویتز"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; اگر معادله مشخصه سیستم به صورت زیر باشد:
                </p>
                <MathJax>{Poly.Symbolic("n", "s", 3)}</MathJax>
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; جدول روث-هرویتز بصورت زیر خواهد بود:
                </p>
            </Grid>
            <Grid className="lecture-text" sx={{mr: 20}} item>
                <img
                        className="lecture-image"
                        src={routh_hurwitz_symbolic_table}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; تعداد قطب های سمت راست محور موهومی تابع تبدیل حلقه بسته (ریشه های معادله مشخصه) برابر است با تعداد تغییر علامت در ستون اول آرایش روث هرویتز.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <h1>نکات</h1>
            </Grid>
            
            <Grid className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    ۱- اگر در هر سطر یک عدد مثبت ضرب کنیم در نتیجه تغییری حاصل نمی شود؛ این کار برای راحتی محاسبات توصیه می شود.
                </p>
            </Grid>
            
            <Grid className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    ۲- اگر یکی از عناصر ستون اول صفر شود دو راهکار وجود دارد:
                </p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    الف) به جای عنصر صفر می توان Ɛ گذاشت و به کمک آن مثبت یا منفی بودن عناصر ستون اول را تشخیص داد.
                </p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    ب)  می توان در معادله مشخصه تمامی s ها را معکوس کرد. با اعمال این تبدیل ریشه ها عکس می شوند اما صفحه ی ریشه ها عوض نمی شود.
                </p>
                <MathJax>{transformSInverse}</MathJax>
                <MathJax>{sTransformInFormula}</MathJax>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    توجه:‌ ممکن است با این تغییر سطر دیگری صفر شود، در این صورت معادله مشخصه ریشه روی محور موهومی دارد.
                </p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    ج) معادله مشخصه را در یک عبارت جبری دیگر ضرب می کنیم.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    ۳- اگر تمامی عناصر یک سطر صفر شود:
                </p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    برای حل یک معادله کمکی تشکیل می دهیم؛ این معادله از روی سطر بالای سطر صفر ساخته می شود؛ سپس از معادله کمکی مشتق می گیریم و ضرایب مشتق معادله ی کمکی به جای سطر صفر می نشنید.
                </p>
            </Grid>
        </SubCard>
    );
};

export default RouthHurwitzCriterionLecture;
