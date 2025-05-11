import React, { useState } from 'react';
import { COLORS } from '../constants/styles';
import HabitacionCardStudent from '../components/HabitacionCardStudent';
import { useHabitacionesStudent } from '../hooks/useHabitacionesStudent';
import { useSectoresData } from '../hooks/useSectoresData';
import { FiSearch } from 'react-icons/fi'; // Importa el icono de lupa (asegúrate de tener react-icons instalado)

export default function StudentHome() {
  const { sectores } = useSectoresData();
  
  const [filters, setFilters] = useState({
    sector: '',
    ordenPrecio: '' 
  });

  const [appliedFilters, setAppliedFilters] = useState({});
  const { habitaciones, isLoading, error, refetch } = useHabitacionesStudent(appliedFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    refetch(); // Forzar recarga de datos
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando habitaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`text-black h-full flex flex-col p-8`}>
      <header className='flex flex-col md:flex-row gap-4 items-end'>
        <div className='flex flex-col flex-1 p-4'>
          <label className='font-bold pb-4'>Ordenar por precio</label>
          <select 
            name="ordenPrecio"
            value={filters.ordenPrecio}
            onChange={handleFilterChange}
            className='rounded-lg text-black p-1 bg-gray-100 h-9'
          >
            <option value="">Sin ordenar</option>
            <option value="asc">De menor a mayor</option>
            <option value="desc">De mayor a menor</option>
          </select>
        </div>
        
        <div className='flex flex-col flex-1 p-4'>
          <label className='font-bold pb-4'>Filtrar por sector</label>
          <select 
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            className='rounded-lg text-black p-1 bg-gray-100 h-9'
          >
            <option value="">Todos los sectores</option>
            {sectores.map((sector) => (
              <option key={sector.Id_Sector} value={sector.Id_Sector}>
                {sector.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className='p-4'>
          <button
            onClick={handleSearch}
            className={`flex items-center justify-center bg-black text-white p-2 rounded-lg h-9 w-9 hover:bg-[${COLORS.dark_primary}] transition-colors`}
            aria-label="Buscar"
          >
            <FiSearch className="text-lg" />
          </button>
        </div>
      </header>
      
      <main className='flex flex-col p-4'>
        <h1 className='font-bold text-2xl'>Habitaciones disponibles</h1>
        
        {habitaciones.length === 0 ? (
          <p className="py-8 text-center">No se encontraron habitaciones con los filtros seleccionados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {habitaciones.map((habitacion) => (
              <HabitacionCardStudent
                key={habitacion.Id_Habitacion}
                habitacion={habitacion}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}