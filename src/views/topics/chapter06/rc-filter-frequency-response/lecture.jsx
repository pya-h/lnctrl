import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from './visual/rc_filter_circuit.png';
const firstOrderTransferFunctionFormFormula = "$$G(s) = \\frac{k}{s + a}$$";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="تابع تبدیل مرتبه یک"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; این توابع تبدیل به فرم زیر می
                    باشند:
                </p>
            </Grid>
            <Grid item>
                <MathJax>{firstOrderTransferFunctionFormFormula}</MathJax>
            </Grid>
            <Grid className="lecture-text" item>
                <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                    &nbsp;پاسخ حالت ماندگار
                </h1>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; دیاگرام یک سیستم LTI ساده بصورت
                    زیر می باشد:
                </p>
            </Grid>
            <Grid item>
                <img
                    className="lecture-image"
                    src={rc_filter_circuit}
                    alt="بارگذاری تصویر با مشکل مواجه شد"
                />
            </Grid>
           
        </SubCard>
    );
};

export default RCFilterFrequencyResponseLecture;
