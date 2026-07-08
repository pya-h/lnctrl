import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography,
} from "@mui/material";

import { IconSettings } from "@tabler/icons";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import SubCard from "views/ui-component/cards/SubCard";
import AnimateButton from "views/ui-component/extended/AnimateButton";
import {
    ReduxSetFontFamily,
    ReduxSetBorderRadius,
    ReduxSetMathPrecision,
    ReduxSetEnableZoom,
    ReduxSetThemeMode,
} from "store/actions";
import { gridSpacing } from "store/constant";
import Switcher from "views/ui-component/buttons/Switcher";
import { fonts } from "config";
// ==============================|| LIVE CUSTOMIZATION ||============================== //
const Customization = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(
        customization.borderRadius
    );
    const handleBorderRadius = (event, newValue) => setBorderRadius(newValue);
    const [precision, setPrecision] = useState(customization.mathPrecision);
    const updatePrecisionValue = (event, newValue) => {
        setPrecision(newValue);
    };

    useEffect(() => {
        dispatch(ReduxSetMathPrecision(precision));
    }, [precision, dispatch]);
    useEffect(() => {
        dispatch(ReduxSetBorderRadius(borderRadius));
    }, [dispatch, borderRadius]);

    // state - font family
    const [fontFamily, setFontFamily] = useState(customization.fontFamily);
    useEffect(() => {
        dispatch(ReduxSetFontFamily(fontFamily));
    }, [dispatch, fontFamily]);

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: "50%",
                        borderBottomLeftRadius: "4px",
                        borderTopRightRadius: "50%",
                        borderBottomRightRadius: "50%",
                        top: "25%",
                        position: "fixed",
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: { xs: "85vw", sm: 280 },
                        maxWidth: "100vw",
                    },
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 1 }}>
                        <Grid item xs={12}>
                            <SubCard title="Theme">
                                <Switcher
                                    choices={["Dark", "Light"]}
                                    setSwitch={(selectedValue) =>
                                        dispatch(
                                            ReduxSetThemeMode(
                                                ["Dark", "Light"][selectedValue]?.toLowerCase() || "dark"
                                            )
                                        )
                                    }
                                    defaultChoice={
                                        customization.navType === "dark"
                                            ? "Dark"
                                            : "Light"
                                    }
                                />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard title="Zoom">
                                <Switcher
                                    choices={["Disabled", "Enabled"]}
                                    setSwitch={(selectedValue) =>
                                        dispatch(
                                            ReduxSetEnableZoom(selectedValue)
                                        )
                                    }
                                    defaultChoice={customization.enableZoom}
                                />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* font family */}
                            <SubCard title="Font">
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={fontFamily}
                                        onChange={(e) =>
                                            setFontFamily(e.target.value)
                                        }
                                        name="row-radio-buttons-group"
                                    >
                                        {Object.keys(fonts).map((key) => (
                                            <FormControlLabel
                                                key={key}
                                                value={key}
                                                control={<Radio />}
                                                label={key}
                                                sx={{
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: 28,
                                                    },
                                                    "& .MuiFormControlLabel-label":
                                                        {
                                                            color: theme.palette
                                                                .grey[900],
                                                            fontFamily:
                                                                fonts[key],
                                                        },
                                                }}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="Calculation precision">
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        {precision} Digit after the decimal point
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ mt: 2.5 }}
                                >
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            12 digits
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            size="small"
                                            value={precision}
                                            onChange={updatePrecisionValue}
                                            aria-labelledby="discrete-slider-small-steps"
                                            marks
                                            step={1}
                                            min={4}
                                            max={12}
                                            color="secondary"
                                            sx={{
                                                "& .MuiSlider-valueLabel": {
                                                    color: "secondary.light",
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            4 digits
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="Corner rounding of the forms">
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ mt: 2.5 }}
                                >
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            100%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            size="small"
                                            value={borderRadius}
                                            onChange={handleBorderRadius}
                                            aria-labelledby="discrete-slider-small-steps"
                                            marks
                                            step={2}
                                            min={4}
                                            max={24}
                                            color="secondary"
                                            sx={{
                                                "& .MuiSlider-valueLabel": {
                                                    color: "secondary.light",
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            0%
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default Customization;
