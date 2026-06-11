import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Comunícate con AKATOYO. Atención al cliente, cotizaciones y soporte comercial por WhatsApp y correo electrónico.",
};

export default function ContactoPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-4">
          Contacto
        </h1>
        <p className="text-lg text-zinc-400 mb-12 max-w-2xl">
          Estamos disponibles para ayudarte con información de productos, cotizaciones, disponibilidad y soporte comercial.
        </p>

        <div className="space-y-12">
          
          {/* Sección: Atención al Cliente */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Atención al Cliente</h2>
            <p className="text-zinc-300 mb-8">
              Si tienes preguntas sobre productos, precios, envíos o pedidos, puedes comunicarte con nosotros a través de nuestros canales oficiales.
            </p>

            {/* Tarjetas de Contacto (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tarjeta WhatsApp */}
              <a 
                href="https://wa.me/573001234567" // REEMPLAZA POR TU NÚMERO REAL
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-start gap-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                  <p className="text-zinc-400 text-sm">Atención rápida y personalizada.</p>
                  <span className="inline-block mt-3 text-green-400 text-sm font-medium group-hover:underline">
                    Enviar mensaje →
                  </span>
                </div>
              </a>

              {/* Tarjeta Email */}
              <a 
                href="mailto:contacto@akatoyo.com" // REEMPLAZA POR TU CORREO REAL
                className="group flex items-start gap-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Correo Electrónico</h3>
                  <p className="text-zinc-400 text-sm">Para consultas comerciales, solicitudes de cotización y soporte.</p>
                  <span className="inline-block mt-3 text-cyan-400 text-sm font-medium group-hover:underline">
                    Enviar correo →
                  </span>
                </div>
              </a>

            </div>
          </div>

          {/* Sección: Horario de Atención */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Horario de Atención
            </h2>
            <div className="space-y-2 text-zinc-300">
              <p><span className="font-semibold text-white">Lunes a Viernes:</span> 8:00 a.m. – 6:00 p.m.</p>
              <p><span className="font-semibold text-white">Sábados:</span> 8:00 a.m. – 1:00 p.m.</p>
            </div>
          </div>

          {/* Sección: Solicitud de Cotizaciones (CTA) */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-zinc-800 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Solicitud de Cotizaciones
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Puedes generar una cotización directamente desde nuestro catálogo en línea o comunicarte con nuestro equipo para recibir asesoría personalizada. Nuestro compromiso es responder tus solicitudes en el menor tiempo posible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/cotizacion" 
                className="px-8 py-3.5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              >
                Ir al Cotizador
              </Link>
              <Link 
                href="/" 
                className="px-8 py-3.5 bg-zinc-800 border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}