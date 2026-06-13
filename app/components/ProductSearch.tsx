"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCotizacionStore } from "../store/cotizacionStore";
import { toast } from "react-hot-toast";

// 1. Interfaces base para datos y estados
export interface Producto {
  id: string | number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
  categoria?: string;
}

// Subconjunto de datos que requiere la función agregarProducto del store
interface ProductoCotizacion {
  id: string | number;
  nombre: string;
  precio: number;
}

interface CotizacionState {
  agregarProducto: (producto: ProductoCotizacion) => void;
}

interface ProductSearchProps {
  productos: Producto[];
}

export default function ProductSearch({ productos }: ProductSearchProps) {
  // Tipado explícito para el estado global de Zustand
  const agregarProducto = useCotizacionStore(
    (state: CotizacionState) => state.agregarProducto
  );
  
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;

  // Limpieza del set de agregados recientemente
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentlyAdded(new Set());
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-24 bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <h3 className="text-2xl font-semibold text-white">Sin resultados</h3>
        <p className="text-zinc-500 mt-2">Intenta buscar otra cosa o explora las categorías.</p>
        <Link href="/" className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors">
          Explorar catálogo
        </Link>
      </div>
    );
  }

  // Lógica de paginación
  const totalPages: number = Math.ceil(productos.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const paginatedProductos: Producto[] = productos.slice(startIndex, startIndex + itemsPerPage);

  // Tipado estricto del evento de clic del mouse
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>, producto: Producto): void => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      agregarProducto({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
      setRecentlyAdded(prev => {
        const next = new Set(prev);
        next.add(producto.id);
        return next;
      });
      toast.success("¡Producto agregado a la cotización!");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Error al agregar el producto. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {paginatedProductos.map((producto) => {
          const agregado: boolean = recentlyAdded.has(producto.id);
          
          return (
            <div key={producto.id} className="group flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-900/80">
              <Link href={`/producto/${producto.id}`} className="flex flex-col flex-1">
                <div className="w-full aspect-square bg-zinc-800 rounded-2xl overflow-hidden mb-5 relative">
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "/path/to/fallback-image.jpg";
                    }}
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

              <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  ${Number(producto.precio).toLocaleString()}
                </span>
                
                <button
                  onClick={(e) => handleAdd(e, producto)}
                  disabled={agregado}
                  aria-label={agregado ? "Producto agregado al carrito" : "Agregar al carrito"}
                  className={`flex items-center gap-2 font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 text-sm ${
                    agregado 
                      ? 'bg-green-500 text-white cursor-default shadow-lg shadow-green-500/20' 
                      : 'bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {agregado ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Agregado!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      AGREGAR
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control de paginación */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-cyan-500 text-black'
                  : 'bg-zinc-800 text-white'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
