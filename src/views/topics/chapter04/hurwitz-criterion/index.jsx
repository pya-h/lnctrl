import HurwitzCriterionLecture from "./lecture";
import { useEffect, useState } from "react";
import { Grid, InputAdornment, TextField } from "@mui/material";
import HurwitzCriterionSolveBox from './solve';
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from 'store/constant';
import { stringToArray } from "math/calculus";

const HurwitzCriterion = () => {
    const [rawInput, $rawInput] = useState("");
    const [a_i, $a_i] = useState([]);
    useEffect(() => {
        $a_i(stringToArray(rawInput));
    }, [rawInput])
    return (
        <Grid container direction="column" spacing={gridSpacing}>
            <Grid
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    direction: "ltr",
                }}
                item
            >
                <HurwitzCriterionLecture />
            </Grid>

            <Grid
                spacing={gridSpacing}
                style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    marginTop: "1%",
                    direction: "ltr",
                }}
                container
            >
                <Grid xs={12} item>
                    <TextField
                        onChange={e => $rawInput(e.target.value)}
                        value={rawInput}
                        style={{ width: '100%'}}
                        sx={{px: 1}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="left">
                                    <MathJax>{"$$\\Delta(s) = \\Sigma \\lgroup$$"}</MathJax>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="right">
                                    <MathJax>{"$$ \\rgroup s^i$$"}</MathJax>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <hr />
                <Grid xs={12} item>
                    <HurwitzCriterionSolveBox a_i={a_i} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HurwitzCriterion;
