import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from "./visual/delay_types.png";
import PinchPanCard from 'views/ui-component/cards/PinchPanCard';

const simpleDelayedSystemFormula = "$$G(s) = e^{-T_d s}$$";
const systemPhaseValueFormula =
    "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$";

const DelayedSystemsLecture = () => {
    return (
        <PinchPanCard
            title="سیستم های تاخیردار"
            border={true}
        >
            <Grid container>
                <Grid item>
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
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        سیستم زیر را در نظر بگیرید:
                        <MathJax style={{ fontSize: "18px" }}>
                            {simpleDelayedSystemFormula}
                        </MathJax>
                        تاخیر خالص در اندازه تاثیر نمی گذارد بلکه فقط زاویه فاز
                        را به طور خطی با فرکانس تغییر می دهد.
                        <MathJax style={{ fontSize: "18px" }}>
                            {systemPhaseValueFormula}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default DelayedSystemsLecture;
