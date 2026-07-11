// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import BodePlotParameters from "./parameters";
import TransferFunction from "math/algebra/functions/fraction";
import MainCard from "views/ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { browserLockBreaker } from "toolshed";
import BodePlotExampleLecture from "./lecture";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
const symbols = {
    in: "jw",
    out: "H",
};

class BodePlotExample extends TopicBaseComponent {
    state = {
        topicKey: "ch6-bode-ex",
        K: 1,
        t_a: 0.1,
        t_b: 0.2,
        t_1: 0.3,
        t_2: 0.4,
        t_3: 0.5,
        t_4: 0.6,
        H_s: null,
        w_min: 0,
        w_max: 20,
        // gradiant of u(t) is 0 and unit ramp is one
        systems: [],
        traces: {
            phase: [],
            amplitude: [],
            degreePhase: [],
        },
        response: null,
        thickness: 1.0, // graph line thickness
        isGraphCatured: false,
        is3DPlotEnabled: false,
        phaseInRadianScale: true, // for degree => 180 / PI, for radian scale => 1.0
        N: 1000,
        isAutoPlaying: false,
        autoAmpRange: undefined,
        autoPhaseRange: undefined,
    };

    persistKeys = [
        "K",
        "t_a",
        "t_b",
        "t_1",
        "t_2",
        "t_3",
        "t_4",
        "w_min",
        "w_max",
        "thickness",
        "phaseInRadianScale",
        "N",
    ];

    setAutoPlaying = (value, sweep) => {
        // freeze both charts over the whole sweep, otherwise Plotly keeps rescaling
        // each axis to the current frame and the curves look like they barely move
        let ranges = {};
        try {
            if (value && sweep) ranges = this.autoPlayRanges(sweep);
        } catch (ex) {
            // a range failure must never block the animation from starting
            console.log(ex);
        }
        this.setState({
            isAutoPlaying: value,
            autoAmpRange: ranges.amplitude,
            autoPhaseRange: ranges.phase,
        });
    };

    // walk the swept parameter across its whole travel and fold every frame's
    // magnitude and phase (in the scale currently shown) into one range each, so the
    // frozen frame matches exactly what refreshTraces draws
    autoPlayRanges = ({ key, from, to, step }) => {
        const {
            K,
            t_a,
            t_b,
            t_1,
            t_2,
            t_3,
            t_4,
            w_min,
            w_max,
            N,
            systems,
            phaseInRadianScale,
        } = this.state;
        let ampLo = Infinity,
            ampHi = -Infinity,
            phLo = Infinity,
            phHi = -Infinity;
        const foldAmp = (ys) =>
            ys.forEach((v) => {
                if (v < ampLo) ampLo = v;
                if (v > ampHi) ampHi = v;
            });
        const foldPhase = (ys) =>
            ys.forEach((v) => {
                if (v < phLo) phLo = v;
                if (v > phHi) phHi = v;
            });
        const foldSystem = (h_s) => {
            if (!(h_s instanceof TransferFunction)) return;
            const amp = calculus.systemToTrace(
                h_s.bode,
                +w_min,
                +w_max,
                1,
                "",
                false,
                +N
            ).y;
            let ph = calculus.systemToTrace(
                h_s.phase,
                +w_min,
                +w_max,
                1,
                "",
                false,
                +N
            ).y.map((phi) => (phi - 2 * Math.PI) % (2 * Math.PI));
            if (!phaseInRadianScale)
                ph = ph.map((yi) => yi * calculus.RadianToDegree);
            foldAmp(amp);
            foldPhase(ph);
        };
        // captured systems stay on the plot, so keep them inside the frozen frame
        systems.forEach((e) => foldSystem(e.H_s));
        // the non-swept parameters hold their current value throughout the sweep
        const base = {
            K: +K,
            t_a: +t_a,
            t_b: +t_b,
            t_1: +t_1,
            t_2: +t_2,
            t_3: +t_3,
            t_4: +t_4,
        };
        const foldAt = (value) => {
            const p = { ...base, [key]: value };
            foldSystem(this.buildH_s(p.K, p.t_a, p.t_b, [p.t_1, p.t_2, p.t_3, p.t_4]));
        };
        // sample the sweep at a bounded number of points (each fold is two 1000-point
        // bode/phase passes, so a fine step could otherwise freeze the tab up front);
        // the 5% padded envelope still covers every in-between frame
        const frames = Math.floor(Math.abs((to - from) / step));
        const samples = Math.min(frames, 60);
        if (samples <= 0) {
            foldAt(from);
            foldAt(to);
        } else {
            for (let i = 0; i <= samples; i++)
                foldAt(from + ((to - from) * i) / samples);
        }
        const range = (lo, hi) => {
            if (!isFinite(lo) || !isFinite(hi)) return undefined;
            const pad = (hi - lo) * 0.05 || 1;
            return [lo - pad, hi + pad];
        };
        return {
            amplitude: range(ampLo, ampHi),
            phase: range(phLo, phHi),
        };
    };

