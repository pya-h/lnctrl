import "views/topics/topics.css";
import { Grid } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import WaterTankLevelExample from "./water-tank";

const HydraulicSystemsModeling = () => {

    return (
        <MainCard style={{background: 'transparent'}}>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">مدل سازی سیستم های هیدرولیکی</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <WaterTankLevelExample />
            </Grid>
        </MainCard>
    );
};

export default HydraulicSystemsModeling;
