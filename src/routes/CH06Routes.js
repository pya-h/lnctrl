import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const CircuitFrequencyResponseExample = Loadable(lazy(() => import('views/topics/chapter06/circuit-frequency-response')));

// ==============================|| MAIN ROUTING ||============================== //
const CH06Routes = {
    path:  `${routes.root}${routes.chapter}06`,
    element: <MainLayout />,
    children: [
        {
            path:  `${routes.root}${routes.chapter}06/${routes.circuit_frequency_response}`,
            element: <CircuitFrequencyResponseExample />
        },

    ]
};

export default CH06Routes;