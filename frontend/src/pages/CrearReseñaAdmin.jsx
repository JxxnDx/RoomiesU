import { COLORS, TEXT } from "../constants/styles";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";

const CrearReseñaAdmin = () => {
const[error,setError]= useState('');
const[message, setMessage]= useState('');
const[estudiantes, setEstudiantes]= useState([]);
const [formData, setFormData] = useState({
    Titulo: '',
    Descripcion: '',
    Id_Estudiante: '',
    Puntuacion: ''
  });



     // Obtener estudiantes habilitados desde el endpoint
  useEffect(() => {

    axios.get('http://localhost:4000/api/estudiantes-resenar-admin',{withCredentials: true})
      .then(response => setEstudiantes(response.data))
      .catch(err => {
        console.error('Error al cargar los estudiantes:', err);
        setError('Error al cargar los estudiantes');
      });
  }, []);


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Validación básica
    if (!formData.Titulo || !formData.Descripcion || !formData.Id_Estudiante || !formData.Puntuacion) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    
   
    //  Aquí imprimimos los datos exactos que se van a enviar
  console.log('Datos que se enviarán al backend:', formData);
    
    // Enviar los datos al backend
    axios.post('http://localhost:4000/api/crear-resena-deestudiante', formData, { withCredentials: true })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setMessage('Reseña creada exitosamente ✅');
        setError('');
        // Opcional: Limpiar el formulario
        setFormData({
          Titulo: '',
          Descripcion: '',
          Puntuacion: '',
          Id_Estudiante: ''
        });
        
      })
      .catch(err => {
        console.error('Error al crear la reseña:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al crear la reseña la unidad');
      });
  };

    return (
        <div className="m-8">
            <h3 className='flex mb-4 text-black'> 
            <Link to="/studentHome" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Volver a habitaciones</span>
            </Link> - 
            <span>Crear reseña</span></h3>
            <h1 className={`${TEXT["title"]} mb-4`}>Crear Reseña</h1>
            <p className={`mb-8`}>Solo puedes agregar reseñas de estudiantes que se hayan hospedado en tus habitaciones.</p>
            <form
            onSubmit={handleSubmit} 
            className={`${COLORS["light_primary"]} p-6 rounded-lg shadow-lg flex flex-col gap-4`}>
                <div className="flex flex-col">
                    <label className='font-bold pb-4'>Estudiante</label>
                    <select 
                        name="Id_Estudiante"
                        value={formData.Id_Estudiante}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                    >
                        <option value="">Selecciona un estudiante</option>
                         {estudiantes.map((estudiante) => (
                        <option key={estudiante.Id_Estudiante} value={estudiante.Id_Estudiante}>
                        {estudiante.Correo}-{estudiante.Id_Estudiante}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">   
                    <label  className="font-semibold">Título</label>
                    <input 
                        type="text" 
                        name="Titulo" 
                        value={formData.Titulo}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label  className="font-semibold">Contenido</label>
                    <textarea 
                        name="Descripcion" 
                        rows="4" 
                        value={formData.Descripcion}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className='font-bold pb-4'>Puntuación</label>
                    <select 
                        name="Puntuacion"
                        value={formData.Puntuacion}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                    >
                        <option value="">Selecciona uno</option>
                        <option value={1}>
                            1
                        </option>
                        <option value={2}>
                            2
                        </option>
                        <option value={3}>
                            3
                        </option>
                        <option value={4}>
                            4
                        </option>
                        <option value={5}>
                            5
                        </option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300`}
                >
                    Publicar Reseña
                </button>

            </form>
            {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
            {message && <p className="text-green-600 font-medium mb-4">{message}</p>}
        </div>
    )
}

export default CrearReseñaAdmin;