import { Link, useParams, useNavigate } from 'react-router-dom';
import { COLORS, TEXT } from '../constants/styles';
import { FaDollarSign, FaMapMarkerAlt, FaWifi } from 'react-icons/fa';
import { MdRadioButtonChecked } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VerHabitacion = () => {

//Necesito llamar el endpoint de la información de la habitación y de los servicios según el id
const { id }= useParams();
const navigate = useNavigate();

 const [servicios, setServicios] = useState([]);
 const [habitacion, setHabitacion]= useState({
    Id_Habitacion: '',
  Precio: 0,
  Descripcion: '',
  Requisitos: '',
  Id_Admin: '',
  Id_Unidad: '',
  Img_url: '',
  estado: '',
  Direccion: ''
 });
 const [Error, setError] = useState();


   //Llamando la información de la habitación según el id 
  useEffect(() => {
  axios.get(`http://localhost:4000/api/informacion-habitacion/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.length > 0) {
        setHabitacion(response.data[0]);
      } else {
        setError('Habitación no encontrada');
      }
    })
    .catch(err => {
      console.error('Error al cargar la información de la habitación:', err);
      setError('Error al cargar la habitación');
    });
}, [id]);


   //Llamando los servicios para una habitación especifica
  useEffect(() => {
    axios.get(`http://localhost:4000/api/servicios-habitacion/${id}`)
      .then(response => setServicios(response.data))
      .catch(err => {
        console.error('Error al cargar servicios:', err);
        setError('Error al cargar los servicios');
      });
  }, [id]);

  const { Id_Habitacion,Precio,Descripcion, Requisitos, Img_url, estado, Direccion} = habitacion;
  if (!habitacion || !habitacion.Id_Habitacion) {
  return <p>Cargando habitación...</p>;
}

    return (    
        <div className={`flex flex-col m-8`}>
            <h1 className={`${TEXT["title"]} mb-8`}>Habitación {Id_Habitacion}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-8 gap-4 w-auto">
                <img 
                    src={Img_url} 
                    alt="Habitación" 
                    className="rounded-lg mb-4 w-120 h-60 object-cover border-2 border-white shadow-sm"
                />
                <div className={`h-60 w-3/10 rounded-lg shadow-lg ${COLORS["light_primary"]} p-4 flex flex-col justify-between w-[80%] items-start`}>
                    <div>
                        <h2 className="text-xl font-bold">Descripción</h2>
                        <p className="text-gray-700 line-clamp-3">{Descripcion}</p>
                    </div>
                    <Link to="/reseñas" 
                            className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300`}>
                            Reseñas
                    </Link>
                </div>
            </div>

            <article className={`flex flex-col gap-4`}>
                <h2 className={`${TEXT["subtitle"]}`}>Información</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black pt-2">
                    <div className="flex items-start gap-2">
                    <FaDollarSign className="mt-1 text-green-500" />
                    <div>
                        <p className="font-semibold">Precio mensual</p>
                        <p>${Precio}</p>
                    </div>
                    </div>

                    <div className="flex items-start gap-2">
                    <FaWifi className="mt-1" />
                    <div>
                        <p className="font-semibold">Servicios</p>
                       {servicios.map((servicio) => (
                       <p key={servicio.Id_Servicio}>{servicio.Nombre}</p>
                        ))}
                    </div>
                    </div>

                    <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="mt-1" />
                    <div>
                        <p className="font-semibold">Ubicación</p>
                        <p>{Direccion}</p>
                    </div>
                    </div>
                    <div className="flex items-start gap-2">
                    <MdRadioButtonChecked className="mt-1" />
                    <div>
                        <p className="font-semibold">Estado</p>
                        <p>{estado}</p>
                    </div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold mb-2">¿Te interesa esta habitación?</p>
                    <div className="flex gap-4">
                    <button 
                    onClick={() => navigate(`/aplicacion/${Id_Habitacion}`)}
                    className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded shadow transition duration-300`}>
                        Aplicar
                    </button>
                    <button 
                    onClick={() => navigate('/studenthome')}
                    className={`${COLORS["light_primary"]} hover:bg-[#d7f5f2] text-[#01b09e] font-semibold py-2 px-6 rounded shadow transition duration-300`}>
                        Volver
                    </button>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default VerHabitacion;