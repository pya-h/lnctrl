const block_diagram_sample = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.3">
  <process id="Process_1" isExecutable="false">
    <task id="Activity_16okqdz" name="G1(s)">
      <outgoing>Flow_0wpb8oo</outgoing>
    </task>
    <task id="Activity_124024s" name="G2(s)">
      <incoming>Flow_0wpb8oo</incoming>
      <outgoing>Flow_0z206ir</outgoing>
    </task>
    <sequenceFlow id="Flow_0wpb8oo" sourceRef="Activity_16okqdz" targetRef="Activity_124024s" />
    <task id="Activity_04vwlks" name="G3(s)">
      <incoming>Flow_0z206ir</incoming>
      <outgoing>Flow_1im3vqx</outgoing>
      <outgoing>Flow_030xgmh</outgoing>
    </task>
    <sequenceFlow id="Flow_0z206ir" sourceRef="Activity_124024s" targetRef="Activity_04vwlks" />
    <task id="Activity_1xug5vp" name="G4(s)">
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
    <task id="Activity_144gndd" name="G5(s)">
      <incoming>Flow_1h9aj60</incoming>
      <outgoing>Flow_0w6215x</outgoing>
    </task>
    <sequenceFlow id="Flow_1h9aj60" sourceRef="Event_1eoad32" targetRef="Activity_144gndd" />
    <task id="Activity_0ixl23n" name="G6(s)">
      <incoming>Flow_0w6215x</incoming>
      <outgoing>Flow_0ye71qo</outgoing>
    </task>
    <sequenceFlow id="Flow_0w6215x" sourceRef="Activity_144gndd" targetRef="Activity_0ixl23n" />
    <sequenceFlow id="Flow_0ye71qo" sourceRef="Activity_0ixl23n" targetRef="Event_1eoad32" />
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_0wpb8oo_di" bpmnElement="Flow_0wpb8oo">
        <omgdi:waypoint x="260" y="120" />
        <omgdi:waypoint x="310" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0z206ir_di" bpmnElement="Flow_0z206ir">
        <omgdi:waypoint x="410" y="120" />
        <omgdi:waypoint x="580" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1im3vqx_di" bpmnElement="Flow_1im3vqx">
        <omgdi:waypoint x="580" y="120" />
        <omgdi:waypoint x="480" y="120" />
        <omgdi:waypoint x="480" y="250" />
        <omgdi:waypoint x="580" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_030xgmh_di" bpmnElement="Flow_030xgmh">
        <omgdi:waypoint x="680" y="120" />
        <omgdi:waypoint x="742" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wop0m5_di" bpmnElement="Flow_1wop0m5">
        <omgdi:waypoint x="680" y="250" />
        <omgdi:waypoint x="760" y="250" />
        <omgdi:waypoint x="760" y="138" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1iqs8dj_di" bpmnElement="Flow_1iqs8dj">
        <omgdi:waypoint x="778" y="120" />
        <omgdi:waypoint x="842" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1h9aj60_di" bpmnElement="Flow_1h9aj60">
        <omgdi:waypoint x="878" y="120" />
        <omgdi:waypoint x="950" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0w6215x_di" bpmnElement="Flow_0w6215x">
        <omgdi:waypoint x="1050" y="120" />
        <omgdi:waypoint x="1180" y="120" />
        <omgdi:waypoint x="1180" y="230" />
        <omgdi:waypoint x="1050" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ye71qo_di" bpmnElement="Flow_0ye71qo">
        <omgdi:waypoint x="950" y="230" />
        <omgdi:waypoint x="860" y="230" />
        <omgdi:waypoint x="860" y="138" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_16okqdz_di" bpmnElement="Activity_16okqdz">
        <omgdc:Bounds x="160" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_124024s_di" bpmnElement="Activity_124024s">
        <omgdc:Bounds x="310" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_04vwlks_di" bpmnElement="Activity_04vwlks">
        <omgdc:Bounds x="580" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1xug5vp_di" bpmnElement="Activity_1xug5vp">
        <omgdc:Bounds x="580" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0j3in9z_di" bpmnElement="Event_0j3in9z">
        <omgdc:Bounds x="742" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="756" y="113" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1eoad32_di" bpmnElement="Event_1eoad32">
        <omgdc:Bounds x="842" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="856" y="113" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_144gndd_di" bpmnElement="Activity_144gndd">
        <omgdc:Bounds x="950" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ixl23n_di" bpmnElement="Activity_0ixl23n">
        <omgdc:Bounds x="950" y="190" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`

export default block_diagram_sample;