import { Grid, Button, Typography } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from '../../../../store/constant';

const parameterFormulas = [
    "$$a = $$",
    "$$k = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [null, null, "$$sec$$", "$$sec$$", null];

const FOTFParameters = ({
    k,
    a,
    $k,
    $a,
    t_i,
    t_f,
    $t_i,
    $t_f,
    inputSignal,
    $inputSignal,
    N,
    $N
}) => {
    const grids = 10;
    const selectRealPart = (point) => {
        if (point) $a(-point.x);
    };

    return (
        <SubCard
            darkBorder
            title="پارامترها"
            sx={{
                direction: "ltr",
                textAlign: "right",
                height: "100%",
            }}
        >
            <Grid xs={12} container>
                <Grid xs={6} sx={{ pr: 1, pb: 1 }} item>
                    <Button
                        onClick={() => $inputSignal(0)}
                        style={{ width: "100%", textTransform: "none" }}
                        variant={inputSignal === 0 ? "contained" : "outlined"}
                    >
                        پله
                    </Button>
                </Grid>
                <Grid sx={{ pb: 1 }} xs={6} item>
                    <Button
                        onClick={() => $inputSignal(1)}
                        style={{ width: "100%", textTransform: "none" }}
                        variant={inputSignal === 1 ? "contained" : "outlined"}
                    >
                        رمپ
                    </Button>
                </Grid>
            </Grid>
            <Grid spacing={gridSpacing} container direction="row">
            
                <SimpleParametersList parameters={[a, k, t_i, t_f, N]} setters={[$a, $k, $t_i, $t_f, $N]} labels={parameterFormulas} units={parameterUnits} />
                
                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <Typography style={{textAlign: 'center'}}>محل قطب را انتخاب کنید</Typography>
                    <CoordinateSystem
                        point={{ x: -a, y: 0, select: selectRealPart }}
                        options={{ pointSize: 10, grids }}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default FOTFParameters;
