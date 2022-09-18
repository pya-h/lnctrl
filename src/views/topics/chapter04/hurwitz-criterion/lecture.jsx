import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import { Poly } from "math/algebra/functions";
import hurwitz_symbolic_deltas from "./images/hurwitz_deltas.jpg";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const HurwitzCriterionLecture = () => {
    return (
        <PinchPanCard title="معیار پایداری هرویتز" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        تمامی ریشه های معادله ی مشخصه در سمت چپ محور موهومی قرار
                        می گیرند اگر و فقط اگر:
                        <MathJax style={{ fontSize: "18px" }}>
                            {"$$\\Delta_i > 0$$"}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {Poly.Symbolic("n", "s", 3)}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={hurwitz_symbolic_deltas}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        شرط لازم برای اینکه قسمت حقیقی قطب ها منفی باشد به عبارت
                        زیر است:
                        <br />
                        ۱- هم علامت بودن تمام a<sub>i</sub> ها: در صورت هم علامت
                        نبودن حتما ریشه ای در سمت راست محور موهومی وجود دارد.
                        <br />
                        ۲- غیرصفر بودن تمام a<sub>i</sub> ها: در غیر اینصورت
                        ریشه ای روی محور موهومی و یا سمت راست آن قرار دارد.
                        (وجود ریشه ای که سمت چپ محور موهومی نیست.)
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default HurwitzCriterionLecture;
