import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Conoce los términos y condiciones de uso del sitio web de AKATOYO.",
};

export default function TerminosPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
          Términos de Servicio
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Última actualización: Junio 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <p className="text-lg">
            Al utilizar el sitio web <span className="text-cyan-400 font-semibold">AKATOYO</span>, el usuario acepta los presentes términos y condiciones.
          </p>

          {/* Sección 1 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Uso del sitio</h2>
            <p>
              El sitio tiene como finalidad mostrar productos, generar cotizaciones y facilitar el contacto comercial entre clientes y AKATOYO.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Cotizaciones</h2>
            <p>
              Las cotizaciones generadas a través del sitio tienen carácter informativo y <span className="font-semibold text-white">no constituyen una obligación de venta</span>.
            </p>
          </div>

          {/* Sección 3 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. Disponibilidad de productos</h2>
            <p>
              La disponibilidad puede variar sin previo aviso.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Precios</h2>
            <p>
              Los precios publicados pueden cambiar en cualquier momento debido a disponibilidad, variaciones del mercado o actualización de inventario.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">5. Propiedad intelectual</h2>
            <p>
              Los textos, imágenes, diseños, logotipos y demás contenidos del sitio son propiedad de AKATOYO o de sus respectivos titulares.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">6. Responsabilidad</h2>
            <p>
              AKATOYO no será responsable por interrupciones temporales del servicio causadas por mantenimiento, fallas técnicas o eventos externos.
            </p>
          </div>

          {/* Sección 7 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">7. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento.
            </p>
          </div>

          {/* Cierre */}
          <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
            <p className="text-zinc-400">
              El uso continuado de nuestro sitio web después de cualquier cambio constituye la aceptación de los nuevos términos.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}