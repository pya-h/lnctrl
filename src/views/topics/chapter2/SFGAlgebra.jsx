import "views/topics/topics.css";

import { Grid } from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import SFGAlgebraExample from "./sfg-algebra";

const SFGAlgebra = () => {

    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">عملیات جبری دیاگرام بلوکی</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <SFGAlgebraExample />
            </Grid>
        </MainCard>
    );
};

export default SFGAlgebra;
