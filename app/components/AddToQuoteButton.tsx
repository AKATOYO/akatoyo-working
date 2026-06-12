"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCotizacionStore } from "../store/cotizacionStore";

interface Product {
  id: string | number;
  nombre: string;
  precio: number;
}

export default function AddToQuoteButton({ producto }: { producto: Product }) {
  const agregarProducto = useCotizacionStore((state) => state.agregarProducto);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cleanup timeout on component unmount
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAdd = async () => {
    if (isAdded || isLoading) return;
    
    setIsLoading(true);
    try {
      await agregarProducto(producto);
      setIsAdded(true);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      // Optionally implement error state here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleAdd}
      disabled={isAdded || isLoading}
      aria-label={isAdded ? "Producto agregado a la cotización" : "Agregar producto a la cotización"}
      aria-pressed={isAdded}
      whileHover={!isAdded && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!isAdded && !isLoading ? { scale: 0.98 } : {}}
      className={`mt-6 w-full font-bold py-5 rounded-2xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] ${
        isAdded 
          ? 'bg-green-500 text-white shadow-green-500/30 cursor-default' 
          : isLoading 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer'
      }`}
    >
      {isLoading 
        ? 'Agregando...' 
        : isAdded 
          ? '✓ ¡Agregado a la Cotización!' 
          : 'Agregar a Cotización'
      }
    </motion.button>
  );
}
