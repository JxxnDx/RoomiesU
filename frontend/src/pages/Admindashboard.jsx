import React from 'react'
import { COLORS, TEXT } from '../constants/styles';
import { MdBedroomParent } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMegaphoneLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function Admindashboard() {
  return (
    <>
    <div className={`text-black h-full flex flex-col p-8`}>
      <h1 className={`${TEXT["title"]}`}>Overview</h1>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8'>
      <div className={`${COLORS["light_primary"]} flex flex-col h-full rounded-lg p-4 items-center md:items-start transition-all duration-300 hover:scale-[1.02]`}>
        <Link to="/habitacion" className="px-3">
        <MdBedroomParent className={`${COLORS["light_secundary"]}  text-4xl rounded-2xl p-2 mb-2`} />
        </Link>
         <h1 className='font-bold text-xl'>Habitaciones Totales</h1>
         <h2 className='font-semibold text-6xl'>190</h2>
         <p> 4 unidades de vivienda</p>
         </div>
      <div className={`${COLORS["light_primary"]} flex flex-col h-full rounded-lg p-4 items-center md:items-start transition-all duration-300 hover:scale-[1.02]`}>
        <Link to="/habitacion" className="px-3">
        <CiCircleCheck  className={` ${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-xl'>Habitaciones Disponibles</h1>
         <h2 className='font-semibold text-6xl'>190</h2>
         <p> 90 listas para publicar</p>
         </div>
      <div className={`${COLORS["light_primary"]} flex flex-col h-full rounded-lg p-4 items-center md:items-start transition-all duration-300 hover:scale-[1.02]`}>
        <Link to="/habitacion" className="px-3">
        <FaRegUserCircle  className={`${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-lg'>Habitaciones Ocupadas</h1>
         <h2 className='font-semibold text-6xl'>100</h2>
         <p> Más de 100 inquilinos</p></div>
      <div className={`${COLORS["light_primary"]} flex flex-col h-full rounded-lg p-4  items-center md:items-start transition-all duration-300 hover:scale-[1.02]`}>
        <Link to="/admindashboard" className="px-3">
        <RiMegaphoneLine  className={`${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-xl'>Solicitudes</h1>
         <h2 className='font-semibold text-6xl'>30</h2>
         <p> En menos de 30 días</p>
        </div>
    </div>
    
    </>
  )
}
