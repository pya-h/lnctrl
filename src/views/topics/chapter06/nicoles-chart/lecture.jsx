import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

const NicolesChartLecture = () => {
    return (
        <SubCard
            title="Nichols Magnitude and Phase Chart"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            <Grid className="lecture-text" item>
                <p>
                    The combination of the Bode magnitude and phase plots on a single plane, with the ω axis removed, is called the magnitude-phase plot.
                </p>
            </Grid>
        </SubCard>
    );
};

export default NicolesChartLecture;
