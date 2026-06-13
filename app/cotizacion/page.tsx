// src/app/cotizacion/page.tsx
"use client";

import { useCotizacionStore } from "@/store/cotizacionStore";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { ClienteData } from "@/types";

export default function CotizacionPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { 
    items, numeroCotizacion, incluirIva, cliente, isSaving, isSaved,
    actualizarCantidad, eliminarProducto, toggleIva, actualizarCliente, 
    subtotal, montoIva, total, limpiarCotizacion, guardarCotizacion 
  } = useCotizacionStore();

  // 1. Matar errores de hidratación de Next.js de raíz
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculatedValues = useMemo(() => ({
    subtotal: subtotal(),
    montoIva: montoIva(),
    total: total(),
    formattedTotal: total().toLocaleString()
  }), [items, incluirIva, subtotal, montoIva, total]);

  useEffect(() => {
    if (items.length === 0 || isSaved || isSaving) return;
    const timer = setTimeout(() => {
      guardarCotizacion();
    }, 30000);
    return () => clearTimeout(timer);
  }, [items, isSaved, isSaving, guardarCotizacion]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!cliente.nombre?.trim()) errors.nombre = "El nombre es obligatorio.";
    if (!cliente.email?.trim()) {
      errors.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
      errors.email = "Formato de correo no válido.";
    }
    if (!cliente.telefono?.trim()) errors.telefono = "El teléfono es obligatorio.";
    if (!cliente.acepta_ofertas) errors.acepta_ofertas = "Debes aceptar los términos de datos.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const enviarWhatsApp = async (): Promise<void> => {
    if (!validateForm()) return;
    try {
      if (!isSaved) {
        const exito = await guardarCotizacion();
        if (!exito) throw new Error();
      }
      const telefono = "573001234567";
      const mensaje = `*Cotización #${numeroCotizacion}*\nCliente: ${cliente.nombre}\n\n` +
        items.map(item => `➡️ ${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toLocaleString()}`).join('\n') +
        `\n\n*Total a pagar:* $${calculatedValues.formattedTotal}`;

      window.open(`https://wa.me{telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
      toast.success("¡Cotización redirigida a WhatsApp!");
    } catch {
      toast.error('Error al procesar la solicitud.');
    }
  };

  const handleInputChange = (field: keyof ClienteData, value: string | boolean): void => {
    actualizarCliente({ [field]: value });
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Si no se ha montado en el cliente, renderizamos un estado neutro (Previene el Mismatch)
  if (!isMounted) {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Tu cotización está vacía</h1>
        <Link href="/" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto print:bg-white print:text-black">
        
        <div className="print:hidden">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Cotización <span className="text-cyan-400">#{numeroCotizacion}</span></h1>
            <button onClick={limpiarCotizacion} className="text-sm text-red-500 border border-red-500/30 px-4 py-2 rounded-lg">
              Limpiar todo
            </button>
          </div>

          {/* Formulario Cliente */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8">
            <h3 className="text-lg font-bold mb-4">Datos del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['nombre', 'empresa', 'email', 'telefono'] as const).map(field => (
                <div key={field}>
                  <label className="text-xs text-zinc-400 block mb-1 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={cliente[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                  {validationErrors[field] && <p className="text-red-500 text-xs mt-1">{validationErrors[field]}</p>}
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input type="checkbox" checked={cliente.acepta_ofertas} onChange={(e) => handleInputChange('acepta_ofertas', e.target.checked)} className="rounded text-cyan-500" />
              <span className="text-xs text-zinc-400">Autorizo el tratamiento de datos comerciales.</span>
            </label>
          </div>

          {/* Lista de Partidas */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-zinc-800/40 p-4 rounded-xl border border-zinc-800">
                <div>
                  <h4 className="font-bold">{item.nombre}</h4>
                  <p className="text-sm text-zinc-400">${item.precio.toLocaleString()} c/u</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-zinc-800 rounded-lg border border-zinc-700">
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="px-3 py-1 text-zinc-400">-</button>
                    <span className="px-2 text-sm">{item.cantidad}</span>
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="px-3 py-1 text-zinc-400">+</button>
                  </div>
                  <button onClick={() => eliminarProducto(item.id)} className="text-red-500 text-sm">Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Panel Financiero */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={incluirIva} onChange={toggleIva} className="rounded" />
                <span className="text-sm text-zinc-400">Incluir IVA (19%)</span>
              </label>
              <p className="text-2xl font-bold text-cyan-400">Total: ${calculatedValues.formattedTotal}</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button onClick={() => { if(validateForm()) window.print(); }} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl font-bold transition-colors w-full md:w-auto">
                Imprimir Documento
              </button>
              <button onClick={enviarWhatsApp} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors w-full md:w-auto">
                Enviar WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Estilo Nativo para Impresiones de Hojas (window.print) */}
        <div className="hidden print:block text-black p-4 space-y-6">
          <h1 className="text-3xl font-bold border-b pb-4">COTIZACIÓN #{numeroCotizacion}</h1>
          <div>
            <p><strong>Cliente:</strong> {cliente.nombre}</p>
            <p><strong>Correo:</strong> {cliente.email}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="pb-2">Producto</th>
                <th className="pb-2 text-center">Cant.</th>
                <th className="pb-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.nombre}</td>
                  <td className="py-2 text-center">{item.cantidad}</td>
                  <td className="py-2 text-right">${(item.precio * item.cantidad).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right pt-4 border-t font-bold text-xl">
            Total Neto: ${calculatedValues.formattedTotal} MXN
          </div>
        </div>

      </div>
    </div>
  );
}
