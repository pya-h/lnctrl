import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import "../../topics.css";

const BodePlotExampleLecture = () => {
    return (
        <PinchPanCard title="مثالی از رسم نمودار بود">
            <Grid sx={{m: "auto"}} xs={12} item>
                <Typography
                    sx={{ p: 2 }}
                    style={{ lineHeight: "2.5" }}
                >
                    می خواهیم برای توابع تبدیل به فرم زیر نمودار بود رسم کنیم:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$H(s) = \\frac{K(s\\tau _a + 1)(s\\tau _b + 1)}{s(s\\tau _1 + 1)(s\\tau _2 + 1)(s\\tau _3 + 1)(s\\tau _4 + 1)}$$`}
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default BodePlotExampleLecture;
