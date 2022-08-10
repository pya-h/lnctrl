import {precision} from "math/calculus";

// action - customization reducer
const SET_MENU = "@customization/SET_MENU";
const MENU_OPEN = "@customization/MENU_OPEN";
const SET_FONT_FAMILY = "@customization/SET_FONT_FAMILY";
const SET_BORDER_RADIUS = "@customization/SET_BORDER_RADIUS";
const SET_MATH_PRECISION = "@calculus/SET_MATH_PRECISION";

export const ActionTypes = {
    SET_MENU,
    MENU_OPEN,
    SET_FONT_FAMILY,
    SET_BORDER_RADIUS,
    SET_MATH_PRECISION,
};

export const ReduxSetMenu = (opened) => {
    return async (dispatch, getState) =>
        await dispatch({ type: SET_MENU, opened });
};

export const ReduxToggleMenu = (id) => {
    return async (dispatch, getState) => {
        const customization = { ...getState().customization };

        await dispatch({ type: SET_MENU, opened: !customization.opened });
    };
};

export const ReduxSetOpenedMenuID = (id) => {
    return async (dispatch, getState) =>
        await dispatch({ type: MENU_OPEN, id });
};

export const ReduxSetFontFamily = (fontFamily) => {
    return async (dispatch, getState) =>
        await dispatch({ type: SET_FONT_FAMILY, fontFamily });
};

export const ReduxSetBorderRadius = (borderRadius) => {
    return async (dispatch, getState) =>
        await dispatch({ type: SET_BORDER_RADIUS, borderRadius });
};

export const ReduxSetMathPrecision = (mathPrecision) => {
    return async (dispatch, getState) => {
        precision.set(mathPrecision);
        await dispatch({ type: SET_MATH_PRECISION, mathPrecision: mathPrecision });
    };
};
