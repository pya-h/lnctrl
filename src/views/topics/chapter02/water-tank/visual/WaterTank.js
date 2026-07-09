import React from "react";
import "./WaterTank.css";
import SubCard from "views/ui-component/cards/SubCard";
import { Button, Stack } from "@mui/material";

const TINY = 1e-4;
const DROP_COUNT = 6;

// map a flow rate (m^3/s) to an animation duration: higher flow => faster => smaller duration
const flowDuration = (q) => Math.min(2.6, Math.max(0.3, 1.2 / (q + 0.4)));

class VisualWaterTank extends React.Component {
    state = {
        waterLevel: 0, // % of tank height (0..100)
        currentH: 0, // current water height h(t)
        running: false,
        timerID: null,
    };

    constructor(props) {
        super(props);
        this.i = 0;
    }

    componentDidMount() {
        this.resetToInitial();
    }

    componentDidUpdate(prevProps) {
        // keep the idle preview in sync when the user tweaks parameters while stopped
        if (
            !this.state.running &&
            (prevProps.y !== this.props.y || prevProps.max !== this.props.max)
        )
            this.resetToInitial();
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    levelOf = (h) => {
        const { max } = this.props;
        return max ? Math.max(0, Math.min(100, (100 * h) / max)) : 0;
    };

    resetToInitial = () => {
        const { y } = this.props;
        const h0 = y && y.length ? y[0] : 0;
        this.i = 0;
        this.setState({ currentH: h0, waterLevel: this.levelOf(h0) });
    };

    startSimulation = () => {
        const { dt, y } = this.props;
        if (!y || !y.length) return;
        clearInterval(this.state.timerID);
        this.i = 0;
        const timerID = setInterval(() => {
            if (this.i >= y.length - 1) {
                clearInterval(timerID);
                this.setState({ running: false, timerID: null });
                return;
            }
            this.i++;
            const h = y[this.i];
            this.setState({ currentH: h, waterLevel: this.levelOf(h) });
        }, Math.max(16, dt * 1000));
        this.setState({ timerID, running: true });
    };

    stopSimulation = () => {
        clearInterval(this.state.timerID);
        this.setState({ running: false, timerID: null });
        this.resetToInitial();
    };

    render() {
        const { R, Qin } = this.props;
        const { waterLevel, currentH } = this.state;

        const qIn = Math.max(0, +Qin || 0); // inflow rate
        const qOut = +R > 0 ? Math.max(0, currentH / +R) : 0; // outflow through the valve: h / R

        const inActive = qIn > TINY;
        const outActive = qOut > TINY && waterLevel > 0.5;
        const inDur = `${flowDuration(qIn).toFixed(2)}s`;
        const outDur = `${flowDuration(qOut).toFixed(2)}s`;

        const drops = inActive
            ? Array.from({ length: DROP_COUNT }).map((_, k) => (
                  <span
                      key={k}
                      className="wt-drop"
                      style={{
                          animationDuration: inDur,
                          animationDelay: `${(
                              (k * flowDuration(qIn)) /
                              DROP_COUNT
                          ).toFixed(2)}s`,
                      }}
                  />
              ))
            : null;

        return (
            <SubCard sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={this.stopSimulation}
                    >
                        Stop
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.startSimulation}
                    >
                        Start
                    </Button>
                </Stack>

                <div className="wt-scene">
                    <div className="wt-stage">
                        {/* inlet faucet + falling drops (rate ∝ Qin) */}
                        <div className="wt-inlet">
                            <div className="wt-inlet-pipe" />
                        </div>
                        <div className="wt-drops">{drops}</div>

                        {/* the glass tank */}
                        <div className="wt-tank">
                            <div
                                className="wt-water"
                                style={{ height: `${waterLevel}%` }}
                            >
                                <div className="wt-surface" />
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

                        {/* outlet pipe + valve + draining stream (rate ∝ h/R) */}
                        <div className="wt-outlet">
                            <div className="wt-outlet-pipe" />
                            <div className="wt-valve" />
                        </div>
                        <div
                            className={`wt-stream${outActive ? " is-active" : ""}`}
                            style={{ animationDuration: outDur }}
                        />
                    </div>
                </div>
            </SubCard>
        );
    }
}

export default VisualWaterTank;
