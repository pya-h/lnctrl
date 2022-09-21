import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_temp1 from "./img/temp1.JPG";
import img_temp2 from "./img/temp2.JPG";

const Ch04Intro = () => {
    return (
        <PinchPanCard title="مقدمه" border={true}>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    style={{ maxWidth: "60rem", height: "auto" }}
                    src={img_temp1}
                    alt="بارگذاری تصویر با مشکل مواجه شد"
                />
            </Grid>
            <Grid xs={12} sx={{ m: "auto", textAlign: "center" }}>
                <img
                    style={{ maxWidth: "62rem", height: "auto" }}
                    src={img_temp2}
                    alt="بارگذاری تصویر با مشکل مواجه شد"
                />
            </Grid>
        </PinchPanCard>
    );
};

export default Ch04Intro;
