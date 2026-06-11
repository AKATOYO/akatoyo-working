"use client";

import { useState, useEffect, Suspense } from "react"; // 1. Añadimos Suspense
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCotizacionStore } from "../store/cotizacionStore";

// 2. Creamos un componente interno con toda la lógica y el HTML
function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Ahora está protegido por Suspense
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const [busqueda, setBusqueda] = useState(searchParams.get("q") || "");
  const [categorias, setCategorias] = useState<string[]>([]);
  const items = useCotizacionStore((state) => state.items);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data } = await supabase.from("productos").select("categoria");
      if (data) setCategorias([...new Set(data.map(c => c.categoria).filter(Boolean))]);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (!searchParams.get("q")) setBusqueda("");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busqueda.trim()) {
      router.push(`/?q=${encodeURIComponent(busqueda.trim())}`);
    } else {
      router.push("/");
    }
    setIsOpen(false);
  };

  const clearSearch = () => {
    setBusqueda("");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Akatoyo</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <input type="text" placeholder="Buscar productos..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-10 pr-10 py-2 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
            </div>
            {busqueda && (
              <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </form>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setCatDropdown(!catDropdown)} className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors">
                Categorías <svg className={`w-4 h-4 transition-transform ${catDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {catDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                  <Link href="/" onClick={() => setCatDropdown(false)} className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">Todos</Link>
                  {categorias.map((cat) => (<Link key={cat} href={`/categoria/${encodeURIComponent(cat)}`} onClick={() => setCatDropdown(false)} className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">{cat}</Link>))}
                </div>
              )}
            </div>
            <Link href="/cotizacion" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              {items.length > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-cyan-400 rounded-full">{items.length}</span>)}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/cotizacion" className="relative p-1 text-zinc-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              {items.length > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-cyan-400 rounded-full">{items.length}</span>)}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white p-1">
              {isOpen ? (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>) : (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>)}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 pt-4 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white outline-none" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
              {busqueda && (
                <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </form>
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-base text-zinc-300">Inicio</Link>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">Categorías</p>
            {categorias.map((cat) => (<Link key={cat} href={`/categoria/${encodeURIComponent(cat)}`} onClick={() => setIsOpen(false)} className="block py-1 text-base text-zinc-300">{cat}</Link>))}
          </div>
        </div>
      )}
    </nav>
  );
}

// 3. Exportamos el componente envuelto en Suspense
export default function Navbar() {
  return (
    <Suspense fallback={
      // Un fallback simple con la misma altura para que la página no salte
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl h-16" />
    }>
      <NavbarContent />
    </Suspense>
  );
}