import React from 'react'
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import AplicacionCard from '../components/AplicacionCard';

export default function AplicacionAdmin() {
    const navigate= useNavigate();
    const aplicacionesDePrueba = [
  {
    Id_Habitacion: 101,
    Fecha_Creacion: "2023-05-15T10:30:00Z",
    Estado: "pendiente",
    Descripcion: "Estudiante responsable busca habitación tranquila cerca del campus universitario. Me adapto fácilmente a normas de convivencia.",
    Correo_Estudiante: "maria.gonzalez@email.com"
  },
  {
    Id_Habitacion: 205,
    Fecha_Creacion: "2023-05-18T14:45:00Z",
    Estado: "aprobada",
    Descripcion: "Soy estudiante de ingeniería con horarios regulares. Busco un lugar limpio y ordenado para concentrarme en mis estudios.",
    Correo_Estudiante: "carlos.martinez@email.com"
  },
  {
    Id_Habitacion: 312,
    Fecha_Creacion: "2023-05-20T09:15:00Z",
    Estado: "rechazada",
    Descripcion: "Artista en busca de espacio creativo. Trabajo desde casa pero mantengo limpieza impecable. Fumadora ocasional en áreas exteriores.",
    Correo_Estudiante: "laura.artes@email.com"
  },
  {
    Id_Habitacion: 107,
    Fecha_Creacion: "2023-05-22T16:20:00Z",
    Estado: "pendiente",
    Descripcion: "Estudiante internacional necesita alojamiento por 6 meses. Hablo español e inglés fluido. Interesado en compartir con roommates.",
    Correo_Estudiante: "john.smith@email.com"
  },
  {
    Id_Habitacion: 403,
    Fecha_Creacion: "2023-05-23T11:10:00Z",
    Estado: "pendiente",
    Descripcion: "Deportista busca habitación con buena ventilación. Me gusta mantener rutinas ordenadas y espacios organizados.",
    Correo_Estudiante: "ana.rodriguez@email.com"
  }
];
  return (
    <>
     <div className='grid text-center justify-start'>
            <button 
                      onClick={() => navigate('/studenthome')}
                      className="flex items-center mb-6 hover:text-[#01b09e] transition-all mt-8 ml-16"
                    >
                      <IoArrowBack className="mr-2" /> Volver a Habitaciones
                    </button>
            <h1 className='text-black font-bold text-4xl ml-32 mt-4'>Aplicaciones</h1>
          
        </div>
        <div className="container mx-auto p-4">
      {aplicacionesDePrueba.map((aplicacion, index) => (
        <AplicacionCard key={index} aplicacion={aplicacion} />
      ))}
    </div>
        </>
  )
}
