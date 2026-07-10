import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "./WaterTank.css";
import SubCard from "views/ui-component/cards/SubCard";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TINY = 1e-4;
const POOL = 32; // max droplets in each spray cloud

// map a flow rate (m^3/s) to an animation duration: higher flow => faster => smaller duration
const flowDuration = (q) => Math.min(1.8, Math.max(0.32, 0.85 / (q + 0.5)));

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// a stable pool of randomized droplets so a spray looks like an unordered cloud,
// not a single file of evenly-timed drops
const makeCloud = (n) =>
    Array.from({ length: n }, () => ({
        xFrac: Math.random() * 2 - 1, // spread across the stream
        size: 0.55 + Math.random() * 0.75, // varied droplet sizes
        durJitter: 0.75 + Math.random() * 0.6, // varied fall speed
        delayFrac: Math.random(), // desynchronised phase
        reachJitter: 0.78 + Math.random() * 0.5, // jet spread
        dropJitter: 0.82 + Math.random() * 0.36,
    }));

const VisualWaterTank = ({ dt, y, max, R, Qin }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [waterLevel, setWaterLevel] = useState(0); // % of tank height
    const [currentH, setCurrentH] = useState(0); // current water height h(t)
    const [running, setRunning] = useState(false);

    const timer = useRef(null);
    const idx = useRef(0);

    // latest data, so a running simulation always reads fresh values even if
    // parameters change mid-run (avoids a stale-closure inside the interval)
    const latest = useRef({ y, max });
    latest.current = { y, max };

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
            const { y: yy, max: mm } = latest.current;
            if (idx.current >= yy.length - 1) {
                clearInterval(timer.current);
                setRunning(false);
                return;
            }
            idx.current++;
            const h = yy[idx.current];
            setCurrentH(h);
            setWaterLevel(mm ? clamp((100 * h) / mm, 0, 100) : 0);
        }, Math.max(16, dt * 1000));
    };

    const stop = () => {
        clearInterval(timer.current);
        setRunning(false);
        resetToInitial();
    };

    const showerCloud = useMemo(() => makeCloud(POOL), []);
    const jetCloud = useMemo(() => makeCloud(POOL), []);

    const qIn = Math.max(0, +Qin || 0); // inflow rate
    const qOut = +R > 0 ? Math.max(0, currentH / +R) : 0; // outflow through valve: h / R

    // flows are only alive while the simulation runs
    const showerOn = running && qIn > TINY;
    const jetOn = running && qOut > TINY && waterLevel > 0.5;

    const inDur = flowDuration(qIn);
    const outDur = flowDuration(qOut);

    // how many droplets in each cloud is set by the flow rate
    const showerCount = showerOn ? clamp(Math.round(10 + qIn * 90), 8, POOL) : 0;
    const jetCount = jetOn ? clamp(Math.round(9 + qOut * 130), 7, POOL) : 0;

    // higher outflow => the jet shoots farther and falls faster (more pressure)
    const jetReach = 10 + Math.min(60, qOut * 135);

    // left-side gauge: label the height values the tank maps onto
    const meterMax = +max || 0;
    const meterTicks = [0, 25, 50, 75, 100].map((pct) => ({
        pct,
        label: ((meterMax * pct) / 100).toFixed(1),
    }));

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
                    {/* ---- level meter on the left of the tank ---- */}
                    <div className="wt-meter">
                        <div className="wt-meter-track">
                            <div
                                className="wt-meter-fill"
                                style={{ height: `${waterLevel}%` }}
                            />
                        </div>
                        {meterTicks.map((t) => (
                            <div
                                className="wt-meter-tick"
                                key={t.pct}
                                style={{ bottom: `${t.pct}%` }}
                            >
                                <span className="wt-meter-label">{t.label}</span>
                            </div>
                        ))}
                        <div
                            className="wt-meter-pointer"
                            style={{ bottom: `${waterLevel}%` }}
                        />
                    </div>

                    {/* ---- inlet: raised shower head + falling shower (rate ∝ Qin) ---- */}
                    <div className="wt-showerhead" />
                    <div
                        className="wt-shower"
                        style={{
                            "--fall": `calc(var(--tank-top) + var(--tank-h) * ${(
                                100 - waterLevel
                            ).toFixed(1)} / 100 - 1.5rem)`,
                        }}
                    >
                        {showerCloud.slice(0, showerCount).map((pt, k) => (
                            <span
                                key={k}
                                className="wt-shower-drop"
                                style={{
                                    "--dx": `${(pt.xFrac * 24).toFixed(1)}px`,
                                    "--drift": `${(pt.xFrac * 9).toFixed(1)}px`,
                                    "--size": pt.size.toFixed(2),
                                    animationDuration: `${(
                                        inDur * pt.durJitter
                                    ).toFixed(2)}s`,
                                    animationDelay: `${(
                                        pt.delayFrac * inDur
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
                        {jetCloud.slice(0, jetCount).map((pt, k) => (
                            <span
                                key={k}
                                className="wt-jet-drop"
                                style={{
                                    "--reach": `${Math.round(
                                        jetReach * pt.reachJitter
                                    )}px`,
                                    "--drop": `${Math.round(
                                        88 * pt.dropJitter
                                    )}px`,
                                    "--size": pt.size.toFixed(2),
                                    animationDuration: `${(
                                        outDur * pt.durJitter
                                    ).toFixed(2)}s`,
                                    animationDelay: `${(
                                        pt.delayFrac * outDur
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
