import React from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../constants/styles'
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa'

export default function Navbar({sidebarToggle, setSidebarToggle}) {
  return (
   <nav className={`flex justify-between py-3 px-4 border-b-2 border-gray-200`}>
     <div className={`flex items-center text-xl`}>
       <FaBars className='text-black cursor-pointer me-4' onClick={()=> setSidebarToggle(!sidebarToggle)}/>
       <span className='text-black font-bold text-2xl'>Roomies U</span>
     </div>
     <div className='flex items-center gap-x-5'>
        <div className='text-black'>
          <FaBell className='h-6 w-6 cursor-pointer'/>
        </div>
        <div className='relative'>
          <button className='text-black group'>
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
