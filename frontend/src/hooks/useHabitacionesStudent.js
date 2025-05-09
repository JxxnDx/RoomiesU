// src/hooks/useHabitacionesStudent.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHabitacionesStudent = () => {
  const [Habitaciones, setHabitaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabitaciones = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/habitacionesforstudents', {
          withCredentials: true,
        });
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al cargar las habitaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  return { Habitaciones, isLoading, error };
};
