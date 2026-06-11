import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-zinc-800 bg-black text-zinc-400">
      
      {/* Efecto de brillo inferior característico de z.ai */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* Grid Principal: 4 columnas en PC, 2 en Tablet, 1 en Móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Akatoyo
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-xs">
              Explorando el futuro del diseño y la tecnología. Productos cuidadosamente seleccionados para ti.
            </p>
            {/* Redes Sociales (Opcional) */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-zinc-600 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-zinc-600 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Empresa
            </h3>
            <ul className="space-y-3">
              <li><Link href="/nosotros" className="text-sm text-zinc-500 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-sm text-zinc-500 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="/envios" className="text-sm text-zinc-500 hover:text-white transition-colors">Envíos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-sm text-zinc-500 hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacidad" className="text-sm text-zinc-500 hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/pagos" className="text-sm text-zinc-500 hover:text-white transition-colors">Política de Pagos</Link></li>
              <li><Link href="/devoluciones" className="text-sm text-zinc-500 hover:text-white transition-colors">Devoluciones y Garantías</Link></li>
            </ul>
          </div>

          {/* Columna 4: Ayuda */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Ayuda
            </h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm text-zinc-500 hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/tutorial" className="text-sm text-zinc-500 hover:text-white transition-colors">Cómo Utilizar</Link></li>
              <li><Link href="/soporte" className="text-sm text-zinc-500 hover:text-white transition-colors">Soporte</Link></li>
            </ul>
          </div>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Akatoyo. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-700">
            Diseñado con tecnología de punta
          </p>
        </div>
      </div>
    </footer>
  );
}