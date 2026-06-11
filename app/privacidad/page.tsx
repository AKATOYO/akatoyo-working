import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo AKATOYO protege tu información personal y trata tus datos de acuerdo con la legislación vigente.",
};

export default function PrivacidadPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-20 px-4">
      {/* Efecto de fondo */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver al inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Última actualización: Junio 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <p className="text-lg">
            En <span className="text-cyan-400 font-semibold">AKATOYO</span> respetamos la privacidad de nuestros usuarios y protegemos la información suministrada a través del sitio web.
          </p>

          {/* Sección 1 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Información recopilada</h2>
            <p className="mb-4">Podemos recopilar:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Nombre.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Correo electrónico.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Número de teléfono.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Información relacionada con cotizaciones y pedidos.</span></li>
            </ul>
          </div>

          {/* Sección 2 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Uso de la información</h2>
            <p className="mb-4">La información recopilada podrá utilizarse para:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Generar cotizaciones.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Procesar pedidos.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Brindar soporte al cliente.</span></li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">▪</span><span>Mejorar nuestros servicios.</span></li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. Protección de datos</h2>
            <p>
              Implementamos medidas razonables de seguridad para proteger la información almacenada.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Compartición de información</h2>
            <p>
              <span className="font-semibold text-white">No vendemos ni comercializamos</span> información personal de nuestros usuarios.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">5. Cookies</h2>
            <p>
              El sitio puede utilizar cookies para mejorar la experiencia de navegación.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">6. Derechos del usuario</h2>
            <p>
              Los usuarios podrán solicitar actualización, corrección o eliminación de sus datos personales de acuerdo con la legislación aplicable.
            </p>
          </div>

          {/* Sección 7 */}
          <div className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-2xl font-bold text-white mb-3">7. Contacto</h2>
            <p>
              Para consultas relacionadas con privacidad y tratamiento de datos, puede contactarnos mediante nuestros canales oficiales.
            </p>
          </div>

          {/* Cierre */}
          <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
            <p className="text-zinc-400">
              Tu privacidad es importante para nosotros. AKATOYO se compromete a manejar tu información con responsabilidad y transparencia.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}