import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

const NicolesChartLecture = () => {
    return (
        <SubCard
            title="Nichols Magnitude and Phase Chart"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    The combination of the Bode magnitude and phase plots on a single plane, with the ω axis removed, is called the magnitude-phase plot.
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default NicolesChartLecture;
