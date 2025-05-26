import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReseñaCard from '../components/ReseñaCard'; // Asegúrate de tener este componente

const VerReseñasHabitacion = () => {
  const { id } = useParams(); 
  const [reseñas, setReseñas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/resenas-habitacion/${id}`, { withCredentials: true })
      .then(response => {
        setReseñas(response.data);
        setError('');
      })
      .catch(err => {
        console.error('Error al obtener reseñas:', err);
        setError('No se pudieron cargar las reseñas.');
      });
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Reseñas</h1>

      {error && <p className="text-red-500">{error}</p>}

      {reseñas.length === 0 && !error ? (
        <p>Por ahora no tiene reseñas.</p>
      ) : (
        <div className="grid gap-4">
          {reseñas.map((reseña) => (
            <ReseñaCard key={reseña.Id_Reseña_Habitacion} reseña={reseña} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerReseñasHabitacion;
