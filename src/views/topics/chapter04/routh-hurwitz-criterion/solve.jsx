import { Grid, IconButton } from "@mui/material";
import SubCard from "views/ui-component/cards/SubCard";
import { useEffect, useState } from "react";
import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Poly from "math/algebra/functions/poly";
import { writeRow } from "toolshed";

const putZeros = (arr, numberOfZeros) => {
    for (let j = 0; j < numberOfZeros; j++) arr.push(0);
};

const isRowZero = (row) => {
    let numberOfZeros = 0;
    for (
        numberOfZeros = 0;
        numberOfZeros < row.length && !row[numberOfZeros];
        numberOfZeros++
    );
    return numberOfZeros >= row.length;
};

const rowZeroReplacement = (degree, row) => {
    // a0s^n + a1s^(n-2) + ...
    const result = [...row];
    for (let i = 0; degree >= 0; degree -= 2, i++) {
        result[i] *= degree;
    }
    return result;
};

const routhHurwitzTableAndProperties = (a, epsilon, showEpsilonBar) => {
    // this method also determines poles state
    let zeroRows = [], // => couple poles on the imaginary axis
        signChanges = []; // => poles on the right half the imaginary axis
    const n = a.length - 1;
    const rows = [];
    for (let i = 0; i <= n && i <= 1; i++) {
        const row = [];
        for (let j = i; j <= n; j += 2) row.push(a[j]);
        rows.push([...row]);
    }
    if (n > 1) {
        putZeros(rows[1], rows[0].length - rows[1].length);
        for (let i = 2; i <= n; i++) {
            const row = [];
            for (let j = 1; j < rows[i - 2].length; j++) {
                let den = Number(rows[i - 1][0]);
                if (!den) {
                    den = epsilon;
                    showEpsilonBar(true);
                }

                row.push(
                    (den * rows[i - 2][j] - rows[i - 2][0] * rows[i - 1][j]) /
                        den
                );
            }
            rows.push([...row]);

            if (isRowZero(rows[i])) {
                // count zero rows
                zeroRows.push(i);
                rows[i] = rowZeroReplacement(n - i + 1, rows[i - 1]);
            }
            putZeros(rows[i], rows[i - 1].length - rows[i].length);
            // count sign changes
            if (rows[i][0] * rows[i - 1][0] < 0) signChanges.push(i);
        }
    }

    return { rows, properties: { signChanges, zeroRows } };
};

const determine = ({ zeroRows, signChanges }) => {
    const systemProps = [];
    let stable = true,
        criticallyStable = false;
    zeroRows = zeroRows.filter(
        (zeroRowIndex) => !signChanges.find((ri) => ri === zeroRowIndex + 1)
    );
    const couplePolesOnImgAxis = zeroRows.length,
        polesOnRightHalf = signChanges.length;
    stable = zeroRows.length <= 1 && !signChanges.length;
    if (stable && zeroRows.length === 1) criticallyStable = true;
    if (polesOnRightHalf) {
        let str = `این سیستم دارای ${polesOnRightHalf} قطب در سمت راست محور موهومی `;
        if (couplePolesOnImgAxis) {
            const asymmetricalPoles = signChanges.filter(
                (rowIndex) => rowIndex < zeroRows[0]
            ).length;
            const symmetricalPoles = polesOnRightHalf - asymmetricalPoles;
            str += `(${asymmetricalPoles} نامتقارن - ${symmetricalPoles} متقارن) `;
        }

        str += "می باشد.";
        systemProps.push(str);
    }
    if (couplePolesOnImgAxis) {
        systemProps.push(
            `این سیستم دارای ${couplePolesOnImgAxis} جفت قطب روی محور موهومی می باشد.`
        );
    }
    if (criticallyStable)
        systemProps.push("در نتیجه سیستم پایدار بحرانی (نوسانی) می باشد.");
    else if (stable) {
        systemProps.push(
            "تمامی قطب های این سیستم در سمت چپ محور موهومی قرار دارد."
        );
        systemProps.push("در نتیجه سیستم پایدار است.");
    } else systemProps.push("در نتیجه سیستم ناپایدار است.");
    return systemProps;
};
const RouthHurwitzCriterionSolveBox = ({ a_i, epsilon, showEpsilonBar }) => {
    const [currentStep, $currentStep] = useState(0);
    const [steps, $steps] = useState("");
    const [propertySectionIndex, $propertySectionIndex] = useState(0);

    useEffect(() => {
        $currentStep(0);
        const n = a_i.length;
        if (n > 0) {
            const st = [];
            const poly = new Poly(a_i, "s");
            st.push("$$P \\lgroup s \\rgroup = " + poly.toString() + "$$");
            const { rows, properties } = routhHurwitzTableAndProperties(
                a_i,
                epsilon,
                showEpsilonBar
            );
            rows.forEach((row, i) =>
                st.push(writeRow(row, `s^{${n - i - 1}}\\quad|`))
            );
            $propertySectionIndex(st.length);
            const systemProps = determine(properties);
            if (systemProps.length) st.push(...systemProps);
            else
                st.push(
                    "مشکلی در تعیین وضعیت قطب ها و پایداری سیستم پیش آمده است."
                );

            //$propertySectionIndex(st.length);
            //determine(allDeltas, a_i).forEach(property => st.push(property));
            $steps(st);
        }
    }, [a_i, epsilon, showEpsilonBar]);

    return (
        <Grid spacing={0.5} container>
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
                                    <Grid sx={{ width: '100%' }} container>
                                        <Grid>
                                            <MathJax>{step}</MathJax>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        )
                )}
            {currentStep < steps.length - 1 && (
                <Grid style={{ width: "100%" }} item>
                    <IconButton
                        style={{ width: "100%", margin: "auto" }}
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
                <Grid style={{ width: "100%" }} item>
                    <IconButton
                        style={{ width: "100%", margin: "auto" }}
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

export default RouthHurwitzCriterionSolveBox;
