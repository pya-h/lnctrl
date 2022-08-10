import { Grid, TextField, InputAdornment, Button } from "@mui/material";
import CoordinateSystem from "input-boxes/CoordinateSystem";
import SubCard from "ui-component/cards/SubCard";
import SimpleParametersList from "input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$a = $$",
    "$$k = $$",
    "$$t_i = $$",
    "$$t_f = $$",
];
const parameterUnits = [null, null, "$$sec$$", "$$sec$$"];

const FirstOrderTfParameters = ({
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
            <Grid spacing={0.6} container direction="row">
            
                <SimpleParametersList parameters={[a, k, t_i, t_f]} setters={[$a, $k, $t_i, $t_f]} labels={parameterFormulas} units={parameterUnits} />
                
                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{textAlign: 'center'}}>محل قطب را انتخاب کنید</p>
                    <CoordinateSystem
                        point={{ x: -a, y: 0, select: selectRealPart }}
                        options={{ pointSize: 10, grids }}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default FirstOrderTfParameters;
