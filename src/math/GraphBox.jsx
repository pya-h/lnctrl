import React from "react";
import Plot from "react-plotly.js";

const GraphBox = ({ traces, title, width, height = 500 }) => {
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

    return (
        <Plot
            style={{ textAlign: "center" }}
            //id="graphBox"
            data={traces}
            layout={{
                // width: 1000,
                // autosize: true,
                margin: {
                    t: 30, //top margin
                    l: 30, //left margin
                    r: 20, //right margin
                    b: 30, //bottom margin
                },
                xaxis: {
                    rangemode: "tozero",
                    zeroline: true
                },
                yaxis: {
                    rangemode: "tozero",
                    zeroline: true

                },
                height,
                title,
                // hoverlabel: { bgcolor: "#FFF" },
                hoverlabel: {align:'auto', boxmode: 'overlay', font:{color:'#000000FF'}},
                legend: {orientation: 'h'}//, y: -0.3},
            }}
        />
    );
};

export default GraphBox;
