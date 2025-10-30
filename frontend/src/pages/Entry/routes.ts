import { lazy } from 'react';

const EntryList = lazy(() => import('./EntryList'));

const entryRoutes = [
    {
        path: '/entry',
        component: EntryList,
    },
];

export default entryRoutes;
