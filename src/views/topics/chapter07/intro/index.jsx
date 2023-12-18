import { Grid } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_temp1 from "./img/temp1.JPG";
import img_temp2 from "./img/temp2.JPG";
import img_temp3 from "./img/temp3.JPG";

const Ch07Intro = () => {
    return (
        <PinchPanCard title="Introduction" border={true}>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    style={{ maxWidth: "60rem", height: "auto" }}
                    src={img_temp1}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    style={{ maxWidth: "62rem", height: "auto" }}
                    src={img_temp2}
                    alt="Image loading failed"
                />
            </Grid>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    style={{ maxWidth: "62rem", height: "auto" }}
                    src={img_temp3}
                    alt="Image loading failed"
                />
            </Grid>
        </PinchPanCard>
    );
};

export default Ch07Intro;
