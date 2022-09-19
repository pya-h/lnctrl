import { Grid, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const MCircleLecture = () => {
    return (
        <PinchPanCard title="مکان هندسی اندازه ثابت (M-Circle)" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "3.5" }}>
                    با فرض فیدبک واحد داریم:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$
                            T(j\\omega) = \\frac{O(j\\omega)}{R(j\\omega)} \\\\
                            T(j\\omega) = \\frac{G(j\\omega)}{1 + G(j\\omega)} = \\frac{x + jy}{1 + x + jy} = Me^{j\\beta} \\\\
                            M = \\frac{|x + jy|}{|1 + x + jy|} = \\frac{\\sqrt{x^2 + y^2}}{\\sqrt{(1 + x)^2 + y^2}} \\\\
                            M^2 = \\frac{x^2 + y^2}{(1 + x)^2 + y^2} \\\\
                            x^2 (M^2 - 1) + 2xM^2 + y^2 (M^2 - 1) + M^2 = 0
                        $$`}
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ (x + \\frac{M^2}{M^2 - 1})^2 + y^2 = (\\frac{M}{M^2 - 1})^2 $$`}
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default MCircleLecture;
