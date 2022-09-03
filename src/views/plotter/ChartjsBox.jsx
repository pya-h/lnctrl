import { useState, useEffect, useCallback } from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import "./plotbox.css";
import { strictPrecisionFormat } from "math/calculus";

const functionPlot = {
    id: "functionPlot",
    beforeInit: (chart) => {
        // We get the chart data
        let data = chart.config.data;

        // For every dataset ...
        for (let i = 0; i < data.datasets.length; i++) {
            // For every label ...
            for (let j = 0; j < data.labels.length; j++) {
                // We get the dataset's function and calculate the value

                const mathFunction = data.datasets[i].function;
                if (mathFunction) {
                    // if function parameter is not null ( o.w. use datasets.data)
                    let x = data.labels[j];
                    // Then we add the value to the dataset data
                    data.datasets[i].data.push(mathFunction(x));
                }
            }
        }
    },
};

Chart.register(
    functionPlot,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartjsBox = ({ x, graphs, description }) => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState(null);
    const [zoom, setZoom] = useState(1.0);
    const [boxHeight, setBoxHeight] = useState(160);
    const yAxisLimit = useCallback(() => {
        if (graphs instanceof Array && graphs.length >= 1) {
            let yAxisLimit = graphs[0].y instanceof Array ? graphs[0].y[0] : 10;
            for (const graph of graphs) {
                for (const yi of graph.y) {
                    if (yAxisLimit <= yi) yAxisLimit = yi;
                }
            }
            return yAxisLimit >= 0 ? yAxisLimit + zoom : 0;
        }
        return 10; //default limit
    }, [graphs, zoom]);

    useEffect(() => {
        setOptions({
            responsive: true,
            elements: {
                point: {
                    radius: 0.3, //EDIIIIIIIIIT
                },
            },
            scales: {
                xAxis: {
                    display: true,
                    ticks: {
                        //suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        beginAtZero: true, // minimum value will be 0.
                    },
                    // ticks: {
                    //     maxTicksLimit: 10, //EDITTTTTT
                    // },
                    // callback: function(val, index) {
                    //     // Hide the label of every 2nd dataset
                    //     return index < 40 ? this.getLabelForValue(val) : '';
                    //   },
                    //   color: 'red',
                },
                // yAxis: {ticks: {min: yAxisLimit()}, max: yAxisLimit() },
                yAxis: { max: yAxisLimit() },

                // yAxes: [
                //     {
                //         display: true,
                //         stacked: true,
                //         ticks: {
                //             min: 0, // minimum value
                //             max: 10, // maximum value
                //         },
                //     },
                // ],
            },

            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        usePointStyle: true,
                    },
                    onHover: (evt, item, legend) => {
                        legend.chart.data.datasets[
                            item.datasetIndex
                        ].pointStyle = "rectRot";
                        legend.chart.update();
                    },
                    onLeave: (evt, item, legend) => {
                        legend.chart.data.datasets[
                            item.datasetIndex
                        ].pointStyle = "";
                        legend.chart.update();
                    },
                },
                title: {
                    display: true,
                    text: description,
                },
            },
        });
    }, [description, graphs, yAxisLimit]);

    useEffect(() => {
        if (x instanceof Array) {
            setZoom(1.0);

            const datasets = graphs.map((graph) => {
                return {
                    label: graph.tag,
                    function: graph.function,
                    backgroundColor: `rgba(${graph.color.R}, ${graph.color.G}, ${graph.color.B}, 50)`,
                    data: !graph.x
                        ? graph.y
                        : graph.x.map((xi, i) => {
                              return { x: xi, y: graph.y[i] };
                          }),
                    borderWidth: graph.thickness,
                    borderColor: `rgba(${graph.color.R}, ${graph.color.G}, ${graph.color.B}, 50)`,
                    fill: false,
                };
            });
            // add y = 0 line to draw yAxis full
            datasets.push({
                label: "y=0",
                backgroundColor: `rgba(0, 0, 0, 10)`,
                data: [...x.map((xi) => 0)],
                borderWidth: 0.1,
                borderColor: `rgba(255, 255, 255, 255)`,
                fill: false,
            });

            setData({
                labels: x ? x.map((xi) => strictPrecisionFormat(xi)) : [],
                datasets,
            });
        }
    }, [x, graphs]);

    const zoomOut = () => {
        setZoom(zoom + Math.floor(yAxisLimit() / 10));
    };

    return (
        data &&
        data.datasets instanceof Array && (
            <div style={{width: '100%', height: '100%'}} className="plotbox">
                <Line
                    onClick={zoomOut}
                    className="plotbox"
                    options={options}
                    height={boxHeight}
                    data={data}
                    id="ChartjsBox"
                />
            </div>
        )
    );
};

export default ChartjsBox;
