import React,{useEffect, useState} from 'react'
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom'
import AplicacionCard from '../components/AplicacionCard';
import axios from 'axios';
import { TEXT } from '../constants/styles';

export default function AplicacionAdmin() {
    const navigate= useNavigate();
    const[aplicaciones, setAplicaciones]= useState([]);
    const[error, setError]= useState();
    const[message, setMessage]= useState();

     //  Función para recargar las aplicaciones, para que cambie después de que actualicemos el estado
  const fetchAplicaciones = () => {
    axios
      .get('http://localhost:4000/api/obtener-aplicaciones/admin', { withCredentials: true })
      .then(response => setAplicaciones(response.data))
      .catch(err => {
        console.error('Error al cargar las aplicaciones:', err);
        setError('Error al cargar las aplicaciones');
      });
  };

  // Carga al iniciar
  useEffect(() => {
    fetchAplicaciones();
  }, []);
 
  return (
    <>
     <div className='m-8'>
            <h3 className='flex mb-4 text-black'> 
            <Link to="/admindashboard" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Dashboard</span>
            </Link> - 
            <span>Aplicaciones</span></h3>
            <h1 className={`${TEXT["title"]}`}>Aplicaciones</h1>
          
        </div>
        <div className="container mx-auto p-4">
      {aplicaciones.map((aplicacion)=>(
                   <AplicacionCard
                   key={aplicacion.Id_Aplicacion}
                   aplicacion={aplicacion}
                   onEstadoActualizado={fetchAplicaciones}
                   setMessage={setMessage}/>
              ))}
    </div>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        </>
  )
}
