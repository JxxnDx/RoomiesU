import { COLORS } from "../constants/styles";
import { usePerfilData } from "../hooks/usePerfilData";

const InicioAdmin = () => {

  const {
      perfil
    } = usePerfilData();

  return (
    <div className={`m-8`}>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {perfil.Nombre}!</h1>
      <div className={`flex flex-col gap-4 p-4 rounded-lg shadow-lg ${COLORS["light_primary"]}`}>
        <h2 className="text-xl font-bold">Información</h2>
        <p className="text-gray-700">
          Hola! Bienvenido a RoomiesU, donde podrás encontrar la habitación perfecta para ti, o publicar una habitación que tengas disponible. <br />
          Aquí puedes encontrar información sobre el uso de la plataforma,
          incluyendo cómo navegar por las diferentes secciones, 
          los servicios que ofrecemos y cómo aplicar para una renta.
        </p>
        <iframe width="560" height="315" className="mx-auto"
                src="https://www.youtube.com/embed/BtLSaxRnIhc?si=8e9JJpYrfuh8Vutu" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen></iframe>
      </div>
    </div>
  );
}

export default InicioAdmin;