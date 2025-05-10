import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack, IoCheckmarkDone } from "react-icons/io5";
import { COLORS, TEXT } from '../constants/styles';

export default function EditarHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState({
    Id_Habitacion: '',
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Admin: '',
    Id_Unidad: '',
    Img_url: '',
    estado: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sectores, setSectores] = useState([]);

  // Cargamos los sectores
  useEffect(() => {
    axios.get('http://localhost:4000/api/sectores', { withCredentials: true })
      .then(response => {
        setSectores(response.data);
      })
      .catch(err => {
        console.error('Error al cargar sectores:', err);
        setError('Error al cargar los sectores');
      });
  }, []);

  // Cargar datos de la unidad
  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/habitacion/${id}`, { 
          withCredentials: true 
        });
        console.log('Datos recibidos:', response.data); // Para depuración
        setHabitacion(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar la habitación:', err);
        setError('Error al cargar los datos de la habitación');
        setLoading(false);
      }
    };

    fetchUnidad();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnidad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Enviando datos:', unidad); // Para depuración
      const response = await axios.put(
        `http://localhost:4000/api/editarhabitacion/${id}`,
        unidad,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Respuesta del servidor:', response); // Para depuración
      
      if (response.status === 200) {
        setSuccess('Habitación actualizada correctamente');
        setTimeout(() => {
          navigate('/habitación');
        }, 2000);
      }
    } catch (err) {
      console.error('Error al actualizar la habitación:', err);
      if (err.response) {
        console.error('Detalles del error:', err.response.data);
        setError(err.response.data.message || 'Error al actualizar la habitación');
      } else {
        setError('Error de conexión con el servidor');
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex h-screen items-center justify-center bg-gray-900`}>
        <p className="text-white text-lg">Cargando datos de la unidad...</p>
      </div>
    );
  }
  return (
    <>
    <h3 className='flex ml-32 m-4 text-black'> 
      <Link to="/habitacion" className='flex items-center hover:text-[#01b09e] transition-all'> 
      <IoArrowBack className="mr-2" /> <span>Habitaciones </span>
      </Link> - 
      <span> Crear Habitación</span></h3>
    <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-md  ${COLORS["light_primary"]} border border-gray-200 mb-10`}>
      <h2 className="text-2xl font-bold mb-4 text-black ">Crear Nueva Habitación</h2>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md flex items-start ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
        }`}>
          {message.type === 'error' ? (
            <IoAlertCircle className="mt-1 mr-2 flex-shrink-0" size={20} />
          ) : (
            <IoInformationCircle className="mt-1 mr-2 flex-shrink-0" size={20} />
          )}
          <span>{message.text}</span>
        </div>
      )}
      
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black">
              Precio (mensual)
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                name="Precio"
                value={formData.Precio}
                onChange={handleChange}
                className={`bg-white mt-1 block w-full pl-7 rounded-md shadow-sm p-2 border ${
                  errors.Precio ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]'
                }`}
                placeholder="300"
                min="1"
                step="1"
                required
              />
            </div>
            {errors.Precio && (
              <p className="mt-1 text-sm text-red-600">{errors.Precio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-black mb-1">
              Unidad de Vivienda
              <span className="text-red-500">*</span>
            </label>
            <select
              name="Id_Unidad"
              value={formData.Id_Unidad}
              onChange={handleChange}
              className={`bg-white mt-1 block w-full rounded-md shadow-sm p-2 border ${
                errors.Id_Unidad ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]'
              }`}
              disabled={isLoadingUnits}
              required
            >
              <option value="">Selecciona una unidad</option>
              {units.map(unit => (
                <option key={unit.Id_Unidad} value={unit.Id_Unidad}>
                  {unit.Nombre} - {unit.Tipo} ({unit.Direccion})
                </option>
              ))}
            </select>
            {errors.Id_Unidad && (
              <p className="mt-1 text-sm text-red-600">{errors.Id_Unidad}</p>
            )}
            {isLoadingUnits && (
              <p className="mt-1 text-sm text-gray-500">Cargando unidades...</p>
            )}
          </div>
          <div >
            <label className="block text-sm font-medium text-black dark:text-black mb-1">
              Estado
              <span className="text-red-500">*</span>
            </label>
            <select
              name="estado"
              className={`bg-white w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]`}
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione uno</option>
              <option value="habilitado">Habilitado</option>
              <option value="deshabilitado">Deshabilitado</option>
              <option value="ocupado">Ocupado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-black mb-1">
            Descripción
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            rows={4}
            className={`bg-white mt-1 block w-full rounded-md shadow-sm p-2 border ${
              errors.Descripcion ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]'
            }`}
            placeholder="Describe la habitación, incluyendo mobiliario, comodidades, etc."
            required
          />
          {errors.Descripcion && (
            <p className="mt-1 text-sm text-red-600">{errors.Descripcion}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Mínimo 20 caracteres. Actual: {formData.Descripcion.length}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-black mb-1">
            Requisitos para alquilar
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="Requisitos"
            value={formData.Requisitos}
            onChange={handleChange}
            rows={4}
            className={`bg-white mt-1 block w-full rounded-md shadow-sm p-2 border ${
              errors.Requisitos ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]'
            }`}
            placeholder="Indica los requisitos para los interesados (ej: contrato, garantía, etc.)"
            required
          />
          {errors.Requisitos && (
            <p className="mt-1 text-sm text-red-600">{errors.Requisitos}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Mínimo 10 caracteres. Actual: {formData.Requisitos.length}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-black mb-1">
            Imagen Principal
            <span className="text-red-500">*</span>
          </label>
          
          <div className={`bg-white mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            errors.image ? 'border-red-300' : 'border-gray-300'
          }`}>
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                  </div>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#01b09e] hover:text-[#018ab0] focus-within:outline-none">
                      <span>Sube una imagen</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">o arrástrala aquí</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                </>
              )}
            </div>
          </div>
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        <div className="pt-4">
        <button
  type="submit"
  disabled={isSubmitting || isLoadingUnits || isLoadingAdmin}
  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg font-semibold text-white ${COLORS["light_secundary"]} ${COLORS["hoverdark"]} focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ${
    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
  }`}
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Procesando...
    </>
  ) : (
    'Crear Habitación'
  )}
</button>
        </div>
      </form>
    </div>
    </>
  );
};

