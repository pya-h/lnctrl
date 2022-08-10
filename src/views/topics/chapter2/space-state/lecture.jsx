import SubCard from "../../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";

const formulaSpaceStateEquations = "$$\\begin{cases}\\dot{x}(t) = Ax(t) + Bu(t) \\\\ y(t) = Cx(t) + Du(t)\\end{cases}$$";
const formulaSpaceStateZeroInput = "$$\\dot{x}(t) = Ax(t)$$";
const formulaGettingLaplace = "$$\\begin{cases} sX(s) - x(0) = AX(s) \\\\ \\\\ [sI - A]X(s) = x(0) \\\\ \\\\ X(s) = [sI - A]^{-1} x(0) \\end{cases}$$"
const formulaStateSpaceDirectAnswer = "$$x(t) = e^{A(t-t_0)}x(t_0)$$";
const formulaStateSpaceDirectAnswer_t0EqualsZero = "$$if: t_0 = 0 \\rightarrow x(t) = e^{A(t)}x(0)$$";
const formulaSpaceStateTransferMatrix = "$$\\varphi(t) = e^{At} = \\mathscr{L}^{-1}\\{(sI - A)^{-1}\\}$$";
const SpaceStateLecture = () => {
    return (
        <SubCard
            title="معادلات فضای حالت"
            darkBorder={true}
            sx={{ direction: "rtl" }}
            background="lightgray"
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
        معادلات حالت وخروجی زیر را در نظر بگیرید:               
                </p>
               <MathJax>{formulaSpaceStateEquations}</MathJax>
               <p>
               &nbsp; &nbsp; &nbsp; &nbsp;
                   اگر معادله اول را به ازای یک ورودی معین و شرایط اولیه داده شده حل کنیم پاسخ متغیرهای حالت سیستم را را به ورودی اعمال شده به سیستم بدست می آوریم. با جایگزینی بردار حالت محاسبه شده x(t) در رابطه ی خروجی y(t) پاسخ سیستم را به ازای همان ورودی و شرایط اولیه بدست آورده ایم.
               </p>
                <p>
                [ادامه متن صفحه 15/41 حل معادله با استفاده از بسط تیلور]
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <h2>روش تبدیل لاپلاس در حل معادله همگن حالت:</h2>
                <MathJax>{formulaSpaceStateZeroInput}</MathJax>

                <p>
                &nbsp; &nbsp; &nbsp; &nbsp;
                با گرفتن تبدیل لاپلاس از معادله فوق داریم:
                </p>
                <MathJax>{formulaGettingLaplace}</MathJax>


            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    حال اگر این نتیجه را با رابطه ی به دست آمده از روش مستقیم مقایسه کنیم:
                </p>
                <MathJax>{formulaStateSpaceDirectAnswer}</MathJax>

                <MathJax>{formulaStateSpaceDirectAnswer_t0EqualsZero}</MathJax>

            </Grid>

            <Grid className="lecture-text" item>
                <p>
                &nbsp; &nbsp; &nbsp; &nbsp;
                    در نتیجه:                   
                </p>
               <MathJax>{formulaSpaceStateTransferMatrix}</MathJax>
                

            </Grid>
        </SubCard>
    );
};

export default SpaceStateLecture;
