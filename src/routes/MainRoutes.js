import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';
// dashboard routing
const HomePage = Loadable(lazy(() => import('views/home')));
const ToolBox = Loadable(lazy(() => import('views/toolbox')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: routes.root,
    element: <MainLayout />,
    children: [
        {
            path: routes.root,
            element: <HomePage />
        },
        {
            path: `${routes.root}${routes.toolbox}`,
            element: <Navigate to={`${routes.root}${routes.toolbox}/${routes.block_diagram_tool}`} replace />
        },
        {
            path: `${routes.root}${routes.toolbox}/:tool`,
            element: <ToolBox />
        },
    ]
};

export default MainRoutes;
