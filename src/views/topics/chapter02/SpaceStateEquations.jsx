import "views/topics/topics.css";

import { Grid } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import SpaceStateExample from './space-state/index';

const SpaceStateEquations = () => {

    return (
        <MainCard style={{background: 'transparent'}}>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">معادلات فضای حالت</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <SpaceStateExample />
            </Grid>
        </MainCard>
    );
};

export default SpaceStateEquations;
