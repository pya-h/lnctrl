import { Grid, IconButton } from "@mui/material";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";
import SubCard from "views/ui-component/cards/SubCard";
import sfg_example from "./visual/sfg.gojs";
import sfg_formulas from "./visual/sfg.formulas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useState } from "react";
import { MathJax } from "better-react-mathjax";

const BlockDiagramsAlgebraExample = () => {
    const [step, $step] = useState(0);

    const next = () => {
        $step((step + 1) % sfg_example.length);
    };
    const previous = () => {
        $step((step - 1) % sfg_example.length);
    };
    return (
        <Grid direction="column" container>
             <Grid item>
                <SignalFlowGraphDesigner sfg={sfg_example[step]} />
            </Grid>
            <hr />
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
                                disabled={step + 1 >= sfg_example.length}
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
                            <MathJax>{sfg_formulas[step]}</MathJax>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            
        </Grid>
    );
};

export default BlockDiagramsAlgebraExample;
