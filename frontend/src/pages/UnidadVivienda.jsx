import React from 'react';
import { COLORS } from '../constants/styles';
import { Link } from 'react-router-dom';


export default function UnidadVivienda() {
  return (
    <div className='antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen  '>
        <h1 className='text-center text-white font-bold text-6xl pt-4'>Unidad de vivienda</h1>
        <div className='flex ml-16 justify-items-start'>
        <Link to="/creacionunidad" className="px-3">
         <button className={`bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg text-lg transition duration-300"  ${COLORS["hover"]}`}>
         
         Crear Unidad
         </button>
         </Link>
        </div>
    </div>
  )
}
