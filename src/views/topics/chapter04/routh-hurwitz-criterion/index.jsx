import RouthHurwitzCriterionLecture from "./lecture";
import { useEffect, useState } from "react";
import { Grid, InputAdornment, TextField } from "@mui/material";
import RouthHurwitzCriterionSolveBox from "./solve";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";
import { stringToArray } from "math/calculus";
import { getCache, cacheParameters } from 'toolshed';

const RouthHurwitzCriterion = () => {
    const [rawInput, $rawInput] = useState(getCache("ch04-rhw", "rawInput", ""));
    const [a_i, $a_i] = useState([]);
    const [epsilon, $epsilon] = useState(0.000001);
    const [showEpsilonBar, setShowEpsilonBar] = useState(false);
    
    useEffect(() => {
        const ai = stringToArray(rawInput);
        $a_i(ai);
        setShowEpsilonBar(false);
        cacheParameters("ch04-rhw", {rawInput});

    }, [rawInput]);

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
                <RouthHurwitzCriterionLecture />
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
                        onChange={(e) => $rawInput(e.target.value)}
                        value={rawInput}
                        style={{ width: "100%" }}
                        sx={{ px: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="left">
                                    <MathJax>
                                        {"$$P(s) = \\Sigma \\lgroup$$"}
                                    </MathJax>
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
                {showEpsilonBar && (
                    <Grid xs={12} item>
                        <TextField
                            onChange={(e) => $epsilon(e.target.value)}
                            value={epsilon}
                            style={{ width: "100%" }}
                            sx={{ px: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="left">
                                        <MathJax>{"$$\\epsilon = $$"}</MathJax>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                )}
                <hr />
                <Grid xs={12} item>
                    <RouthHurwitzCriterionSolveBox
                        a_i={a_i}
                        epsilon={epsilon}
                        showEpsilonBar={(value) => {
                            setShowEpsilonBar(value);
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RouthHurwitzCriterion;
