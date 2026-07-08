import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import { MathJax } from "better-react-mathjax";
import img_control_system_block_diagram from "./img/control_system_block_diagram.jpg";
import { Poly } from "math/algebra/functions";

const RootLocusLecture = () => {
    return (
        <PinchPanCard title="Root locus" border={true}>
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        The root locus is the geometric locus of the roots of the characteristic equation as a gain varies. In this method, using the loop transfer function (or the open-loop transfer function with unity feedback), we determine the locations of the closed-loop poles.
                        <br />
                        In fact, the roots of the characteristic equation are the poles of the closed-loop transfer function.
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$
                                \\frac{C(s)}{R(s)} = \\frac{G(s)}{1 + G(s)H(s)} \\Rightarrow 1 + G(s)H(s) = 0
                            $$`}
                        </MathJax>
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        src={img_control_system_block_diagram}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$
                                1 + G(s)H(s) = 1 + k\\frac{${Poly.Symbolic(
                                    "m",
                                    "s",
                                    2,
                                    "b",
                                    true,
                                    true
                                )}}{${Poly.Symbolic(
                                "n",
                                "s",
                                2,
                                "a",
                                true
                            )}} \\\\
                                \\Rightarrow 1 + G(s)H(s) = 1 + k\\frac{(s-z_1)(s-z_2)...(s-z_m)}{(s-p_1)(s-p_2)...(s-p_n)}
                            $$`}
                        </MathJax>
                        where in these relations z<sub>i</sub> The zeros of the closed-loop transfer function and p<sub>i</sub> s are its poles. By setting the above relation to zero, the characteristic equation of the system can be written in the form of the following relation:
                        <MathJax style={{ fontSize: "18px" }}>
                            {`$$ (s - p_1)(s - p_2)...(s - p_n) + k(s - z_1)(s - z_2)...(s - z_m) = 0 $$`}
                        </MathJax>
                        The order of the characteristic equation (n) equals the number of its roots and the number of poles of the closed-loop transfer function. As is evident, for each k, n roots are obtained, which are plotted in the s-plane.
                        <br />
                        Knowing the location of z, we want to<sub>i</sub> s and p<sub>i</sub> we plot the location of these n roots as k varies from negative infinity to positive infinity (or from zero to positive infinity).
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default RootLocusLecture;
