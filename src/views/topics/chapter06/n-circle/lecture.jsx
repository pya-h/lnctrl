import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

const NCircleLecture = () => {
    return (
        <SubCard
            title="Constant-phase locus (N-circle)"
            darkBorder={true}
            sx={{ direction: "ltr" }}
        >
            
            <Grid className="lecture-text" item>
                <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                    Frequency Response of the RC Filter
                </h1>
                <p>
                    The circuit of this filter is as follows:
                </p>
            </Grid>

            <Grid className="lecture-text" item>
                <p>
                    And its transfer function is of the following form:
                </p>
            </Grid>

        </SubCard>
    );
};

export default NCircleLecture;
