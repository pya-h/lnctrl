import { lazy } from 'react';

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
            path: `${routes.root}toolbox`,
            element: <ToolBox />
        },
    ]
};

export default MainRoutes;
