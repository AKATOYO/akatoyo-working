import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: "Resuelve tus dudas sobre cotizaciones, envíos, pagos y soporte en AKATOYO.",
};

// Array de datos para las preguntas
const faqs = [
  {
    question: "¿Cómo solicito una cotización?",
    answer: (
      <>
        Puedes agregar los productos de tu interés al sistema de cotización y generar una cotización personalizada directamente desde nuestro{" "}
        <Link href="/cotizacion" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
          sitio web
        </Link>.
      </>
    ),
  },
  {
    question: "¿La cotización tiene algún costo?",
    answer: "No. Todas las cotizaciones generadas en nuestra plataforma son gratuitas.",
  },
  {
    question: "¿La cotización garantiza la disponibilidad del producto?",
    answer: "No. La disponibilidad de inventario debe confirmarse al momento de realizar el pedido o efectuar el pago.",
  },
  {
    question: "¿Los precios pueden cambiar?",
    answer: "Sí. Los precios pueden variar debido a disponibilidad, importación, cambios del mercado o actualizaciones de inventario.",
  },
  {
    question: "¿Puedo solicitar una cotización personalizada?",
    answer: (
      <>
        Sí. Si necesitas cantidades especiales o productos específicos, puedes comunicarte con nuestro equipo para recibir{" "}
        <Link href="/contacto" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
          atención personalizada
        </Link>.
      </>
    ),
  },
  {
    question: "¿Realizan envíos a todo el país?",
    answer: (
      <>
        Sí. Realizamos envíos a través de empresas transportadoras con cobertura nacional. Puedes ver más detalles en nuestra{" "}
        <Link href="/envios" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
          Política de Envíos
        </Link>.
      </>
    ),
  },
  {
    question: "¿Cómo puedo conocer el valor del envío?",
    answer: "El costo del envío depende del producto, peso, dimensiones y ciudad de destino. Nuestro equipo te informará el valor antes de confirmar el pedido.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: (
      <>
        Los métodos de pago disponibles serán informados durante el proceso de compra o por nuestros canales de atención. Conoce más en nuestra{" "}
        <Link href="/pagos" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
          Política de Pagos
        </Link>.
      </>
    ),
  },
  {
    question: "¿Cómo puedo recibir soporte?",
    answer: (
      <>
        Puedes comunicarte con nosotros mediante WhatsApp, correo electrónico o los canales oficiales de atención publicados en la sección de{" "}
        <Link href="/contacto" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
          Contacto
        </Link>.
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-zinc-400 mb-12">
          Encuentra respuestas rápidas a las dudas más comunes sobre nuestros productos y servicios.
        </p>

        {/* Lista de Acordeones */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700"
            >
              <summary 
                className="flex items-center justify-between cursor-pointer p-6 text-white font-semibold text-lg list-none hover:bg-zinc-800/30 transition-colors"
              >
                <span className="pr-4">{faq.question}</span>
                {/* Icono de flecha que rota al abrirse */}
                <svg 
                  className="w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Cierre / CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-zinc-800 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-3">¿No encuentras lo que buscas?</h2>
          <p className="text-zinc-400 mb-6">Nuestro equipo está listo para ayudarte con cualquier otra inquietud.</p>
          <Link 
            href="/contacto" 
            className="px-8 py-3.5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_25px_rgba(6,182,212,0.3)]"
          >
            Contáctanos
          </Link>
        </div>

      </div>
    </div>
  );
}