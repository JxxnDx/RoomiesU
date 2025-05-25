import { COLORS, TEXT } from "../constants/styles";

const ReseñaCard = ({ reseña }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4">
      <h1 className={`${TEXT["title"]}`}>Reseña</h1>
      <p>Contenido de la reseña</p>
      <p><strong>Autor:</strong>Autor</p>
      <p><strong>Fecha:</strong>Fecha</p>
        <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600">5/5</span>
        </div>
    </div>
  );
}

export default ReseñaCard;