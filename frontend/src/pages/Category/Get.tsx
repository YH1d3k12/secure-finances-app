import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryService } from '../../service/categoryService';
import { Category } from '../../types';

const GetCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        setLoading(true);
        try {
          const categories = await categoryService.getCategories();
          const foundCategory = categories.find(cat => cat.id === parseInt(id));
          setCategory(foundCategory || null);
        } catch (error) {
          console.error('Erro ao carregar categoria:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 text-center">
              Carregando...
          </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 text-center">
              Categoria não encontrada.
          </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h1>
        <p className="text-gray-600 mb-6">{category.description || 'Esta categoria não possui uma descrição.'}</p>
        <Link to="/category" className="inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
          &larr; Voltar para a lista de categorias
        </Link>
      </div>
    </div>
  );
};

export default GetCategory;