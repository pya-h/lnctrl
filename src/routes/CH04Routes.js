import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const HurwitzCriterion = Loadable(lazy(() => import('views/topics/chapter04/hurwitz-criterion')));
const RouthHurwitzCriterion = Loadable(lazy(() => import('views/topics/chapter04/routh-hurwitz-criterion')));
const Ch04Intro = Loadable(lazy(() => import('views/topics/chapter04/intro')));

// ==============================|| MAIN ROUTING ||============================== //
const CH04Routes = {
    path:  `${routes.root}${routes.chapter}04`,
    element: <MainLayout />,
    children: [
        {
            path: `${routes.root}${routes.chapter}04`,
            element: <Ch04Intro />
        },
        {
            path:  `${routes.root}${routes.chapter}04/${routes.hurwitz_criterion}`,
            element: <HurwitzCriterion />
        },
        {
            path:  `${routes.root}${routes.chapter}04/${routes.routh_hurwitz_criterion}`,
            element: <RouthHurwitzCriterion />
        },
    ]
};

export default CH04Routes;