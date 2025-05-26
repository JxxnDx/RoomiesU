import React, { useState, useEffect } from 'react'
import AplicacionStudent from '../components/AplicacionStudent'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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

      // console.log(aplicaciones)
  return (
    <>
    <div className='m-8'>
        <h3 className='flex mb-4 text-black'> 
            <Link to="/studentHome" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Volver a habitaciones</span>
            </Link> - 
            <span>Mis aplicaciones</span></h3>
        <h1 className="text-2xl font-bold mb-4">Aplicaciones</h1>
      
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
