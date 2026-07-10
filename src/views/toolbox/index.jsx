// project imports
import { Grid, Typography } from "@mui/material";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";
import BlockDiagramFlow from "views/diagrams/flow/BlockDiagramFlow";

const ToolBox = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12} item>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Block Diagram Designer
                </Typography>
                <BlockDiagramFlow />
            </Grid>
            <Grid xs={12} item>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Signal Flow Graph Designer
                </Typography>
                <SignalFlowGraphDesigner />
            </Grid>
        </Grid>
    );
};

export default ToolBox;
