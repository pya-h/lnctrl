import "views/topics/topics.css";
import { Grid, Typography } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import BlockDiagramsAlgebraExample from "./block-diagrams-algebra";

const BlockDiagramsAlgebra = () => {
    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <Typography>
                    <h2 className="chapter-section-title">
                        عملیات جبری دیاگرام بلوکی
                    </h2>
                </Typography>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <BlockDiagramsAlgebraExample />
            </Grid>
        </MainCard>
    );
};

export default BlockDiagramsAlgebra;
