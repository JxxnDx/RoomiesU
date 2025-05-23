import React, { useState } from 'react';
import { FaCheck, FaTimes, FaUser } from 'react-icons/fa';
import { COLORS } from '../constants/styles';
import axios from 'axios';

export default function AplicacionCard({aplicacion, onEstadoActualizado, setMessage}) {
     const [error, setError] = useState();
     
     const { Fecha_Creacion, Estado, Id_Habitacion, Descripcion, Correo_Estudiante, Id_Aplicacion } = aplicacion;
    
    // Formateo de fecha
    const fechaFormateada = new Date(Fecha_Creacion).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const handleAccion = async (accion) => {
  try {
    // Actualizó el estado de la aplicación
    await axios.post(
      `http://localhost:4000/api/actualizar-aplicacion/${Id_Aplicacion}/${accion}`,
      {},
      { withCredentials: true }
    );

    // Enviamos el correo al usuario
    await axios.post('http://localhost:4000/api/enviar-email-aplicacion', {
      email: aplicacion.Correo_Estudiante,
    });

    // 3. Recargar lista y mostrar mensaje
    if (onEstadoActualizado) {
      onEstadoActualizado();
    }

    setMessage(`✅ Aplicación ${accion} correctamente y correo enviado.`);
  } catch (error) {
    console.error(`❌ Error al ${accion} aplicación:`, error);
    setError(`Error al ${accion} aplicación.`);
  }
};


    return (
        <div className={`${COLORS["light_primary"]} border border-gray-200 p-6 rounded-lg shadow-lg w-4/5 mx-auto my-4`}>
            <div className="flex flex-col space-y-4">
                {/* Encabezado */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Habitación {Id_Habitacion}</h3>
                    <span className={
                        Estado === "pendiente" ? "text-yellow-500 font-semibold" :
                        Estado === "aprobada" ? "text-green-600 font-semibold" :
                        Estado === "rechazada" ? "text-red-600 font-semibold" :
                        ""
                    }>
                        {Estado}
                    </span>
                </div>

                {/* Información adicional */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <p className="text-sm text-gray-600">Creada el {fechaFormateada}</p>
                    <div className="flex items-center text-sm text-gray-600">
                        <FaUser className="mr-1" />
                        <span>Enviada por: {Correo_Estudiante}</span>
                    </div>
                </div>

                {/* Descripción */}
                <div className="py-3">
                    <p className="text-gray-700">{Descripcion || "No hay descripción disponible"}</p>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-4 mt-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    onClick={() => handleAccion('rechazar')}>
                        <FaTimes className="mr-2" />
                        Rechazar
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    onClick={() => handleAccion('aceptar')}>
                        <FaCheck className="mr-2" />
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}