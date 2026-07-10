// project imports
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { routes } from "config";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";
import BlockDiagramFlow from "views/diagrams/flow/BlockDiagramFlow";

const ToolBox = () => {
    const { tool } = useParams();
    const sfg = tool === routes.signal_flow_graph_tool;

    // both stay mounted so switching designers from the sidebar keeps each design intact
    return (
        <>
            <Box sx={{ display: sfg ? "none" : "block" }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Block Diagram Designer
                </Typography>
                <BlockDiagramFlow />
            </Box>
            <Box sx={{ display: sfg ? "block" : "none" }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Signal Flow Graph Designer
                </Typography>
                <SignalFlowGraphDesigner />
            </Box>
        </>
    );
};

export default ToolBox;
