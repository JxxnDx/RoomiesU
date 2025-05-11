import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSectoresData = () => {
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/sectores', { 
          withCredentials: true 
        });
        setSectores(response.data);
      } catch (err) {
        console.error('Error al cargar sectores:', err);
        setError('Error al cargar los sectores');
      } finally {
        setLoading(false);
      }
    };

    fetchSectores();
  }, []);

  return {
    sectores,
    loading,
    error
  };
};