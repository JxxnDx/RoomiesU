import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/styles';
import { Link } from 'react-router-dom';
import { IoBed, IoPeople, IoSquare, IoPricetag, IoCheckmarkCircle } from "react-icons/io5";

export default function Habitaciones() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  

  return (
    <div className='antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen'>
      {/* Header con título y descripción */}
      <div className='text-center pt-8 pb-6'>
        <h1 className='text-blue-500 font-bold text-5xl mb-4'>Gestión de Habitaciones</h1>
        <div className='max-w-3xl mx-auto px-4'>
          <p className='text-gray-300 text-lg'>
            Administra las habitaciones disponibles en tus unidades de vivienda. 
            Cada habitación puede ser configurada con diferentes características, 
            precios y disponibilidad para los estudiantes.
          </p>
        </div>
      </div>
      
      {/* Botón de creación */}
      <div className='flex justify-center mb-12'>
        <Link to="/creacionhabitacion" className="px-3">
          <button className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg text-lg transition duration-300 ${COLORS["hover"]}`}>
            Crear Nueva Habitación
          </button>
        </Link>
      </div>
      
      {/* Listado de habitaciones */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Habitaciones Registradas</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ejemplo de habitación (esto sería reemplazado por el mapeo de tus datos) */}
          <div className="bg-gray-700/80 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Habitación Individual</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500 text-white">
                  Disponible
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <IoBed className="mr-2 text-blue-400" />
                  <span>Tipo: Individual</span>
                </div>
                
                <div className="flex items-center">
                  <IoPeople className="mr-2 text-blue-400" />
                  <span>Capacidad: 1 persona</span>
                </div>
                
                <div className="flex items-center">
                  <IoSquare className="mr-2 text-blue-400" />
                  <span>Área: 12 m²</span>
                </div>
                
                <div className="flex items-center">
                  <IoPricetag className="mr-2 text-blue-400" />
                  <span>Precio: $300/mes</span>
                </div>
                
                <div className="flex items-center">
                  <IoCheckmarkCircle className="mr-2 text-blue-400" />
                  <span>Unidad: Casa Principal</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Link to="/editar-habitacion/1">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                    Editar
                  </button>
                </Link>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition">
                  Deshabilitar
                </button>
              </div>
            </div>
          </div>
          
          {/* Segunda habitación de ejemplo */}
          <div className="bg-gray-700/80 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Habitación Doble</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                  Ocupada
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <IoBed className="mr-2 text-blue-400" />
                  <span>Tipo: Compartida</span>
                </div>
                
                <div className="flex items-center">
                  <IoPeople className="mr-2 text-blue-400" />
                  <span>Capacidad: 2 personas</span>
                </div>
                
                <div className="flex items-center">
                  <IoSquare className="mr-2 text-blue-400" />
                  <span>Área: 18 m²</span>
                </div>
                
                <div className="flex items-center">
                  <IoPricetag className="mr-2 text-blue-400" />
                  <span>Precio: $200/mes</span>
                </div>
                
                <div className="flex items-center">
                  <IoCheckmarkCircle className="mr-2 text-blue-400" />
                  <span>Unidad: Edificio A</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Link to="/editar-habitacion/2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                    Editar
                  </button>
                </Link>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition">
                  Habilitar
                </button>
              </div>
            </div>
          </div>
        </div>

        {habitaciones.length === 0 && !error && (
          <div className="text-center text-white py-10">
            <p className="text-xl">No hay habitaciones registradas</p>
            <Link to="/crear-habitacion">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                Crear primera habitación
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}