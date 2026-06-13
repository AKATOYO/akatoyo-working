// src/app/producto/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import { Producto } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShareButtons } from "@/components/share-buttons";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Metadata } from "next";

// Tipado estricto para las propiedades
interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Fetch de datos seguro (Server-side)
async function getProducto(id: string): Promise<Producto | null> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data;
}

// 2. Generación de Metadatos Dinámicos (Next 15+)
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const producto = await getProducto(id);
  
  return {
    title: `${producto?.nombre || 'Producto'} | Akatoyo`,
    description: producto?.descripcion || 'Detalle del producto',
  };
}

// 3. Componente de Página
export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params;
  const producto = await getProducto(id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        
        {/* Imagen */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-800">
          <Image 
            src={producto.imagen_url} 
            alt={producto.nombre}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col">
          <span className="text-sm text-cyan-400 font-medium mb-2">{producto.categoria}</span>
          <h1 className="text-4xl font-bold mb-4">{producto.nombre}</h1>
          <p className="text-zinc-300 mb-6 flex-grow">{producto.descripcion}</p>
          
          <div className="text-3xl font-bold text-white mb-6">
            ${producto.precio.toLocaleString()}
            <span className="text-sm text-zinc-500 font-normal ml-2">COP</span>
          </div>

          <div className="flex flex-col gap-4">
            <AddToCartButton producto={producto} />
            <ShareButtons 
              nombre={producto.nombre} 
              precio={producto.precio} 
              descripcion={producto.descripcion} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
