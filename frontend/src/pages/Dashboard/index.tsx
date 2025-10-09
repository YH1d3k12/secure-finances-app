// import React, { useState, useEffect } from 'react';
// import { entryService } from '../../service/entryService';
// import { Entry } from '../../types';

// const Dashboard: React.FC = () => {
//     const [balance, setBalance] = useState<number>(0);
//     const [recentEntries, setRecentEntries] = useState<Entry[]>(
//         []
//     );
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [balanceData, entriesData] = await Promise.all([
//                     entryService.getBalance(),
//                     entryService.getEntries(),
//                 ]);

//                 setBalance(balanceData);
//                 setRecentEntries(entriesData.slice(0, 5)); // Últimas 5 transações
//             } catch (error) {
//                 console.error('Erro ao carregar dados:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="text-lg">Carregando...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="px-4 py-6 sm:px-0">
//             <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-6">
//                     Dashboard
//                 </h1>

//                 {/* Saldo */}
//                 <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
//                     <div className="p-5">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0">
//                                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                                     <span className="text-white font-bold">
//                                         R$
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="ml-5 w-0 flex-1">
//                                 <dl>
//                                     <dt className="text-sm font-medium text-gray-500 truncate">
//                                         Saldo Atual
//                                     </dt>
//                                     <dd
//                                         className={`text-lg font-medium ${
//                                             balance >= 0
//                                                 ? 'text-green-600'
//                                                 : 'text-red-600'
//                                         }`}
//                                     >
//                                         R$ {balance.toFixed(2)}
//                                     </dd>
//                                 </dl>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Transações Recentes */}
//                 <div className="bg-white shadow overflow-hidden sm:rounded-md">
//                     <div className="px-4 py-5 sm:px-6">
//                         <h3 className="text-lg leading-6 font-medium text-gray-900">
//                             Transações Recentes
//                         </h3>
//                         <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                             Suas últimas 5 transações
//                         </p>
//                     </div>
//                     <ul className="divide-y divide-gray-200">
//                         {recentEntries.length === 0 ? (
//                             <li className="px-4 py-4 text-center text-gray-500">
//                                 Nenhuma transação encontrada
//                             </li>
//                         ) : (
//                             recentEntries.map(entry => (
//                                 <li key={entry.id} className="px-4 py-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <div
//                                                 className={`flex-shrink-0 w-2 h-2 rounded-full ${
//                                                     entry.type ===
//                                                     'income'
//                                                         ? 'bg-green-400'
//                                                         : 'bg-red-400'
//                                                 }`}
//                                             ></div>
//                                             <div className="ml-4">
//                                                 <div className="text-sm font-medium text-gray-900">
//                                                     {entry.description}
//                                                 </div>
//                                                 <div className="text-sm text-gray-500">
//                                                     {entry.category.name}{' '}
//                                                     •{' '}
//                                                     {new Date(
//                                                         entry.date
//                                                     ).toLocaleDateString(
//                                                         'pt-BR'
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div
//                                             className={`text-sm font-medium ${
//                                                 entry.type === 'income'
//                                                     ? 'text-green-600'
//                                                     : 'text-red-600'
//                                             }`}
//                                         >
//                                             {entry.type === 'income'
//                                                 ? '+'
//                                                 : '-'}
//                                             R$ {entry.amount.toFixed(2)}
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { entryService } from '../../service/entryService';
import { Entry } from '../../types';

const Dashboard: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [balanceData, entriesData] = await Promise.all([
                    entryService.getBalance(),
                    entryService.getEntries(),
                ]);

                setBalance(balanceData);
                setRecentEntries(entriesData.slice(0, 5)); // Últimas 5 transações
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-text-base">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-0">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-text-heading">
                    Dashboard
                </h1>

                {/* Saldo */}
                <div className="bg-base-200 overflow-hidden shadow-lg rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-base-100 font-bold text-xl">
                                        R$
                                    </span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-text-base truncate">
                                        Saldo Atual
                                    </dt>
                                    <dd
                                        className={`text-3xl font-bold ${
                                            balance >= 0
                                                ? 'text-success'
                                                : 'text-error'
                                        }`}
                                    >
                                        R$ {balance.toFixed(2)}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transações Recentes */}
                <div className="bg-base-200 shadow-lg overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-base-300">
                        <h3 className="text-lg leading-6 font-medium text-text-heading">
                            Transações Recentes
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-text-base">
                            Suas últimas 5 movimentações
                        </p>
                    </div>
                    <ul className="divide-y divide-base-300">
                        {recentEntries.length === 0 ? (
                            <li className="px-4 py-4 text-center text-text-base">
                                Nenhuma transação encontrada
                            </li>
                        ) : (
                            recentEntries.map(entry => (
                                <li
                                    key={entry.id}
                                    className="px-4 py-4 sm:px-6 hover:bg-base-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div
                                                className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${
                                                    entry.type === 'income'
                                                        ? 'bg-success'
                                                        : 'bg-error'
                                                }`}
                                            ></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-text-heading">
                                                    {entry.description}
                                                </div>
                                                <div className="text-sm text-text-base">
                                                    {entry.category.name} •{' '}
                                                    {new Date(
                                                        entry.date
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`text-sm font-medium ${
                                                entry.type === 'income'
                                                    ? 'text-success'
                                                    : 'text-error'
                                            }`}
                                        >
                                            {entry.type === 'income'
                                                ? '+'
                                                : '-'}
                                            R$ {entry.amount.toFixed(2)}
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
