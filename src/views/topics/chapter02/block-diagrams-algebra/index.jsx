import { Grid, IconButton } from "@mui/material";
import BlockDiagramDesigner from "views/diagrams/BlockDiagramDesigner";
import SubCard from "views/ui-component/cards/SubCard";
import example_diagram from "./visual/diagram.bpmn.xml";
import diagram_formulas from "./visual/diagram.formulas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {useState } from "react";
import { MathJax } from "better-react-mathjax";

const BlockDiagramsAlgebraExample = () => {
    const [step, $step] = useState(0);

    const next = () => {
        $step((step + 1) % example_diagram.length);
    };
    const previous = () => {
        $step((step - 1) % example_diagram.length);
    };
    return (
        <Grid direction="column" container>
            <Grid item>
                <SubCard background="#EAFAEFAA">
                    <Grid
                        sx={{ textAlign: "center" }}
                        container
                        direction="row"
                    >
                        <Grid xs={12} item>
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
                            <IconButton
                                color="secondary"
                                aria-label="download diagram"
                                component="span"
                                onClick={null}
                            >
                                <SaveAltIcon />
                            </IconButton>
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
                <BlockDiagramDesigner diagram={example_diagram[step]} />
            </Grid>
        </Grid>
    );
};

export default BlockDiagramsAlgebraExample;
