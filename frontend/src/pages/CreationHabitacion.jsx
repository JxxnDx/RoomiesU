import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCloudUpload, IoInformationCircle, IoAlertCircle } from "react-icons/io5";

const CreacionHabitacion = () => {
 // Estado inicial sin adminId en los props
 const [formData, setFormData] = useState({
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Admin: '', // Ahora se obtendrá del endpoint
    Id_Unidad: ''
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUnits, setIsLoadingUnits] = useState(true);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [units, setUnits] = useState([]);
  const [errors, setErrors] = useState({
    Precio: '',
    Descripcion: '',
    Requisitos: '',
    Id_Unidad: '',
    image: '',
    Id_Admin: ''
  });

  // Cargar ID de administrador desde el token
  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", { 
          withCredentials: true 
        });
        
        const userId = response.data.user.id || response.data.user._id || response.data.user.userId;
        
        if (userId) {
          setFormData(prev => ({ ...prev, Id_Admin: userId }));
        } else {
          console.warn('No se pudo identificar el ID del usuario en:', response.data.user);
          setMessage({
            text: 'No se pudo identificar al administrador',
            type: 'error'
          });
        }
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        setMessage({
          text: 'Error de autenticación. Por favor, inicia sesión nuevamente.',
          type: 'error'
        });
        setErrors(prev => ({ ...prev, Id_Admin: 'Error al obtener ID de administrador' }));
      } finally {
        setIsLoadingAdmin(false);
      }
    };
    
    fetchAdminId();
  }, []);

  // Cargar unidades disponibles (solo cuando ya tenemos el adminId)
  useEffect(() => {
    if (!formData.Id_Admin) return; // Esperar hasta tener el adminId
    
    const fetchUnits = async () => {
      setIsLoadingUnits(true);
      try {
        const response = await axios.get('http://localhost:4000/api/unidades', {
          params: { adminId: formData.Id_Admin },
          withCredentials: true
        });
        setUnits(response.data);
      } catch (error) {
        setMessage({
          text: 'Error al cargar las unidades: ' + (error.response?.data?.message || error.message),
          type: 'error'
        });
      } finally {
        setIsLoadingUnits(false);
      }
    };
    
    fetchUnits();
  }, [formData.Id_Admin]);

  // Previsualización de imagen
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error al modificar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validar tipo de archivo
    if (!selectedFile.type.match('image.*')) {
      setErrors({ ...errors, image: 'Por favor, sube solo archivos de imagen' });
      return;
    }
    
    // Validar tamaño (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: 'La imagen no debe exceder los 5MB' });
      return;
    }
    
    setFile(selectedFile);
    setErrors({ ...errors, image: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.Precio || formData.Precio <= 0) {
      newErrors.Precio = 'El precio debe ser mayor a 0';
      isValid = false;
    }

    if (!formData.Descripcion || formData.Descripcion.length < 20) {
      newErrors.Descripcion = 'La descripción debe tener al menos 20 caracteres';
      isValid = false;
    }

    if (!formData.Requisitos || formData.Requisitos.length < 10) {
      newErrors.Requisitos = 'Los requisitos deben tener al menos 10 caracteres';
      isValid = false;
    }

    if (!formData.Id_Unidad) {
      newErrors.Id_Unidad = 'Debes seleccionar una unidad';
      isValid = false;
    }

    if (!formData.Id_Admin) {
      newErrors.Id_Admin = 'No se pudo identificar al administrador';
      isValid = false;
    }

    if (!file) {
      newErrors.image = 'Debes subir una imagen';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('image', file);

    try {
      const response = await axios.post('http://localhost:4000/api/createhabitacion', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      setMessage({
        text: `Habitación creada con éxito! ID: ${response.data.roomId}`,
        type: 'success'
      });
      
      // Resetear formulario (excepto Id_Admin)
      setFormData(prev => ({
        Precio: '',
        Descripcion: '',
        Requisitos: '',
        Id_Admin: prev.Id_Admin, // Mantenemos el mismo admin
        Id_Unidad: ''
      }));
      setFile(null);
    } catch (error) {
      setMessage({
        text: 'Error: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

   // Mostrar error si no se pudo obtener el adminId
   if (errors.Id_Admin) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex items-center">
            <IoAlertCircle className="mr-2" size={20} />
            <p>{errors.Id_Admin}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Crear Nueva Habitación</h2>
      
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                className={`mt-1 block w-full pl-7 rounded-md shadow-sm p-2 border ${
                  errors.Precio ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Unidad de Vivienda
              <span className="text-red-500">*</span>
            </label>
            <select
              name="Id_Unidad"
              value={formData.Id_Unidad}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${
                errors.Id_Unidad ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${
              errors.Descripcion ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Requisitos para alquilar
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="Requisitos"
            value={formData.Requisitos}
            onChange={handleChange}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${
              errors.Requisitos ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Imagen Principal
            <span className="text-red-500">*</span>
          </label>
          
          <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
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
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
            disabled={isLoading || isLoadingUnits}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
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
  );
};

export default CreacionHabitacion;