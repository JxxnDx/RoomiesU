import { COLORS } from "../constants/styles";
import ReseñaCard from "../components/ReseñaCard";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Reseña = () => {  
    return (
        <div className={`m-8`}>
            <h3 className='flex mb-4 text-black'> 
            <Link to="/studentHome" className='flex items-center hover:text-[#01b09e] transition-all'> 
            <IoArrowBack className="mr-2" /> <span>Volver a habitaciones</span>
            </Link> - 
            <span>Reseñas</span></h3>
        <h1 className="text-2xl font-bold mb-4">Reseñas</h1>
            <div className={`flex flex-col gap-4 p-4 rounded-lg shadow-lg ${COLORS["light_primary"]}`}>
                <ReseñaCard reseña=""/>
                <ReseñaCard reseña=""/>
                <ReseñaCard reseña=""/>
            </div>
        </div>
    )
}

export default Reseña;