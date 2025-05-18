import React, { useState } from 'react';
import { SiGoogletasks } from "react-icons/si";
import { LuTrash } from "react-icons/lu";
import axios from 'axios';
import { COLORS} from '../constants/styles'

export default function ServicesItem({ servicio, funcionRefrescar }) {
    const{ Id_Habitacion, Id_Servicio, Nombre} = servicio;
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleEliminar = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/eliminarservicio/${Id_Habitacion}/${Id_Servicio}`,
        { withCredentials: true } 
      );

      if (response.status === 200) {
        // console.log("Servicio eliminado");
        if (funcionRefrescar) funcionRefrescar();
      } else {
        console.error("Error eliminando el servicio");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <>
      {/* Tarjeta */}
      <div className={` ${COLORS["light_primary"]} w-3/5 h-12 rounded-lg m-4 flex items-center`}>
        <SiGoogletasks className='ml-8 h-8 w-6' />
        <h2 className='ml-8 font-semibold'>{Nombre}</h2>
        <LuTrash
          className='bg-red-400 ml-auto mr-16 rounded-md h-8 w-6 hover:bg-red-500 cursor-pointer'
          onClick={() => setMostrarModal(true)}
        />
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-20 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">¿Confirmar eliminación?</h2>
            <p className="mb-6">¿Deseas eliminar el servicio <span className="font-semibold">{Nombre}</span>?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
