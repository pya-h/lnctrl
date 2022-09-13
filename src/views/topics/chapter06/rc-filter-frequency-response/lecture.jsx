import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from "./visual/rc_filter_circuit.png";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="پاسخ فرکانسی فیلتر RC"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                            &nbsp;پاسخ فرکانسی فیلتر RC
                        </h1>
                        &nbsp; &nbsp; &nbsp; &nbsp; مدار این فیلتر به شکل زیر می
                        باشد:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{m: 'auto'}} item>
                    <img
                        className="lecture-image"
                        src={rc_filter_circuit}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        &nbsp; &nbsp; &nbsp; &nbsp; و تابع تبدیل آن به فرم زیر
                        می باشد:
                        <MathJax style={{fontSize: '18px'}}>{"$$H(s) = \\frac{1}{1 + RCs}$$"}</MathJax>
                        درنتیجه:
                        <MathJax style={{fontSize: '18px'}}>{`$$|H(j\\omega)| = \\frac{v_{out}}{v_{in}} = \\frac{1}{\\sqrt{1 + (\\omega RC)^2}} \\\\
                         \\angle H(j\\omega) = tan^{-1}(-\\omega RC)    $$`}</MathJax>
                        
                        <MathJax style={{fontSize: '18px'}}>{`$$H(j\\omega) = \\frac{1}{1 + jRC\\omega} = \\frac{1}{1 + (RC\\omega)^2} + j\\frac{-RC\\omega}{1 + (RC\\omega)^2}$$`}</MathJax>

                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default RCFilterFrequencyResponseLecture;
