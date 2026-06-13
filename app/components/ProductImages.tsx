import Image from 'next/image';

interface ProductImagesProps {
  images: string[];
  name: string;
}

export function ProductImages({ images, name }: ProductImagesProps) {
  const [fallbackImage, setFallbackImage] = useState(false);
  
  return (
    <div className="space-y-4">
      {images.length > 0 ? (
        <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setFallbackImage(true)}
          />
          {fallbackImage && (
            <Image
              src="/images/fallback-product.jpg"
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      ) : (
        <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src="/images/fallback-product.jpg"
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
}
