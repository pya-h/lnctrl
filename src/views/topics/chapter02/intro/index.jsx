import { Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const Ch02Intro = () => {
    return (
        <PinchPanCard title="Introduction" border={true}>
            <Typography>
                The ability to mathematically model dynamic systems in order to analyze their dynamic characteristics is of great importance in control science. The mathematical model of a dynamic system is a set of equations that accurately describes the dynamic behavior of the system.
                <br />
                represents. Every physical system, including mechanical systems and others, obeys physical laws. To model these systems, we first derive the equations arising from these physical laws, which are generally in the form of
                <br />
                differential equations. After modeling, using only mathematical relations, any system in any field can be analyzed. In fact, the power of control science, and what makes it interdisciplinary, stems from this very feature.
            </Typography>
        </PinchPanCard>
    );
};

export default Ch02Intro;
