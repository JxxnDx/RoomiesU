import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHabitacionesStudent = (filters = {}) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Función para recargar los datos
  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchHabitaciones = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/habitacionesforstudents', {
          withCredentials: true,
          params: {
            sector: filters.sector || null,
            ordenPrecio: filters.ordenPrecio || null
          }
        });
        setHabitaciones(response.data);
        setError('');
      } catch (err) {
        setError('Error al cargar las habitaciones: ' + (err.response?.data?.message || err.message));
        setHabitaciones([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabitaciones();
  }, [filters.sector, filters.ordenPrecio, refetchTrigger]);

  return { 
    habitaciones, 
    isLoading, 
    error, 
    refetch 
  };
};