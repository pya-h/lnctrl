import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from "./visual/delay_types.png";

const simpleDelayedSystemFormula = "$$G(s) = e^{-T_d s}$$";
const systemPhaseValueFormula =
    "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$";

const DelayedSystemsLecture = () => {
    return (
        <SubCard
            title="سیستم های تاخیردار"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp; تاخیر مدت زمانی است که باید طی
                        شود تا خروجی به ورودی پاسخ دهد.
                    </p>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; دو نوع تاخیر داریم:</p>
                </Grid>
                <Grid className="lecture-text" item>
                    <img
                        className="lecture-image"
                        src={delay_types_png}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid className="lecture-text" item>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; سیستم زیر را در نظر بگیرید:</p>
                </Grid>
                <Grid item>
                    <MathJax>{simpleDelayedSystemFormula}</MathJax>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp; تاخیر خالص در اندازه تاثیر نمی
                        گذارد بلکه فقط زاویه فاز را به طور خطی با فرکانس تغییر
                        می دهد.
                    </p>
                </Grid>
                <Grid item>
                    <MathJax>{systemPhaseValueFormula}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default DelayedSystemsLecture;
