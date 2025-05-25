import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import RentaCardStudent from '../components/RentaCardStudents';

export default function RentasStudent() {

  //Renta de prueba
  const rentas = [{
  Id_Renta: 123,
  Correo: "juan.perez@example.com",
  Fecha_inicio: "2025-06-01",
  Fecha_fin: "2025-06-30",
  Estado: "aceptada",         // Cambia a "pendiente" para probar el color amarillo
  Monto_Renta: 450000,
  Estado_Pago: 0              // Cambia a 1 para ver cómo se pinta en verde
}];

    const navigate= useNavigate;
  return (
    <>
    <div className={`bg-white p-4 w-full my-8`}>
          <button
            onClick={() => navigate(`/studenthome`)}
            className="flex items-center mb-6 text-gray-700 hover:text-[#01b09e] transition-all duration-300 font-medium"
          >
            <IoArrowBack className="mr-2 text-lg" /> Volver a Habitaciones
          </button>
    
          <div className="bg-[#f9f9f9] rounded-2xl shadow-md p-6 mx-8 mb-10 border border-gray-200">
           <h1 className="text-4xl text-center text-[#333] font-bold mb-6">Rentas</h1>
            <p className="text-lg text-gray-700 mb-4">
            En esta sección podrás ver las rentas asociadas a tu cuenta. Recuerda que los administradores son quienes generan las rentas, 
            pero estas deben estar consensuadas contigo antes de iniciar. Si alguna renta fue creada sin tu consentimiento, puedes cancelarla. 
            </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
         <li><strong>Visita el lugar</strong> antes de arrendar una habitación.</li>
         <li><strong>Contacta al administrador</strong> para definir los términos y condiciones del acuerdo.</li>
         <li><strong>Tienes 3 días</strong> para aceptar o cancelar una renta una vez ha sido creada.</li>
         </ul>
         </div>
         
         {/* Aquí mostramos las rentas disponibles*/}
         <div className='grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 mt-16 border-gray-300 border-t p-4'>
                 {rentas.map((renta) => (
                 <RentaCardStudent key={renta.Id_Renta} renta={renta} />
               ))}
               </div>
          </div>
        </>
  )
}
