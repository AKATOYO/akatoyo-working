"use client";

import { useState } from 'react';
import Image from 'next/image';

// 1. Interfaz de propiedades del componente
interface ProductImagesProps {
  images: string[];
  name: string;
}

export function ProductImages({ images, name }: ProductImagesProps) {
  // Inicialización del estado local con tipado explícito
  const [useFallback, setUseFallback] = useState<boolean>(false);
  
  // Imagen principal a renderizar o su alternativa por defecto
  const mainImageSrc: string = (images.length > 0 && !useFallback) 
    ? images[0] 
    : "/images/fallback-product.jpg";

  return (
    <div className="space-y-4">
      {/* 2. Añadido 'relative' al contenedor para que 'fill' funcione correctamente */}
      <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative">
        <Image
          src={mainImageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true} // Optimiza el tiempo de carga del producto principal (LCP)
          onError={(): void => setUseFallback(true)}
        />
      </div>
    </div>
  );
}
