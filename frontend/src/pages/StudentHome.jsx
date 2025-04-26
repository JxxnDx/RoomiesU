import React from 'react'
import { COLORS } from '../constants/styles';
import HabitacionCard from '../components/HabitacionCard';

export default function StudentHome() {
  return (
    <div className={`${COLORS["primary"]} text-white h-full flex flex-col p-8`}>
      <header className='flex flex-row gap-y-4'>
        <div className='flex flex-col w-full p-4'>
          <label className='font-bold pb-4'>Bucar habitación</label>
          <input type="text" placeholder='Buscar' className='rounded-lg text-black p-1 bg-gray-100 h-9'/>
        </div>
        <div className='flex flex-col w-full p-4'>
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
        <div className='grid grid-cols-3 mt-4'>
          <HabitacionCard/>
          <HabitacionCard/>
          <HabitacionCard/>
          <HabitacionCard/>
        </div>
      </main>
    </div>
  )
}
