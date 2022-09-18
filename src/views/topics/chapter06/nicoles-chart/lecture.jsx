import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const NicolesChartLecture = () => {
    return (
        <PinchPanCard title="نمودار اندازه و فاز نیکولز">
            <Grid item>
                <Typography
                    sx={{ p: 2, width: "100%" }}
                    style={{ lineHeight: "2.5" }}
                >
                    ترکیب نمودار اندازه و فاز بود با حذف محور ω در یک صفحه را
                    نمودار اندازه و فاز می گویند.
                </Typography>
            </Grid>
        </PinchPanCard>
    );
};

export default NicolesChartLecture;
