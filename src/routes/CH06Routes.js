import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const RCFilterFrequencyResponseExample = Loadable(lazy(() => import('views/topics/chapter06/rc-filter-frequency-response')));
const FrequencyResponse = Loadable(lazy(() => import('views/topics/chapter06/frequency-response')));
const BodePlot = Loadable(lazy(() => import('views/topics/chapter06/bode-plot')));
// ==============================|| MAIN ROUTING ||============================== //
const CH06Routes = {
    path:  `${routes.root}${routes.chapter}06`,
    element: <MainLayout />,
    children: [
        {
            path:  `${routes.root}${routes.chapter}06/${routes.rc_filter_frequency_response}`,
            element: <RCFilterFrequencyResponseExample />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.frequency_response}`,
            element: <FrequencyResponse />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.bode_plot}`,
            element: <BodePlot />
        },
    ]
};

export default CH06Routes;