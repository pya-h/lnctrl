import { Grid, Typography } from "@mui/material";
import ThemedImage from "views/ui-component/ThemedImage";
import hydralic_system_equivalent_circuit_image from "./images/eq-circuit.png";
import hydralic_system_equivalent_circuit_image_dark from "./images/eq-circuit-dark.png";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const WaterTankLevelLecture = () => (
    <PinchPanCard title="Water tank level diagram" border={true}>
        <Grid container>
            <Grid item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    Industrial processes often involve the flow of liquids through connecting pipes and tanks. The flow in such processes is often turbulent. Systems involving turbulent flow must often be represented by nonlinear differential equations. Now, if the operating region is limited, such nonlinear differential equations can be linearized. In the same way, for fluid systems, the equivalents of resistance and capacitance from electrical systems can be represented by the following equations.
                    <br />
                    Now we draw the equivalent circuit of the system:
                </Typography>
            </Grid>
            <Grid xs={12} sx={{ m: "auto" }} item>
                <ThemedImage
                    className="lecture-image"
                    light={hydralic_system_equivalent_circuit_image} dark={hydralic_system_equivalent_circuit_image_dark}
                    alt="Loading Failed"
                />
            </Grid>
            <Grid xs={12} item>
                <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$R = \\frac{Fluid \\, Level \\, Changes}{Fluid \\, Flow  \\, Changes} = \\frac{\\Delta H}{\\Delta Q} \\frac{s}{m^2}$$"
                        }
                    </MathJax>
                    <MathJax style={{ fontSize: "18px" }}>
                        {
                            "$$C = \\frac{Fluid \\, Volume \\, Changes}{Fluid \\, Height  \\, Changes} = \\frac{\\Delta V}{\\Delta H} m^2$$"
                        }
                    </MathJax>
                    Finally, the differential equation governing this system will be as follows; in this relation, Qin is the change in the input flow rate per second.
                    <MathJax style={{ fontSize: "18px" }}>
                        {"$$RC\\frac{dh(t)}{dt} + h(t) = RQ_{in}$$"}
                    </MathJax>
                </Typography>
            </Grid>
        </Grid>
    </PinchPanCard>
);
export default WaterTankLevelLecture;
