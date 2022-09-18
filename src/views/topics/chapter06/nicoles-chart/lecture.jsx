import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const NicolesChartLecture = () => {
    return (
        <PinchPanCard title="Nichols Magnitude and Phase Chart">
            <Grid item>
                <Typography
                    sx={{ p: 2, width: "100%" }}
                    style={{ lineHeight: "2.5" }}
                >
                    The combination of the Bode magnitude and phase plots on a single plane, with the ω axis removed, is called the magnitude-phase plot.
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default NicolesChartLecture;
