import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import FullScreen from "@mui/icons-material/Fullscreen";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import { Grid, IconButton, Slider, Stack } from "@mui/material";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

const GraphMenu = ({
    capture,
    graphFileName,
    formulaFileName,
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

    const save = () => {
        const graphBoxElement = document.getElementById("graphBox");
        // normal .blob has dark bakground
        // convert background to light
        const canvasWithBackground = document.createElement("canvas");
        canvasWithBackground.width = graphBoxElement.width;
        canvasWithBackground.height = graphBoxElement.height;

        const ctx = canvasWithBackground.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, graphBoxElement.width, graphBoxElement.height);

        ctx.drawImage(graphBoxElement, 0, 0);
        // save
        canvasWithBackground.toBlob((blob) => {
            saveAs(blob, graphFileName);
        });

        html2canvas(document.getElementById("formulaBox")).then((canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, formulaFileName);
            });
        });
    };

    useEffect(() => {
        update({ thickness: thicknessSliderPercentage / 20.0 + 0.1 });
    }, [thicknessSliderPercentage, update]);

    return (
        <Grid sx={{ direction: "rtl" }} container direction="row">
            <Grid md={10} sm={8} xs={6} sx={{ direction: "rtl" }} item>
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
                <IconButton
                    color="secondary"
                    aria-label="capture graph"
                    component="span"
                    onClick={capture}
                >
                    <PhotoCamera />
                </IconButton>
                <IconButton
                    color="secondary"
                    aria-label="download graph"
                    component="span"
                    onClick={save}
                >
                    <SaveAltIcon />
                </IconButton>

                <IconButton
                    color="secondary"
                    aria-label="capture graph"
                    component="span"
                    onClick={reset}
                >
                    <DeleteIcon />
                </IconButton>
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
