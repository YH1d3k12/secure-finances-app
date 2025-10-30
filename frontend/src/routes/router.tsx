import { FC, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './LazyRoutes'; // Importa o array de rotas (agora com possíveis aninhamentos)
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Login/Register';
import Layout from '../components/Layout';
import LoadingPage from '../pages/Loading';
import NotFoundPage from '../pages/NotFound';

// A interface agora suporta a propriedade opcional 'children' para rotas aninhadas.
interface RouteConfig {
    path: string;
    component: FC;
    children?: RouteConfig[];
}

/**
 * Função recursiva para renderizar rotas.
 * Ela mapeia o array de rotas e, se uma rota tiver 'children',
 * chama a si mesma para renderizar as sub-rotas aninhadas.
 */
const LoadRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />}>
            {/* Se a rota atual tiver filhas, a recursão acontece aqui */}
            {route.children && LoadRoutes(route.children)}
        </Route>
    ));
};

function AppRoutes() {
    return (
        <BrowserRouter basename="/secure-finances-app/">
            {/* Suspense é uma boa prática para lidar com o carregamento do lazy loading */}
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    {/* 1. Rotas Públicas: Acessíveis por todos */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* 2. Ponto de Entrada de Segurança: Todas as rotas aninhadas aqui
                           passarão pela verificação do PrivateRoute. */}
                    <Route element={<PrivateRoute />}>
                        {/* O Layout é aplicado a todas as rotas privadas */}
                        <Route element={<Layout />}>
                            {/* A função LoadRoutes é chamada DENTRO da proteção.
                                Isso garante que tanto as rotas pais quanto as filhas
                                (como /category/new) só sejam renderizadas se o
                                PrivateRoute permitir. */}
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