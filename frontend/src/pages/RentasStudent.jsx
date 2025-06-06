import React,{useState, useEffect} from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import RentaCardStudent from '../components/RentaCardStudents';
import { COLORS } from '../constants/styles';
import axios from 'axios';

export default function RentasStudent() {

    const[rentas, setRentas]= useState([]); 
    const[error, setError]=useState('');
    const [message, setMessage] = useState('');  
    const navigate= useNavigate();

        //  Función para recargar las rentas, para que cambie después de que actualicemos el estado
  const fetchRentas = () => {
    axios
      .get('http://localhost:4000/api/rentas-estudiante', { withCredentials: true })
      .then(response => setRentas(response.data))
      .catch(err => {
        console.error('Error al cargar las rentas:', err);
        setError('Error al cargar las rentas');
      });
  };

  // Carga al iniciar
  useEffect(() => {
    fetchRentas();
  }, []);

  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(''), 4000);
    return () => clearTimeout(timer);
  }
}, [message]);
  
  return (
    <>
    <div className={`w-full m-8`}>
          <h3 className='flex mb-4 text-black'> 
            <Link to="/studentHome" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Volver a habitaciones</span>
            </Link> - 
            <span>Mis rentas</span></h3>
          <h1 className="text-2xl font-bold mb-4">Mis rentas</h1>
          <div className={`${COLORS["light_primary"]} rounded-2xl shadow-md p-6 mx-8 mb-10 border border-gray-200`}>
            <p className="text-lg text-gray-700 mb-4">
            En esta sección podrás ver las rentas asociadas a tu cuenta. Recuerda que los administradores son quienes generan las rentas, 
            pero estas deben estar consensuadas contigo antes de iniciar. Si alguna renta fue creada sin tu consentimiento, puedes cancelarla. 
            </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
         <li><strong>Visita el lugar</strong> antes de arrendar una habitación.</li>
         <li><strong>Contacta al administrador</strong> para definir los términos y condiciones del acuerdo.</li>
         <li><strong>Tienes 3 días</strong> para aceptar o cancelar una renta una vez ha sido creada.</li>
         </ul>
         {message && <p className="text-green-600 font-semibold text-center mt-8">{message}</p>}
         {error && <p className="text-red-600 font-semibold text-center mt-8">{error}</p>}
         </div>
         
         {/* Aquí mostramos las rentas disponibles*/}
         <div className='grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 mt-16 border-gray-300 border-t p-4'>
                 {rentas.map((renta) => (
                 <RentaCardStudent key={renta.Id_Renta} renta={renta} onEstadoActualizado={fetchRentas} setMessage={setMessage}/>
               ))}
               </div>
          </div>
        </>
  )
}
