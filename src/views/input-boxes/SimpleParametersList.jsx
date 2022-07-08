import { Grid, InputAdornment, TextField } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { Fragment } from "react";

const SimpleParametersList = ({ parameters, setters, labels, units }) => {
    return (
        <Fragment>
            {parameters instanceof Array &&
                parameters.map((param, i) => (
                    <Grid md={12} sm={4} xs={6} item>
                        <TextField
                            onChange={(e) => setters[i](e.target.value)}
                            value={param}
                            sx={{ width: "100%" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="left">
                                        <MathJax>{labels[i]}</MathJax>
                                    </InputAdornment>
                                ),
                                endAdornment: units[i] && (
                                    <InputAdornment position="right">
                                        <MathJax>{units[i]}</MathJax>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                ))}
        </Fragment>
    );
};

export default SimpleParametersList;
