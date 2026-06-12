import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getRelatedProducts } from '@/lib/product-api';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductImages } from '@/components/product-images';
import { ProductInfo } from '@/components/product-info';

interface ProductPageProps {
  params: {
    id: string;
  };
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
    const relatedProducts = await getRelatedProducts(product.categoryId, productId);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div className="space-y-4">
            <ProductImages images={product.images} />
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            <ProductInfo 
              specifications={product.specifications} 
              features={product.features} 
            />

            <AddToCartButton 
              productId={product.id} 
              disabled={product.stock === 0}
            />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.images[0] || '/placeholder-product.png'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                    <p className="text-gray-600 mt-1">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
