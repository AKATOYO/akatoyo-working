"use client";

import { useState } from "react";
import { useCotizacionStore } from "../store/cotizacionStore";

export default function AddToQuoteButton({ producto }: { producto: { id: string | number, nombre: string, precio: number } }) {
  const agregarProducto = useCotizacionStore((state) => state.agregarProducto);
  const [agregado, setAgregado] = useState(false);

  const handleAdd = () => {
    agregarProducto(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000); // Vuelve a la normalidad en 2 segundos
  };

  return (
    <button 
      onClick={handleAdd} 
      disabled={agregado}
      className={`mt-6 w-full font-bold py-5 rounded-2xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] ${
        agregado 
          ? 'bg-green-500 text-white shadow-green-500/30 cursor-default' 
          : 'bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer'
      }`}
    >
      {agregado ? '✓ ¡Agregado a la Cotización!' : 'Agregar a Cotización'}
    </button>
  );
}