import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function FormUnidad() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    id_sector: '',
    id_admin: '',
    estado: 'habilitado' 
  });

  const [sectores, setSectores] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Obtener sectores desde el endpoint
  useEffect(() => {
    axios.get('http://localhost:4000/api/sectores') // Ajusta el endpoint si es necesario
      .then(response => setSectores(response.data))
      .catch(err => console.error('Error al cargar sectores:', err));
  }, []);

  // Obtener id_admin desde cookie
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setFormData(prev => ({ ...prev, id_admin: payload.id_admin }));
      } catch (err) {
        console.error('Error al leer token:', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías el formData a tu backend
    console.log('Enviando unidad:', formData);
    setMessage('Unidad registrada exitosamente ✅');
    setError('');
  };

  return (
    <div className="bg-gray-700/80 backdrop-blur-md text-white p-6 rounded-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Crear Unidad de Vivienda</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {["nombre", "direccion", "tipo"].map((field) => (
          <div key={field}>
            <label className="block text-gray-300 text-sm capitalize">{field}</label>
            <input
              type="text"
              name={field}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-300 text-sm">Sector</label>
          <select
  name="id_sector"
  className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
  value={formData.id_sector}
  onChange={handleChange}
>
  <option value="">Selecciona un sector</option>
  {sectores.map((sector) => (
    <option key={sector.Id_Sector} value={sector.Id_Sector}>
      {sector.Nombre}
    </option>
  ))}
</select>

        </div>
        <div>
  <label className="block text-gray-300 text-sm">Estado</label>
  <select
    name="estado"
    className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
    value={formData.estado}
    onChange={handleChange}
  >
    <option value="habilitado">Habilitado</option>
    <option value="deshabilitado">Deshabilitado</option>
  </select>
</div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-lg transition"
        >
          Crear Unidad
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-400 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
