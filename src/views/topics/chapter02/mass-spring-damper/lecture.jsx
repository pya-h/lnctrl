import { Grid, Typography } from "@mui/material";
import ThemedImage from "views/ui-component/ThemedImage";
import mass_spring_damper_image from "./images/mass-spring-damper.jpg.webp";
import mass_spring_damper_image_dark from "./images/mass-spring-damper.jpg-dark.webp";
import mechanic_system_elements from "./images/mechanic-system-elements.jpg";

import mechanic_system_elements_dark from "./images/mechanic-system-elements-dark.jpg";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const MassSpringDamperLecture = () => {
    return (
        <PinchPanCard title="Mass-spring-damper system" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        Just as in electrical systems we dealt with an electrical circuit consisting of 3 main elements, in mechanical and hydraulic systems we generally also have three main elements:
                    </Typography>
                </Grid>

                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={mass_spring_damper_image} dark={mass_spring_damper_image_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <span className="lecture-text-titr">1) Spring: </span>
                        The first element is the spring. By applying a force, we can determine the amount of stretching, compression, or contraction of the spring. K is the spring constant.
                        <br />
                        <span className="lecture-text-titr">2) Damper: </span>
                        The second element found in mechanical and hydraulic systems is the damper, which can be opened or closed by applying a force F.
                        <br />
                        <span className="lecture-text-titr">3) Mass: </span>
                        The third element is the mass, which stores inertia and can be displaced by applying a force F. In mechanical systems, there is typically a relationship between force and displacement. In fact, force acts as the driving agent and displacement as the driven agent.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <ThemedImage
                        className="lecture-image"
                        light={mechanic_system_elements} dark={mechanic_system_elements_dark}
                        alt="Failed loading!"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        After analyzing this system, we arrive at the following second-order differential equation, whose solution is in fact the amount of displacement of the mass m over the time interval t.
                        <MathJax>
                            {"$$m\\frac{d^2x(t)}{dt^2} + c\\frac{dx(t)}{dt} + kx(t) = F(t)$$"}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default MassSpringDamperLecture;
