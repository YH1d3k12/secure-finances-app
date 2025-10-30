// import { Outlet } from 'react-router-dom';
// import Header from '../Header';

// export default function Layout() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />
//             <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                 <Outlet />
//             </main>
//         </div>
//     );
// }

import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function Layout() {
    return (
        // Fundo base para as páginas internas
        <div className="min-h-screen bg-base-100 text-text-base">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}