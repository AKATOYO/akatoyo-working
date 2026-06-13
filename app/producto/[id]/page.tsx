import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getRelatedProducts } from '@/lib/product-api';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductImages } from '@/components/product-images';
import { ProductInfo } from '@/components/product-info';
import { ShareButtons } from '@/components/share-buttons';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for Open Graph
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = params.id;

  // Validate product ID
  if (!productId || isNaN(Number(productId))) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  try {
    // Fetch product data
    const product = await getProductById(productId);
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    // Open Graph metadata
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
  } catch (error) {
    console.error('Error fetching product for metadata:', error);
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.id;

  // Validate product ID
  if (!productId || isNaN(Number(productId))) {
    notFound();
  }

  try {
    // Fetch product data
    const product = await getProductById(productId);
    if (!product) {
      notFound();
    }

    // Fetch related products
    const relatedProducts = await getRelatedProducts(product.category, productId);

    return (
      <div className="min-h-screen bg-zinc-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <ProductImages images={product.images} name={product.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <ProductInfo 
                product={product} 
                onAddToCart={() => {}} 
              />
              
              {/* Share Buttons */}
              <ShareButtons 
                nombre={product.name}
                precio={product.price}
                descripcion={product.description}
                imagen_url={product.images[0] || '/images/fallback-product.jpg'}
              />
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-zinc-900 rounded-xl overflow-hidden">
                    <div className="aspect-square bg-zinc-800">
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
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts(); // Assuming you have this function
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
