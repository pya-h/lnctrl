import * as go from "gojs";

const sfg_example = [
    // step 0
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "0 0" },
            { key: 2, text: "x2", color: "orange", loc: "150 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "0 150",
            },
            { key: 4, text: "x4", color: "pink", loc: "150 150" },
            { key: 5, text: "x5", color: "green", loc: "300 150" },
            { key: 6, text: "x6", color: "red", loc: "450 65" },
            { key: 7, text: "x7", color: "brown", loc: "600 65" },
            { key: 8, text: "x8", color: "black", loc: "750 0" },
            { key: 9, text: "x9", color: "white", loc: "750 150" },
        ],
        links: [
            { key: -1, from: 1, to: 2, text: "G1", curve: go.Link.Bezier },
            { key: -2, from: 1, to: 2, text: "G2" },
            { key: -3, from: 3, to: 4, text: "G3" },
            { key: -5, from: 4, to: 5, curve: go.Link.Bezier, text: "G4" },
            { key: -4, from: 5, to: 4, text: "G5" },
            { key: -6, from: 2, to: 6, text: "G6" },
            { key: -7, from: 5, to: 6, text: "G7" },
            { key: -8, from: 6, to: 7, text: "G8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
    // ******** step 1 ********
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "0 0" },
            { key: 2, text: "x2", color: "orange", loc: "150 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "0 150",
            },
            { key: 4, text: "x4", color: "pink", loc: "150 150" },
            { key: 5, text: "x5", color: "green", loc: "300 150" },
            { key: 6, text: "x6", color: "red", loc: "450 65" },
            { key: 7, text: "x7", color: "brown", loc: "600 65" },
            { key: 8, text: "x8", color: "black", loc: "750 0" },
            { key: 9, text: "x9", color: "white", loc: "750 150" },
        ],
        links: [
            { key: -1, from: 1, to: 2, text: "F1" },
            { key: -3, from: 3, to: 4, text: "G3" },
            { key: -5, from: 4, to: 5, curve: go.Link.Bezier, text: "G4" },
            { key: -4, from: 5, to: 4, text: "G5" },
            { key: -6, from: 2, to: 6, text: "G6" },
            { key: -7, from: 5, to: 6, text: "G7" },
            { key: -8, from: 6, to: 7, text: "G8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
    // ******** step 2 ********
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "0 0" },
            { key: 2, text: "x2", color: "orange", loc: "150 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "0 150",
            },
            { key: 5, text: "x5", color: "green", loc: "200 150" },
            { key: 6, text: "x6", color: "red", loc: "450 65" },
            { key: 7, text: "x7", color: "brown", loc: "600 65" },
            { key: 8, text: "x8", color: "black", loc: "750 0" },
            { key: 9, text: "x9", color: "white", loc: "750 150" },
        ],
        links: [
            { key: -1, from: 1, to: 2, text: "F1" },
            { key: -3, from: 3, to: 5, text: "F2" },
            { key: -5, from: 5, to: 5, text: "F3" },
            { key: -6, from: 2, to: 6, text: "G6" },
            { key: -7, from: 5, to: 6, text: "G7" },
            { key: -8, from: 6, to: 7, text: "G8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
    // ******** step 3 ********
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "0 0" },
            { key: 2, text: "x2", color: "orange", loc: "150 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "0 150",
            },
            { key: 5, text: "x5", color: "green", loc: "200 150" },
            { key: 6, text: "x6", color: "red", loc: "450 65" },
            { key: 7, text: "x7", color: "brown", loc: "600 65" },
            { key: 8, text: "x8", color: "black", loc: "750 0" },
            { key: 9, text: "x9", color: "white", loc: "750 150" },
        ],
        links: [
            { key: -1, from: 1, to: 2, text: "F1" },
            { key: -3, from: 3, to: 5, text: "F4" },
            { key: -6, from: 2, to: 6, text: "G6" },
            { key: -7, from: 5, to: 6, text: "G7" },
            { key: -8, from: 6, to: 7, text: "G8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
    // ******** step 4 ********
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "200 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "200 150",
            },
            { key: 6, text: "x6", color: "red", loc: "450 65" },
            { key: 7, text: "x7", color: "brown", loc: "600 65" },
            { key: 8, text: "x8", color: "black", loc: "750 0" },
            { key: 9, text: "x9", color: "white", loc: "750 150" },
        ],
        links: [
            { key: -1, from: 1, to: 6, text: "F5" },
            { key: -3, from: 3, to: 6, text: "F6" },
            { key: -8, from: 6, to: 7, text: "G8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
    // ******** step 5 ********
    {
        nodes: [
            { key: 1, text: "x1", color: "lightblue", loc: "200 0" },
            {
                key: 3,
                text: "x3",
                color: "lightgreen",
                loc: "200 150",
            },
            { key: 7, text: "x7", color: "brown", loc: "400 65" },
            { key: 8, text: "x8", color: "black", loc: "600 0" },
            { key: 9, text: "x9", color: "white", loc: "600 150" },
        ],
        links: [
            { key: -1, from: 1, to: 7, text: "F7" },
            { key: -3, from: 3, to: 7, text: "F8" },
            { key: -9, from: 7, to: 8, text: "G9" },
            { key: -10, from: 7, to: 9, text: "G10" },
        ],
    },
        // ******** step 5 ******** AGAIN
        {
            nodes: [
                { key: 1, text: "x1", color: "lightblue", loc: "200 0" },
                {
                    key: 3,
                    text: "x3",
                    color: "lightgreen",
                    loc: "200 150",
                },
                { key: 7, text: "x7", color: "brown", loc: "400 65" },
                { key: 8, text: "x8", color: "black", loc: "600 0" },
                { key: 9, text: "x9", color: "white", loc: "600 150" },
            ],
            links: [
                { key: -1, from: 1, to: 7, text: "F7" },
                { key: -3, from: 3, to: 7, text: "F8" },
                { key: -9, from: 7, to: 8, text: "G9" },
                { key: -10, from: 7, to: 9, text: "G10" },
            ],
        },
];

export default sfg_example;
