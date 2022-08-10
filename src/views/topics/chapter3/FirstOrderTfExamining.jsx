import "../topics.css";
import { Grid } from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import FirstOrderTfExample from './first-order-tf-example';

const FirstOrderTfExamining = () => {

    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">توابع تبدیل مرتبه یک</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <FirstOrderTfExample />
            </Grid>
        </MainCard>
    );
};

export default FirstOrderTfExamining;
