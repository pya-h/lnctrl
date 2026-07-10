import React, {
    useMemo,
    useCallback,
    useRef,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";
import ReactFlow, {
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    Handle,
    Position,
    MarkerType,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import "./blockDiagram.css";

// lets custom nodes edit themselves without stuffing callbacks into node data
const EditorCtx = createContext(null);

/* ---------- custom control-notation nodes ---------- */

// a transfer-function block: G(s). Double-click to rename.
const TransferFunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const rtl = data.flow === "rtl";
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(data.label);
    useEffect(() => setVal(data.label), [data.label]);
    const commit = () => {
        setEditing(false);
        ctx?.updateNodeLabel(id, val || data.label);
    };
    return (
        <div className="bd-node bd-tf" onDoubleClick={() => setEditing(true)}>
            <Handle
                type="target"
                position={rtl ? Position.Right : Position.Left}
            />
            {editing ? (
                <input
                    className="bd-edit nodrag"
                    value={val}
                    autoFocus
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") {
                            setVal(data.label);
                            setEditing(false);
                        }
                    }}
                />
            ) : (
                <span className="bd-tf-label">{data.label}</span>
            )}
            <Handle
                type="source"
                position={rtl ? Position.Left : Position.Right}
            />
        </div>
    );
};

// a summing junction: click a ± sign to flip it
const SummingJunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const [s1 = "+", s2 = "−"] = data.signs || [];
    return (
        <div className="bd-node bd-sum">
            <Handle id="in1" type="target" position={Position.Left} />
            <Handle id="in2" type="target" position={Position.Bottom} />
            <Handle type="source" position={Position.Right} />
            <span className="bd-sum-glyph">{"Σ"}</span>
            <span
                className="bd-sum-sign bd-sign-in1 nodrag"
                onClick={() => ctx?.toggleSign(id, 0)}
            >
                {s1}
            </span>
            <span
                className="bd-sum-sign bd-sign-in2 nodrag"
                onClick={() => ctx?.toggleSign(id, 1)}
            >
                {s2}
            </span>
        </div>
    );
};

// a takeoff / branch point
const TakeoffNode = () => (
    <div className="bd-node bd-takeoff">
        <Handle type="target" position={Position.Left} />
        <Handle id="out" type="source" position={Position.Right} />
        <Handle id="down" type="source" position={Position.Bottom} />
    </div>
);

// an input / output signal label. Double-click to rename.
const IONode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(data.label);
    useEffect(() => setVal(data.label), [data.label]);
    const commit = () => {
        setEditing(false);
        ctx?.updateNodeLabel(id, val || data.label);
    };
    return (
        <div className="bd-node bd-io" onDoubleClick={() => setEditing(true)}>
            {data.kind === "output" && (
                <Handle type="target" position={Position.Left} />
            )}
            {editing ? (
                <input
                    className="bd-edit nodrag"
                    value={val}
                    autoFocus
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") {
                            setVal(data.label);
                            setEditing(false);
                        }
                    }}
                />
            ) : (
                <span>{data.label}</span>
            )}
            {data.kind === "input" && (
                <Handle type="source" position={Position.Right} />
            )}
        </div>
    );
};

const nodeTypes = {
    tf: TransferFunctionNode,
    sum: SummingJunctionNode,
    takeoff: TakeoffNode,
    io: IONode,
};

