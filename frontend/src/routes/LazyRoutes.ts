import dashboardRoutes from '../pages/Dashboard/routes';
import categoryRoutes from '../pages/Category/routes';
import entryRoutes from '../pages/Entry/routes';

const routes = [...dashboardRoutes, ...categoryRoutes, ...entryRoutes];

export default routes;
