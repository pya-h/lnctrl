import * as go from 'gojs';

const nodes = [
    { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
    { key: 1, text: "Beta", color: "orange", loc: "150 0" },
    {
        key: 2,
        text: "Gamma",
        color: "lightgreen",
        loc: "0 150",
    },
    { key: 3, text: "Delta", color: "pink", loc: "150 150" },
];

const links = [
    { key: -1, from: 0, to: 1, text: "title", curve: go.Link.Bezier },
    { key: -2, from: 0, to: 2, text: "x2" },
    { key: -3, from: 1, to: 0, text: "x3", curve: go.Link.Bezier },
    { key: -4, from: 2, to: 3 },
    { key: -5, from: 3, to: 0, curve: go.Link.Bezier },
];

const sfg_sample = { nodes, links };
export default sfg_sample;
