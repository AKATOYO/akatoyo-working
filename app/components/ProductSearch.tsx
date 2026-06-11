"use client";

import Link from "next/link";
import { useState } from "react";
import { useCotizacionStore } from "../store/cotizacionStore";

interface Producto {
  id: string | number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
  categoria?: string;
}

// Creamos un componente interno para manejar el estado individual de cada botón
function ProductCard({ producto }: { producto: Producto }) {
  const agregarProducto = useCotizacionStore((state) => state.agregarProducto);
  const [agregado, setAgregado] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene la navegación
    e.stopPropagation(); // Evita que el clic llegue al Link de la tarjeta
    
    agregarProducto({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
    setAgregado(true);
    
    // Volvemos el botón a la normalidad después de 1.5 segundos
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="group flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-900/80">
      
      {/* Zona cliqueable que lleva al detalle (Imagen y Texto) */}
      <Link href={`/producto/${producto.id}`} className="flex flex-col flex-1">
        <div className="w-full aspect-square bg-zinc-800 rounded-2xl overflow-hidden mb-5 relative">
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="flex flex-col flex-1">
          {producto.categoria && (
            <span className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wider">
              {producto.categoria}
            </span>
          )}
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
            {producto.nombre}
          </h2>
          <p className="text-zinc-400 text-sm flex-1 line-clamp-2 mb-4">
            {producto.descripcion}
          </p>
        </div>
      </Link>

      {/* Zona de Precio y Botón (Aislada del Link) */}
      <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
        <span className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          ${Number(producto.precio).toLocaleString()}
        </span>
        
        <button
          onClick={handleAdd}
          disabled={agregado}
          className={`flex items-center gap-2 font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 text-sm ${
            agregado 
              ? 'bg-green-500 text-white cursor-default shadow-lg shadow-green-500/20' 
              : 'bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]'
          }`}
        >
          {agregado ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ¡Agregado!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              AGREGAR
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Componente principal que recibe los productos
export default function ProductSearch({ productos }: { productos: Producto[] }) {
  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-24 bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <h3 className="text-2xl font-semibold text-white">Sin resultados</h3>
        <p className="text-zinc-500 mt-2">Intenta buscar otra cosa o explora las categorías.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}