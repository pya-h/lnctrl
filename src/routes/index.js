import { useRoutes } from 'react-router-dom';
import CH02Routes from './CH02Routes';
import CH03Routes from './CH03Routes';

// routes
import MainRoutes from './MainRoutes';
// import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //
import githubRoutes from './githubRoutes';
import CH04Routes from './CH04Routes';
import CH05Routes from './CH05Routes';
import CH06Routes from './CH06Routes';
import CH07Routes from './CH07Routes';

const git = [];
// const git = githubRoutes([MainRoutes]);

export default function ThemeRoutes() {
    // return useRoutes([MainRoutes], config.basename);
    return useRoutes([MainRoutes, CH02Routes, CH03Routes, CH04Routes, CH05Routes, CH06Routes, CH07Routes, ...git]);

}
