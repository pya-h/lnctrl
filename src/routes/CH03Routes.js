import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'views/ui-component/Loadable';
import { routes } from 'config';

const FirstOrderTfExamining = Loadable(lazy(() => import('views/topics/chapter03/first-order-tf-examining')));
const SecondOrderTfExamining = Loadable(lazy(() => import('views/topics/chapter03/second-order-tf-examining')));
const DesignSystemByCharacteristics = Loadable(lazy(() => import('views/topics/chapter03/design-damping-system')));

// ==============================|| MAIN ROUTING ||============================== //
const CH03Routes = {
    path:  `${routes.root}${routes.chapter}03`,
    element: <MainLayout />,
    children: [
        {
            path:  `${routes.root}${routes.chapter}03/${routes.fst_order_tf}`,
            element: <FirstOrderTfExamining />
        },
        {
            path:  `${routes.root}${routes.chapter}03/${routes.snd_order_tf}`,
            element: <SecondOrderTfExamining />
        }, 
        {
            path:  `${routes.root}${routes.chapter}03/${routes.design_by_characteristics}`,
            element: <DesignSystemByCharacteristics />
        }, 
    ]
};

export default CH03Routes;