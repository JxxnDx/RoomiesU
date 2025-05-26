import { COLORS, TEXT } from "../constants/styles";

const ReseñaCard = ({ reseña }) => {
  const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4">
      <h1 className={`${TEXT["title"]}`}>{reseña.Titulo}</h1>
      <p>{reseña.Descripcion}</p>
      <p><strong>Autor:</strong> {reseña.Nombre}  {reseña.Apellido}</p>
      <p><strong>Fecha:</strong> {formatearFecha(reseña.Created_at)}</p>

      <div className="flex items-center gap-2 mt-4">
        <span className="text-yellow-500">
          {
            Array.from({ length: reseña.Puntuacion }, (_, i) => (
              <span key={i}>⭐</span>
            ))
          }
        </span>
        <span className="text-gray-600">{reseña.Puntuacion}/5</span>
      </div>
    </div>
  );
};

export default ReseñaCard;
