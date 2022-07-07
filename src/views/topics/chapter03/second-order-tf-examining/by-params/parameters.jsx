import { Grid } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$\\omega_{n} = $$",
    "$$\\zeta = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [null, null, "$$sec$$", "$$sec$$", null];

const SOTFByParamsInputs = ({
    w_n,
    zeta,
    $w_n,
    $zeta,
    t_i,
    t_f,
    $t_i,
    $t_f,
    N,
    $N
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
                    parameters={[w_n, zeta, t_i, t_f, N]}
                    setters={[
                        checkSetW_N,
                        $zeta,
                        $t_i,
                        $t_f,
                        $N
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <p style={{ textAlign: "center" }}>
                        مقدار پارامترها را از اینجا هم می توانید تغییر دهید
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
