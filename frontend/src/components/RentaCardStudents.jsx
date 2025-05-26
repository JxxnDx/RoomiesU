import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function RentaCardStudent({ renta,setMessage, onEstadoActualizado }) {
  const {
    Id_Renta,
    Correo,
    Fecha_inicio,
    Fecha_fin,
    Estado,
    Monto_Renta,
    Estado_Pago
  } = renta;

const[error,setError]=useState('');

const Fecha_inicio_formateada = new Date(Fecha_inicio).toISOString().split('T')[0];
const Fecha_fin_formateada = new Date(Fecha_fin).toISOString().split('T')[0];
const hoy = new Date().toISOString().split('T')[0];

  const estadoColor = Estado === 'aceptada' ? 'text-green-600' : 'text-yellow-500';
  const pagoColor = Estado_Pago === 1 ? 'text-green-600' : 'text-red-600';

   const handleAccion = async (accion) => {
  
  try {
    // Actualizó el estado de la aplicación
    await axios.put(
      `http://localhost:4000/api/actualizar-renta-estudiante/${Id_Renta}/${accion}`,
      {},
      { withCredentials: true }
    );


    // 3. Recargar lista y mostrar mensaje
    if (onEstadoActualizado) {
      onEstadoActualizado();
    }

    setMessage(`Renta ${accion} correctamente .`);
  } catch (error) {
    console.error(`❌ Error al ${accion} renta:`, error);
    setError(`Error al ${accion} renta.`);
  }

  };

 
//Condicionales para habilitar o deshabilitar botones de acuerdo a la lógica que estamos manejando
  const deshabilitarTerminar = Fecha_fin_formateada !== hoy;
  const deshabilitarCancelar = Estado === 'en_curso';
  

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200 transition-all duration-300 hover:scale-[1.02]">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Renta #{Id_Renta}</h2>
      <p className="text-gray-700"><span className="font-semibold">Correo:</span> {Correo}</p>
      <p className="text-gray-700"><span className="font-semibold">Inicio:</span> {Fecha_inicio_formateada}</p>
      <p className="text-gray-700"><span className="font-semibold">Fin:</span> {Fecha_fin_formateada}</p>
      <p className={`font-semibold text-gray-700`}>Estado: <span className={`font-semibold ${estadoColor}`}>{Estado}</span></p>
      <p className="text-gray-700"><span className="font-semibold">Monto:</span> ${Monto_Renta}</p>
      <p className={`font-semibold text-gray-700`}>Estado de Pago: <span className={`font-semibold ${pagoColor}`}>{Estado_Pago === 1 ? 'Pagado' : 'Pendiente'}</span></p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-1">
        
        <button
          onClick={() => handleAccion('cancelar')}
          className={`px-4 py-2 rounded-lg font-medium transition text-white ${
            deshabilitarCancelar
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
          >
          Cancelar
        </button>
        <button
          onClick={() => handleAccion('terminar')}
          className={`px-4 py-2 rounded-lg font-medium transition text-white ${
            deshabilitarTerminar
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`} >
          Terminar
        </button>
        <button
          onClick={() => handleAccion('aceptar')}
          className={`px-4 py-2 rounded-lg font-medium transition text-white ${
            deshabilitarCancelar
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          >
          Aceptar
        </button>
        
      </div>
    </div>
  );
}
