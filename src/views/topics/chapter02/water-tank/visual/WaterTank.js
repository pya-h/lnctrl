import React, { useState, useRef, useEffect, useCallback } from "react";
import "./WaterTank.css";
import SubCard from "views/ui-component/cards/SubCard";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TINY = 1e-4;
const SHOWER_X = [-15, -8, 0, 8, 15]; // horizontal offsets of the shower streamlets
const JET_COUNT = 8; // droplets forming the outlet jet

// map a flow rate (m^3/s) to an animation duration: higher flow => faster => smaller duration
const flowDuration = (q) => Math.min(1.8, Math.max(0.34, 0.9 / (q + 0.5)));

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const VisualWaterTank = ({ dt, y, max, R, Qin }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [waterLevel, setWaterLevel] = useState(0); // % of tank height
    const [currentH, setCurrentH] = useState(0); // current water height h(t)
    const [running, setRunning] = useState(false);

    const timer = useRef(null);
    const idx = useRef(0);

    const levelOf = useCallback(
        (h) => (max ? clamp((100 * h) / max, 0, 100) : 0),
        [max]
    );

    const resetToInitial = useCallback(() => {
        const h0 = y && y.length ? y[0] : 0;
        idx.current = 0;
        setCurrentH(h0);
        setWaterLevel(levelOf(h0));
    }, [y, levelOf]);

    // keep the idle preview in sync when parameters change while stopped
    useEffect(() => {
        if (!running) resetToInitial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [y, max]);

    // cleanup on unmount
    useEffect(() => () => clearInterval(timer.current), []);

    const start = () => {
        if (!y || !y.length) return;
        clearInterval(timer.current);
        idx.current = 0;
        setRunning(true);
        timer.current = setInterval(() => {
            if (idx.current >= y.length - 1) {
                clearInterval(timer.current);
                setRunning(false);
                return;
            }
            idx.current++;
            const h = y[idx.current];
            setCurrentH(h);
            setWaterLevel(levelOf(h));
        }, Math.max(16, dt * 1000));
    };

    const stop = () => {
        clearInterval(timer.current);
        setRunning(false);
        resetToInitial();
    };

    const qIn = Math.max(0, +Qin || 0); // inflow rate
    const qOut = +R > 0 ? Math.max(0, currentH / +R) : 0; // outflow through valve: h / R

    // flows are only alive while the simulation runs
    const showerOn = running && qIn > TINY;
    const jetOn = running && qOut > TINY && waterLevel > 0.5;

    const inDur = flowDuration(qIn);
    const outDur = flowDuration(qOut);

    // higher outflow => the jet shoots farther and falls faster (more pressure)
    const jetReach = Math.round(10 + Math.min(58, qOut * 130));
    const jetStyle = {
        "--reach": `${jetReach}px`,
        "--drop": "86px",
        animationDuration: `${outDur.toFixed(2)}s`,
    };

    return (
        <SubCard sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={stop}
                    sx={{
                        color: isDark ? "secondary.light" : "secondary.main",
                        borderColor: isDark
                            ? "secondary.light"
                            : "secondary.main",
                        "&:hover": {
                            borderColor: isDark
                                ? "secondary.light"
                                : "secondary.dark",
                            backgroundColor: isDark
                                ? "rgba(179,157,219,0.10)"
                                : undefined,
                        },
                    }}
                >
                    Stop
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={start}
                >
                    Start
                </Button>
            </Stack>

            <div className="wt-scene">
                <div className="wt-stage">
                    {/* ---- inlet: raised shower head + falling shower (rate ∝ Qin) ---- */}
                    <div className="wt-showerhead" />
                    <div className="wt-shower">
                        {showerOn &&
                            SHOWER_X.map((dx, k) => (
                                <span
                                    key={k}
                                    className="wt-shower-drop"
                                    style={{
                                        "--dx": `${dx}px`,
                                        animationDuration: `${inDur.toFixed(
                                            2
                                        )}s`,
                                        animationDelay: `${(
                                            (k * inDur) /
                                            SHOWER_X.length
                                        ).toFixed(2)}s`,
                                    }}
                                />
                            ))}
                    </div>

                    {/* ---- glass tank ---- */}
                    <div className="wt-tank">
                        <div
                            className={`wt-water${running ? " is-running" : ""}`}
                            style={{ height: `${waterLevel}%` }}
                        >
                            <div className="wt-surface" />
                            {showerOn && (
                                <>
                                    <span className="wt-ripple" />
                                    <span
                                        className="wt-ripple"
                                        style={{ animationDelay: "0.7s" }}
                                    />
                                </>
                            )}
                        </div>
                        <ul className="wt-scale">
                            {[80, 60, 40, 20].map((t) => (
                                <li key={t} style={{ bottom: `${t}%` }} />
                            ))}
                        </ul>
                        <div className="wt-readout">
                            h = {(currentH || 0).toFixed(2)} m
                        </div>
                    </div>

                    {/* ---- outlet: tap valve + parabolic jet (rate ∝ h/R) ---- */}
                    <div className="wt-outlet">
                        <div className="wt-outlet-pipe" />
                        <div className="wt-tap">
                            <span className="wt-tap-handle" />
                            <span className="wt-tap-nozzle" />
                        </div>
                    </div>
                    <div className="wt-jet">
                        {jetOn &&
                            Array.from({ length: JET_COUNT }).map((_, k) => (
                                <span
                                    key={k}
                                    className="wt-jet-drop"
                                    style={{
                                        ...jetStyle,
                                        animationDelay: `${(
                                            (k * outDur) /
                                            JET_COUNT
                                        ).toFixed(2)}s`,
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </SubCard>
    );
};

export default VisualWaterTank;
