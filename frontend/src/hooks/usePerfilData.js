import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePerfilData = () => {
  const [perfil, setPerfil] = useState({
    Nombre: '',
    Apellido: '',
    Descripcion: '',
    Telefono: '',
    Identificacion: '',
    Edad: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    

    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/info-perfil`, { 
          withCredentials: true 
        });
        
        if (response.data && response.data.length > 0) {
          const perfilData = response.data[0];
          
          // Verificar campos requeridos
          const requiredFields = ['Nombre', 'Apellido', 'Descripcion', 'Telefono', 
                                'Edad', 'Identificacion'];
          const missingFields = requiredFields.filter(field => !perfilData[field]);
          
          if (missingFields.length > 0) {
            throw new Error(`Faltan campos en la respuesta: ${missingFields.join(', ')}`);
          }
          
          setPerfil(perfilData);
        }
      } catch (err) {
        console.error('Error al cargar la información del perfil:', err);
        setError(`Error al cargar datos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  return {
    perfil,
    setPerfil,
    loading,
    error,
    handleChange
  };
};