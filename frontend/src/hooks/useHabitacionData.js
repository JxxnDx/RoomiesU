import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHabitacionData = (id) => {
  const [habitacion, setHabitacion] = useState({
    Id_Habitacion: '',
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Admin: '',
    Id_Unidad: '',
    Img_url: '',
    estado: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/habitacion/${id}`, { 
          withCredentials: true 
        });
        
        if (response.data && response.data.length > 0) {
          const habitacionData = response.data[0];
          
          // Verificar campos requeridos
          const requiredFields = ['Id_Habitacion', 'Precio', 'Descripcion', 'Requisitos', 
                                'Id_Admin', 'Id_Unidad', 'estado', 'Img_url'];
          const missingFields = requiredFields.filter(field => !habitacionData[field]);
          
          if (missingFields.length > 0) {
            throw new Error(`Faltan campos en la respuesta: ${missingFields.join(', ')}`);
          }
          
          setHabitacion(habitacionData);
        }
      } catch (err) {
        console.error('Error al cargar la habitación:', err);
        setError(`Error al cargar datos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitacion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitacion(prev => ({ ...prev, [name]: value }));
  };

  return {
    habitacion,
    setHabitacion,
    loading,
    error,
    handleChange
  };
};