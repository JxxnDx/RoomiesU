import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import Ventaja from '../components/Ventajas'

export default function Home() {

  const images = [
    "../habitacion1.jpg",
    "../habitacion2.png",
    "../habitacion3.jpg",
    "../habitacion4.jpg"
  ]

  const [index, setIndex] = useState(0);

  const prevSlide = () => setIndex((index - 1 + images.length) % images.length);
  const nextSlide = () => setIndex((index + 1) % images.length);

  return (
    <div className="bg-[url('../public/layout_auth_roomiesu.webp')] bg-cover bg-center font-montserrat text-gray-900 m-0 p-0">
      <header className="flex flex-row justify-between bg-gray-900 text-white top-0 left-0 text-justify items-center p-4 w-full">
        <h1 className="text-4xl font-bold">RoomiesU</h1>
        <nav>
          <ul className="flex gap-2 text-green-500 font-bold">
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

      {/* Bienvenida y carrusel */}
      <section className="flex flex-row w-[80%] mx-auto m-20 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <article className="text-5xl text-center w-full">
          <h1 className="text-7xl text-green-500 font-bold">Bienvenido/a!</h1>
          <p className="text-white my-8">
            Encuentra la habitación perfecta para ti en RoomiesU. <br />
            Un segundo hogar para tu vida universitaria.
          </p>
        </article>
        
        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl">
          <div className="flex transition-transform duration-500 ease-in-out hover:scale-110" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((img, i) => (
              <img key={i} src={img} className="w-full flex-shrink-0" alt={`Slide ${i}`} />
            ))}
          </div>
          {/* Botones */}
          <button onClick={prevSlide} className="absolute left-0 top-0 bottom-0 w-12 hover:bg-black/30 flex items-center justify-center transition-all">
            ◀
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-0 bottom-0 w-12 hover:bg-black/30 flex items-center justify-center transition-all">
            ▶
          </button>
        </div>
      </section>

      {/* Ventajas */}
      <section className='text-white p-10 bg-gray-900/80 backdrop-blur-md border-2 border-green-500 rounded-2xl w-[60%] mx-auto my-30'> 
        <h2 className="text-4xl font-bold text-center pb-8 text-green-500">¿Por qué RoomiesU?</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-8">
          <Ventaja titulo="Seguridad" img="../seguridad.png">
            Encuentra lugares confiables. <br /> Asegura conexión directa con tu administrador.
          </Ventaja>
          <Ventaja titulo="Comodidad" img="../comodidad.png">
            Encuentra la habitación perfecta para ti. <br /> Busca una habitación según tus necesidades.
          </Ventaja>
          <Ventaja titulo="Al momento" img="../clic.png">
            A un clic de postularte a una pensión. <br /> A un clic de publicar tu pensión.
          </Ventaja>
          <Ventaja titulo="Comunicación" img="https://cdn-icons-png.flaticon.com/512/2838/2838133.png">
            Acercamiento directo entre administrador y estudiante.
          </Ventaja>
        </div>
      </section>

      <footer className='text-center p-4 text-gray-900'>
      <p>&copy; 2025 RoomiesU</p>
      <p>Bucaramanga, Santander - Colombia</p>
      </footer>
      
    </div>
  )
}
