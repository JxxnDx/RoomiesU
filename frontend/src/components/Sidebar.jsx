import { COLORS } from '../constants/styles';
import { FaHome, FaPoll, FaRegEnvelope,FaFileContract,FaRegUserCircle  } from 'react-icons/fa';
import { MdApartment, MdOutlineBedroomChild, MdOutlineEmail, MdRateReview } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Icono de cerrar
import { Link } from 'react-router-dom';


export default function SideBar({ sidebarToggle, setSidebarToggle }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64  text-black transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out shadow-xl z-50 ${COLORS["light_primary"]}`}
    >
      {/* Botón de cerrar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        <IoClose 
          className="text-black text-2xl cursor-pointer" 
          onClick={() => setSidebarToggle(false)}
        />
      </div>
      <hr />
      <div className="flex flex-col justify-between h-[calc(100%-80px)]">
      <ul className="text-black font-bold mt-3">
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/InicioAdmin" className="px-3 w-full flex items-center">
            <FaHome className="h-6 w-6 inline-block mr-2 -mt-2" /> Inicio
          </Link>
        </li>
           <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/admindashboard" className="px-3 w-full flex items-center">
            <FaPoll className="h-6 w-6 inline-block mr-2 -mt-2" /> Resumen
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/unidadvivienda" className="px-3 w-full flex items-center">
            <MdApartment className="h-6 w-6 inline-block mr-2 -mt-2" /> Unidad Vivienda
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/habitacion" className="px-3 w-full flex items-center">
            <MdOutlineBedroomChild className="h-6 w-6 inline-block mr-2 -mt-2" /> Habitaciones
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/aplicaciones-admin" className="px-3 w-full flex items-center">
            <MdOutlineEmail className="h-6 w-6 inline-block mr-2 -mt-2" /> Aplicaciones
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/rentas" className="px-3 w-full flex items-center">
            <FaFileContract className="h-6 w-6 inline-block mr-2 -mt-2" /> Rentas
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/crear-reseña-admin" className="px-3 w-full flex items-center">
            <MdRateReview className="h-6 w-6 inline-block mr-2 -mt-2" /> Reseñas
          </Link>
        </li>
        
      </ul>
      <ul>
      <li className={`mb-4 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="/ver-perfil-admin" className="px-3 w-full flex items-center">
          <FaRegUserCircle className="h-6 w-6 inline-block mr-2 -mt-2" /> Perfil
        </Link>
      </li>
    </ul>
      </div>
    </div>
  );
}
