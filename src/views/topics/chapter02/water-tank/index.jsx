import WaterTankLevelLecture from "./lecture";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import calculus from "../../../../math/calculus/index";
import { useState, useEffect } from "react";
import WaterTankParameters from "./parameters";

import GraphMenu from "views/plotter/GraphMenu";
import { Grid } from "@mui/material";
import VisualWaterTank from "./visual/WaterTank";
import GraphBox from "views/plotter/GraphBox";
import { MathJax } from "better-react-mathjax";

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

const WaterTankLevelExample = () => {
    const [currentY, selectY] = useState([]);
    const [deltaX, setDeltaX] = useState(0);
    const [R, setR] = useState(100);
    const [C, setC] = useState(1.0);
    const [Qin, setQin] = useState(0.0);
    const [ti, setTi] = useState(0);
    const [tf, setTf] = useState(5);
    const [hi, setHi] = useState(10.0);
    const [systems, setSystems] = useState([]);
    const [traces, setTraces] = useState([]);
    const [diffEquation, setDiffEquation] = useState(null);
    const [thickness, setThickness] = useState(1.0); // graph line thickness
    const [isGraphCatured, setGraphCaptured] = useState(false);
    const [N, $N] = useState(1000);
    const [is3DPlotEnabled, set3DPlotEnabled] = useState(false);

    const toggle3DPlot = () => set3DPlotEnabled(!is3DPlotEnabled);

    const capture = () => {
        const capturedSystems = [...systems];
        const index = capturedSystems.findIndex(
            (sys) =>
                sys.hi === hi && sys.R === R && sys.C === C && sys.Qin === Qin
        );
        if (index === -1) {
            // if current system has not been captured before => then capture it; o.w. its not needed
            capturedSystems.push({
                hi,
                R,
                C,
                Qin,
                thickness,
                legend: "$$" + symbols.out + "_{" + (systems.length + 1).toString() + "}$$",
            });
            setSystems(capturedSystems);
            setGraphCaptured(true);
        }
    };

    useEffect(() => {
        const h_t = calculus.ODE.cc1ode(+R * +C, 1, +R * +Qin, +hi);
        const [x, y] = calculus.pointify(h_t, +ti, +tf, +N);

        setDeltaX(x[1] - x[0]);
        selectY(y); // currentY = y
        setDiffEquation(hydraulicSystemEquation(R, C, Qin));
        const all = systems.map((e, index) => {
            const hi_t = calculus.ODE.cc1ode(e.R * e.C, 1, e.R * e.Qin, e.hi);
            const [xi, yi] = calculus.pointify(hi_t, ti, tf, +N); 
            return {
                x: xi,
                y: yi,
                z: is3DPlotEnabled ? Array(xi.length).fill(0) : null,
                line: {
                    // color: e.color...
                    width: e.thickness,
                },
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                name: e.legend,
                mode: "lines",
            };
        });

        const index = systems.findIndex(
            (sys) =>
                sys.hi === hi && sys.R === R && sys.C === C && sys.Qin === Qin
        );
        if (index === -1)
            // if current system isnt in traces list => add it temperory to plot
            all.push({
                x,
                y,
                z: is3DPlotEnabled ? Array(x.length).fill(0) : null,
                line: {
                    width: thickness,
                },
                type: "scatter" + (is3DPlotEnabled ? "3d" : ""),
                mode: "lines",
                name: `${symbols.out}(${symbols.in})`,
            });

        setTraces(all);
    }, [R, C, Qin, ti, tf, hi, is3DPlotEnabled, thickness, systems, N]);

    useEffect(() => {
        setGraphCaptured(false);
    }, [R, C, hi, Qin]);
    const update = (changes) => {
        if (changes) setThickness(changes.thickness);
        //and so...
    };
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
                            setR={setR}
                            setC={setC}
                            setHi={setHi}
                            setQin={setQin}
                            setTi={setTi}
                            setTf={setTf}
                            N={N}
                            $N={$N}
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
                            capture={capture}
                            reset={() => setSystems([])}
                            update={(changes) => update(changes)}
                            toggle3DPlot={toggle3DPlot}
                        />
                    </SubCard>
                    <hr />
                    <Grid lg={12} md={12} sm={12} xs={12} item>
                        <SubCard>
                            <GraphBox title="ارتفاع آب مخزن" traces={traces} />
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default WaterTankLevelExample;
