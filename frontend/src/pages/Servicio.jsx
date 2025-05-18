import React from 'react'
import { COLORS, TEXT } from '../constants/styles'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ServicesItem from '../components/ServicesItem';


export default function Servicio() {
    const { id }= useParams();
const [formData, setFormData] = useState({
    Id_Servicio: ''
  });

  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [servicioshabitacion, setServiciosHabitacion] = useState([]);

  // Obtener servicios para el formulario de crear
  useEffect(() => {
    axios.get(`http://localhost:4000/api/servicios/${id}`)
      .then(response => setServicios(response.data))
      .catch(err => {
        console.error('Error al cargar servicios:', err);
        setError('Error al cargar los servicios');
      });
  }, []);

 // Función para refrescar los servicios de la habitación al borrar uno
  const funcionRefrescar = () => {
    axios.get(`http://localhost:4000/api/servicios-habitacion/${id}`)
      .then(response => setServiciosHabitacion(response.data))
      .catch(err => {
        console.error('Error al refrescar los servicios de la habitación:', err);
        setError('Error al refrescar los servicios de la habitación');
      });
  };

  // Obtener servicios de la habitación cuando borremos alguna
  useEffect(() => {
    funcionRefrescar();
  }, []);

  // Manejar cambios en el select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.Id_Servicio) {
      alert("Debes seleccionar un servicio.");
      return;
    }

    console.log("Servicio seleccionado:", formData.Id_Servicio);
    // Enviar los datos al backend
   axios.post(`http://localhost:4000/api/createservicio/${id}`, formData, { withCredentials: true })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setMessage('Servicio registrado exitosamente ✅');
        setError('');
        //  Limpiar el formulario
        setFormData({
          Id_Servicio: ''
        });
        funcionRefrescar();
      })
      .catch(err => {
        console.error('Error al registrar el servicio:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al registrar el servicio');
      });
    
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
          <div className={` ${COLORS["light_primary"]} p-8 mr-8 ml-8 rounded-lg w-128`}>
            <h1 className='font-bold text-2xl'>Agrega un servicio</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-full">
               <div>
              <label className="block text-sm font-semibold">Servicio</label>
              <select
            name="Id_Servicio"
            className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
            value={formData.Id_Servicio}
            onChange={handleChange}
            required
            >
           <option value="">Selecciona un servicio</option>
           {servicios.map((servicio) => (
           <option key={servicio.Id_Servicio} value={servicio.Id_Servicio}>
            {servicio.Nombre}
           </option>
           ))}
          </select>
          </div>

          <button
              type="submit"
              className={`w-full ${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-bold py-3 px-4 rounded-xl text-lg transition`}
            >
              Agregar
            </button>
          
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-400 text-sm text-center">{message}</p>}
            </form>

          </div>

          {/* Div para mostrar los servicios de la habitación*/}
           {servicioshabitacion.length === 0 ? (
         <div>
            <p className="text-center text-gray-600 mt-6">
            Esta habitación aún no tiene servicios registrados. Agrega uno para comenzar.
            </p>
         </div>
         ) : (
         <div>
         {/* Mapeo de los servicios */}
         {servicioshabitacion.map((servicio)=>(
          <ServicesItem
          key={servicio.Id_Servicio}
          servicio={servicio}
          funcionRefrescar={funcionRefrescar}
          />
         ))}
         </div>
         )}
    </>
  )
}
