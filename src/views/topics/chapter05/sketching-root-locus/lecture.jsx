import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import temp_part1 from "./temp/part1.png";
import temp_part2 from "./temp/part2.png";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SketchingRootLocusLecture = () => {
    return (
        <PinchPanCard title="مکان هندسی فاز ثابت" border={true}>
            <Typography>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={temp_part1}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={temp_part2}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
            </Typography>
        </PinchPanCard>
    );
};

export default SketchingRootLocusLecture;
