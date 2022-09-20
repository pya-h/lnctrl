import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import { MathJax } from "better-react-mathjax";
import img_tf_k_gain from "./img/tf_with_k_gain.jpg";

const SketchingRootLocusLecture = () => {
    return (
        <PinchPanCard title="رسم مکان هندسی" border={true}>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    منظور از مکان‌ریشه، مکان ریشه هاي معادله مشخصه یا قطب‌هاي
                    حلقه‌بسته به ازاي تغییرات بهره k می‌باشد:
                </Typography>
            </Grid>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    src={img_tf_k_gain}
                    alt="بارگذاری تصویر با مشکل مواجه شد"
                />
            </Grid>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ \\frac{C(s)}{R(s)} = \\frac{kG(s)}{1 + kG(s)H(s)} $$`}
                    </MathJax>
                    معادله مشخصه:
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ 1 + kG(s)H(s) = 0 \\\\ 
                            1 + k\\frac{(s-z_1)(s-z_2)...(s-z_m)}{(s-p_1)(s-p_2)...(s-p_n)} = 0 \\\\
                            (s - p_1)(s - p_2)...(s - p_n) + k(s - z_1)(s - z_2)...(s - z_m) = 0 \\\\
                            s_1 = f_1 (k), s_2 = f_2 (k), s_3 = f_3 (k), ..., s_n = f_n (k)
                        $$`}
                    </MathJax>
                    <h2>ویژگی هاي نقاط روي مکان ریشه</h2>
                    <MathJax style={{ fontSize: "18px" }}>
                        {`$$ 1 + k\\frac{(s-z_1)(s-z_2)...(s-z_m)}{(s-p_1)(s-p_2)...(s-p_n)} = 1 + k\\frac{N(s)}{D(s)} = 1 + kL(s) = 0 \\\\
                            L(s) = -\\frac{1}{k}

                        $$`}
                    </MathJax>
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default SketchingRootLocusLecture;
