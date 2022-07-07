import { strictPrecisionFormat } from "math/calculus";

export const mathjaxSpaces = (n) => {
    let str = "";
    for (let i = 0; i < n; i++, str += "\\quad");
    return str;
};
export const preventBrowserLock = () => {
    return new Promise((r) => setTimeout(r, 0));
};

export const path = {
    hierarchy: (pathname) => {
        //const decomposedPath = (pathname ? pathname : window.location.pathname).split('/').filter(str => str); // filter '' (null) items
        const decomposedPath = pathname.split("/").filter((str) => str); // filter '' (null) items

        // TEMP FOR GITHUB ONLY *********
        if (decomposedPath[0] === "lnctrl") decomposedPath.shift();
        return [...decomposedPath];
    },
};
export const makeProgress = async (progressBar, progress, step = 5) => {
    const progressValue = (progress | 0);
    if (progressValue % step === 0) {
        progressBar.style.width = `${progressValue}%`;
        progressBar.innerHTML = `${progressValue}%`;
        await preventBrowserLock();
    }
};

export const writeRow = (row, label) =>
    "$$ " +
    (label ? label : "") +
    row.map((element) => `\\qquad${strictPrecisionFormat(element)}`).join(" ") +
    " $$";
