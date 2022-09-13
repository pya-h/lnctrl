import "views/topics/topics.css";

import { Grid, Typography } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import MassSpringDamperExample from "./mass-spring-damper/index";

const MechanicSystemsModeling = () => {
    return (
        <MainCard style={{ background: "transparent" }}>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        مدل سازی سیستم های مکانیکی
                    </h2>
                </Typography>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <MassSpringDamperExample />
            </Grid>
        </MainCard>
    );
};

export default MechanicSystemsModeling;
