import { Grid } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$M_{p} = $$",
    "$$t_{rise} = $$",
    "$$t_i = $$",
    "$$t_f = $$",
];
const parameterUnits = ["%", "$$sec$$", "$$sec$$", "$$sec$$"];

const DesignSystemByCharsParameters = ({
    M_p,
    t_rise,
    $M_p,
    $t_rise,
    t_i,
    t_f,
    $t_i,
    $t_f,
}) => {
    const grids = 1;
    const checkRiseTime = (value) => value >= 0 && $t_rise(value);
    const checkOvershoot = (value) => value >= 0 && $M_p(value);
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
            <Grid spacing={0.6} container direction="row">
                <SimpleParametersList
                    parameters={[ M_p, t_rise, t_i, t_f]}
                    setters={[ checkOvershoot, checkRiseTime, $t_i, $t_f]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{ textAlign: "center" }}>
                    مقدار پارامترها را از اینجا هم می توانید تغییر دهید
                    </p>

                    <CoordinateSystem
                        point={{
                            y: M_p,
                            x: 0,
                            select: ({ y }) => {
                                if (y && y >= 0) $M_p(y);
                            },
                        }}
                        extra={{
                            y: 0,
                            x: t_rise,
                            select: ({ x }) => {
                                if (x && x >= 0) $t_rise(x);
                            },
                        }}
                        options={{ pointSize: 10, grids}}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default DesignSystemByCharsParameters;
