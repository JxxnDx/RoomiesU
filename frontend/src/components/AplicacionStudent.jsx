import React from 'react'
import { RiPassPendingFill } from "react-icons/ri";
import { COLORS } from '../constants/styles';
import { Link } from 'react-router-dom';

export default function AplicacionStudent({aplicacion}) {
    const {Fecha_Creacion, Estado, Id_Habitacion} = aplicacion;

//Aquí formateo la fecha para que se vea mejor en la interfaz
    const fechaFormateada = new Date(Fecha_Creacion).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

    
  return (
   <div className={`${COLORS["light_primary"]} border border-gray-200 p-8 rounded-lg shadow-lg w-full  mx-auto my-4`}>
  <div className="flex items-center space-x-4">
    <RiPassPendingFill className="text-4xl text-green-400" />
    <p className="flex lg:space-x-32 space-x-8">
        <Link to={`/ver-habitacion/${Id_Habitacion}`}>
      <span className='font-semibold hover:text-green-400'>Habitación {Id_Habitacion}</span>
      </Link>
      <span className={
    Estado === "pendiente" ? "text-yellow-500 font-semibold" :
    Estado === "aprobada" ? "text-green-600 font-semibold" :
    Estado === "rechazada" ? "text-red-600 font-semibold" :
    ""
  }>
    {Estado}
  </span>

      <span>Creada el {fechaFormateada}</span>
    </p>
  </div>
</div>
  )
}
