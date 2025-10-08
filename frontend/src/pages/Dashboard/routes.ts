import { lazy } from 'react';

const Dashboard = lazy(() => import('./index'));

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: Dashboard,
    },
];

export default dashboardRoutes;
