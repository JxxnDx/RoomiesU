import React from 'react'
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="font-montserrat text-gray-900">
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white fixed w-full top-0 shadow-md">
        <h1 className="text-4xl font-bold">RoomiesU</h1>
        <nav>
          <ul className="flex gap-8 text-green-600 font-bold">
            <li>
              <Link to="#" className="links-header">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="#" className="links-header">
                Habitaciones
              </Link>
            </li>
            <li>
              <Link to="#" className="links-header">
                Experiencias
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex gap-2 text-green-600 font-bold">
            <li>
              <Link to="#" className="links-auth">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="#" className="links-auth">
                Registrarse
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* <section className="text-center p-8 flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold">Bienvenido/a!</h1>
        <p className="text-lg text-gray-700">
          Encuentra la habitación perfecta para ti en RoomiesU.
        </p>
      </section> */}
      
    </div>
  )
}
