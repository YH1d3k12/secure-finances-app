import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export const FreeRoutes = [
  '/login',
  '/register',
  '/dashboard',
];

const PrivateRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (FreeRoutes.includes(location.pathname)) {
    return <Outlet />;
  }

  // Aqui você pode adicionar lógica de permissões
  // Por exemplo, verificar se o usuário tem permissão para acessar a rota
  // const isAllowed = HasPermission(user, location.pathname);
  // if (!isAllowed) {
  //   return <Navigate to="/dashboard" />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
