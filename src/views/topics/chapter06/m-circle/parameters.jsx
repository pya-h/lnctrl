import { Grid } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import SimpleParametersList from "views/input-boxes/SimpleParametersList";
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
}) => (
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
            <SimpleParametersList
                parameters={[M, x_i, x_f, iterations]}
                setters={[$M, $x_i, $x_f, $iterations]}
                labels={parameterFormulas}
                units={[null, null, null, null]}
            />
        </Grid>
    </SubCard>
);

export default MNCircleParameters;
