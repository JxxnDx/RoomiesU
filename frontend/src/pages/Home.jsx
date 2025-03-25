import React from 'react'
import { Link } from "react-router-dom"
import Ventaja from '../components/ventajas'

export default function Home() {

  return (
    <div className="font-montserrat text-gray-900 m-0 p-0">
      <header className="flex flex-row justify-between bg-gray-900 text-white top-0 left-0 text-justify items-center p-4 w-full">
        <h1 className="text-4xl font-bold">RoomiesU</h1>
        <nav>
          <ul className="flex gap-2 text-green-600 font-bold">
            <li>
              <Link to="/login" className="px-2 py-2 hover:text-white transition-all">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className="px-2 py-2 hover:text-white transition-all">
                Registrarse
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <article className="text-5xl mx-auto my-0 text-center w-[60%] pt-20">
        <h1 className="text-7xl font-bold">Bienvenido/a!</h1>
        <p className="text-gray-700 m-8">
          Encuentra la habitación perfecta para ti en RoomiesU. <br />
          Un segundo hogar para tu vida universitaria.
        </p>
      </article>

      <section className='p-10 border-2 border-green-600 rounded-2xl w-[60%] mx-auto my-20'> 
        <h2 className="text-4xl font-bold text-center pb-8">¿Por qué RoomiesU?</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-8">
          <Ventaja titulo="Seguridad" img="../seguridad.png">
            Encuentra la habitación perfecta para ti. <br /> Todas nuestras habitaciones están amuebladas.
          </Ventaja>
          <Ventaja titulo="Comodidad" img="../comodidad.png">
            Encuentra la habitación perfecta para ti. <br /> Puedes buscar una habitación según tus necesidades.
          </Ventaja>
          <Ventaja titulo="Al momento" img="../clic.png">
            A un clic de postularte a una pensión. <br /> A un clic de publicar tu pensión.
          </Ventaja>
          <Ventaja titulo="Comunicación" img="https://cdn-icons-png.flaticon.com/512/2838/2838133.png">
            Acercamiento directo entre administrador y estudiante.
          </Ventaja>
        </div>
      </section>

      <footer className='text-center p-4 text-gray-400'>
      <p>&copy; 2025 RoomiesU</p>
      <p>Bucaramanga, Santander - Colombia</p>
      </footer>
      
    </div>
  )
}
