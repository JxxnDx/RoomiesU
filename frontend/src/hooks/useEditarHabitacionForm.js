import { useState } from 'react';
import axios from 'axios';


export const useEditarHabitacionForm = (habitacion, id, file, navigate) => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Unidad: '',
    estado: '',
    image: ''
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validación de campos
    if (!habitacion.Precio) {
      newErrors.Precio = 'El precio es requerido';
      isValid = false;
    }
    if (!habitacion.Descripcion || habitacion.Descripcion.length < 20) {
      newErrors.Descripcion = 'La descripción debe tener al menos 20 caracteres';
      isValid = false;
    }
    if (!habitacion.Requisitos) {
      newErrors.Requisitos = 'Los requisitos son requeridos';
      isValid = false;
    }
    if (!habitacion.Id_Unidad) {
      newErrors.Id_Unidad = 'Debe seleccionar una unidad';
      isValid = false;
    }
    if (!habitacion.estado) {
      newErrors.estado = 'Debe seleccionar un estado';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    if (!validateForm()) {
      return;
    }

    
    const formData = new FormData();
    const camposRequeridos = {
      Id_Habitacion: habitacion.Id_Habitacion,
      Precio: habitacion.Precio,
      Descripcion: habitacion.Descripcion,
      Requisitos: habitacion.Requisitos,
      Id_Admin: habitacion.Id_Admin,
      Id_Unidad: habitacion.Id_Unidad,
      estado: habitacion.estado,
      currentImageUrl: habitacion.Img_url
    };

    Object.entries(camposRequeridos).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/editarhabitacion/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.status === 200) {
        setMessage({ 
          text: 'Habitación actualizada correctamente', 
          type: 'success' 
        });
         setTimeout(() => navigate('/habitacion'), 2000);
        
      }
    } catch (err) {
      console.error('Error al actualizar:', err.response?.data);
      
      let errorMsg = 'Error al actualizar la habitación';
      if (err.response?.data?.detalles) {
        const errores = Object.entries(err.response.data.detalles)
          .filter(([_, value]) => value !== 'OK')
          .map(([campo]) => campo);
        
        errorMsg = `Problema con los campos: ${errores.join(', ')}`;
      }
      
      setMessage({ 
        text: errorMsg,
        type: 'error',
        details: err.response?.data?.detalles
      });
    }
  };

  return {
    message,
    errors,
    handleSubmit
  };
};