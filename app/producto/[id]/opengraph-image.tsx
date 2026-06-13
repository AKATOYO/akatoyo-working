import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

// 1. Interfaz para el tipado de los parámetros de la URL
interface ProductParams {
  id: string;
}

// 2. Interfaz estricta para el registro de la tabla "productos" de Supabase
interface ProductoSupabase {
  id: string | number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen_url?: string;
  categoria?: string;
}

// 3. Tipado de metadatos de Next.js
interface OgImageMetadata {
  alt: string;
  width: number;
  height: number;
}

export const alt: string = 'Akatoyo Product'
export const size = {
  width: 1200,
  height: 630,
}

export async function generateImageMetadata({ params }: { params: Promise<ProductParams> }): Promise<OgImageMetadata[]> {
  try {
    const { id } = await params;
    // Forzamos el tipado genérico en la consulta de Supabase
    const { data: p, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single<ProductoSupabase>();
    
    if (error) throw error;
    
    return [
      {
        alt: p?.nombre || 'Akatoyo Product',
        width: 1200,
        height: 630,
      },
    ]
  } catch (error: unknown) {
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

export const runtime: 'edge' = 'edge';

export default async function Image({ params }: { params: Promise<ProductParams> }): Promise<ImageResponse> {
  try {
    const { id } = await params;
    const { data: producto, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single<ProductoSupabase>();

    if (error || !producto) {
      throw error || new Error('Product not found');
    }

    // Carga de tipografía con buffer tipado de forma estricta
    let fontData: ArrayBuffer | undefined;
    try {
      fontData = await fetch(new URL('/Geist-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());
    } catch (fontError: unknown) {
      console.warn('Failed to load custom font, using system font', fontError);
    }

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
        fonts: fontData ? [
          {
            name: 'Geist',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ] : undefined,
      }
    )
  } catch (error: unknown) {
    console.error('Error generating OG image:', error);
    
    // Imagen de respaldo (Fallback) en caso de error crítico
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
