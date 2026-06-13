import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getRelatedProducts, getAllProducts } from '@/lib/product-api';
import { ProductImages } from '@/components/product-images';
import { ProductInfo } from '@/components/product-info';
import { ShareButtons } from '@/components/share-buttons';
import { Metadata } from 'next';

// 1. Interfaces estrictas para el tipado de la API de productos
export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

// 2. Tipado obligatorio de Next.js 15+ (params ahora es una Promesa)
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generación de metadatos dinámicos para Open Graph
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // En Next.js 15+ se debe usar await para obtener los parámetros de la URL
  const { id: productId } = await params;

  // Validación básica del ID de producto
  if (!productId || isNaN(Number(productId))) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  try {
    const product: Product | null = await getProductById(productId);
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.images[0] || '/images/fallback-product.jpg',
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
        type: 'website',
        siteName: 'Akatoyo',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [product.images[0] || '/images/fallback-product.jpg'],
      },
    };
  } catch (error: unknown) {
    console.error('Error fetching product for metadata:', error);
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

// Componente principal de la página (Server Component)
export default async function ProductPage({ params }: ProductPageProps) {
  // Resolución asíncrona de los parámetros para Next.js 15+
  const { id: productId } = await params;

  // Validación del ID de producto
  if (!productId || isNaN(Number(productId))) {
    notFound();
  }

  try {
    const product: Product | null = await getProductById(productId);
    if (!product) {
      notFound();
    }

    // Consulta de productos relacionados basados en la categoría del producto actual
    const relatedProducts: Product[] = await getRelatedProducts(product.category, productId);

    return (
      <div className="min-h-screen bg-zinc-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imágenes del Producto */}
            <div className="space-y-4">
              <ProductImages images={product.images} name={product.name} />
            </div>

            {/* Información y Acciones */}
            <div className="space-y-6">
              {/* Nota: quitamos onAddToCart si ProductInfo ya maneja internamente AddToCartButton */}
              <ProductInfo product={product} />
              
              {/* Botones para compartir */}
              <ShareButtons 
                nombre={product.name}
                precio={product.price}
                descripcion={product.description}
                imagen_url={product.images[0] || '/images/fallback-product.jpg'}
              />
            </div>
          </div>

          {/* Productos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-zinc-900 rounded-xl overflow-hidden">
                    {/* Contenedor relativo requerido por el componente Image de Next.js al usar 'fill' */}
                    <div className="aspect-square bg-zinc-800 relative">
                      <Image
                        src={relatedProduct.images[0] || '/images/fallback-product.jpg'}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{relatedProduct.name}</h3>
                      <p className="text-cyan-400 font-bold mt-2">
                        ${Number(relatedProduct.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    notFound();
  }
}

// Generación de rutas estáticas (Static Site Generation - SSG)
export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const products: Product[] = await getAllProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error: unknown) {
    console.error('Error generating static params:', error);
    return [];
  }
}
