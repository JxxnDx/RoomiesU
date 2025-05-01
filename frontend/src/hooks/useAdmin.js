import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", { 
          withCredentials: true 
        });
        
        const userId = response.data.user.id || response.data.user._id || response.data.user.userId;
        
        if (userId) {
          setAdminId(userId);
        } else {
          setError('No se pudo identificar al administrador');
        }
      } catch (err) {
        setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdminId();
  }, []);

  return { adminId, isLoading, error };
};