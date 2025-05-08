import { useState, useEffect } from 'react';

export const useHabitacionForm = (adminId) => {
  const [formData, setFormData] = useState({
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Admin: '', // Inicializado vacío, se actualizará con el efecto
    Id_Unidad: '',
    estado:''
  });

  const [errors, setErrors] = useState({
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Unidad: '',
    image: '',
    Id_Admin: '',
    estado: ''
  });

  // Efecto para sincronizar adminId con formData
  useEffect(() => {
    if (adminId && adminId !== formData.Id_Admin) {
      setFormData(prev => ({
        ...prev,
        Id_Admin: adminId
      }));
      console.log("[useHabitacionForm] Sincronizado Id_Admin:", adminId);
    }
  }, [adminId]); // Solo se ejecuta cuando adminId cambia

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    console.log("[validateForm] Validando con Id_Admin:", formData.Id_Admin);

    if (!formData.Precio || formData.Precio <= 0) {
      newErrors.Precio = 'El precio debe ser mayor a 0';
      isValid = false;
    }

    if (!formData.Descripcion || formData.Descripcion.length < 20) {
      newErrors.Descripcion = 'La descripción debe tener al menos 20 caracteres';
      isValid = false;
    }

    if (!formData.Requisitos || formData.Requisitos.length < 10) {
      newErrors.Requisitos = 'Los requisitos deben tener al menos 10 caracteres';
      isValid = false;
    }

    if (!formData.Id_Unidad) {
      newErrors.Id_Unidad = 'Debes seleccionar una unidad';
      isValid = false;
    }

    if (!formData.Id_Admin || formData.Id_Admin.toString().trim() === '') {
      newErrors.Id_Admin = 'No se pudo identificar al administrador';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const resetForm = () => {
    setFormData(prev => ({
      Precio: '',
      Descripcion: '',
      Requisitos: '',
      Id_Admin: prev.Id_Admin, // Mantiene el adminId al resetear
      Id_Unidad: '',
      estado:''
    }));
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData,
    setErrors
  };
};