import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import Poly from "../../../../math/algebra/functions/poly";
import hurwitz_symbolic_deltas from './images/hurwitz_deltas.jpg';

const HurwitzCriterionLecture = () => {
    return (
        <SubCard
            title="معیار پایداری هرویتز"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; تمامی ریشه های معادله ی مشخصه در
                    سمت چپ محور موهومی قرار می گیرند اگر و فقط اگر:
                </p>
                <MathJax>{"$$\\Delta_i > 0$$"}</MathJax>
                <MathJax>{Poly.Symbolic("n", "s", 3)}</MathJax>
            </Grid>
            <Grid className="lecture-text" sx={{mr: 20}} item>
                <img
                        className="lecture-image"
                        src={hurwitz_symbolic_deltas}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; شرط لازم برای اینکه قسمت حقیقی قطب ها منفی باشد به عبارت زیر است:
                </p>
            </Grid>
 
            <Grid className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    ۱- هم علامت بودن تمام a<sub>i</sub> ها: در صورت هم علامت نبودن حتما ریشه ای در سمت راست محور موهومی وجود دارد.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;
                    ۲- غیرصفر بودن تمام a<sub>i</sub> ها: در غیر اینصورت ریشه ای روی محور موهومی و یا سمت راست آن قرار دارد. (وجود ریشه ای که سمت چپ محور موهومی نیست.)  
                </p>
            </Grid>
        </SubCard>
    );
};

export default HurwitzCriterionLecture;
