import { Grid } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import "views/topics/topics.css";

import MatrixInput from "input-boxes/MatrixInput";
import { MathJax } from "better-react-mathjax";

const stateSpaceSymbolicEquationSystem =
    "$$\\begin{cases} \\dot{x}(t)  = Ax(t) \\\\ \\\\ y(t) = Cx(t) \\end{cases}$$";
const SpaceStateParameters = ({ A, $A, C, $C, x_0, $x_0 }) => {
    return (
        <SubCard
            darkBorder
            title="پارامترها"
            sx={{
                direction: "ltr",
                textAlign: "right",
                height: "100%",
                m: 0,
                p: 0
            }}
        >
            <Grid spacing={1} direction="row" container>
                <Grid xs={12} item>
                    <SubCard sx={{ direction: "ltr" }}>
                        <Grid
                            id="step0"
                            sx={{ margin: "auto" }}
                            container
                            direction="row"
                        >
                            <MathJax>
                                {stateSpaceSymbolicEquationSystem}
                            </MathJax>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid sx={{ py: 3 }} spacing={0.6} container>
                    <Grid className="matrix-left-hand" item>
                        <MathJax>$$A = $$</MathJax>
                    </Grid>
                    <Grid item>
                        <MatrixInput
                            rows={2}
                            columns={2}
                            initial={A}
                            setter={(newA) => $A(newA)}
                        />
                    </Grid>
                </Grid>
                <Grid spacing={0.6} container>
                    <Grid className="matrix-left-hand" item>
                        <MathJax>$$C = $$</MathJax>
                    </Grid>
                    <Grid item>
                        <MatrixInput
                            rows={1}
                            columns={2}
                            initial={C}
                            setter={(newC) => $C(newC)}
                        />
                    </Grid>
                </Grid>
                <Grid spacing={0.6} container>
                    <Grid className="matrix-left-hand" item>
                        <MathJax>$$x(0) = $$</MathJax>
                    </Grid>
                    <Grid item>
                        <MatrixInput
                            rows={2}
                            columns={1}
                            initial={x_0}
                            setter={(newX_0) => $x_0(newX_0)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SpaceStateParameters;
