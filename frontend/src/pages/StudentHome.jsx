import React, { useState, useEffect } from 'react'
import { COLORS } from '../constants/styles';
import HabitacionCardStudent from '../components/HabitacionCardStudent';
import { useHabitacionesStudent } from '../hooks/useHabitacionesStudent';

export default function StudentHome() {

  
  const { Habitaciones, isLoading, error } = useHabitacionesStudent();
  
  console.log(Habitaciones)
  return (
    <div className={`text-black h-full flex flex-col p-8`}>
      <header className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col flex-1 p-4'>
          <label className='font-bold pb-4'>Bucar habitación</label>
          <input type="text" placeholder='Buscar' className='rounded-lg text-black p-1 bg-gray-100 h-9'/>
        </div>
        <div className='flex flex-col flex-1 p-4'>
          <label className='font-bold pb-4'>Filtrar por</label>
          <select className='rounded-lg text-black p-1 bg-gray-100 h-9'>
            <option value="">Selecciona una opción</option>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="ubicacion">Ubicación</option>
          </select>
        </div>
      </header>
      <main className='flex flex-col p-4'>
        <h1 className='font-bold text-2xl'>Habitaciones disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Mapeo de las habitaciones */}
                  {Habitaciones.map((habitacion) => (
                   <HabitacionCardStudent
                   key={habitacion.Id_Habitacion}
                   habitacion={habitacion}
                   />
                  ))
        
                  }
                </div>
      </main>
    </div>
  )
}
