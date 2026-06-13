"use client";

import { useCotizacionStore } from "../store/cotizacionStore";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

// 1. Interfaces estrictas para el dominio de datos
export interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  acepta_ofertas: boolean;
}

export interface Item {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// 2. Interfaz que mapea las funciones y propiedades que expone tu Zustand Store
interface CotizacionState {
  items: Item[];
  numeroCotizacion: string | number;
  incluirIva: boolean;
  cliente: Cliente;
  isSaving: boolean;
  isSaved: boolean;
  actualizarCantidad: (id: string | number, cantidad: number) => void;
  eliminarProducto: (id: string | number) => void;
  toggleIva: () => void;
  actualizarCliente: (cliente: Partial<Cliente>) => void;
  subtotal: () => number;
  montoIva: () => number;
  total: () => number;
  limpiarCotizacion: () => void;
  guardarCotizacion: () => Promise<boolean> | boolean;
}

export default function CotizacionPage() {
  // Inyección del estado de Zustand con tipado explícito
  const { 
    items, 
    numeroCotizacion, 
    incluirIva, 
    cliente, 
    isSaving, 
    isSaved,
    actualizarCantidad, 
    eliminarProducto, 
    toggleIva, 
    actualizarCliente, 
    subtotal, 
    montoIva, 
    total, 
    limpiarCotizacion, 
    guardarCotizacion 
  } = useCotizacionStore((state: CotizacionState) => state);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Memorización de cálculos para evitar re-renders innecesarios
  const calculatedValues = useMemo(() => ({
    subtotal: subtotal(),
    montoIva: montoIva(),
    total: total(),
    formattedTotal: total().toLocaleString()
  }), [subtotal, montoIva, total, items, incluirIva]);

  // Funcionalidad de Auto-guardado cada 30 segundos
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (items.length > 0 && !isSaved && !isSaving) {
        await guardarCotizacion();
      }
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [items, isSaved, isSaving, guardarCotizacion]);

  // Validación de negocio con tipado estricto
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!cliente.nombre?.trim()) {
      errors.nombre = "⚠️ Nombre requerido.";
    }
    if (!cliente.email?.trim()) {
      errors.email = "⚠️ Email requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
      errors.email = "⚠️ Formato de email inválido.";
    }
    if (!cliente.telefono?.trim()) {
      errors.telefono = "⚠️ Teléfono requerido.";
    } else if (!/^\+?[\d\s-()]+$/.test(cliente.telefono)) {
      errors.telefono = "⚠️ Formato de teléfono inválido.";
    }
    if (!cliente.acepta_ofertas) {
      errors.acepta_ofertas = "⚠️ Debes autorizar el tratamiento de datos.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Despacho de información hacia la API externa de WhatsApp
  const enviarWhatsApp = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      if (!isSaved) {
        const exito = await guardarCotizacion();
        if (!exito) {
          throw new Error("Error al guardar en la base de datos.");
        }
      }

      const telefono: string = "573001234567"; // Código de país + número
      const mensaje: string = `*Cotización #${numeroCotizacion}*\nCliente: ${cliente.nombre}\n\n` +
        items.map(item => `➡️ ${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toLocaleString()}`).join('\n') +
        `\n\n*Subtotal:* $${calculatedValues.subtotal.toLocaleString()}` +
        (incluirIva ? `\n*IVA (19%):* $${calculatedValues.montoIva.toLocaleString()}` : '') +
        `\n*Total a pagar:* $${calculatedValues.formattedTotal}`;

      window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
      toast.success("¡Cotización enviada por WhatsApp!");
    } catch (error) {
      console.error('Error al enviar por WhatsApp:', error);
      toast.error('Error al procesar la solicitud. Intenta de nuevo.');
    }
  };

  // Impresión nativa / Descarga en PDF
  const generarPDF = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      if (!isSaved) {
        const exito = await guardarCotizacion();
        if (!exito) {
          throw new Error("Error al guardar en la base de datos.");
        }
      }
      window.print();
      toast.success("Preparando documento para imprimir...");
    } catch (error) {
      console.error('Error al generar PDF:', error);
      toast.error('Error al generar el documento.');
    }
  };

  // Manejador polimórfico de inputs
  const handleInputChange = (field: keyof Cliente, value: string | boolean): void => {
    actualizarCliente({ [field]: value });
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center">
        <svg className="w-20 h-20 text-zinc-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Tu cotización está vacía</h1>
        <p className="text-zinc-400 mb-8">Agrega productos desde nuestro catálogo.</p>
        <Link href="/" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* VISTA WEB (Oculta al imprimir gracias a las clases utilitarias de Tailwind) */}
        <div className="print:hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <Link href="/" className="text-sm text-zinc-400 hover:text-cyan-400 mb-2 inline-block">
                ← Volver al catálogo
              </Link>
              <h1 className="text-4xl font-bold">
                Cotización <span className="text-cyan-400">#{numeroCotizacion}</span>
                {isSaved && <span className="text-sm text-green-500 ml-3 font-normal">● Guardado</span>}
              </h1>
            </div>
            <button 
              onClick={limpiarCotizacion}
              className="text-sm text-red-500 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Limpiar todo
            </button>
          </div>

          {/* Formulario del Cliente */}
          <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Datos del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {(['nombre', 'empresa', 'email', 'telefono'] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs text-zinc-400 mb-1 block capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={cliente[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full bg-zinc-800 border ${validationErrors[field] ? 'border-red-500' : 'border-zinc-700'} rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500`}
                  />
                  {validationErrors[field] && <p className="text-red-500 text-xs mt-1">{validationErrors[field]}</p>}
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input 
                type="checkbox" 
                checked={cliente.acepta_ofertas} 
                onChange={(e) => handleInputChange('acepta_ofertas', e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 text-cyan-500"
              />
              <span className="text-xs text-zinc-400">Autorizo el tratamiento de datos personales para fines comerciales.</span>
            </label>
            {validationErrors.acepta_ofertas && <p className="text-red-500 text-xs mt-1">{validationErrors.acepta_ofertas}</p>}
          </div>

          {/* Lista de Artículos */}
          <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Productos seleccionados</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <h4 className="font-bold text-white">{item.nombre}</h4>
                    <p className="text-sm text-zinc-400">${item.precio.toLocaleString()} c/u</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                      <button 
                        onClick={() => actualizarCantidad(item.id, Math.max(1, item.cantidad - 1))}
                        className="px-3 py-1 hover:bg-zinc-700 text-zinc-400"
                      >
                        -
