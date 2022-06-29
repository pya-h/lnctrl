import Complex from "math/algebra/complex";
import Algebra from "math/algebra";
import TransferFunction from "math/algebra/functions/transfer";
import { MathJax } from "better-react-mathjax";
import { Grid } from "@mui/material";
import { gridSpacing } from "store/constant";
import SubCard from "views/ui-component/cards/SubCard";
import { strictPrecisionFormat } from "./calculus";

export default class Describer {
    Explain = ({ language = "fa" }) => {
        let describes = [];
        if (language === "fa") describes = this.toPersian();
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
                                name: "میرای شدید",
                                status: "دو قطب حقیقی پایدار در سمت چپ محور موهومی",
                            };
                        else if (zeta === 1)
                            return {
                                name: "میرای بحرانی",
                                status: "دو قطب حقیقی تکراری پایدار در سمت چپ محور موهومی",
                            };
                        else if (zeta > 0)
                            return {
                                name: "میرای ضعیف نوسانی",
                                status: "دو قطب مختلط مزدوج پایدار در سمت چپ محور موهومی",
                            };
                        else if (zeta === 0)
                            return {
                                name: "نوسانی",
                                status: "دو قطب مختلط مزدوج  پایدار روی محور موهومی",
                            };
                        else if (zeta > -1)
                            return {
                                name: "نامیرای ضعیف نوسانی",
                                status: "دو قطب مختلط مزدوج ناپایدار در سمت راست محور موهومی",
                            };
                        else if (zeta === -1)
                            return {
                                name: "نامیرای بحرانی",
                                status: "دو قطب حقیقی تکراری ناپایدار در سمت راست محور موهومی",
                            };
                        else
                            return {
                                name: "نامیرای شدید",
                                status: "دو قطب حقیقی در سمت راست محور موهومی",
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
                                name: "میرای ضعیف نوسانی",
                                status: "دو قطب مختلط مزدوج با در سمت چپ محور موهومی",
                            };
                    } else if (
                        this.RealPoles.length === 2 &&
                        !this.ComplexPoles.length
                    )
                        if (this.MultiplePoles.length > 0)
                            return {
                                name: "میرای بحرانی",
                                status: "دو قطب حقیقی تکراری در سمت چپ محور موهومی",
                            };
                        else
                            return {
                                name: "میرای شدید",
                                status: "دو قطب حقیقی در سمت چپ محور موهومی",
                            };
                }
                const numberOfUnstablePoles =
                    this.RealPoles.filter((pi) => pi > 0).length +
                    this.ComplexPoles.filter((cp) => cp.real() > 0).length;
                let status = `شامل ${numberOfUnstablePoles} قطب ناپایدار در سمت راست محور موهومی`;
                const numberOfStablePoles =
                    this.Poles.length - numberOfUnstablePoles;
                if (numberOfStablePoles)
                    status += ` و ${numberOfStablePoles} قطب پایدار در سمت چپ`;
                return {
                    name: "ناپایدار",
                    status,
                };
            } else if (this.Order === 1) return "پاسخ تابع تبدیل مرتبه اول";
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

    toPersian = () => {
        // return a string containing all zero pole and step response infor mation
        const types = [],
            params = [];
        if (this.type === "TrnasferFunction") {
            if (this.Order) {
                types.push("نوع : ");
                types.push(`تابع تبدیل مرتبه ی ${this.Order}`);
            }
            types.push("صفرها : ");
            types.push(
                this.Zeros != null && this.Zeros.length
                    ? this.Zeros.join(" , ")
                    : "ندارد"
            );

            
            const tfGroup = this.functionGroup();
            types.push("وضعیت قطب ها :");
            types.push(tfGroup.status);
            types.push("نوع پاسخ پله :");
            types.push(tfGroup.name);
            types.push("قطب ها : ");
            types.push(
                this.Poles != null && "$$" + this.Poles.length
                    ? this.Poles.join(" , ")
                    : "ندارد"
            );

            params.push("ثابت زمانی :");
            params.push(
                this.tf.timeConstant ? this.tf.timeConstant + " s" : "-"
            );
            params.push("زمان نشست :");
            params.push(this.tf.t_settle ? this.tf.t_settle + " s" : "-");
            params.push("فرکانس طبیعی میراشده :");

            params.push(
                this.tf.w_d ? strictPrecisionFormat(this.tf.w_d) + " Hz" : "-"
            );
            params.push("زمان اوج :");

            params.push(
                this.tf.t_rise
                    ? strictPrecisionFormat(this.tf.t_rise) + " s"
                    : "-"
            );

            params.push("بالازدگی :");
            params.push(
                this.tf.overshoot
                    ? strictPrecisionFormat(this.tf.overshoot) + " %"
                    : "-"
            );
            
            const {Kr, Ka, Ks} = this.tf.errors();
            params.push("ثابت خطای پله (موقعیت) :");
            params.push(strictPrecisionFormat(Ks));
            params.push("ثابت خطای شیب (سرعت) :");
            params.push(strictPrecisionFormat(Kr));
            params.push("ثابت خطای سهمی (شتاب) :");
            params.push(strictPrecisionFormat(Ka)); 
        }
        return { params, types };
    };
}
