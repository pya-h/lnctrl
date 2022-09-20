import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const RootLocus = Loadable(lazy(() => import('views/topics/chapter05/root-locus')));
const SketchingRootLocus = Loadable(lazy(() => import('views/topics/chapter05/sketching-root-locus')));

// ==============================|| MAIN ROUTING ||============================== //
const CH05Routes = {
    path:  `${routes.root}${routes.chapter}05`,
    element: <MainLayout />,
    children: [
        {
            path: `${routes.root}${routes.chapter}05`,
            element: <RootLocus />
        },
        {
            path:  `${routes.root}${routes.chapter}05/${routes.sketching_root_locus}`,
            element: <SketchingRootLocus />
        },
    ]
};

export default CH05Routes;