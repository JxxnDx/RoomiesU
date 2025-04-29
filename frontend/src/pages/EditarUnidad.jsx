import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack, IoCheckmarkDone } from "react-icons/io5";

export default function EditarUnidad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unidad, setUnidad] = useState({
    Nombre: '',
    Direccion: '',
    Tipo: '',
    estado: '',
    Id_Sector: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sectores, setSectores] = useState([]);

  // Cargamos los sectores
  useEffect(() => {
    axios.get('http://localhost:4000/api/sectores', { withCredentials: true })
      .then(response => {
        setSectores(response.data);
      })
      .catch(err => {
        console.error('Error al cargar sectores:', err);
        setError('Error al cargar los sectores');
      });
  }, []);

  // Cargar datos de la unidad
  useEffect(() => {
    const fetchUnidad = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/unidad/${id}`, { 
          withCredentials: true 
        });
        console.log('Datos recibidos:', response.data); // Para depuración
        setUnidad(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar la unidad:', err);
        setError('Error al cargar los datos de la unidad');
        setLoading(false);
      }
    };

    fetchUnidad();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnidad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Enviando datos:', unidad); // Para depuración
      const response = await axios.put(
        `http://localhost:4000/api/editarunidad/${id}`,
        unidad,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Respuesta del servidor:', response); // Para depuración
      
      if (response.status === 200) {
        setSuccess('Unidad actualizada correctamente');
        setTimeout(() => {
          navigate('/unidadvivienda');
        }, 2000);
      }
    } catch (err) {
      console.error('Error al actualizar la unidad:', err);
      if (err.response) {
        console.error('Detalles del error:', err.response.data);
        setError(err.response.data.message || 'Error al actualizar la unidad');
      } else {
        setError('Error de conexión con el servidor');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Cargando datos de la unidad...</p>
      </div>
    );
  }

  return (
    <div className='antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen p-8'>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/unidad-vivienda')}
          className="flex items-center text-white mb-6 hover:text-yellow-300 transition"
        >
          <IoArrowBack className="mr-2" /> Volver a Unidades
        </button>

        <h1 className='text-3xl font-bold text-white mb-6'>Editar Unidad de Vivienda</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Nombre */}
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="Nombre"
                value={unidad.Nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Campo Dirección */}
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="direccion">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="Direccion"
                value={unidad.Direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Campo Tipo */}
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="tipo">
                Tipo
              </label>
              <select
                id="tipo"
                name="Tipo"
                value={unidad.Tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="residencia">Residencia Universitaria</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa Urbana</option>
                <option value="habitacion">Habitación</option>
              </select>
            </div>

            {/* Campo Estado */}
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="estado">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={unidad.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="habilitado">Habilitado</option>
                <option value="deshabilitado">Deshabilitado</option>
              </select>
            </div>

            {/* Campo Sector */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-white mb-2" htmlFor="sector">
                ID Sector
              </label>
              <select
                id="sector"
                name="Id_Sector"
                value={unidad.Id_Sector}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
            >
              <IoCheckmarkDone className="mr-2" /> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}