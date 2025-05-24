import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants/styles';
import axios from 'axios';

export default function RentasAdmin() {
  const navigate = useNavigate();

  const [candidatos, setCandidatos] = useState([]);
  const[error, setError]=useState();
  const [formData, setFormData] = useState({
    seleccion: '',
    fechaInicio: '',
    fechaFin: '',
    fechaPago: '',
  });


  // Obtener candidatos desde el endpoint
        useEffect(() => {
      
          axios.get('http://localhost:4000/api/aplicaciones-aceptadas', { withCredentials: true })
            .then(response => setCandidatos(response.data))
            .catch(err => {
              console.error('Error al cargar los candidatos:', err);
              setError('Error al cargar los candidatos');
            });
        }, []);
  
  

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [Id_Estudiante, Id_Habitacion] = formData.seleccion.split(':');

      const nuevaRenta = {
        Id_Estudiante: parseInt(Id_Estudiante),
        Id_Habitacion: parseInt(Id_Habitacion),
        Fecha_Inicio: formData.fechaInicio,
        Fecha_Fin: formData.fechaFin,
        Fecha_Pago: formData.fechaPago,
      };

      const res = await axios.post('/api/rentas', nuevaRenta); // <-- Ajusta el endpoint real
      alert('✅ Renta creada con éxito');
      setFormData({
        seleccion: '',
        fechaInicio: '',
        fechaFin: '',
        fechaPago: '',
      });
    } catch (error) {
      console.error('Error al crear renta:', error);
      alert('❌ Error al crear la renta');
    }
  };

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
              value={formData.seleccion}
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
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Fin:</label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Pago:</label>
            <input
              type="date"
              name="fechaPago"
              value={formData.fechaPago}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto ($):</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
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
      </div>
    </div>
  );
}
