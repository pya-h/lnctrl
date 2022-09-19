import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import { MathJax } from "better-react-mathjax";

const NCircleLecture = () => {
    return (
        <PinchPanCard title="مکان هندسی فاز ثابت (N-Circle)" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "3.5" }}>
                    فاز حلقه بسته عبارت است از:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$
                            \\beta = \\angle (\\frac{x + jy}{1 + x + jy}) = tan^{-1}\\frac{y}{x} - tan^{-1}\\frac{y}{1 + x} \\\\
                            \\Rightarrow \\beta = tan^{-1}\\frac{\\frac{y}{x} - \\frac{y}{1 + x}}{x + \\frac{y}{x}\\frac{y}{1 + x}} = tan^{-1}\\frac{y}{x + y^2 + x^2} \\\\
                            \\Rightarrow N = tan \\beta = \\frac{y}{x + x^2 + y^2} \\\\
                            x^2 + x + y^2 - \\frac{y}{N} = 0
                        $$`}
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ (x + \\frac{1}{2})^2 +(y - \\frac{1}{2N})^2 = \\frac{1}{2} \\frac{N^2 + 1}{N^2} $$`}
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default NCircleLecture;
