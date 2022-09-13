const tools = {
    path: {
        hierarchy: (pathname) => {
            //const decomposedPath = (pathname ? pathname : window.location.pathname).split('/').filter(str => str); // filter '' (null) items
            const decomposedPath = pathname.split("/").filter((str) => str); // filter '' (null) items

            // TEMP FOR GITHUB ONLY *********
            if (decomposedPath[0] === "lnctrl") decomposedPath.shift();
            return [...decomposedPath];
        },
    },
};

export default tools;