import React from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../constants/styles'

export default function NavbarAdmin() {
  return (
    <div className={` ${COLORS["primary"]}`}>
        <header className={`flex justify-between items-center px-6 py-4 ${COLORS["primary"]} text-white fixed w-full top-0 shadow-md`}>
        <h1 className="text-4xl font-bold">RoomiesU</h1>
        
        <nav>
          <ul className="flex gap-2 text-white font-bold justify-center text-center">
            <li className='p-2.5'>
              <Link to="#" className="links-auth hover:text-green-500">
                Cerrar Sesión
              </Link>
            </li>
            <li>
              <button className='bg-gray-400 text-white rounded-lg p-2 hover:text-blue-600'>
                Perfil
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
    </div>
  )
}
