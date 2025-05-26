import { COLORS } from "../constants/styles";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePerfilData } from "../hooks/usePerfilData";
import { useEditarPerfilForm } from "../hooks/useEditarPerfilForm";


const VerPerfil = () => {

    // para hacer editable o no los inputs
    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
      setEditMode(true);
    };
    const {
      perfil,
      setPerfil,
      loading,
      error,
      handleChange
    } = usePerfilData();

    const {
      message,
      errors,
      handleSubmit
    } = useEditarPerfilForm(perfil);

    if (loading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

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
                name="Nombre"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Nombre}
                disabled={!editMode}
                onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellidos</label>
            <input
                type="text"
                name="Apellido"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Apellido}
                disabled={!editMode}
                onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Identificación</label>
            <input
                type="text"
                name="Identificacion"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Identificacion}
                disabled={!editMode}
                onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Edad</label>
            <input
                type="text"
                name="Edad"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Edad}
                disabled={!editMode}
                onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold">Teléfono</label>
            <input
                type="text"
                name="Telefono"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Telefono}
                disabled={!editMode}
                onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Sobre mí</label>
            <textarea
                name="Descripcion"
                className="w-full p-2 mt-1 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01b09e]"
                value={perfil.Descripcion}
                disabled={!editMode}
                onChange={handleChange}
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
        {message.text && <p className="text-green-500 text-center mt-2">{message.text}</p>}
        {errors.text && <p className="text-red-500 text-center mt-2">{errors.text}</p>}
    </div>
  );
}

export default VerPerfil;