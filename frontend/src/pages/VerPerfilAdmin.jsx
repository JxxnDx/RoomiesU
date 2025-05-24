import { COLORS } from "../constants/styles";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const VerPerfilAdmin = () => {

    // para hacer editable o no los inputs
    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async () => {
        try {
        // await axios.put('http://localhost:4000/api/actualizar-perfil', userData, {
        //     withCredentials: true
        // });
        setEditMode(false);
        } catch (error) {
        console.error('Error al guardar perfil:', error);
        }
    };

  return (
    <div className="m-8">
    <h3 className='flex mb-4 text-black'> 
      <Link to="/admindashboard" className='flex items-center hover:text-[#01b09e] transition-all'> 
      <IoArrowBack className="mr-2" /> <span>Inicio</span>
      </Link> - 
      <span>Perfil</span></h3>
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <div className={`flex flex-col gap-4 p-4 rounded-lg shadow-lg ${COLORS["light_primary"]}`}>
        <h2 className="text-xl font-bold">Información Personal</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Nombres</label>
            <input
                type="text"
                name="nombre"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="nombres"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellidos</label>
            <input
                type="text"
                name="apellido"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="apellidos"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Identificación</label>
            <input
                type="text"
                name="identificacion"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="ID"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Edad</label>
            <input
                type="text"
                name="edad"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="edad"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Correo</label>
            <input
                type="text"
                name="correo"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="correo"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Teléfono</label>
            <input
                type="text"
                name="telefono"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="telefono"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Sobre mí</label>
            <textarea
                type="text"
                name="descripcion"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value="descripcion"
                disabled={!editMode}
                //onChange={handleChange}
                //required
            />
          </div>
        </form>

        {!editMode ? (
            <button
            type="submit"
            className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded shadow transition duration-300`} 
            onClick={handleEdit}
            > Editar perfil
          </button>
        ):
        (
            <button
            type="submit"
            className={`${COLORS["light_secundary"]} ${COLORS["hoverdark"]} text-white font-semibold py-2 px-6 rounded shadow transition duration-300`} 
            onClick={handleSubmit}
            > Guardar cambios
          </button>
        )}
        
        </div>
    </div>
  );
}

export default VerPerfilAdmin;