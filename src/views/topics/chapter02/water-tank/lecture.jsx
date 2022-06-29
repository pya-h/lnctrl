import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import hydralic_system_equivalent_circuit_image from "./images/eq-circuit.png";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";

const formulaDifferentialHydralicEquation =
    "$$RC\\frac{dh(t)}{dt} + h(t) = RQ_{in}$$";

const formulaHydraulicResistanceDefinition =
    "$$R = \\frac{Fluid \\, Level \\, Changes}{Fluid \\, Flow  \\, Changes} = \\frac{\\Delta H}{\\Delta Q} \\frac{s}{m^2}$$";
const formulaHydraulicCapacitanceDefinition =
    "$$C = \\frac{Fluid \\, Volume \\, Changes}{Fluid \\, Height  \\, Changes} = \\frac{\\Delta V}{\\Delta H} m^2$$";

const WaterTankLevelLecture = () => {
    return (
        <SubCard
            title="نمودار سطح آب مخزن"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; فرآیندهای صنعتی اغلب شامل جریان
                    مایعات از طریق اتصال لوله‌ها و مخازن می‌شوند. جریان در چنین
                    فرآیندهایی اغلب متلاطم است. سیستم‌های مربوط به جریان متلاطم
                    اغلب باید توسط معادلات دیفرانسیل غیرخطی نشان داده شوند. حال
                    اگر منطقه بهره برداری محدود باشد، چنین معادلات دیفرانسیل
                    غیرخطی می توانند خطی شوند. به همین طریق در سیستم های
                    سیالاتی، می‌توان معادل مقاومت و خازن در سیستم های الکتریکی
                    را به صورت معادلات زیر نشان داد.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; حال مدار معادل سیستم را ترسیم می
                    کنیم:
                </p>
                <img
                    className="lecture-image"
                    src={hydralic_system_equivalent_circuit_image}
                    alt="Loading Failed"
                />
            </Grid>
            <Grid item>
                <MathJax>{formulaHydraulicResistanceDefinition}</MathJax>
            </Grid>
            <Grid item>
            <MathJax>{formulaHydraulicCapacitanceDefinition}</MathJax>

            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; نهایتا معادله دیفرانسیل حاکم بر
                    این سیستم بصورت زیر خواهد بود؛ در این رابطه Qin همان تغییرات
                    دبی ورودی در هر ثانیه می باشد.
                </p>
            </Grid>
            <Grid item>
            <MathJax>{formulaDifferentialHydralicEquation}</MathJax>

            </Grid>
        </SubCard>
    );
};

export default WaterTankLevelLecture;
