import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <header className="bg-base-200 shadow-lg border-b border-base-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/dashboard"
                            className="text-xl font-bold text-primary"
                        >
                            Secure Finances
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link
                            to="/dashboard"
                            className="text-text-base hover:text-text-heading px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/entry"
                            className="text-text-base hover:text-text-heading px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Transações
                        </Link>
                        <Link
                            to="/category"
                            className="text-text-base hover:text-text-heading px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Categorias
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-error hover:bg-opacity-80 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
