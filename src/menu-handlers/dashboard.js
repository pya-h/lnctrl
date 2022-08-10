// assets
import { IconDashboard, IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBrandChrome, IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'کامپوننت های بدردبخور',
    type: 'group',
    children: [{
            id: 'default',
            title: 'دشبورد',
            type: 'item',
            url: 'dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'سند',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default dashboard;