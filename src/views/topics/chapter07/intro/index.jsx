import SubCard from "../../../ui-component/cards/SubCard";
import {Typography } from "@mui/material";
import "views/topics/topics.css";

const Ch07Intro = () => {
    return (
        <SubCard
            title="Introduction"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Typography>
               <h2>Types of controllers</h2>
            </Typography>
        </SubCard>
    );
};

export default Ch07Intro;
