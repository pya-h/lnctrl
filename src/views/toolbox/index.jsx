import { useState } from "react";
// project imports
import { Box, Tabs, Tab, Typography } from "@mui/material";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";
import BlockDiagramFlow from "views/diagrams/flow/BlockDiagramFlow";

const ToolBox = () => {
    const [tab, setTab] = useState(0);

    return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Tabs
                orientation="vertical"
                value={tab}
                onChange={(e, v) => setTab(v)}
                sx={{
                    flexShrink: 0,
                    minWidth: 180,
                    borderRight: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": { alignItems: "flex-start", textAlign: "left" },
                }}
            >
                <Tab label="Block Diagram" />
                <Tab label="Signal Flow Graph" />
            </Tabs>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* both stay mounted so switching sections keeps each design intact */}
                <Box sx={{ display: tab === 0 ? "block" : "none" }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        Block Diagram Designer
                    </Typography>
                    <BlockDiagramFlow />
                </Box>
                <Box sx={{ display: tab === 1 ? "block" : "none" }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        Signal Flow Graph Designer
                    </Typography>
                    <SignalFlowGraphDesigner />
                </Box>
            </Box>
        </Box>
    );
};

export default ToolBox;
