import { Grid } from "@mui/material";
import ThemedImage from "views/ui-component/ThemedImage";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_temp1 from "./img/temp1.JPG";
import img_temp1_dark from "./img/temp1-dark.JPG";
import img_temp2 from "./img/temp2.JPG";

import img_temp2_dark from "./img/temp2-dark.JPG";
const Ch04Intro = () => {
    return (
        <PinchPanCard title="Introduction" border={true}>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <ThemedImage
                    style={{ width: "100%", maxWidth: "60rem", height: "auto" }}
                    light={img_temp1} dark={img_temp1_dark}
                    alt="Failed loading!"
                />
            </Grid>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <ThemedImage
                    style={{ width: "100%", maxWidth: "62rem", height: "auto" }}
                    light={img_temp2} dark={img_temp2_dark}
                    alt="Failed loading!"
                />
            </Grid>
        </PinchPanCard>
    );
};

export default Ch04Intro;
