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
} from "store/actions";
import { gridSpacing } from "store/constant";
import Switcher from "views/ui-component/buttons/Switcher";
// ==============================|| LIVE CUSTOMIZATION ||============================== //
const getSelectedFont = (selection) => {
    switch (selection) {
        case "B Nazanin":
            return "B Nazanin";
        case "Calibri":
            return "Calibri";
        case "BYekan":
            return "BYekan";
        case "Roboto":
            return "Roboto";
        case "Vazir-Bold":
            return "Vazir-Bold";
        default:
            return "sans-serif";
    }
};
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

    const initialFont = getSelectedFont(customization.fontFamily);

    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        const newFont = getSelectedFont(fontFamily);
        dispatch(ReduxSetFontFamily(newFont));
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
                        borderBottomLeftRadius: "50%",
                        borderTopRightRadius: "50%",
                        borderBottomRightRadius: "4px",
                        top: "25%",
                        position: "fixed",
                        left: 10,
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
                anchor="left"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280,
                    },
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 1 }}>
                        <Grid item xs={12}>
                            <SubCard title="زوم">
                                <Switcher
                                    choices={["غیرفعال", "فعال"]}
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
                            <SubCard title="فونت">
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={fontFamily}
                                        onChange={(e) =>
                                            setFontFamily(e.target.value)
                                        }
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="Vazir-Bold"
                                            control={<Radio />}
                                            label="Vazir-Bold"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                                "& .MuiFormControlLabel-label":
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Calibri"
                                            control={<Radio />}
                                            label="Calibri"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                                "& .MuiFormControlLabel-label":
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="B Nazanin"
                                            control={<Radio />}
                                            label="B Nazanin"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                                "& .MuiFormControlLabel-label":
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="BYekan"
                                            control={<Radio />}
                                            label="BYekan"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                                "& .MuiFormControlLabel-label":
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Roboto"
                                            control={<Radio />}
                                            label="Roboto"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                                "& .MuiFormControlLabel-label":
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="دقت محاسبات">
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        {precision} رقم پس از ممیز
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
                                            ۱۲ رقم
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
                                            4 رقم
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="خمیدگی گوشه فرم ها">
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
