import React from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../constants/styles'
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa'

export default function Navbar({sidebarToggle, setSidebarToggle}) {
  return (
   <nav className={`flex justify-between py-3 px-4  ${COLORS["primary"]} border-b-2 border-white`}>
     <div className={`flex items-center text-xl`}>
       <FaBars className='text-white cursor-pointer me-4' onClick={()=> setSidebarToggle(!sidebarToggle)}/>
       <span className='text-white font-bold text-2xl'>Roomies U</span>
     </div>
     <div className='flex items-center gap-x-5'>
        <div className='text-white'>
          <FaBell className='h-6 w-6 cursor-pointer'/>
        </div>
        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='h-6 w-6 mt-1 cursor-pointer'/>
            <div className='z-10 bg-white hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href="#">Perfil</a></li>
                <li><a href="#"></a>Cerrar Sesión</li>
              </ul>
            </div>
          </button>
        </div>
     </div>
   </nav>
  )
}
