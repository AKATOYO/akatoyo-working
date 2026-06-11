import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos",
  description: "Conoce la política de envíos, cobertura, tiempos de entrega y seguimiento de pedidos en AKATOYO.",
};

export default function EnviosPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-8">
          Envíos
        </h1>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <p className="text-lg">
            En <span className="text-cyan-400 font-semibold">AKATOYO</span> trabajamos con empresas transportadoras reconocidas para realizar entregas seguras en todo el territorio nacional.
          </p>

          {/* Sección 1 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Cobertura</h2>
            <p>
              Realizamos envíos a ciudades principales, municipios y zonas con cobertura de las transportadoras aliadas.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Tiempo de Entrega</h2>
            <p className="mb-4">Los tiempos de entrega pueden variar según:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Disponibilidad del producto.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Ciudad de destino.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Condiciones logísticas de la transportadora.</span></li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. Costos de Envío</h2>
            <p className="mb-4">El valor del envío se calcula según:</p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Peso y dimensiones del producto.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Ciudad de destino.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Transportadora seleccionada.</span></li>
            </ul>
            <p>
              El costo será informado <span className="font-semibold text-white">antes de la confirmación del pedido</span>.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Seguimiento</h2>
            <p>
              Una vez despachado el pedido, el cliente podrá recibir la información de seguimiento proporcionada por la empresa transportadora.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">5. Responsabilidad del Transporte</h2>
            <p className="mb-4">
              AKATOYO entrega los productos debidamente empacados a la transportadora seleccionada.
            </p>
            <p className="mb-4">
              Los tiempos de entrega y la manipulación durante el transporte son responsabilidad de la empresa transportadora.
            </p>
            {/* Aviso importante destacado */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <p className="text-amber-200 text-sm font-medium">
                Se recomienda verificar el estado del paquete al momento de la recepción y reportar cualquier novedad de manera inmediata.
              </p>
            </div>
          </div>

          {/* Sección 6 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">6. Productos Sujetos a Disponibilidad</h2>
            <p className="mb-4">
              Algunos productos pueden requerir verificación previa de inventario antes de confirmar el despacho.
            </p>
            <p>
              Nuestro equipo informará oportunamente cualquier novedad relacionada con la disponibilidad o tiempos de entrega.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}