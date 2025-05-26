import React,{useEffect, useState} from 'react'
import { COLORS, TEXT } from '../constants/styles';
import { MdBedroomParent } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMegaphoneLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import axios from 'axios';


 
export default function Admindashboard() {
   
   const fakeData = [
  { mes: 'Enero', ganancia: 5400 },
  { mes: 'Febrero', ganancia: 4800 },
  { mes: 'Marzo', ganancia: 6100 },
  { mes: 'Abril', ganancia: 5300 },
  { mes: 'Mayo', ganancia: 6700 },
  { mes: 'Junio', ganancia: 7200 },
];

const [data, setData] = useState(fakeData);
const [estadisticas, setEstadisticas]= useState({
        "Total_Habitaciones": 0,
        "Habitaciones_Disponibles": 0,
        "Habitaciones_Ocupadas": 0,
        "Aplicaciones_Pendientes": 0
});
const [error, setError]= useState();

  // useEffect(() => {
  //   // Reemplaza esta URL con la del backend Node.js
  //   fetch('http://localhost:3000/api/ganancias-mensuales')
  //     .then(res => res.json())
  //     .then(json => setData(json))
  //     .catch(err => console.error('Error cargando ganancias:', err));
  // }, []);

  // Obtener estadisticas desde el endpoint
  useEffect(() => {
    axios.get('http://localhost:4000/api/estadisticas',{withCredentials:true})
      .then(response => setEstadisticas(response.data[0]))
      .catch(err => {
        console.error('Error al cargar las estadisticas:', err);
        setError('Error al cargar las estadisticas');
      });
  }, []);

  const { Total_Habitaciones, Habitaciones_Disponibles, Habitaciones_Ocupadas, Aplicaciones_Pendientes} = estadisticas;
  if (!estadisticas ) {
  return <p>Cargando estadísticas...</p>;
}

// console.log(estadisticas);
  return (
    <>
    <div className={`text-black h-full flex flex-col m-8`}>
      <h1 className={`${TEXT["title"]}`}>Resumen</h1>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8'>
      <div className={`${COLORS["light_primary"]} flex flex-col drop-shadow-lg h-full rounded-lg p-4 items-center md:items-start transition-all duration-300 hover:scale-[1.02] justify-between`}>
  <Link to="/habitacion" className="px-3">
    <MdBedroomParent className={`${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`} />
  </Link>
  <h1 className='font-bold text-xl'>Habitaciones Totales</h1>
  <h2 className='font-semibold text-6xl'>{Total_Habitaciones}</h2>
  <p className='text-left'> {Total_Habitaciones} unidades de vivienda</p>
</div>
      <div className={`${COLORS["light_primary"]} flex flex-col shadow-lg h-full rounded-lg p-4 items-center md:items-start transition-all duration-300 hover:scale-[1.02] justify-between`}>
        <Link to="/habitacion" className="px-3">
        <CiCircleCheck  className={` ${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-xl'>Habitaciones Disponibles</h1>
         <h2 className='font-semibold text-6xl'>{Habitaciones_Disponibles}</h2>
         <p className='text-left '> {Habitaciones_Disponibles} listas para arrendar</p>
         </div>
      <div className={`${COLORS["light_primary"]} flex flex-col shadow-lg h-full rounded-lg p-4  items-center md:items-start transition-all duration-300 hover:scale-[1.02] justify-between`}>
        <Link to="/habitacion" className="px-3">
        <FaRegUserCircle  className={`${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-lg'>Habitaciones Ocupadas</h1>
         <h2 className='font-semibold text-6xl'>{Habitaciones_Ocupadas}</h2>
         <p className='text-left'> Más de {Habitaciones_Ocupadas} inquilinos</p></div>
      <div className={`${COLORS["light_primary"]} flex flex-col shadow-lg h-full rounded-lg p-4  items-center md:items-start transition-all duration-300 hover:scale-[1.02] justify-between`}>
        <Link to="/admindashboard" className="px-3">
        <RiMegaphoneLine  className={`${COLORS["light_secundary"]} text-4xl rounded-2xl p-2 mb-2`}/>
        </Link>
         <h1 className='font-bold text-xl'>Solicitudes</h1>
         <h2 className='font-semibold text-6xl'>{Aplicaciones_Pendientes}</h2>
         <p className=' text-left'> En menos de {Aplicaciones_Pendientes} días</p>
        </div>
    </div>

    {/* Mapa de Bucaramanga */}
<div className={`${COLORS["light_primary"]} rounded-lg mx-8 p-6 mb-8 shadow-lg`}>
  <h2 className='text-xl font-bold mb-4'>Ubicación - Bucaramanga</h2>
  <div className='w-full h-[400px]'>
    <iframe
      title="Mapa Bucaramanga"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63345.05199050285!2d-73.17426378488348!3d7.118379420936341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157af751c0ed%3A0x75a0e4551148c36c!2sBucaramanga%2C%20Santander!5e0!3m2!1ses!2sco!4v1748275517829!5m2!1ses!2sco"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
    
    </>
  )
}
