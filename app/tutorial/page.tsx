import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Utilizar",
  description: "Aprende a usar el sistema de cotizaciones de AKATOYO paso a paso. Rápido, fácil y sin compromiso.",
};

export default function TutorialPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-4">
          Cómo Utilizar
        </h1>
        <p className="text-lg text-zinc-400 mb-12 max-w-2xl">
          AKATOYO dispone de un sistema diseñado para facilitar la consulta de productos y la solicitud de cotizaciones de forma rápida y organizada. Sigue estos pasos:
        </p>

        <div className="space-y-12">
          
          {/* Sección: ¿Cómo funciona? (Diseño de Pasos) */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Paso a Paso</h2>
            <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8">
              
              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-zinc-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">1</div>
                <h3 className="text-lg font-semibold text-white mb-1">Explora el catálogo</h3>
                <p className="text-zinc-400">Navega por nuestro catálogo de productos en línea o usa el buscador.</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-zinc-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">2</div>
                <h3 className="text-lg font-semibold text-white mb-1">Agrega productos</h3>
                <p className="text-zinc-400">Añade los artículos de tu interés haciendo clic en el botón "Cotizar".</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-zinc-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">3</div>
                <h3 className="text-lg font-semibold text-white mb-1">Ajusta cantidades</h3>
                <p className="text-zinc-400">Modifica las cantidades necesarias en tu carrito de cotización.</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-zinc-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">4</div>
                <h3 className="text-lg font-semibold text-white mb-1">Completa tus datos</h3>
                <p className="text-zinc-400">Ingresa tu información de contacto y autoriza el tratamiento de datos.</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-zinc-900 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">5</div>
                <h3 className="text-lg font-semibold text-white mb-1">Genera la cotización</h3>
                <p className="text-zinc-400">Descarga el PDF o envía la cotización directamente por WhatsApp.</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute -left-[21px] top-0 w-10 h-10 bg-cyan-500 border-2 border-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">✓</div>
                <h3 className="text-lg font-semibold text-white mb-1">Recibe asesoría</h3>
                <p className="text-zinc-400">Nuestro equipo te contactará para confirmar disponibilidad y condiciones de venta.</p>
              </div>

            </div>
          </div>

          {/* Sección: Información Importante */}
          <div className="border-l-2 border-amber-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Información Importante
            </h2>
            <ul className="list-none space-y-2 text-zinc-300">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">▪</span><span>Las cotizaciones son <span className="font-semibold text-white">informativas</span>.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">▪</span><span>No constituyen una reserva automática de inventario.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">▪</span><span>Los precios pueden cambiar sin previo aviso.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">▪</span><span>La disponibilidad debe ser confirmada antes del pago.</span></li>
            </ul>
          </div>

          {/* Sección: Cotizaciones para Empresas */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">¿Compras en volumen?</h2>
            <p className="text-zinc-300 mb-4">
              Si requieres cotizaciones para empresas, talleres o compras al por mayor, nuestro equipo podrá brindarte atención personalizada y asesoría especializada.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Contactar a un asesor
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* CTA: Ir al cotizador real */}
          <div className="mt-4 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-zinc-800 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para cotizar?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Ponlo en práctica. Arma tu cotización ahora mismo de forma rápida, descárgala en PDF o envíala directamente por WhatsApp.
            </p>
            <Link 
              href="/cotizacion" 
              className="px-8 py-3.5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_25px_rgba(6,182,212,0.3)]"
            >
              Ir al Cotizador
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}