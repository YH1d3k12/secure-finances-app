import { FC, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './LazyRoutes';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Login/Register';
import Layout from '../components/Layout';
import LoadingPage from '../pages/Loading';
import NotFoundPage from '../pages/NotFound';

interface RouteConfig {
    path: string;
    component: FC;
}

const LoadRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
    ));
};

function AppRoutes() {
    return (
        <BrowserRouter basename="/secure-finances-app/">
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route element={<Layout />}>
                            {LoadRoutes(routes)}
                            <Route path="loading" element={<LoadingPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default AppRoutes;
