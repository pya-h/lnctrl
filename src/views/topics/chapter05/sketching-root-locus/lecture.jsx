import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import temp_part1 from "./temp/part1.png";
import temp_part2 from "./temp/part2.png";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const SketchingRootLocusLecture = () => {
    return (
        <PinchPanCard title="Constant-phase locus (N-circle)" border={true}>
            <Typography>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={temp_part1}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid item>
                    <img
                        className="lecture-image"
                        src={temp_part2}
                        alt="Image loading failed"
                    />
                </Grid>
            </Typography>
        </PinchPanCard>
    );
};

export default SketchingRootLocusLecture;
