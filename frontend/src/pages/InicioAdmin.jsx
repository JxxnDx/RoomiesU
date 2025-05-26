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
      <div className={`${COLORS["light_primary"]} rounded-lg p-6 m-8 shadow-lg`}>
        <h2 className='text-xl font-bold mb-4'>Ubicación - Bucaramanga</h2>
        <div className='w-full h-[400px]'>
          <iframe
            title="Mapa Bucaramanga"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63345.05199050285!2d-73.17426378488348!3d7.118379420936341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157af751c0ed%3A0x75a0e4551148c36c!2sBucaramanga%2C%20Santander!5e0!3m2!1ses!2sco!4v1748275517829!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default InicioAdmin;