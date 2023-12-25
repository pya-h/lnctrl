import WaterTankLevelLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus";
import WaterTankParameters from "./parameters";

import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import VisualWaterTank from "./visual/WaterTank";
import PlotlyBox from "views/plotter/PlotlyBox";
import { MathJax } from "better-react-mathjax";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
import { cacheParameters } from "toolshed";

const hydraulicSystemEquation = (R, C, Qin) =>
    "$$" +
    calculus.strictPrecisionFormat(R * C) +
    "\\frac{dh(t)}{dt} + h(t) = " +
    calculus.strictPrecisionFormat(R * Qin) +
    "$$";

const indexedHydraulicSystemEquation = (R, C, Qin, index) =>
    "$$" +
    calculus.strictPrecisionFormat(R * C) +
    `\\frac{dh_{${index}}(t)}{dt} + h_{${index}}(t) = ` +
    calculus.strictPrecisionFormat(R * Qin) +
    "$$";

const symbols = { out: "h", in: "t" };

export default class WaterTankLevelExample extends TopicBaseComponent {
    state = {
        topicKey: "ch2-wt",
        currentY: [],
        deltaX: 0,
        R: 100,
        C: 1.0,
        Qin: 0.0,
        ti: 0,
        tf: 5,
        hi: 10.0,
        traces: [],
        diffEquation: null,
        thickness: 1.0, // graph line thickness
        systems: [],
        isGraphCatured: false,
        N: 1000,
        is3DPlotEnabled: false,
    };

    saveState() {
        const {
            R,
            C,
            Qin,
            ti,
            tf,
            hi,
            thickness, // graph line thickness
            N,
        } = this.state;
        cacheParameters(this.state.topicKey, {
            R,
            C,
            Qin,
            ti,
            tf,
            hi,
            thickness, // graph line thickness
            N,
        });
    }
    toggle3DPlot = () => this.set3DPlotEnabled(!this.state.is3DPlotEnabled);
    capture = () => {
        const capturedSystems = [...this.state.systems];
        const index = capturedSystems.findIndex(
            (sys) =>
                sys.hi === this.state.hi &&
                sys.R === this.state.R &&
                sys.C === this.state.C &&
                sys.Qin === this.state.Qin
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            const { hi, R, C, Qin, thickness, systems } = this.state;
            capturedSystems.push({
                hi,
                R,
                C,
                Qin,
                thickness,
                legend:
                    "$$" +
                    symbols.out +
                    "_{" +
                    (systems.length + 1).toString() +
                    "}$$",
            });
            this.setSystems(capturedSystems);
            this.setGraphCaptured(true);
        }
    };

    update = (changes) => {
        if (changes) this.setThickness(changes.thickness);
        //and so...
    };

    selectY = (y) => this.updateState("currentY", y);
    setDeltaX = (dx) => this.updateState("deltaX", dx);
    setR = (R) => this.updateState("R", R);
    setC = (C) => this.updateState("C", C);
    setQin = (Qin) => this.updateState("Qin", Qin);
    setTi = (ti) => this.updateState("ti", ti);
    setTf = (tf) => this.updateState("tf", tf);
    setHi = (hi) => this.updateState("hi", hi);
    setSystems = (systems) => this.updateState("systems", systems);
    clearSystems = () => this.setState(state => {
        state.length = 0;
        return state;
    });
    
