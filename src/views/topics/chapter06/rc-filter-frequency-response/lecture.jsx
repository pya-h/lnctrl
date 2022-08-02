import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from "./visual/rc_filter_circuit.png";
const RCFilterTransferFunctionFormFormula = "$$G(s) = \\frac{k}{1 + RCs}$$";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="پاسخ فرکانسی فیلتر RC"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                        &nbsp;پاسخ فرکانسی فیلتر RC
                    </h1>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; مدار این فیلتر به شکل زیر می
                        باشد:
                    </p>
                </Grid>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={rc_filter_circuit}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; و تابع تبدیل آن به فرم زیر
                        می باشد:
                    </p>
                </Grid>
                <Grid item>
                    <MathJax>{RCFilterTransferFunctionFormFormula}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default RCFilterFrequencyResponseLecture;
