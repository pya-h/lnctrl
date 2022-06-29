import "views/topics/topics.css";
import { Grid } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import BlockDiagramsAlgebraExample from "./block-diagrams-algebra";

const BlockDiagramsAlgebra = () => {

    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">عملیات جبری دیاگرام بلوکی</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <BlockDiagramsAlgebraExample />
            </Grid>
        </MainCard>
    );
};

export default BlockDiagramsAlgebra;
