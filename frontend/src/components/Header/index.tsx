import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/dashboard"
                            className="text-xl font-bold text-gray-900"
                        >
                            Gestão Financeira
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Transações
                        </Link>
                        <Link
                            to="/categories"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Categorias
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
