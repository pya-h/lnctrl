import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from './serviceWorker';
import App from './App';
import { store } from './store';

// style + assets
import 'assets/scss/style.scss';

try {
    document.body.dataset.theme =
        localStorage.getItem('navType') === 'dark' ? 'dark' : 'light';
} catch (e) {
    document.body.dataset.theme = 'light';
}

// The "ResizeObserver loop" notice is a benign browser warning (fired by some
// layout/observer combinations, e.g. React Flow re-fitting). Stop it from reaching
// the dev-server error overlay, which would otherwise present it as a crash.
window.addEventListener(
    'error',
    (e) => {
        if (e.message && e.message.indexOf('ResizeObserver loop') !== -1) {
            e.stopImmediatePropagation();
        }
    },
    true
);

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
