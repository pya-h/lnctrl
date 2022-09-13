import React from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import "./diagrams.css"; // contains .diagram-component CSS
import SubCard from "views/ui-component/cards/SubCard";
import sfg_sample from "./assets/sample.gojs";
// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
        "undoManager.isEnabled": true, // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        "clickCreatingTool.archetypeNodeData": {
            text: "new node",
            color: "lightblue",
        },
        model: new go.GraphLinksModel({
            linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }),
    });

    // define a simple Node template
    diagram.nodeTemplate = $(
        go.Node,
        "Vertical",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
        ),

        $(
            go.TextBlock,
            { editable: true }, // some room around the text
            new go.Binding("text").makeTwoWay()
        ),
        $(
            go.Panel,
            "Auto",
            $(
                go.Shape,
                "Circle",
                {
                    name: "SHAPE",
                    width: 16,
                    height: 16,
                },
                new go.Binding("fill", "color")
            ),
            $(go.Shape, "Circle", { width: 6, height: 6, strokeWidth: 0 })
        )
    );
    // remember for curved links: {curve: go.Link.Bezier}
    diagram.linkTemplate = $(
        go.Link,
        new go.Binding("curve", "curve"),
        $(go.Shape),
        $(go.Shape, {
            toArrow: "Standard",
            segmentFraction: 0.66,
        }),
        $(go.TextBlock, new go.Binding("text", "text"), {
            background: "white",
            segmentFraction: 0.33,
            margin: 7
        })
        // $(go.TextBlock, new go.Binding("text2", "text2"), {
        //     segmentOffset: new go.Point(0, 20),
        // })
    );
    return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
    // alert("GoJS model changed!");
}

// render function...
const SignalFlowGraphDesigner = ({ sfg = sfg_sample }) => {
    return (
        <SubCard>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName="diagram-component"
                nodeDataArray={sfg.nodes}
                linkDataArray={sfg.links}
                onModelChange={handleModelChange}
            />
        </SubCard>
    );
};

export default SignalFlowGraphDesigner;
