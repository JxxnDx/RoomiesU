import React from 'react';
import { COLORS } from '../constants/styles';
import { FaHome, FaPoll } from 'react-icons/fa';
import {  MdOutlineBedroomChild, MdOutlineEmail, MdRateReview } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Icono de cerrar

export default function SideBarStudent({ sidebarToggle, setSidebarToggle }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 ${COLORS["primary"]} text-white transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      {/* Botón de cerrar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Roomies U</h1>
        <IoClose 
          className="text-white text-2xl cursor-pointer" 
          onClick={() => setSidebarToggle(false)}
        />
      </div>
      <hr />
      
      <ul className="text-white font-bold mt-3">
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <a href="#" className="px-3">
            <FaHome className="h-6 w-6 inline-block mr-2 -mt-2" /> Inicio
          </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <a href="#" className="px-3">
            <FaPoll className="h-6 w-6 inline-block mr-2 -mt-2" /> Rentas
          </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <a href="#" className="px-3">
            <MdOutlineBedroomChild className="h-6 w-6 inline-block mr-2 -mt-2" /> Habitaciones
          </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <a href="#" className="px-3">
            <MdOutlineEmail className="h-6 w-6 inline-block mr-2 -mt-2" /> Aplicaciones
          </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <a href="#" className="px-3">
            <MdRateReview className="h-6 w-6 inline-block mr-2 -mt-2" /> Reseñas
          </a>
        </li>
      </ul>
    </div>
  );
}
