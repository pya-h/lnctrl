import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import FullScreen from "@mui/icons-material/Fullscreen";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import { Grid, IconButton, Slider, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

const GraphMenu = ({
    capture,
    reset,
    update,
    toggle3DPlot,
}) => {
    const [is3DModeEnabled, set3DModeEnaabled] = useState(false);
    const [thicknessSliderPercentage, setThicknessSliderPercentage] =
        useState(20);

    const toggle3DMode = () => {
        set3DModeEnaabled(!is3DModeEnabled);
        toggle3DPlot();
    };

    useEffect(() => {
        update({ thickness: thicknessSliderPercentage / 20.0 + 0.1 });
    }, [thicknessSliderPercentage, update]);

    return (
        <Grid sx={{ direction: "rtl" }} container direction="row">
            <Grid md={10} sm={8} xs={6} sx={{ direction: "rtl" }} item>
                {toggle3DPlot && (
                    <IconButton
                        color="secondary"
                        aria-label="capture graph"
                        component="span"
                        onClick={toggle3DMode}
                    >
                        {is3DModeEnabled ? (
                            <ThreeSixtyIcon />
                        ) : (
                            <ThreeDRotationIcon />
                        )}
                    </IconButton>
                )}
                {capture && <IconButton
                    color="secondary"
                    aria-label="capture graph"
                    component="span"
                    onClick={capture}
                >
                    <PhotoCamera />
                </IconButton>}

                {reset && <IconButton
                    color="secondary"
                    aria-label="capture graph"
                    component="span"
                    onClick={reset}
                >
                    <DeleteIcon />
                </IconButton>}
            </Grid>
            <Grid md={2} sm={4} xs={6} item>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mt: 0.5, direction: "ltr" }}
                    alignItems="center"
                >
                    <FullScreen />
                    <Slider
                        aria-label="Volume"
                        value={thicknessSliderPercentage}
                        onChange={(e, value) =>
                            setThicknessSliderPercentage(value)
                        }
                    />
                    <FilterCenterFocusIcon />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default GraphMenu;
