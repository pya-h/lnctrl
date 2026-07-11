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
    $poles,
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

    // the gain k sweeps on its own; the poles are a conjugate pair, so their real
    // and imaginary parts can be swept too by moving both symmetrically. The part
    // that isn't swept keeps its current value (captured here at play time).
    const re0 = alpha.real();
    const im0 = alpha.imaginary();
    const autoPlayParams = [
        { key: "k", label: "k", value: k, setValue: $k },
        {
            key: "re",
            label: "\\mathrm{Re}\\{p\\}",
            value: re0,
            setValue: (v) => $poles(new Complex(v, im0), new Complex(v, -im0)),
        },
        {
            key: "im",
            label: "\\mathrm{Im}\\{p\\}",
            value: im0,
            setValue: (v) => $poles(new Complex(re0, v), new Complex(re0, -v)),
        },
    ];

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
