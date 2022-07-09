import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const RCFilterFrequencyResponseExample = Loadable(lazy(() => import('views/topics/chapter06/rc-filter-frequency-response')));
const FrequencyResponse = Loadable(lazy(() => import('views/topics/chapter06/frequency-response')));
const BodePlot = Loadable(lazy(() => import('views/topics/chapter06/bode-plot')));
const BodePlotExample = Loadable(lazy(() => import('views/topics/chapter06/bode-example')));
const DelayedSystemsExample = Loadable(lazy(() => import('views/topics/chapter06/delayed-systems-example')));
const NyquistPlot = Loadable(lazy(() => import('views/topics/chapter06/nyquist-plot')));
const NicolesChart = Loadable(lazy(() => import('views/topics/chapter06/nicoles-chart')));
const MCircle = Loadable(lazy(() => import('views/topics/chapter06/m-circle')));
const NCircle = Loadable(lazy(() => import('views/topics/chapter06/n-circle')));

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
        {
            path:  `${routes.root}${routes.chapter}06/${routes.bode_example}`,
            element: <BodePlotExample />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.delayed_systems}`,
            element: <DelayedSystemsExample />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.nyquist_plot}`,
            element: <NyquistPlot />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.nicoles_chart}`,
            element: <NicolesChart />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.m_circle}`,
            element: <MCircle />
        },
        {
            path:  `${routes.root}${routes.chapter}06/${routes.n_circle}`,
            element: <NCircle />
        },
    ]
};

export default CH06Routes;