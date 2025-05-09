import React, { useState, useEffect } from 'react';
import { COLORS, TEXT } from '../constants/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoLocation, IoHome, IoList, IoCheckmarkCircle } from "react-icons/io5";
import CreationUnidad from './CreationUnidad';

export default function UnidadVivienda() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Obtener unidades desde el endpoint
  useEffect(() => {
    axios.get('http://localhost:4000/api/unidades', { withCredentials: true })
      .then(response => setUnidades(response.data))
      .catch(err => {
        console.error('Error al cargar unidades:', err);
        setError('Error al cargar las unidades');
      });
  }, []);

  // Cargar el ID de administrador
  useEffect(() => {
    axios.get("http://localhost:4000/auth/me", { withCredentials: true })
      .then(response => {
        const userId = response.data.user.id || response.data.user._id || response.data.user.userId;
        if (!userId) {
          console.warn('No se pudo identificar el ID del usuario en:', response.data.user);
          setError('No se pudo identificar al administrador');
        }
      })
      .catch(err => {
        console.error('Error al obtener datos del usuario:', err);
        setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
      });
  }, []);

  // Precargar imagen
  useEffect(() => {
    const img = new Image();
    img.src = "/Residencia_Universitaria.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  if (!imageLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className='antialiased bg-white min-h-screen p-8'>
      <h1 className={`${TEXT["title"]}`}>Unidad de vivienda</h1>
      <div className='text-black text-lg py-4'>
        <p>
          Como administrador deberá crear una unidad de vivienda que se refiere al tipo de edificación donde
          se encuentran las habitaciones que va a publicar en la plataforma. La unidad de vivienda puede ser 
          por ejemplo: Una Casa, un edificio, un apartamento, un Hotel.
        </p>
      </div>

      <CreationUnidad />
      
      {/* <div className='flex justify-items-start'>
        <Link to="/creacionunidad" className="">
          <button className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} cursor-pointer text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300`}>
            Crear Unidad
          </button>
        </Link>
      </div> */}
      
      <div className="container mx-auto py-8">
        <h1 className={`${TEXT["title"]} my-8`}>Unidades de Vivienda</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mb-6">
            {error}
          </div>
        )}
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {unidades.map(unidad => (
            <div key={unidad.Id_Unidad} className={`${COLORS["light_primary"]} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{unidad.Nombre}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    unidad.estado === 'habilitado' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {unidad.estado}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <IoLocation className="mr-2 text-green-400" />
                    <span>{unidad.Direccion}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <IoHome className="mr-2 text-green-400" />
                    <span className="capitalize">{unidad.Tipo}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <IoList className="mr-2 text-green-400" />
                    <span>Sector: {unidad.Id_Sector}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <IoCheckmarkCircle className="mr-2 text-green-400" />
                    <span>Admin ID: {unidad.Id_Admin}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                <Link to={`/editar-unidad/${unidad.Id_Unidad}`}>
                  <button className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white py-2 px-4 rounded-lg transition`}>
                    Editar
                  </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {unidades.length === 0 && !error && (
          <div className="text-center text-white py-10">
            <p className="text-xl">No hay unidades registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}