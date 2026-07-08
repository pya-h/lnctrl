import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import delay_types_png from "./visual/delay_types.png";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const DelayedSystemsLecture = () => {
    return (
        <PinchPanCard title="Time-delay systems" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        A delay is the amount of time that must elapse before the output responds to the input. We have two types of delay:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={delay_types_png}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        Consider the following system:
                        <MathJax style={{ fontSize: "18px" }}>
                            {"$$G(s) = e^{-T_d s}$$"}
                        </MathJax>
                        A pure delay does not affect the magnitude; it only changes the phase angle linearly with frequency.
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ \\begin{cases} |G(s)| = 1 \\\\ \\\\ \\angle G(s) = -T_d \\text{ } \\omega \\quad (rad) = -57.3T_d \\text{ } \\omega \\quad (deg) \\end{cases} $$"
                            }
                        </MathJax>
                        <h2>Nyquist plot of time-delay systems</h2>
                        Delay equation
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( G(s) = e^{-sT} \\)"}
                        </MathJax>
                        . This equation is modeled as follows:
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ G(s) = e^{-sT} \\Rightarrow G(j\\omega) = e^{-j\\omega T} = 1 \\angle -\\omega T $$"
                            }
                        </MathJax>
                        <b>Note:</b> at low frequencies
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( \\omega \\rightarrow 0 \\)"}
                        </MathJax>
                        delay element
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( e^{-j\\omega T} \\)"}
                        </MathJax>
                        and the first-order system
                        <MathJax inline style={{ fontSize: "18px" }}>
                            {"\\( \\frac{1}{1 + j\\omega T} \\)"}
                        </MathJax>
                        behave the same way.
                        <MathJax style={{ fontSize: "18px" }}>
                            {
                                "$$ if: \\omega \\rightarrow 0 \\quad \\Rightarrow \\quad e^{-j\\omega T} \\cong \\frac{1}{1 + j\\omega T}$$"
                            }
                        </MathJax>
                        <h2>Complete Nyquist Plot</h2>
                         The complete Nyquist plot is obtained by drawing the plot for ω from negative infinity to positive infinity. To do this, we use the following points:
                        <br /> 1) The plot for ω from negative infinity to zero minus is the mirror image of the plot for ω from zero plus to positive infinity (with respect to the real axis).
                        <br /> 2) For each pole of the transfer function on the imaginary axis, we will have a semicircular path at infinity; this path at infinity moves in the clockwise direction.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default DelayedSystemsLecture;
