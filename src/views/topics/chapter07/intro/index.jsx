import SubCard from "../../../ui-component/cards/SubCard";
import {Typography } from "@mui/material";
import "views/topics/topics.css";

const Ch07Intro = () => {
    return (
        <SubCard
            title="مقدمه"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Typography>
               <h2>انواع کنترل کننده ها</h2>
            </Typography>
        </SubCard>
    );
};

export default Ch07Intro;
