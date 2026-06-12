import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AddToQuoteButton from "../../components/AddToQuoteButton";
import ShareButtons from "../../components/ShareButtons";
import Image from "next/image";
import type { Metadata } from "next";

// Type definitions
interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria: string;
  stock: number;
}

type Props = { params: Promise<{ id: string }> };

// Product Card Component
function ProductCard({ producto }: { producto: Product }) {
  return (
    <div className="w-full aspect-square overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
      <Image
        src={producto.imagen_url}
        alt={producto.nombre}
        width={600}
        height={600}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}

// Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data: p, error } = await supabase.from("productos").select("*").eq("id", id).single();
    
    if (error) throw error;
    
    return { 
      title: p?.nombre || "Producto", 
      description: p?.descripcion || "Descripción del producto",
      keywords: [p?.nombre, p?.categoria, "producto", "akatoyo"].filter(Boolean).join(", "),
      openGraph: { 
        title: p?.nombre,
        description: `Cómpralo por $${Number(p?.precio).toLocaleString()} en Akatoyo. ${p?.descripcion}`,
        images: [{ url: p?.imagen_url || "", width: 1200, height: 630 }],
        type: "product",
        priceCurrency: "USD",
        price: Number(p?.precio).toFixed(2)
      },
      twitter: {
        card: 'summary_large_image',
        title: p?.nombre,
        description: p?.descripcion,
        images: [p?.imagen_url || ""]
      }
    };
  } catch (error) {
    console.error('Error fetching product metadata:', error);
    return {
      title: "Producto",
      description: "Producto no encontrado",
    };
  }
}

// Static generation
export async function generateStaticParams() {
  const { data } = await supabase.from("productos").select("id");
  return data?.map(({ id }) => ({ id })) || [];
}

// Revalidation
export const revalidate = 3600; // Revalidate at most every hour

// Main component
export default async function ProductoPage({ params }: Props) {
  try {
    const { id } = await params;
    const { data: producto, error } = await supabase.from("productos").select("*").eq("id", id).single();

    if (error || !producto) {
      throw error || new Error('Product not found');
    }

    return (
      <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group"
            aria-label="Volver al catálogo"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al catálogo
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <ProductCard producto={producto} />

            <div className="flex flex-col">
              <div 
                className="flex items-center justify-between mb-4" 
                role="status" 
                aria-live="polite"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                  {producto.categoria}
                </span>
                <span 
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    producto.stock > 0 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-500'
                  }`}
                  aria-label={
                    producto.stock > 0 
                      ? `En stock (${producto.stock} unidades disponibles)` 
                      : 'Producto agotado'
                  }
                >
                  {producto.stock > 0 ? `En stock (${producto.stock})` : 'Agotado'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                {producto.nombre}
              </h1>

              <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-4">
                {producto.descripcion}
              </p>

              <div className="mt-6">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  ${Number(producto.precio).toLocaleString()}
                </span>
              </div>

              <AddToQuoteButton producto={{ 
                id: producto.id, 
                nombre: producto.nombre, 
                precio: producto.precio 
              }} />

              <ShareButtons 
                nombre={producto.nombre} 
                precio={producto.precio} 
                descripcion={producto.descripcion} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link href="/" className="text-cyan-400 hover:underline" aria-label="Volver al catálogo">
          Volver al catálogo
        </Link>
      </div>
    );
  }
}
