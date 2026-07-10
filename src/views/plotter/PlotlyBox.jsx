import React from "react";
import Plot from "react-plotly.js";
import { MapInteractionCSS } from "react-map-interaction";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const PlotlyBox = ({
    traces,
    title,
    width,
    height = 500,
    logX,
    hideX,
    hideY,
    yRange,
    hideLegends,
}) => {
    /*const temp_layout = {
        xaxis: {
            zeroline: true,
            rangemode: "tozero",
            autotick: false,
            ticks: "outside",
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: "#000",
        },
        yaxis: {
            zeroline: true,
            rangemode: "tozero",
            autotick: false,
            ticks: "outside",
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: "#000",
        },
    };*/
    const customization = useSelector((state) => state.customization);
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const plotBg = theme.palette.background.paper;
    const textColor = isDark ? theme.palette.text.primary : "#000000FF";
    const plot = (
        <Plot
            style={{ textAlign: "center" }}
            //id="PlotlyBox"
            data={traces}
            layout={{
                // width: 1000,
                // autosize: true,
                showlegend: !hideLegends,
                paper_bgcolor: plotBg,
                plot_bgcolor: plotBg,
                margin: {
                    t: 30, //top margin
                    l: 30, //left margin
                    r: 20, //right margin
                    b: 30, //bottom margin
                },
                xaxis: {
                    rangemode: "tozero",
                    zeroline: true,
                    type: !logX ? "dec" : "log",
                    visible: !hideX,
                    color: textColor,
                    gridcolor: isDark ? theme.palette.divider : undefined,
                    zerolinecolor: isDark ? theme.palette.divider : undefined,
                },
                yaxis: {
                    rangemode: "tozero",
                    zeroline: true,
                    visible: !hideY,
                    range: yRange,
                    color: textColor,
                    gridcolor: isDark ? theme.palette.divider : undefined,
                    zerolinecolor: isDark ? theme.palette.divider : undefined,
                },

                height,
                title,
                font: { color: textColor },
                // hoverlabel: { bgcolor: "#FFF" },
                hoverlabel: {
                    align: "auto",
                    boxmode: "overlay",
                    font: { color: textColor },
                    bgcolor: plotBg,
                },
                legend: { orientation: "h", font: { color: textColor } }, //, y: -0.3},
            }}
        />
    );
    return customization.enableZoom ? (
        <MapInteractionCSS disablePan={true}>{plot}</MapInteractionCSS>
    ) : (
        plot
    );
};

export default PlotlyBox;
