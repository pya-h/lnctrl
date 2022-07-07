import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from './visual/rc_filter_circuit.png';
const RCFilterTransferFunctionFormFormula = "$$G(s) = \\frac{k}{s + a}$$";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="First-order transfer function"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            
            <Grid className="lecture-text" item>
                <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                    Frequency Response of the RC Filter
                </h1>
                <p>
                    The circuit of this filter is as follows:
                </p>
            </Grid>
            <Grid item>
                <img
                    className="lecture-image"
                    src={rc_filter_circuit}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    And its transfer function is of the following form:
                </p>
            </Grid>
            <Grid item>
                <MathJax>{RCFilterTransferFunctionFormFormula}</MathJax>
            </Grid>
        </SubCard>
    );
};

export default RCFilterFrequencyResponseLecture;
