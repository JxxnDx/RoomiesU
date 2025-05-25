import React from 'react';

export default function RentaCardStudent({ renta }) {
  const {
    Id_Renta,
    Correo,
    Fecha_inicio,
    Fecha_fin,
    Estado,
    Monto_Renta,
    Estado_Pago
  } = renta;

  //Los convierto primero a un objeto tipo Date y luego los formateo
 const Fecha_inicio_formateada = new Date(Fecha_inicio).toISOString().split('T')[0];
const Fecha_fin_formateada = new Date(Fecha_fin).toISOString().split('T')[0];


  const estadoColor = Estado === 'aceptada' ? 'text-green-600' : 'text-yellow-500';
  const pagoColor = Estado_Pago === 1 ? 'text-green-600' : 'text-red-600';

  const handleAction = (accion) => {
    if (window.confirm(`¿Estás seguro de que deseas ${accion} la renta #${Id_Renta}?`)) {
      console.log(`${accion} confirmado para la renta ${Id_Renta}`);
      // Aquí puedes llamar una función de props o disparar un dispatch
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200 transition-all duration-300 hover:scale-[1.02]">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Renta #{Id_Renta}</h2>
      <p className="text-gray-700"><span className="font-semibold">Correo:</span> {Correo}</p>
      <p className="text-gray-700"><span className="font-semibold">Inicio:</span> {Fecha_inicio_formateada}</p>
      <p className="text-gray-700"><span className="font-semibold">Fin:</span> {Fecha_fin_formateada}</p>
      <p className={`font-semibold text-gray-700`}>Estado: <span className={`font-semibold ${estadoColor}`}>{Estado}</span></p>
      <p className="text-gray-700"><span className="font-semibold">Monto:</span> ${Monto_Renta}</p>
      <p className={`font-semibold text-gray-700`}>Estado de Pago: <span className={`font-semibold ${pagoColor}`}>{Estado_Pago === 1 ? 'Pagado' : 'Pendiente'}</span></p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-1">
        
        <button
          onClick={() => handleAction('cancelar')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Cancelar
        </button>
        <button
          onClick={() => handleAction('terminar')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Terminar
        </button>
        <button
          onClick={() => handleAction('aceptar')}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Aceptar
        </button>
        
      </div>
    </div>
  );
}
