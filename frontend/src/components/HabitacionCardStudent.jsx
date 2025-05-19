import React,{useEffect,useState} from "react";
import { COLORS } from '../constants/styles';
import { NavLink } from "react-router-dom";
import { FaBed, FaFileAlt, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { SlDirection } from "react-icons/sl";
import { CiSquareQuestion } from "react-icons/ci";

export default function HabitacionCardStudent({ habitacion }) {
  const { Descripcion, Precio, Id_Habitacion, Img_url, Direccion, Requisitos, Nombre_Sector } = habitacion;
    const [show, setShow] = useState(false);

  useEffect(() => {
    // Esto hace que la animación se dispare al montar
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <article className={`transition-all duration-900 ease-in transform
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex flex-col ${COLORS["light_primary"]} text-black shadow-md hover:shadow-xl rounded-lg p-4 m-4 transition-all duration-300 hover:scale-[1.02] h-full`}>
      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-2">
        <FaBed className="text-lg" />
        <h2 className="text-xl font-bold">Habitación #{Id_Habitacion}</h2>
      </div>
      
      {/* Imagen (altura fija) */}
      <img 
        src={Img_url} 
        alt="Habitación" 
        className="rounded-lg mb-4 w-full h-60 object-cover mx-auto border-2 border-white shadow-sm"
      />
      
      {/* Contenido textual con altura controlada */}
      <div className="space-y-3 flex-grow">
        {/* Descripción con límite de líneas */}
        <div className="flex items-start gap-2">
          <CiSquareQuestion className="mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold">Descripción:</p>
            <p className="text-gray-700 line-clamp-3">{Descripcion}</p>
          </div>
        </div>

        {/* Descripción con límite de líneas */}
        <div className="flex items-start gap-2">
          <SlDirection className="mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold">Dirección:</p>
            <p className="text-gray-700 line-clamp-3">{Direccion}</p>
          </div>
        </div>

        {/* Sector para luego usarlo en el filtrado*/}
        <div className="flex items-start gap-2">
          <SlDirection className="mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold">Sector:</p>
            <p className="text-gray-700 line-clamp-3">{Nombre_Sector}</p>
          </div>
        </div>


        
        
        {/* Requisitos con scroll si excede el espacio */}
        <div className="flex items-start gap-2">
          <FaFileAlt className="mt-1 flex-shrink-0" />
          <div className="w-full">
            <p className="font-semibold">Requisitos:</p>
            <div className="max-h-20 overflow-y-auto text-gray-700 pr-2 custom-scrollbar">
              {Requisitos}
            </div>
          </div>

          
        </div>
      </div>
      
      {/* Footer (precio y botón) */}
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          <span className="text-lg font-semibold text-green-600">${Precio}</span>
        </div>
        
        <NavLink 
          to={`/ver-habitacion/${Id_Habitacion}`} 
          className={`flex items-center gap-1 ${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white rounded-lg px-4 py-2 transition-colors`}
        >
          Ver detalles <FaArrowRight className="text-sm" />
        </NavLink>
      </div>
    </article>
  );
}