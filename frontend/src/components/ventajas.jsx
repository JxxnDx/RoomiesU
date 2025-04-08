export default function Ventaja ({titulo, img, children}) {
    return (
        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-110 hover:text-green-500">
            <img src={img} alt="Icono" className="w-24 h-24 invert"/>
            <h3 className="text-2xl font-bold">{titulo}</h3>
            <p className="text-white text-center">{children}</p>
          </div>
    )
}