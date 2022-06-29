
const stepByStepDiagram = [
    // ******** STEP 0 ********
    `<?xml version="1.0" encoding="UTF-8"?>
import { sample_diagram } from '../../../../../diagrams/bpmnassets/sample.bpmn';
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
  <process id="Process_1" isExecutable="false">
    <task id="Activity_04vwlks" name="G1(s)">
      <incoming>Flow_1adymej</incoming>
      <outgoing>Flow_1im3vqx</outgoing>
      <outgoing>Flow_030xgmh</outgoing>
    </task>
    <task id="Activity_1xug5vp" name="H1(s)">
      <incoming>Flow_1im3vqx</incoming>
      <outgoing>Flow_1wop0m5</outgoing>
    </task>
    <sequenceFlow id="Flow_1im3vqx" sourceRef="Activity_04vwlks" targetRef="Activity_1xug5vp" />
    <intermediateThrowEvent id="Event_0j3in9z" name="+">
      <incoming>Flow_030xgmh</incoming>
      <incoming>Flow_1wop0m5</incoming>
      <outgoing>Flow_1iqs8dj</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_030xgmh" sourceRef="Activity_04vwlks" targetRef="Event_0j3in9z" />
    <sequenceFlow id="Flow_1wop0m5" sourceRef="Activity_1xug5vp" targetRef="Event_0j3in9z" />
    <intermediateThrowEvent id="Event_1eoad32" name="+">
      <incoming>Flow_1iqs8dj</incoming>
      <incoming>Flow_0ye71qo</incoming>
      <outgoing>Flow_1h9aj60</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_1iqs8dj" sourceRef="Event_0j3in9z" targetRef="Event_1eoad32" />
    <task id="Activity_144gndd" name="G2(s)">
      <incoming>Flow_1h9aj60</incoming>
      <outgoing>Flow_0w6215x</outgoing>
      <outgoing>Flow_04hj0g3</outgoing>
    </task>
    <sequenceFlow id="Flow_1h9aj60" sourceRef="Event_1eoad32" targetRef="Activity_144gndd" />
    <task id="Activity_0ixl23n" name="H2(s)">
      <incoming>Flow_0w6215x</incoming>
      <outgoing>Flow_0ye71qo</outgoing>
    </task>
    <sequenceFlow id="Flow_0w6215x" sourceRef="Activity_144gndd" targetRef="Activity_0ixl23n" />
    <sequenceFlow id="Flow_0ye71qo" sourceRef="Activity_0ixl23n" targetRef="Event_1eoad32" />
    <intermediateThrowEvent id="Event_1uld84g" name="+">
      <outgoing>Flow_1adymej</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_1adymej" sourceRef="Event_1uld84g" targetRef="Activity_04vwlks" />
    <intermediateThrowEvent id="Event_0g3938j" name="+">
      <incoming>Flow_04hj0g3</incoming>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_04hj0g3" sourceRef="Activity_144gndd" targetRef="Event_0g3938j" />
    <textAnnotation id="TextAnnotation_0imvpse">
      <text>A</text>
    </textAnnotation>
    <textAnnotation id="TextAnnotation_17q29rr">
      <text>B</text>
    </textAnnotation>
    <association id="Association_11a0ogu" sourceRef="Event_1uld84g" targetRef="TextAnnotation_17q29rr" />
    <association id="Association_1tb7cz4" sourceRef="TextAnnotation_0imvpse" targetRef="Event_1uld84g" />
    <textAnnotation id="TextAnnotation_1f5vh40">
      <text>C</text>
    </textAnnotation>
    <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
    <textAnnotation id="TextAnnotation_1pc0zw5">
      <text>D</text>
    </textAnnotation>
    <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
    <group id="Group_0hoxlka" categoryValueRef="CategoryValue_06yqyfr" />
  </process>
  <category id="Category_11xee1s">
    <categoryValue id="CategoryValue_06yqyfr" />
  </category>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
        <omgdc:Bounds x="190" y="162" width="49.99637049941928" height="34.9883855981417" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
        <omgdc:Bounds x="290" y="295" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
        <omgdc:Bounds x="1400" y="165" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
        <omgdc:Bounds x="1295" y="270" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0ye71qo_di" bpmnElement="Flow_0ye71qo">
        <omgdi:waypoint x="950" y="290" />
        <omgdi:waypoint x="860" y="290" />
        <omgdi:waypoint x="860" y="198" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0w6215x_di" bpmnElement="Flow_0w6215x">
        <omgdi:waypoint x="1050" y="180" />
        <omgdi:waypoint x="1180" y="180" />
        <omgdi:waypoint x="1180" y="290" />
        <omgdi:waypoint x="1050" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1h9aj60_di" bpmnElement="Flow_1h9aj60">
        <omgdi:waypoint x="878" y="180" />
        <omgdi:waypoint x="950" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1iqs8dj_di" bpmnElement="Flow_1iqs8dj">
        <omgdi:waypoint x="778" y="180" />
        <omgdi:waypoint x="842" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wop0m5_di" bpmnElement="Flow_1wop0m5">
        <omgdi:waypoint x="680" y="310" />
        <omgdi:waypoint x="760" y="310" />
        <omgdi:waypoint x="760" y="198" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_030xgmh_di" bpmnElement="Flow_030xgmh">
        <omgdi:waypoint x="680" y="180" />
        <omgdi:waypoint x="742" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1im3vqx_di" bpmnElement="Flow_1im3vqx">
        <omgdi:waypoint x="580" y="180" />
        <omgdi:waypoint x="480" y="180" />
        <omgdi:waypoint x="480" y="310" />
        <omgdi:waypoint x="580" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1adymej_di" bpmnElement="Flow_1adymej">
        <omgdi:waypoint x="358" y="180" />
        <omgdi:waypoint x="580" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04hj0g3_di" bpmnElement="Flow_04hj0g3">
        <omgdi:waypoint x="1050" y="180" />
        <omgdi:waypoint x="1302" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
        <omgdc:Bounds x="580" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1xug5vp_di" bpmnElement="Activity_1xug5vp">
        <omgdc:Bounds x="580" y="270" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0j3in9z_di" bpmnElement="Event_0j3in9z">
        <omgdc:Bounds x="742" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="756" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1eoad32_di" bpmnElement="Event_1eoad32">
        <omgdc:Bounds x="842" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="856" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_144gndd_di" bpmnElement="Activity_144gndd">
        <omgdc:Bounds x="950" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ixl23n_di" bpmnElement="Activity_0ixl23n">
        <omgdc:Bounds x="950" y="250" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1uld84g_di" bpmnElement="Event_1uld84g">
        <omgdc:Bounds x="322" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="336" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
        <omgdc:Bounds x="1302" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="1316" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_1tb7cz4_di" bpmnElement="Association_1tb7cz4">
        <omgdi:waypoint x="240" y="180" />
        <omgdi:waypoint x="322" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_11a0ogu_di" bpmnElement="Association_11a0ogu">
        <omgdi:waypoint x="340" y="198" />
        <omgdi:waypoint x="340" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
        <omgdi:waypoint x="1338" y="180" />
        <omgdi:waypoint x="1400" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
        <omgdi:waypoint x="1320" y="198" />
        <omgdi:waypoint x="1320" y="250" />
        <omgdi:waypoint x="1320" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Group_0hoxlka_di" bpmnElement="Group_0hoxlka">
        <omgdc:Bounds x="460" y="80" width="330" height="300" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`,

    // ******** STEP 1 ********

    `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
  <process id="Process_1" isExecutable="false">
    <intermediateThrowEvent id="Event_1eoad32" name="+">
      <incoming>Flow_0ye71qo</incoming>
      <incoming>Flow_1ffs9ue</incoming>
      <outgoing>Flow_1h9aj60</outgoing>
    </intermediateThrowEvent>
    <task id="Activity_144gndd" name="G2(s)">
      <incoming>Flow_1h9aj60</incoming>
      <outgoing>Flow_0w6215x</outgoing>
      <outgoing>Flow_04hj0g3</outgoing>
    </task>
    <sequenceFlow id="Flow_1h9aj60" sourceRef="Event_1eoad32" targetRef="Activity_144gndd" />
    <task id="Activity_0ixl23n" name="H2(s)">
      <incoming>Flow_0w6215x</incoming>
      <outgoing>Flow_0ye71qo</outgoing>
    </task>
    <sequenceFlow id="Flow_0w6215x" sourceRef="Activity_144gndd" targetRef="Activity_0ixl23n" />
    <sequenceFlow id="Flow_0ye71qo" sourceRef="Activity_0ixl23n" targetRef="Event_1eoad32" />
    <intermediateThrowEvent id="Event_1uld84g" name="+">
      <outgoing>Flow_1adymej</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="Event_0g3938j" name="+">
      <incoming>Flow_04hj0g3</incoming>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_04hj0g3" sourceRef="Activity_144gndd" targetRef="Event_0g3938j" />
    <task id="Activity_04vwlks" name="F1(s)">
      <incoming>Flow_1adymej</incoming>
      <outgoing>Flow_1ffs9ue</outgoing>
    </task>
    <sequenceFlow id="Flow_1adymej" sourceRef="Event_1uld84g" targetRef="Activity_04vwlks" />
    <sequenceFlow id="Flow_1ffs9ue" sourceRef="Activity_04vwlks" targetRef="Event_1eoad32" />
    <textAnnotation id="TextAnnotation_0imvpse">
      <text>A</text>
    </textAnnotation>
    <textAnnotation id="TextAnnotation_17q29rr">
      <text>B</text>
    </textAnnotation>
    <association id="Association_11a0ogu" sourceRef="Event_1uld84g" targetRef="TextAnnotation_17q29rr" />
    <association id="Association_1tb7cz4" sourceRef="TextAnnotation_0imvpse" targetRef="Event_1uld84g" />
    <textAnnotation id="TextAnnotation_1f5vh40">
      <text>C</text>
    </textAnnotation>
    <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
    <textAnnotation id="TextAnnotation_1pc0zw5">
      <text>D</text>
    </textAnnotation>
    <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
    <group id="Group_1l180kl" categoryValueRef="CategoryValue_19etd42" />
  </process>
  <category id="Category_0ja3sbf">
    <categoryValue id="CategoryValue_19etd42" />
  </category>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
        <omgdc:Bounds x="190" y="162" width="49.99637049941928" height="34.9883855981417" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
        <omgdc:Bounds x="290" y="295" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
        <omgdc:Bounds x="1400" y="165" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
        <omgdc:Bounds x="1295" y="270" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0ye71qo_di" bpmnElement="Flow_0ye71qo">
        <omgdi:waypoint x="950" y="290" />
        <omgdi:waypoint x="860" y="290" />
        <omgdi:waypoint x="860" y="198" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0w6215x_di" bpmnElement="Flow_0w6215x">
        <omgdi:waypoint x="1050" y="180" />
        <omgdi:waypoint x="1180" y="180" />
        <omgdi:waypoint x="1180" y="290" />
        <omgdi:waypoint x="1050" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1h9aj60_di" bpmnElement="Flow_1h9aj60">
        <omgdi:waypoint x="878" y="180" />
        <omgdi:waypoint x="950" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1adymej_di" bpmnElement="Flow_1adymej">
        <omgdi:waypoint x="358" y="180" />
        <omgdi:waypoint x="580" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04hj0g3_di" bpmnElement="Flow_04hj0g3">
        <omgdi:waypoint x="1050" y="180" />
        <omgdi:waypoint x="1302" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ffs9ue_di" bpmnElement="Flow_1ffs9ue">
        <omgdi:waypoint x="680" y="180" />
        <omgdi:waypoint x="842" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
        <omgdc:Bounds x="580" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1eoad32_di" bpmnElement="Event_1eoad32">
        <omgdc:Bounds x="842" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="856" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_144gndd_di" bpmnElement="Activity_144gndd">
        <omgdc:Bounds x="950" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ixl23n_di" bpmnElement="Activity_0ixl23n">
        <omgdc:Bounds x="950" y="250" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1uld84g_di" bpmnElement="Event_1uld84g">
        <omgdc:Bounds x="322" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="336" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
        <omgdc:Bounds x="1302" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="1316" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_1tb7cz4_di" bpmnElement="Association_1tb7cz4">
        <omgdi:waypoint x="240" y="180" />
        <omgdi:waypoint x="322" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_11a0ogu_di" bpmnElement="Association_11a0ogu">
        <omgdi:waypoint x="340" y="198" />
        <omgdi:waypoint x="340" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
        <omgdi:waypoint x="1338" y="180" />
        <omgdi:waypoint x="1400" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
        <omgdi:waypoint x="1320" y="198" />
        <omgdi:waypoint x="1320" y="250" />
        <omgdi:waypoint x="1320" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Group_1l180kl_di" bpmnElement="Group_1l180kl">
        <omgdc:Bounds x="840" y="60" width="370" height="300" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`,
    // ******* STEP 2 *****
    `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
  <process id="Process_1" isExecutable="false">
    <task id="Activity_144gndd" name="F2(s)">
      <incoming>Flow_17jvv7u</incoming>
      <outgoing>Flow_04hj0g3</outgoing>
    </task>
    <intermediateThrowEvent id="Event_1uld84g" name="+">
      <outgoing>Flow_1adymej</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="Event_0g3938j" name="+">
      <incoming>Flow_04hj0g3</incoming>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_04hj0g3" sourceRef="Activity_144gndd" targetRef="Event_0g3938j" />
    <task id="Activity_04vwlks" name="F1(s)">
      <incoming>Flow_1adymej</incoming>
      <outgoing>Flow_17jvv7u</outgoing>
    </task>
    <sequenceFlow id="Flow_1adymej" sourceRef="Event_1uld84g" targetRef="Activity_04vwlks" />
    <sequenceFlow id="Flow_17jvv7u" sourceRef="Activity_04vwlks" targetRef="Activity_144gndd" />
    <textAnnotation id="TextAnnotation_0imvpse">
      <text>A</text>
    </textAnnotation>
    <textAnnotation id="TextAnnotation_17q29rr">
      <text>B</text>
    </textAnnotation>
    <association id="Association_11a0ogu" sourceRef="Event_1uld84g" targetRef="TextAnnotation_17q29rr" />
    <association id="Association_1tb7cz4" sourceRef="TextAnnotation_0imvpse" targetRef="Event_1uld84g" />
    <textAnnotation id="TextAnnotation_1f5vh40">
      <text>C</text>
    </textAnnotation>
    <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
    <textAnnotation id="TextAnnotation_1pc0zw5">
      <text>D</text>
    </textAnnotation>
    <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
    <group id="Group_0x8zs89" categoryValueRef="CategoryValue_0k5gvk3" />
  </process>
  <category id="Category_06amhp0">
    <categoryValue id="CategoryValue_0k5gvk3" />
  </category>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_1adymej_di" bpmnElement="Flow_1adymej">
        <omgdi:waypoint x="358" y="180" />
        <omgdi:waypoint x="580" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04hj0g3_di" bpmnElement="Flow_04hj0g3">
        <omgdi:waypoint x="1050" y="180" />
        <omgdi:waypoint x="1302" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_17jvv7u_di" bpmnElement="Flow_17jvv7u">
        <omgdi:waypoint x="680" y="180" />
        <omgdi:waypoint x="950" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_144gndd_di" bpmnElement="Activity_144gndd">
        <omgdc:Bounds x="950" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1uld84g_di" bpmnElement="Event_1uld84g">
        <omgdc:Bounds x="322" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="336" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
        <omgdc:Bounds x="1302" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="1316" y="173" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
        <omgdc:Bounds x="580" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
        <omgdc:Bounds x="190" y="162" width="49.99637049941928" height="34.9883855981417" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
        <omgdc:Bounds x="290" y="295" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
        <omgdc:Bounds x="1400" y="165" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
        <omgdc:Bounds x="1295" y="270" width="49.99637049941928" height="29.997822299651567" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_11a0ogu_di" bpmnElement="Association_11a0ogu">
        <omgdi:waypoint x="340" y="198" />
        <omgdi:waypoint x="340" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1tb7cz4_di" bpmnElement="Association_1tb7cz4">
        <omgdi:waypoint x="240" y="180" />
        <omgdi:waypoint x="322" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
        <omgdi:waypoint x="1338" y="180" />
        <omgdi:waypoint x="1400" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
        <omgdi:waypoint x="1320" y="198" />
        <omgdi:waypoint x="1320" y="250" />
        <omgdi:waypoint x="1320" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Group_0x8zs89_di" bpmnElement="Group_0x8zs89">
        <omgdc:Bounds x="560" y="50" width="510" height="300" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`,
    // ******* STEP 3 ******
    `<?xml version="1.0" encoding="UTF-8"?>
    <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
      <process id="Process_1" isExecutable="false">
        <intermediateThrowEvent id="Event_1uld84g" name="+">
          <outgoing>Flow_1adymej</outgoing>
        </intermediateThrowEvent>
        <intermediateThrowEvent id="Event_0g3938j" name="+">
          <incoming>Flow_17jvv7u</incoming>
        </intermediateThrowEvent>
        <task id="Activity_04vwlks" name="G(s)">
          <incoming>Flow_1adymej</incoming>
          <outgoing>Flow_17jvv7u</outgoing>
        </task>
        <sequenceFlow id="Flow_1adymej" sourceRef="Event_1uld84g" targetRef="Activity_04vwlks" />
        <sequenceFlow id="Flow_17jvv7u" sourceRef="Activity_04vwlks" targetRef="Event_0g3938j" />
        <intermediateThrowEvent id="Event_0qiidww" name="+">
          <outgoing>Flow_0wy7wj4</outgoing>
        </intermediateThrowEvent>
        <intermediateThrowEvent id="Event_1ws6kgt" name="+">
          <incoming>Flow_0y4ue42</incoming>
        </intermediateThrowEvent>
        <task id="Activity_06gaff4" name="G(s)">
          <incoming>Flow_0wy7wj4</incoming>
          <outgoing>Flow_0y4ue42</outgoing>
        </task>
        <sequenceFlow id="Flow_0wy7wj4" sourceRef="Event_0qiidww" targetRef="Activity_06gaff4" />
        <sequenceFlow id="Flow_0y4ue42" sourceRef="Activity_06gaff4" targetRef="Event_1ws6kgt" />
        <textAnnotation id="TextAnnotation_0imvpse">
          <text>A</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_17q29rr">
          <text>B</text>
        </textAnnotation>
        <association id="Association_11a0ogu" sourceRef="Event_1uld84g" targetRef="TextAnnotation_17q29rr" />
        <association id="Association_1tb7cz4" sourceRef="TextAnnotation_0imvpse" targetRef="Event_1uld84g" />
        <textAnnotation id="TextAnnotation_1f5vh40">
          <text>C</text>
        </textAnnotation>
        <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
        <textAnnotation id="TextAnnotation_1pc0zw5">
          <text>D</text>
        </textAnnotation>
        <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
        <group id="Group_14k3btk" categoryValueRef="CategoryValue_1x9grhz" />
        <textAnnotation id="TextAnnotation_1s6d9b7">
          <text>A</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_074mxvm">
          <text>B</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_1ilaeby">
          <text>C</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_0ruvc0x">
          <text>D</text>
        </textAnnotation>
        <group id="Group_1kirgvv" categoryValueRef="CategoryValue_127au4z" />
        <association id="Association_0s8dkby" sourceRef="TextAnnotation_1s6d9b7" targetRef="Event_0qiidww" />
        <association id="Association_0qgm4hi" sourceRef="Event_0qiidww" targetRef="TextAnnotation_074mxvm" />
        <association id="Association_1h3ckyg" sourceRef="Event_1ws6kgt" targetRef="TextAnnotation_1ilaeby" />
        <association id="Association_121nzqa" sourceRef="Event_1ws6kgt" targetRef="TextAnnotation_0ruvc0x" />
      </process>
      <category id="Category_0hy8858">
        <categoryValue id="CategoryValue_1x9grhz" />
      </category>
      <category id="Category_0eq4ocs">
        <categoryValue id="CategoryValue_127au4z" />
      </category>
      <bpmndi:BPMNDiagram id="BpmnDiagram_1">
        <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
            <omgdc:Bounds x="190" y="152" width="50" height="35" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
            <omgdc:Bounds x="290" y="285" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
            <omgdc:Bounds x="970" y="155" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
            <omgdc:Bounds x="865" y="260" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_18jwh3n" bpmnElement="TextAnnotation_1s6d9b7">
            <omgdc:Bounds x="190" y="522" width="50" height="35" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_10o6dyj" bpmnElement="TextAnnotation_074mxvm">
            <omgdc:Bounds x="290" y="655" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1635kqu" bpmnElement="TextAnnotation_1ilaeby">
            <omgdc:Bounds x="970" y="525" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_0uyqvwb" bpmnElement="TextAnnotation_0ruvc0x">
            <omgdc:Bounds x="865" y="630" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_17jvv7u_di" bpmnElement="Flow_17jvv7u">
            <omgdi:waypoint x="680" y="170" />
            <omgdi:waypoint x="872" y="170" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1adymej_di" bpmnElement="Flow_1adymej">
            <omgdi:waypoint x="358" y="170" />
            <omgdi:waypoint x="580" y="170" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_0ke5v0d" bpmnElement="Flow_0wy7wj4">
            <omgdi:waypoint x="358" y="540" />
            <omgdi:waypoint x="580" y="540" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_0kequrk" bpmnElement="Flow_0y4ue42">
            <omgdi:waypoint x="680" y="540" />
            <omgdi:waypoint x="872" y="540" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Event_1uld84g_di" bpmnElement="Event_1uld84g">
            <omgdc:Bounds x="322" y="152" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="336" y="163" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
            <omgdc:Bounds x="872" y="152" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="886" y="163" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
            <omgdc:Bounds x="580" y="130" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1ul36ie" bpmnElement="Event_0qiidww">
            <omgdc:Bounds x="322" y="522" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="336" y="533" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_130jx1j" bpmnElement="Event_1ws6kgt">
            <omgdc:Bounds x="872" y="522" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="886" y="533" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1fyvgia" bpmnElement="Activity_06gaff4">
            <omgdc:Bounds x="580" y="500" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Association_1tb7cz4_di" bpmnElement="Association_1tb7cz4">
            <omgdi:waypoint x="240" y="170" />
            <omgdi:waypoint x="322" y="170" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Association_11a0ogu_di" bpmnElement="Association_11a0ogu">
            <omgdi:waypoint x="340" y="188" />
            <omgdi:waypoint x="340" y="300" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
            <omgdi:waypoint x="908" y="170" />
            <omgdi:waypoint x="970" y="170" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
            <omgdi:waypoint x="890" y="188" />
            <omgdi:waypoint x="890" y="240" />
            <omgdi:waypoint x="890" y="250" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_09lvmm6" bpmnElement="Association_0s8dkby">
            <omgdi:waypoint x="240" y="540" />
            <omgdi:waypoint x="322" y="540" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_0bjzx55" bpmnElement="Association_0qgm4hi">
            <omgdi:waypoint x="340" y="558" />
            <omgdi:waypoint x="340" y="670" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_03ejwdi" bpmnElement="Association_1h3ckyg">
            <omgdi:waypoint x="908" y="540" />
            <omgdi:waypoint x="970" y="540" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_1v36zhb" bpmnElement="Association_121nzqa">
            <omgdi:waypoint x="890" y="558" />
            <omgdi:waypoint x="890" y="610" />
            <omgdi:waypoint x="890" y="620" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Group_14k3btk_di" bpmnElement="Group_14k3btk">
            <omgdc:Bounds x="170" y="80" width="530" height="300" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1tn2pf6" bpmnElement="Group_1kirgvv">
            <omgdc:Bounds x="485" y="460" width="530" height="300" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </definitions>`,
    // ******* STEP 4 ******
    `<?xml version="1.0" encoding="UTF-8"?>
    <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
      <process id="Process_1" isExecutable="false">
        <intermediateThrowEvent id="Event_0g3938j" name="+">
          <incoming>Flow_1p8w2tb</incoming>
        </intermediateThrowEvent>
        <task id="Activity_04vwlks" name="G(s)">
          <outgoing>Flow_1axr0i0</outgoing>
        </task>
        <intermediateThrowEvent id="Event_0qiidww" name="+">
          <outgoing>Flow_0wy7wj4</outgoing>
        </intermediateThrowEvent>
        <intermediateThrowEvent id="Event_1ws6kgt" name="+">
          <incoming>Flow_0y4ue42</incoming>
        </intermediateThrowEvent>
        <task id="Activity_06gaff4" name="G(s)">
          <incoming>Flow_0wy7wj4</incoming>
          <outgoing>Flow_0y4ue42</outgoing>
        </task>
        <sequenceFlow id="Flow_0wy7wj4" sourceRef="Event_0qiidww" targetRef="Activity_06gaff4" />
        <sequenceFlow id="Flow_0y4ue42" sourceRef="Activity_06gaff4" targetRef="Event_1ws6kgt" />
        <task id="Activity_0jcsg0y" name="G(s)">
          <outgoing>Flow_1fv0nip</outgoing>
        </task>
        <intermediateThrowEvent id="Event_1l4dfq8" name="+">
          <incoming>Flow_1fv0nip</incoming>
          <incoming>Flow_1axr0i0</incoming>
          <outgoing>Flow_1p8w2tb</outgoing>
        </intermediateThrowEvent>
        <sequenceFlow id="Flow_1fv0nip" sourceRef="Activity_0jcsg0y" targetRef="Event_1l4dfq8" />
        <sequenceFlow id="Flow_1axr0i0" sourceRef="Activity_04vwlks" targetRef="Event_1l4dfq8" />
        <sequenceFlow id="Flow_1p8w2tb" sourceRef="Event_1l4dfq8" targetRef="Event_0g3938j" />
        <textAnnotation id="TextAnnotation_0imvpse">
          <text>A</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_17q29rr">
          <text>B</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_1f5vh40">
          <text>C</text>
        </textAnnotation>
        <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
        <textAnnotation id="TextAnnotation_1pc0zw5">
          <text>D</text>
        </textAnnotation>
        <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
        <textAnnotation id="TextAnnotation_1s6d9b7">
          <text>A</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_074mxvm">
          <text>B</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_1ilaeby">
          <text>C</text>
        </textAnnotation>
        <textAnnotation id="TextAnnotation_0ruvc0x">
          <text>D</text>
        </textAnnotation>
        <group id="Group_1kirgvv" categoryValueRef="CategoryValue_127au4z" />
        <association id="Association_0s8dkby" sourceRef="TextAnnotation_1s6d9b7" targetRef="Event_0qiidww" />
        <association id="Association_0qgm4hi" sourceRef="Event_0qiidww" targetRef="TextAnnotation_074mxvm" />
        <association id="Association_1h3ckyg" sourceRef="Event_1ws6kgt" targetRef="TextAnnotation_1ilaeby" />
        <association id="Association_121nzqa" sourceRef="Event_1ws6kgt" targetRef="TextAnnotation_0ruvc0x" />
        <association id="Association_0rbaoq2" sourceRef="TextAnnotation_0imvpse" targetRef="Activity_04vwlks" />
        <association id="Association_0ss3u92" sourceRef="TextAnnotation_17q29rr" targetRef="Activity_0jcsg0y" />
      </process>
      <category id="Category_0eq4ocs">
        <categoryValue id="CategoryValue_127au4z" />
      </category>
      <bpmndi:BPMNDiagram id="BpmnDiagram_1">
        <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
            <omgdc:Bounds x="545" y="320" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="BPMNEdge_0kequrk" bpmnElement="Flow_0y4ue42">
            <omgdi:waypoint x="680" y="490" />
            <omgdi:waypoint x="872" y="490" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_0ke5v0d" bpmnElement="Flow_0wy7wj4">
            <omgdi:waypoint x="358" y="490" />
            <omgdi:waypoint x="580" y="490" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1fv0nip_di" bpmnElement="Flow_1fv0nip">
            <omgdi:waypoint x="570" y="220" />
            <omgdi:waypoint x="570" y="138" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1axr0i0_di" bpmnElement="Flow_1axr0i0">
            <omgdi:waypoint x="390" y="120" />
            <omgdi:waypoint x="552" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1p8w2tb_di" bpmnElement="Flow_1p8w2tb">
            <omgdi:waypoint x="588" y="120" />
            <omgdi:waypoint x="872" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
            <omgdc:Bounds x="872" y="102" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="886" y="113" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1ul36ie" bpmnElement="Event_0qiidww">
            <omgdc:Bounds x="322" y="472" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="336" y="483" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_130jx1j" bpmnElement="Event_1ws6kgt">
            <omgdc:Bounds x="872" y="472" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="886" y="483" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1fyvgia" bpmnElement="Activity_06gaff4">
            <omgdc:Bounds x="580" y="450" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
            <omgdc:Bounds x="190" y="102" width="50" height="35" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
            <omgdc:Bounds x="970" y="105" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
            <omgdc:Bounds x="865" y="210" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
            <omgdc:Bounds x="290" y="80" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1l4dfq8_di" bpmnElement="Event_1l4dfq8">
            <omgdc:Bounds x="552" y="102" width="36" height="36" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="566" y="113" width="7" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0jcsg0y_di" bpmnElement="Activity_0jcsg0y">
            <omgdc:Bounds x="520" y="220" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Association_0rbaoq2_di" bpmnElement="Association_0rbaoq2">
            <omgdi:waypoint x="240" y="120" />
            <omgdi:waypoint x="290" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="BPMNShape_18jwh3n" bpmnElement="TextAnnotation_1s6d9b7">
            <omgdc:Bounds x="190" y="472" width="50" height="35" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_10o6dyj" bpmnElement="TextAnnotation_074mxvm">
            <omgdc:Bounds x="290" y="605" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_1635kqu" bpmnElement="TextAnnotation_1ilaeby">
            <omgdc:Bounds x="970" y="475" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="BPMNShape_0uyqvwb" bpmnElement="TextAnnotation_0ruvc0x">
            <omgdc:Bounds x="865" y="580" width="50" height="30" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Association_0ss3u92_di" bpmnElement="Association_0ss3u92">
            <omgdi:waypoint x="570" y="320" />
            <omgdi:waypoint x="570" y="300" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="BPMNShape_1tn2pf6" bpmnElement="Group_1kirgvv">
            <omgdc:Bounds x="485" y="410" width="530" height="300" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
            <omgdi:waypoint x="908" y="120" />
            <omgdi:waypoint x="970" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
            <omgdi:waypoint x="890" y="138" />
            <omgdi:waypoint x="890" y="190" />
            <omgdi:waypoint x="890" y="200" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_09lvmm6" bpmnElement="Association_0s8dkby">
            <omgdi:waypoint x="240" y="490" />
            <omgdi:waypoint x="322" y="490" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_0bjzx55" bpmnElement="Association_0qgm4hi">
            <omgdi:waypoint x="340" y="508" />
            <omgdi:waypoint x="340" y="620" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_03ejwdi" bpmnElement="Association_1h3ckyg">
            <omgdi:waypoint x="908" y="490" />
            <omgdi:waypoint x="970" y="490" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="BPMNEdge_1v36zhb" bpmnElement="Association_121nzqa">
            <omgdi:waypoint x="890" y="508" />
            <omgdi:waypoint x="890" y="560" />
            <omgdi:waypoint x="890" y="570" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </definitions>`,
    // ******* STEP 3 ******
  `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
    <process id="Process_1" isExecutable="false">
      <intermediateThrowEvent id="Event_0g3938j" name="+">
        <incoming>Flow_1p8w2tb</incoming>
      </intermediateThrowEvent>
      <task id="Activity_04vwlks" name="G(s)">
        <outgoing>Flow_1axr0i0</outgoing>
      </task>
      <intermediateThrowEvent id="Event_0qiidww" name="+">
        <outgoing>Flow_075gu9u</outgoing>
      </intermediateThrowEvent>
      <task id="Activity_06gaff4" name="G(s)">
        <incoming>Flow_1ogeshz</incoming>
      </task>
      <task id="Activity_0jcsg0y" name="G(s)">
        <outgoing>Flow_1fv0nip</outgoing>
      </task>
      <intermediateThrowEvent id="Event_1l4dfq8" name="+">
        <incoming>Flow_1fv0nip</incoming>
        <incoming>Flow_1axr0i0</incoming>
        <outgoing>Flow_1p8w2tb</outgoing>
      </intermediateThrowEvent>
      <sequenceFlow id="Flow_1fv0nip" sourceRef="Activity_0jcsg0y" targetRef="Event_1l4dfq8" />
      <sequenceFlow id="Flow_1axr0i0" sourceRef="Activity_04vwlks" targetRef="Event_1l4dfq8" />
      <sequenceFlow id="Flow_1p8w2tb" sourceRef="Event_1l4dfq8" targetRef="Event_0g3938j" />
      <intermediateThrowEvent id="Event_1ws6kgt" name="+">
        <incoming>Flow_075gu9u</incoming>
        <incoming>Flow_1seiv3z</incoming>
        <outgoing>Flow_1ogeshz</outgoing>
      </intermediateThrowEvent>
      <sequenceFlow id="Flow_075gu9u" sourceRef="Event_0qiidww" targetRef="Event_1ws6kgt" />
      <sequenceFlow id="Flow_1ogeshz" sourceRef="Event_1ws6kgt" targetRef="Activity_06gaff4" />
      <task id="Activity_1t0td7h" name="F(s)">
        <outgoing>Flow_1seiv3z</outgoing>
      </task>
      <sequenceFlow id="Flow_1seiv3z" sourceRef="Activity_1t0td7h" targetRef="Event_1ws6kgt" />
      <textAnnotation id="TextAnnotation_0imvpse">
        <text>A</text>
      </textAnnotation>
      <textAnnotation id="TextAnnotation_17q29rr">
        <text>B</text>
      </textAnnotation>
      <textAnnotation id="TextAnnotation_1f5vh40">
        <text>C</text>
      </textAnnotation>
      <association id="Association_1fdpb0a" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1f5vh40" />
      <textAnnotation id="TextAnnotation_1pc0zw5">
        <text>D</text>
      </textAnnotation>
      <association id="Association_10zikwn" sourceRef="Event_0g3938j" targetRef="TextAnnotation_1pc0zw5" />
      <textAnnotation id="TextAnnotation_1s6d9b7">
        <text>A</text>
      </textAnnotation>
      <textAnnotation id="TextAnnotation_074mxvm">
        <text>B</text>
      </textAnnotation>
      <textAnnotation id="TextAnnotation_1ilaeby">
        <text>C</text>
      </textAnnotation>
      <textAnnotation id="TextAnnotation_0ruvc0x">
        <text>D</text>
      </textAnnotation>
      <association id="Association_0s8dkby" sourceRef="TextAnnotation_1s6d9b7" targetRef="Event_0qiidww" />
      <association id="Association_0qgm4hi" sourceRef="Event_0qiidww" targetRef="TextAnnotation_074mxvm" />
      <association id="Association_0rbaoq2" sourceRef="TextAnnotation_0imvpse" targetRef="Activity_04vwlks" />
      <association id="Association_0ss3u92" sourceRef="TextAnnotation_17q29rr" targetRef="Activity_0jcsg0y" />
      <association id="Association_0lfzdcq" sourceRef="Activity_06gaff4" targetRef="TextAnnotation_1ilaeby" />
      <association id="Association_16rfqv4" sourceRef="TextAnnotation_0ruvc0x" targetRef="Activity_1t0td7h" />
    </process>
    <bpmndi:BPMNDiagram id="BpmnDiagram_1">
      <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="TextAnnotation_17q29rr_di" bpmnElement="TextAnnotation_17q29rr">
          <omgdc:Bounds x="545" y="320" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="TextAnnotation_0imvpse_di" bpmnElement="TextAnnotation_0imvpse">
          <omgdc:Bounds x="190" y="102" width="50" height="35" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="TextAnnotation_1f5vh40_di" bpmnElement="TextAnnotation_1f5vh40">
          <omgdc:Bounds x="970" y="105" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="TextAnnotation_1pc0zw5_di" bpmnElement="TextAnnotation_1pc0zw5">
          <omgdc:Bounds x="865" y="210" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_18jwh3n" bpmnElement="TextAnnotation_1s6d9b7">
          <omgdc:Bounds x="190" y="472" width="50" height="35" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_10o6dyj" bpmnElement="TextAnnotation_074mxvm">
          <omgdc:Bounds x="290" y="605" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_1635kqu" bpmnElement="TextAnnotation_1ilaeby">
          <omgdc:Bounds x="970" y="475" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_0uyqvwb" bpmnElement="TextAnnotation_0ruvc0x">
          <omgdc:Bounds x="585" y="740" width="50" height="30" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="Flow_1fv0nip_di" bpmnElement="Flow_1fv0nip">
          <omgdi:waypoint x="570" y="220" />
          <omgdi:waypoint x="570" y="138" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1axr0i0_di" bpmnElement="Flow_1axr0i0">
          <omgdi:waypoint x="390" y="120" />
          <omgdi:waypoint x="552" y="120" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1p8w2tb_di" bpmnElement="Flow_1p8w2tb">
          <omgdi:waypoint x="588" y="120" />
          <omgdi:waypoint x="872" y="120" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_075gu9u_di" bpmnElement="Flow_075gu9u">
          <omgdi:waypoint x="358" y="490" />
          <omgdi:waypoint x="592" y="490" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1ogeshz_di" bpmnElement="Flow_1ogeshz">
          <omgdi:waypoint x="628" y="490" />
          <omgdi:waypoint x="740" y="490" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1seiv3z_di" bpmnElement="Flow_1seiv3z">
          <omgdi:waypoint x="610" y="630" />
          <omgdi:waypoint x="610" y="508" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Event_0g3938j_di" bpmnElement="Event_0g3938j">
          <omgdc:Bounds x="872" y="102" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="886" y="113" width="7" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_1ul36ie" bpmnElement="Event_0qiidww">
          <omgdc:Bounds x="322" y="472" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="336" y="483" width="7" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
          <omgdc:Bounds x="290" y="80" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_1l4dfq8_di" bpmnElement="Event_1l4dfq8">
          <omgdc:Bounds x="552" y="102" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="566" y="113" width="7" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_0jcsg0y_di" bpmnElement="Activity_0jcsg0y">
          <omgdc:Bounds x="520" y="220" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_1fyvgia" bpmnElement="Activity_06gaff4">
          <omgdc:Bounds x="740" y="450" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_130jx1j" bpmnElement="Event_1ws6kgt">
          <omgdc:Bounds x="592" y="472" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="606" y="483" width="7" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_0ga8nsx" bpmnElement="Activity_1t0td7h">
          <omgdc:Bounds x="560" y="630" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="Association_0ss3u92_di" bpmnElement="Association_0ss3u92">
          <omgdi:waypoint x="570" y="320" />
          <omgdi:waypoint x="570" y="300" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Association_1fdpb0a_di" bpmnElement="Association_1fdpb0a">
          <omgdi:waypoint x="908" y="120" />
          <omgdi:waypoint x="970" y="120" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Association_10zikwn_di" bpmnElement="Association_10zikwn">
          <omgdi:waypoint x="890" y="138" />
          <omgdi:waypoint x="890" y="190" />
          <omgdi:waypoint x="890" y="200" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="BPMNEdge_09lvmm6" bpmnElement="Association_0s8dkby">
          <omgdi:waypoint x="240" y="490" />
          <omgdi:waypoint x="322" y="490" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="BPMNEdge_0bjzx55" bpmnElement="Association_0qgm4hi">
          <omgdi:waypoint x="340" y="508" />
          <omgdi:waypoint x="340" y="620" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Association_0rbaoq2_di" bpmnElement="Association_0rbaoq2">
          <omgdi:waypoint x="240" y="120" />
          <omgdi:waypoint x="290" y="120" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Association_0lfzdcq_di" bpmnElement="Association_0lfzdcq">
          <omgdi:waypoint x="840" y="491" />
          <omgdi:waypoint x="970" y="495" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Association_16rfqv4_di" bpmnElement="Association_16rfqv4">
          <omgdi:waypoint x="610" y="740" />
          <omgdi:waypoint x="610" y="710" />
        </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </definitions> `
];

export default stepByStepDiagram;
