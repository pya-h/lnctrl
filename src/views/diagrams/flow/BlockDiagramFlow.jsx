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
    SelectionMode,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    useUpdateNodeInternals,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "@mui/material/styles";
import {
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import SubCard from "views/ui-component/cards/SubCard";
import { computeEquivalent } from "./blockDiagramReduce";
import { applyScripts } from "./blockDiagramText";
import "./blockDiagram.css";

// lets custom nodes mutate themselves without embedding callbacks in node data,
// which keeps node data serializable for export
const EditorCtx = createContext(null);

/* ---------- palette / menu icons ---------- */
const IcoBlock = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M1 12h3M20 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const IcoGain = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M6 4l13 8-13 8V4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M1 12h5M19 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
const IcoCopy = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
);
const IcoCut = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="6" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 8.4l12 8M8 15.6l12-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);
const IcoPaste = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="5" y="5" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);
const IcoGroup = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2.5" />
    </svg>
);
const IcoEquiv = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

/* ---------- custom control-notation nodes ---------- */

// G(s) block; data.flow === "rtl" mirrors it onto a feedback branch
const TransferFunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const updateNodeInternals = useUpdateNodeInternals();
    const rtl = data.flow === "rtl";
    // flipping moves the handles to the opposite sides — refresh cached bounds
    useEffect(() => updateNodeInternals(id), [id, rtl, updateNodeInternals]);
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

// triangular gain element: multiplies the passing signal by k
const GainNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const updateNodeInternals = useUpdateNodeInternals();
    const rtl = data.flow === "rtl";
    useEffect(() => updateNodeInternals(id), [id, rtl, updateNodeInternals]);
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
            className={`bd-node bd-gain${rtl ? " bd-gain--fb" : ""}`}
            onDoubleClick={() => ctx?.beginEdit(id)}
        >
            <Handle type="target" position={rtl ? Position.Right : Position.Left} />
            <div className="bd-gain-shape">
                {editing ? (
                    <input
                        className="bd-edit bd-edit--gain nodrag"
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
                    <span className="bd-gain-label">{data.label}</span>
                )}
            </div>
            {rtl && <span className="bd-tf-fb-tag bd-tf-fb-tag--gain">fb</span>}
            <Handle type="source" position={rtl ? Position.Left : Position.Right} />
        </div>
    );
};

// side each summing input sits on, cycled by index (0→left, 1→bottom, 2→top…)
const SUM_SIDES = ["left", "bottom", "top"];
const inputsOf = (data) =>
    data.inputs ||
    (data.signs || ["+", "−"]).map((s, i) => ({ id: `in${i + 1}`, sign: s }));

const SummingJunctionNode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const updateNodeInternals = useUpdateNodeInternals();
    const inputs = inputsOf(data);
    const sig = inputs.map((i) => i.id).join(",");
    // adding / removing inputs changes handle count and repositions the rest
    useEffect(() => updateNodeInternals(id), [id, sig, updateNodeInternals]);

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

// takeoff / branch point — one input, any number of outgoing branches
const TakeoffNode = ({ id, data }) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const branches = data.branches || [];
    const bsig = branches.join(",");
    useEffect(() => updateNodeInternals(id), [id, bsig, updateNodeInternals]);
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

const IONode = ({ id, data }) => {
    const ctx = useContext(EditorCtx);
    const updateNodeInternals = useUpdateNodeInternals();
    // switching input↔output swaps the handle side and type
    useEffect(() => updateNodeInternals(id), [id, data.kind, updateNodeInternals]);
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
            {data.kind === "output" && <Handle type="target" position={Position.Left} />}
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
            {data.kind === "input" && <Handle type="source" position={Position.Right} />}
        </div>
    );
};

// dashed frame. A "free" group is a standalone annotation; a "bound" group pins
// the elements inside it (React Flow parent). Only the label bar is interactive
// so inner nodes stay clickable.
const GroupNode = ({ id, data }) => {
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
        <div className={`bd-group bd-group--${data.mode || "free"}`}>
            <div className="bd-group-label" onDoubleClick={() => ctx?.beginEdit(id)}>
                {editing ? (
                    <input
                        className="bd-edit bd-edit--group nodrag"
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
                    data.label || "Group"
                )}
            </div>
        </div>
    );
};

