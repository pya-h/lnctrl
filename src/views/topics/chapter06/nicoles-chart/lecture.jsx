import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import "views/topics/topics.css";

const NicolesChartLecture = () => {
    return (
        <SubCard
            title="نموداز اندازه و فاز نیکولز"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    &nbsp; ترکیب نمودار اندازه و فاز بود با حذف محور ω در یک
                    صفحه را نمودار اندازه و فاز می گویند.
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default NicolesChartLecture;
