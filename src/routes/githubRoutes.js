import { routes } from "config";
const githubRoutes = (chapterRoutes) =>
    chapterRoutes.map((route) => {
        const gitRoute = { ...route };
        gitRoute.path = routes.git_root + gitRoute.path;
        gitRoute.children = gitRoute.children.map((cr) => {
            cr.path = routes.git_root + cr.path;
            return cr;
        });
        return gitRoute;
    });

export default githubRoutes;