const nodeTypes = {
    tf: TransferFunctionNode,
    gain: GainNode,
    sum: SummingJunctionNode,
    takeoff: TakeoffNode,
    io: IONode,
    group: GroupNode,
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
    gain: () => ({ label: "K" }),
    sum: () => ({ inputs: [{ id: "in1", sign: "+" }, { id: "in2", sign: "−" }] }),
    takeoff: () => ({ branches: [] }),
    "io-in": () => ({ label: "U(s)", kind: "input" }),
    "io-out": () => ({ label: "Y(s)", kind: "output" }),
};

const ADD_TOOLS = [
    { kind: "tf", label: "Block", title: "Transfer-function block  G(s)", icon: <IcoBlock /> },
    { kind: "gain", label: "Gain", title: "Gain element  k  (multiplier)", icon: <IcoGain /> },
    { kind: "sum", label: "Sum", title: "Summing junction  Σ", icon: <IcoSum /> },
    { kind: "takeoff", label: "Takeoff", title: "Takeoff / branch point", icon: <IcoTakeoff /> },
    { kind: "io-in", label: "Input", title: "Input signal  R(s)", icon: <IcoInput /> },
    { kind: "io-out", label: "Output", title: "Output signal  C(s)", icon: <IcoOutput /> },
    { kind: "group", label: "Group", title: "Empty group frame (moves freely)", icon: <IcoGroup /> },
];

const clone = (v) => JSON.parse(JSON.stringify(v));

