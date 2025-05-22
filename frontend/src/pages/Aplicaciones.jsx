import React, { useState, useEffect } from 'react'
import AplicacionStudent from '../components/AplicacionStudent'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

export default function Aplicaciones() {
    const[aplicaciones, setAplicaciones]= useState([]);
     const[error, setError]= useState();
     const navigate= useNavigate();

    // Obtener aplicaciones desde el endpoint
      useEffect(() => {
    
        axios.get('http://localhost:4000/api/obtener-aplicaciones', { withCredentials: true })
          .then(response => setAplicaciones(response.data))
          .catch(err => {
            console.error('Error al cargar las aplicaciones:', err);
            setError('Error al cargar las aplicaciones');
          });
      }, []);

      console.log(aplicaciones)
  return (
    <>
    <div className='grid text-center justify-start'>
        <button 
                  onClick={() => navigate('/studenthome')}
                  className="flex items-center mb-6 hover:text-[#01b09e] transition-all mt-8 ml-16"
                >
                  <IoArrowBack className="mr-2" /> Volver a Habitaciones
                </button>
        <h1 className='text-black font-bold text-4xl ml-32 mt-4'>Tus aplicaciones</h1>
      
    </div>
     <div className='lg:ml-24 justify-start grid mt-8 mx-4'>
        {aplicaciones.map((aplicacion)=>(
             <AplicacionStudent
             key={aplicacion.Id_Aplicacion}
             aplicacion={aplicacion}/>
        ))}
            
        </div>
    </>
  )
}
