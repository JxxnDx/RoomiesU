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

      <div className="relative flex items-center justify-center bg-white w-[80%] mx-auto my-10">
        <div className="flex justify-center">
          <img src="../layout_auth_roomiesu.webp" alt="habitacion" 
               className="w-[70%] object-cover rounded-4xl shadow-2xl"/>
        </div>
        <article className="absolute top-[30%] transform -translate-y-1/2 bg-white/75 shadow-2xl rounded-2xl p-8 w-auto text-2xl text-center">
          <h1 className="text-6xl font-bold">Bienvenido/a!</h1>
          <p className="text-gray-700 m-8">
            Encuentra la habitación perfecta para ti en RoomiesU. <br />
            Un segundo hogar para tu vida universitaria.
          </p>
        </article> 
      </div>
      

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
