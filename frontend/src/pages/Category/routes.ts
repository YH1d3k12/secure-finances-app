import { lazy } from 'react';

const CategoryList = lazy(() => import('./CategoryList'));

const categoryRoutes = [
  {
    path: '/categories',
    component: CategoryList,
  },
];

export default categoryRoutes;
