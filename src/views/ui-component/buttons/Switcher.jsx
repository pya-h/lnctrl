import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { Grid } from "@mui/material";
import "./buttons.css";
import { useState } from "react";

export default function Switcher({ setSwitch, choices}) {
    const [selected, setSelected] = useState(0); // 0 right, 1 left

    // const selectedStyle = {variant: "contained", style: { width: '75%', backgroundColor: purple[600], color: 'white'}};
    // const notSelectedStyle = {variant: "outline", style:{width: '25%' }};

    return (
        <Stack 
            className="switcher-stack"
            // sx={{py: 1}}
            xs={12}
            spacing={1}
            direction="row"
        >
            <Grid xs={12} dir="rtl" container>
                <Button
                    onClick={() => {
                        setSelected(1);
                        if(choices.length > 1)
                            setSwitch(1);
                    }}
                    className="switcher-button"
                    variant={"outlined"}
                    style={{
                        width: selected ? "75%" : "25%",
                        background: selected ? purple[600] : "transparent",
                        color: selected ? "white" : purple[700],
                    }}
                    // style={{width: selected ? '75%' : '25%'}}
                    // {... (selected ? selectedStyle: notSelectedStyle)}
                >
                    {choices[1]}
                </Button>
                <Button
                    onClick={() => {
                        setSelected(0);
                        if(choices.length > 0)
                            setSwitch(0);
                    }}
                    className="switcher-button"
                    // {... (!selected ? selectedStyle: notSelectedStyle)}
                    color="primary"
                    variant={"contained"}
                    style={{
                        width: !selected ? "75%" : "25%",
                        background: !selected ? purple[600] : "transparent",
                        color: !selected ? "white" : purple[700],
                    }}
                >
                    {choices[0]}
                </Button>
            </Grid>
        </Stack>
    );
}
