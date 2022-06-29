import { strictPrecisionFormat } from "math/calculus";

export const mathjaxSpaces = (n) => {
    let str = "";
    for(let i = 0; i < n; i++, str += "\\quad");
    return str; 
}

export const writeRow = (row, label) => "$$ " + (label ? label : "") + row.map(element => `\\qquad${strictPrecisionFormat(element)}`).join(' ') + " $$";