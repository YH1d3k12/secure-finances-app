import React, { useState, useEffect } from 'react';
import { entryService } from '../../service/entryService';
import { categoryService } from '../../service/categoryService';
import { Entry, Category } from '../../types';

const Entries: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        amount: '',
        type: 'expense' as 'income' | 'expense',
        description: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
        attachment: null as File | null,
    });

    // Filters
    const [filters, setFilters] = useState({
        type: undefined as 'income' | 'expense' | undefined,
        categoryId: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            const [entriesData, categoriesData] = await Promise.all([
                entryService.getEntries({
                    ...filters,
                    categoryId: filters.categoryId
                        ? parseInt(filters.categoryId)
                        : undefined,
                }),
                categoryService.getCategories(),
            ]);

            setEntries(entriesData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = {
                amount: parseFloat(formData.amount),
                type: formData.type,
                description: formData.description,
                date: formData.date,
                categoryId: parseInt(formData.categoryId),
                attachment: formData.attachment || undefined,
            };

            if (editingEntry) {
                await entryService.updateEntry(editingEntry.id, data);
            } else {
                await entryService.createEntry(data);
            }

            setShowForm(false);
            setEditingEntry(null);
            setFormData({
                amount: '',
                type: 'expense',
                description: '',
                date: new Date().toISOString().split('T')[0],
                categoryId: '',
                attachment: null,
            });
            fetchData();
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
        }
    };

    const handleEdit = (entry: Entry) => {
        setEditingEntry(entry);
        setFormData({
            amount: entry.amount.toString(),
            type: entry.type,
            description: entry.description,
            date: entry.date,
            categoryId: entry.category.id.toString(),
            attachment: null,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
            try {
                await entryService.deleteEntry(id);
                fetchData();
            } catch (error) {
                console.error('Erro ao excluir transação:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Transações
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Nova Transação
                    </button>
                </div>

                {/* Filtros */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            value={filters.type}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    type: e.target.value as
                                        | 'income'
                                        | 'expense'
                                        | undefined,
                                })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="">Todos os tipos</option>
                            <option value="income">Receita</option>
                            <option value="expense">Despesa</option>
                        </select>

                        <select
                            value={filters.categoryId}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    categoryId: e.target.value,
                                })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="">Todas as categorias</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    startDate: e.target.value,
                                })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Data inicial"
                        />

                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    endDate: e.target.value,
                                })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Data final"
                        />
                    </div>
                </div>

                {/* Lista de Transações */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {entries.length === 0 ? (
                            <li className="px-4 py-4 text-center text-gray-500">
                                Nenhuma transação encontrada
                            </li>
                        ) : (
                            entries.map(entry => (
                                <li key={entry.id} className="px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div
                                                className={`flex-shrink-0 w-3 h-3 rounded-full ${
                                                    entry.type === 'income'
                                                        ? 'bg-green-400'
                                                        : 'bg-red-400'
                                                }`}
                                            ></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {entry.description}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {entry.category.name} •{' '}
                                                    {new Date(
                                                        entry.date
                                                    ).toLocaleDateString(
                                                        'pt-BR'
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`text-sm font-medium ${
                                                    entry.type === 'income'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {entry.type === 'income'
                                                    ? '+'
                                                    : '-'}
                                                R$ {entry.amount.toFixed(2)}
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(entry)
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(entry.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900 text-sm"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Modal do Formulário */}
                {showForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {editingEntry
                                        ? 'Editar Transação'
                                        : 'Nova Transação'}
                                </h3>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Valor
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.amount}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    amount: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tipo
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    type: e.target.value as
                                                        | 'income'
                                                        | 'expense',
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        >
                                            <option value="expense">
                                                Despesa
                                            </option>
                                            <option value="income">
                                                Receita
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Descrição
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.description}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Data
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    date: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Categoria
                                        </label>
                                        <select
                                            required
                                            value={formData.categoryId}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    categoryId: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        >
                                            <option value="">
                                                Selecione uma categoria
                                            </option>
                                            {categories.map(category => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Anexo (opcional)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    attachment:
                                                        e.target.files?.[0] ||
                                                        null,
                                                })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingEntry(null);
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                        >
                                            {editingEntry
                                                ? 'Atualizar'
                                                : 'Criar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Entries;
