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

// React Flow re-fits the viewport whenever the diagram swaps (e.g. stepping through
// the block-diagram algebra example). That fit runs inside a ResizeObserver callback
// and can resize the canvas again in the same frame, which the browser reports as the
// benign "ResizeObserver loop completed with undelivered notifications" error — loud
// enough to trip the dev error overlay. Deferring the callback to the next animation
// frame breaks the synchronous re-entrancy so the notice is never generated.
if (typeof window !== 'undefined' && window.ResizeObserver) {
    const NativeResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends NativeResizeObserver {
        constructor(callback) {
            super((entries, observer) =>
                window.requestAnimationFrame(() => callback(entries, observer))
            );
        }
    };
}

// Belt-and-suspenders: if anything still emits the notice, keep it off the overlay.
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
