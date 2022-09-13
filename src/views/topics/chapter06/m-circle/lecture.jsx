import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import temp_part1 from "./temp/part1.png";
import temp_part2 from "./temp/part2.png";

const MCircleLecture = () => {
    return (
        <SubCard
            title="Constant-phase locus (N-circle)"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
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
        </SubCard>
    );
};

export default MCircleLecture;
