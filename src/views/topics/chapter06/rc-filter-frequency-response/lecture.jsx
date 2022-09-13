import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from "./visual/rc_filter_circuit.png";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="Frequency response of the RC filter"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                            Frequency Response of the RC Filter
                        </h1>
                        The circuit of this filter is as follows:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{m: 'auto'}} item>
                    <img
                        className="lecture-image"
                        src={rc_filter_circuit}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        And its transfer function is of the following form:
                        <MathJax style={{fontSize: '18px'}}>{"$$H(s) = \\frac{1}{1 + RCs}$$"}</MathJax>
                        As a result:
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
