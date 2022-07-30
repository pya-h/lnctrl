import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
const transferFunctionFormFormula = "$$H(s) = \\frac{K(s\\tau _a + 1)(s\\tau _b + 1)}{s(s\\tau _1 + 1)(s\\tau _2 + 1)(s\\tau _3 + 1)(s\\tau _4 + 1)}$$";

const PIDLecture = () => {
    return (
        <SubCard
            title="مثالی از رسم نمودار بود"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; می خواهیم برای توابع تبدیل به فرم زیر نمودار بود رسم
                    کنیم:
                </p>
            </Grid>
            <Grid item>
                <MathJax>{transferFunctionFormFormula}</MathJax>
            </Grid>
        </SubCard>
    );
};

export default PIDLecture;
