import dashboardRoutes from '../pages/Dashboard/routes';
import categoryRoutes from '../pages/Category/routes';
import transactionRoutes from '../pages/Transaction/routes';

const routes = [
  ...dashboardRoutes,
  ...categoryRoutes,
  ...transactionRoutes,
];

export default routes;
