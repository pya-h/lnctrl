import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const PID = Loadable(lazy(() => import('views/topics/chapter07/pid')));

// ==============================|| MAIN ROUTING ||============================== //
const CH07Routes = {
    path:  `${routes.root}${routes.chapter}07`,
    element: <MainLayout />,
    children: [
        {
            path:  `${routes.root}${routes.chapter}07/${routes.pid}`,
            element: <PID />
        },
    ]
};

export default CH07Routes;