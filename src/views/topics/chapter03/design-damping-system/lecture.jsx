import { Grid, Typography } from "@mui/material";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const DesignSystemByCharsLecture = () => {
    return (
        <PinchPanCard title="طراحی سیستم از طریق مشخصات میرایی" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    <h1>زمان اوج (Rise Time)</h1>
                    <MathJax>
                        {`$$ t_{pk} = \\frac{k\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}} = \\frac{k\\pi}{\\omega_d} \\qquad
                        k = 1, 2, 3, ...\\\\
                    t_{rise} = t_p = \\frac{\\pi}{\\omega_d} $$`}
                    </MathJax>
                    <h1>بالازدگی (Overshoot)</h1>
                    <MathJax>{`$$M_p = e^{\\frac{-\\zeta \\pi}{\\sqrt{1 - \\zeta^2}}} = e ^ {-\\pi cot\\theta} \\\\
                    \\zeta = \\frac{-\\ln M_p}{\\sqrt{\\pi^2 + \\lgroup \\ln M_p \\rgroup ^ 2}} $$`}</MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default DesignSystemByCharsLecture;
