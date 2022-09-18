import { Grid, Typography } from "@mui/material";
import hydralic_system_equivalent_circuit_image from "./images/eq-circuit.png";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const WaterTankLevelLecture = () => (
    <PinchPanCard title="نمودار سطح آب مخزن" border={true}>
        <Grid container>
            <Grid item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    فرآیندهای صنعتی اغلب شامل جریان مایعات از طریق اتصال لوله‌ها
                    و مخازن می‌شوند. جریان در چنین فرآیندهایی اغلب متلاطم است.
                    سیستم‌های مربوط به جریان متلاطم اغلب باید توسط معادلات
                    دیفرانسیل غیرخطی نشان داده شوند. حال اگر منطقه بهره برداری
                    محدود باشد، چنین معادلات دیفرانسیل غیرخطی می توانند خطی
                    شوند. به همین طریق در سیستم های سیالاتی، می‌توان معادل
                    مقاومت و خازن در سیستم های الکتریکی را به صورت معادلات زیر
                    نشان داد.
                    <br />
                    حال مدار معادل سیستم را ترسیم می کنیم:
                </Typography>
            </Grid>
            <Grid xs={12} sx={{ m: "auto" }} item>
                <img
                    className="lecture-image"
                    src={hydralic_system_equivalent_circuit_image}
                    alt="Loading Failed"
                />
            </Grid>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$R = \\frac{Fluid \\, Level \\, Changes}{Fluid \\, Flow  \\, Changes} = \\frac{\\Delta H}{\\Delta Q} \\frac{s}{m^2}$$"
                        }
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$C = \\frac{Fluid \\, Volume \\, Changes}{Fluid \\, Height  \\, Changes} = \\frac{\\Delta V}{\\Delta H} m^2$$"
                        }
                    </MathJax>
                    نهایتا معادله دیفرانسیل حاکم بر این سیستم بصورت زیر خواهد
                    بود؛ در این رابطه Qin همان تغییرات دبی ورودی در هر ثانیه می
                    باشد.
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$RC\\frac{dh(t)}{dt} + h(t) = RQ_{in}$$"}
                    </MathJax>
                </Typography>
            </Grid>
        </Grid>
    </PinchPanCard>
);
export default WaterTankLevelLecture;
