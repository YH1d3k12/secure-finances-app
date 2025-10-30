import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../service/categoryService';
import CategoryForm from './LocalComponents/CategoryForm'; // <-- Caminho atualizado

const UpdateCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const categories = await categoryService.getCategories();
          const categoryToEdit = categories.find(cat => cat.id === parseInt(id));
          if (categoryToEdit) {
            setFormData({
              name: categoryToEdit.name,
              description: categoryToEdit.description || '',
            });
          }
        } catch (error) {
          console.error('Erro ao buscar categoria:', error);
        }
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await categoryService.updateCategory(
          parseInt(id),
          formData.name,
          formData.description
        );
        navigate('/category');
      } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/category');
  };

  return (
    <CategoryForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      isEditing={true}
    />
  );
};

export default UpdateCategory;