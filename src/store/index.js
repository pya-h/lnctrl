import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// ==============================|| REDUX - MAIN STORE ||============================== //
const persister = "Free";

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__() //temp: enable chrome redux manager extension
    )
);

export { store, persister };
