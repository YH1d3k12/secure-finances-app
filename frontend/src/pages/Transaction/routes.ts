import { lazy } from 'react';

const TransactionList = lazy(() => import('./TransactionList'));

const transactionRoutes = [
  {
    path: '/transactions',
    component: TransactionList,
  },
];

export default transactionRoutes;
