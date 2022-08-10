// assets
import { IconDashboard, IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBrandChrome, IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Useful components',
    type: 'group',
    children: [{
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: 'dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Document',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default dashboard;