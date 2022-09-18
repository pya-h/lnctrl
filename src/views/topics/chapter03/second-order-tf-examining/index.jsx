import { Grid } from "@mui/material";
// project imports
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import Switcher from "views/ui-component/buttons/Switcher";
import { useState } from "react";
import SOTFExamineByParams from "./by-params/index";
import SOTFExamineByPoles from "./by-poles/index";
import "views/topics/topics.css";

const SecondOrderTransferFunctionExamining = () => {
    const [mode, setMode] = useState(0);
    const choices = ["بررسی قطبی", "بررسی پارامتری"];

    return (
        <Grid container>
            <Grid
                direction="row"
                sx={{ pt: 1, pr: 5}}
                item
                xs={12}
                spacing={gridSpacing}
            >
                <Switcher choices={choices} setSwitch={setMode} />
            </Grid>
            <Grid item>
                <MainCard style={{ background: "#F5E1FD" }}>
                    <Grid item spacing={gridSpacing}>
                        {mode === 0 ? (
                            <SOTFExamineByPoles />
                        ) : (
                            <SOTFExamineByParams />
                        )}
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default SecondOrderTransferFunctionExamining;
