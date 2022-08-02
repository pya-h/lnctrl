import { Grid, IconButton } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import { useEffect, useState } from "react";
import Algebra from "math/algebra";
import Matrix from "math/matrix";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import calculus from "math/calculus/index";
import Complex from "math/algebra/complex";
import TransferFunction from "math/algebra/functions/transfer";
import Exp from "math/algebra/functions/exp";
import Poly from "math/algebra/functions/poly";
const constructStateSpaceFormula = (A, x_0) =>
    "$$\\begin{cases} \\dot{x}(t)  = " +
    new Matrix(A).toString() +
    " x(t) \\\\ \\\\ x(0) = " +
    new Matrix(x_0).toString() +
    " \\end{cases}$$";
const constructStep1 = (sI_A, landa, poles) =>
    "$$\\begin{cases} sI - A = " +
    sI_A.toString() +
    " \\\\ \\\\ |sI - A| = " +
    landa.toString() +
    " \\\\ \\\\ " +
    poles
        .map(
            (pi, i) =>
                "s_{" +
                (i + 1).toString() +
                "} = " +
                (pi instanceof Algebra
                    ? pi.toString()
                    : calculus.strictPrecisionFormat(calculus.round(pi)))
        )
        .join(" , ") +
    " \\end{cases}$$";

const constructStep2 = (inv$sI_A, laplaceDomainResponse) =>
    "$$\\begin{cases} (sI - A)^{-1} = " +
    inv$sI_A +
    "\\\\ \\\\ (sI - A)^{-1} = " +
    laplaceDomainResponse.toString() +
    " \\end{cases}$$";

const constructStep3 = (Fi_t) => {
    const fi_t = Fi_t.toString();
    return (
        "$$ e^{At} = " + (fi_t.length > 250 ? "\\\\ \\\\" : "") + fi_t + " $$"
    ); //" \\end{cases}$$";
};
const constructStep4 = (x_t, y_t) =>
    "$$\\begin{cases} \\varphi(t) = e^{At} \\\\ \\\\ x(t) = \\varphi(t)x(0) = " +
    x_t.toString() +
    "\\\\ \\\\ y(t) = \\ Cx(t) = " +
    y_t.toString() +
    " \\end{cases}$$";

const Fi_ij = (delta, k1, k2, p1, p2 = p1) => {
    let fi_s = null,
        fi_t = null;
    if (delta !== 0) {
        fi_s = new TransferFunction(k1, [1, p1]).add(
            new TransferFunction(k2, [1, p2])
        );
        fi_t = new Exp(k1, p1 instanceof Algebra ? p1.negation() : -p1).add(
            new Exp(k2, p2 instanceof Algebra ? p2.negation() : -p2)
        );
    } else {
        fi_s = new TransferFunction(k1, [1, p1]).add(
            new TransferFunction(k2, [1, 2 * p1, p1 ** 2])
        );

        fi_t = new Exp(k1, p1 instanceof Algebra ? p1.negation() : -p1).add(
            new Exp(k2, p1 instanceof Algebra ? p1.negation() : -p1, "t", {
                dot: Poly.atn(1, 1),
            })
        );
    }
    return [fi_s, fi_t];
};

