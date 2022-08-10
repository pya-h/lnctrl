import React, { useCallback } from "react";
import "./input-boxes.css";
import calculus from "math/calculus";
import { useState, useEffect, useRef } from "react";
import ReactCursorPosition from "react-cursor-position";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { MathJax } from "better-react-mathjax";

/* react-cursor-position props
{
    detectedEnvironment: {
        isMouseDetected: false,
        isTouchDetected: false,
    },
    elementDimensions: {
        width: Number,
        height: Number
    },
    isActive: Boolean,
    isPositionOutside: Boolean,
    position: {
        x: Number,
        y: Number
    }
}

*/
// for enabling mouse down to drag a point
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const axisOffsets = (psize, grids = 5) =>
    grids >= 5
        ? psize * (0.2 / 7 + (grids - 5) / ((grids + 1) * (grids + 5)))
        : -(psize / 10) / (1 + 3.5 * grids) + (psize * 0.2) / 7;

const CURSOR_Y_OFFSET = 38,
    DEFAULT_GRIDS = 6;

const CoordinateSystemContent = ({
    elementDimensions, // react-cursor-position
    position, // react-cursor-position
    isPositionOutside, // react-cursor-position
    point = { x: 0, y: 0, select: () => {} },
    extra, // = {point: null, select: null},
    options = { pointSize: 7, grids: DEFAULT_GRIDS, pointColor: null }, // pointCOLOR
    scale = 1,
    viewpoint,
}) => {
    const [x, $x] = useState(0);
    const [y, $y] = useState(0);
    // css grid
    const [grids, $grids] = useState(5); // 5x5
    const [pointSize, $pointSize] = useState(7);

    /* OLD version : 
        const update = (e) => {
            const xmax = boxObject.offsetWidth / 2,
                ymax = (boxObject.offsetHeight + 1) / 2; // + 1 is NEEDED?
            const dx = calculus.round((e.clientX - xmax) / xmax),
                dy = calculus.round((ymax - e.nativeEvent.offsetY) / ymax);
            $x(dx * scale);
            $y(dy * scale);};
     */
    const update = (e) => {
        // const boxObject = document.getElementById("#box");
        if (!isPositionOutside) {
            const xmax = elementDimensions.width / 2,
                ymax = (elementDimensions.height - CURSOR_Y_OFFSET) / 2; // + 1 is NEEDED?
            const dx = calculus.round((position.x - xmax) / xmax),
                dy = calculus.round((ymax - position.y) / ymax);
            const vx = dx * scale * grids,
                vy = dy * scale * grids;
            $x(vx);
            $y(vy);
            viewpoint(vx, vy);
        }
    };

    const updatePointLocation = useCallback(
        (px, py, index = 0) => {
            // update CSS
            const objectPoint = document.getElementById(`#point${index}`);
            objectPoint.style.setProperty("--x", px);
            objectPoint.style.setProperty(
                "--y",
                py - axisOffsets(pointSize, grids)
            );
        },
        [pointSize, grids]
    );

    const registerPoint = (isExtra = false) => {
        // update(e);
        // put a point inside the box
        // update the values in the caller component (e.g. parameter boxes in examples)
        if (!isExtra) {
            if (point && point.select) point.select({ x, y });
            // for extra point (second point)
        } else if (extra && extra.select) extra.select({ x, y });

        viewpoint(x, y);
        // after updating values in the parameter.js components => point prop will be updated => view updater useEffect (immediately in below) will be triggered
    };

    const [isMouseDown, setMouseDown] = useState(false);
    useInterval(registerPoint, isMouseDown ? 10 : null);
    const [isMouseDownForXpoint, setMouseDownForXpoint] = useState(false);
    useInterval(() => registerPoint(true), isMouseDownForXpoint ? 10 : null);

    useEffect(() => {
        // view updater useEffect
        if (point && scale !== 0) {
            // if(point.x !== x || (point.y !== null && point.y !== y))
            const px = Number(point.x),
                py = Number(point.y);
            const ndx = calculus.round(px / (grids * scale)),
                ndy = calculus.round(py / (grids * scale));
            updatePointLocation(ndx * grids, ndy * grids, 0);

            // $x(px);
            // $y(py);
        }
    }, [point, scale, grids, updatePointLocation]);

    // for extra point changes
    useEffect(() => {
        // view updater useEffect
        if (extra && scale !== 0) {
            // if(extra.x !== x || (extra.y !== null && extra.y !== y))
            const px = Number(extra.x),
                py = Number(extra.y);
            const ndx = calculus.round(px / (grids * scale)),
                ndy = calculus.round(py / (grids * scale));
            updatePointLocation(ndx * grids, ndy * grids, 1);

            // $x(px);
            // $y(py);
        }
    }, [extra, scale, grids, updatePointLocation]);

    useEffect(() => {
        // if dragging put the point out of range of the scale
        // scale will be expanded
        // stop dragging to avoid mouse drag bugs
        setMouseDown(false);
        setMouseDownForXpoint(false);
    }, [scale]);
    // set options:
    useEffect(() => {
        if (options.pointSize && options.pointSize >= 0)
            $pointSize(options.pointSize);

        if (options.grids && options.grids >= 0) $grids(options.grids);
    }, [options]);

    useEffect(() => {
        if (grids >= 0 && grids >= 0) {
            document.documentElement.style.setProperty("--grids-x", grids);
            document.documentElement.style.setProperty("--grids-y", grids);
            document.documentElement.style.setProperty(
                "--grids-total",
                grids * 2
            );
        }
    }, [grids]);

    useEffect(() => {
        if (pointSize >= 0)
            document.documentElement.style.setProperty(
                "--point-size",
                pointSize
            );
    }, [pointSize]);

    return (
        <div
            id="#box"
            onMouseEnter={(e) => update(e)}
            onMouseLeave={(e) => update(e)}
            onMouseMove={(e) => update(e)}
            // onClick={() => registerPoint(false)}
            onMouseUp={() => {
                setMouseDown(false);
                setMouseDownForXpoint(false);
            }}
            className="coordinate-box"
        >
            <div
                id="#point0"
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                className="coordinate-point"
            ></div>
            {extra && (
                <div
                    id="#point1"
                    onMouseDown={() => setMouseDownForXpoint(true)}
                    onMouseUp={() => setMouseDownForXpoint(false)}
                    className="coordinate-point extra-point-color"
                ></div>
            )}
        </div>
        /* <i className="arrow right"></i> */
    );
};

