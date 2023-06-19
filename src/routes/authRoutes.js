import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import SimpleLayout from '../layouts/simple';

// ----------------------------------------------------------------------

export default function AuthRouter() {
    const routes = useRoutes([
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },

        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
