import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const RootLocus = Loadable(lazy(() => import('views/topics/chapter05/root-locus')));

// ==============================|| MAIN ROUTING ||============================== //
const CH05Routes = {
    path:  `${routes.root}${routes.chapter}05`,
    element: <MainLayout />,
    children: [
        {
            path:  `${routes.root}${routes.chapter}05/${routes.root_locus}`,
            element: <RootLocus />
        },

    ]
};

export default CH05Routes;