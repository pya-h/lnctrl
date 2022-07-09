import SubCard from "../../../ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import "views/topics/topics.css";

const NCircleLecture = () => {
    return (
        <SubCard
            title="مکان هندسی فاز ثابت"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            
            <Grid className="lecture-text" item>
                <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>
                    &nbsp;پاسخ فرکانسی فیلتر RC
                </h1>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; مدار این فیلتر به شکل زیر می باشد:
                </p>
            </Grid>

            <Grid className="lecture-text" item>
                <p>
                    &nbsp; &nbsp; &nbsp; &nbsp; و تابع تبدیل آن به فرم زیر می
                    باشد:
                </p>
            </Grid>

        </SubCard>
    );
};

export default NCircleLecture;