const BlockDiagramFlowInner = ({ editable = true, diagram }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [nodes, setNodes, onNodesChange] = useNodesState(diagram?.nodes || sampleNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(diagram?.edges || sampleEdges);
    const [editingId, setEditingId] = useState(null);
    const [menu, setMenu] = useState(null);
    const [labelEdit, setLabelEdit] = useState(null);
    const [clip, setClip] = useState(null);
    const [toast, setToast] = useState(null);
    const [sceneHeight, setSceneHeight] = useState(600);
    const [confirm, setConfirm] = useState(null);
    const [equiv, setEquiv] = useState(null);
    const wrapperRef = useRef(null);
    const toastTimer = useRef(null);
    const nextId = useRef(1);
    const { screenToFlowPosition, deleteElements, fitView } = useReactFlow();

    // load an externally supplied diagram (a lecture reduction step) then re-fit once
    // measured. We fit imperatively rather than remounting to avoid churning React
    // Flow's ResizeObserver.
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

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const flash = useCallback((msg) => {
        setToast(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 1600);
    }, []);

    const closeMenu = useCallback(() => setMenu(null), []);

    const isValidConnection = useCallback((c) => c.source !== c.target, []);

    const flowPos = useCallback(
        (clientX, clientY) => {
            if (clientX != null) return screenToFlowPosition({ x: clientX, y: clientY });
            const wrap = wrapperRef.current;
            if (wrap) {
                const r = wrap.getBoundingClientRect();
                return screenToFlowPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
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
            setNodes((nds) => nds.concat({ id, type, position, data: NEW_NODE_DATA[kind]() }));
        },
        [flowPos, setNodes]
    );

    const deleteSelected = useCallback(() => {
        const selNodes = nodes.filter((n) => n.selected);
        const run = () =>
            deleteElements({ nodes: selNodes, edges: edges.filter((e) => e.selected) });
        const bound = selNodes.find((n) => n.type === "group" && n.data?.mode === "bound");
        if (bound) {
            const kids = nodes.filter((n) => n.parentNode === bound.id).length;
            setConfirm({
                message: `Delete this group and its ${kids} pinned item${kids !== 1 ? "s" : ""}?`,
                onYes: run,
            });
            return;
        }
        run();
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
            nodes: nodes.map((n) => {
                const base = { id: n.id, type: n.type, position: n.position, data: n.data };
                if (n.type === "group") return { ...base, style: n.style, zIndex: n.zIndex };
                return base;
            }),
            edges: edges.map(({ id, source, target, sourceHandle, targetHandle, label, animated }) => ({
                id,
                source,
                target,
                sourceHandle,
                targetHandle,
                label,
                animated,
            })),
        };
        const blob = new Blob([JSON.stringify(clean, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "block-diagram.json";
        a.click();
        URL.revokeObjectURL(url);
    }, [nodes, edges]);

    /* ---- node mutations ---- */
    const patchNode = useCallback(
        (id, fn) => setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, ...fn(n) } : n))),
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
                        data: clone(n.data),
                    })
            );
        },
        [nodes, setNodes]
    );

    const flipFlow = useCallback(
        (id) =>
            patchNode(id, (n) => ({
                data: { ...n.data, flow: n.data.flow === "rtl" ? undefined : "rtl" },
            })),
        [patchNode]
    );

    const switchIO = useCallback(
        (id) => {
            patchNode(id, (n) => ({
                data: { ...n.data, kind: n.data.kind === "input" ? "output" : "input" },
            }));
            // the node's single handle flips type and side, so its links no longer apply
            setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
        },
        [patchNode, setEdges]
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
        (id) => {
            const base = inputsOf(nodes.find((n) => n.id === id)?.data || {});
            if (base.length <= 1) return;
            const removed = base[base.length - 1].id;
            patchNode(id, (n) => {
                const { signs, ...rest } = n.data;
                return { data: { ...rest, inputs: inputsOf(n.data).slice(0, -1) } };
            });
            setEdges((eds) => eds.filter((e) => !(e.target === id && e.targetHandle === removed)));
        },
        [nodes, patchNode, setEdges]
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
        (id) => {
            const b = nodes.find((n) => n.id === id)?.data.branches || [];
            if (!b.length) return;
            const removed = b[b.length - 1];
            patchNode(id, (n) => ({
                data: { ...n.data, branches: (n.data.branches || []).slice(0, -1) },
            }));
            setEdges((eds) => eds.filter((e) => !(e.source === id && e.sourceHandle === removed)));
        },
        [nodes, patchNode, setEdges]
    );

    const toggleEdgeAnimated = useCallback(
        (id) =>
            setEdges((eds) => eds.map((e) => (e.id === id ? { ...e, animated: !e.animated } : e))),
        [setEdges]
    );

    const commitEdgeLabel = useCallback(
        (id, label) =>
            setEdges((eds) => eds.map((e) => (e.id === id ? { ...e, label: applyScripts(label) } : e))),
        [setEdges]
    );

    /* ---- clipboard ---- */
    const copyNodes = useCallback(
        (ids, verb = "Copied") => {
            const set = new Set(ids);
            // pinned children store a parent-relative position; copy them as absolute
            // so they paste as free-standing nodes at the right spot
            const abs = (n) => {
                if (!n.parentNode) return { ...n.position };
                const p = nodes.find((x) => x.id === n.parentNode);
                return p
                    ? { x: n.position.x + p.position.x, y: n.position.y + p.position.y }
                    : { ...n.position };
            };
            const ns = nodes
                .filter((n) => set.has(n.id) && n.type !== "group")
                .map((n) => ({ oid: n.id, type: n.type, position: abs(n), data: clone(n.data) }));
            if (!ns.length) return;
            // links are only carried when both endpoints are inside the copied set
            const es = edges
                .filter((e) => set.has(e.source) && set.has(e.target))
                .map((e) => ({ ...e }));
            setClip({ nodes: ns, edges: es });
            flash(`${verb} ${ns.length} item${ns.length > 1 ? "s" : ""}`);
        },
        [nodes, edges, flash]
    );

    const cutNodes = useCallback(
        (ids) => {
            // cut only what copy captures (group frames are never clipboarded), so
            // paste can always restore exactly what was removed
            const copyable = ids.filter((id) => nodes.find((n) => n.id === id)?.type !== "group");
            if (!copyable.length) return;
            copyNodes(copyable, "Cut");
            deleteElements({ nodes: copyable.map((id) => ({ id })) });
        },
        [nodes, copyNodes, deleteElements]
    );

    const paste = useCallback(
        (clientX, clientY) => {
            if (!clip) return;
            const target = flowPos(clientX, clientY);
            const minX = Math.min(...clip.nodes.map((n) => n.position.x));
            const minY = Math.min(...clip.nodes.map((n) => n.position.y));
            const dx = target.x - minX;
            const dy = target.y - minY;
            const idMap = {};
            const newNodes = clip.nodes.map((n) => {
                const id = `n${nextId.current++}`;
                idMap[n.oid] = id;
                return {
                    id,
                    type: n.type,
                    position: { x: n.position.x + dx, y: n.position.y + dy },
                    data: clone(n.data),
                    selected: true,
                };
            });
            const newEdges = clip.edges.map((e) => ({
                ...e,
                id: `e${nextId.current++}`,
                source: idMap[e.source],
                target: idMap[e.target],
                selected: false,
            }));
            setNodes((nds) => nds.map((x) => ({ ...x, selected: false })).concat(newNodes));
            if (newEdges.length) setEdges((eds) => eds.concat(newEdges));
            flash("Pasted");
        },
        [clip, flowPos, setNodes, setEdges, flash]
    );

    /* ---- grouping ---- */
    // free frame: pure annotation, pins nothing, moves on its own
    const addEmptyGroup = useCallback(
        (clientX, clientY) => {
            const p = flowPos(clientX, clientY);
            const w = 240;
            const h = 160;
            const id = `grp${nextId.current++}`;
            setNodes((nds) => [
                {
                    id,
                    type: "group",
                    position: { x: p.x - w / 2, y: p.y - h / 2 },
                    data: { label: "Group", mode: "free" },
                    style: { width: w, height: h },
                    zIndex: -1,
                },
                ...nds.map((n) => ({ ...n, selected: false })),
            ]);
            flash("Group added");
        },
        [flowPos, setNodes, flash]
    );

    // bound frame: pins the selected elements as React Flow children so the group
    // moves them and `extent: parent` keeps them inside
    const groupSelected = useCallback(() => {
        const sel = nodes.filter((n) => n.selected && n.type !== "group" && !n.parentNode);
        if (!sel.length) return;
        const pad = 30;
        const left = Math.min(...sel.map((n) => n.position.x)) - pad;
        const top = Math.min(...sel.map((n) => n.position.y)) - pad - 14;
        const right = Math.max(...sel.map((n) => n.position.x + (n.width || 72))) + pad;
        const bottom = Math.max(...sel.map((n) => n.position.y + (n.height || 46))) + pad;
        const id = `grp${nextId.current++}`;
        const selIds = new Set(sel.map((n) => n.id));
        setNodes((nds) => {
            const group = {
                id,
                type: "group",
                position: { x: left, y: top },
                data: { label: "Group", mode: "bound" },
                style: { width: right - left, height: bottom - top },
                zIndex: -1,
            };
            // parent must precede its children in the array
            const rest = nds.map((n) =>
                selIds.has(n.id)
                    ? {
                          ...n,
                          selected: false,
                          parentNode: id,
                          extent: "parent",
                          position: { x: n.position.x - left, y: n.position.y - top },
                      }
                    : { ...n, selected: false }
            );
            return [group, ...rest];
        });
        flash("Grouped");
    }, [nodes, setNodes, flash]);

    // release pinned children back to absolute coordinates, then drop the frame
    const ungroup = useCallback(
        (groupId) => {
            setNodes((nds) => {
                const g = nds.find((n) => n.id === groupId);
                if (!g) return nds;
                const { x: gx, y: gy } = g.position;
                return nds
                    .filter((n) => n.id !== groupId)
                    .map((n) => {
                        if (n.parentNode !== groupId) return n;
                        const { parentNode, extent, ...rest } = n;
                        return {
                            ...rest,
                            selected: false,
                            position: { x: n.position.x + gx, y: n.position.y + gy },
                        };
                    });
            });
            flash("Ungrouped");
        },
        [setNodes, flash]
    );

    // pull a free node into a bound group, growing the frame to contain it and
    // keeping every child's on-screen position fixed
    const attachToGroup = useCallback(
        (nodeId, groupId) => {
            setNodes((nds) => {
                const group = nds.find((n) => n.id === groupId);
                const node = nds.find((n) => n.id === nodeId);
                if (!group || !node || node.parentNode) return nds;
                const gx = group.position.x;
                const gy = group.position.y;
                const abs = (n) =>
                    n.parentNode === groupId ? { x: n.position.x + gx, y: n.position.y + gy } : { ...n.position };
                const members = nds.filter((n) => n.parentNode === groupId).concat(node);
                const pad = 30;
                const left = Math.min(...members.map((n) => abs(n).x)) - pad;
                const top = Math.min(...members.map((n) => abs(n).y)) - pad - 14;
                const right = Math.max(...members.map((n) => abs(n).x + (n.width || 72))) + pad;
                const bottom = Math.max(...members.map((n) => abs(n).y + (n.height || 46))) + pad;
                return nds.map((n) => {
                    if (n.id === groupId)
                        return { ...n, position: { x: left, y: top }, style: { width: right - left, height: bottom - top } };
                    if (n.parentNode === groupId) {
                        const a = abs(n);
                        return { ...n, position: { x: a.x - left, y: a.y - top } };
                    }
                    if (n.id === nodeId)
                        return {
                            ...n,
                            parentNode: groupId,
                            extent: "parent",
                            selected: false,
                            position: { x: node.position.x - left, y: node.position.y - top },
                        };
                    return n;
                });
            });
            flash("Added to group");
        },
        [setNodes, flash]
    );

    // a free node spliced into a bound group's circuit (fed by and feeding the same
    // group) becomes part of that group
    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => addEdge(params, eds));
            const links = [...edges, params];
            [params.source, params.target].forEach((id) => {
                const node = nodes.find((n) => n.id === id);
                if (!node || node.parentNode || node.type === "group") return;
                const from = new Set();
                const to = new Set();
                links.forEach((e) => {
                    if (e.target === id) {
                        const s = nodes.find((n) => n.id === e.source);
                        if (s?.parentNode) from.add(s.parentNode);
                    }
                    if (e.source === id) {
                        const t = nodes.find((n) => n.id === e.target);
                        if (t?.parentNode) to.add(t.parentNode);
                    }
                });
                const shared = [...from].find((g) => to.has(g));
                if (shared) attachToGroup(id, shared);
            });
        },
        [nodes, edges, setEdges, attachToGroup]
    );

    // deleting a bound group takes its pinned children with it
    const onNodesDelete = useCallback(
        (deleted) => {
            const gids = deleted
                .filter((n) => n.type === "group" && n.data?.mode === "bound")
                .map((n) => n.id);
            if (!gids.length) return;
            const kids = nodes
                .filter((n) => gids.includes(n.parentNode))
                .map((n) => ({ id: n.id }));
            if (kids.length) deleteElements({ nodes: kids });
        },
        [nodes, deleteElements]
    );

    const startResize = useCallback(
        (e) => {
            e.preventDefault();
            const startY = e.clientY;
            const startH = sceneHeight;
            const onMove = (ev) =>
                setSceneHeight(Math.max(340, Math.min(1400, startH + (ev.clientY - startY))));
            const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
        },
        [sceneHeight]
    );

    const showEquivalent = useCallback(
        (list) => {
            const res = computeEquivalent(list, edges);
            if (!res.ok) {
                flash(res.reason);
                return;
            }
            setEquiv(res);
        },
        [edges, flash]
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
                        n.id === id ? { ...n, data: { ...n.data, label: applyScripts(label) } } : n
                    )
                ),
            toggleSign: (id, idx) => {
                if (!editable) return;
                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id !== id) return n;
                        const base = inputsOf(n.data).map((inp, i) =>
                            i === idx ? { ...inp, sign: inp.sign === "+" ? "−" : "+" } : inp
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
                top: Math.min(event.clientY - r.top, r.height - 220),
                left: Math.min(event.clientX - r.left, r.width - 190),
            });
        },
        [editable]
    );

    const selectedCount = nodes.filter((n) => n.selected).length;

    const onNodeContextMenu = useCallback(
        (e, node) => {
            if (node.selected && selectedCount > 1) openMenu("group", null, null, e);
            else openMenu("node", node.id, node.type, e);
        },
        [openMenu, selectedCount]
    );
    const onEdgeContextMenu = useCallback((e, edge) => openMenu("edge", edge.id, null, e), [openMenu]);
    const onPaneContextMenu = useCallback((e) => openMenu("pane", null, null, e), [openMenu]);
    const onSelectionContextMenu = useCallback((e) => openMenu("group", null, null, e), [openMenu]);

    const beginEdgeLabelEdit = useCallback(
        (id, clientX, clientY) => {
            const r = wrapperRef.current.getBoundingClientRect();
            const edge = edges.find((x) => x.id === id);
            setLabelEdit({ id, value: edge?.label || "", top: clientY - r.top, left: clientX - r.left });
        },
        [edges]
    );

    const buildMenuItems = () => {
        if (!menu) return [];
        const del = (targets) => () => deleteElements(targets);

        if (menu.kind === "pane") {
            return [
                { label: "Add block  G(s)", icon: <IcoBlock />, run: () => addNode("tf", menu.clientX, menu.clientY) },
                { label: "Add gain  k", icon: <IcoGain />, run: () => addNode("gain", menu.clientX, menu.clientY) },
                { label: "Add summing  Σ", icon: <IcoSum />, run: () => addNode("sum", menu.clientX, menu.clientY) },
                { label: "Add takeoff", icon: <IcoTakeoff />, run: () => addNode("takeoff", menu.clientX, menu.clientY) },
                { label: "Add empty group", icon: <IcoGroup />, run: () => addEmptyGroup(menu.clientX, menu.clientY) },
                { sep: true },
                { label: "Paste", icon: <IcoPaste />, disabled: !clip, run: () => paste(menu.clientX, menu.clientY) },
            ];
        }

        if (menu.kind === "group") {
            const sel = nodes.filter((n) => n.selected);
            const ids = sel.map((n) => n.id);
            return [
                { label: "Copy", icon: <IcoCopy />, run: () => copyNodes(ids) },
                { label: "Cut", icon: <IcoCut />, run: () => cutNodes(ids) },
                { sep: true },
                { label: "Group", icon: <IcoGroup />, run: groupSelected },
                {
                    label: "Equivalent",
                    icon: <IcoEquiv />,
                    disabled: !computeEquivalent(sel, edges).ok,
                    run: () => showEquivalent(sel),
                },
                { sep: true },
                { label: "Delete", danger: true, icon: <IcoDelete />, run: deleteSelected },
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

        // single node
        const node = nodes.find((x) => x.id === menu.id);
        const common = [
            { sep: true },
            { label: "Copy", icon: <IcoCopy />, run: () => copyNodes([menu.id]) },
            { label: "Cut", icon: <IcoCut />, run: () => cutNodes([menu.id]) },
            { label: "Duplicate", run: () => duplicateNode(menu.id) },
            { sep: true },
            { label: "Delete", danger: true, icon: <IcoDelete />, run: del({ nodes: [{ id: menu.id }] }) },
        ];

        if (menu.nodeType === "tf" || menu.nodeType === "gain") {
            return [
                { label: "Rename…", run: () => setEditingId(menu.id) },
                {
                    label: node?.data.flow === "rtl" ? "Make forward (→)" : "Make feedback (←)",
                    run: () => flipFlow(menu.id),
                },
                ...common,
            ];
        }
        if (menu.nodeType === "sum") {
            const inps = inputsOf(node?.data || {});
            return [
                { label: "Add input point", run: () => addSumInput(menu.id) },
                { label: "Remove input point", disabled: inps.length <= 1, run: () => removeSumInput(menu.id) },
                { sep: true },
                ...inps.map((inp, idx) => ({
                    label: `Flip input ${idx + 1} sign  (${inp.sign})`,
                    run: () => ctxValue.toggleSign(menu.id, idx),
                })),
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
        if (menu.nodeType === "group") {
            const bound = node?.data.mode === "bound";
            const kids = nodes.filter((n) => n.parentNode === menu.id).length;
            const items = [{ label: "Rename…", run: () => setEditingId(menu.id) }];
            if (bound) {
                const children = nodes.filter((n) => n.parentNode === menu.id);
                items.push({
                    label: "Equivalent",
                    icon: <IcoEquiv />,
                    disabled: !computeEquivalent(children, edges).ok,
                    run: () => showEquivalent(children),
                });
                items.push({ label: "Ungroup (release items)", run: () => ungroup(menu.id) });
                items.push({ sep: true });
                items.push({
                    label: "Delete group + items",
                    danger: true,
                    icon: <IcoDelete />,
                    run: () =>
                        setConfirm({
                            message: `Delete this group and its ${kids} pinned item${kids !== 1 ? "s" : ""}?`,
                            onYes: () => deleteElements({ nodes: [{ id: menu.id }] }),
                        }),
                });
            } else {
                items.push({ sep: true });
                items.push({
                    label: "Delete",
                    danger: true,
                    icon: <IcoDelete />,
                    run: del({ nodes: [{ id: menu.id }] }),
                });
            }
            return items;
        }
        return common;
    };
    const menuItems = buildMenuItems();

    const edgeColor = isDark ? "#8aa0c8" : "#41527a";
    const defaultEdgeOptions = useMemo(
        () => ({
            type: "smoothstep",
            pathOptions: { borderRadius: 14 },
            markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor, width: 15, height: 15 },
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
                                        onClick={() =>
                                            t.kind === "group" ? addEmptyGroup() : addNode(t.kind)
                                        }
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
                        height: editable ? sceneHeight : 460,
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
                            onNodesDelete={onNodesDelete}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            isValidConnection={isValidConnection}
                            onNodeContextMenu={onNodeContextMenu}
                            onEdgeContextMenu={onEdgeContextMenu}
                            onPaneContextMenu={onPaneContextMenu}
                            onSelectionContextMenu={onSelectionContextMenu}
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
                            selectionOnDrag={editable}
                            selectionMode={SelectionMode.Partial}
                            panOnDrag={editable ? [1] : true}
                            zoomOnScroll={editable}
                            zoomOnDoubleClick={editable}
                            fitView
                            fitViewOptions={{ padding: 0.22 }}
                            minZoom={0.3}
                            proOptions={{ hideAttribution: true }}
                        >
                            <Background gap={18} size={1} color={isDark ? "#28345a" : "#d3dcea"} />
                            <Controls showInteractive={false} />
                            {editable && (
                                <MiniMap
                                    pannable
                                    zoomable
                                    nodeColor={isDark ? "#39456b" : "#c3d2ee"}
                                    maskColor={isDark ? "rgba(10,16,36,0.6)" : "rgba(230,236,245,0.6)"}
                                    style={{ background: isDark ? "#111936" : "#eef2f9" }}
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
                                        key={`item${i}`}
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

                    {toast && <div className="bd-toast">{toast}</div>}
                </div>
            </div>

            {editable && (
                <div
                    className="bd-resize"
                    onMouseDown={startResize}
                    title="Drag to resize the canvas"
                >
                    <span className="bd-resize-grip" />
                </div>
            )}

            {editable && (
                <div className="bd-hint">
                    Left-drag empty space to rubber-band select · middle-drag to pan ·
                    double-click to rename · right-click anything for actions · drag
                    between dots to connect · drag the bar below to resize
                </div>
            )}

            <Dialog open={!!confirm} onClose={() => setConfirm(null)} maxWidth="xs">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{confirm?.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirm(null)}>Cancel</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            confirm?.onYes();
                            setConfirm(null);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={!!equiv} onClose={() => setEquiv(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Equivalent block (block-diagram algebra)</DialogTitle>
                <DialogContent dividers>
                    {equiv?.steps.map((s) => (
                        <Box key={s.title} sx={{ mb: 1.5 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                {s.title}
                            </Typography>
                            <MathJax dynamic>{s.latex}</MathJax>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEquiv(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </SubCard>
    );
};

// ReactFlowProvider lets the inner component use the flow instance
const BlockDiagramFlow = (props) => (
    <ReactFlowProvider>
        <BlockDiagramFlowInner {...props} />
    </ReactFlowProvider>
);

export default BlockDiagramFlow;
