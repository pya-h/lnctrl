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
import { Tooltip } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import "./blockDiagram.css";

// lets custom nodes edit / mutate themselves without stuffing callbacks into node
// data (keeps node data serializable for export)
const EditorCtx = createContext(null);

/* ---------- tiny inline icons for the palette ---------- */
const IcoBlock = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M1 12h3M20 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const IcoSum = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.2 9h5.4l-3.2 3 3.2 3H9.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IcoTakeoff = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M3 12h9M12 12v7M12 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
);
const IcoInput = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M4 12h12M11 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const IcoOutput = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M4 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 12h12M15 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IcoDelete = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M5 7h14M10 7V5h4v2M6 7l1 12h10l1-12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IcoFit = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const IcoReset = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M5 12a7 7 0 107-7 7 7 0 00-5 2.1L5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 5v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IcoExport = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 4v10M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

/* ---------- custom control-notation nodes ---------- */

// a transfer-function block: G(s). Double-click (or context menu) to rename;
// data.flow === "rtl" mirrors it for a feedback branch.
const TransferFunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const rtl = data.flow === "rtl";
    const editing = ctx?.editingId === id;
    const [val, setVal] = useState(data.label);
    useEffect(() => {
        if (editing) setVal(data.label);
    }, [editing, data.label]);
    const commit = () => {
        ctx?.updateNodeLabel(id, val.trim() || data.label);
        ctx?.endEdit();
    };
    return (
        <div
            className={`bd-node bd-tf${rtl ? " bd-tf--fb" : ""}`}
            onDoubleClick={() => ctx?.beginEdit(id)}
        >
            <Handle type="target" position={rtl ? Position.Right : Position.Left} />
            {editing ? (
                <input
                    className="bd-edit nodrag"
                    value={val}
                    autoFocus
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") ctx?.endEdit();
                    }}
                />
            ) : (
                <span className="bd-tf-label">{data.label}</span>
            )}
            {rtl && <span className="bd-tf-fb-tag">fb</span>}
            <Handle type="source" position={rtl ? Position.Left : Position.Right} />
        </div>
    );
};

// which side each summing input sits on, cycled by index (0→left, 1→bottom, 2→top…)
const SUM_SIDES = ["left", "bottom", "top"];
const inputsOf = (data) =>
    data.inputs ||
    (data.signs || ["+", "−"]).map((s, i) => ({ id: `in${i + 1}`, sign: s }));

// a summing junction with any number of signed inputs. Click a ± to flip it;
// context menu adds / removes input points.
const SummingJunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const inputs = inputsOf(data);
    const groups = { left: [], bottom: [], top: [] };
    inputs.forEach((inp, i) => groups[SUM_SIDES[i % 3]].push({ ...inp, i }));

    const render = (side, arr) =>
        arr.map((inp, order) => {
            const frac = ((order + 1) / (arr.length + 1)) * 100;
            let hStyle;
            let sStyle;
            let position;
            if (side === "left") {
                position = Position.Left;
                hStyle = { top: `${frac}%` };
                sStyle = { top: `${frac}%`, left: "-15px", transform: "translateY(-50%)" };
            } else if (side === "bottom") {
                position = Position.Bottom;
                hStyle = { left: `${frac}%` };
                sStyle = { left: `${frac}%`, bottom: "-16px", transform: "translateX(-50%)" };
            } else {
                position = Position.Top;
                hStyle = { left: `${frac}%` };
                sStyle = { left: `${frac}%`, top: "-16px", transform: "translateX(-50%)" };
            }
            return (
                <React.Fragment key={inp.id}>
                    <Handle id={inp.id} type="target" position={position} style={hStyle} />
                    <span
                        className="bd-sum-sign nodrag"
                        style={sStyle}
                        onClick={() => ctx?.toggleSign(id, inp.i)}
                    >
                        {inp.sign}
                    </span>
                </React.Fragment>
            );
        });

    return (
        <div className="bd-node bd-sum">
            {render("left", groups.left)}
            {render("bottom", groups.bottom)}
            {render("top", groups.top)}
            <Handle type="source" position={Position.Right} />
            <span className="bd-sum-glyph">Σ</span>
        </div>
    );
};

