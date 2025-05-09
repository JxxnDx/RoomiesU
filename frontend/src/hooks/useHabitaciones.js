import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHabitaciones = (adminId) => {
  const [Habitaciones, setHabitaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminId) return;

    const fetchHabitaciones = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/habitacionesbyadmin', {
          params: { adminId },
          withCredentials: true
        });
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al cargar las habitaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabitaciones();
  }, [adminId]);

  return { Habitaciones, isLoading, error };
};