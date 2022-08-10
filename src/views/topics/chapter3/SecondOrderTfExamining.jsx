import "../topics.css";
import { Grid } from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import SecondOrderTfExample from './second-order-tf-example';

const SecondOrderTfExamining = () => {

    return (
        <MainCard>
            <Grid item spacing={gridSpacing}>
                <h2 className="chapter-section-title">توابع تبدیل مرتبه دو</h2>
            </Grid>
            <Grid item spacing={gridSpacing}>
                <SecondOrderTfExample />
            </Grid>
        </MainCard>
    );
};

export default SecondOrderTfExamining;
