import { useState } from 'react';
import axios from 'axios';


export const useEditarPerfilForm = (perfil) => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({
    Nombre: '',
    Apellido: '',
    Identificacion: '',
    Descripcion: '',
    Telefono: '',
    Edad: ''
  });

 const validateForm = () => {
  const newErrors = {};
  let isValid = true;

  if (!perfil.Nombre) {
    newErrors.Nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!perfil.Apellido) {
    newErrors.Apellido = 'El apellido es requerido';
    isValid = false;
  }
  if (!perfil.Telefono || perfil.Telefono.length < 10) {
    newErrors.Telefono = 'El teléfono debe tener 10 dígitos'; // Mensaje más claro
    isValid = false;
  }
  if (!perfil.Edad || isNaN(perfil.Edad) || perfil.Edad <= 0) {
    newErrors.Edad = 'Edad inválida';
    isValid = false;
  }
  if (!perfil.Descripcion || perfil.Descripcion.length < 20) {
    newErrors.Descripcion = 'La descripción debe tener al menos 20 caracteres';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // console.log("Submit ejecutado", e);
    
    if (!validateForm()) {
      return;
    }
    console.log("Validación pasó?:", validateForm());

    
    const data = {
  Nombre: perfil.Nombre,
  Apellido: perfil.Apellido,
  Descripcion: perfil.Descripcion,
  Telefono: perfil.Telefono,
  Identificacion: perfil.Identificacion,
  Edad: perfil.Edad
};



    try {
      const response = await axios.put(`http://localhost:4000/api/editar-perfil`, data, {
       withCredentials: true,
       headers: {
      'Content-Type': 'application/json'
    }
     });

      if (response.status === 200) {
        setMessage({ 
          text: 'Perfil actualizado correctamente', 
          type: 'success' 
        });
         
        
      }
    } catch (err) {
      console.error('Error al actualizar:', err.response?.data);
      
      let errorMsg = 'Error al actualizar el perfil';
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