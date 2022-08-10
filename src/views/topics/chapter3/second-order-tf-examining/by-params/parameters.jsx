import { Grid } from "@mui/material";
import CoordinateSystem from "input-boxes/CoordinateSystem";
import SubCard from "ui-component/cards/SubCard";
import SimpleParametersList from "input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$\\omega_{n} = $$",
    "$$\\zeta = $$",
    "$$t_i = $$",
    "$$t_f = $$",
];
const parameterUnits = [null, null, null, "$$sec$$", "$$sec$$"];

const SOTFByParamsInputs = ({
    w_n,
    zeta,
    $w_n,
    $zeta,
    t_i,
    t_f,
    $t_i,
    $t_f,
}) => {
    const grids = 10;
    const checkSetW_N = (value) => value && $w_n(value);
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
                    parameters={[w_n, zeta, t_i, t_f]}
                    setters={[
                        checkSetW_N,
                        $zeta,
                        $t_i,
                        $t_f,
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{ textAlign: "center" }}>
                        محل قطب ها را انتخاب کنید
                    </p>

                    <CoordinateSystem
                        point={{
                            x: w_n,
                            y: 0,
                            select: ({x}) => {
                                if(x) $w_n(x)
                            }
                        }}
                        extra={{
                            x: 0,
                            y: zeta,
                            select: ({y}) => {
                                if(y) $zeta(y)
                            }
                        }}
                        options={{ pointSize: 10, grids }}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SOTFByParamsInputs;
