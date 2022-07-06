import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import rc_filter_circuit from './visual/rc_filter_circuit.png';
const firstOrderTransferFunctionFormFormula = "$$G(s) = \\frac{k}{s + a}$$";

const RCFilterFrequencyResponseLecture = () => {
    return (
        <SubCard
            title="First-order transfer function"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    These transfer functions are of the following form:
                </p>
            </Grid>
            <Grid item>
                <MathJax>{firstOrderTransferFunctionFormFormula}</MathJax>
            </Grid>
            <Grid className="lecture-text" item>
                <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                    Steady-State Response
                </h1>
                <p>
                    The diagram of a simple LTI system is as follows:
                </p>
            </Grid>
            <Grid item>
                <img
                    className="lecture-image"
                    src={rc_filter_circuit}
                    alt="Image loading failed"
                />
            </Grid>
           
        </SubCard>
    );
};

export default RCFilterFrequencyResponseLecture;
