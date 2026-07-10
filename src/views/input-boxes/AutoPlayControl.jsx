import { useState, useRef, useEffect } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { MathJax } from "better-react-mathjax";
import AutoPlay from "toolshed/autoplay";

// A small control that lets the user pick one system parameter and sweep it from a
// start value to an end value, one step every `interval` ms. `params` is a list of
// { key, label, value, setValue, validate? } describing the parameters that are
// meaningful to animate (graph-limit fields like ti/tf/N must be left out). While a
// run is live the parent is told through `onRunningChange` so it can disable its
// inputs, and this button turns into a stop control.
const AutoPlayControl = ({ params, running, onRunningChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(params[0]?.key);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [step, setStep] = useState("0.5");
    const [interval, setIntervalMs] = useState("100");
    const [error, setError] = useState(null);
    const player = useRef(null);

    // never leave an interval running if the sandbox unmounts mid-animation;
    // stop silently since the parent is already tearing down at that point
    useEffect(() => () => player.current && player.current.stop(false), []);

    const param = params.find((p) => p.key === selected) || params[0];

    const openModal = () => {
        setError(null);
        const current = +param.value || 0;
        setFrom(String(current));
        setTo(String(current + 5));
        setOpen(true);
    };

    const start = () => {
        const settings = { from, to, step, interval };
        const err =
            AutoPlay.validate(settings) ||
            (param.validate && param.validate(+from, +to));
        if (err) {
            setError(err);
            return;
        }
        setOpen(false);
        player.current = new AutoPlay({
            ...settings,
            setValue: param.setValue,
            onStop: () => onRunningChange(false),
        });
        onRunningChange(true);
        player.current.play();
    };

    const stop = () => player.current && player.current.stop();

    if (running)
        return (
            <Tooltip title="Stop autoplay">
                <IconButton color="error" onClick={stop}>
                    <StopCircleIcon />
                </IconButton>
            </Tooltip>
        );

    const field = (label, value, setter, unit) => (
        <Grid xs={6} sx={{ p: 0.5 }} item>
            <TextField
                label={label}
                value={value}
                onChange={(e) => setter(e.target.value)}
                size="small"
                sx={{ width: "100%" }}
                InputProps={
                    unit
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">{unit}</InputAdornment>
                              ),
                          }
                        : undefined
                }
            />
        </Grid>
    );

    return (
        <>
            <Tooltip title="Autoplay a parameter">
                <IconButton color="secondary" onClick={openModal}>
                    <PlayCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="xs"
                fullWidth
                sx={{ direction: "ltr" }}
            >
                <DialogTitle>Autoplay a parameter</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                        Sweep one parameter automatically to see how the graph
                        reacts. The other inputs keep their current values.
                    </Typography>
                    {params.length > 1 && (
                        <ToggleButtonGroup
                            value={selected}
                            exclusive
                            size="small"
                            onChange={(e, val) => val && setSelected(val)}
                            sx={{ mb: 1 }}
                        >
                            {params.map((p) => (
                                <ToggleButton key={p.key} value={p.key} sx={{ px: 2 }}>
                                    <MathJax>{`$${p.label}$`}</MathJax>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    )}
                    <Grid container>
                        {field("Start", from, setFrom)}
                        {field("End", to, setTo)}
                        {field("Step", step, setStep)}
                        {field("Interval", interval, setIntervalMs, "ms")}
                    </Grid>
                    {error && (
                        <Alert severity="error" sx={{ mt: 1.5 }}>
                            {error}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={start}
                    >
                        Play
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AutoPlayControl;
