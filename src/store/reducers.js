import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducers = combineReducers({
    customization: customizationReducer
});

export default reducers;
