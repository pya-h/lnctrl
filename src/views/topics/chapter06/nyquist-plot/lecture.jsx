import { Grid, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_nyquist_plot from "./img/nyquist_plot.JPG";
import img_nyquist_important_points from "./img/nyquist_important_points.jpg";

const NyquistPlotLecture = () => {
    return (
        <PinchPanCard title="Nichols Magnitude and Phase Chart">
            <Grid container>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>Nyquist plot (polar plot)</h2>
                        The Nyquist plot of the transfer function G(jω) is the plot of this transfer function in the complex plane as the frequency varies from zero to infinity.
                        <br />
                        This plot can be expressed in two ways:
                        <br />
                        <b>1) Polar:</b> via magnitude and phase
                        <br />
                        Magnitude:
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( |G(j\\omega)| \\)`}
                        </MathJax>
                        and phase: 
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\angle G(j\\omega) \\)`}
                        </MathJax>
                        &nbsp;
                        <br />
                        <b>2) Cartesian:</b> through the real and imaginary parts
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ R(\\omega) = Re\\{G(j\\omega)\\} = |G(j\\omega)|cos(\\angle G(j\\omega)) \\\\
                        X(\\omega) = Im\\{G(j\\omega)\\} = |G(j\\omega)|sin(\\angle G(j\\omega)) $$`}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_nyquist_plot}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>Drawing the Nyquist plot</h2>
                        The Nyquist plot can be drawn using the following four key points:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_nyquist_important_points}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography
                        sx={{ p: 2, width: "100%" }}
                        style={{ lineHeight: "2.5" }}
                    >
                        <h2>
                            1)<sup>+</sup>ω → 0
                        </h2>
                        Consider the following overall transfer function:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(s) = k \\times s^q \\times \\prod (\\frac{s}{\\omega_i} + 1)^a \\times \\prod (\\frac{s^2}{\\omega_j ^ 2} + \\frac{2\\zeta s}{\\omega_j} + 1)^b $$`}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\text{if: } \\omega \\rightarrow 0^+ \\Rightarrow 
                                \\begin{cases} |k| \\angle 0 \\quad or \\quad |k| \\angle -180 \\qquad q = 0 \\\\
                                    0 \\angle (90\\times q) \\qquad \\qquad \\qquad q > 0 \\\\ 
                                    \\infty \\angle (90 \\times q) \\qquad \\qquad \\qquad q < 0 \\end{cases}
                            $$`}
                        </MathJax>

                        <h2>
                            2)∞+ → ω
                        </h2>
                        Consider the following overall transfer function:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(s) = \\frac{b_m s^m + ... + b_1 s + b_0 }{s^n + a_{n-1} s^{n - 1} + ... + a_1 s + a_0} $$`}
                        </MathJax>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\text{if: } \\omega \\rightarrow 0^+ \\Rightarrow 
                                \\begin{cases} |b_m| \\angle 0 \\quad or \\quad |b_m| \\angle -180 \\qquad m = n \\\\
                                    0 \\angle -90 (n - m) \\qquad \\qquad \\qquad m < n \\\\ 
                                    \\infty \\angle 90 (m - n) \\qquad \\qquad \\qquad m > n \\end{cases}
                            $$`}
                        </MathJax>
                        <h2>
                            3) Determining the possible crossing points of the real axes
                        </h2>
                        To find the possible points of intersection with the real axes, set the phase angle equal to 0 or
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm 180 \\)`}
                        </MathJax>
                        we set the degree, or we set the imaginary part equal to zero.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega) = |G(j\\omega) \\angle G(j\\omega) = R(\\omega) + jX(\\omega) \\\\
                                \\Rightarrow X(\\omega) = 0, \\quad \\angle G(j\\omega) = \\pm 180 \\quad or \\quad 0
                            $$`}
                        </MathJax>

                        <h2>
                            4) Determining the possible crossing points of the imaginary axes
                        </h2>
                        To find the possible points of intersection with the imaginary axes, set the phase angle equal to
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm 90 \\)`}
                        </MathJax>
                        we set the degree, or we set the real part equal to zero.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega) = |G(j\\omega) \\angle G(j\\omega) = R(\\omega) + jX(\\omega) \\\\
                                \\Rightarrow R(\\omega) = 0, \\quad \\angle G(j\\omega) = \\pm 90
                            $$`}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default NyquistPlotLecture;
