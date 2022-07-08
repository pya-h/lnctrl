import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from './visual/delay_types.png';

const simpleDelayedSystemFormula = "$$G(s) = e^{-T_d s}$$";
const systemPhaseValueFormula = "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$";

const DelayedSystemsLecture = () => {
    return (
        <SubCard
            title="Time-delay systems"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    A delay is the amount of time that must elapse before the output responds to the input.
                </p>
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    We have two types of delay:
                </p>
            </Grid>
            <Grid  className="lecture-text" item>
                <img
                    className="lecture-image"
                    src={delay_types_png}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    Consider the following system:
                </p>
            </Grid>
            <Grid item>
                <MathJax>{simpleDelayedSystemFormula}</MathJax>
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    A pure delay does not affect the magnitude; it only changes the phase angle linearly with frequency.
                </p>
            </Grid>
            <Grid item>
                <MathJax>{systemPhaseValueFormula}</MathJax>
            </Grid>
        </SubCard>
    );
};

export default DelayedSystemsLecture;
