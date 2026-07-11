import { Grid } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
import AutoPlayControl from "views/input-boxes/AutoPlayControl";
import { gridSpacing } from "store/constant";

const parameterFormulas = [
    "$$M = $$",
    "$$x_{min} = $$",
    "$$x_{max} = $$",
    "$$N_{iterations} = $$",
];

const MNCircleParameters = ({
    M,
    $M,
    x_i,
    x_f,
    $x_i,
    $x_f,
    iterations,
    $iterations,
    isAutoPlaying,
    setAutoPlaying,
}) => (
    <SubCard
        darkBorder
        title="Parameters"
        secondary={
            <AutoPlayControl
                params={[{ key: "M", label: "M", value: M, setValue: $M }]}
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
        <Grid spacing={gridSpacing} container direction="row">
            <SimpleParametersList
                parameters={[M, x_i, x_f, iterations]}
                setters={[$M, $x_i, $x_f, $iterations]}
                labels={parameterFormulas}
                units={[null, null, null, null]}
                disabled={isAutoPlaying}
            />
        </Grid>
    </SubCard>
);

export default MNCircleParameters;