// a takeoff / branch point — one input, and any number of outgoing branches
const TakeoffNode = ({ data }) => {
    const branches = data.branches || [];
    return (
        <div className="bd-node bd-takeoff">
            <Handle type="target" position={Position.Left} />
            <Handle id="out" type="source" position={Position.Right} />
            <Handle id="down" type="source" position={Position.Bottom} />
            {branches.map((bid, i) => {
                const frac = ((i + 1) / (branches.length + 1)) * 100;
                return (
                    <Handle
                        key={bid}
                        id={bid}
                        type="source"
                        position={Position.Top}
                        style={{ left: `${frac}%` }}
                    />
                );
            })}
        </div>
    );
};

// an input / output signal label. Double-click (or context menu) to rename.
const IONode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const editing = ctx?.editingId === id;
    const [val, setVal] = useState(data.label);
    useEffect(() => {
        if (editing) setVal(data.label);
    }, [editing, data.label]);
    const commit = () => {
        ctx?.updateNodeLabel(id, val.trim() || data.label);
        ctx?.endEdit();
    };
    return (
        <div
            className={`bd-node bd-io bd-io--${data.kind}`}
            onDoubleClick={() => ctx?.beginEdit(id)}
        >
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
                        if (e.key === "Escape") ctx?.endEdit();
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
    sum: () => ({ inputs: [{ id: "in1", sign: "+" }, { id: "in2", sign: "−" }] }),
    takeoff: () => ({ branches: [] }),
    "io-in": () => ({ label: "U(s)", kind: "input" }),
    "io-out": () => ({ label: "Y(s)", kind: "output" }),
};

const ADD_TOOLS = [
    { kind: "tf", label: "Block", title: "Transfer-function block  G(s)", icon: <IcoBlock /> },
    { kind: "sum", label: "Sum", title: "Summing junction  Σ", icon: <IcoSum /> },
    { kind: "takeoff", label: "Takeoff", title: "Takeoff / branch point", icon: <IcoTakeoff /> },
    { kind: "io-in", label: "Input", title: "Input signal  R(s)", icon: <IcoInput /> },
    { kind: "io-out", label: "Output", title: "Output signal  C(s)", icon: <IcoOutput /> },
];