/* ---------- default diagram: canonical closed-loop system ---------- */
const sampleNodes = [
    { id: "in", type: "io", position: { x: 0, y: 96 }, data: { label: "R(s)", kind: "input" } },
    { id: "sum", type: "sum", position: { x: 110, y: 82 }, data: { signs: ["+", "−"] } },
    { id: "g1", type: "tf", position: { x: 210, y: 79 }, data: { label: "G₁(s)" } },
    { id: "g2", type: "tf", position: { x: 360, y: 79 }, data: { label: "G₂(s)" } },
    { id: "tp", type: "takeoff", position: { x: 512, y: 97 }, data: {} },
    { id: "out", type: "io", position: { x: 600, y: 96 }, data: { label: "C(s)", kind: "output" } },
    { id: "h", type: "tf", position: { x: 330, y: 240 }, data: { label: "H(s)", flow: "rtl" } },
];
const sampleEdges = [
    { id: "e-in-sum", source: "in", target: "sum", targetHandle: "in1" },
    { id: "e-sum-g1", source: "sum", target: "g1", label: "E(s)" },
    { id: "e-g1-g2", source: "g1", target: "g2" },
    { id: "e-g2-tp", source: "g2", target: "tp" },
    { id: "e-tp-out", source: "tp", sourceHandle: "out", target: "out", label: "C(s)" },
    { id: "e-tp-h", source: "tp", sourceHandle: "down", target: "h" },
    { id: "e-h-sum", source: "h", target: "sum", targetHandle: "in2" },
];

const NEW_NODE_DATA = {
    tf: () => ({ label: "G(s)" }),
    sum: () => ({ signs: ["+", "−"] }),
    takeoff: () => ({}),
    "io-in": () => ({ label: "U(s)", kind: "input" }),
    "io-out": () => ({ label: "Y(s)", kind: "output" }),
};

