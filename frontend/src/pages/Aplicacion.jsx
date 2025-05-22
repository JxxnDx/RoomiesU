import React,{useState} from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom';
import { COLORS } from '../constants/styles';
import axios from 'axios';

export default function Aplicacion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Descripcion: ''
      });
    
      
      const [error, setError] = useState();
      const [message, setMessage] = useState();
     
    
     
      // Manejar cambios en el select
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      // Manejar envío del formulario
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.Descripcion) {
          setError("Debes escibir algo en la descripción");
          return;
        }
    
        // Enviar los datos al backend
       axios.post(`http://localhost:4000/api/createaplicacion/${id}`, formData, { withCredentials: true })
          .then(response => {
            console.log('Respuesta del servidor:', response.data);
            setMessage('Aplicación creada exitosamente ✅');
            setError('');
            //  Limpiar el formulario
            setFormData({
              Descripcion: ''
            });
           
          })
          .catch(err => {
            console.error('Error al registrar la aplicación:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error al registrar la aplicación');
          });
        
      };
    
    return (
        <div className={`${COLORS["light_primary"]} border border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-8`}>
            <button 
                onClick={() => navigate(`/ver-habitacion/${id}`)}
                className="flex items-center mb-6 text-gray-700 hover:text-[#01b09e] transition-all duration-300 font-medium"
            >
                <IoArrowBack className="mr-2 text-lg" /> Volver a Habitación
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Aplicación</h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
                Al llenar esta aplicación se le informará al arrendatario de tu interés en el espacio. 
                Pon dentro del recuadro de descripción información que creas importante que él deba 
                saber sobre ti como futuro inquilino.
            </p>
            
            <div className='w-full bg-white rounded-lg p-6 shadow-sm'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-md font-medium mb-3">Descripción</label>
                        <textarea
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01b09e] focus:border-transparent transition-all duration-200'
                            name='Descripcion'
                            rows="5"
                            placeholder="Describe tu perfil, hábitos, por qué serías un buen inquilino..."
                            required
                            value={formData.Descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full ${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-bold py-3 px-4 rounded-xl text-lg transition hover:scale-[1.02] transform duration-200 shadow-md`}
                    >
                        Aplicar
                    </button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-400 text-sm text-center">{message}</p>}
                </form>
            </div>
        </div>
    )
}