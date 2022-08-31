import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const Ch07Intro = Loadable(lazy(() => import('views/topics/chapter07/intro')));
const PIDController = Loadable(lazy(() => import('views/topics/chapter07/pid')));

// ==============================|| MAIN ROUTING ||============================== //
const CH07Routes = {
    path:  `${routes.root}${routes.chapter}07`,
    element: <MainLayout />,
    children: [
        {
            path: `${routes.root}${routes.chapter}07`,
            element: <Ch07Intro />
        },
        {
            path:  `${routes.root}${routes.chapter}07/${routes.pid}`,
            element: <PIDController />
        },
    ]
};

export default CH07Routes;