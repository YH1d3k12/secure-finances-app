import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../service/categoryService';
import CategoryForm from './LocalComponents/CategoryForm'; // <-- Caminho atualizado

const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.createCategory(formData.name, formData.description);
      navigate('/category');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
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
      isEditing={false}
    />
  );
};

export default CreateCategory;