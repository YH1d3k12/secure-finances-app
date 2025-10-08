import { lazy } from 'react';

const CategoryList = lazy(() => import('./CategoryList'));

const categoryRoutes = [
    {
        path: '/category',
        component: CategoryList,
    },
];

export default categoryRoutes;
