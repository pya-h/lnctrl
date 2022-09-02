import { strictPrecisionFormat, randomize } from "math/calculus";

export const mathjaxSpaces = (n) => {
    let str = "";
    for (let i = 0; i < n; i++, str += "\\quad");
    return str;
};
export const browserLockBreaker = () => {
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
    const progressValue = progress | 0;
    if (progressValue % step === 0) {
        progressBar.style.width = `${progressValue}%`;
        progressBar.innerHTML = `${progressValue}%`;
        await browserLockBreaker();
    }
};

export const writeRow = (row, label) =>
    "$$ " +
    (label ? label : "") +
    row.map((element) => `\\qquad${strictPrecisionFormat(element)}`).join(" ") +
    " $$";

export const joinSorted = (lst1, lst2, groupTags, duplicates = true) => {
    // groupTags is a two membered list containing the string tag for each list item
    lst1.sort((l1, l2) => l1 - l2);
    lst2.sort((l1, l2) => l1 - l2);
    const result = Array(lst1.length + lst2.length).fill(0);
    let i, j;
    for (
        i = 0, j = 0;
        i < lst1.length && j < lst2.length;
        result[i + j] =
            lst1[i] <= lst2[j]
                ? { value: lst1[i++], group: groupTags[0] }
                : { value: lst2[j++], group: groupTags[1] }
    );
    for (
        ;
        i < lst1.length;
        result[i + j] = { value: lst1[i++], group: groupTags[0] }
    );
    for (
        ;
        j < lst2.length;
        result[i + j] = { value: lst2[j++], group: groupTags[1] }
    );
    if (!duplicates)
        for (i = 0; i < result.length - 1; i++)
            if (
                result[i].value === result[i + 1].value &&
                result[i].group !== result[i + 1].group
            )
                result.splice(i--, 2);

    return result;
};


export const randomColor = () => {
    return {
        R: randomize(200),
        G: randomize(200),
        B: randomize(200),
    };
};
