import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from "./visual/delay_types.png";
import PinchPanCard from 'views/ui-component/cards/PinchPanCard';

const simpleDelayedSystemFormula = "$$G(s) = e^{-T_d s}$$";
const systemPhaseValueFormula =
    "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$";

const DelayedSystemsLecture = () => {
    return (
        <PinchPanCard
            title="Time-delay systems"
            border={true}
        >
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        A delay is the amount of time that must elapse before the output responds to the input. We have two types of delay:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={delay_types_png}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        Consider the following system:
                        <MathJax style={{ fontSize: "18px" }}>
                            {simpleDelayedSystemFormula}
                        </MathJax>
                        A pure delay does not affect the magnitude; it only changes the phase angle linearly with frequency.
                        <MathJax style={{ fontSize: "18px" }}>
                            {systemPhaseValueFormula}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default DelayedSystemsLecture;
