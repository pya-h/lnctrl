import { Grid } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";

const parameterFormulas = [
    "$$R = $$",
    "$$C = $$",
    "$$Q_{in} = $$",
    "$$h_i = $$",
    "$$t_i = $$",
    "$$t_f = $$",
    "$$N = $$",
];
const parameterUnits = [
    "$$\\frac{s}{m^2}$$",
    "$$m^2$$",
    "$$\\frac{m^3}{s}$$",
    "$$m$$",
    "$$sec$$",
    "$$sec$$",
    null,
];

const WaterTankParameters = ({
    R,
    C,
    Qin,
    hi,
    ti,
    tf,
    setR,
    setC,
    setQin,
    setHi,
    setTi,
    setTf,
    N,
    $N,
}) => {
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
                    parameters={[R, C, Qin, hi, ti, tf, N]}
                    setters={[setR, setC, setQin, setHi, setTi, setTf, $N]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                />
            </Grid>
        </SubCard>
    );
};

export default WaterTankParameters;
