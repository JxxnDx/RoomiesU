import { COLORS } from '../constants/styles';
import { FaHome, FaPoll,FaRegUserCircle } from 'react-icons/fa';
import {  MdOutlineBedroomChild, MdOutlineEmail, MdRateReview } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Icono de cerrar
import { Link } from 'react-router-dom';


export default function SideBarStudent({ sidebarToggle, setSidebarToggle }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 text-black transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out shadow-xl z-50 ${COLORS["light_primary"]}`}
    >
      {/* Botón de cerrar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Roomies U</h1>
        <IoClose 
          className="text-2xl cursor-pointer" 
          onClick={() => setSidebarToggle(false)}
        />
      </div>
      <hr />
      
      {/* Menú dividido */}
  <div className="flex flex-col justify-between h-[calc(100%-80px)]"> {/* 80px para el header */}
    <ul className="font-bold mt-3">
      <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/Inicio" className="px-3">
          <FaHome className="h-6 w-6 inline-block mr-2 -mt-2" /> Inicio
        </Link>
      </li>
      <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/mis-rentas" className="px-3">
          <FaPoll className="h-6 w-6 inline-block mr-2 -mt-2" /> Rentas
        </Link>
      </li>
      <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/studenthome" className="px-3">
          <MdOutlineBedroomChild className="h-6 w-6 inline-block mr-2 -mt-2" /> Habitaciones
        </Link>
      </li>
      <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/aplicaciones" className="px-3">
          <MdOutlineEmail className="h-6 w-6 inline-block mr-2 -mt-2" /> Aplicaciones
        </Link>
      </li>
      <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/crear-reseña" className="px-3">
          <MdRateReview className="h-6 w-6 inline-block mr-2 -mt-2" /> Reseñas
        </Link>
      </li>
    </ul>

    {/* Perfil abajito para que se vea mejor */}
    <ul>
      <li className={`mb-4 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/ver-perfil" className="px-3">
          <FaRegUserCircle className="h-6 w-6 inline-block mr-2 -mt-2" /> Perfil
        </Link>
      </li>
    </ul>
  </div>
    </div>
  );
}
