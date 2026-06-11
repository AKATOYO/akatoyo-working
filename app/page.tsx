import { supabase } from "@/lib/supabase";
import ProductSearch from "./components/ProductSearch";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inicio", description: "Catálogo oficial de Akatoyo." };

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const { data: productos } = await supabase.from("productos").select("*");
  const productosFiltrados = q ? productos?.filter(p => p.nombre.toLowerCase().includes(q.toLowerCase()) || p.descripcion.toLowerCase().includes(q.toLowerCase())) : productos;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden pt-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {q ? `Resultados para "${q}"` : "Catálogo Akatoyo"}
          </h1>
          {!q && (<p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">Explora nuestra colección. Usa el buscador superior para encontrar lo que necesitas.</p>)}
        </div>
        <ProductSearch productos={productosFiltrados || []} />
      </div>
    </div>
  );
}