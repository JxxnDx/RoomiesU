import React from "react";
import { COLORS } from '../constants/styles';
import habitacion1 from "../../public/habitacion1.jpg"; 

// Nota pa Alejo
// La función recibirá como parametro la información de la habitación
// y la imagen de la habitación. En este caso, puse una habitación de ejemplo xd.
export default function HabitacionCard() {
  return (
    <article className={`flex flex-col shadow-lg rounded-lg p-4 m-4 ${COLORS["secundary"]} transition-transform duration-300 hover:scale-105`}>
        <h2 className="text-xl font-bold">Habitación</h2>
        <img src={habitacion1} alt="Habitación" className="rounded-lg mb-4 w-80"/>
        <p>Descripción de la habitación.</p>
        <p>Barrio.</p>
        <p>Servicios.</p>
        <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">$precio</span>
            <button className={`bg-white text-black rounded-lg px-4 py-2 ${COLORS["hoverdark"]}`}>Ver más</button>
        </div>
    </article>
  );
}