import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const FrequencyResponseLecture = () => {
    return (
        <PinchPanCard title="Frequency response" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1>Frequency analysis</h1>
                        In the frequency response, we examine the variations in the system's magnitude and phase as a function of frequency.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ G(s) = \\frac{k(s - z_1)(s - z_2) ... (s - z_m)}{(s - p_1)(s - p_2) ... (s - p_n)} \\\\ 
                        G(j\\omega) R(\\omega) + jX(\\omega) = |G(j\\omega) \\angle G(j\\omega) \\\\ R(\\omega) = Re[G(j\\omega)], X(\\omega) = Im[G(j\\omega)] \\\\
                        |G(j\\omega) = \\sqrt{R^2 + X^2}, \\quad \\angle G(j\\omega) = tan^{-1}\\frac{X(\\omega)}{R(\\omega)}$$`}</MathJax>
                        As a result:
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ |G(j\\omega) = |k| \\times \\frac{\\prod_{i=1}^{m} |j\\omega - z_i|}{\\prod_{i=1}^{n} |j\\omega - p_i|} \\\\
                            \\angle G(j\\omega) = \\sum\\limits_{i=1}^{m} \\angle(j\\omega - z_i) - \\sum\\limits_{i=1}^{n} \\angle(j\\omega - p_i) + \\{ \\frac{0 \\rightarrow k > 0}{180 \\rightarrow k < 0 } \\} 
                        $$`}</MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default FrequencyResponseLecture;
