import { Grid } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import Complex from "math/algebra/complex";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$\\alpha = $$",
    "$$\\beta = $$",
    "$$k = $$",
    "$$t_i = $$",
    "$$t_f = $$",
];
const parameterUnits = [null, null, null, "$$sec$$", "$$sec$$"];

const SOTFByPolesInputs = ({
    k,
    alpha,
    beta,
    $k,
    $alpha,
    $beta,
    t_i,
    t_f,
    $t_i,
    $t_f,
}) => {
    const grids = 10;

    const updatePoles = (newPole, other, $newPole, $other) => {
        $newPole(newPole);
        return newPole.isReal()
            ? $other(other.realify())
            : $other(newPole.conjugate());
    };

    const selectAlpha = (point) => {
        if (point) {
            const { x, y } = point;
            updatePoles(new Complex(-x, -y), beta, $alpha, $beta);
        }
    };
    const selectBeta = (point) => {
        if (point) {
            const { x, y } = point;
            updatePoles(new Complex(-x, -y), alpha, $beta, $alpha);
        }
    };

    const alphaTextBoxOnChange = (strValue) =>
        updatePoles(Complex.extract(strValue), beta, $alpha, $beta);

    const betaTextBoxOnChange = (strValue) =>
        updatePoles(Complex.extract(strValue), alpha, $beta, $alpha);

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
                    parameters={[alpha, beta, k, t_i, t_f]}
                    setters={[
                        alphaTextBoxOnChange,
                        betaTextBoxOnChange,
                        $k,
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
                            x: -alpha.real(),
                            y: -alpha.imaginary(),
                            select: selectAlpha,
                        }}
                        extra={{
                            x: -beta.real(),
                            y: -beta.imaginary(),
                            select: selectBeta,
                        }}
                        options={{ pointSize: 10, grids }}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SOTFByPolesInputs;
