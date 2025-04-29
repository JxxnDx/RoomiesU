import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";



export default function FormUnidad() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    id_sector: '',
    id_admin: '',
    estado: 'habilitado' 
  });
    const navigate = useNavigate();
  const [sectores, setSectores] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Obtener sectores desde el endpoint
  useEffect(() => {

    axios.get('http://localhost:4000/api/sectores')
      .then(response => setSectores(response.data))
      .catch(err => {
        console.error('Error al cargar sectores:', err);
        setError('Error al cargar los sectores');
      });
  }, []);

  // Cargar el ID de administrador usando el mismo método que ProtectedRoutes
  useEffect(() => {
    axios.get("http://localhost:4000/auth/me", { withCredentials: true })
      .then(response => {
        // console.log('Datos de usuario obtenidos:', response.data);
        // Obtener el ID del usuario desde la respuesta
        const userId = response.data.user.id || response.data.user._id || response.data.user.userId;
        if (userId) {
          // console.log('ID de usuario encontrado:', userId);
          setFormData(prev => ({ ...prev, id_admin: userId }));
        } else {
          console.warn('No se pudo identificar el ID del usuario en:', response.data.user);
          setError('No se pudo identificar al administrador');
        }
      })
      .catch(err => {
        console.error('Error al obtener datos del usuario:', err);
        setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Validación básica
    if (!formData.nombre || !formData.direccion || !formData.tipo || !formData.id_sector) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (!formData.id_admin) {
      setError('No se ha podido identificar al administrador');
      return;
    }

    //  Aquí imprimimos los datos exactos que se van a enviar
  console.log('Datos que se enviarán al backend:', formData);
    
    // Enviar los datos al backend
    axios.post('http://localhost:4000/api/creacionunidad', formData, { withCredentials: true })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setMessage('Unidad registrada exitosamente ✅');
        setError('');
        // Opcional: Limpiar el formulario
        setFormData({
          nombre: '',
          direccion: '',
          tipo: '',
          id_sector: '',
          id_admin: formData.id_admin, // Mantener el ID del admin
          estado: 'habilitado'
        });
        
      })
      .catch(err => {
        console.error('Error al registrar unidad:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al registrar la unidad');
      });
  };

  return (
    <>
 <div className="w-full flex justify-start mt-6 ml-16">

   <button 
             onClick={() => navigate('/unidadvivienda')}
             className="flex items-center text-white mb-6 hover:text-yellow-300 transition"
           >
             <IoArrowBack className="mr-2" /> Volver a Unidades
           </button>
  </div>
    <div className="bg-gray-700/80 backdrop-blur-md text-white p-6 rounded-lg w-full max-w-md mx-auto mt-10">
      
      <h2 className="text-2xl font-bold text-center">Crear Unidad de Vivienda</h2>
      
      {/* Mostrar información del ID de administrador (solo para depuración)
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs bg-gray-800 p-2 mt-2 rounded">
          ID Admin: {formData.id_admin || 'No cargado'}
        </div>
      )} */}

       
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {["nombre", "direccion"].map((field) => (

          <div key={field}>
            <label className="block text-gray-300 text-sm capitalize">{field}</label>
            <input
              type="text"
              name={field}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
              value={formData[field]}
              onChange={handleChange}
              required

            />
          </div>
        ))}

        <div>

          <label className="block text-gray-300 text-sm">Tipo</label>
          <select
            name="tipo"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="residencia">Residencia Universitaria</option>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa Urbana</option>
            <option value="habitacion">Habitación</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm">Sector</label>
          <select
            name="id_sector"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
            value={formData.id_sector}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un sector</option>
            {sectores.map((sector) => (
              <option key={sector.Id_Sector} value={sector.Id_Sector}>
                {sector.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm">Estado</label>
          <select
            name="estado"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="habilitado">Habilitado</option>
            <option value="deshabilitado">Deshabilitado</option>
          </select>
        </div>


        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-lg transition"
        >
          Crear Unidad
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-400 text-sm text-center">{message}</p>}
      </form>
    </div>

    </>
  );
}

