import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { categoryService } from '../../service/categoryService';
import { Category } from '../../types';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isModalOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

  useEffect(() => {
    if (!isModalOpen) {
      fetchCategories();
    }
  }, [isModalOpen]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria? A ação não pode ser desfeita.')) {
      try {
        await categoryService.deleteCategory(id);
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Gerenciar Categorias
          </h1>
          <Link
            to="/category/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Nova Categoria
          </Link>
        </div>

        {loading ? (
           <div className="text-center py-4">Carregando categorias...</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <li className="px-4 py-4 text-center text-gray-500">
                  Nenhuma categoria cadastrada.
                </li>
              ) : (
                categories.map(category => (
                  <li key={category.id} className="px-4 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/category/${category.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          {category.name}
                        </Link>
                        {category.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <Link
                          to={`/category/edit/${category.id}`}
                          className="text-gray-500 hover:text-indigo-600 text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-gray-500 hover:text-red-600 text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default CategoryList;