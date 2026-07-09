import { Grid, Typography } from "@mui/material";
import ThemedImage from "views/ui-component/ThemedImage";
import "views/topics/topics.css";
import { MathJax } from "better-react-mathjax";
import img_formula_22 from "./img/formula_22.jpg";
import img_formula_22_dark from "./img/formula_22-dark.jpg";
import img_formula_23 from "./img/formula_23.jpg";
import img_formula_23_dark from "./img/formula_23-dark.jpg";
import img_zero_poles_type_in_bode from "./img/zero_pole_types_in_bode.JPG";
import img_zero_poles_type_in_bode_dark from "./img/zero_pole_types_in_bode-dark.JPG";
import img_standard_second_degree_system from "./img/standard_second_degree_system.jpg";
import img_standard_second_degree_system_dark from "./img/standard_second_degree_system-dark.jpg";
import img_m_pw_plot from "./img/m_pw_plot.png";
import img_m_pw_plot_dark from "./img/m_pw_plot-dark.png";
import img_bode_plot_manual from "./img/bode_plot_manual.jpg";
import img_bode_plot_manual_dark from "./img/bode_plot_manual-dark.jpg";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const BodePlotLecture = () => {
    return (
        <PinchPanCard title="Bode plot" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h1>Bode plot</h1>
                        The plot of the frequency-response magnitude on a logarithmic scale together with its phase plot is called the Bode plot.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ G(j\\omega) = |G(j\\omega)|e^{j\\theta} $$`}</MathJax>
                        The logarithm of the magnitude of the transfer function G(jω) is expressed in decibels and is as follows.
                        <MathJax
                            style={{ fontSize: "18px" }}
                        >{`$$ LmG(j\\omega) = 20log|G(j\\omega)| $$`}</MathJax>
                        The two units used to express frequency bands or frequency ratios are the octave and the decade.
                        <br />
                        <br />
                        The distance between these two frequencies is one octave.
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{\\omega_1}{\\omega_2} = 2 \\Rightarrow \\)`}
                        </MathJax>
                        <br />
                        The distance between these two frequencies is one decade.
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{\\omega_1}{\\omega_2} = 10 \\Rightarrow \\)`}
                        </MathJax>
                        <br />
                        <br />
                        <b> Advantages of using the logarithm for magnitude:</b>
                        <br />
                        1. Converting multiplication to addition and division to subtraction
                        <br />
                        2. A wider representation of the frequency response
                        <br />
                        <br />
                        <b>Advantages of using the logarithmic representation of ω</b>
                        <br />
                        1. Simpler drawing
                        <br />
                        2. Representation of a wider frequency range
                        <br /> <br />
                        <b>Transfer function of a system in the general case:</b>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_formula_22} dark={img_formula_22_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        For the above transfer function, we will have two sets of equations for the logarithmic magnitude and phase:
                        <h3>Magnitude logarithm</h3>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_formula_23} dark={img_formula_23_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>Phase</h3>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <MathJax
                        style={{ fontSize: "18px" }}
                    >{`$$ \\phi(\\omega) = +\\sum\\limits_{i=1}^Q tan^{-1}(\\omega \\tau_i) - N(90°) -
                     \\sum\\limits_{m=1}^M tan^{-1}(\\omega \\tau_m) \\\\ \\qquad - \
                     \\sum\\limits_{k=1}^R tan^{-1} \\frac{2\\zeta_k \\omega_{n_k} \\omega}{\\omega^2 _{n_k} - \\omega^2}
                     \\sum\\limits_{l=1}^P tan^{-1} \\frac{2\\zeta_l \\omega_{n_l} \\omega}{\\omega^2 _{n_l} - \\omega^2} $$`}</MathJax>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>Drawing Bode plots</h3>
                        To draw the complete Bode plot, we first plot the following four terms:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_zero_poles_type_in_bode} dark={img_zero_poles_type_in_bode_dark}
                        style={{ width: "100%", maxWidth: "30rem", height: "auto" }}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>Corner (break) frequency</h3>
                        at frequency
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} = \\omega_1 \\)`}
                        </MathJax>
                        , is called the break frequency or corner frequency. The frequency
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} \\)`}
                        </MathJax>
                        It is called the corner (break) frequency because at this frequency a break occurs in the slope of the magnitude curve. Also, the frequency
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega = \\frac{1}{T} \\)`}
                        </MathJax>
                        <br />
                        It is also called the corner frequency because the asymptotic magnitude plot at this frequency is at the corner of two straight lines.
                        <br />
                        <b>Note:</b> The important range of the frequency response (in the logarithmic magnitude and phase angle plots) is usually
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\pm1 \\)`}
                        </MathJax>
                        decade from the corner frequency.
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h3>Resonant frequency</h3>
                        If ξ is between 0 and 1, we have two complex poles. As its value changes, the Bode plot also changes as shown alongside. In fact, the peak that appears occurs at a specific frequency called the resonant frequency.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_standard_second_degree_system} dark={img_standard_second_degree_system_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <MathJax
                        style={{ fontSize: "18px" }}
                    >{`$$ \\omega_r = \\omega_n \\sqrt{1 - 2\\zeta^2} \\\\
                    m_{p\\omega} = \\begin{cases} 
                            \\frac{1}{2\\zeta \\sqrt{1 - \\zeta^2}} \\qquad \\zeta < \\frac{1}{2} \\\\
                            1 \\qquad \\qquad 1 > \\zeta > \\frac{1}{\\sqrt2}
                        \\end{cases}
                $$`}</MathJax>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        The larger the bandwidth 
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\omega_B \\)`}
                        </MathJax>
                        increases, the rise time of the step response decreases. The overshoot of the step response also
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( m_{p\\omega} \\)`}
                        </MathJax>
                        is related to ξ. The larger
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( m_{p\\omega} \\)`}
                        </MathJax>
                        increases, the overshoot percentage also increases.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_m_pw_plot} dark={img_m_pw_plot_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <h2>Steps for Drawing a Bode Plot</h2>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={img_bode_plot_manual} dark={img_bode_plot_manual_dark}
                        style={{ width: "100%", maxWidth: "30rem", height: "auto" }}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <b>Note: </b>
                        If we multiply a system by 10, the magnitude plot rises by 20dB and no change occurs in the phase.
                        <br />
                        <b>Note: </b>
                        If we consider a system at the value 
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\frac{-1}{10} \\)`}
                        </MathJax>
                        we multiply, the magnitude plot drops by 20dB and the phase shifts by 180 degrees.
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default BodePlotLecture;