    $K = (value) => this.setState({ K: value });
    $t_a = (value) => this.setState({ t_a: value });
    $t_b = (value) => this.setState({ t_b: value });
    $t_1 = (value) => this.setState({ t_1: value });
    $t_2 = (value) => this.setState({ t_2: value });
    $t_3 = (value) => this.setState({ t_3: value });
    $t_4 = (value) => this.setState({ t_4: value });
    $H_s = (value) => this.setState({ H_s: value });
    $w_min = (value) => this.setState({ w_min: value });
    $w_max = (value) => this.setState({ w_max: value });
    $systems = (value) => this.setState({ systems: value });
    $traces = (value) => this.setState({ traces: value });
    $response = (value) => this.setState({ response: value });
    $thickness = (value) => this.setState({ thickness: value });
    $graphCaptured = (value) => this.setState({ isGraphCatured: value });
    setPhaseInRadianScale = (value) =>
        this.setState({ phaseInRadianScale: value });
    $N = (value) => this.setState({ N: value });

    toggle3DPlot = () =>
        this.setState((state) => ({ is3DPlotEnabled: !state.is3DPlotEnabled }));

    capture = () => {
        const { systems, H_s, thickness } = this.state;
        const capturedSystems = [...systems];

        if (capturedSystems.findIndex((sys) => H_s.equals(sys.H)) === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                H_s,
                thickness,
                legend:
                    symbols.out + "_{" + (systems.length + 1).toString() + "}",
            });
            this.setState({
                systems: capturedSystems,
                isGraphCatured: true,
            });
        }
    };

    refreshTraces = () => {
        const {
            H_s,
            systems,
            w_min,
            w_max,
            is3DPlotEnabled,
            thickness,
            N,
        } = this.state;
        // plot
        if (H_s instanceof TransferFunction) {
            (async () => {
                try {
                    this.$response("$$" + H_s.label("H") + "$$");
                    // parameters changed => load again all traces(traces); this is for when shared params changes(ti, tf, ...),
                    // so that the traces will be loaded with new conditions
                    let repeatedSystem = false;
                    const all = {
                        amplitude: Array(systems.length),
                        phase: Array(systems.length),
                        degreePhase: Array(systems.length),
                    };

                    for (let i = 0; i < systems.length; i++) {
                        if (i % 5 === 0) await browserLockBreaker();
                        all.amplitude[i] = calculus.systemToTrace(
                            systems[i].H_s.bode,
                            +w_min,
                            +w_max,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        all.phase[i] = calculus.systemToTrace(
                            systems[i].H_s.phase,
                            +w_min,
                            +w_max,
                            systems[i].thickness,
                            systems[i].legend,
                            is3DPlotEnabled,
                            +N
                        );
                        all.phase[i].y = all.phase[i].y.map(
                            (phi) => (phi - 2 * Math.PI) % (2 * Math.PI)
                        );
                        all.degreePhase[i] = { ...all.phase[i] };
                        all.degreePhase[i].y = all.degreePhase[i].y.map(
                            (yi) => yi * calculus.RadianToDegree
                        );
                        if (H_s.equals(systems[i].H_s)) repeatedSystem = true;
                    }

                    if (!repeatedSystem) {
                        const amp = calculus.systemToTrace(
                                H_s.bode,
                                +w_min,
                                +w_max,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            ),
                            phase = calculus.systemToTrace(
                                H_s.phase,
                                +w_min,
                                +w_max,
                                thickness,
                                `${symbols.out}(${symbols.in})`,
                                is3DPlotEnabled,
                                +N
                            );
                        phase.y = phase.y.map(
                            (phi) => (phi - 2 * Math.PI) % (2 * Math.PI)
                        );
                        const degreePhase = { ...phase };
                        degreePhase.y = degreePhase.y.map(
                            (yi) => yi * calculus.RadianToDegree
                        );
                        all.phase.push(phase);
                        all.degreePhase.push(degreePhase);
                        all.amplitude.push(amp);
                    }
                    this.$traces(all);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    };

    multiplyPlotBy = (value) => {
        const { systems, H_s } = this.state;
        const currentLength = systems.length;
        const multipliedSystem = H_s.multiply(value);
        const newSystemList = systems.filter(
            (sys) => !sys.H_s.equals(multipliedSystem)
        );
        if (newSystemList.length === currentLength) this.capture();
        else this.$systems(newSystemList);
        this.$H_s(multipliedSystem);
    };

    // builds the plant from its gain and time constants; shared by the live refresh
    // and the autoplay range so a swept frame is rebuilt exactly as it's drawn
    buildH_s = (K, t_a, t_b, tau) => {
        const k = +K,
            ta = +t_a,
            tb = +t_b;
        const t = tau.map(Number);

        const num = [k * ta * tb, k * (ta + tb), k],
            den = Array(6).fill(0);
        den[4] = 1;
        den[0] = 1;

        for (let i = 0; i <= 3; i++) {
            den[0] *= t[i];

            for (let j = i + 1; j <= 3; j++) {
                den[2] += t[i] * t[j];
            }

            den[3] += t[i];
        }
        den[1] += (t[0] + t[1]) * t[2] * t[3] + (t[2] + t[3]) * t[0] * t[1];
        return new TransferFunction(num, den);
    };

    refreshH_s = () => {
        const { K, t_a, t_b, t_1, t_2, t_3, t_4 } = this.state;
        try {
            this.$H_s(this.buildH_s(K, t_a, t_b, [t_1, t_2, t_3, t_4]));
        } catch (ex) {
            console.log(ex);
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.refreshTraces();
        this.refreshH_s();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            H_s,
            systems,
            w_min,
            w_max,
            is3DPlotEnabled,
            thickness,
            N,
            K,
            t_a,
            t_b,
            t_1,
            t_2,
            t_3,
            t_4,
        } = this.state;

        if (
            H_s !== prevState.H_s ||
            systems !== prevState.systems ||
            w_min !== prevState.w_min ||
            w_max !== prevState.w_max ||
            is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            thickness !== prevState.thickness ||
            N !== prevState.N
        )
            this.refreshTraces();

        if (
            K !== prevState.K ||
            t_a !== prevState.t_a ||
            t_b !== prevState.t_b ||
            t_1 !== prevState.t_1 ||
            t_2 !== prevState.t_2 ||
            t_3 !== prevState.t_3 ||
            t_4 !== prevState.t_4
        )
            this.refreshH_s();

        if (
            K !== prevState.K ||
            t_a !== prevState.t_a ||
            t_b !== prevState.t_b ||
            t_1 !== prevState.t_1 ||
            t_2 !== prevState.t_2 ||
            t_3 !== prevState.t_3 ||
            t_4 !== prevState.t_4
        )
            this.setState({ isGraphCatured: false });
    }

    update = (changes) => {
        if (changes) this.$thickness(changes.thickness);
        //and so...
    };

    render() {
        const {
            K,
            t_a,
            t_b,
            t_1,
            t_2,
            t_3,
            t_4,
            w_min,
            w_max,
            phaseInRadianScale,
            N,
            systems,
            isGraphCatured,
            response,
            traces,
            isAutoPlaying,
            autoAmpRange,
            autoPhaseRange,
        } = this.state;
        return (
            <MainCard>
                <Grid item spacing={gridSpacing}>
                    <Grid container direction="column" spacing={gridSpacing}>
                        <Grid xs={12} item>
                            <BodePlotExampleLecture />
                        </Grid>
                        <Grid sx={{ margin: "auto", width: "100%" }} item>
                            <SubCard sx={{ direction: "ltr" }}>
                                <Grid
                                    id="formulaBox"
                                    sx={{ margin: "auto" }}
                                    container
                                    direction="row"
                                >
                                    {systems.map((sys, index) => {
                                        let formula =
                                            "$$" +
                                            sys.H_s.label("H", index + 1) +
                                            "$$";

                                        return (
                                            <Grid
                                                style={{ fontSize: "18px" }}
                                                md={6}
                                                sm={12}
                                                item
                                            >
                                                <MathJax>{formula}</MathJax>
                                            </Grid>
                                        );
                                    })}
                                    {!isGraphCatured && (
                                        <Grid
                                            style={{ fontSize: "18px" }}
                                            md={6}
                                            sm={12}
                                        >
                                            <MathJax>{response}</MathJax>
                                        </Grid>
                                    )}
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid
                            spacing={2}
                            style={{
                                width: "100%",
                                height: "100%",
                                margin: "auto",
                                direction: "ltr",
                            }}
                            container
                        >
                            <Grid
                                md={3}
                                sm={12}
                                xs={12}
                                sx={{ marginTop: "1%", width: "100%" }}
                                container
                            >
                                <Grid xs={12}>
                                    <BodePlotParameters
                                        K={K}
                                        $K={this.$K}
                                        t_a={t_a}
                                        $t_a={this.$t_a}
                                        t_b={t_b}
                                        $t_b={this.$t_b}
                                        t_1={t_1}
                                        $t_1={this.$t_1}
                                        t_2={t_2}
                                        $t_2={this.$t_2}
                                        t_3={t_3}
                                        $t_3={this.$t_3}
                                        t_4={t_4}
                                        $t_4={this.$t_4}
                                        w_min={w_min}
                                        w_max={w_max}
                                        $w_min={this.$w_min}
                                        $w_max={this.$w_max}
                                        phaseInRadianScale={phaseInRadianScale}
                                        setPhaseInRadianScale={
                                            this.setPhaseInRadianScale
                                        }
                                        N={N}
                                        $N={this.$N}
                                        multiplier={this.multiplyPlotBy}
                                        isAutoPlaying={isAutoPlaying}
                                        setAutoPlaying={this.setAutoPlaying}
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={9} sm={12} xs={12} item>
                                <SubCard>
                                    <GraphMenu
                                        capture={this.capture}
                                        reset={() => this.$systems([])}
                                        update={(changes) => this.update(changes)}
                                        toggle3DPlot={this.toggle3DPlot}
                                    />
                                </SubCard>
                                <hr />
                                <Grid xs={12} item>
                                    <SubCard>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                logX={true}
                                                title="Bode plot"
                                                traces={traces.amplitude}
                                                yRange={autoAmpRange}
                                            />
                                        </Grid>
                                        <Grid xs={12} item>
                                            <PlotlyBox
                                                title="Phase"
                                                logX={true}
                                                traces={
                                                    phaseInRadianScale
                                                        ? traces.phase
                                                        : traces.degreePhase
                                                }
                                                yRange={autoPhaseRange}
                                            />
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        );
    }
}

export default BodePlotExample;
