import Complex from "math/algebra/complex";
import Algebra from "math/algebra";
import TransferFunction from "math/algebra/functions/fraction";
import { MathJax } from "better-react-mathjax";
import { Grid } from "@mui/material";
import { gridSpacing } from "store/constant";
import SubCard from "views/ui-component/cards/SubCard";
import { strictPrecisionFormat } from "./calculus";

export default class Describer {
    Explain = ({ language = "en" }) => {
        let describes = [];
        if (language === "en") describes = this.toEnglish();
        // and other langs ....
        if (describes) {
            return (
                <Grid spacing={gridSpacing} container>
                    <Grid lg={6} md={6} sm={12} xs={12}  item>
                        <SubCard>
                            <Grid
                                style={{ textAlign: "center"}}
                                spacing={gridSpacing}
                                container
                            >
                                {describes.types &&
                                    describes.types.map((info, i) => (
                                        <Grid
                                            lg={i % 2 ? 9 : 3}
                                            md={i % 2 ? 9 : 3}
                                            sm={12}
                                            xs={12}
                                            style={{
                                                color: "rgba(150, 50, 150, 255)",
                                            }}
                                            item
                                        >
                                            <MathJax> {info} </MathJax>
                                        </Grid>
                                    ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid lg={6} md={6} sm={12} xs={12} item>
                        <SubCard>
                            <Grid
                                style={{ textAlign: "center" }}
                                spacing={gridSpacing}
                                container
                            >
                                {describes.params &&
                                    describes.params.map((info, i) => (
                                        <Grid
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            style={{
                                                color: "rgba(150, 50, 150, 255)",
                                            }}
                                            item
                                        >
                                            <MathJax> {info} </MathJax>
                                        </Grid>
                                    ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            );
        }
        return null;
    };
    constructor(algebra) {
        if (algebra instanceof TransferFunction) {
            this.type = "TrnasferFunction";
            // this.tf = algebra.copy();
            this.tf = algebra; // it just reads the data, no need to make copy of and make app slower;
            if (algebra.order) this.Order = algebra.order;
            this.Zeros = Algebra.identify(algebra.getZeros());
            this.Poles = Algebra.identify(algebra.getPoles());
            this.RealPoles = algebra.poles.filter(
                (pi) => !(pi instanceof Complex) || pi.isReal()
            );
            this.ImaginaryPoles = algebra.poles.filter(
                (pi) => pi instanceof Complex && !pi.real() && pi.imaginary()
            );
            this.ComplexPoles = algebra.poles.filter(
                (pi) => pi instanceof Complex
            );
            this.MultiplePoles = [];
            for (const pi of algebra.poles) {
                const r = algebra.poleOrder(pi);
                if (r > 1) {
                    // repeated rootss!!!
                    if (
                        this.MultiplePoles.filter((pj) =>
                            Algebra.areTheseTwoEqual(pi, pj)
                        ).length === 0
                    )
                        this.MultiplePoles.push({
                            pole: pi.toString(),
                            order: r,
                        });
                }
            }
        }
    }

    functionGroup = () => {
        if (this.type === "TrnasferFunction") {
            if (this.Order === 2 && this.Poles.length === 2) {
                const p1 =
                    this.Poles[0] instanceof Complex
                        ? this.Poles[0].real()
                        : this.Poles[0];
                const p2 =
                    this.Poles[1] instanceof Complex
                        ? this.Poles[1].real()
                        : this.Poles[1];
                if (p1 <= 0 && p2 <= 0) {
                    if (this.tf.w_n) {
                        // meaning that the transfer function is in parametric form
                        const { zeta } = this.tf;
                        if (zeta > 1)
                            return {
                                name: "Overdamped",
                                status: "Two stable real poles on the left of the imaginary axis",
                            };
                        else if (zeta === 1)
                            return {
                                name: "Critically damped",
                                status: "Two repeated real stable poles on the left side of the imaginary axis",
                            };
                        else if (zeta > 0)
                            return {
                                name: "Underdamped oscillatory",
                                status: "Two complex conjugate stable poles on the left side of the imaginary axis",
                            };
                        else if (zeta === 0)
                            return {
                                name: "Oscillatory",
                                status: "Two stable complex conjugate poles on the imaginary axis",
                            };
                        else if (zeta > -1)
                            return {
                                name: "Undamped weakly oscillatory",
                                status: "Two complex conjugate unstable poles on the right side of the imaginary axis",
                            };
                        else if (zeta === -1)
                            return {
                                name: "Critically undamped",
                                status: "Two repeated real unstable poles on the right side of the imaginary axis",
                            };
                        else
                            return {
                                name: "Severely undamped",
                                status: "Two real poles on the right of the imaginary axis",
                            };
                    } else if (
                        !this.RealPoles.length &&
                        this.ComplexPoles.length === 2
                    ) {
                        if (
                            this.ComplexPoles[0].isConjugateWith(
                                this.ComplexPoles[1]
                            )
                        )
                            return {
                                name: "Underdamped oscillatory",
                                status: "Two complex conjugate poles on the left of the imaginary axis",
                            };
                    } else if (
                        this.RealPoles.length === 2 &&
                        !this.ComplexPoles.length
                    )
                        if (this.MultiplePoles.length > 0)
                            return {
                                name: "Critically damped",
                                status: "Two repeated real poles on the left of the imaginary axis",
                            };
                        else
                            return {
                                name: "Overdamped",
                                status: "Two real poles on the left of the imaginary axis",
                            };
                }
                const numberOfUnstablePoles =
                    this.RealPoles.filter((pi) => pi > 0).length +
                    this.ComplexPoles.filter((cp) => cp.real() > 0).length;
                let status = `including ${numberOfUnstablePoles} Unstable pole on the right of the imaginary axis`;
                const numberOfStablePoles =
                    this.Poles.length - numberOfUnstablePoles;
                if (numberOfStablePoles)
                    status += ` and ${numberOfStablePoles} Stable pole in the left half`;
                return {
                    name: "Unstable",
                    status,
                };
            } else if (this.Order === 1) return "Response of the First-Order Transfer Function";
        }
    };

    valueOf = () => {
        return {
            poles: {
                multiple: this.MultiplePoles,
                complex: this.ComplexPoles,
                real: this.RealPoles,
                imaginary: this.ImaginaryPoles,
            },
        };
    };

    toEnglish = () => {
        // return a string containing all zero pole and step response infor mation
        const types = [],
            params = [];
        if (this.type === "TrnasferFunction") {
            if (this.Order) {
                types.push("Type: ");
                types.push(`transfer function of order ${this.Order}`);
            }
            types.push("Zeros: ");
            types.push(
                this.Zeros != null && this.Zeros.length
                    ? this.Zeros.join(" , ")
                    : "None"
            );

            
            const tfGroup = this.functionGroup();
            types.push("Pole status:");
            types.push(tfGroup.status);
            types.push("Step response type:");
            types.push(tfGroup.name);
            types.push("Poles: ");
            types.push(
                this.Poles != null && "$$" + this.Poles.length
                    ? this.Poles.join(" , ")
                    : "None"
            );

            params.push("Time constant:");
            params.push(
                this.tf.timeConstant ? this.tf.timeConstant + " s" : "-"
            );
            params.push("Settling time:");
            params.push(this.tf.t_settle ? this.tf.t_settle + " s" : "-");
            params.push("Damped Natural Frequency:");

            params.push(
                this.tf.w_d ? strictPrecisionFormat(this.tf.w_d) + " Hz" : "-"
            );
            params.push("Peak time:");

            params.push(
                this.tf.t_rise
                    ? strictPrecisionFormat(this.tf.t_rise) + " s"
                    : "-"
            );

            params.push("Overshoot:");
            params.push(
                this.tf.overshoot
                    ? strictPrecisionFormat(this.tf.overshoot) + " %"
                    : "-"
            );
            
            const {Kr, Ka, Ks} = this.tf.errors();
            params.push("Step (Position) Error Constant:");
            params.push(strictPrecisionFormat(Ks));
            params.push("Ramp (Velocity) Error Constant:");
            params.push(strictPrecisionFormat(Kr));
            params.push("Parabolic (Acceleration) Error Constant:");
            params.push(strictPrecisionFormat(Ka)); 
        }
        return { params, types };
    };
}
