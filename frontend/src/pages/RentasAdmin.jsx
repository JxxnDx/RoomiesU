import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants/styles';
import axios from 'axios';
import RentaCardAdmin from '../components/RentaCardAdmin';

export default function RentasAdmin() {
 const[rentas, setRentas]= useState([]);    
  const navigate = useNavigate();
  const [reloadRentas, setReloadRentas] = useState(false);
  const [candidatos, setCandidatos] = useState([]);
  const[error, setError]=useState();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
  Id_Estudiante: 0,
  Id_Habitacion: 0,
  Fecha_inicio: '',
  Fecha_fin: '',
  Monto_Renta: 0
  });


     //  Función para recargar las aplicaciones, para que cambie después de que actualicemos el estado
  const fetchRentas = () => {
    axios
      .get('http://localhost:4000/api/rentas-admin', { withCredentials: true })
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
  
  // Obtener rentas desde el endpoint
      useEffect(() => {
    
        axios.get('http://localhost:4000/api/rentas-admin', { withCredentials: true })
          .then(response => setRentas(response.data))
          .catch(err => {
            console.error('Error al cargar las rentas:', err);
            setError('Error al cargar las rentas');
          });
      }, [reloadRentas]);

  // Manejar cambios en los inputs
 const handleChange = (e) => {
  const { name, value } = e.target;
//Debido a que tenemos dos valores a enviar en un solo campo
  if (name === 'seleccion') {
    const [estudianteId, habitacionId] = value.split(':').map(Number);
    setFormData(prev => ({
      ...prev,
      Id_Estudiante: estudianteId,
      Id_Habitacion: habitacionId,
    }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Validación básica
    if (!formData.Id_Estudiante || !formData.Id_Habitacion || !formData.Monto_Renta || !formData.Fecha_fin || !formData.Fecha_inicio) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    

    //  Aquí imprimimos los datos exactos que se van a enviar
  console.log('Datos que se enviarán al backend:', formData);
    
    // Enviar los datos al backend
    axios.post('http://localhost:4000/api/crear-renta', formData, { withCredentials: true })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setMessage('Renta registrada exitosamente ✅');
        setError('');
        setReloadRentas(prev => !prev);
        // Opcional: Limpiar el formulario
        setFormData({
          Id_Estudiante: '',
          Id_Habitacion: '',
          Fecha_inicio: '',
          Fecha_fin: '',
          Monto_Renta: ''
        });
        
      })
      .catch(err => {
        console.error('Error al registrar la renta:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al registrar la renta');
      });
  };

//Lógica para los calendarios de Fecha de Inicio
//Solo se podrá crear una renta 3 días después del día actual empezará a regir

const hoy = new Date();
hoy.setDate(hoy.getDate() + 3);
const minStartDate = hoy.toISOString().split('T')[0]; 

  return (
    <div className={`bg-white p-4 w-full my-8`}>
      <button
        onClick={() => navigate(`/habitacion`)}
        className="flex items-center mb-6 text-gray-700 hover:text-[#01b09e] transition-all duration-300 font-medium"
      >
        <IoArrowBack className="mr-2 text-lg" /> Volver a Habitaciones
      </button>

      <div>
        <h1 className="text-4xl text-black text-center font-bold mb-8">Rentas</h1>
        <p className="ml-16 text-xl mr-8">
          En esta sección podrás crear las rentas de tu unidad de vivienda. Recuerda que solo puedes generar una renta
          si hay una aplicación aceptada a un usuario. Antes de generar la renta comunícate con él para acordar los
          términos y condiciones de la renta.
        </p>
      </div>

      <div className="mt-10 mx-16">
        <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Seleccionar estudiante con aplicación aceptada:</label>
            <select
              name="seleccion"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">-- Selecciona un estudiante --</option>
              {candidatos.map((candidato,index) => (
                <option key={index} value={`${candidato.Id_Estudiante}:${candidato.Id_Habitacion}`}>
                  {candidato.Correo_Estudiante} - Habitación #{candidato.Id_Habitacion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Inicio:</label>
            <input
              type="date"
              name="Fecha_inicio"
              value={formData.Fecha_inicio}
              onChange={handleChange}
              min={minStartDate}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Fin:</label>
            <input
              type="date"
              name="Fecha_fin"
              value={formData.Fecha_fin}
              onChange={handleChange}
              min={minStartDate}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

      
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto ($):</label>
            <input
              type="number"
              name="Monto_Renta"
              value={formData.Monto_Renta}
              onChange={handleChange}
              required
              min="1000"
              step="1000"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-[#01b09e] hover:bg-[#019183] text-white font-semibold px-6 py-2 rounded transition-all duration-300"
          >
            Crear Renta
          </button>
        </form>
        {message && <p className="text-green-600 font-semibold text-center">{message}</p>}
        {error && <p className="text-red-600 font-semibold text-center">{error}</p>}
      </div>
      {/* En esta parte mostramos las rentas en curso o aceptadas */}
      <div className='grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 mt-16 border-gray-300 border-t p-4'>
        {rentas.map((renta) => (
        <RentaCardAdmin key={renta.Id_Renta} renta={renta} onEstadoActualizado={fetchRentas} setMessage={setMessage}/>
      ))}
      </div>
    </div>
  );
}
