import { COLORS, TEXT } from "../constants/styles";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const CrearReseñaStudent = () => {
    return (
        <div className="m-8">
            <h3 className='flex mb-4 text-black'> 
            <Link to="/studentHome" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Volver a habitaciones</span>
            </Link> - 
            <span>Crear reseña</span></h3>
            <h1 className={`${TEXT["title"]} mb-4`}>Crear Reseña</h1>
            <p className={`mb-8`}>Solo puedes agregar reseñas a las habitaciones en las que te hallas hospedado.</p>
            <form className={`${COLORS["light_primary"]} p-6 rounded-lg shadow-lg flex flex-col gap-4`}>
                <div className="flex flex-col">
                    <label className='font-bold pb-4'>Habitación</label>
                    <select 
                        name="habitacion"
                        value=""
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                    >
                        <option value="">Habitación 1</option>
                        <option>
                            Habitación 2
                        </option>
                    </select>
                </div>
                <div className="flex flex-col">   
                    <label htmlFor="titulo" className="font-semibold">Título</label>
                    <input 
                        type="text" 
                        id="titulo" 
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="contenido" className="font-semibold">Contenido</label>
                    <textarea 
                        id="contenido" 
                        rows="4" 
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className='font-bold pb-4'>Puntuación</label>
                    <select 
                        name="puntuacion"
                        value=""
                        className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                    >
                        <option value="">5</option>
                        <option value="">
                            1
                        </option>
                        <option value="">
                            2
                        </option>
                        <option value="">
                            3
                        </option>
                        <option value="">
                            4
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
        </div>
    )
}

export default CrearReseñaStudent;