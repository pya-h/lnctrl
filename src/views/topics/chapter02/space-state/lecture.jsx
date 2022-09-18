import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SpaceStateLecture = () => {
    return (
        <PinchPanCard title="معادلات فضای حالت" border={true}>
            <Grid item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    معادلات حالت وخروجی زیر را در نظر بگیرید:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\begin{cases}\\dot{x}(t) = Ax(t) + Bu(t) \\\\ y(t) = Cx(t) + Du(t)\\end{cases}$$"
                        }
                    </MathJax>
                    اگر معادله اول را به ازای یک ورودی معین و شرایط اولیه داده
                    شده حل کنیم پاسخ متغیرهای حالت سیستم را را به ورودی اعمال
                    شده به سیستم بدست می آوریم. با جایگزینی بردار حالت محاسبه
                    شده x(t) در رابطه ی خروجی y(t) پاسخ سیستم را به ازای همان
                    ورودی و شرایط اولیه بدست آورده ایم.
                    <br />
                    [ادامه متن صفحه 15/41 حل معادله با استفاده از بسط تیلور]
                    <h2>روش تبدیل لاپلاس در حل معادله همگن حالت:</h2>
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$\\dot{x}(t) = Ax(t)$$"}
                    </MathJax>
                    با گرفتن تبدیل لاپلاس از معادله فوق داریم:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\begin{cases} sX(s) - x(0) = AX(s) \\\\ \\\\ [sI - A]X(s) = x(0) \\\\ \\\\ X(s) = [sI - A]^{-1} x(0) \\end{cases}$$"
                        }
                    </MathJax>
                    حال اگر این نتیجه را با رابطه ی به دست آمده از روش مستقیم
                    مقایسه کنیم:
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$x(t) = e^{A(t-t_0)}x(t_0)$$"}
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$if: t_0 = 0 \\rightarrow x(t) = e^{A(t)}x(0)$$"}
                    </MathJax>
                    در نتیجه:
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$\\varphi(t) = e^{At} = \\mathscr{L}^{-1}\\{(sI - A)^{-1}\\}$$"
                        }
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SpaceStateLecture;
