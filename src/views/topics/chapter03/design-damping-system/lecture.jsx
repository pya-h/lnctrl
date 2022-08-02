import SubCard from "views/ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";
import { mathjaxSpaces } from "toolshed";

const t_riseFormula =
    "$$ t_{pk} = \\frac{k\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}} = \\frac{k\\pi}{\\omega_d} " +
    mathjaxSpaces(3) +
    " k = 1, 2, 3, ...\\\\" +
    " t_{rise} = t_p = \\frac{\\pi}{\\omega_d} $$";
const overshootFormula = `$$M_p = e^{\\frac{-\\zeta \\pi}{\\sqrt{1 - \\zeta^2}}} = e ^ {-\\pi cot\\theta} \\\\
    \\zeta = \\frac{-\\ln M_p}{\\sqrt{\\pi^2 + \\lgroup \\ln M_p \\rgroup ^ 2}} $$`;

const DesignSystemByCharsLecture = () => {
    return (
        <SubCard
            title="طراحی سیستم از طریق مشخصات میرایی"
            darkBorder={true}
            sx={{ direction: "rtl" }}
            spacing={gridSpacing}
        >
            <Typography>
                <Grid
                    className="lecture-text"
                    style={{ fontSize: "20px" }}
                    item
                >
                    <p>&nbsp; &nbsp; &nbsp; &nbsp; زمان اوج (Rise Time)</p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{t_riseFormula}</MathJax>
                </Grid>
                <Grid
                    className="lecture-text"
                    style={{ fontSize: "20px" }}
                    item
                >
                    <p>&nbsp; &nbsp; &nbsp; &nbsp; بالازدگی (Overshoot)</p>
                </Grid>
                <Grid style={{ fontSize: "20px" }} item>
                    <MathJax>{overshootFormula}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default DesignSystemByCharsLecture;
