import { lazy } from 'react';

const CategoryList = lazy(() => import('./List'));
const CreateCategory = lazy(() => import('./Create'));
const UpdateCategory = lazy(() => import('./Update'));
const GetCategory = lazy(() => import('./Get'));

const categoryRoutes = [
    {
        path: '/category',
        component: CategoryList,
        children: [
            {
                path: 'new',
                component: CreateCategory,
            },
            {
                path: 'edit/:id',
                component: UpdateCategory,
            },
        ],
    },
    {
        path: '/category/:id',
        component: GetCategory,
    },
];

export default categoryRoutes;