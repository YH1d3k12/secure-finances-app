import { lazy } from 'react';

const Login = lazy(() => import('./index'));
const Register = lazy(() => import('./Register'));

const loginRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
];

export default loginRoutes;
