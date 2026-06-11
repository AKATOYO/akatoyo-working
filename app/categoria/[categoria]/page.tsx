import { supabase } from "@/lib/supabase";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ categoria: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const nombre = decodeURIComponent(categoria);
  return { title: `Categoría: ${nombre}`, description: `Productos de ${nombre} en Akatoyo.` };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const nombre = decodeURIComponent(categoria);
  const { data: productos } = await supabase.from("productos").select("*").eq("categoria", nombre);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden pt-8">
      <div className="relative max-w-7xl mx-auto p-6 py-16">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">← Volver al catálogo</Link>
        <h1 className="text-5xl font-bold mt-4 mb-12 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent capitalize">{nombre}</h1>
        {!productos || productos.length === 0 ? (<p className="text-zinc-500">No hay productos en esta categoría.</p>) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productos.map((p) => (
              <Link key={p.id} href={`/producto/${p.id}`} className="group">
                <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50 hover:border-zinc-600 transition-all h-full flex flex-col">
                  <div className="w-full aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4"><img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                  <h2 className="font-bold text-white">{p.nombre}</h2>
                  <p className="text-sm text-zinc-400 mt-1 flex-1 line-clamp-2">{p.descripcion}</p>
                  <div className="mt-4 pt-2 border-t border-zinc-800"><strong className="text-lg text-white">${Number(p.precio).toLocaleString()}</strong></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}