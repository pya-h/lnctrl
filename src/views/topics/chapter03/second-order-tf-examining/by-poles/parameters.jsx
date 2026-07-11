import { Grid, Typography } from "@mui/material";
import CoordinateSystem from "views/input-boxes/CoordinateSystem";
import SubCard from "views/ui-component/cards/SubCard";
import Complex from "math/algebra/complex";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";

const parameterFormulas = [
    "$$\\alpha = $$",
    "$$\\beta = $$",
    "$$k = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$"
];
const parameterUnits = [null, null, null, "$$sec$$", "$$sec$$", null];

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
    N,
    $N,
    isAutoPlaying,
    setAutoPlaying,
}) => {
    const grids = 10;

    // the poles are complex and set on the plane; only the gain k is a plain
    // number that makes sense to sweep automatically
    const autoPlayParams = [{ key: "k", label: "k", value: k, setValue: $k }];

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
            title="Parameters"
            secondary={
                <AutoPlayControl
                    params={autoPlayParams}
                    running={isAutoPlaying}
                    onRunningChange={setAutoPlaying}
                />
            }
            sx={{
                direction: "ltr",
                textAlign: "left",
                height: "100%",
            }}
        >
            <Grid spacing={0.6} container direction="row">
                <SimpleParametersList
                    parameters={[alpha, beta, k, t_i, t_f, N]}
                    setters={[
                        alphaTextBoxOnChange,
                        betaTextBoxOnChange,
                        $k,
                        $t_i,
                        $t_f,
                        $N
                    ]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />

                <Grid sx={{ mt: 1 }} md={12} sm={4} xs={6} item>
                    <Typography style={{ textAlign: "center" }}>
                        Select the location of the poles
                    </Typography>

                    {/* keep the poles animating during autoplay, but block dragging them */}
                    <div style={isAutoPlaying ? { pointerEvents: "none", opacity: 0.6 } : undefined}>
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
                    </div>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SOTFByPolesInputs;
