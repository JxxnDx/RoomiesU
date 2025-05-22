import React from 'react'
import { RiPassPendingFill } from "react-icons/ri";
import { COLORS } from '../constants/styles';

export default function AplicacionStudent({aplicacion}) {
    // const {Fecha_Creacion, estado, Id_Habitacion} = aplicacion;
    const estado = 'Pendiente';
  return (
   <div className={`${COLORS["light_primary"]} border border-gray-200 p-8 rounded-lg shadow-lg w-full  mx-auto my-4`}>
  <div className="flex items-center space-x-4">
    <RiPassPendingFill className="text-4xl text-green-400" />
    <p className="flex lg:space-x-32 space-x-8">
      <span className='font-semibold'>Habitación 2</span>
      <span className={
    estado === "Pendiente" ? "text-yellow-500 font-semibold" :
    estado === "Aprobada" ? "text-green-600 font-semibold" :
    estado === "Rechazada" ? "text-red-600 font-semibold" :
    ""
  }>
    {estado}
  </span>

      <span>Creada el 20/05/2025</span>
    </p>
  </div>
</div>
  )
}
