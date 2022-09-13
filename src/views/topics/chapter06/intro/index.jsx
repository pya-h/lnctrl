import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import img_in_out_signals from "./img/in_out_signals.jpg";
import { MathJax } from "better-react-mathjax";

const Ch06Intro = () => {
    return (
        <SubCard title="Introduction" darkBorder={true} style={{ direction: "ltr" }}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ p: 2 }} style={{ lineHeight: "2.5" }}>
                        <h2>Why do we use frequency response?</h2>
                        First, the question arises: why do we study the frequency response? In the classical analysis of linear control systems, there are two fundamental approaches for analyzing and improving system performance that work without solving the system's governing differential equations:
                        <br />
                        1. Root locus     2. Frequency response
                        <br />
                        As we saw in the previous chapter, control system design using the root locus method is carried out by examining the behavior of the closed-loop roots in the s-plane in response to a change in a system parameter (the open-loop system gain). In frequency response analysis, unlike the root locus, the system gain and its other parameters are assumed constant, and the changes in the magnitude and phase of the transfer function G(s) in response to changes in the poles of the transfer function are considered.
                        <br />
                        The Fourier transform is the bridge between the frequency response and the differential equations of the system:
                        <p style={{ textAlign: "center" }}>
                            (s=jω) frequency response → Fourier transform → differential equations
                        </p>
                        <br />
                        Previously we had:
                        <br />
                        <p style={{ textAlign: "center" }}>
                            (s=σ+jω) transfer function → Laplace transform → differential equations
                        </p>
                        <h2>Frequency response</h2>
                        The frequency response of a system is defined as the steady-state response to a sinusoidal input.
                        <br />
                        <p style={{ textAlign: "center" }}>
                            steady-state Asin(ωt) → linear system → Bsin(ωt+Ѳ)
                        </p>
                    </Typography>
                </Grid>
                <Grid style={{ margin: "auto" }} item>
                    <img
                        className="lecture-image"
                        style={{ textAlign: "center" }}
                        src={img_in_out_signals}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ p: 2 }} style={{ lineHeight: "2.5" }}>
                        In other words, the response of a stable linear system to a sinusoidal input is itself sinusoidal. If the input to the system is as follows:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ u(t) = Asin(\\omega t) \\\\
                         U(s) = \\frac{A\\omega}{s^2 + \\omega^2} 
                         \\Rightarrow Y(s) = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} $$`}
                        </MathJax>
                        where G(s) is the transfer function of the system. Now we examine the different cases:
                        <br /> <br />
                        <b>First case:</b>If the poles of Y(s) are all stable and distinct from one another:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ Y(s) = \\frac{b(s)}{(s + p_1)(s + p_2)...(s + p_n)} \\times \\frac{A\\omega}{s^2 + \\omega^2} \\\\
                         \\Rightarrow Y(s) = \\frac{a}{s + j\\omega} + \\frac{\\bar{a}}{s + j\\omega} + \\frac{b_1}{s + p_1} \\text{ } + ... + \\text{ } \\frac{b_n}{s + p_n} \\\\
                         \\Rightarrow y(t) = ae^{-j\\omega t} + \\bar{a}e^{-j\\omega t} + b_1e^{-p_1 t} \\text{ } + ... + \\text{ } b_ne^{-p_n t} $$`}
                        </MathJax>
                        As t tends to infinity, the terms
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( e^{-p_i t}  \\)`}
                        </MathJax>
                        will tend to zero. Therefore, all terms except the first two will become zero.
                        <br /> <br />
                        <b>Second case:</b>If Y(s) also has repeated poles:
                        <br />
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ Y(s) = \\frac{b(s)}{((s + p_1) ... (s + p_j)^{mj} ... (s + p_n))} \\times \\frac{A\\omega}{s^2 + \\omega^2}$$`}
                        </MathJax>
                        <br />
                        y(t) contains terms such as 
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( t^{hj} e^{-p_j t} \\)`}
                        </MathJax>
                        which will be such that, for a stable system, the terms
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( t^{hj} e^{-p_j t} \\)`}
                        </MathJax>
                        as t approaches infinity, they will tend toward zero.
                        <br /> In both cases, the final value of y(t) is as follows: (as t tends to infinity)
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ y_{ss}(t) = ae^{-j\\omega t} + \\bar{a}e^{j\\omega t} $$`}
                        </MathJax>
                        where the coefficients a and a̅ are obtained from the following relations.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ a = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} \\times (s + j\\omega)|_{s=-j\\omega} = \\frac{-AG(-j\\omega)}{2j} \\\\
                    \\bar{a} = G(s) \\times \\frac{A\\omega}{s^2 + \\omega^2} \\times (s - j\\omega)|_{s=j\\omega} = \\frac{AG(-j\\omega)}{2j} $$`}
                        </MathJax>
                        Since G(jω) is a complex quantity, it can be written in the following polar form:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ G(j\\omega)=|G(j\\omega)|e^{j\\theta} = |G(j\\omega)|\\angle G(j\\omega) $$`}
                        </MathJax>
                        where |G(jω)| denotes the magnitude of G(jω) and θ represents the phase or angle of G(jω). In other words:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ \\theta =\\angle G(jω) = tan^{-1} \\frac{ImG(j\\omega)}{ReG(j\\omega)} $$`}
                        </MathJax>
                        Therefore:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ y_{ss}(t) = A |G(jω)| \\frac{e^{j(\\omega t + \\theta)} - e^{-j(\\omega t + \\theta)}}{2j} \\\\ 
                        \\Rightarrow y_{ss}(t) = A|G(j\\omega)|sin(\\omega t + \\theta) = Bsin(\\omega t + \\theta) $$`}
                        </MathJax>
                        Consequently, a stable linear time-invariant (LTI) system with a sinusoidal input also has, in steady-state, a sinusoidal output at the same frequency; only the magnitude and phase of the output signal differ from those of the input signal in steady-state. The ratio of the output magnitude to the input magnitude equals the magnitude of the transfer function |G(jω)|, and the phase difference between the input and output signals equals θ=∠G(jω). The transfer function G(jω) is also called the sinusoidal transfer function, in which the ratio of the output magnitude to the input magnitude is:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ |G(jω)| = \\frac{B}{A} $$`}
                        </MathJax>
                        and the phase difference between the output phase and the input phase is equal to:
                        <MathJax inline={true} style={{ fontSize: "18px" }}>
                            {`\\( \\angle G(j\\omega) \\)`}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default Ch06Intro;
