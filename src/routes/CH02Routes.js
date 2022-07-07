import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

// utilities routing *** EDIT THIS USING config.js
const HydraulicSystemsModeling = Loadable(lazy(() => import('views/topics/chapter02/HydraulicSystemsModeling')));
const MechanicSystemsModeling = Loadable(lazy(() => import('views/topics/chapter02/MechanicSystemsModeling')));
const SpaceStateEquations = Loadable(lazy(() => import('views/topics/chapter02/SpaceStateEquations')));
const BlockDiagramsAlgebra = Loadable(lazy(() => import('views/topics/chapter02/BlockDiagramsAlgebra')));
const SFGAlgebra = Loadable(lazy(() => import('views/topics/chapter02/SFGAlgebra')));

const CH02Routes = {
    path: `${routes.root}${routes.chapter}02`,
    element: <MainLayout />,
    children: [
        {
            path: `${routes.root}${routes.chapter}02/${routes.hydraulic_systems_modeling}`,
            element: <HydraulicSystemsModeling />
        },
        {
            path:  `${routes.root}${routes.chapter}02/${routes.mechanic_systems_modeling}`,
            element: <MechanicSystemsModeling />
        },
        {
            path:  `${routes.root}${routes.chapter}02/${routes.space_state_equations}`,
            element: <SpaceStateEquations />
        },
        {
            path:  `${routes.root}${routes.chapter}02/${routes.block_diagrams_algebra}`,
            element: <BlockDiagramsAlgebra />
        },
        {
            path:  `${routes.root}${routes.chapter}02/${routes.sfg_algebra}`,
            element: <SFGAlgebra />
        },
        
    ]
};

export default CH02Routes;
