// project imports
import config from "config";
import calculus from "math/calculus";
// action - state management
import { ActionTypes } from "./actions";

export const initialState = {
    isOpen: [], // for active default menu
    enableZoom: false,
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    mathPrecision: calculus.precision.get(),
    opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case ActionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id],
            };
        case ActionTypes.ENABLE_ZOOM:
            return {
                ...state,
                enableZoom: action.enableZoom,
            };
        case ActionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened,
            };
        case ActionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily,
            };
        case ActionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius,
            };
        case ActionTypes.SET_MATH_PRECISION:
            return {
                ...state,
                mathPrecision: action.mathPrecision,
            };
        default:
            return state;
    }
};

export default customizationReducer;
