import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import block_diagram_sample from "./assets/sample.bpmn";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import SubCard from "ui-component/cards/SubCard";

class BlockDiagramDesigner extends Component {
    state = { modeler: null };

    initialize = () => {
        this.setState({
            modeler: new BpmnModeler({
                container: "#bpmnview",
                keyboard: {
                    bindTo: window,
                },
                propertiesPanel: {
                    parent: "#propview",
                },
                additionalModules: this.props.showProperties
                    ? [propertiesPanelModule, propertiesProviderModule]
                    : null,
                moddleExtensions: {
                    camunda: camundaModdleDescriptor,
                },
            }),
        });

        // after the state is updated => componentDidUpdate willl run and load the diagram xml into the modeler
    };

    updateDiagram = () => {
        const xmlDiagram = this.props.diagram || block_diagram_sample;
        const { modeler } = this.state;

        modeler.importXML(xmlDiagram, (error) => {
            if (error) {
                return console.log("fail import xml");
            }

            const canvas = modeler.get("canvas");
            canvas.zoom("fit-viewport");
        });
    };

    componentDidMount = () => this.initialize();

    componentDidUpdate = () => {
        if (this.state.modeler) this.updateDiagram();
        else this.initialize();
    };

    render = () => (
        <SubCard>
            <div id="bpmncontainer">
                <div
                    id="bpmnview"
                    style={{ width: "100%", height: "80vh", float: "left" }}
                ></div>
                {this.props.showProperties && (
                    <div
                        id="propview"
                        style={{
                            width: "100%",
                            height: "50vh",
                            overflowX: "auto",
                        }}
                    >
                        <hr />
                    </div>
                )}
            </div>
        </SubCard>
    );
}

export default BlockDiagramDesigner;
