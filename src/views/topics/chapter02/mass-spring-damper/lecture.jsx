import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import mass_spring_damper_image from "./images/mass-spring-damper.jpg.webp";
import mechanic_system_elements from './images/mechanic-system-elements.jpg';

import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";

const formulaDisplacementDifferentialEquation =
    "$$m\\frac{d^2x(t)}{dt^2} + c\\frac{dx(t)}{dt} + kx(t) = F(t)$$";


const MassSpringDamperLecture = () => {
    return (
        <SubCard
            title="Mass-spring-damper system"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    Just as in electrical systems we dealt with an electrical circuit consisting of 3 main elements, in mechanical and hydraulic systems we generally also have three main elements:
                </p>
                <img
                    className="lecture-image"
                    src={mass_spring_damper_image}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <span className="lecture-text-titr">1) Spring: </span>
                    The first element is the spring. By applying a force, we can determine the amount of stretching, compression, or contraction of the spring. K is the spring constant.
                </p>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <span className="lecture-text-titr">2) Damper: </span>
                    The second element found in mechanical and hydraulic systems is the damper, which can be opened or closed by applying a force F.
                </p>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <span className="lecture-text-titr">3) Mass: </span>
                    The third element is the mass, which stores inertia and can be displaced by applying a force F. In mechanical systems, there is typically a relationship between force and displacement. In fact, force acts as the driving agent and displacement as the driven agent.
                </p>
                <img
                    className="lecture-image"
                    src={mechanic_system_elements}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid className="lecture-text" item>
                <p>
                    After analyzing this system, we arrive at the following second-order differential equation, whose solution is in fact the amount of displacement of the mass m over the time interval t.
                </p>
            </Grid>
            <Grid item>
                <MathJax>{formulaDisplacementDifferentialEquation}</MathJax>
            </Grid>
        </SubCard>
    );
};

export default MassSpringDamperLecture;