const outOfRange = (num, range) =>
    num > range || num < -range || range - Math.abs(num) < 1.0;
    
const CoordinateSystem = (props) => {
    const [x, $x] = useState(0);
    const [y, $y] = useState(0);

    const { options, point, extra } = props;
    let { grids } = options ? options : { grids: DEFAULT_GRIDS };

    const [scale, $scale] = useState(1);
    const viewpoint = (x, y) => {
        // updates the vallue of coordinates givent by the child component
        $x(x);
        $y(y);
    };

    // auto expand axis range when the value is near to scale
    useEffect(() => {
        const range = grids
            ? Math.abs(scale * grids)
            : Math.abs(scale * DEFAULT_GRIDS);

        if (
            range > 0 &&
            (outOfRange(point.x, range) ||
                outOfRange(point.y, range) ||
                (extra && (outOfRange(extra.x, range) || outOfRange(extra.y, range))))
        )
            $scale(scale + 1);
    }, [point, extra, scale, grids]);

    return (
        <Grid container>
            <Grid xs={12} item>
                <ReactCursorPosition>
                    <CoordinateSystemContent
                        {...props}
                        viewpoint={viewpoint}
                        scale={scale}
                    />
                </ReactCursorPosition>
            </Grid>
            <Grid xs={12}>
                <p style={{ textAlign: "center" }}>{"(" + calculus.strictPrecisionFormat(x) + ", " + calculus.strictPrecisionFormat(y) + ")"}</p>
            </Grid>
            <Grid xs={12} item>
                <TextField
                    variant="outlined"
                    value={scale}
                    sx={{ width: "100%" }}
                    onChange={(e) => $scale(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="left">
                                <MathJax>{"$$\\times$$"}</MathJax>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="left">
                                مقیاس
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default CoordinateSystem;
