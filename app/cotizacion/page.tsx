"use client";

import { useCotizacionStore } from "../store/cotizacionStore";
import Link from "next/link";

export default function CotizacionPage() {
  const { 
    items, numeroCotizacion, incluirIva, cliente, isSaving, isSaved,
    actualizarCantidad, eliminarProducto, toggleIva, actualizarCliente, 
    subtotal, montoIva, total, limpiarCotizacion, guardarCotizacion 
  } = useCotizacionStore();

  // Función de Validación Obligatoria
  const validateForm = () => {
    if (!cliente.nombre.trim()) {
      alert("⚠️ Acción requerida:\nPor favor, ingresa el Nombre del cliente.");
      return false;
    }
    if (!cliente.email.trim()) {
      alert("⚠️ Acción requerida:\nPor favor, ingresa el Email del cliente.");
      return false;
    }
    if (!cliente.telefono.trim()) {
      alert("⚠️ Acción requerida:\nPor favor, ingresa el Teléfono del cliente.");
      return false;
    }
    if (!cliente.acepta_ofertas) {
      alert("⚠️ Acción requerida:\nDebes autorizar el tratamiento de datos para generar la cotización.");
      return false;
    }
    return true;
  };

  // Función unificada para WhatsApp
  const enviarWhatsApp = async () => {
    if (!validateForm()) return; // Bloquea si no pasa la validación

    if (!isSaved) {
      const exito = await guardarCotizacion();
      if (!exito) {
        alert("Error al guardar en la base de datos. Inténtalo de nuevo.");
        return;
      }
    }

    const telefono = "573001234567"; // TU NÚMERO AQUÍ
    let mensaje = `*Cotización #${numeroCotizacion}*\nCliente: ${cliente.nombre}\n\n`;
    items.forEach(item => {
      mensaje += `➡️ ${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toLocaleString()}\n`;
    });
    mensaje += `\n*Subtotal:* $${subtotal().toLocaleString()}`;
    if (incluirIva) mensaje += `\n*IVA (19%):* $${montoIva().toLocaleString()}`;
    mensaje += `\n*Total a pagar:* $${total().toLocaleString()}`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  // Función unificada para PDF
  const generarPDF = async () => {
    if (!validateForm()) return; // Bloquea si no pasa la validación

    if (!isSaved) {
      const exito = await guardarCotizacion();
      if (!exito) {
        alert("Error al guardar en la base de datos. Inténtalo de nuevo.");
        return;
      }
    }
    window.print();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center">
        <svg className="w-20 h-20 text-zinc-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <h1 className="text-3xl font-bold mb-2">Tu cotización está vacía</h1>
        <p className="text-zinc-400 mb-8">Agrega productos desde nuestro catálogo.</p>
        <Link href="/" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* ================= VISTA WEB (OCULTA AL IMPRIMIR) ================= */}
        <div className="print:hidden">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <Link href="/" className="text-sm text-zinc-400 hover:text-cyan-400 mb-2 inline-block">← Volver al catálogo</Link>
              <h1 className="text-4xl font-bold">
                Cotización <span className="text-cyan-400">#{numeroCotizacion}</span>
                {isSaved && <span className="text-sm text-green-500 ml-3 font-normal">● Guardado en BD</span>}
              </h1>
            </div>
            <button onClick={limpiarCotizacion} className="text-sm text-red-500 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors">Limpiar todo</button>
          </div>

          {/* Formulario del Cliente */}
          <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">Datos del Cliente</h3>
            <p className="text-xs text-zinc-500 mb-4">Los campos marcados con * son obligatorios para cotizar.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Nombre completo <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Juan Pérez" value={cliente.nombre} onChange={(e) => actualizarCliente({ nombre: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 outline-none" required />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Empresa</label>
                <input type="text" placeholder="Mi empresa (Opcional)" value={cliente.empresa} onChange={(e) => actualizarCliente({ empresa: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="correo@ejemplo.com" value={cliente.email} onChange={(e) => actualizarCliente({ email: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 outline-none" required />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Teléfono <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="+57 300 1234567" value={cliente.telefono} onChange={(e) => actualizarCliente({ telefono: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-cyan-500 outline-none" required />
              </div>
            </div>
            
            {/* Checkbox de autorización */}
            <div className="mt-5 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="ofertas" 
                  checked={cliente.acepta_ofertas} 
                  onChange={(e) => actualizarCliente({ acepta_ofertas: e.target.checked })} 
                  className="w-5 h-5 mt-0.5 rounded bg-zinc-800 border-zinc-600 text-cyan-500 focus:ring-cyan-500 cursor-pointer accent-cyan-500"
                />
                <label htmlFor="ofertas" className="text-sm text-zinc-300 cursor-pointer">
                  <span className="text-red-500 font-bold">*</span> Autorizo el tratamiento de mis datos personales y deseo recibir ofertas. Al generar o enviar la cotización, se guardará un registro en nuestro sistema.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= VISTA IMPRESIÓN/PDF (OCULTA EN WEB) ================= */}
        <div className="hidden print:block mb-8 text-black border-b-2 border-gray-300 pb-6 print-header">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-black">AKATOYO</h2>
              <p className="text-sm text-gray-600 mt-1">NIT: 123.456.789-0</p>
              <p className="text-sm text-gray-600">Teléfono: +57 300 123 4567</p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-gray-700">COTIZACIÓN</h3>
              <p className="text-xl font-semibold text-black">#{numeroCotizacion}</p>
              <p className="text-sm text-gray-600 mt-2">Fecha: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">DATOS DEL CLIENTE</h4>
            <p className="text-sm"><span className="font-semibold">Nombre:</span> {cliente.nombre}</p>
            <p className="text-sm"><span className="font-semibold">Empresa:</span> {cliente.empresa || 'N/A'}</p>
            <p className="text-sm"><span className="font-semibold">Email:</span> {cliente.email}</p>
            <p className="text-sm"><span className="font-semibold">Teléfono:</span> {cliente.telefono}</p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Autoriza tratamiento de datos:</span> 
              <span className="font-bold text-green-700"> SÍ</span>
            </p>
          </div>
        </div>

        {/* ================= TABLA DE PRODUCTOS ================= */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden print:border-gray-300 print:bg-white print:rounded-none">
          <table className="w-full text-left">
            <thead className="hidden md:table-header-group bg-zinc-800/50 text-xs text-zinc-400 uppercase tracking-wider border-b border-zinc-700 print:table-header-group print:bg-gray-100 print:text-black print:border-gray-300">
              <tr>
                <th className="px-6 py-3 w-[40%]">Producto</th>
                <th className="px-6 py-3 w-[20%] text-center">Precio</th>
                <th className="px-6 py-3 w-[25%] text-center">Cantidad</th>
                <th className="px-6 py-3 w-[15%] text-right">Subtotal</th>
                <th className="px-6 py-3 w-[10px] print:hidden"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors print:border-gray-200 print:text-black print:hover:bg-white">
                  <td className="px-6 py-4 font-medium">{item.nombre}</td>
                  <td className="px-6 py-4 text-center text-zinc-400 print:text-gray-600">${Number(item.precio).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 print:hidden">
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center">-</button>
                      <span className="w-8 text-center font-bold">{item.cantidad}</span>
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center">+</button>
                    </div>
                    <span className="hidden print:inline">{item.cantidad}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">${(item.precio * item.cantidad).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right print:hidden">
                    <button onClick={() => eliminarProducto(item.id)} className="text-red-500 hover:text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= RESUMEN / IVA ================= */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-8">
          <div className="print:hidden">
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <span className={`text-sm ${!incluirIva ? 'text-cyan-400 font-bold' : 'text-zinc-500'}`}>Sin IVA</span>
              <button onClick={toggleIva} className={`relative w-14 h-7 rounded-full transition-colors ${incluirIva ? 'bg-cyan-500' : 'bg-zinc-700'}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${incluirIva ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm ${incluirIva ? 'text-cyan-400 font-bold' : 'text-zinc-500'}`}>Con IVA</span>
            </div>
          </div>
          <div className="w-full md:w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3 print:bg-white print:border-gray-300 print:text-black print:rounded-none">
            <div className="flex justify-between text-zinc-400 print:text-gray-600"><span>Subtotal</span><span>${subtotal().toLocaleString()}</span></div>
            {incluirIva && (<div className="flex justify-between text-zinc-400 print:text-gray-600"><span>IVA (19%)</span><span>${montoIva().toLocaleString()}</span></div>)}
            <div className="border-t border-zinc-700 pt-3 flex justify-between text-xl font-bold print:border-gray-300 print:text-black">
              <span>Total</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent print:text-black print:bg-none">${total().toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ================= BOTONES DE ACCIÓN ================= */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
          <button onClick={enviarWhatsApp} disabled={isSaving} className={`flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all shadow-lg ${isSaving ? 'bg-zinc-700 text-zinc-400 cursor-wait' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20 cursor-pointer'}`}>
            {isSaving ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            )}
            {isSaving ? 'Guardando y preparando...' : 'Enviar por WhatsApp'}
          </button>
          <button onClick={generarPDF} disabled={isSaving} className={`flex items-center justify-center gap-2 font-bold py-4 rounded-xl border transition-colors ${isSaving ? 'bg-zinc-700 text-zinc-400 cursor-wait border-zinc-600' : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 cursor-pointer'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            PDF / Imprimir
          </button>
        </div>

      </div>
    </div>
  );
}