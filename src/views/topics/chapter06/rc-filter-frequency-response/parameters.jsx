import { Grid, Button } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import { gridSpacing } from 'store/constant';

const parameterFormulas = [
    "$$R = $$",
    "$$C = $$",
    "$$\\omega_{min} = $$",
    "$$\\omega_{max} = $$",
    "$$N = $$"
];
const parameterUnits = ["$$k\\Omega$$", "$$\\mu F$$", "$$Hz$$", "$$Hz$$", null];

const RCFilterFrequencyResponseParameters = ({
    R,
    C,
    $R,
    $C,
    w_min,
    w_max,
    $w_min,
    $w_max,
    phaseInRadianScale,
    setPhaseInRadianScale,
    N,
    $N
}) => {
    // const grids = 10;
    // const selectR = (point) => {
    //     if (point) $R(point.x);
    // };
    // const selectC = (point) => {
    //     if (point) $C(point.y);
    // };

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
            <Grid spacing={gridSpacing} container direction="row">
            
                <SimpleParametersList parameters={[R, C, w_min, w_max, N]} setters={[$R, $C, $w_min, $w_max, $N]} labels={parameterFormulas} units={parameterUnits} />
                <Grid xs={12} style={{paddingLeft: '3%'}} container>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale(false)}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={!phaseInRadianScale ? "contained" : "outlined"}
                        >
                            درجه
                        </Button>
                    </Grid>
                    <Grid xs={6} sx={{ p: 1 }} item>
                        <Button
                            onClick={() => setPhaseInRadianScale("rad")}
                            style={{ width: "100%", textTransform: "none" }}
                            variant={phaseInRadianScale ? "contained" : "outlined"}
                        >
                            رادیان
                        </Button>
                    </Grid>
                </Grid>
                {/* <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{textAlign: 'center'}}>محل قطب را انتخاب کنید</p>
                    <CoordinateSystem
                        point={{ x: R, y: 0, select: selectR }}
                        extra={{
                            x: 0,
                            y: C,
                            select: selectC,
                        }}
                        options={{ pointSize: 10, grids }}
                    />
                </Grid> */}
            </Grid>
        </SubCard>
    );
};

export default RCFilterFrequencyResponseParameters;