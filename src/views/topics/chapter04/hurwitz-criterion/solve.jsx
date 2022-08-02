import { Grid, IconButton } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import { useEffect, useState } from "react";
import Matrix from "math/matrix";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Poly from "math/algebra/functions/poly";

const delta_k = (a_i, k) => {
    const delta = [];
    for (let i = 1; i > 1 - k; i--) {
        const row = [];
        for (let j = 0; j < k; j++) {
            const c = i + 2 * j;
            row.push(c >= 0 && c < a_i.length ? a_i[i + 2 * j] : 0);
        }
        delta.push(row);
    }
    return delta;
};

const determine = (Deltas, a_i) => {
    const properties = [];
    let i = 0;
    if (a_i.length > 0 && Deltas.length > 0) {
        for (i = 0; i < Deltas.length; i++) {
            if (Deltas[i] <= 0) break;
        }
        if (i >= Deltas.length) {
            properties.push(
                "تمامی قطب های سیستم در سمت چپ محور موهومی بوده و سیستم پایدار است."
            );
            return properties;
        }

        for (i = 0; i < a_i.length; i++) {
            if (a_i[i] === 0) {
                properties.push(
                    "ریشه ای در سمت راست و یا روی محور موهومی وجود دارد."
                );
                return properties;
            }
        }

        for (i = 0; i < a_i.length; i++) {
            
            if (a_i[i] * a_i[0] < 0) {
                properties.push("ریشه ای در سمت راست محور موهومی وجود دارد.");
                return properties;
            }
        }
    }

    return properties;
};

const HurwitzCriterionSolveBox = ({ a_i }) => {
    const [currentStep, $currentStep] = useState(0);
    const [steps, $steps] = useState("");
    const [propertySectionIndex, $propertySectionIndex] = useState(0);

    useEffect(() => {
        const n = a_i.length;
        if (n > 0) {
            const st = [];
            const allDeltas = [];
            const poly = new Poly(a_i, "s");
            st.push(
                "$$\\Delta \\lgroup s \\rgroup = " + poly.toString() + "$$"
            );
            const kmax = n - 1;
            for (let k = 1; k <= kmax; k++) {
                let matrixDeltaK = new Matrix(delta_k(a_i, k));
                const deltaK = matrixDeltaK.det();
                allDeltas.push(deltaK);
                const strMatrix = matrixDeltaK.toString();
                st.push(`$$\\Delta_{${k}} = det${strMatrix} = ${deltaK}$$`);
            } // calculating deltas
            $propertySectionIndex(st.length);
            determine(allDeltas, a_i).forEach((property) => st.push(property));
            $steps(st);
        }
    }, [a_i]);

    return (
        <Grid direction="column" spacing={0.5} container>
            {steps instanceof Array &&
                steps.map(
                    (step, index) =>
                        currentStep >= index &&
                        step && (
                            <Grid xs={12} item>
                                <SubCard
                                    sx={{
                                        direction:
                                            index < propertySectionIndex
                                                ? "ltr"
                                                : "rtl",
                                    }}
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
            {currentStep < steps.length - 1 && (
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
            {currentStep >= steps.length - 1 && (
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

export default HurwitzCriterionSolveBox;
