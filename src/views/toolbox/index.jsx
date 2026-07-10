// project imports
import SubCard from "views/ui-component/cards/SubCard";
import BlockDiagramDesginer from "views/diagrams/BlockDiagramDesigner";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import { Grid, Typography } from "@mui/material";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";
import BlockDiagramFlow from "views/diagrams/flow/BlockDiagramFlow";

const ToolBox = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12} item>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Block Diagram — React Flow prototype (spike)
                </Typography>
                <BlockDiagramFlow />
            </Grid>
            <Grid xs={12} item>
                <hr />
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Signal Flow Graph — GoJS (current)
                </Typography>
                <SignalFlowGraphDesigner />
            </Grid>
            <Grid xs={12} item>
                <hr />
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Block Diagram — bpmn-js (current)
                </Typography>
                <SubCard background="rgba(255, 255, 255, 1.0)">
                    <BlockDiagramDesginer showProperties />
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ToolBox;
