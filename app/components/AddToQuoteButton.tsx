"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCotizacionStore } from "../store/cotizacionStore";
import { toast } from "react-hot-toast";

// 1. Definición de la interfaz del producto
interface Product {
  id: string | number;
  nombre: string;
  precio: number;
}

// 2. Definición de las propiedades del componente
interface AddToQuoteButtonProps {
  producto: Product;
}

// 3. Tipado del estado de Zustand (Asegúrate de que coincida con tu store)
interface CotizacionState {
  agregarProducto: (producto: Product) => Promise<void> | void;
}

export default function AddToQuoteButton({ producto }: AddToQuoteButtonProps) {
  // Se añade el tipado explícito al hook del store
  const agregarProducto = useCotizacionStore(
    (state: CotizacionState) => state.agregarProducto
  );
  
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAdd = async (): Promise<void> => {
    if (isAdded || isLoading) return;
    
    setIsLoading(true);
    try {
      await agregarProducto(producto);
      setIsAdded(true);
      toast.success("¡Producto agregado a la cotización!");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Error al agregar el producto. Por favor, intenta de nuevo.");
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
