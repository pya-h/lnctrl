import { useRoutes } from 'react-router-dom';
import CH02Routes from './CH02Routes';
import CH03Routes from './CH03Routes';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //
import CH04Routes from './CH04Routes';
import CH05Routes from './CH05Routes';
import CH06Routes from './CH06Routes';
import CH07Routes from './CH07Routes';

// NOTE: All routes are declared once, at root ("/…") paths. Serving under a
// sub-path (e.g. GitHub Pages at /lnctrl) is handled by <BrowserRouter
// basename={process.env.PUBLIC_URL}> in src/index.js — react-router strips the
// prefix before matching, so the same route table works both at the domain
// root and under /lnctrl without duplicating (and mutating) the route objects.
export default function ThemeRoutes() {
    return useRoutes([MainRoutes, CH02Routes, CH03Routes, CH04Routes, CH05Routes, CH06Routes, CH07Routes]);
}
