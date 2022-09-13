import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import hydralic_system_equivalent_circuit_image from "./images/eq-circuit.png";
import "../../topics.css";
import { MathJax } from "better-react-mathjax";

const formulaDifferentialHydralicEquation =
    "$$RC\\frac{dh(t)}{dt} + h(t) = RQ_{in}$$";

const formulaHydraulicResistanceDefinition =
    "$$R = \\frac{Fluid \\, Level \\, Changes}{Fluid \\, Flow  \\, Changes} = \\frac{\\Delta H}{\\Delta Q} \\frac{s}{m^2}$$";
const formulaHydraulicCapacitanceDefinition =
    "$$C = \\frac{Fluid \\, Volume \\, Changes}{Fluid \\, Height  \\, Changes} = \\frac{\\Delta V}{\\Delta H} m^2$$";

const WaterTankLevelLecture = () => {
    return (
        <SubCard
            title="Water tank level diagram"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <p>
                        Industrial processes often involve the flow of liquids through connecting pipes and tanks. The flow in such processes is often turbulent. Systems involving turbulent flow must often be represented by nonlinear differential equations. Now, if the operating region is limited, such nonlinear differential equations can be linearized. In the same way, for fluid systems, the equivalents of resistance and capacitance from electrical systems can be represented by the following equations.
                    </p>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        Now we draw the equivalent circuit of the system:
                    </p>
                    <img
                        className="lecture-image"
                        src={hydralic_system_equivalent_circuit_image}
                        alt="Loading Failed"
                    />
                </Grid>
                <Grid item>
                    <MathJax>{formulaHydraulicResistanceDefinition}</MathJax>
                </Grid>
                <Grid item>
                    <MathJax>{formulaHydraulicCapacitanceDefinition}</MathJax>
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        Finally, the differential equation governing this system will be as follows; in this relation, Qin is the change in the input flow rate per second.
                    </p>
                </Grid>
                <Grid item>
                    <MathJax>{formulaDifferentialHydralicEquation}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default WaterTankLevelLecture;
