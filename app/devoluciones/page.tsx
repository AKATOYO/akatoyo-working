import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Devoluciones y Garantías",
  description: "Conoce la política de devoluciones, cambios y garantías de AKATOYO. Transparencia y seguridad en tu compra.",
};

export default function DevolucionesPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
          Política de Devoluciones, Cambios y Garantías
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Última actualización: Junio 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <p className="text-lg">
            En <span className="text-cyan-400 font-semibold">AKATOYO</span> buscamos ofrecer productos de calidad y una experiencia de compra transparente. Por ello, ponemos a disposición de nuestros clientes la siguiente política de devoluciones, cambios y garantías.
          </p>

          {/* Sección 1 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Productos con garantía</h2>
            <p className="mb-4">
              Los productos comercializados por AKATOYO cuentan con garantía conforme a la legislación aplicable y a las condiciones establecidas por el fabricante.
            </p>
            <p>
              La garantía cubre defectos de fabricación o fallas de funcionamiento que no hayan sido ocasionadas por uso inadecuado, golpes, modificaciones o intervenciones no autorizadas.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Solicitud de garantía</h2>
            <p className="mb-4">Para solicitar una garantía, el cliente deberá proporcionar:</p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Número de pedido o cotización.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Nombre del producto.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Descripción detallada de la falla.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Fotografías o videos cuando sea necesario.</span>
              </li>

            </ul>
            <p>
              Nuestro equipo evaluará el caso y proporcionará instrucciones para la revisión del producto.
            </p>
          </div>

          {/* Sección 3 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. Cambios de productos</h2>
            <p className="mb-4">
              Los cambios podrán solicitarse dentro de los primeros <span className="font-semibold text-white">5 días calendario</span> posteriores a la recepción del pedido, siempre que:
            </p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>El producto no haya sido utilizado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Se conserve en el empaque original el producto.(embalaje original)</span>
              </li>				  
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Se encuentre en perfecto estado.</span>
              </li>
	          <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Una vez entregado el producto a la empresa transportadora seleccionada por el comprador, la responsabilidad sobre el transporte, manejo y entrega del mismo recae exclusivamente en dicha empresa. Akatoyo no será responsable por daños, pérdidas, retrasos o cualquier incidencia ocurrida durante el proceso de envío.
               </span>
              </li>
            </ul>
            <p>
              Los costos de transporte asociados al cambio podrán ser asumidos por el cliente, salvo que exista un error atribuible a AKATOYO.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Devoluciones</h2>
            <p className="mb-4">Las devoluciones aplicarán únicamente cuando:</p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>El producto recibido no corresponda al solicitado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>El producto presente daños atribuibles a defectos de fabricación.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Exista una situación aprobada previamente por nuestro equipo de atención.</span>
              </li>
            </ul>
            <p>
              No se aceptarán devoluciones de productos usados, modificados o dañados por causas ajenas a AKATOYO.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">5. Reembolsos</h2>
            <p className="mb-4">Cuando corresponda un reembolso, este podrá realizarse mediante:</p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Transferencia bancaria.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Reversión del pago cuando sea posible.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▪</span>
                <span>Otro método acordado entre las partes.</span>
              </li>
            </ul>
            <p>
              Los tiempos de procesamiento podrán variar según el método de pago utilizado.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">6. Productos sujetos a disponibilidad</h2>
            <p>
              Las cotizaciones y pedidos están sujetos a disponibilidad de inventario. En caso de agotamiento, AKATOYO podrá ofrecer alternativas equivalentes o proceder con la devolución del valor pagado.
            </p>
          </div>

          {/* Sección 7 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">7. Contacto</h2>
            <p className="mb-4">
              Para solicitudes relacionadas con garantías, cambios o devoluciones, comuníquese a través de nuestros canales oficiales de atención.
            </p>
          </div>

          {/* Cierre */}
          <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
            <p className="text-zinc-400">
              AKATOYO agradece su confianza y trabajará para brindar una solución justa y oportuna en cada caso.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}