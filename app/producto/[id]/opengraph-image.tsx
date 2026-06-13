import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const alt = 'Akatoyo Product'
export const size = {
  width: 1200,
  height: 630,
}

export async function generateImageMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: p, error } = await supabase.from("productos").select("*").eq("id", id).single();
    
    if (error) throw error;
    
    return [
      {
        alt: p?.nombre || 'Akatoyo Product',
        width: 1200,
        height: 630,
      },
    ]
  } catch (error) {
    console.error('Error fetching product for OG image:', error);
    return [
      {
        alt: 'Akatoyo Product',
        width: 1200,
        height: 630,
      },
    ]
  }
}

export const runtime = 'edge';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: producto, error } = await supabase.from("productos").select("*").eq("id", id).single();

    if (error || !producto) {
      throw error || new Error('Product not found');
    }

    // Fetch font
    const fontData = await fetch(new URL('/Geist-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer())

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full bg-zinc-950 text-white p-12">
          <div tw="flex flex-col items-center justify-center w-full h-full">
            <div tw="text-6xl font-bold mb-4">{producto.nombre}</div>
            <div tw="text-3xl text-cyan-400 mb-2">${Number(producto.precio).toLocaleString()}</div>
            <div tw="text-xl text-zinc-400 text-center max-w-lg">{producto.descripcion}</div>
            <div tw="absolute bottom-8 text-sm text-zinc-500">Akatoyo | Tienda Oficial</div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Geist',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full bg-zinc-950 text-white p-12">
          <div tw="flex flex-col items-center justify-center w-full h-full">
            <div tw="text-6xl font-bold mb-4">Producto no encontrado</div>
            <div tw="text-sm text-zinc-500">Akatoyo | Tienda Oficial</div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }
}