const solve = (A) => {
    const matrixA = new Matrix(A);

    let delta = (A[0][0] + A[1][1]) ** 2 - 4 * matrixA.det();
    let p1 = null,
        p2 = null;
    let fi11_s, fi12_s, fi21_s, fi22_s, fi11_t, fi12_t, fi21_t, fi22_t;
    if (delta > 0) {
        p1 = (-(A[0][0] + A[1][1]) - delta ** 0.5) / 2;
        p2 = (-(A[0][0] + A[1][1]) + delta ** 0.5) / 2;

        // Fi_11_s : laplace
        let a0 = -A[1][1];
        let k1 = (a0 - p1) / (p2 - p1),
            k2 = (a0 - p2) / (p1 - p2);
        [fi11_s, fi11_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_12_s: laplace
        a0 = A[0][1];
        k1 = a0 / (p2 - p1);
        k2 = -k1;
        [fi12_s, fi12_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_21_s: laplace
        a0 = A[1][0];
        k1 = a0 / (p2 - p1);
        k2 = -k1;
        [fi21_s, fi21_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_22_s: laplace
        a0 = -A[0][0];
        k1 = (a0 - p1) / (p2 - p1);
        k2 = (a0 - p2) / (p1 - p2);
        [fi22_s, fi22_t] = Fi_ij(delta, k1, k2, p1, p2);
    } else if (!delta) {
        p1 = p2 = -(A[0][0] + A[1][1]) / 2; // p1 = p2

        // Fi_11_s : laplace
        [fi11_s, fi11_t] = Fi_ij(delta, 1, -A[1][1] - p1, p1);

        // Fi_12_s: laplace
        [fi12_s, fi12_t] = Fi_ij(delta, 0, A[0][1], p1);

        // Fi_21_s: laplace
        [fi21_s, fi21_t] = Fi_ij(delta, 0, A[1][0], p1);

        // Fi_22_s: laplace
        [fi22_s, fi22_t] = Fi_ij(delta, 1, -A[0][0] - p1, p1);
    } else {
        // delta < 0
        delta *= -1;
        // s = a + jb
        const a = (-A[0][0] + A[1][1]) / 2,
            b = delta ** 0.5;
        p1 = new Complex(a, b);
        p2 = new Complex(a, -b);

        // Fi_11_s : laplace
        let a0 = -A[1][1];
        let kImg = (a0 - a) / (2 * b);
        let k1 = new Complex(0.5, kImg),
            k2 = new Complex(0.5, -kImg);

        [fi11_s, fi11_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_12_s: laplace
        a0 = A[0][1];
        kImg = a0 / (2 * b);
        k1 = new Complex(0, kImg);
        k2 = new Complex(0, -kImg);
        [fi12_s, fi12_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_21_s: laplace
        a0 = A[1][0];
        kImg = a0 / (2 * b);
        k1 = new Complex(0, kImg);
        k2 = new Complex(0, -kImg);
        [fi21_s, fi21_t] = Fi_ij(delta, k1, k2, p1, p2);

        // Fi_22_s: laplace
        a0 = -A[0][0];
        kImg = (a0 - a) / (2 * b);
        k1 = new Complex(0.5, kImg);
        k2 = new Complex(0.5, -kImg);
        [fi22_s, fi22_t] = Fi_ij(delta, k1, k2, p1, p2);
    }
    const poles = p1 !== p2 ? [p1, p2] : [p1];
    // laplace domain response
    const LDR = new Matrix([
            [fi11_s, fi12_s],
            [fi21_s, fi22_s],
        ]),
        // time domain response
        TDR = new Matrix([
            [fi11_t, fi12_t],
            [fi21_t, fi22_t],
        ]);
    return [poles, LDR, TDR];
};

const SpaceStateEquationSolveBox = ({ A, x_0, C }) => {
    const [currentStep, $currentStep] = useState(0);
    const [equation, $equation] = useState("");
    const [sI_A, $sI_A] = useState(null);
    const [landa, $landa] = useState(null); // landa == characteristic equations
    const [step1, $step1] = useState("");

    const [inv$sI_A, $inv$sI_A] = useState(null);
    const [step2, $step2] = useState("");

    const [laplaceDomainResponse, $laplaceDomainResponse] = useState(null);
    const [step3, $step3] = useState("");
    const [step4, $step4] = useState("");
    const [stepThrough, $stepThrough] = useState([]);

    const [Fi_t, $Fi_t] = useState(null);

    useEffect(() => {
        const matrixA = new Matrix(A);

        $equation(constructStateSpaceFormula(A, x_0));
        // step 1:
        // sI - A : ######## this part is written without matrix operations
        // AFTER WRITING MATRIX CLASS => THIS NEEDS UPDATING
        $sI_A(
            new Matrix([
                [new Poly([1, -A[0][0]], "s"), new Poly([-A[0][1]], "s")],
                [new Poly([-A[1][0]], "s"), new Poly([1, -A[1][1]], "s")],
            ])
        );
        $landa(new Poly([1, -(A[0][0] + A[1][1]), matrixA.det()], "s"));

        // for final calculations:
    }, [A, x_0]);

    useEffect(() => {
        if (sI_A) {
            const [poles, LDR, TDR] = solve(A);
            $step1(constructStep1(sI_A, landa, poles));
            // now time's for step 2
            // ##### NEEDS EDDITING
            $inv$sI_A(
                "\\frac{1}{" + landa.toString() + "} " + sI_A.adj().toString()
            );
            $laplaceDomainResponse(LDR);
            $Fi_t(TDR);
        }
    }, [sI_A, landa, A]);

    useEffect(() => {
        // EDITTT
        if (
            inv$sI_A &&
            laplaceDomainResponse &&
            laplaceDomainResponse instanceof Matrix
        )
            $step2(constructStep2(inv$sI_A, laplaceDomainResponse));
    }, [inv$sI_A, laplaceDomainResponse]);

    useEffect(() => {
        if (Fi_t) {
            const x_t = Fi_t.multiply(x_0);
            const y_t = new Matrix(C).multiply(x_t);
            $step3(constructStep3(Fi_t));
            $step4(constructStep4(x_t, y_t));
        }
    }, [Fi_t, x_0, C]);

    useEffect(
        () => $stepThrough([equation, step1, step2, step3, step4]),
        [equation, step1, step2, step3, step4]
    );

    return (
        <Grid direction="column" spacing={0.5} container>
            {stepThrough instanceof Array &&
                stepThrough.map(
                    (step, index) =>
                        currentStep >= index && (
                            <Grid xs={12} item>
                                <SubCard
                                    sx={
                                        index !== 3
                                            ? { direction: "ltr" }
                                            : {
                                                  margin: "auto",
                                                  fontSize:
                                                      step3.length > 210
                                                          ? (
                                                                18 -
                                                                0.7 *
                                                                    (calculus.precision.get() -
                                                                        4)
                                                            ).toString() + "px"
                                                          : "18px",
                                              }
                                    }
                                >
                                    <Grid sx={{ margin: "auto" }} container>
                                        <Grid>
                                            <MathJax>{step}</MathJax>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        )
                )}
            {currentStep < stepThrough.length - 1 && (
                <Grid item>
                    <IconButton
                        style={{ width: "100%" }}
                        color="secondary"
                        aria-label="previous"
                        component="span"
                        onClick={() => $currentStep(currentStep + 1)}
                    >
                        <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                </Grid>
            )}
            {currentStep >= stepThrough.length - 1 && (
                <Grid item>
                    <IconButton
                        style={{ width: "100%" }}
                        color="secondary"
                        aria-label="previous"
                        component="span"
                        onClick={() => $currentStep(0)}
                    >
                        <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
};

export default SpaceStateEquationSolveBox;
