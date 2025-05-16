import React from 'react'
import { COLORS, TEXT } from '../constants/styles'
import { useState } from 'react';

export default function Servicio() {

    const[servicios, setServicios]= useState([]);

     // Obtener servicios
  useEffect(() => {

    axios.get('http://localhost:4000/api/sectores')
      .then(response => setSectores(response.data))
      .catch(err => {
        console.error('Error al cargar sectores:', err);
        setError('Error al cargar los sectores');
      });
  }, []);

    const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    
  };
  return (
    <>
    {/* Header con título y descripción */}
          <div className='p-8'>
            <h1 className={`${TEXT["title"]} mb-4 flex justify-center text-4xl`}>Servicios</h1>
            <div >
              <p className='text-lg'>
                Agrega los servicios que vas a ofrecer en tus habitaciones para que tus futuros huéspedes se sientan cómodos en su instancia
              </p>
            </div>
          </div>

          
          {/* Div para agregar servicios */}
          <div className=''>
            <h1>Agrega un servicio</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-full">

            </form>

          </div>

          {/* Div para mostrar los servicios de la habitación*/}
          <div>

          </div>
    </>
  )
}
