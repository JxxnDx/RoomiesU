import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { COLORS } from '../constants/styles'
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa'
import axios from 'axios';

export default function Navbar({ sidebarToggle, setSidebarToggle }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/logout', {}, {
        withCredentials: true // Incluye la cookie HttpOnly
      });

      if (response.status === 200) {
        navigate('/'); // Redirige tras logout
      } else {
        console.error('Error al cerrar sesión:', response);
      }
    } catch (error) {
      console.error('Error en handleLogout:', error);
    }
  };

  return (
    <nav className="flex justify-between py-3 px-4 border-b-2 border-gray-200">
      <div className="flex items-center text-xl">
        <FaBars className="text-black cursor-pointer me-4" onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className="text-black font-bold text-2xl">Roomies U</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="text-black">
          <FaBell className="h-6 w-6 cursor-pointer" />
        </div>
        <div className="relative group">
          <div className="text-black cursor-pointer">
            <FaUserCircle className="h-6 w-6 mt-1" />
          </div>
          <div className="z-10 bg-white hidden group-hover:block absolute rounded-lg shadow w-32 top-full right-0">
            <ul className="py-2 text-sm text-gray-950">
              <li className={`${COLORS["hoverdark"]}`}>
                <Link to="/ver-perfil" className="block w-full text-center px-4 ">Perfil</Link>
              </li>
              <li className={`${COLORS["hoverdark"]}`}>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 "
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
