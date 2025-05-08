import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/styles';
import { Link } from 'react-router-dom';
import { IoBed, IoPeople, IoSquare, IoPricetag, IoCheckmarkCircle } from "react-icons/io5";
import { useAdmin } from '../hooks/useAdmin';
import { useHabitaciones } from '../hooks/useHabitaciones';
import HabitacionCard from '../components/HabitacionCard';

export default function Habitaciones() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { adminId, isLoading: isLoadingAdmin, error: adminError } = useAdmin();
  const { Habitaciones, isLoading: isLoadingHabitaciones, error: habitacionesError } = useHabitaciones(adminId);
  
console.log(Habitaciones);
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
          {Habitaciones.map((habitacion) => (
           <HabitacionCard
           key={habitacion.Id_Habitacion}
           habitacion={habitacion}
           />
          ))

          }
        </div>

        {Habitaciones.length === 0 && !error && (
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