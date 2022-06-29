// project imports
import SubCard from "views/ui-component/cards/SubCard";
import BlockDiagramDesginer from "views/diagrams/BlockDiagramDesigner";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import { Grid } from "@mui/material";
import SignalFlowGraphDesigner from "views/diagrams/SignalFlowGraphDesigner";

const ToolBox = () => {
    return (
        <Grid container>
            <Grid xs={12} item>
                <SignalFlowGraphDesigner />
            </Grid>
            <hr />
            <Grid xs={12} item>
                <SubCard background="rgba(255, 255, 255, 1.0)">
                    <BlockDiagramDesginer showProperties />
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ToolBox;
