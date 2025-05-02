import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUnits = (adminId) => {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminId) return;

    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/unidades', {
          params: { adminId },
          withCredentials: true
        });
        setUnits(response.data);
      } catch (err) {
        setError('Error al cargar las unidades: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits();
  }, [adminId]);

  return { units, isLoading, error };
};