const BlockDiagramFlowInner = ({ editable = true, diagram }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [nodes, setNodes, onNodesChange] = useNodesState(
        diagram?.nodes || sampleNodes
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState(
        diagram?.edges || sampleEdges
    );
    const [editingId, setEditingId] = useState(null);
    const [menu, setMenu] = useState(null); // right-click context menu
    const [labelEdit, setLabelEdit] = useState(null); // edge-label popover
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
        setMenu(null);
        const t = setTimeout(() => {
            try {
                fitView({ padding: 0.22, duration: 250 });
            } catch (e) {
                /* canvas not ready yet */
            }
        }, 90);
        return () => clearTimeout(t);
    }, [diagram, setNodes, setEdges, fitView]);

    const closeMenu = useCallback(() => setMenu(null), []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const flowPos = useCallback(
        (clientX, clientY) => {
            if (clientX != null) return screenToFlowPosition({ x: clientX, y: clientY });
            const wrap = wrapperRef.current;
            if (wrap) {
                const r = wrap.getBoundingClientRect();
                return screenToFlowPosition({
                    x: r.left + r.width / 2,
                    y: r.top + r.height / 2,
                });
            }
            return { x: 120, y: 120 };
        },
        [screenToFlowPosition]
    );

    const addNode = useCallback(
        (kind, clientX, clientY) => {
            const id = `n${nextId.current++}`;
            const type = kind.startsWith("io") ? "io" : kind;
            const position = flowPos(clientX, clientY);
            if (clientX == null) {
                position.x += (nextId.current % 5) * 18;
                position.y += (nextId.current % 5) * 18;
            }
            setNodes((nds) =>
                nds.concat({ id, type, position, data: NEW_NODE_DATA[kind]() })
            );
        },
        [flowPos, setNodes]
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
        setTimeout(() => {
            try {
                fitView({ padding: 0.22, duration: 250 });
            } catch (e) {
                /* ignore */
            }
        }, 60);
    }, [setNodes, setEdges, fitView]);

    const exportJSON = useCallback(() => {
        const clean = {
            nodes: nodes.map(({ id, type, position, data }) => ({
                id,
                type,
                position,
                data,
            })),
            edges: edges.map(
                ({ id, source, target, sourceHandle, targetHandle, label, animated }) => ({
                    id,
                    source,
                    target,
                    sourceHandle,
                    targetHandle,
                    label,
                    animated,
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

    /* ---- node mutations used by the context menu ---- */
    const patchNode = useCallback(
        (id, fn) =>
            setNodes((nds) =>
                nds.map((n) => (n.id === id ? { ...n, ...fn(n) } : n))
            ),
        [setNodes]
    );

    const duplicateNode = useCallback(
        (id) => {
            const n = nodes.find((x) => x.id === id);
            if (!n) return;
            const nid = `n${nextId.current++}`;
            setNodes((nds) =>
                nds
                    .map((x) => ({ ...x, selected: false }))
                    .concat({
                        ...n,
                        id: nid,
                        selected: true,
                        position: { x: n.position.x + 44, y: n.position.y + 44 },
                        data: { ...n.data },
                    })
            );
        },
        [nodes, setNodes]
    );

    const flipTf = useCallback(
        (id) =>
            patchNode(id, (n) => ({
                data: { ...n.data, flow: n.data.flow === "rtl" ? undefined : "rtl" },
            })),
        [patchNode]
    );

    const switchIO = useCallback(
        (id) =>
            patchNode(id, (n) => ({
                data: {
                    ...n.data,
                    kind: n.data.kind === "input" ? "output" : "input",
                },
            })),
        [patchNode]
    );

    const addSumInput = useCallback(
        (id) =>
            patchNode(id, (n) => {
                const base = inputsOf(n.data);
                const used = base.map((i) => parseInt(i.id.replace("in", ""), 10));
                const nid = `in${Math.max(0, ...used) + 1}`;
                const { signs, ...rest } = n.data;
                return { data: { ...rest, inputs: [...base, { id: nid, sign: "+" }] } };
            }),
        [patchNode]
    );

    const removeSumInput = useCallback(
        (id) =>
            patchNode(id, (n) => {
                const base = inputsOf(n.data);
                if (base.length <= 1) return {};
                const { signs, ...rest } = n.data;
                return { data: { ...rest, inputs: base.slice(0, -1) } };
            }),
        [patchNode]
    );

    const addBranch = useCallback(
        (id) =>
            patchNode(id, (n) => {
                const b = n.data.branches || [];
                const used = b.map((x) => parseInt(x.replace("b", ""), 10));
                const nid = `b${Math.max(0, ...used) + 1}`;
                return { data: { ...n.data, branches: [...b, nid] } };
            }),
        [patchNode]
    );

    const removeBranch = useCallback(
        (id) =>
            patchNode(id, (n) => {
                const b = n.data.branches || [];
                if (!b.length) return {};
                return { data: { ...n.data, branches: b.slice(0, -1) } };
            }),
        [patchNode]
    );

    const toggleEdgeAnimated = useCallback(
        (id) =>
            setEdges((eds) =>
                eds.map((e) => (e.id === id ? { ...e, animated: !e.animated } : e))
            ),
        [setEdges]
    );

    const commitEdgeLabel = useCallback(
        (id, label) =>
            setEdges((eds) =>
                eds.map((e) => (e.id === id ? { ...e, label } : e))
            ),
        [setEdges]
    );

    const ctxValue = useMemo(
        () => ({
            editable,
            editingId,
            beginEdit: (id) => editable && setEditingId(id),
            endEdit: () => setEditingId(null),
            updateNodeLabel: (id, label) =>
                setNodes((nds) =>
                    nds.map((n) =>
                        n.id === id ? { ...n, data: { ...n.data, label } } : n
                    )
                ),
            toggleSign: (id, idx) => {
                if (!editable) return;
                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id !== id) return n;
                        const base = inputsOf(n.data).map((inp, i) =>
                            i === idx
                                ? { ...inp, sign: inp.sign === "+" ? "−" : "+" }
                                : inp
                        );
                        const { signs, ...rest } = n.data;
                        return { ...n, data: { ...rest, inputs: base } };
                    })
                );
            },
        }),
        [editable, editingId, setNodes]
    );

    /* ---- context-menu wiring ---- */
    const openMenu = useCallback(
        (kind, id, nodeType, event) => {
            if (!editable) return;
            event.preventDefault();
            const r = wrapperRef.current.getBoundingClientRect();
            setLabelEdit(null);
            setMenu({
                kind,
                id,
                nodeType,
                clientX: event.clientX,
                clientY: event.clientY,
                top: Math.min(event.clientY - r.top, r.height - 200),
                left: Math.min(event.clientX - r.left, r.width - 190),
            });
        },
        [editable]
    );

    const onNodeContextMenu = useCallback(
        (e, node) => openMenu("node", node.id, node.type, e),
        [openMenu]
    );
    const onEdgeContextMenu = useCallback(
        (e, edge) => openMenu("edge", edge.id, null, e),
        [openMenu]
    );
    const onPaneContextMenu = useCallback(
        (e) => openMenu("pane", null, null, e),
        [openMenu]
    );

    const beginEdgeLabelEdit = useCallback(
        (id, clientX, clientY) => {
            const r = wrapperRef.current.getBoundingClientRect();
            const edge = edges.find((x) => x.id === id);
            setLabelEdit({
                id,
                value: edge?.label || "",
                top: clientY - r.top,
                left: clientX - r.left,
            });
        },
        [edges]
    );

    // build the item list for whatever was right-clicked
    const menuItems = useMemo(() => {
        if (!menu) return [];
        const del = (targets) => () => deleteElements(targets);
        if (menu.kind === "pane") {
            return [
                { label: "Add block  G(s)", icon: <IcoBlock />, run: () => addNode("tf", menu.clientX, menu.clientY) },
                { label: "Add summing  Σ", icon: <IcoSum />, run: () => addNode("sum", menu.clientX, menu.clientY) },
                { label: "Add takeoff", icon: <IcoTakeoff />, run: () => addNode("takeoff", menu.clientX, menu.clientY) },
                { sep: true },
                { label: "Fit view", icon: <IcoFit />, run: () => fitView({ padding: 0.22, duration: 250 }) },
            ];
        }
        if (menu.kind === "edge") {
            const edge = edges.find((x) => x.id === menu.id);
            return [
                { label: "Edit label", run: () => beginEdgeLabelEdit(menu.id, menu.clientX, menu.clientY) },
                {
                    label: edge?.animated ? "Stop signal flow" : "Animate signal flow",
                    run: () => toggleEdgeAnimated(menu.id),
                },
                { sep: true },
                { label: "Delete link", danger: true, icon: <IcoDelete />, run: del({ edges: [{ id: menu.id }] }) },
            ];
        }
        // node
        const node = nodes.find((x) => x.id === menu.id);
        const common = [
            { label: "Duplicate", run: () => duplicateNode(menu.id) },
            { sep: true },
            { label: "Delete", danger: true, icon: <IcoDelete />, run: del({ nodes: [{ id: menu.id }] }) },
        ];
        if (menu.nodeType === "tf") {
            return [
                { label: "Rename…", run: () => setEditingId(menu.id) },
                {
                    label: node?.data.flow === "rtl" ? "Make forward (→)" : "Make feedback (←)",
                    run: () => flipTf(menu.id),
                },
                ...common,
            ];
        }
        if (menu.nodeType === "sum") {
            const count = inputsOf(node?.data || {}).length;
            return [
                { label: "Add input point", run: () => addSumInput(menu.id) },
                { label: "Remove input point", disabled: count <= 1, run: () => removeSumInput(menu.id) },
                ...common,
            ];
        }
        if (menu.nodeType === "takeoff") {
            const count = (node?.data.branches || []).length;
            return [
                { label: "Add branch point", run: () => addBranch(menu.id) },
                { label: "Remove branch point", disabled: count === 0, run: () => removeBranch(menu.id) },
                ...common,
            ];
        }
        if (menu.nodeType === "io") {
            return [
                { label: "Rename…", run: () => setEditingId(menu.id) },
                {
                    label: node?.data.kind === "input" ? "Make output" : "Make input",
                    run: () => switchIO(menu.id),
                },
                ...common,
            ];
        }
        return common;
    }, [
        menu,
        nodes,
        edges,
        addNode,
        fitView,
        deleteElements,
        beginEdgeLabelEdit,
        toggleEdgeAnimated,
        duplicateNode,
        flipTf,
        addSumInput,
        removeSumInput,
        addBranch,
        removeBranch,
        switchIO,
    ]);

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
            <div className="bd-shell">
                {editable && (
                    <div className="bd-palette">
                        <div className="bd-palette-group">
                            {ADD_TOOLS.map((t) => (
                                <Tooltip key={t.kind} title={t.title} placement="right" arrow>
                                    <button
                                        type="button"
                                        className="bd-tool"
                                        onClick={() => addNode(t.kind)}
                                    >
                                        {t.icon}
                                        <span>{t.label}</span>
                                    </button>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="bd-palette-sep" />
                        <div className="bd-palette-group">
                            <Tooltip title="Delete selected  (Del)" placement="right" arrow>
                                <button type="button" className="bd-tool bd-tool--danger" onClick={deleteSelected}>
                                    <IcoDelete />
                                    <span>Delete</span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Fit diagram to view" placement="right" arrow>
                                <button type="button" className="bd-tool" onClick={() => fitView({ padding: 0.22, duration: 250 })}>
                                    <IcoFit />
                                    <span>Fit</span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Reset to sample diagram" placement="right" arrow>
                                <button type="button" className="bd-tool" onClick={reset}>
                                    <IcoReset />
                                    <span>Reset</span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Export diagram as JSON" placement="right" arrow>
                                <button type="button" className="bd-tool" onClick={exportJSON}>
                                    <IcoExport />
                                    <span>Export</span>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                )}

                <div
                    ref={wrapperRef}
                    className={`bd-flow ${editable ? "bd-flow--edit" : "bd-flow--view"}`}
                    style={{
                        height: 460,
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
                            onNodeContextMenu={onNodeContextMenu}
                            onEdgeContextMenu={onEdgeContextMenu}
                            onPaneContextMenu={onPaneContextMenu}
                            onEdgeDoubleClick={(e, edge) =>
                                editable && beginEdgeLabelEdit(edge.id, e.clientX, e.clientY)
                            }
                            onPaneClick={() => {
                                closeMenu();
                                setLabelEdit(null);
                            }}
                            onNodeClick={closeMenu}
                            onEdgeClick={closeMenu}
                            onMoveStart={closeMenu}
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

                    {menu && (
                        <ul
                            className="bd-ctx"
                            style={{ top: menu.top, left: menu.left }}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {menuItems.map((it, i) =>
                                it.sep ? (
                                    <li key={`sep${i}`} className="bd-ctx-sep" />
                                ) : (
                                    <li
                                        key={it.label}
                                        className={`bd-ctx-item${it.danger ? " bd-ctx-item--danger" : ""}${
                                            it.disabled ? " bd-ctx-item--disabled" : ""
                                        }`}
                                        onClick={() => {
                                            if (it.disabled) return;
                                            it.run();
                                            closeMenu();
                                        }}
                                    >
                                        {it.icon && <span className="bd-ctx-ico">{it.icon}</span>}
                                        <span>{it.label}</span>
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                    {labelEdit && (
                        <input
                            className="bd-label-edit"
                            style={{ top: labelEdit.top, left: labelEdit.left }}
                            defaultValue={labelEdit.value}
                            autoFocus
                            placeholder="link label"
                            onBlur={(e) => {
                                commitEdgeLabel(labelEdit.id, e.target.value);
                                setLabelEdit(null);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    commitEdgeLabel(labelEdit.id, e.target.value);
                                    setLabelEdit(null);
                                }
                                if (e.key === "Escape") setLabelEdit(null);
                            }}
                        />
                    )}
                </div>
            </div>

            {editable && (
                <div className="bd-hint">
                    Click a palette tool to drop a shape · double-click a block or label
                    to rename · double-click a link to label it · right-click anything
                    for actions · drag between dots to connect
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