const BlockDiagramFlowInner = ({ editable = true, diagram }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [nodes, setNodes, onNodesChange] = useNodesState(
        diagram?.nodes || sampleNodes
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState(
        diagram?.edges || sampleEdges
    );
    const wrapperRef = useRef(null);
    const nextId = useRef(1);
    const { screenToFlowPosition, deleteElements, fitView } = useReactFlow();

    // load an externally supplied diagram (e.g. a lecture reduction step) via the `diagram`
    // prop, then re-fit once the new nodes have been measured. We fit imperatively rather
    // than remounting the canvas — remounting churns React Flow's ResizeObserver.
    useEffect(() => {
        if (!diagram?.nodes) return undefined;
        setNodes(diagram.nodes);
        setEdges(diagram.edges || []);
        const t = setTimeout(() => {
            try {
                fitView({ padding: 0.22, duration: 250 });
            } catch (e) {
                /* canvas not ready yet */
            }
        }, 90);
        return () => clearTimeout(t);
    }, [diagram, setNodes, setEdges, fitView]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNode = useCallback(
        (kind) => {
            const id = `n${nextId.current++}`;
            const type = kind.startsWith("io") ? "io" : kind;
            let position = { x: 120, y: 120 };
            const wrap = wrapperRef.current;
            if (wrap) {
                const r = wrap.getBoundingClientRect();
                position = screenToFlowPosition({
                    x: r.left + r.width / 2,
                    y: r.top + r.height / 2,
                });
            }
            position.x += (nextId.current % 5) * 18;
            position.y += (nextId.current % 5) * 18;
            setNodes((nds) =>
                nds.concat({ id, type, position, data: NEW_NODE_DATA[kind]() })
            );
        },
        [screenToFlowPosition, setNodes]
    );

    const deleteSelected = useCallback(() => {
        deleteElements({
            nodes: nodes.filter((n) => n.selected),
            edges: edges.filter((e) => e.selected),
        });
    }, [deleteElements, nodes, edges]);

    const reset = useCallback(() => {
        setNodes(sampleNodes);
        setEdges(sampleEdges);
    }, [setNodes, setEdges]);

    const exportJSON = useCallback(() => {
        const clean = {
            nodes: nodes.map(({ id, type, position, data }) => ({
                id,
                type,
                position,
                data,
            })),
            edges: edges.map(
                ({ id, source, target, sourceHandle, targetHandle, label }) => ({
                    id,
                    source,
                    target,
                    sourceHandle,
                    targetHandle,
                    label,
                })
            ),
        };
        const blob = new Blob([JSON.stringify(clean, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "block-diagram.json";
        a.click();
        URL.revokeObjectURL(url);
    }, [nodes, edges]);

    const ctxValue = useMemo(
        () => ({
            updateNodeLabel: (id, label) =>
                setNodes((nds) =>
                    nds.map((n) =>
                        n.id === id
                            ? { ...n, data: { ...n.data, label } }
                            : n
                    )
                ),
            toggleSign: (id, idx) =>
                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id !== id) return n;
                        const signs = [...(n.data.signs || ["+", "−"])];
                        signs[idx] = signs[idx] === "+" ? "−" : "+";
                        return { ...n, data: { ...n.data, signs } };
                    })
                ),
        }),
        [setNodes]
    );

    const edgeColor = isDark ? "#8aa0c8" : "#41527a";
    const defaultEdgeOptions = useMemo(
        () => ({
            type: "smoothstep",
            pathOptions: { borderRadius: 14 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: edgeColor,
                width: 15,
                height: 15,
            },
            style: { stroke: edgeColor, strokeWidth: 2 },
        }),
        [edgeColor]
    );

    return (
        <SubCard sx={{ p: 0 }}>
            {editable && (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ p: 1, flexWrap: "wrap", gap: 1 }}
                >
                    <Button size="small" variant="outlined" color="secondary" onClick={() => addNode("tf")}>
                        + Block G(s)
                    </Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={() => addNode("sum")}>
                        + Σ Summing
                    </Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={() => addNode("takeoff")}>
                        + Takeoff
                    </Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={() => addNode("io-in")}>
                        + Input
                    </Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={() => addNode("io-out")}>
                        + Output
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={deleteSelected}>
                        Delete
                    </Button>
                    <Button size="small" variant="text" onClick={reset}>
                        Reset
                    </Button>
                    <Button size="small" variant="text" onClick={exportJSON}>
                        Export
                    </Button>
                </Stack>
            )}
            <div
                ref={wrapperRef}
                className={`bd-flow ${editable ? "bd-flow--edit" : "bd-flow--view"}`}
                style={{
                    height: 460,
                    width: "100%",
                    background: isDark ? "#0f1630" : "#f6f8fc",
                    borderRadius: 8,
                }}
            >
                <EditorCtx.Provider value={ctxValue}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        defaultEdgeOptions={defaultEdgeOptions}
                        deleteKeyCode={editable ? ["Backspace", "Delete"] : null}
                        nodesDraggable={editable}
                        nodesConnectable={editable}
                        elementsSelectable={editable}
                        zoomOnScroll={editable}
                        zoomOnDoubleClick={editable}
                        fitView
                        fitViewOptions={{ padding: 0.22 }}
                        minZoom={0.3}
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background
                            gap={18}
                            size={1}
                            color={isDark ? "#28345a" : "#d3dcea"}
                        />
                        <Controls showInteractive={false} />
                        {editable && (
                            <MiniMap
                                pannable
                                zoomable
                                nodeColor={isDark ? "#39456b" : "#c3d2ee"}
                                maskColor={
                                    isDark
                                        ? "rgba(10,16,36,0.6)"
                                        : "rgba(230,236,245,0.6)"
                                }
                                style={{
                                    background: isDark ? "#111936" : "#eef2f9",
                                }}
                            />
                        )}
                    </ReactFlow>
                </EditorCtx.Provider>
            </div>
            {editable && (
                <div className="bd-hint">
                    Double-click a block or I/O label to rename · click a ± sign
                    to flip it · drag between dots to connect · select + Delete to
                    remove
                </div>
            )}
        </SubCard>
    );
};

// ReactFlowProvider lets the toolbar use the flow instance (add/delete nodes)
const BlockDiagramFlow = (props) => (
    <ReactFlowProvider>
        <BlockDiagramFlowInner {...props} />
    </ReactFlowProvider>
);

export default BlockDiagramFlow;
