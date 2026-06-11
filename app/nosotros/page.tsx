import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce AKATOYO: empresa dedicada a la comercialización de maquinaria, repuestos, tecnología y productos especializados.",
};

export default function NosotrosPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-8">
          Nosotros
        </h1>

        <div className="space-y-12 text-zinc-300 leading-relaxed text-lg">
          
          {/* Intro */}
          <div className="space-y-4">
            <p>
              Bienvenido a <span className="text-cyan-400 font-semibold">AKATOYO</span>.
            </p>
            <p>
              Somos una empresa dedicada a la comercialización de maquinaria, repuestos, tecnología, software y otros productos especializados para profesionales, emprendedores, talleres y empresas.
            </p>
            <p>
              Nuestro objetivo es facilitar el acceso a productos de calidad mediante una plataforma moderna que permite consultar catálogos, generar cotizaciones y recibir asesoría personalizada de manera rápida y sencilla.
            </p>
            <p>
              Trabajamos constantemente para ofrecer soluciones confiables, productos seleccionados y atención cercana a nuestros clientes, adaptándonos a las necesidades de cada proyecto.
            </p>
          </div>

          {/* Misión y Visión (Grid de 2 columnas en PC) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                Nuestra Misión
              </h2>
              <p className="text-base">
                Brindar a nuestros clientes acceso a productos de calidad, información clara y atención profesional, apoyando el crecimiento de sus negocios mediante soluciones eficientes y accesibles.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                Nuestra Visión
              </h2>
              <p className="text-base">
                Convertirnos en una plataforma de referencia en Colombia para la consulta, cotización y adquisición de maquinaria, tecnología y otros productos especializados, destacándonos por la confianza, innovación y servicio al cliente.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-4">Nuestros Valores</h2>
            <ul className="list-none space-y-2 text-base">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Compromiso con nuestros clientes.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Transparencia en nuestros procesos.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Calidad en los productos ofrecidos.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Innovación constante.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Atención personalizada.</span></li>
            </ul>
          </div>

          {/* Por qué elegirnos */}
          <div className="border-l-2 border-purple-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-4">¿Por qué elegir AKATOYO?</h2>
            <ul className="list-none space-y-2 text-base">
              <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">▪</span><span>Amplio catálogo de productos.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">▪</span><span>Cotizaciones rápidas y personalizadas.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">▪</span><span>Atención directa por WhatsApp.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">▪</span><span>Actualización constante de inventario.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">▪</span><span>Soporte antes y después de la compra.</span></li>
            </ul>
          </div>

          {/* Cierre */}
          <div className="mt-4 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-zinc-800 rounded-2xl text-center">
            <p className="text-xl font-medium text-white">
              Gracias por confiar en <span className="text-cyan-400 font-bold">AKATOYO</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}