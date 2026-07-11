import { Grid } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";

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
    isAutoPlaying,
    setAutoPlaying,
}) => {
    // the tank's physical parameters all animate nicely; ti/tf/N only frame the graph
    const autoPlayParams = [
        { key: "R", label: "R", value: R, setValue: setR },
        { key: "C", label: "C", value: C, setValue: setC },
        { key: "Qin", label: "Q_{in}", value: Qin, setValue: setQin },
        { key: "hi", label: "h_i", value: hi, setValue: setHi },
    ];

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
                    parameters={[R, C, Qin, hi, ti, tf, N]}
                    setters={[setR, setC, setQin, setHi, setTi, setTf, $N]}
                    labels={parameterFormulas}
                    units={parameterUnits}
                    disabled={isAutoPlaying}
                />
            </Grid>
        </SubCard>
    );
};

export default WaterTankParameters;
