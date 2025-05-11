import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchHabitacion = (habitacionId) => {
  const [habitacion, setHabitacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/habitacion/${habitacionId}`, {
          withCredentials: true, // Esto envía las cookies de autenticación
        });
        const habitacionData = response.data[0]; // Suponiendo que la respuesta es un array, tomamos el primer elemento
        setHabitacion(habitacionData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (habitacionId) {
      fetchHabitacion();
    }
  }, [habitacionId]);

  return { habitacion, isLoading, error };
};

export default useFetchHabitacion;
