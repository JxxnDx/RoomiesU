import React from 'react'
import { COLORS } from '../constants/styles'
import {FaHome, FaPoll, FaRegEnvelope} from 'react-icons/fa'
import { MdApartment, MdOutlineBedroomChild, MdOutlineEmail, MdRateReview } from "react-icons/md";

export default function SideBar() {
    
  return (
    <div className={`w-64 ${COLORS["primary"]}  fixed h-full px-4 py-2`}>
      <div className='mb-2 my-4'>
        <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr/>
      <ul className='text-white font-bold mt-3'>
      <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <FaHome className="h-6 w-6 inline-block mr-2 -mt-2"></FaHome>
                Inicio
            </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <FaPoll className="h-6 w-6 inline-block mr-2 -mt-2"></FaPoll>
                Resumen
            </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <MdApartment className="h-6 w-6 inline-block mr-2 -mt-2"></MdApartment>
                Unidad Vivienda
            </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <MdOutlineBedroomChild className="h-6 w-6 inline-block mr-2 -mt-2"></MdOutlineBedroomChild>
                Habitaciones
            </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <MdOutlineEmail className="h-6 w-6 inline-block mr-2 -mt-2"></MdOutlineEmail>
                Aplicaciones
            </a>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2  ${COLORS["hover"]} `}>
            <a href="#" className='px-3'>
                <MdRateReview className="h-6 w-6 inline-block mr-2 -mt-2"></MdRateReview>
                Reseñas
            </a>
        </li>
        
      </ul>
    </div>
  )
}
