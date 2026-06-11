import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Pagos",
  description: "Conoce los métodos de pago, seguridad de transacciones y políticas de facturación de AKATOYO.",
};

export default function PagosPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
          Política de Pagos
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Última actualización: Junio 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <p className="text-lg">
            En <span className="text-cyan-400 font-semibold">AKATOYO</span> trabajamos para ofrecer un proceso de compra seguro, transparente y confiable.
          </p>

          {/* Sección 1 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Métodos de pago aceptados</h2>
            <p className="mb-4">
              Dependiendo del producto y la ubicación del cliente, podrán estar disponibles los siguientes métodos de pago:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Transferencia bancaria.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Consignación bancaria.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Enlaces de pago.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Tarjetas de crédito y débito.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Plataformas de pago autorizadas.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Otros métodos informados durante el proceso de compra.</span></li>
            </ul>
          </div>

          {/* Sección 2 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Cotizaciones</h2>
            <p className="mb-4">
              Las cotizaciones generadas en nuestro sitio web tienen carácter informativo y <span className="font-semibold text-white">no constituyen una reserva automática de inventario</span>.
            </p>
            <p className="mb-2">Antes de realizar un pago, recomendamos confirmar con nuestro equipo:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Disponibilidad del producto.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Precio vigente.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Costos de envío.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Tiempo estimado de entrega.</span></li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. Confirmación de pago</h2>
            <p>
              Los pedidos comenzarán su proceso de preparación una vez el pago haya sido confirmado. Los tiempos de validación pueden variar según el método utilizado.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Seguridad de las transacciones</h2>
            <p className="mb-4">
              AKATOYO no almacena información confidencial de tarjetas bancarias.
            </p>
            <p>
              Los pagos electrónicos son procesados por plataformas especializadas que cuentan con mecanismos de seguridad y protección de datos.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">5. Pedidos pendientes de pago</h2>
            <p>
              Los productos incluidos en una cotización o pedido permanecerán sujetos a disponibilidad hasta que el pago sea confirmado. La generación de una cotización <span className="font-semibold text-white">no garantiza la reserva del inventario</span>.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">6. Pagos rechazados</h2>
            <p>
              Si una entidad financiera o plataforma de pagos rechaza una transacción, el pedido no podrá ser procesado hasta recibir una confirmación válida del pago.
            </p>
          </div>

          {/* Sección 7 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">7. Reembolsos</h2>
            <p className="mb-4">
              Los reembolsos, cuando correspondan, serán gestionados conforme a nuestra{" "}
              <Link href="/devoluciones" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
                Política de Devoluciones, Cambios y Garantías
              </Link>.
            </p>
            <p>
              Los tiempos de procesamiento dependerán de la entidad financiera y del método de pago utilizado.
            </p>
          </div>

          {/* Sección 8 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">8. Comprobantes</h2>
            <p>
              Los clientes podrán solicitar comprobantes, facturas o documentación relacionada con sus compras cuando aplique según la normativa vigente.
            </p>
          </div>

          {/* Sección 9 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">9. Contacto</h2>
            <p>
              Para consultas relacionadas con pagos, facturación o confirmación de pedidos, comuníquese mediante nuestros canales oficiales de atención.
            </p>
          </div>

          {/* Cierre */}
          <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
            <p className="text-zinc-400">
              AKATOYO agradece su confianza y trabaja continuamente para ofrecer una experiencia de compra segura y transparente.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}