    setTraces = (traces) => this.updateState("traces", traces);
    setDiffEquation = (diffEquation) =>
        this.updateState("diffEquation", diffEquation);
    setThickness = (thickness) => this.updateState("thickness", thickness);
    setGraphCaptured = (isIt) => this.updateState("isGraphCatured", isIt);
    $N = (N) => this.updateState("N", N);
    set3DPlotEnabled = (isIt) => this.updateState("is3DPlotEnabled", isIt);

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state, prevState)

        const basicParamsChanged =
        this.state.R !== prevState.R ||
        this.state.C !== prevState.C ||
        this.state.hi !== prevState.hi ||
        this.state.Qin !== prevState.Qin;
        console.log('basicParamsChanged', basicParamsChanged)
        if (
            basicParamsChanged ||
            this.state.ti !== prevState.ti ||
            this.state.tf !== prevState.tf ||
            this.state.is3DPlotEnabled !== prevState.is3DPlotEnabled ||
            this.state.thickness !== prevState.thickness ||
            this.state.systems !== prevState.systems || this.state.systems.length !== prevState.systems.length ||
            this.state.N !== prevState.N
        ) {
            const h_t = calculus.ODE.cc1ode(+this.state.R * +this.state.C, 1, +this.state.R * +this.state.Qin, +this.state.hi);
            const [x, y] = calculus.pointify(h_t, +this.state.ti, +this.state.tf, +this.state.N);
            console.log('DidUpdate state')

            this.setDeltaX(x[1] - x[0]);
            this.selectY(y); // currentY = y
            this.setDiffEquation(hydraulicSystemEquation(this.state.R, this.state.C, this.state.Qin));
            const all = this.state.systems.map((e, index) => {
                const hi_t = calculus.ODE.cc1ode(
                    e.R * e.C,
                    1,
                    e.R * e.Qin,
                    e.hi
                );
                const [xi, yi] = calculus.pointify(hi_t, this.state.ti, this.state.tf, +this.state.N);
                return {
                    x: xi,
                    y: yi,
                    z: this.state.is3DPlotEnabled ? Array(xi.length).fill(0) : null,
                    line: {
                        // color: e.color...
                        width: e.thickness,
                    },
                    type: "scatter" + (this.state.is3DPlotEnabled ? "3d" : ""),
                    name: e.legend,
                    mode: "lines",
                };
            });

            const index = this.state.systems.findIndex(
                (sys) =>
                    sys.hi === this.state.hi &&
                    sys.R === this.state.R &&
                    sys.C === this.state.C &&
                    sys.Qin === this.state.Qin
            );
            if (index === -1)
                // if current system isnt in traces list => add it temperory to plot
                all.push({
                    x,
                    y,
                    z: this.state.is3DPlotEnabled ? Array(x.length).fill(0) : null,
                    line: {
                        width: this.state.thickness,
                    },
                    type: "scatter" + (this.state.is3DPlotEnabled ? "3d" : ""),
                    mode: "lines",
                    name: `${symbols.out}(${symbols.in})`,
                });

            this.setTraces(all);
        }
		if (basicParamsChanged) this.setGraphCaptured(false);
    }
    render() {
        const {
            currentY,
            deltaX,
            R,
            C,
            Qin,
            ti,
            tf,
            hi,
            traces,
            diffEquation, // graph line thickness
            systems,
            isGraphCatured,
            N,
        } = this.state;

        return (
            <Grid container direction="column" spacing={1}>
                <Grid
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                        direction: "ltr",
                    }}
                    item
                >
                    <WaterTankLevelLecture />
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
                                const formula = indexedHydraulicSystemEquation(
                                    sys.R,
                                    sys.C,
                                    sys.Qin,
                                    index + 1
                                );
                                return (
                                    <Grid md={6} sm={12} item>
                                        <MathJax>{formula}</MathJax>
                                    </Grid>
                                );
                            })}
                            {!isGraphCatured && (
                                <Grid md={6} sm={12}>
                                    <MathJax>{diffEquation}</MathJax>
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
                            <WaterTankParameters
                                R={R}
                                C={C}
                                Qin={Qin}
                                hi={hi}
                                ti={ti}
                                tf={tf}
                                setR={this.setR}
                                setC={this.setC}
                                setHi={this.setHi}
                                setQin={this.setQin}
                                setTi={this.setTi}
                                setTf={this.setTf}
                                N={N}
                                $N={this.$N}
                            />
                        </Grid>
                        <Grid sx={{ marginTop: "3%" }} xs={12}>
                            {currentY && currentY.length && (
                                <VisualWaterTank
                                    dt={deltaX}
                                    y={currentY}
                                    max={calculus.max(currentY).value}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Grid md={9} sm={12} xs={12} item>
                        <SubCard>
                            <GraphMenu
                                capture={this.capture}
                                reset={() => this.setSystems([])}
                                update={(changes) => this.update(changes)}
                                toggle3DPlot={this.toggle3DPlot}
                            />
                        </SubCard>
                        <hr />
                        <Grid xs={12} item>
                            <SubCard>
                                <PlotlyBox
                                    title="ارتفاع آب مخزن"
                                    traces={traces}
                                />
                            </SubCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
