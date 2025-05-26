import React, { useState, useEffect } from 'react';
import { COLORS, TEXT } from '../constants/styles';
import { Link } from 'react-router-dom';
import { IoBed, IoPeople, IoSquare, IoPricetag, IoCheckmarkCircle } from "react-icons/io5";
import { useAdmin } from '../hooks/useAdmin';
import { useHabitaciones } from '../hooks/useHabitaciones';
import HabitacionCard from '../components/HabitacionCard';
import { IoArrowBack } from 'react-icons/io5';

export default function Habitaciones() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { adminId, isLoading: isLoadingAdmin, error: adminError } = useAdmin();
  const { Habitaciones, isLoading: isLoadingHabitaciones, error: habitacionesError } = useHabitaciones(adminId);
  
// console.log(Habitaciones);
  return (
    <div className='antialiased bg-white min-h-screen m-8'>
      <h3 className='flex mb-4 text-black'> 
                  <Link to="/admindashboard" className='flex items-center hover:text-[#01b09e] transition-all'> 
                  <IoArrowBack className="mr-2" /> <span>Dashboard</span>
                  </Link> - 
                  <span>Habitaciones</span></h3>
      {/* Header con título y descripción */}
      <h1 className={`${TEXT["title"]}`}>Gestión de Habitaciones</h1>
      <div className=''>
        <div className=''>
          <p className='text-lg py-4'>
            Administra las habitaciones disponibles en tus unidades de vivienda. 
            Cada habitación puede ser configurada con diferentes características, 
            precios y disponibilidad para los estudiantes.
          </p>
        </div>
      </div>
      
      {/* Botón de creación */}
      <div className='mx-8'>
        <Link to="/creacionhabitacion" className="px-3">
          <button className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-3 px-8 rounded-xl shadow-lg text-lg transition duration-300 ${COLORS["hover"]}`}>
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
          {/* Mapeo de las habitaciones */}
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
            <Link to="/creacionhabitacion">
              <button className={`mt-4 ${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded-lg transition duration-300`}>
                Crear primera habitación
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}