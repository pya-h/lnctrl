import { useRoutes } from 'react-router-dom';
import CH02Routes from './CH02Routes';
import CH03Routes from './CH03Routes';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //
import CH04Routes from './CH04Routes';
import CH05Routes from './CH05Routes';
import CH06Routes from './CH06Routes';
import CH07Routes from './CH07Routes';

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, CH02Routes, CH03Routes, CH04Routes, CH05Routes, CH06Routes, CH07Routes]);
}
