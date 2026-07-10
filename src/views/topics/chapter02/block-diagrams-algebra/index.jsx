import { Grid, IconButton } from "@mui/material";
import BlockDiagramFlow from "views/diagrams/flow/BlockDiagramFlow";
import SubCard from "views/ui-component/cards/SubCard";
import example_diagram from "./visual/diagram.flow";
import diagram_formulas from "./visual/diagram.formulas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { MathJax } from "better-react-mathjax";

const BlockDiagramsAlgebraExample = () => {
    const theme = useTheme();
    const [step, $step] = useState(0);

    const next = () => {
        if (step + 1 < example_diagram.length) $step(step + 1);
    };
    const previous = () => {
        if (step > 0) $step(step - 1);
    };
    return (
        <Grid direction="column" container>
            <Grid item>
                <SubCard background={theme.palette.mode === "dark" ? undefined : "#EAFAEFAA"}>
                    <Grid
                        sx={{ textAlign: "center" }}
                        container
                        direction="row"
                    >
                        <Grid xs={12} item>
                            <IconButton
                                color="secondary"
                                sx={{ mx: 5 }}
                                aria-label="previous"
                                component="span"
                                onClick={previous}
                                disabled={step <= 0}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                sx={{ mx: 5 }}
                                aria-label="next"
                                component="span"
                                onClick={next}
                                disabled={step + 1 >= example_diagram.length}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Grid>
                        <hr />
                        <Grid xs={12} item>
                            <MathJax>{diagram_formulas[step]}</MathJax>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <hr />
            <Grid item>
                <BlockDiagramFlow diagram={example_diagram[step]} editable={false} />
            </Grid>
        </Grid>
    );
};

export default BlockDiagramsAlgebraExample;
