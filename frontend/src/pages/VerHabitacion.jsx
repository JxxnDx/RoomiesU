import { NavLink } from 'react-router-dom';
import { COLORS, TEXT } from '../constants/styles';
import { FaDollarSign, FaMapMarkerAlt, FaWifi } from 'react-icons/fa';
import { MdRadioButtonChecked } from 'react-icons/md';

const VerHabitacion = () => {
    return (    
        <div className={`flex flex-col m-4 p-8`}>
            <h1 className={`${TEXT["title"]} mb-8`}>Habitación X</h1>

            <div className="flex flex-row md:flex-row gap-4 justify-between">
                <img 
                    src="" 
                    alt="Habitación" 
                    className="rounded-lg mb-4 w-full h-60 object-cover mx-auto border-2 border-white shadow-sm"
                />
                <div className={`h-60 rounded-lg shadow-lg ${COLORS["light_primary"]} p-4 flex flex-col justify-between items-start`}>
                    <div>
                        <h2 className="text-xl font-bold">Descripción</h2>
                        <p className="text-gray-700 line-clamp-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non erat nec ligula facilisis facilisis.</p>
                    </div>
                    <NavLink to="#" 
                            className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300`}>
                            Reseñas
                    </NavLink>
                </div>
            </div>
            <article className={`flex flex-col gap-4`}>
                <h2 className={`${TEXT["subtitle"]}`}>Información</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#01b09e] pt-2">
                    <div className="flex items-start gap-2">
                    <FaDollarSign className="mt-1" />
                    <div>
                        <p className="font-semibold">Precio mensual</p>
                        <p>$500.000</p>
                    </div>
                    </div>

                    <div className="flex items-start gap-2">
                    <FaWifi className="mt-1" />
                    <div>
                        <p className="font-semibold">Servicios</p>
                        <p>Wifi, Agua, Luz, Bucama, Comida</p>
                    </div>
                    </div>

                    <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="mt-1" />
                    <div>
                        <p className="font-semibold">Ubicación</p>
                        <p>Calle 54 #24-25 San Alonso, Bucaramanga</p>
                    </div>
                    </div>
                    <div className="flex items-start gap-2">
                    <MdRadioButtonChecked className="mt-1" />
                    <div>
                        <p className="font-semibold">Disponible</p>
                        <p>Disponible ahora</p>
                    </div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold mb-2">¿Te interesa esta habitación?</p>
                    <div className="flex gap-4">
                    <button className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded shadow transition duration-300`}>
                        Aplicar
                    </button>
                    <button className={`${COLORS["light_primary"]} hover:bg-[#d7f5f2] text-[#01b09e] font-semibold py-2 px-6 rounded shadow transition duration-300`}>
                        Volver
                    </button>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default VerHabitacion;