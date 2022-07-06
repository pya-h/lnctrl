import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./input-boxes.css";
import { Grid } from "@mui/material";

const MatrixInput = ({ rows, columns, initial, setter }) => {
    const [matrix, setMatrix] = useState([...initial]);
    const columnSize = 12 / columns;

    const updateElement = (i, j, event) => {
        if (event && event.target) {
            const temp = [...matrix];
            if(rows > 1)
                temp[i][j] = Number(event.target.value);
            else
                temp[j] = Number(event.target.value);
            setter(temp);
            setMatrix(temp);
        }
    };
    return (
        <Box
            component="form"
            className="input-matrix"
            noValidate
            autoComplete="off"
        >
            {Array(rows)
                .fill(0)
                .map((_, i) => (
                    <Grid container direction="row">
                        {Array(columns)
                            .fill(0)
                            .map((_, j) => (
                                <Grid xs={columnSize} item>
                                    <TextField
                                        sx={{
                                            input: {
                                                textAlign: "center",
                                                p: "1rem",
                                            },
                                        }}
                                        style={{ padding: "1rem" }}
                                        variant="standard"
                                        value={rows > 1 ? matrix[i][j] : matrix[j]}
                                        onChange={(event) =>
                                            updateElement(i, j, event)
                                        }
                                    />
                                </Grid>
                            ))}
                    </Grid>
                ))}
        </Box>
    );
};

export default MatrixInput;
